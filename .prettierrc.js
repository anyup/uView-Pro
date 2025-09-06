/**
 * Prettier 代码格式化配置
 * 详见：https://prettier.io/docs/en/options.html
 */
module.exports = {
    // 箭头函数参数是否加括号
    arrowParens: 'avoid', // always/avoid
    // 对象字面量大括号间是否加空格
    bracketSpacing: true,
    // 换行符风格（auto/lf/crlf/cr）
    endOfLine: 'auto',
    // HTML 空白敏感度
    htmlWhitespaceSensitivity: 'css',
    // 是否在文件头插入 @prettier
    insertPragma: false,
    // JSX > 是否将 > 放在同一行
    jsxBracketSameLine: false,
    // JSX 使用单引号
    jsxSingleQuote: true,
    // 每行最大字符数
    printWidth: 180, // 推荐 100~120
    // markdown/文档换行策略
    proseWrap: 'preserve',
    // 对象属性是否强制加引号
    quoteProps: 'as-needed',
    // 是否要求文件头有 @prettier
    requirePragma: false,
    // 语句末尾加分号
    semi: true,
    // 使用单引号
    singleQuote: true,
    // tab 宽度
    tabWidth: 4,
    // 末尾是否加逗号
    trailingComma: 'none', // es5/none/all
    // 使用 tab 还是空格
    useTabs: false,
    // Vue 文件 script/style 是否缩进
    vueIndentScriptAndStyle: false,
    // 是否格式化嵌入的代码（如 HTML <script>）
    embeddedLanguageFormatting: 'auto'
};
