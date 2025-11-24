## uni_modules 安装方式配置

uView Pro 提供了多种安装方式，本文将介绍如何使用 uni_modules 方式进行配置。

### 准备工作

在进行配置之前，请确保您已经根据[安装](/components/install.html)中的步骤对 uView Pro 进行了下载安装，如果没有，请先下载安装。

### 配置步骤

#### 1. 引入 uView 主库

在项目根目录中的`main.ts`中，引入并使用 uView Pro 的工具库，注意这两行要放在`import Vue`之后。

```js
// main.ts
import { createSSRApp } from "vue";
import uViewPro from "@/uni_modules/uview-pro";

export function createApp() {
  const app = createSSRApp(App);
  app.use(uViewPro);
  // 其他配置
  return {
    app,
  };
}
```

#### 2. 在引入 uView Pro 的全局 SCSS 主题文件

在项目根目录的`uni.scss`中引入此文件。

```css
/* uni.scss */
@import "@/uni_modules/uview-pro/theme.scss";
```

#### 3. 引入 uView Pro 基础样式

:::danger 注意！
在`App.vue`中**首行**的位置引入，注意给 style 标签加入 lang="scss"属性
:::

```css
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-pro/index.scss";
</style>
```

#### 4. 配置 easycom 组件模式

此配置需要在项目根目录的`pages.json`中进行。

:::tip 温馨提示

1. uni-app 为了调试性能的原因，修改`easycom`规则不会实时生效，配置完后，您需要重启 HX 或者重新编译项目才能正常使用 uView 的功能。
2. 请确保您的`pages.json`中只有一个`easycom`字段，否则请自行合并多个引入规则。
3. 注意一定要放在`custom`里，否则无效，https://ask.dcloud.net.cn/question/131175

:::

```json
// pages.json
{
  "easycom": {
    // 注意一定要放在custom里，否则无效，https://ask.dcloud.net.cn/question/131175
    "custom": {
      "^u-(.*)": "@/uni_modules/uview-pro/components/u-$1/u-$1.vue"
    }
  },
  // 此为本身已有的内容
  "pages": [
    // ......
  ]
}
```
