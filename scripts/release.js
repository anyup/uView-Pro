#!/usr/bin/env node

/**
 * 发布脚本 (Node.js版本)
 * 使用方法: node scripts/release.js [patch|minor|major]
 * 在所有平台上都能运行
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
const versionType = args[0];

// 验证参数
if (!versionType || !['patch', 'minor', 'major'].includes(versionType)) {
    console.error('❌ 请指定版本类型: patch, minor, 或 major');
    console.error('使用方法: node scripts/release.js [patch|minor|major]');
    process.exit(1);
}

console.log(`🚀 开始发布 ${versionType} 版本...`);

// 执行命令的辅助函数
function execCommand(command, options = {}) {
    try {
        const result = execSync(command, {
            encoding: 'utf8',
            stdio: 'inherit',
            ...options
        });
        return result;
    } catch (error) {
        console.error(`❌ 命令执行失败: ${command}`);
        console.error(error.message);
        process.exit(1);
    }
}

// 检查是否有未提交的更改
console.log('📋 检查Git状态...');
const gitStatus = execCommand('git status --porcelain', { stdio: 'pipe' });
if (gitStatus.trim()) {
    console.error('❌ 有未提交的更改，请先提交或暂存');
    console.log(gitStatus);
    process.exit(1);
}

// 检查当前分支
console.log('🌿 检查当前分支...');
const currentBranch = execCommand('git branch --show-current', { stdio: 'pipe' }).trim();
if (currentBranch !== 'main' && currentBranch !== 'master') {
    console.warn(`⚠️  警告: 当前分支是 ${currentBranch}，建议在 main 或 master 分支上发布`);

    // 在Node.js中实现交互式输入
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('是否继续? (y/N): ', answer => {
        rl.close();
        if (!/^[Yy]$/.test(answer)) {
            console.log('❌ 操作已取消');
            process.exit(1);
        }
        continueRelease();
    });
} else {
    continueRelease();
}

function continueRelease() {
    try {
        // 更新版本号
        console.log('📦 更新版本号...');
        execCommand(`npm version ${versionType} --no-git-tag-version`);

        // 获取新版本号
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const newVersion = packageJson.version;
        console.log(`✨ 新版本: ${newVersion}`);

        // 同时更新uview-pro模块的版本号
        console.log('📦 更新uview-pro模块版本号...');
        const uviewProPackagePath = path.join(process.cwd(), 'src', 'uni_modules', 'uview-pro', 'package.json');
        if (fs.existsSync(uviewProPackagePath)) {
            const uviewProPackage = JSON.parse(fs.readFileSync(uviewProPackagePath, 'utf8'));
            uviewProPackage.version = newVersion;
            fs.writeFileSync(uviewProPackagePath, JSON.stringify(uviewProPackage, null, 4) + '\n');
            console.log(`✅ uview-pro模块版本已更新为: ${newVersion}`);
        } else {
            console.warn('⚠️  未找到uview-pro模块的package.json文件');
        }

        // 生成 changelog（按当前版本生成版本化条目，可配置是否保留 Unreleased）
        console.log('📝 生成 changelog...');
        execCommand('npm run changelog:current:no-unreleased');

        // 提交更改
        console.log('💾 提交更改...');
        execCommand('git add package.json src/uni_modules/uview-pro/package.json CHANGELOG.md src/uni_modules/uview-pro/changelog.md');
        execCommand(`git commit -m "chore(release): bump version to ${newVersion}

- Update package.json version
- Update uview-pro module version
- Generate changelog for ${newVersion}
- Update uview-pro component changelog"`);

        // 创建标签
        console.log(`🏷️  创建标签 v${newVersion}...`);
        execCommand(`git tag -a "v${newVersion}" -m "Release version ${newVersion}"`);

        // 推送更改和标签
        console.log('🚀 推送更改和标签...');
        execCommand('git push origin HEAD');
        execCommand(`git push origin "v${newVersion}"`);

        // 尝试创建 GitHub/Gitee Release（如果检测到相应仓库且提供了 Token）
        try {
            const repoInfo = getRepoInfo();
            if (repoInfo) {
                const body = extractCurrentVersionChangelog(newVersion);
                if (repoInfo.host.includes('github.com')) {
                    const ghToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
                    if (ghToken) {
                        createGithubRelease({ token: ghToken, repoInfo, version: newVersion, body });
                        console.log(`✅ 已创建 GitHub Release: v${newVersion}`);
                    } else {
                        console.log('ℹ️ 未检测到 GITHUB_TOKEN，跳过自动创建 GitHub Release');
                    }
                } else if (repoInfo.host.includes('gitee.com')) {
                    const geToken = process.env.GITEE_TOKEN;
                    if (geToken) {
                        createGiteeRelease({ token: geToken, repoInfo, version: newVersion, body });
                        console.log(`✅ 已创建 Gitee Release: v${newVersion}`);
                    } else {
                        console.log('ℹ️ 未检测到 GITEE_TOKEN，跳过自动创建 Gitee Release');
                    }
                }
            }
        } catch (e) {
            console.warn('⚠️  创建 GitHub Release 失败（已忽略）：', e.message);
        }

        console.log(`✅ 版本 ${newVersion} 发布成功!`);
        console.log('📝 Changelog 已更新');
        console.log(`🏷️  标签 v${newVersion} 已创建并推送`);
        console.log('');
        console.log('📋 下一步:');
        console.log('1. 如需上传构建产物，可前往 Release 页面添加');
        console.log('2. 或者配置 GITHUB_TOKEN 以启用自动创建 Release');
    } catch (error) {
        console.error('❌ 发布过程中出现错误:', error.message);
        process.exit(1);
    }
}

function getRepoInfo() {
    // 优先从 package.json repository 字段解析
    try {
        const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
        const repo = pkg.repository || '';
        const url = typeof repo === 'string' ? repo : repo.url || '';
        if (url) {
            return parseGitUrl(url);
        }
    } catch {}
    // 退回解析 git remote
    try {
        const remote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
        return parseGitUrl(remote);
    } catch {}
    return null;
}

function parseGitUrl(url) {
    // 支持 https://github.com/owner/repo(.git) 以及 git@github.com:owner/repo.git
    let host = '';
    let owner = '';
    let repo = '';
    try {
        if (url.startsWith('git@')) {
            const match = url.match(/^git@([^:]+):([^/]+)\/([^\.]+)(?:\.git)?$/);
            if (match) {
                host = match[1];
                owner = match[2];
                repo = match[3];
            }
        } else {
            const u = new URL(url.replace(/\.git$/, ''));
            host = u.host;
            const parts = u.pathname.replace(/^\//, '').split('/');
            owner = parts[0];
            repo = parts[1]?.replace(/\.git$/, '') || '';
        }
    } catch {}
    if (host && owner && repo) return { host, owner, repo };
    return null;
}

function extractCurrentVersionChangelog(version) {
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
    if (!fs.existsSync(changelogPath)) return '';
    const content = fs.readFileSync(changelogPath, 'utf8');
    const header = `## [${version}]`;
    const start = content.indexOf(header);
    if (start === -1) return '';
    const next = content.indexOf('\n## ', start + header.length);
    const section = next !== -1 ? content.slice(start, next).trim() : content.slice(start).trim();
    // 去掉首行标题，仅保留正文作为 Release body，更清爽
    const lines = section.split('\n');
    if (lines.length > 1) {
        return lines.slice(1).join('\n').trim();
    }
    return section;
}

function createGithubRelease({ token, repoInfo, version, body }) {
    const api = `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/releases`;
    const payload = {
        tag_name: `v${version}`,
        name: `v${version}`,
        body: body || '',
        draft: false,
        prerelease: false
    };
    const cmd = `curl -sS -X POST -H "Authorization: Bearer ${token}" -H "Accept: application/vnd.github+json" ${api} -d '${JSON.stringify(payload)}'`;
    execCommand(cmd, { stdio: 'pipe' });
}

function createGiteeRelease({ token, repoInfo, version, body }) {
    // Gitee API: POST https://gitee.com/api/v5/repos/{owner}/{repo}/releases
    // 认证使用 access_token，字段名为 access_token
    const api = `https://gitee.com/api/v5/repos/${repoInfo.owner}/${repoInfo.repo}/releases`;
    const payload = {
        access_token: token,
        tag_name: `v${version}`,
        name: `v${version}`,
        body: body || '',
        // target_commitish 可选，默认当前分支 HEAD
        draft: false,
        prerelease: false
    };
    const form = Object.entries(payload)
        .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
        .join('&');
    const cmd = `curl -sS -X POST "${api}" -H "Content-Type: application/x-www-form-urlencoded" -d "${form}"`;
    execCommand(cmd, { stdio: 'pipe' });
}
