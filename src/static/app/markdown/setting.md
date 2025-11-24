## 配置

uView Pro 支持 `npm` 和 `uni_modules` 两种主流安装方式，配置方式高度一致。无论采用哪种方式，均可通过 easycom 实现组件自动引入，极大提升开发效率。以下为统一的配置说明：

### 1. 安装 uView Pro

- npm 安装：

```bash
npm install uview-pro
# 或
yarn add uview-pro
# 或
pnpm add uview-pro
```

- uni_modules 安装：

通过 HBuilderX 插件市场或手动下载，将 uView Pro 放入 `uni_modules` 目录。

[插件市场：https://ext.dcloud.net.cn/plugin?id=24633](https://ext.dcloud.net.cn/plugin?id=24633)

### 2. 引入 uView Pro 主库

在 `main.ts` 中引入并注册 uView Pro：

```js
// main.ts
import { createSSRApp } from "vue";
// npm 方式
import uViewPro from "uview-pro";
// uni_modules 方式
// import uViewPro from "@/uni_modules/uview-pro";

export function createApp() {
  const app = createSSRApp(App);
  app.use(uViewPro);
  return {
    app,
  };
}
```

### 3. 引入全局样式

在 `uni.scss` 中引入主题样式：

```scss
/* uni.scss */
// npm 方式
@import "uview-pro/theme.scss";
// uni_modules 方式
// @import "@/uni_modules/uview-pro/theme.scss";
```

在 `App.vue` 首行引入基础样式：

```scss
<style lang="scss">
  // npm 方式
  @import "uview-pro/index.scss";
  // uni_modules 方式
  // @import "@/uni_modules/uview-pro/index.scss";
</style>
```

### 4. 配置 easycom 自动引入组件

在 `pages.json` 中配置 easycom 规则，实现组件自动引入：

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      // npm 方式
      "^u-(.*)": "uview-pro/components/u-$1/u-$1.vue",
      // uni_modules 方式
      // "^u-(.*)": "@/uni_modules/uview-pro/components/u-$1/u-$1.vue"
    }
  },
  "pages": [
    // ...
  ]
}
```

:::tip 温馨提示
- 1.修改 `easycom` 规则后需重启 HX 或重新编译项目。
- 2.请确保 `pages.json` 中只有一个 easycom 字段，否则请自行合并多个规则。
- 3.一定要放在 `custom` 内，否则无效。
:::

### 5. Volar 类型提示支持

如需在 CLI 项目中获得 Volar 的全局类型提示，请在 `tsconfig.json` 中添加：

```json
{
  "compilerOptions": {
    // npm 方式
    "types": ["uview-pro/types"]
    // uni_modules 方式
    // "types": ["@/uni_modules/uview-pro/types"]
  }
}
```

> HBuilderX 项目暂不支持 tsconfig.json 的 types 配置，CLI 项目推荐配置以获得最佳 TS 体验。

### 6. 组件使用

配置完成后，无需 import 和 components 注册，可直接在 SFC 中使用 uView Pro 组件：

```vue
<template>
  <u-button type="primary">按钮</u-button>
</template>
```

