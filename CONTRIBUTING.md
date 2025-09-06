# 贡献指南

感谢您的贡献！为保证代码风格统一，所有提交必须通过 Prettier 格式化校验。

## 代码风格要求

- 仓库已配置 `.prettierrc.js`，请勿修改格式化规则。
- 所有 JS/TS/Vue/SCSS/MD/JSON 文件必须通过 Prettier 校验。
- 提交前会自动执行格式化检查，未通过则无法提交。

## 本地开发建议

1. 安装依赖：
    ```bash
    npm install
    ```
2. 推荐在编辑器安装 Prettier 插件，保存时自动格式化。
3. 手动格式化：
    ```bash
    npm run format
    ```

## PR 合并要求

- 未通过 Prettier 校验的代码将被拒绝合并。
- 如遇格式化问题请先修复后再提交。
