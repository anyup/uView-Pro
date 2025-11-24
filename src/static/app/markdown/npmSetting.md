## npm 安装方式配置 <to-api/>

<!-- ### 关于SCSS

uView依赖SCSS，您必须要安装此插件，否则无法正常运行。

- 如果您的项目是由`HBuilder X`创建的，相信已经安装scss插件，如果没有，请在HX菜单的 工具->插件安装中找到"scss/sass编译"插件进行安装，
如不生效，重启HX即可
- 如果您的项目是由vue-cli创建的，请通过以下命令安装对sass(scss)的支持，如果已安装，请略过。

```js
// 安装node-sass
npm i node-sass -D

// 安装sass-loader
npm i sass-loader -D
``` -->

### 准备工作

在进行配置之前，请确保您已经根据[安装](/components/install.html)中的步骤对 uView 进行了 npm 安装，如果没有，请先执行安装：

```js
// 如果您的项目是HX创建的，根目录又没有package.json文件的话，请先执行如下命令：
// npm init -y

// npm 安装
npm install uview-pro
// yarn 安装
yarn add uview-pro
// pnpm 安装
pnpm add uview-pro
```

### 配置步骤

#### 1. 引入 uView 主库

在项目根目录中的`main.ts`中，引入并使用 uView 的工具库，注意这两行要放在`import Vue`之后。

```js
// main.ts
import { createSSRApp } from "vue";
import uViewPro from "uview-pro";

export function createApp() {
  const app = createSSRApp(App);
  app.use(uViewPro);
  // 其他配置
  return {
    app,
  };
}
```

#### 2. 在引入 uView 的全局 SCSS 主题文件

在项目根目录的`uni.scss`中引入此文件。

```css
/* uni.scss */
@import "uview-pro/theme.scss";
```

#### 3. 引入 uView 基础样式

:::danger 注意！
在`App.vue`中**首行**的位置引入，注意给 style 标签加入 lang="scss"属性
:::

```css
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-pro/index.scss";
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
      "^u-(.*)": "uview-pro/components/u-$1/u-$1.vue"
    }
  },
  // 此为本身已有的内容
  "pages": [
    // ......
  ]
}
```
