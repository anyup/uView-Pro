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
    
    rl.question('是否继续? (y/N): ', (answer) => {
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
        
        // 生成 changelog
        console.log('📝 生成 changelog...');
        execCommand('npm run changelog');
        
        // 提交更改
        console.log('💾 提交更改...');
        execCommand('git add package.json src/uni_modules/uview-pro/package.json CHANGELOG.md');
        execCommand(`git commit -m "chore(release): bump version to ${newVersion}

- Update package.json version
- Update uview-pro module version
- Generate changelog for ${newVersion}"`);
        
        // 创建标签
        console.log(`🏷️  创建标签 v${newVersion}...`);
        execCommand(`git tag -a "v${newVersion}" -m "Release version ${newVersion}"`);
        
        // 推送更改和标签
        console.log('🚀 推送更改和标签...');
        execCommand('git push origin HEAD');
        execCommand(`git push origin "v${newVersion}"`);
        
        console.log(`✅ 版本 ${newVersion} 发布成功!`);
        console.log('📝 Changelog 已更新');
        console.log(`🏷️  标签 v${newVersion} 已创建并推送`);
        console.log('');
        console.log('📋 下一步:');
        console.log('1. 在 GitHub/GitLab 上创建 Release');
        console.log('2. 将 CHANGELOG.md 中的内容复制到 Release 描述中');
        console.log('3. 上传构建产物 (如果需要)');
        
    } catch (error) {
        console.error('❌ 发布过程中出现错误:', error.message);
        process.exit(1);
    }
}
