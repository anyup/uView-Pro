<p align="center">
    <img alt="logo" src="https://ik.imagekit.io/anyup/uview-pro/common/logo.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h3 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">uView Pro</h3>
<h3 align="center">uni-app Vue3 多平台快速开发的 UI 框架</h3>

[![star](https://gitee.com/anyup/uView-Pro/badge/star.svg)](https://gitee.com/anyup/uView-Pro)
[![fork](https://gitee.com/anyup/uView-Pro/badge/fork.svg)](https://gitee.com/anyup/uView-Pro)
[![stars](https://img.shields.io/github/stars/anyup/uView-Pro?style=flat-square&logo=GitHub)](https://github.com/anyup/uView-Pro)
[![forks](https://img.shields.io/github/forks/anyup/uView-Pro?style=flat-square&logo=GitHub)](https://github.com/anyup/uView-Pro)
[![issues](https://img.shields.io/github/issues/anyup/uView-Pro?style=flat-square&logo=GitHub)](https://github.com/anyup/uView-Pro/issues)
[![npm version](https://img.shields.io/npm/v/uview-pro)](https://www.npmjs.com/package/uview-pro)
[![Website](https://img.shields.io/badge/uView%20Pro-docs-blue?style=flat-square)](https://uview-pro.anyup.cn/)
[![node version](https://img.shields.io/badge/node-%3E%3D18-green)](https://nodejs.org/)
[![pnpm version](https://img.shields.io/badge/pnpm-%3E%3D7.30-green)](https://pnpm.io/)
[![license](https://img.shields.io/github/license/anyup/uView-Pro?style=flat-square)](https://en.wikipedia.org/wiki/MIT_License)

## 说明

uView UI，是 [uni-app](https://uniapp.dcloud.io/) 生态优秀的 UI 框架，全面的组件和便捷的工具会让您信手拈来，如鱼得水。

uView Pro，是全面支持 Vue3.0、TypeScript 的 uni-app 生态框架，uView Pro 的基线版本是基于 uView 1.8.8 修改，使用 TypeScript 完全重构，目前已全面支持 uni-app Vue3.0。

## [官方文档：https://uview-pro.netlify.app/](https://uview-pro.netlify.app/)

## 特性

-   兼容安卓，iOS，微信小程序，H5，QQ 小程序，百度小程序，支付宝小程序，头条小程序
-   70+精选组件，功能丰富，多端兼容，让您快速集成，开箱即用
-   众多贴心的 JS 利器，让您飞镖在手，召之即来，百步穿杨
-   众多的常用页面和布局，让您专注逻辑，事半功倍
-   详尽的文档支持，现代化的演示效果
-   按需引入，精简打包体积

## 手机预览

您可以通过**微信**或**手机浏览器**扫描以下二维码，查看最佳的演示效果。

<table class="table">
    <tr>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qr_uview_pro_wx.jpg" width="200" height="200" ></td>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qr_uview_pro_h5.png" width="200" height="200" ></td>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qr_uview_pro_android.png" width="200" height="200" ></td>
    </tr>
    <tr>
        <td align="center"><strong>微信小程序</strong><br>（微信扫码）</td>
        <td align="center"><strong>H5</strong><br>（浏览器扫码）</td>
        <td align="center"><strong>Android</strong><br>（浏览器扫码）</td>
    </tr>
</table>

运行示例工程，请[下载源码](https://github.com/anyup/uview-pro)后，在项目根目录执行以下命令：

```bash
pnpm install
pnpm dev
```

## 链接

-   [Github](https://github.com/anyup/uview-pro)
-   [Gitee](https://gitee.com/anyup/uview-pro)
-   [官方文档](https://uview-pro.netlify.app/)
-   [更新日志](https://github.com/anyup/uView-Pro/blob/master/src/uni_modules/uview-pro/changelog.md)

## 交流反馈

uView Pro QQ 交流群： [点击进入](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=98nSVDldWEbDdq4lxiP4aL7uATfMSlI6&authKey=G2yQJ5MQiKzMldaxBsIfKt17NuJuUw8Fr6zdKLggc6NZXgw4BVbqkU2U3EE994yd&noverify=0&group_code=811732166)

<table class="table">
    <tr>
        <td><img src="https://ik.imagekit.io/anyup/images/social/weixin-chat.png" width="250" height="345" ></td>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qq-chat.png" width="250" height="345" ></td>
    </tr>
    <tr>
        <td align="center"><strong>微信群</strong><br></td>
        <td align="center"><strong>QQ群</strong><br></td>
    </tr>
</table>

## 关于 PR

我们非常乐意接受各位的优质 PR，但在此之前我希望您了解 uView Pro 是一个需要兼容多个平台的（小程序、h5、iOS App、Android App）包括 nvue 页面、vue 页面。

所以希望在您修复 bug 并提交之前尽可能的去这些平台测试一下兼容性。最好能携带测试截图以方便审核。非常感谢！

## 安装

#### **npm 安装**

```bash
# npm 安装
npm install uview-pro

# yarn 安装
yarn add uview-pro

# pnpm 安装
pnpm add uview-pro
```

#### **插件市场下载**

[https://ext.dcloud.net.cn/plugin?id=24633](https://ext.dcloud.net.cn/plugin?id=24633)

## 快速上手

1. `main.ts`引入 uView 库

```js
// main.ts
import { createSSRApp } from 'vue';
// npm安装方式
import uViewPro from 'uview-pro';

// uni_modules安装方式
// import uViewPro from '@/uni_modules/uview-pro';

export function createApp() {
    const app = createSSRApp(App);
    app.use(uViewPro);
    // 其他配置
    return {
        app
    };
}
```

2. `App.vue`引入基础样式(注意 style 标签需声明 scss 属性支持)

```css
/* App.vue */
<style lang="scss">
/* npm安装方式 */
@import "uview-pro/index.scss";

/* uni_modules安装方式 */
/* @import "@/uni_modules/uview-pro/index.scss"; */
</style>
```

3. `uni.scss`引入全局 scss 变量文件

```css
/* npm安装方式 */
@import 'uview-pro/theme.scss';

/* uni_modules安装方式 */
/* @import '@/uni_modules/uview-pro/theme.scss'; */
```

4. `pages.json`配置 easycom 规则(按需引入)

```js
// pages.json
{
    "easycom": {
        // 注意一定要放在custom里，否则无效，https://ask.dcloud.net.cn/question/131175
        "custom": {
            // uni_modules安装的方式需要前面的"@/uni_modules/"，npm安装的方式无需"@/"，以下方式任选其一
            // npm安装方式
            "^u-(.*)": "uview-pro/components/u-$1/u-$1.vue"
            // uni_modules安装方式
            // "^u-(.*)": "@/uni_modules/uview-pro/components/u-$1/u-$1.vue"
        }
    },
    // 此为本身已有的内容
    "pages": [
        // ......
    ]
}
```

请通过[快速上手](https://uview-pro.netlify.app/components/quickstart.html)了解更详细的内容

## 使用方法

配置 easycom 规则后，自动按需引入，无需`import`组件，直接引用即可。

> 注意：配置完以上规则后，一定要重新运行 uni-app 项目，否则不会生效

```html
<template>
    <u-button>按钮</u-button>
</template>
```

请通过[快速上手](https://uview-pro.netlify.app/components/quickstart.html)了解更详细的内容

## 捐赠 uView Pro

uView Pro 文档内容和框架源码基于 uView UI 二次开发，因此全部开源免费，如果您认为 uView Pro 帮到了您的开发工作，您可以捐赠 uView Pro 的研发工作，捐赠无门槛，哪怕是一杯可乐也好(相信这比打赏主播更有意义)。

<table class="table">
    <tr>
        <td><img src="https://ik.imagekit.io/anyup/images/social/weixin-pay.png" width="250" height="345" ></td>
        <td><img src="https://ik.imagekit.io/anyup/images/social/ali-pay.png" width="250" height="345" ></td>
    </tr>
    <tr>
        <td align="center"><strong>微信</strong><br></td>
        <td align="center"><strong>支付宝</strong><br></td>
    </tr>
</table>

## 版权信息

uView Pro 遵循[MIT](https://en.wikipedia.org/wiki/MIT_License)开源协议，意味着您无需支付任何费用，也无需授权，即可将 uView Pro 应用到您的产品中。

## 鸣谢

再次感谢 uView UI 开发团队，以及所有为 uView UI 的贡献者，以及所有为 uView Pro 的贡献者。

-   [Github](https://github.com/anyup/uview-pro)
-   [Gitee](https://gitee.com/anyup/uview-pro)
-   [uView UI 1.0](https://github.com/umicro/uView)
-   [uView UI 2.0](https://github.com/umicro/uView2.0)
