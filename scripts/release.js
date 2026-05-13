#!/usr/bin/env node

/**
 * 发布脚本 (Node.js版本)
 * 使用方法:
 *   node scripts/release.js [patch|minor|major]              # 语义化版本（默认不推送）
 *   node scripts/release.js prerelease [alpha|beta|rc]       # 预览版本（默认不推送）
 *   node scripts/release.js 0.5.1                          # 直接指定版本号（默认不推送）
 *   node scripts/release.js patch --push                   # 提交并推送
 *   node scripts/release.js push                           # 推送上次未推送的发布
 *   node scripts/release.js undo                           # 撤销本地发布（仅未推送时）
 * 在所有平台上都能运行
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);

// 特殊命令：push - 用于推送之前未 push 的发布
if (args[0] === 'push') {
    console.log('🚀 开始推送发布标签和提交...');
    try {
        // 获取当前版本
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const version = packageJson.version;

        // 推送提交和标签
        console.log('📤 推送提交...');
        execSync('git push origin HEAD', { stdio: 'inherit' });
        console.log(`📤 推送标签 v${version}...`);
        execSync(`git push origin "v${version}"`, { stdio: 'inherit' });
        console.log(`✅ 版本 ${version} 推送成功！`);
        process.exit(0);
    } catch (error) {
        console.error('❌ 推送失败:', error.message);
        process.exit(1);
    }
}

// 特殊命令：undo - 用于撤销本地的发布（仅支持未推送的情况）
if (args[0] === 'undo') {
    console.log('↩️  开始撤销本地发布...');
    try {
        // 获取当前版本
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const version = packageJson.version;
        const tagName = `v${version}`;

        // 检查是否有未推送的提交
        console.log('🔍 检查提交状态...');
        try {
            const unpushedCommits = execSync('git log origin/HEAD..HEAD --oneline', { encoding: 'utf8' }).trim();
            if (!unpushedCommits) {
                console.error('❌ 错误：没有未推送的提交，或者当前分支没有远程跟踪分支');
                console.error('💡 该命令仅用于撤销未推送的本地发布');
                process.exit(1);
            }
        } catch (e) {
            // 如果没有远程分支，git log 会报错，这也是可以撤销的情况
        }

        // 检查标签是否存在
        console.log(`🔍 检查标签 ${tagName}...`);
        let tagExists = false;
        try {
            execSync(`git rev-parse ${tagName}`, { stdio: 'pipe' });
            tagExists = true;
        } catch (e) {
            console.log(`⚠️  标签 ${tagName} 不存在`);
        }

        // 获取最后一次提交信息
        const lastCommitMsg = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim();
        const isReleaseCommit = lastCommitMsg.includes('chore(release): bump version to');

        if (!isReleaseCommit) {
            console.error('❌ 错误：最后一次提交不是发布提交');
            console.error('💡 最后一次提交信息:', lastCommitMsg.substring(0, 50) + '...');
            console.error('💡 请手动检查并撤销');
            process.exit(1);
        }

        console.log('');
        console.log('⚠️  即将执行以下操作：');
        console.log(`   1. 删除本地标签: ${tagName}`);
        console.log('   2. 撤销最后一次提交（保留修改到暂存区）');
        console.log('   3. 恢复 package.json 和 changelog 文件');
        console.log('');
        console.log('💡 撤销后版本号需要手动修改回之前的版本');
        console.log('');

        // 由于是命令行工具，直接执行而不询问
        // 删除本地标签
        if (tagExists) {
            console.log(`🗑️  删除本地标签 ${tagName}...`);
            execSync(`git tag -d ${tagName}`, { stdio: 'inherit' });
        }

        // 撤销最后一次提交，保留修改
        console.log('↩️  撤销最后一次提交...');
        execSync('git reset --soft HEAD~1', { stdio: 'inherit' });

        // 恢复 package.json 文件
        console.log('📄 恢复 package.json...');
        execSync('git checkout -- package.json', { stdio: 'inherit' });

        // 恢复 uview-pro 模块的 package.json
        const uviewProPackagePath = 'src/uni_modules/uview-pro/package.json';
        if (fs.existsSync(uviewProPackagePath)) {
            console.log('📄 恢复 uview-pro package.json...');
            try {
                execSync(`git checkout -- ${uviewProPackagePath}`, { stdio: 'inherit' });
            } catch (e) {
                console.log('⚠️  未找到 uview-pro package.json 或无需恢复');
            }
        }

        // 恢复 changelog
        console.log('📄 恢复 changelog...');
        execSync('git checkout -- CHANGELOG.md', { stdio: 'inherit' });
        try {
            execSync('git checkout -- src/uni_modules/uview-pro/changelog.md', { stdio: 'inherit' });
        } catch (e) {
            console.log('⚠️  未找到 uview-pro changelog 或无需恢复');
        }

        console.log('');
        console.log('✅ 本地发布撤销成功！');
        console.log('');
        console.log('📋 当前状态：');
        console.log(`   • 标签 ${tagName} 已删除`);
        console.log('   • 提交已撤销，修改已保留在暂存区');
        console.log('   • package.json 和 changelog 已恢复');
        console.log('');
        console.log('💡 如需修改版本号，请手动编辑 package.json');
        console.log('💡 如需重新发布，运行: npm run release:patch (或其他版本类型)');
        process.exit(0);
    } catch (error) {
        console.error('❌ 撤销失败:', error.message);
        process.exit(1);
    }
}

// 检查是否有 --push 参数（默认不推送）
const shouldPush = args.includes('--push');
const versionInput = args.find(arg => !arg.startsWith('--'));

// 验证版本号格式 (支持 x.y.z 格式，如 0.5.1, 1.0.0, 2.3.4-beta.1)
function isValidVersion(version) {
    if (!version || typeof version !== 'string') return false;
    // 匹配语义化版本号: x.y.z 或 x.y.z-prerelease
    const semverRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/;
    return semverRegex.test(version);
}

// 判断是语义化版本类型还是直接指定版本号
const isSemverType = ['patch', 'minor', 'major', 'prerelease'].includes(versionInput);
const isDirectVersion = isValidVersion(versionInput);

// 验证参数
if (!versionInput || (!isSemverType && !isDirectVersion)) {
    console.error('❌ 请指定版本类型或版本号');
    console.error('使用方法:');
    console.error('  node scripts/release.js [patch|minor|major]              # 语义化版本（默认不推送）');
    console.error('  node scripts/release.js prerelease [alpha|beta|rc]       # 预览版本（默认不推送）');
    console.error('  node scripts/release.js 0.5.1                            # 直接指定版本号（默认不推送）');
    console.error('');
    console.error('选项:');
    console.error('  --push                                                   # 提交并推送');
    console.error('');
    console.error('其他命令:');
    console.error('  node scripts/release.js push                             # 推送上次未推送的发布');
    console.error('  node scripts/release.js undo                             # 撤销本地发布（仅未推送时）');
    process.exit(1);
}

// 处理 prerelease 类型和标识
let prereleaseId = '';
if (versionInput === 'prerelease') {
    prereleaseId = args[1] || 'beta'; // 默认使用 beta
}

const versionType = isSemverType ? versionInput : null;
const targetVersion = isDirectVersion ? versionInput : null;

// 显示发布信息
const releaseTypeText = targetVersion
    ? targetVersion
    : versionType === 'prerelease'
      ? `${prereleaseId} 预览版`
      : versionType;
const isPrereleaseType = versionType === 'prerelease' || (targetVersion && targetVersion.includes('-'));

console.log(`${isPrereleaseType ? '🧪' : '🚀'} 开始发布 ${releaseTypeText} 版本...`);

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
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD格式
        let newVersion;
        const isPrerelease = versionType === 'prerelease' || (targetVersion && targetVersion.includes('-'));

        // 更新版本号
        if (targetVersion) {
            // 直接指定版本号
            console.log(`📦 更新版本号为 ${targetVersion}...`);
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            packageJson.version = targetVersion;
            // 更新发布日期
            packageJson.releaseDate = currentDate;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
            newVersion = targetVersion;
        } else if (versionType === 'prerelease') {
            // 预览版本
            console.log(`📦 更新版本号为 ${prereleaseId} 预览版本...`);
            execCommand(`npm version prerelease --preid=${prereleaseId} --no-git-tag-version`);
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            newVersion = packageJson.version;
            // 更新发布日期
            packageJson.releaseDate = currentDate;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        } else {
            // 语义化版本类型
            console.log('📦 更新版本号...');
            execCommand(`npm version ${versionType} --no-git-tag-version`);
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            newVersion = packageJson.version;
            // 更新发布日期
            packageJson.releaseDate = currentDate;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        }

        console.log(`✨ 新版本: ${newVersion}`);
        console.log(`✅ 发布日期: ${currentDate}`);

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
        execCommand('npm run changelog:release');

        // 提交更改
        console.log('💾 提交更改...');
        execCommand(
            'git add package.json src/uni_modules/uview-pro/package.json CHANGELOG.md src/uni_modules/uview-pro/changelog.md'
        );
        execCommand(`git commit -m "chore(release): bump version to ${newVersion}

- Update package.json version
- Update uview-pro module version
- Generate changelog for ${newVersion}
- Update uview-pro component changelog"`);

        // 创建标签
        console.log(`🏷️  创建标签 v${newVersion}...`);
        execCommand(`git tag -a "v${newVersion}" -m "Release version ${newVersion}"`);

        // 推送更改和标签
        if (shouldPush) {
            console.log('🚀 推送更改和标签...');
            execCommand('git push origin HEAD');
            execCommand(`git push origin "v${newVersion}"`);
        }

        console.log(`${isPrerelease ? '🎉 预览版本' : '✅ 版本'} ${newVersion} 发布成功!`);
        console.log('📝 Changelog 已更新');
        if (shouldPush) {
            console.log(`🏷️  标签 v${newVersion} 已创建并推送`);
        } else {
            console.log(`🏷️  标签 v${newVersion} 已创建（未推送）`);
            console.log('💡 如需推送，运行: npm run release:push');
            console.log(`   或: git push origin HEAD && git push origin "v${newVersion}"`);
        }
        if (isPrerelease) {
            console.log('');
            console.log('⚠️  这是一个预览版本，仅供测试使用');
        }
        console.log('');
        console.log('📋 下一步:');
        if (!shouldPush) {
            console.log('1. 检查无误后，运行 npm run release:push 推送发布');
            console.log('2. 如需创建 GitHub/Gitee Release，请手动前往仓库创建');
        } else {
            console.log('如需创建 GitHub/Gitee Release，请手动前往仓库创建');
        }
    } catch (error) {
        console.error('❌ 发布过程中出现错误:', error.message);
        process.exit(1);
    }
}
