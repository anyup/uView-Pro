#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// 解析命令行参数
const args = process.argv.slice(2);
const useEmoji = args.includes('--emoji');
const usePlain = args.includes('--plain');

// 如果没有指定参数，默认使用 emoji
const shouldUseEmoji = useEmoji || (!usePlain && !useEmoji);

// Emoji 映射
const emojiMap = {
    feat: '✨',
    fix: '🐛',
    docs: '📝',
    style: '💄',
    refactor: '♻️',
    perf: '⚡',
    test: '✅',
    build: '📦‍',
    ci: '👷',
    chore: '🚀',
    revert: '⏪'
};

// 类型名称映射（带 emoji）
const typeNamesWithEmoji = {
    feat: '✨ Features | 新功能',
    fix: '🐛 Bug Fixes | Bug 修复',
    docs: '📝 Documentation | 文档',
    style: '💄 Styles | 风格',
    refactor: '♻️ Code Refactoring | 代码重构',
    perf: '⚡ Performance Improvements | 性能优化',
    test: '✅ Tests | 测试',
    build: '📦‍ Build System | 打包构建',
    ci: '👷 Continuous Integration | CI 配置',
    chore: '🚀 Chore | 构建/工程依赖/工具',
    revert: '⏪ Revert | 回退'
};

// 类型名称映射（不带 emoji）
const typeNamesPlain = {
    feat: 'Features | 新功能',
    fix: 'Bug Fixes | Bug 修复',
    docs: 'Documentation | 文档',
    style: 'Styles | 风格',
    refactor: 'Code Refactoring | 代码重构',
    perf: 'Performance Improvements | 性能优化',
    test: 'Tests | 测试',
    build: 'Build System | 打包构建',
    ci: 'Continuous Integration | CI 配置',
    chore: 'Chore | 构建/工程依赖/工具',
    revert: 'Revert | 回退'
};

// 根据设置选择类型名称
const typeNames = shouldUseEmoji ? typeNamesWithEmoji : typeNamesPlain;

function generateChangelog() {
    try {
        console.log(`🔄 Generating changelog... ${shouldUseEmoji ? 'with emoji' : 'without emoji'}`);

        // 获取所有提交
        const commits = execSync('git log --pretty=format:"%H|%s" --reverse', { encoding: 'utf8' })
            .split('\n')
            .filter(line => line.trim())
            .map(line => {
                const [hash, subject] = line.split('|');
                return { hash, subject };
            });

        // 解析提交类型
        const commitsByType = {};

        commits.forEach(commit => {
            if (commit.subject) {
                // 匹配 conventional commits 格式
                const match = commit.subject.match(/^(\w+)(?:\(([^)]+)\))?:\s*(.+)/);
                if (match) {
                    const [, type, scope, description] = match;
                    if (emojiMap[type]) {
                        if (!commitsByType[type]) {
                            commitsByType[type] = [];
                        }
                        commitsByType[type].push({
                            ...commit,
                            scope: scope || '',
                            description: description.trim()
                        });
                    }
                }
            }
        });

        // 生成 changelog 内容
        let changelog = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

`;

        // 按类型分组输出
        Object.keys(commitsByType).forEach(type => {
            if (commitsByType[type].length > 0) {
                const typeName = typeNames[type];
                changelog += `### ${typeName}\n\n`;

                commitsByType[type].forEach(commit => {
                    const scope = commit.scope ? `**${commit.scope}:** ` : '';
                    const shortHash = commit.hash.substring(0, 7);
                    changelog += `- ${scope}${commit.description} ([${shortHash}](https://gitee.com/anyup/uView-Pro/commit/${commit.hash}))\n`;
                });

                changelog += '\n';
            }
        });

        // 如果没有找到任何符合规范的提交，添加默认内容
        if (Object.keys(commitsByType).length === 0) {
            if (shouldUseEmoji) {
                changelog += `### ✨ Features | 新功能

- Initial project setup with commitizen, cz-git, and conventional changelog

### 🐛 Bug Fixes | Bug 修复

### 📝 Documentation | 文档

### 💄 Styles | 风格

### ♻️ Code Refactoring | 代码重构

### ⚡ Performance Improvements | 性能优化

### ✅ Tests | 测试

### 📦‍ Build System | 打包构建

### 👷 Continuous Integration | CI 配置

### 🚀 Chore | 构建/工程依赖/工具

### ⏪ Revert | 回退

`;
            } else {
                changelog += `### Features | 新功能

- Initial project setup with commitizen, cz-git, and conventional changelog

### Bug Fixes | Bug 修复

### Documentation | 文档

### Styles | 风格

### Code Refactoring | 代码重构

### Performance Improvements | 性能优化

### Tests | 测试

### Build System | 打包构建

### Continuous Integration | CI 配置

### Chore | 构建/工程依赖/工具

### Revert | 回退

`;
            }
        }

        // 写入文件
        fs.writeFileSync('CHANGELOG.md', changelog);
        console.log(`✅ Changelog generated successfully ${shouldUseEmoji ? 'with emoji icons' : 'without emoji'}!`);

        // 显示统计信息
        Object.keys(commitsByType).forEach(type => {
            const emoji = shouldUseEmoji ? emojiMap[type] + ' ' : '';
            console.log(`${emoji}${typeNamesPlain[type]}: ${commitsByType[type].length} commits`);
        });

        // 显示使用说明
        console.log('\n📖 Usage:');
        console.log('  pnpm changelog:emoji  - Generate changelog with emoji');
        console.log('  pnpm changelog:plain  - Generate changelog without emoji');
        console.log('  pnpm changelog         - Generate changelog (default: with emoji)');
    } catch (error) {
        console.error('❌ Error generating changelog:', error.message);
        process.exit(1);
    }
}

generateChangelog();
