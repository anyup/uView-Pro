<!-- 语言切换按钮 -->
<p align="right" style="margin-top: 10px;">
    <span style="padding: 6px 16px; background: #ededed; color: #333; border-radius: 6px; margin-left: 8px; font-weight: bold;">English</span>
    <a href="README.md" style="padding: 6px 16px; background: #2979ff; color: #fff; border-radius: 6px; text-decoration: none; font-weight: bold;">中文</a>
</p>

<p align="center">
    <img alt="logo" src="https://ik.imagekit.io/anyup/uview-pro/common/logo.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h3 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">uView Pro</h3>
<h3 align="center">uni-app Vue3 Multi-platform Rapid Development UI Framework</h3>

[![star](https://gitee.com/anyup/uView-Pro/badge/star.svg)](https://gitee.com/anyup/uView-Pro)
[![fork](https://gitee.com/anyup/uView-Pro/badge/fork.svg)](https://gitee.com/anyup/uView-Pro)
[![stars](https://img.shields.io/github/stars/anyup/uView-Pro?style=flat-square&logo=GitHub)](https://github.com/anyup/uView-Pro)
[![forks](https://img.shields.io/github/forks/anyup/uView-Pro?style=flat-square&logo=GitHub)](https://github.com/anyup/uView-Pro)
[![issues](https://img.shields.io/github/issues/anyup/uView-Pro?style=flat-square&logo=GitHub)](https://github.com/anyup/uView-Pro/issues)
[![license](https://img.shields.io/github/license/anyup/uView-Pro?style=flat-square)](https://en.wikipedia.org/wiki/MIT_License)

## Introduction

uView UI is an excellent UI framework in the [uni-app](https://uniapp.dcloud.io/) ecosystem. Its comprehensive components and convenient tools will make you feel at ease and in control.

uView Pro is a uni-app ecological framework that fully supports Vue3.0 and TypeScript. The baseline version of uView Pro is modified based on uView 1.8.8, completely reconstructed using TypeScript, and now fully supports uni-app Vue3.0.

## [Official Documentation: https://uview-pro.netlify.app/](https://uview-pro.netlify.app/)

## Features

-   Compatible with Android, iOS, WeChat Mini Programs, H5, QQ Mini Programs, Baidu Mini Programs, Alipay Mini Programs, and Toutiao Mini Programs
-   70+ selected components, rich in functionality, multi-end compatibility, allowing for quick integration and ready-to-use out of the box
-   Numerous handy JS tools at your disposal, enabling precise and efficient development
-   A variety of commonly used pages and layouts, allowing you to focus on logic and achieve more with less effort
-   Detailed documentation support and modern demonstration effects
-   On-demand introduction, streamlined packaging size

## Mobile Preview

You can scan the following QR codes with **WeChat** or **mobile browser** to view the best demonstration effect.

<table class="table">
    <tr>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qr_uview_pro_wx.jpg" width="200" height="200" ></td>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qr_uview_pro_h5.png" width="200" height="200" ></td>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qr_uview_pro_android.png" width="200" height="200" ></td>
    </tr>
    <tr>
        <td align="center"><strong>WeChat Mini Program</strong><br>（Scan with WeChat）</td>
        <td align="center"><strong>H5</strong><br>（Scan with browser）</td>
        <td align="center"><strong>Android</strong><br>（Scan with browser）</td>
    </tr>
</table>

To run the sample project, please [download the source code](https://github.com/anyup/uview-pro), and execute the following commands in the project root directory:

```bash
pnpm install
pnpm dev
```

For more running and building commands, please refer to the [pnpm Running Guide](README-pnpm.md)

## Links

-   [Github](https://github.com/anyup/uview-pro)
-   [Gitee](https://gitee.com/anyup/uview-pro)
-   [Official Documentation](https://uview-pro.netlify.app/)
-   [Change Log](https://uview-pro.netlify.app/components/changelog.html)
-   [Upgrade Guide](https://uview-pro.netlify.app/components/changelog.html)
-   [About Us](https://uview-pro.netlify.app/cooperation/about.html)

## Communication and Feedback

uView Pro QQ Group: [Click to Enter](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=98nSVDldWEbDdq4lxiP4aL7uATfMSlI6&authKey=G2yQJ5MQiKzMldaxBsIfKt17NuJuUw8Fr6zdKLggc6NZXgw4BVbqkU2U3EE994yd&noverify=0&group_code=811732166)

<table class="table">
    <tr>
        <td><img src="https://ik.imagekit.io/anyup/images/social/weixin-chat.png" width="250" height="345" ></td>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qq-chat.png" width="250" height="345" ></td>
    </tr>
    <tr>
        <td align="center"><strong>WeChat Group</strong><br></td>
        <td align="center"><strong>QQ Group</strong><br></td>
    </tr>
</table>

## About PR

We are very happy to accept high-quality PRs from everyone. However, before that, I hope you understand that uView Pro needs to be compatible with multiple platforms (Mini Programs, h5, iOS App, Android App), including nvue pages and vue pages.

Therefore, before you fix bugs and submit PRs, please try your best to test the compatibility on these platforms. It would be best to include test screenshots to facilitate review. Thank you very much!

## Installation

#### **npm Installation**

```bash
# npm Installation
npm install uview-pro

# yarn Installation
yarn add uview-pro

# pnpm Installation
pnpm add uview-pro
```

#### **Download from Plugin Market**

[https://ext.dcloud.net.cn/plugin?id=24633](https://ext.dcloud.net.cn/plugin?id=24633)

## Quick Start

1. Introduce the uView library in `main.ts`

```js
// main.ts
import { createSSRApp } from 'vue';
import uViewPro from 'uview-pro';

export function createApp() {
    const app = createSSRApp(App);
    app.use(uViewPro);
    // Other configurations
    return {
        app
    };
}
```

2. Introduce basic styles in `App.vue` (note that the style tag needs to declare scss attribute support)

```css
/* App.vue */
<style lang="scss">
@import "uview-pro/index.scss";
</style>
```

3. Introduce global scss variable file in `uni.scss`

```css
/* uni.scss */
@import 'uview-pro/theme.scss';
```

4. Configure easycom rules in `pages.json` (on-demand introduction)

```js
// pages.json
{
    "easycom": {
        // For uni_modules installation, the "@" in front is required, no "@" is needed for npm installation
        // npm installation method
        "^u-(.*)": "uview-pro/components/u-$1/u-$1.vue"
        // uni_modules installation method
        // "^u-(.*)": "@/uni_modules/uview-pro/components/u-$1/u-$1.vue"
    },
    // Existing content
    "pages": [
        // ......
    ]
}
```

For more detailed content, please refer to [Quick Start](https://uview-pro.netlify.app/components/quickstart.html)

## Usage

After configuring the easycom rules, components are automatically introduced as needed. There is no need to `import` components, you can use them directly.

```html
<template>
    <u-button>Button</u-button>
</template>
```

For more detailed content, please refer to [Quick Start](https://uview-pro.netlify.app/components/quickstart.html)

## Donate to uView Pro

The documentation content and framework source code of uView Pro are developed based on uView UI, and are therefore open source and free. If you think uView Pro has helped your development work, you can donate to the development of uView Pro. There is no threshold for donation, even a cup of cola is appreciated (believe me, this is more meaningful than tipping a streamer).

<table class="table">
    <tr>
        <td><img src="https://ik.imagekit.io/anyup/images/social/weixin-pay.png" width="250" height="345" ></td>
        <td><img src="https://ik.imagekit.io/anyup/images/social/ali-pay.png" width="250" height="345" ></td>
    </tr>
    <tr>
        <td align="center"><strong>WeChat</strong><br></td>
        <td align="center"><strong>Alipay</strong><br></td>
    </tr>
</table>

## License Information

uView Pro follows the [MIT](https://en.wikipedia.org/wiki/MIT_License) open source license, which means you do not need to pay any fees or obtain authorization to use uView Pro in your products.

## Acknowledgements

Special thanks to the uView UI development team, all contributors to uView UI, and all contributors to uView Pro.

-   [Github](https://github.com/anyup/uview-pro)
-   [Gitee](https://gitee.com/anyup/uview-pro)
-   [uView UI 1.0](https://github.com/umicro/uView)
-   [uView UI 2.0](https://github.com/umicro/uView2.0)
