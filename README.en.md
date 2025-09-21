<!-- Language Switch Button -->
<p align="right" style="margin-top: 10px;">
    <span style="padding: 6px 16px; background: #ededed; color: #333; border-radius: 6px; margin-left: 8px; font-weight: bold;">English</span>
    <a href="README.md" style="padding: 6px 16px; background: #2979ff; color: #fff; border-radius: 6px; text-decoration: none; font-weight: bold;">中文</a>
</p>

<p align="center">
    <img alt="logo" src="https://ik.imagekit.io/anyup/uview-pro/common/logo.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h3 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">uView Pro</h3>
<h3 align="center">uni-app Vue3 Multi-platform Rapid Development UI Framework</h3>

<div align="center">

[![star](https://gitee.com/anyup/uView-Pro/badge/star.svg)](https://gitee.com/anyup/uView-Pro)
[![fork](https://gitee.com/anyup/uView-Pro/badge/fork.svg)](https://gitee.com/anyup/uView-Pro)
[![stars](https://img.shields.io/github/stars/anyup/uView-Pro?style=flat-square&logo=GitHub)](https://github.com/anyup/uView-Pro)
[![forks](https://img.shields.io/github/forks/anyup/uView-Pro?style=flat-square&logo=GitHub)](https://github.com/anyup/uView-Pro)
[![issues](https://img.shields.io/github/issues/anyup/uView-Pro?style=flat-square&logo=GitHub)](https://github.com/anyup/uView-Pro/issues)
[![npm version](https://img.shields.io/npm/v/uview-pro)](https://www.npmjs.com/package/uview-pro)
[![Website](https://img.shields.io/badge/uView%20Pro-docs-blue?style=flat-square)](https://uviewpro.cn)
[![node version](https://img.shields.io/badge/node-%3E%3D18-green)](https://nodejs.org/)
[![pnpm version](https://img.shields.io/badge/pnpm-%3E%3D7.30-green)](https://pnpm.io/)
[![license](https://img.shields.io/github/license/anyup/uView-Pro?style=flat-square)](https://en.wikipedia.org/wiki/MIT_License)

</div>

## Description

uView UI is an excellent UI framework in the [uni-app](https://uniapp.dcloud.io/) ecosystem, providing comprehensive components and handy tools for efficient development.

uView Pro is a uni-app ecosystem framework that fully supports Vue3.0 and TypeScript. The baseline version of uView Pro is modified based on uView 1.8.8, completely reconstructed using TypeScript, and now fully supports uni-app Vue3.0.

## [Official Documentation: https://uviewpro.cn](https://uviewpro.cn)

## Features

- Compatible with Android, iOS, WeChat Mini Programs, H5, QQ Mini Programs, Baidu Mini Programs, Alipay Mini Programs, and Toutiao Mini Programs
- 70+ selected components, rich in functionality, multi-end compatibility, quick integration, and ready to use out of the box
- Numerous handy JS tools for efficient development
- A variety of commonly used pages and layouts, allowing you to focus on logic and achieve more with less effort
- Detailed documentation and modern demo effects
- On-demand import, streamlined bundle size

## Mobile Preview

You can scan the following QR codes with **WeChat** or **mobile browser** to view the best demo effect.

<table class="table">
    <tr>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qr_uview_pro_wx.jpg" width="200" height="200" ></td>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qr_uview_pro_h5.png" width="200" height="200" ></td>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qr_uview_pro_android.png" width="200" height="200" ></td>
    </tr>
    <tr>
        <td align="center"><strong>WeChat Mini Program</strong><br>(Scan with WeChat)</td>
        <td align="center"><strong>H5</strong><br>(Scan with browser)</td>
        <td align="center"><strong>Android</strong><br>(Scan with browser)</td>
    </tr>
</table>

To run the sample project, please [download the source code](https://github.com/anyup/uview-pro) and execute the following commands in the project root directory:

```bash
pnpm install
pnpm dev
```

For more running and building commands, please refer to the [pnpm Running Guide](README-pnpm.md)

## Links

- [Github](https://github.com/anyup/uview-pro)
- [Gitee](https://gitee.com/anyup/uview-pro)
- [Official Documentation](https://uviewpro.cn)
- [Changelog](https://github.com/anyup/uView-Pro/blob/master/src/uni_modules/uview-pro/changelog.md)

## Communication & Feedback

uView Pro QQ Group: [Click to Join](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=98nSVDldWEbDdq4lxiP4aL7uATfMSlI6&authKey=G2yQJ5MQiKzMldaxBsIfKt17NuJuUw8Fr6zdKLggc6NZXgw4BVbqkU2U3EE994yd&noverify=0&group_code=811732166)

<table class="table">
    <tr>
        <td><img src="https://ik.imagekit.io/anyup/images/social/weixin-chat.png?updatedAt=1758420557584" width="250" height="345" ></td>
        <td><img src="https://ik.imagekit.io/anyup/images/social/qq-chat.png" width="250" height="345" ></td>
    </tr>
    <tr>
        <td align="center"><strong>WeChat Group</strong><br></td>
        <td align="center"><strong>QQ Group</strong><br></td>
    </tr>
</table>

## About PR

We are very happy to accept high-quality PRs from everyone. However, please note that uView Pro needs to be compatible with multiple platforms (Mini Programs, H5, iOS App, Android App), including nvue and vue pages.

Therefore, before you fix bugs and submit PRs, please try your best to test compatibility on these platforms. It would be best to include test screenshots to facilitate review. Thank you very much!

## Installation And Configuration

uView Pro supports both `npm` and `uni_modules` installation methods, and the configuration is highly consistent. No matter which method you use, you can use easycom for automatic component import, greatly improving development efficiency. The following is a unified configuration guide:

### 1. Install uView Pro

- npm installation:

```bash
npm install uview-pro
# or
yarn add uview-pro
# or
pnpm add uview-pro
```

- uni_modules installation:

Download from HBuilderX plugin market or manually, and place uView Pro in the `uni_modules` directory.

[Plugin Market: https://ext.dcloud.net.cn/plugin?id=24633](https://ext.dcloud.net.cn/plugin?id=24633)

### 2. Import uView Pro main library

Import and register uView Pro in `main.ts`:

```js
// main.ts
import { createSSRApp } from 'vue';
// npm method
import uViewPro from 'uview-pro';
// uni_modules method
// import uViewPro from "@/uni_modules/uview-pro";

export function createApp() {
    const app = createSSRApp(App);
    app.use(uViewPro);
    return {
        app
    };
}
```

### 3. Import global styles

Import theme styles in `uni.scss`:

```scss
/* uni.scss */
// npm method
@import 'uview-pro/theme.scss';
// uni_modules method
// @import "@/uni_modules/uview-pro/theme.scss";
```

Import base styles at the top of `App.vue`:

```scss
<style lang="scss">
  // npm method
  @import "uview-pro/index.scss";
  // uni_modules method
  // @import "@/uni_modules/uview-pro/index.scss";
</style>
```

### 4. Configure easycom for automatic component import

Configure easycom rules in `pages.json` for automatic component import:

```json
// pages.json
{
    "easycom": {
        "autoscan": true,
        "custom": {
            // npm method
            "^u-(.*)": "uview-pro/components/u-$1/u-$1.vue"
            // uni_modules method
            // "^u-(.*)": "@/uni_modules/uview-pro/components/u-$1/u-$1.vue"
        }
    },
    "pages": [
        // ...
    ]
}
```

**Tips**

-   1. After modifying the `easycom` rules, you need to restart HX or recompile the project.
-   2. Please ensure there is only one easycom field in `pages.json`, otherwise please merge multiple rules yourself.
-   3. It must be placed inside `custom`, otherwise it will not take effect.

### 5. Volar Type Support

For global Volar type support in CLI projects, add the following to `tsconfig.json`:

```json
{
    "compilerOptions": {
        // npm method
        "types": ["uview-pro/types"]
        // uni_modules method
        // "types": ["@/uni_modules/uview-pro/types"]
    }
}
```

> HBuilderX projects do not support the types configuration in tsconfig.json. CLI projects are recommended to configure for the best TS experience.

### 6. Component Usage

After configuration, you can use uView Pro components directly in SFC without import or components registration:

```vue
<template>
    <u-button type="primary">Button</u-button>
</template>
```

See [Quick Start](https://uviewpro.cn/zh/components/quickstart.html) for more details.

## Donate to uView Pro

The documentation and framework source code of uView Pro are developed based on uView UI and are therefore open source and free. If you think uView Pro has helped your development work, you can donate to support uView Pro. There is no threshold for donation, even a cup of cola is appreciated (believe me, this is more meaningful than tipping a streamer).

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

## Contributors

<a href="https://github.com/anyup/uView-Pro/graphs/contributors">
  <img alt="Contributors" src="https://contrib.rocks/image?repo=anyup/uView-Pro" />
</a>

## License

uView Pro follows the [MIT](https://en.wikipedia.org/wiki/MIT_License) open source license, which means you do not need to pay any fees or obtain authorization to use uView Pro in your products.

## Acknowledgements

Special thanks to the uView UI development team, all contributors to uView UI, and all contributors to uView Pro.

- [Github](https://github.com/anyup/uview-pro)
- [Gitee](https://gitee.com/anyup/uview-pro)
- [uView UI 1.0](https://github.com/umicro/uView)
- [uView UI 2.0](https://github.com/umicro/uView2.0)
