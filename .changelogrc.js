module.exports = {
    preset: 'conventionalcommits',
    releaseCount: 0,
    outputUnreleased: true,
    lernaPackage: false,
    tagPrefix: 'v',
    issuePrefixes: ['#'],
    commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
    compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
    issueUrlFormat: '{{host}}/{{owner}}/{{repository}}/issues/{{id}}',
    userUrlFormat: '{{host}}/{{user}}',
    // 自定义类型和 emoji
    types: [
        { type: 'feat', section: '✨ Features | 新功能' },
        { type: 'fix', section: '🐛 Bug Fixes | Bug 修复' },
        { type: 'docs', section: '📝 Documentation | 文档' },
        { type: 'style', section: '💄 Styles | 风格' },
        { type: 'refactor', section: '♻️ Code Refactoring | 代码重构' },
        { type: 'perf', section: '⚡ Performance Improvements | 性能优化' },
        { type: 'test', section: '✅ Tests | 测试' },
        { type: 'build', section: '📦‍ Build System | 打包构建' },
        { type: 'ci', section: '👷 Continuous Integration | CI 配置' },
        { type: 'chore', section: '🚀 Chore | 构建/工程依赖/工具' },
        { type: 'revert', section: '⏪ Revert | 回退' }
    ]
};
