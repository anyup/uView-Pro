module.exports = {
    // 可选类型
    types: [
        { value: 'feat', name: 'feat:     新功能' },
        { value: 'fix', name: 'fix:      修复bug' },
        { value: 'docs', name: 'docs:     文档更新' },
        { value: 'style', name: 'style:    代码格式调整' },
        { value: 'refactor', name: 'refactor: 代码重构' },
        { value: 'perf', name: 'perf:     性能优化' },
        { value: 'test', name: 'test:     测试相关' },
        { value: 'build', name: 'build:    构建相关' },
        { value: 'ci', name: 'ci:        CI/CD相关' },
        { value: 'chore', name: 'chore:    其他修改' },
        { value: 'revert', name: 'revert:   回退代码' }
    ],
    // 消息步骤
    messages: {
        type: '选择更改类型:',
        scope: '更改范围 (可选):',
        subject: '简短描述:',
        body: '详细描述 (可选):',
        breaking: '破坏性变更 (可选):',
        footer: '关联issue (可选):',
        confirmCommit: '确认提交?'
    },
    // 跳过问题
    skipQuestions: ['body', 'footer'],
    // 范围列表
    scopes: [
        { name: 'components', description: '组件相关' },
        { name: 'pages', description: '页面相关' },
        { name: 'utils', description: '工具函数' },
        { name: 'styles', description: '样式相关' },
        { name: 'docs', description: '文档相关' },
        { name: 'config', description: '配置相关' },
        { name: 'deps', description: '依赖相关' }
    ],
    // 范围前缀
    scopePrefix: '',
    // 主题前缀
    subjectPrefix: '',
    // 主题后缀
    subjectSuffix: '',
    // 范围前缀
    scopePrefix: '',
    // 范围后缀
    scopeSuffix: '',
    // 主题前缀
    subjectPrefix: '',
    // 主题后缀
    subjectSuffix: '',
    // 破坏性变更前缀
    breakingPrefix: 'BREAKING CHANGE:',
    // 关联issue前缀
    footerPrefix: 'Closes',
    // 关联issue后缀
    footerSuffix: '',
    // 是否允许自定义范围
    allowCustomScopes: true,
    // 是否允许空范围
    allowEmptyScopes: true,
    // 是否允许自定义主题
    allowCustomSubject: true,
    // 是否允许空主题
    allowEmptySubject: false,
    // 主题最大长度
    subjectLimit: 100,
    // 范围最大长度
    scopeLimit: 100
};
