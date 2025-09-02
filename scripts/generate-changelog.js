#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// 解析命令行参数
const args = process.argv.slice(2);
const useEmoji = args.includes('--emoji');
const usePlain = args.includes('--plain');
const onlyCurrent = args.includes('--current');
const sinceLastTag = args.includes('--last') || args.includes('--since-last-tag');
const generateAll = args.includes('--all') || args.includes('--by-tags');
const noUnreleased = args.includes('--no-unreleased');

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

function safeExec(cmd) {
    try {
        return execSync(cmd, { encoding: 'utf8' }).trim();
    } catch (e) {
        return '';
    }
}

function resolveRange() {
    // --current: 以 package.json 的 version 为标签 vX.Y.Z，取上一个标签..当前标签
    if (onlyCurrent) {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        const currentTag = `v${pkg.version}`;
        // 上一个标签（当前标签的前一个）
        const prevTag = safeExec(`git describe --tags --abbrev=0 ${currentTag}^`);
        if (prevTag) return `${prevTag}..${currentTag}`;
        // 兜底：若当前标签不存在，则取最近一个标签..HEAD
        const lastTag = safeExec('git describe --tags --abbrev=0');
        if (lastTag) return `${lastTag}..HEAD`;
        return '';
    }
    // --last / --since-last-tag: 最近一个标签..HEAD
    if (sinceLastTag) {
        const lastTag = safeExec('git describe --tags --abbrev=0');
        if (lastTag) return `${lastTag}..HEAD`;
        return '';
    }
    // 默认：全量
    return '';
}

function buildSectionHeader({ version, date }) {
    return `## [${version}] - ${date}`;
}

function collectCommits(range) {
    const rangeArg = range ? ` ${range}` : '';
    const lines = execSync(`git log${rangeArg} --pretty=format:"%H|%s" --reverse`, { encoding: 'utf8' })
        .split('\n')
        .filter(line => line.trim());
    return lines.map(line => {
        const [hash, subject] = line.split('|');
        return { hash, subject };
    });
}

function groupCommitsByType(commits) {
    const commitsByType = {};
    commits.forEach(commit => {
        if (!commit.subject) return;
        const match = commit.subject.match(/^(\w+)(?:\(([^)]+)\))?:\s*(.+)/);
        if (match) {
            const [, type, scope, description] = match;
            if (!emojiMap[type]) return;
            if (!commitsByType[type]) commitsByType[type] = [];
            commitsByType[type].push({
                ...commit,
                scope: scope || '',
                description: description.trim()
            });
        }
    });
    return commitsByType;
}

function renderBodyFromGroups(commitsByType) {
    let body = '';
    Object.keys(commitsByType).forEach(type => {
        if (commitsByType[type].length === 0) return;
        const typeName = typeNames[type];
        body += `### ${typeName}\n\n`;
        commitsByType[type].forEach(commit => {
            const scope = commit.scope ? `**${commit.scope}:** ` : '';
            const shortHash = commit.hash.substring(0, 7);
            body += `- ${scope}${commit.description} ([${shortHash}](https://github.com/anyup/uView-Pro/commit/${commit.hash}))\n`;
        });
        body += '\n';
    });
    return body;
}

function renderFallbackBody() {
    if (shouldUseEmoji) {
        return `### ✨ Features | 新功能\n\n- Initial project setup with commitizen, cz-git, and conventional changelog\n\n### 🐛 Bug Fixes | Bug 修复\n\n### 📝 Documentation | 文档\n\n### 💄 Styles | 风格\n\n### ♻️ Code Refactoring | 代码重构\n\n### ⚡ Performance Improvements | 性能优化\n\n### ✅ Tests | 测试\n\n### 📦‍ Build System | 打包构建\n\n### 👷 Continuous Integration | CI 配置\n\n### 🚀 Chore | 构建/工程依赖/工具\n\n### ⏪ Revert | 回退\n\n`;
    }
    return `### Features | 新功能\n\n- Initial project setup with commitizen, cz-git, and conventional changelog\n\n### Bug Fixes | Bug 修复\n\n### Documentation | 文档\n\n### Styles | 风格\n\n### Code Refactoring | 代码重构\n\n### Performance Improvements | 性能优化\n\n### Tests | 测试\n\n### Build System | 打包构建\n\n### Continuous Integration | CI 配置\n\n### Chore | 构建/工程依赖/工具\n\n### Revert | 回退\n\n`;
}

function generateChangelog() {
    try {
        const range = resolveRange();
        console.log(`🔄 Generating changelog... ${shouldUseEmoji ? 'with emoji' : 'without emoji'}${range ? ` (range: ${range})` : ''}`);

        // 解析提交
        const commits = collectCommits(range);
        const commitsByType = groupCommitsByType(commits);

        const hasExisting = fs.existsSync('CHANGELOG.md');
        const existingContent = hasExisting ? fs.readFileSync('CHANGELOG.md', 'utf8') : '';

        // 标准化头部（可选移除 Unreleased）
        const baseHeader = `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n`;
        const standardHeader = noUnreleased ? baseHeader : baseHeader + '## [Unreleased]\n\n';

        let changelogBody = renderBodyFromGroups(commitsByType);

        // 如果没有找到任何符合规范的提交，添加默认内容
        if (Object.keys(commitsByType).length === 0) {
            changelogBody += renderFallbackBody();
        }

        let finalContent = '';
        if (generateAll) {
            // 基于标签重建所有版本区块
            const tagsOutput = safeExec('git tag --list --sort=-v:refname');
            const tags = tagsOutput ? tagsOutput.split('\n').filter(Boolean) : [];

            let sections = '';
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                const prev = tags[i + 1];
                const tagDate = safeExec(`git show -s --format=%ad --date=format:%Y-%m-%d ${tag}`) || '';
                const rangeExp = prev ? `${prev}..${tag}` : `${tag}`;
                const tagCommits = collectCommits(rangeExp);
                const groups = groupCommitsByType(tagCommits);
                let body = renderBodyFromGroups(groups);
                if (!body) body = renderFallbackBody();
                const header = buildSectionHeader({ version: tag.replace(/^v/, ''), date: tagDate });
                sections += `${header}\n\n${body}`;
            }

            const headerIdx = existingContent.indexOf('## [Unreleased]');
            const base = headerIdx !== -1 ? existingContent.slice(0, existingContent.indexOf('\n', headerIdx) + 1) : standardHeader;
            finalContent = base + '\n' + sections.trim() + '\n';
        } else if (onlyCurrent) {
            // 将当前范围内容生成到版本段落，并插入到 Unreleased 之后
            const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            const version = pkg.version;
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const dateStr = `${yyyy}-${mm}-${dd}`;

            const sectionHeader = buildSectionHeader({ version, date: dateStr });
            const newSection = `${sectionHeader}\n\n${changelogBody}`;

            if (hasExisting) {
                // 如果已有 CHANGELOG，保持头部到 Unreleased，插入新版本段落在其后
                const unreleasedIndex = noUnreleased ? -1 : existingContent.indexOf('## [Unreleased]');
                if (unreleasedIndex !== -1) {
                    // 找到 Unreleased 段落的结束位置（下一个 "## " 标题或文件末尾）
                    const afterUnreleased = existingContent.indexOf('\n## ', unreleasedIndex + '## [Unreleased]'.length);
                    if (afterUnreleased !== -1) {
                        finalContent = existingContent.slice(0, afterUnreleased) + '\n' + newSection + '\n' + existingContent.slice(afterUnreleased);
                    } else {
                        finalContent = existingContent + '\n' + newSection + '\n';
                    }
                } else {
                    // 不存在 Unreleased，则在头部后插入
                    finalContent = standardHeader + newSection + '\n' + existingContent;
                }
            } else {
                // 初次生成，包含标准头和新版本段
                finalContent = standardHeader + newSection + '\n';
            }
        } else {
            // 默认行为：写入标准头和将本次统计结果放在 Unreleased 下
            finalContent = standardHeader + changelogBody;
        }

        // 写入文件
        fs.writeFileSync('CHANGELOG.md', finalContent);
        console.log(`✅ Changelog generated successfully ${shouldUseEmoji ? 'with emoji icons' : 'without emoji'}!`);

        // 显示统计信息
        Object.keys(commitsByType).forEach(type => {
            const emoji = shouldUseEmoji ? emojiMap[type] + ' ' : '';
            console.log(`${emoji}${typeNamesPlain[type]}: ${commitsByType[type].length} commits`);
        });

        // 显示使用说明
        console.log('\n📖 Usage:');
        console.log('  pnpm changelog:emoji              - Generate changelog with emoji (full history)');
        console.log('  pnpm changelog:plain              - Generate changelog without emoji (full history)');
        console.log('  pnpm changelog:current            - Generate current version changelog (emoji)');
        console.log('  pnpm changelog:current:plain      - Generate current version changelog (plain)');
        console.log('  pnpm changelog:last               - Generate since last tag changelog (emoji)');
        console.log('  pnpm changelog:last:plain         - Generate since last tag changelog (plain)');
        console.log('  pnpm changelog:all                - Rebuild all version sections from git tags (emoji)');
        console.log('  pnpm changelog:all:plain          - Rebuild all version sections from git tags (plain)');
    } catch (error) {
        console.error('❌ Error generating changelog:', error.message);
        process.exit(1);
    }
}

generateChangelog();
