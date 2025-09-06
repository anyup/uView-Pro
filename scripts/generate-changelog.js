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
                if (noUnreleased) {
                    // 不保留 Unreleased 模式：找到第一个版本区块，在其前插入新版本
                    const firstVersionIndex = existingContent.indexOf('\n## [');
                    if (firstVersionIndex !== -1) {
                        finalContent = existingContent.slice(0, firstVersionIndex) + '\n' + newSection + '\n' + existingContent.slice(firstVersionIndex);
                    } else {
                        // 没有版本区块，直接追加
                        finalContent = existingContent + '\n' + newSection + '\n';
                    }
                } else {
                    // 保留 Unreleased 模式：找到 Unreleased 段落，在其后插入新版本
                    const unreleasedIndex = existingContent.indexOf('## [Unreleased]');
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
                }
            } else {
                // 初次生成，包含标准头和新版本段
                finalContent = standardHeader + newSection + '\n';
            }
        } else {
            // 默认行为：写入标准头和将本次统计结果放在 Unreleased 下
            finalContent = standardHeader + changelogBody;
        }

        // 彻底清理重复内容（防止多次运行导致重复）
        if (finalContent.includes('# Changelog')) {
            // 找到第一个头部结束位置
            const headerEndIndex = finalContent.indexOf('\n\n## ');
            if (headerEndIndex !== -1) {
                const header = finalContent.slice(0, headerEndIndex);
                const body = finalContent.slice(headerEndIndex);

                // 移除所有重复的头部和重复的版本区块
                let cleanBody = body;

                // 移除重复的头部
                cleanBody = cleanBody.replace(
                    /# Changelog\n\nAll notable changes to this project will be documented in this file\.\n\nThe format is based on \[Keep a Changelog\].*?and this project adheres to \[Semantic Versioning\].*?\n\n/g,
                    ''
                );

                // 移除重复的版本区块（保留第一个）
                const versionBlocks = cleanBody.split('\n## [');
                if (versionBlocks.length > 1) {
                    const firstBlock = versionBlocks[0];
                    const otherBlocks = versionBlocks.slice(1);

                    // 去重：只保留唯一的版本区块
                    const uniqueBlocks = [];
                    const seenVersions = new Set();

                    otherBlocks.forEach(block => {
                        const versionMatch = block.match(/^(\d+\.\d+\.\d+)/);
                        if (versionMatch && !seenVersions.has(versionMatch[1])) {
                            seenVersions.add(versionMatch[1]);
                            uniqueBlocks.push('## [' + block);
                        }
                    });

                    cleanBody = firstBlock + (uniqueBlocks.length > 0 ? '\n' + uniqueBlocks.join('\n') : '');
                }

                finalContent = header + cleanBody;
            }
        }

        // 统一调整版本间隔为1行（清理多余的空行）
        if (finalContent.includes('## [')) {
            // 清理头部后的多余空行，只保留1行间隔
            finalContent = finalContent.replace(/(# Changelog[\s\S]*?)\n\n\n+## \[/, '$1\n\n## [');

            // 清理版本区块之间的多余空行，只保留1行间隔
            finalContent = finalContent.replace(/\n\n\n+## \[/g, '\n\n## [');

            // 清理文件末尾的多余空行
            finalContent = finalContent.replace(/\n+$/, '\n');
        }

        // 写入主 CHANGELOG.md 文件
        fs.writeFileSync('CHANGELOG.md', finalContent);
        console.log(`✅ Changelog generated successfully ${shouldUseEmoji ? 'with emoji icons' : 'without emoji'}!`);

        // 如果是 current 模式且 no-unreleased，同时更新组件库的 changelog.md
        if (onlyCurrent && noUnreleased) {
            try {
                const componentChangelogPath = 'src/uni_modules/uview-pro/changelog.md';
                if (fs.existsSync(componentChangelogPath)) {
                    const componentContent = fs.readFileSync(componentChangelogPath, 'utf8');

                    // 提取当前版本的内容
                    const currentVersion = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
                    const currentSectionMatch = finalContent.match(new RegExp(`## \\[${currentVersion}\\][\\s\\S]*?(?=\\n## \\[|$)`));

                    if (currentSectionMatch) {
                        let currentSection = currentSectionMatch[0];

                        // 转换为组件库 changelog 的格式（去掉 emoji，调整日期格式）
                        currentSection = currentSection
                            .replace(/## \[(\d+\.\d+\.\d+)\] - (\d{4}-\d{2}-\d{2})/, '## $1（$2）')
                            .replace(/### 🚀 Chore \| 构建\/工程依赖\/工具/, '### 🚀 Chore | 构建/工程依赖/工具')
                            .replace(/### 🐛 Bug Fixes \| Bug 修复/, '### 🐛 Bug Fixes | Bug 修复')
                            .replace(/### ✨ Features \| 新功能/, '### ✨ Features | 新功能')
                            .replace(/### ♻️ Code Refactoring \| 代码重构/, '### ♻️ Code Refactoring | 代码重构')
                            .replace(/### 📝 Documentation \| 文档/, '### 📝 Documentation | 文档')
                            .replace(/### 💄 Styles \| 风格/, '### 💄 Styles | 风格')
                            .replace(/### ⚡ Performance Improvements \| 性能优化/, '### ⚡ Performance Improvements | 性能优化')
                            .replace(/### ✅ Tests \| 测试/, '### ✅ Tests | 测试')
                            .replace(/### 📦‍ Build System \| 打包构建/, '### 📦‍ Build System | 打包构建')
                            .replace(/### 👷 Continuous Integration \| CI 配置/, '### 👷 Continuous Integration | CI 配置')
                            .replace(/### ⏪ Revert \| 回退/, '### ⏪ Revert | 回退');

                        // 检查是否已经存在该版本
                        const versionExists = new RegExp(`## ${currentVersion}（`).test(componentContent);

                        if (!versionExists) {
                            // 在文件开头插入新版本，只保留1行间隔
                            // 清理 currentSection 末尾的多余空行
                            const cleanSection = currentSection.replace(/\n+$/, '');
                            const newContent = cleanSection + '\n\n' + componentContent;
                            fs.writeFileSync(componentChangelogPath, newContent);
                            console.log(`✅ Component changelog updated: ${componentChangelogPath}`);
                        } else {
                            console.log(`ℹ️  Version ${currentVersion} already exists in component changelog`);
                        }
                    }
                } else {
                    console.log(`⚠️  Component changelog file not found: ${componentChangelogPath}`);
                }
            } catch (error) {
                console.log(`⚠️  Failed to update component changelog: ${error.message}`);
            }
        }

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
