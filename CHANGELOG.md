# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.10] - 2025-12-26

### 🚀 Chore | 构建/工程依赖/工具

- **contributors:** 更新贡献者映射配置 ([d496b21](https://github.com/anyup/uView-Pro/commit/d496b21d85bede68fefc9ffd752e31ecde14735a))

### 🐛 Bug Fixes | Bug 修复

- **u-popup:** 修复u-popup设置mode=center，点击遮罩层无法关闭的问题 ([3896019](https://github.com/anyup/uView-Pro/commit/389601965933d9e1dc74d32c370c4e858df86595))
- **u-upload:** 优化u-upload组件在多个平台的样式兼容性 ([bfb60b5](https://github.com/anyup/uView-Pro/commit/bfb60b5c2f431d14425eceed9c9e5c248e7cfa29))

### ✨ Features | 新功能

- **u-tabbar:** 增强u-tabbar组件能力，支持文字和图标显示隐藏配置功能 ([29f3394](https://github.com/anyup/uView-Pro/commit/29f3394d7e8a5e2a818e397ffe97420855970333))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## [0.4.9] - 2025-12-24

### 📝 Documentation | 文档

- **readme:** 修复捐赠页面链接 ([93323ab](https://github.com/anyup/uView-Pro/commit/93323ab414ddc5a4542604928f221a050cbe55c5))

### ✨ Features | 新功能

- **request:** 增强http请求工具，添加请求超时配置和全局配置合并功能 ([54d4a44](https://github.com/anyup/uView-Pro/commit/54d4a448a82d76889524cc2ad0f8f08b758b73fb))
- **http:** 修改http请求实例和响应拦截器 ([d566496](https://github.com/anyup/uView-Pro/commit/d56649673103b519492033504aa387cd6d037721))
- **source:** 添加静态资源文件 ([346bce6](https://github.com/anyup/uView-Pro/commit/346bce63126c4cb2c9db1f1665568eb11e26be07))
- **pages:** 优化多个页面演示样式，统一布局和暗黑模式 ([da68f17](https://github.com/anyup/uView-Pro/commit/da68f17ddf3018f7f5d53a7eebfb3dc1bad550ab))
- **i18n:** 完善国际化支持文案 ([68accbd](https://github.com/anyup/uView-Pro/commit/68accbd1d864f190e510de380d4ed8d603f8676b))
- **pages:** 更新iconfont图标 ([bafd4af](https://github.com/anyup/uView-Pro/commit/bafd4af26f6d2ca4dbe6e818b31be84f57c787b0))
- **demo-page:** 调整演示页面样式并添加tabbar支持 ([f4c5cfc](https://github.com/anyup/uView-Pro/commit/f4c5cfc70920b50602f226220ded4690279cb331))

### 🚀 Chore | 构建/工程依赖/工具

- **harmony:** 添加调试配置并调整harmony兼容版本 ([bd18fd2](https://github.com/anyup/uView-Pro/commit/bd18fd234bf0aec9671663f5b26294b4622bae81))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## [0.4.8] - 2025-12-23

### 🐛 Bug Fixes | Bug 修复

- **u-avatar:** 修复 ios 微信小程序默认头像不显示问题 ([9e3420f](https://github.com/anyup/uView-Pro/commit/9e3420fb8d0db533ce7fb3a8e83543b43ac0c7a7))
- 修复 u-cell 组件中使用 u-icon 样式在微信小程序不生效问题，修复 u-upload 图片上传失败重试是否显示提示配置不生效问题 ([e591d62](https://github.com/anyup/uView-Pro/commit/e591d62befce95c207ca47158549e6fd97f1e58d))
- **u-cell-item:** 修复图标样式问题并优化组件结构 ([294bf4b](https://github.com/anyup/uView-Pro/commit/294bf4be88fb53a2ccd72fcc8702b09f6d736a30))

### ♻️ Code Refactoring | 代码重构

- **theme:** 修改主题默认为官方内置主题，暗黑模式默认为亮色 ([176b482](https://github.com/anyup/uView-Pro/commit/176b48210209ae362fe30e459e73dff6fc81b53e))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/lime"><img src="https://github.com/lime.png?size=40" width="40" height="40" alt="lime" title="lime"/></a> 

## [0.4.7] - 2025-12-19

### 🚀 Chore | 构建/工程依赖/工具

- 忽略部分文件 ([a8a747f](https://github.com/anyup/uView-Pro/commit/a8a747f97e93ed278a305cd1b2671d2ede5c0fde))

### ✨ Features | 新功能

- **u-tabbar:** u-tabbar 组件支持 custom-icon 直接配置图标 custom-prefix ([e577c2d](https://github.com/anyup/uView-Pro/commit/e577c2d083cf46db7124b0df46b2848ef9bdbe80))

### 🐛 Bug Fixes | Bug 修复

- **u-icon:** 修复图标组件样式和事件处理问题 ([1cadf27](https://github.com/anyup/uView-Pro/commit/1cadf27f8bd2aec3a11fb1befb9255256a2e3b3a))
- **u-pagination:** 修复分页切换时传递不正确的当前页码值 ([4befe02](https://github.com/anyup/uView-Pro/commit/4befe02c5cbb4e7db6fbf49f04ca68fac0f69a37))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## [0.4.6] - 2025-12-17

### 📝 Documentation | 文档

- 添加鸿蒙系统预览说明及二维码 ([7f6199a](https://github.com/anyup/uView-Pro/commit/7f6199a30d5477743c20b27a94711b4605787757))

### ✨ Features | 新功能

- **u-slider:** 增强滑块组件功能与灵活性，支持设置滑块的整体范围起点(start)和终点(end) ([a20c44b](https://github.com/anyup/uView-Pro/commit/a20c44b0270cffde02afd8738a932b2d6bae49f4))
- **button:** 新增按钮禁用与自定义样式功能演示 ([5f1f482](https://github.com/anyup/uView-Pro/commit/5f1f4823e027dc5ab2e6f49f29fe327c6d4318c6))

### 🐛 Bug Fixes | Bug 修复

- **button:** 更新禁用状态下按钮样式优先级 ([b3ff20b](https://github.com/anyup/uView-Pro/commit/b3ff20b59818c8bc8204bb2a489eff42ded7e842))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## [0.4.5] - 2025-12-10

### ✨ Features | 新功能

- **u-input:** 为选择类型输入框添加覆盖层以增强交互 ([9b7bac2](https://github.com/anyup/uView-Pro/commit/9b7bac221195d010c31b15915d2927d095bd257f))
- **u-form:** 增强 u-form 深层校验、动态校验表单 ([97d0ccb](https://github.com/anyup/uView-Pro/commit/97d0ccbe03391f63bed81dcfd1af1432f4f7c77d))

### 🐛 Bug Fixes | Bug 修复

- **u-input:** 修复清空图标点击事件冒泡问题 ([8a214ff](https://github.com/anyup/uView-Pro/commit/8a214ffe8e5588395cdc456e600bc8dd0f03a603))
- **style:** 修复除H5环境外主题样式作用域问题 ([c02ba3c](https://github.com/anyup/uView-Pro/commit/c02ba3c1454e709b1fa9de817d77b0f2128b5fc0))
- **u-switch:** 修复开关组件激活颜色默认值的响应式问题 ([3d78647](https://github.com/anyup/uView-Pro/commit/3d78647d75c3201cced2643395ff5dd935d0e7ec))
- **form:** 修复 form 校验报错问题 ([8d6d60d](https://github.com/anyup/uView-Pro/commit/8d6d60d4af4e5653f7b87afc3f208d0e26809505))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/yoshinosk"><img src="https://github.com/yoshinosk.png?size=40" width="40" height="40" alt="yoshinosk" title="yoshinosk"/></a> 

## [0.4.4] - 2025-12-08

### ✨ Features | 新功能

- **u-card:** u-card 组件的默认插槽同 body 插槽 ([ffa13ed](https://github.com/anyup/uView-Pro/commit/ffa13edcf17ff1559e8bdf2260f6b146680f9d07))
- **u-tag:** 优化自定义样式 custom-style 应用，支持 text 插槽内容 ([5bdb733](https://github.com/anyup/uView-Pro/commit/5bdb73346252850d74165cda0bb00766e5f6f59f))
- **u-line-progress:** 优化u-line-progress进度条百分比显示方式 ([1c1d979](https://github.com/anyup/uView-Pro/commit/1c1d97958f3c7e5a28943b46ea25d38b50449364))
- **switch:** 增强开关组件支持自定义值类型 ([2bcb136](https://github.com/anyup/uView-Pro/commit/2bcb1368aa1f3c7fe83799e909b89fc4349b30c3))

### 📝 Documentation | 文档

- 优化 Markdown 文档样式和格式 ([c80ff6d](https://github.com/anyup/uView-Pro/commit/c80ff6df269eb92a88001373aa96344ff4cafb79))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/liujiayii"><img src="https://github.com/liujiayii.png?size=40" width="40" height="40" alt="liujiayii" title="liujiayii"/></a> 

## [0.4.3] - 2025-12-03

### 📝 Documentation | 文档

- 更新项目描述和移除冗余信息 ([3d5c105](https://github.com/anyup/uView-Pro/commit/3d5c1053873a1a1dc592e02caf62b5e5f9aba3ad))
- **readme:** 更新交流反馈和捐赠链接 ([266e788](https://github.com/anyup/uView-Pro/commit/266e7883a4e2f3ea8058e0bba0b7ce07a972bad8))

### 🐛 Bug Fixes | Bug 修复

- **theme:** 修复不使用 u-config-privider 全局注入时，部分颜色变量不存在的问题 ([cd82d9d](https://github.com/anyup/uView-Pro/commit/cd82d9da3e8fd6066177e3b78b855583e2756a5f))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## [0.4.2] - 2025-12-01

### 📝 Documentation | 文档

- **scripts:** 更新发布指定版本说明文档 ([db6bfe8](https://github.com/anyup/uView-Pro/commit/db6bfe8a7ec2812f34738b5b707240cdfe57e8b3))

### 🐛 Bug Fixes | Bug 修复

- **theme:** 修复npm方式加载主题包失效的问题 ([7b9c947](https://github.com/anyup/uView-Pro/commit/7b9c947581697ddbd36632919652689ca8595503))
- **dark-mode:** 修复 App 平台暗黑模式跟随系统下，切换系统暗黑模式后不即时生效问题 ([880b181](https://github.com/anyup/uView-Pro/commit/880b18153d186f6f5c5f9c81bf12307bd8f00c22))
- **initTheme:** 优化组件库 install 方法中的主题初始化默认逻辑 ([39e273b](https://github.com/anyup/uView-Pro/commit/39e273b98cd53ec2891c7e68419dd6dfbbeb30c0))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## [0.4.1] - 2025-11-30

### ✨ Features | 新功能

- **root:** 新增根节点组件支持，优化主题文件 ([12d14f8](https://github.com/anyup/uView-Pro/commit/12d14f8c859bae1e330b246b6eb1f87c2597c2d7))
- **iconfont:** 新增iconfont实例 ([4d34d25](https://github.com/anyup/uView-Pro/commit/4d34d25f0c124a6622b8b38b7501b85586843a42))
- **locales:** 新增locales中英文字段 ([2dbad6d](https://github.com/anyup/uView-Pro/commit/2dbad6d38bc5cd2fbe55aa0998d2264782cb4dfe))
- **markdown-view:** 新增 markdown-view 模块 ([9e21b6a](https://github.com/anyup/uView-Pro/commit/9e21b6af96c17175dd178923ab2f98c595bacb20))
- **u-config-provider:** 新增 u-config-provider 组件用于全局主题管理 ([f44857c](https://github.com/anyup/uView-Pro/commit/f44857c44f0354b9408bc40c8d586ace1ea40538))
- **theme:** 实现自定义多主题，主题切换功能 ([9551d26](https://github.com/anyup/uView-Pro/commit/9551d260451d2c21b7fe9dfab4850a57c5601573))
- **demo:** 新增 demo-page 组件并重构组件演示页面，添加 API 文档展示 ([ecfd77e](https://github.com/anyup/uView-Pro/commit/ecfd77ea3776720e0bbba7f7678896e685adff3a))
- **demo-page:** 优化代码示例组件文档获取方式 ([50738be](https://github.com/anyup/uView-Pro/commit/50738beafa879e3f95831287a1aa7cb560b59c20))
- **theme:** 实现暗黑模式并优化多主题管理 ([38f9346](https://github.com/anyup/uView-Pro/commit/38f93464edf7ba3e6a0d28c025e31cfe27a147bb))
- **u-config-provider:** 完善u-config-provider主题注入和暗黑模式切换 ([726a7f9](https://github.com/anyup/uView-Pro/commit/726a7f96a31c2e6346c9037842963624b22c3f60))
- **demo:** 优化主题切换示例逻辑和样式 ([d69af6a](https://github.com/anyup/uView-Pro/commit/d69af6a82b639d35ce757abccccb9f8f9aae14a5))
- **theme:** 优化主题系统，兼容单主题、多主题配置能力 ([d06cd7f](https://github.com/anyup/uView-Pro/commit/d06cd7f592e5ae4f9dae7f0cd90f173f76cc5e62))
- **theme:** 更新深蓝主题的色彩配置 ([77e8e5c](https://github.com/anyup/uView-Pro/commit/77e8e5c6ca55281253f86dbc5244c807f04324b3))
- **config-provider:** 增加非 H5 平台系统暗黑模式识别 ([2175dc6](https://github.com/anyup/uView-Pro/commit/2175dc6892f7f559507e19c44638f5c57ac13e4a))
- **u-button:** 调整u-button按钮节流默认值为0，优化点击逻辑 ([3fa2593](https://github.com/anyup/uView-Pro/commit/3fa2593dba31c05a97e001fda9cd233306f42a9d))
- **theme:** 优化主题配置中的暗黑模式处理逻辑，按规则自动生成完整暗色方案 ([8246853](https://github.com/anyup/uView-Pro/commit/82468538004c88637b98c9bd2381b0d44aef0d22))
- **system:** 添加系统主题变更监听 ([9c35243](https://github.com/anyup/uView-Pro/commit/9c3524390847d92c7345e8a27c4603afa8d094f4))
- **theme:** 多主题配置兼容单主题 ([79d3223](https://github.com/anyup/uView-Pro/commit/79d3223459a306fb4ba320713ed03a4a6579f563))
- **u-image:** 增强 u-image 组件自定义样式 ([b133c3c](https://github.com/anyup/uView-Pro/commit/b133c3c00f14738eaa0a61eaec19dbe1b5defcfe))

### ♻️ Code Refactoring | 代码重构

- **app:** 添加本地应用资源 ([cd3f020](https://github.com/anyup/uView-Pro/commit/cd3f02074c871772ea0e42fb26336751eeda7c35))
- **theme:** 重构主题配置和颜色处理逻辑 ([31aa36b](https://github.com/anyup/uView-Pro/commit/31aa36b9207144836be7073a804b8c7ebd68fc6b))
- **demo:** 修改演示页面功能及样式，调整演示组件整体样式 ([8760b3c](https://github.com/anyup/uView-Pro/commit/8760b3c82ff129bd1695e384abbc762de6c85cd4))
- **components:** 优化多个组件主题颜色变量使用，兼容多主题和暗黑模式 ([1a2856f](https://github.com/anyup/uView-Pro/commit/1a2856fc98ec3169d29330f9b7470e936d4aa334))
- **demo:** 优化演示示例 Demo 的功能 ([445878b](https://github.com/anyup/uView-Pro/commit/445878b906475f5dd3bcc9b15efd9aac597f0603))
- **demo-page:** 优化demo page展示，主题切换逻辑优化 ([c5ecbaa](https://github.com/anyup/uView-Pro/commit/c5ecbaa437e51cf1bf47f84f0f3bc071f37dd413))
- 更新自定义主题文件 ([cab8be3](https://github.com/anyup/uView-Pro/commit/cab8be38832bca9de1254a06f199e6b3704ee88e))
- **color:** 重构颜色组件以提升可维护性 ([d92a052](https://github.com/anyup/uView-Pro/commit/d92a0526f7bfa51eeb40bb90eb0e7fc8f24fe488))

### ⚡ Performance Improvements | 性能优化

- 优化微信小程序代码包体积 ([bf56c99](https://github.com/anyup/uView-Pro/commit/bf56c99515e41d067481cd6498187ed5bd37c193))

### 💄 Styles | 风格

- **demo:** 优化演示页面样式 ([ae5de09](https://github.com/anyup/uView-Pro/commit/ae5de091ee1234b4432eb7d2609f77fd5afd27aa))
- **components:** 使用变量替代硬编码的颜色值 ([cf0044e](https://github.com/anyup/uView-Pro/commit/cf0044e3be68daff91b764eb31a75cf3ecad86aa))
- **demo:** 优化替代组件颜色硬编码值，保证主题色和暗黑模式 ([291e92b](https://github.com/anyup/uView-Pro/commit/291e92b07d80532b1620f62ae0ac3f4909bdab6a))

### 📦‍ Build System | 打包构建

- 新增颜色替换脚本 ([b160c28](https://github.com/anyup/uView-Pro/commit/b160c28e838a4f27b9bfa2f3ce47e8ad46e807a0))
- 指定 Node.js 版本 ([7147284](https://github.com/anyup/uView-Pro/commit/714728421527bbd5abed02fe4fdf51cdf3c2a583))
- **deps:** 更新 dcloudio uni-app 依赖版本至 4.76 ([f92a348](https://github.com/anyup/uView-Pro/commit/f92a34892369facda3d89add34cfbeddc1872a65))

### 🐛 Bug Fixes | Bug 修复

- **u-tabbar:** 修复 u-tabbar 在鸿蒙应用上高度计算错误的问题 ([cc4bc1a](https://github.com/anyup/uView-Pro/commit/cc4bc1add7ef63f6d9eb519e9ee38414ef3c73eb))
- **clipboard:** 处理未传入可选参数引起的错误 ([1756b53](https://github.com/anyup/uView-Pro/commit/1756b53f8ce2e2a21d288124c257b4729e48d92a))
- **theme:** 修复获取系统设置的theme不正确的问题 ([58b0cbb](https://github.com/anyup/uView-Pro/commit/58b0cbb3aa666d8f127bc88850b66d469cc1b996))
- **install:** 优化 install 方法的错误处理和代码结构 ([7edb867](https://github.com/anyup/uView-Pro/commit/7edb8673b0cdf4238c184a480b91fb73908e6c5c))

### 👷 Continuous Integration | CI 配置

- **release:** 支持直接指定版本号发布 ([e4db5f8](https://github.com/anyup/uView-Pro/commit/e4db5f8b349954548ddef37fc02aa5a397cace01))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/lonelyflyer"><img src="https://github.com/lonelyflyer.png?size=40" width="40" height="40" alt="Lonelyflyer" title="Lonelyflyer"/></a> 

## [0.3.16] - 2025-11-21

### 📝 Documentation | 文档

- 更新贡献者信息 ([a6d52dc](https://github.com/anyup/uView-Pro/commit/a6d52dc6db9d56ccdf5c5ad4230e32c716e36241))

### ♻️ Code Refactoring | 代码重构

- **u-waterfall:** 优化瀑布流组件性能和代码结构 ([841c465](https://github.com/anyup/uView-Pro/commit/841c465de4f1a1efc43e05248794b566e0051bd8))
- **pages:** 重构工具和模板页面，优化i18n国际化功能 ([6cfda7f](https://github.com/anyup/uView-Pro/commit/6cfda7f2ecfd6dd60501201d8797fe702b29df4d))
- **u-dropdown:** 删除无用的测试代码 ([7c06f1f](https://github.com/anyup/uView-Pro/commit/7c06f1f3f0d1dcd5ae2bbd3420a4124c5faec004))

### 🐛 Bug Fixes | Bug 修复

- **backTop:** 修复回到顶部组件示例无效的问题 ([5a9b736](https://github.com/anyup/uView-Pro/commit/5a9b7366f5916627815488039327669f424dd0ce))
- **u-text:** 修复 u-text 组件单行省略号显示无效的问题 ([041ee36](https://github.com/anyup/uView-Pro/commit/041ee36fb60d5a082fbdde7e9334ae42b386944c))

### ✨ Features | 新功能

- **u-link:** 添加自定义点击跳转功能 ([8a521f3](https://github.com/anyup/uView-Pro/commit/8a521f36a9f417aa90263cdcf7978ce48d6ed01e))
- **u-tabs:** 增强 u-tabs 组件，支持隐藏 tab 项的功能配置 ([9a58964](https://github.com/anyup/uView-Pro/commit/9a58964061a7d18510624fb4c6d009568bd3974c))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.3.15] - 2025-11-14

### ✨ Features | 新功能

- **u-dropdown:** u-dropdown中的u-dropdown-item中新增控制显示隐藏属性 ([e4ee28f](https://github.com/anyup/uView-Pro/commit/e4ee28fd0a66ceb6bbed07b7969862e936e5e573))
- 支持嵌套属性验证(a.b.c格式) ([1bbead8](https://github.com/anyup/uView-Pro/commit/1bbead8be764491844a7d3909480a360ff2dc4d4))
- **form:** 添加表单字段的嵌套校验演示示例 ([73b4abe](https://github.com/anyup/uView-Pro/commit/73b4abe98047ac5193b56b71cdacb05957760e93))

### 🚀 Chore | 构建/工程依赖/工具

- 更新应用 logo 和图标 ([38d52e4](https://github.com/anyup/uView-Pro/commit/38d52e4a9e8656bcae89892a5f94a5201a1af7b2))

### ♻️ Code Refactoring | 代码重构

- 更新 logo 图片地址 ([c0fe3d1](https://github.com/anyup/uView-Pro/commit/c0fe3d15d6f4498229feaba860ff78e43a5297e6))

### 👥 Contributors

<a href="https://github.com/xiaozuoovo"><img src="https://github.com/xiaozuoovo.png?size=40" width="40" height="40" alt="XiaoZuoOvO" title="XiaoZuoOvO"/></a> <a href="https://github.com/不爱说话郭德纲"><img src="https://github.com/不爱说话郭德纲.png?size=40" width="40" height="40" alt="不爱说话郭德纲" title="不爱说话郭德纲"/></a> <a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.3.14] - 2025-11-14

### ✨ Features | 新功能

- **app-harmony:** 更新应用信息并添加鸿蒙签名配置，鸿蒙应用打包差异性编译 ([81a33c1](https://github.com/anyup/uView-Pro/commit/81a33c13a471721848033cc5f7ac1e3b3b30abc6))
- **u-message-input:** 新增输入框类型prop，支持number，text等模式 ([68a865a](https://github.com/anyup/uView-Pro/commit/68a865a12b7e0b20db458ea403579d28a227aaeb))

### ♻️ Code Refactoring | 代码重构

- **components:** 优化 u-icon 和 u-toast 组件样式和结构 ([3cfb01d](https://github.com/anyup/uView-Pro/commit/3cfb01ddb8612e274e1bccd43fca0b5bb4e0a405))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.3.13] - 2025-11-11

### 🐛 Bug Fixes | Bug 修复

- **u-root-portal:** 修复根节点传送组件运行时报错问题 ([3c24a75](https://github.com/anyup/uView-Pro/commit/3c24a75de00982bbdc1388a413721377de4f1e3d))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.3.12] - 2025-11-10

### 🐛 Bug Fixes | Bug 修复

- **u-dropdown:** 修复下拉菜单激活颜色不正确的问题 ([d3cc1e8](https://github.com/anyup/uView-Pro/commit/d3cc1e87ff0951c5385da5e667a528d30b7fd1cf))

### 📦‍ Build System | 打包构建

- **app-harmony:** 新增 HarmonyOS 构建配置 ([c18a537](https://github.com/anyup/uView-Pro/commit/c18a537d9bf4edcbe626290642225363486cfb1e))
- 更新项目版本号 ([8eaee77](https://github.com/anyup/uView-Pro/commit/8eaee7784fb348c5637b55b037f62ba51409a4f2))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.3.10] - 2025-11-06

### ♻️ Code Refactoring | 代码重构

- **theme:** 优化动态颜色获取方式 ([26f44dd](https://github.com/anyup/uView-Pro/commit/26f44dd0d03b9cb93a2bc6b94ab6eb15a7b2261e))
- **types:** 优化类型导入并修复 u-pagination 类型定义 ([c6cbe61](https://github.com/anyup/uView-Pro/commit/c6cbe61242492ddae896ad44482f130da90033dc))

### ✨ Features | 新功能

- **u-pagination:** 新增分页组件及演示示例 ([3915064](https://github.com/anyup/uView-Pro/commit/39150648e599e818ce5c3648b3829f30754e2706))
- **u-navbar:** 新增左侧插槽 left ([4474e3b](https://github.com/anyup/uView-Pro/commit/4474e3b07d44126dbbcb85957bf1026c602301e7))
- **u-input:** 新增 focus 发射当前输入值 ([d8082ec](https://github.com/anyup/uView-Pro/commit/d8082ec2d30ae143a2cb223b6a933e5b58e1826b))

### 🐛 Bug Fixes | Bug 修复

- **demo:** 修复 u-navbar 演示示例中，因 ref('toast') 和组件名重复问题 ([2bd32a3](https://github.com/anyup/uView-Pro/commit/2bd32a3906fa3dd7ae2a91c8e0382aef7089bba7))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/wjp980108"><img src="https://github.com/wjp980108.png?size=40" width="40" height="40" alt="wjp980108" title="wjp980108"/></a> <a href="https://github.com/wjp"><img src="https://github.com/wjp.png?size=40" width="40" height="40" alt="wjp" title="wjp"/></a>

## [0.3.9] - 2025-11-05

### 🐛 Bug Fixes | Bug 修复

- **types:** 修正组件声明文件中uLoadmore的命名大小写问题 ([eb69b18](https://github.com/anyup/uView-Pro/commit/eb69b18d969dac13a75375501018edc4f3097e33))
- **loadmore:** 修复 u-loadmore 组件使用类型声明报错问题 ([92facfd](https://github.com/anyup/uView-Pro/commit/92facfdb5b2b57bcd634d93412c90661c5f6e59d))

### ✨ Features | 新功能

- **theme:** 新增本地主题文件支持 ([a989314](https://github.com/anyup/uView-Pro/commit/a989314a7b691e94ed81e524100e70d6e9a22a12))
- **theme:** 实现运行时主题变更功能，新增 setTheme 函数 ([12765d0](https://github.com/anyup/uView-Pro/commit/12765d07244a9d6ca49c4dd34d81f66a61c87c6d))

### 👥 Contributors

<a href="https://github.com/liujiayii"><img src="https://github.com/liujiayii.png?size=40" width="40" height="40" alt="liujiayii" title="liujiayii"/></a> <a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.3.8] - 2025-11-04

### 📦‍ Build System | 打包构建

- 新增钉钉小程序运行和打包命令 ([a5b4ab3](https://github.com/anyup/uView-Pro/commit/a5b4ab3abab95b4c56bf02415f1785371f7f19ee))

### 🐛 Bug Fixes | Bug 修复

- **u-circle-progress:** 修复微信小程序 canvas 2d 环形进度条绘制问题,适配不同平台的 canvas 上下文 ([e7ab701](https://github.com/anyup/uView-Pro/commit/e7ab701bcbd83e7861aeb9a104269265c6b38a56))

### ✨ Features | 新功能

- **u-fab:** 新增悬浮按钮组件及演示示例 ([85848de](https://github.com/anyup/uView-Pro/commit/85848de6bae15d91942a633959459ae8e6ecb857))
- **u-fab:** 优化悬浮组件功能和交互，新增预设定位position、拖动吸边autoStick属性 ([65a4bde](https://github.com/anyup/uView-Pro/commit/65a4bde2331c8b2a49933bb4c5d7e1f97a11c56a))
- **u-text:** 新增 u-text 组件默认插槽支持 ([a7b6e59](https://github.com/anyup/uView-Pro/commit/a7b6e5944afbcd48920c25a58c07642544ff3d3e))

### ♻️ Code Refactoring | 代码重构

- **fab:** 优化 fab 组件示例代码 ([ca71fa2](https://github.com/anyup/uView-Pro/commit/ca71fa28fa86baa53384eb366384d97a0b8d84b2))
- **u-fab:** 重构 gap 属性以支持对象类型 ([bee34bf](https://github.com/anyup/uView-Pro/commit/bee34bffd6a7587e9a82fe3e35cc64c096d8d2b3))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/wjp980108"><img src="https://github.com/wjp980108.png?size=40" width="40" height="40" alt="wjp980108" title="wjp980108"/></a>

## [0.3.7] - 2025-10-28

### 🐛 Bug Fixes | Bug 修复

- **u-index-list:** 修复 u-index-list 组件中 indexList 的响应式，确保数据正确对应，滚动到正确的锚点 ([536479b](https://github.com/anyup/uView-Pro/commit/536479b0c444f50892c789191265b373297ec0b5))
- **u-form:** 优化 u-form-item 组件样式，修复微信小程序光标样式偏移问题 ([7e6694b](https://github.com/anyup/uView-Pro/commit/7e6694b5db11f654b081d10bb83d53c99437c730))
- **u-form:** 优化 model 属性的响应式更新，修复 model 对象整体替换导致的表单校验失效问题 ([bc49b5b](https://github.com/anyup/uView-Pro/commit/bc49b5b2fa6f51c803d64252184f5eba93a0d3c1))
- **u-form:** 修复 u-form 的重置表单方法 resetFields 失效问题 ([a31f800](https://github.com/anyup/uView-Pro/commit/a31f800e206fa9671bdd0d6a46ca7a4afba6aefd))
- **u-checkbox:** 修复 u-checkbox 单独使用报错的问题 ([dad2832](https://github.com/anyup/uView-Pro/commit/dad2832a2e7219b0454ec97970c9cb8f4fac0625))

### ✨ Features | 新功能

- **u-textarea:** 新增 u-textarea 组件及演示示例，增强 textarea 功能，分离 u-input 的 textarea 模式 ([efbb75e](https://github.com/anyup/uView-Pro/commit/efbb75e21a044a664267930396ce496fd64d33fe))
- **u-input:** 增强 u-input 的 textarea 字数统计功能 ([5e14354](https://github.com/anyup/uView-Pro/commit/5e14354a2e34768650cd2417f81b14cdbbced132))
- **u-form:** 增强表单校验功能，发射校验错误，便于自定义提示 ([a553b53](https://github.com/anyup/uView-Pro/commit/a553b53581cc470938030c0f1f8d5f7671d8c25a))

### ♻️ Code Refactoring | 代码重构

- **form:** 优化表单组件的提示文本 ([04b5fc7](https://github.com/anyup/uView-Pro/commit/04b5fc7a071835425786958c5f6de04e233c151c))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.3.6] - 2025-10-24

### ✨ Features | 新功能

- **u-select:** 优化选择器组件 u-select 默认值处理逻辑，添加 preserveSelection 属性，用于控制是否保留用户上次确认的选择 ([8493ff1](https://github.com/anyup/uView-Pro/commit/8493ff16d2eee42fabe926917d940a350b86abe0))
- **u-picker:** 优化 picker 的初始化和渲染流程，实现多次打开 picker 时保留用户选择的逻辑，新增 preserveSelection 属性支持 ([974872e](https://github.com/anyup/uView-Pro/commit/974872ec944fbb28cdb3c40fda08c9039bf0b960))

### ♻️ Code Refactoring | 代码重构

- **components:** 使用主题色替代硬编码颜色值，统一组件的颜色风格，便于未来主题颜色的调整和维护 ([ec348d4](https://github.com/anyup/uView-Pro/commit/ec348d4a8bff4dee62da78eadd23fc3a292ebdca))
- **example:** 代码示例中使用主题色替换硬编码颜色值 ([3216497](https://github.com/anyup/uView-Pro/commit/32164973d54cfff3edcbe765a8ed27158f4bec7d))
- **u-steps:** 新增u-step ([6b86eea](https://github.com/anyup/uView-Pro/commit/6b86eeaf7699eb13f739fc038d86efb4e3b48f8a))
- **u-step:** 替换步骤条组件中的默认硬编码颜色值 ([f3408ef](https://github.com/anyup/uView-Pro/commit/f3408ef006991702895432e775f266fb196ddf12))

### 🐛 Bug Fixes | Bug 修复

- **u-picker:** 修复使用u-picker组件选择地区不设置默认值报错的问题 ([7941135](https://github.com/anyup/uView-Pro/commit/7941135a87a3511a562ed10e34573ef7f786fb57))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/lonelyflyer"><img src="https://github.com/lonelyflyer.png?size=40" width="40" height="40" alt="Lonelyflyer" title="Lonelyflyer"/></a>

## [0.3.5] - 2025-10-21

### 🐛 Bug Fixes | Bug 修复

- **u-input:** 修复input组件不支持input事件的问题 ([52d6a6a](https://github.com/anyup/uView-Pro/commit/52d6a6aaeec9ec78e4088234ff7ba056cc10fd9c))
- **u-search:** 修复search组件不支持input事件的问题 ([603b96f](https://github.com/anyup/uView-Pro/commit/603b96f7eeb16d3e54c82b0be7dd03deb930aef5))
- **u-popup:** 修复微信小程序环境下，u-popup 组件 mode=center 时，设置关闭图标位置无效的问题 ([f08197a](https://github.com/anyup/uView-Pro/commit/f08197aafdc3f874b1efcddf6cc6ff9c9edde954))
- **u-line-progress:** type 属性设置后仍被 active-color 内联样式覆盖的问题 ([c6f29f9](https://github.com/anyup/uView-Pro/commit/c6f29f9dc8437035a0e698e869af2fd418d0bd65))

### ✨ Features | 新功能

- **useChildren:** 添加子组件索引功能 ([8ad744f](https://github.com/anyup/uView-Pro/commit/8ad744fd51df934cc20c099686cbdc5512b22c79))
- **addUnit:** 增强 addUnit 函数支持多值空格分隔 ([6d89cd3](https://github.com/anyup/uView-Pro/commit/6d89cd3c5aacc0770f6f2684fd737d0f05a6e929))
- **u-action-sheet:** 新增自定义 ActionSheet 组件 ([f709523](https://github.com/anyup/uView-Pro/commit/f709523cba5a089eed7c717cc36b9ab199ae24da))

### 📝 Documentation | 文档

- 移除issue模板中的提交格式参考 ([83799e8](https://github.com/anyup/uView-Pro/commit/83799e882f69b0e8787a014cfab9f16ab34ba57c))

### ♻️ Code Refactoring | 代码重构

- **u-popup:** 移除弹窗组件中的冗余代码 ([40c5b64](https://github.com/anyup/uView-Pro/commit/40c5b641539fce56af4f9a4ad2440b9240464a89))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/sunjianwei"><img src="https://github.com/sunjianwei.png?size=40" width="40" height="40" alt="sunjianwei" title="sunjianwei"/></a> <a href="https://github.com/koboshi"><img src="https://github.com/koboshi.png?size=40" width="40" height="40" alt="koboshi" title="koboshi"/></a>

## [0.3.4] - 2025-10-20

### ♻️ Code Refactoring | 代码重构

- **components:** 移除不必要的父组件和事件总线相关代码，优化组件间通信 ([280c2f8](https://github.com/anyup/uView-Pro/commit/280c2f8acc75764a7706ec38c742cc16703c941a))
- **u-safe-bottom:** 优化底部安全区组件 ([161f2d3](https://github.com/anyup/uView-Pro/commit/161f2d32ff6b9abbb6f8221a4dd99c438a606e94))
- **u-status-bar:** 优化状态栏组件 ([53c50ab](https://github.com/anyup/uView-Pro/commit/53c50ab8b6314a7d702b90e6b48b79301a334090))

### 🐛 Bug Fixes | Bug 修复

- **u-subsection:** 优化列表和模式变化的监听逻辑，移除不必要的初始化调用 ([f77ee7c](https://github.com/anyup/uView-Pro/commit/f77ee7ccc7521ec2472f72dcf2fb47362ca0abd9))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.3.3] - 2025-10-16

### 🐛 Bug Fixes | Bug 修复

- **u-read-more:** 修复 init 方法无法在外部调用的问题 ([415d401](https://github.com/anyup/uView-Pro/commit/415d401883a3567653ab1f311b28b075b7bb5603))
- **u-button:** 修复 hover-class 属性被忽略的问题 ([b919c58](https://github.com/anyup/uView-Pro/commit/b919c58cea048f9e559a6448cebe5abbf1490acf))

### ♻️ Code Refactoring | 代码重构

- **component-relation:** 重构组件关系逻辑并添加新功能 ([85d0cd2](https://github.com/anyup/uView-Pro/commit/85d0cd20db839a61733887f82825d47de0a1b1a6))
- **u-talbe:** 重构u-td和u-th组件，增强u-table的兼容性 ([3fbbc52](https://github.com/anyup/uView-Pro/commit/3fbbc5233bd41b91ca829f9a65cf95ee3b599e36))
- 修改 uView Pro 日志配置 ([6b9bb68](https://github.com/anyup/uView-Pro/commit/6b9bb6852af3eb24f109207f864145771c3e9c79))
- **clipboard:** add clipboard function ([efdaa58](https://github.com/anyup/uView-Pro/commit/efdaa58dda923b281d9b764a82a7492f36717ac4))

### 👥 Contributors

<a href="https://github.com/koboshi"><img src="https://github.com/koboshi.png?size=40" width="40" height="40" alt="koboshi" title="koboshi"/></a> <a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/lonelyflyer"><img src="https://github.com/lonelyflyer.png?size=40" width="40" height="40" alt="Lonelyflyer" title="Lonelyflyer"/></a>

## [0.3.2] - 2025-10-15

### 📝 Documentation | 文档

- **changelog:** 更新 CHANGELOG.md 生成配置 ([27a2609](https://github.com/anyup/uView-Pro/commit/27a26095b92cf8cbc6477c563a68b1557f9fb045))
- 更新交流群图片链接 ([832815d](https://github.com/anyup/uView-Pro/commit/832815deb63f8b144f525591d16e3ccf900b8632))

### ⚡ Performance Improvements | 性能优化

- **component-relation:** 增强组件间通信功能；修改 broadcast 方法，支持定向广播；移除对子组件名称的强制要求，允许匿名组件 ([28ea814](https://github.com/anyup/uView-Pro/commit/28ea814810055aa4c99b53d676b16da337fdf7d5))

### 🐛 Bug Fixes | Bug 修复

- **u-index-list:** 重构索引锚点组件，兼容多端，修复IndexList索引列表在微信小程序没有吸顶效果 ([ce6a7a3](https://github.com/anyup/uView-Pro/commit/ce6a7a3c01b622cad268779098390c0d593f75bc))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.3.1] - tag v0.3.1

Tagger: anyup <anyupxing@163.com>

Release version 0.3.1
2025-10-14

### 📝 Documentation | 文档

- 更新 package.json 中的平台支持信息 ([c30da7c](https://github.com/anyup/uView-Pro/commit/c30da7cf32c8c97e740df75166d1d7dfa4016942))

### 🐛 Bug Fixes | Bug 修复

- **request:** 修复http request请求拦截器中config.header为undefined的问题 ([8da453a](https://github.com/anyup/uView-Pro/commit/8da453afe193338a53c9f320346acabdb8803a79))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.3.1 ([4fc2902](https://github.com/anyup/uView-Pro/commit/4fc29028bdd360833c285857e8c588ad1dfd28f3))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.3.0] - tag v0.3.0

Tagger: anyup <anyupxing@163.com>

Release version 0.3.0
2025-10-12

### 📝 Documentation | 文档

- 更新开源捐赠图片 ([8eb0f00](https://github.com/anyup/uView-Pro/commit/8eb0f00ed5308cd1c3574b66dc752b050bbfcb70))
- update readme ([c93cdcb](https://github.com/anyup/uView-Pro/commit/c93cdcb1278040b8c5b6232b0d7928edad22af5d))

### ✨ Features | 新功能

- **component-relation:** 添加组件关系管理 Hooks 工具，用于完全替换 provide/inject，全平台兼容 ([927be95](https://github.com/anyup/uView-Pro/commit/927be95e8b1c1bd5e05cf91c00888c314f6431e8))

### ♻️ Code Refactoring | 代码重构

- **components:** 重构复选框checkbox和手风琴collapse组件，使用新版组件关系管理工具，优化兼容性 ([a6b2e86](https://github.com/anyup/uView-Pro/commit/a6b2e86394193a1ff5b58df045cba5518b322d38))
- **u-radio:** 修复单选框组件，兼容微信、头条小程序 ([6c409dc](https://github.com/anyup/uView-Pro/commit/6c409dc2c0ed116abcdde23a366c7f575fd56a24))
- **styles:** 优化 u-collapse-item 和 u-text 组件的样式合并逻辑 ([d4436c5](https://github.com/anyup/uView-Pro/commit/d4436c51dc2ddb27d70eeba4cad804504da40013))
- **layout:** 优化布局组件兼容性 ([285b7a7](https://github.com/anyup/uView-Pro/commit/285b7a73fcd9f8a21521be0d7e7a83690495dc4b))
- **u-form:** 重构表单组件的错误处理和样式，增强兼容性，支持多种小程序平台 ([587f87d](https://github.com/anyup/uView-Pro/commit/587f87d1b8d3dd6cd98e583b2640bef61bd8f119))
- **components:** 所有组件允许接受外部样式，允许样式穿透 ([e736e90](https://github.com/anyup/uView-Pro/commit/e736e9014e36c995ba434a56a6ccfee01c56ad35))
- **u-grid:** 重构宫格组件，支持自定义样式 ([d999ece](https://github.com/anyup/uView-Pro/commit/d999eceed2447ddc99a62a6bdcc57deaa1d1b515))
- **component-relation:** 优化子组件挂载时连接父组件的逻辑 ([2d038f2](https://github.com/anyup/uView-Pro/commit/2d038f2721e91db2f1773079341473505f2f6836))
- **u-dropdown:** 重构下拉菜单组件，兼容多平台 ([393caa5](https://github.com/anyup/uView-Pro/commit/393caa57910e9a63484e0c9e852c634fc15ef606))
- **components:** 优化部分组件中的 customStyle 属性及样式处理 ([3506a5a](https://github.com/anyup/uView-Pro/commit/3506a5a055a7a106311351b4b8b90127b019a061))
- **components:** 统一使用 customClass 和 customStyle 属性，统一处理组件样式和类名 ([d400997](https://github.com/anyup/uView-Pro/commit/d40099782b97011edc04c5040342b585b8f18fcd))

### 🐛 Bug Fixes | Bug 修复

- **u-collapse:** 修复手风琴模式和非手风琴模式的处理回调时，index错误的问题 ([a5882eb](https://github.com/anyup/uView-Pro/commit/a5882eb17d87fee4e06448ecc353bf4237f25d52))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.3.0 ([959c6a7](https://github.com/anyup/uView-Pro/commit/959c6a7c191ddeacac5fdf86cf72ddb72fd736a7))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.2.4] - tag v0.2.4

Tagger: anyup <anyupxing@163.com>

Release version 0.2.4
2025-10-08

### 🐛 Bug Fixes | Bug 修复

- **i18n:** 修复切换中英文切换失效问题 ([d61d817](https://github.com/anyup/uView-Pro/commit/d61d81790aecd774435999c9ab8c3672a2df38ad))
- **style:** 修复文本溢出样式u-line-1生成错误问题 ([5d2bf3c](https://github.com/anyup/uView-Pro/commit/5d2bf3ca080f8c5bc9fe40bb1f421c28f7ee8017))

### ✨ Features | 新功能

- **calendar:** 增加日历组件的页面显示模式 ([af13724](https://github.com/anyup/uView-Pro/commit/af137241e644a5f1e99b07e580c8d3aca9250e9e))

### ♻️ Code Refactoring | 代码重构

- 优化代码格式和可读性 ([2e338d5](https://github.com/anyup/uView-Pro/commit/2e338d5cb2dbf3ce42f38c9581c04164b852f992))
- **useComponent:** 重构组件事件处理并添加热更新支持 ([80f7e5e](https://github.com/anyup/uView-Pro/commit/80f7e5efaa2b2ab1668969072cb6d18652d00cc2))
- **u-collapse:** 重构 u-collapse 组件中的事件处理逻辑 ([6aadfd1](https://github.com/anyup/uView-Pro/commit/6aadfd16d5aefd45f022c8da1612ba1921942f6e))
- **u-checkbox:** 优化复选框组件的父组件事件处理 ([3b597ea](https://github.com/anyup/uView-Pro/commit/3b597ea2833ca71e5752d097b2f07c143869f0d2))
- **hooks:** 优化 useComponent 以支持页面级别组件关系管理 ([429192f](https://github.com/anyup/uView-Pro/commit/429192f66ba59a26acb957acfc01d5f318d43fb6))

### 📝 Documentation | 文档

- 更新微信交流群图片链接 ([e67588a](https://github.com/anyup/uView-Pro/commit/e67588ae392d5150ec4d271ce45e65fe32372460))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.2.4 ([27e1624](https://github.com/anyup/uView-Pro/commit/27e1624619311de1ee10f4dfc0ef5ffbd6210898))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.2.3] - tag v0.2.3

Tagger: anyup <anyupxing@163.com>

Release version 0.2.3
2025-10-06

### 🐛 Bug Fixes | Bug 修复

- **u-collapse:** 修复手风琴组件在头条小程序的兼容性 ([3189dc4](https://github.com/anyup/uView-Pro/commit/3189dc468edd977bc3e20256bd8a6c1b124bc4e6))

### ✨ Features | 新功能

- **util:** 新增日志功能并调整主题配置 ([5e07894](https://github.com/anyup/uView-Pro/commit/5e078945fb64867e4e49be1c9228aac7be8c1104))
- **components:** 重构复选框和手风琴组件，新增父子组件通信库 ([55b9b60](https://github.com/anyup/uView-Pro/commit/55b9b6069f1a40a6c4190b27952bcf9a489f8923))
- **util:** 添加自定义事件总线 ([6589f4f](https://github.com/anyup/uView-Pro/commit/6589f4f20b1391a9267670f6622538d4a6db0d82))

### ♻️ Code Refactoring | 代码重构

- **components:** 重构复选框和折叠组件，支持多平台小程序，微信，支付宝，头条 ([0ebc0f5](https://github.com/anyup/uView-Pro/commit/0ebc0f5edcc1df6ccd9baaaf659a0bde7b37d21d))
- **hooks:** 移除组件关系热更新时的错误日志输出 ([c8a2a3d](https://github.com/anyup/uView-Pro/commit/c8a2a3d041a55f94c8bd86d47eaaee9657cbd597))

### 📝 Documentation | 文档

- **readme:** 更新微信交流群二维码 ([cff3a3d](https://github.com/anyup/uView-Pro/commit/cff3a3dbb035ca365a1ab9839b14f300ef775c16))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.2.3 ([f125c67](https://github.com/anyup/uView-Pro/commit/f125c67f3e9a6303cfa9a8e8718b66531c923ddb))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.2.2] - tag v0.2.2

Tagger: anyup <anyupxing@163.com>

Release version 0.2.2
2025-09-30

### 🚀 Chore | 构建/工程依赖/工具

- 删除未使用的公共 API 和国际化文件 ([e73d3da](https://github.com/anyup/uView-Pro/commit/e73d3da7ede71584ec8b58a386307747b62f5e7a))
- **release:** bump version to 0.2.2 ([c1932fe](https://github.com/anyup/uView-Pro/commit/c1932fe43b224109e49465b2a454c15965587a19))

### ♻️ Code Refactoring | 代码重构

- **components:** 提示组件抽离为全局组件 wx-tips ([3fc0111](https://github.com/anyup/uView-Pro/commit/3fc0111f296de37bdb9b56fdfc023537aa6d79c4))
- **u-collapse:** 优化手风琴模式和样式配置 ([5cff422](https://github.com/anyup/uView-Pro/commit/5cff422a8462403f3c3f23a66f9306a81499a3b0))

### ✨ Features | 新功能

- **components:** 新增 u-root-portal 根节点传送组件 ([891d021](https://github.com/anyup/uView-Pro/commit/891d021faf76ad0248ef21248d89ff1fe1c5b669))
- **manifest:** 添加支付宝小程序配置 ([cb0b42a](https://github.com/anyup/uView-Pro/commit/cb0b42a9397df1c335d2c5492136efa38dde2ca0))

### 📝 Documentation | 文档

- 添加支付宝小程序二维码并更新微信群聊图片 ([1dc0db3](https://github.com/anyup/uView-Pro/commit/1dc0db340e34675f15a7e83c79c3ac5d453853a2))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.2.1] - tag v0.2.1

Tagger: anyup <anyupxing@163.com>

Release version 0.2.1
2025-09-29

### 🚀 Chore | 构建/工程依赖/工具

- 优化代码格式化和 ESLint 配置 ([771eacd](https://github.com/anyup/uView-Pro/commit/771eacd58d410e468a8aec4225bbe7b402480b2f))
- **release:** bump version to 0.2.1 ([b835513](https://github.com/anyup/uView-Pro/commit/b8355133aa7bdb57344a662f4968e148f652ffb6))

### ⚡ Performance Improvements | 性能优化

- 压缩部分js工具库 ([6615b70](https://github.com/anyup/uView-Pro/commit/6615b7085a51c4fbc9f884ec68e05db1a1e89e27))

### ✨ Features | 新功能

- **u-calendar:** 日历组件增加农历显示功能 ([e2368ac](https://github.com/anyup/uView-Pro/commit/e2368ac88b0abb4493ab12a1785eb2a0e38e502c))

### ♻️ Code Refactoring | 代码重构

- **calendar:** 重构日历组件类型定义 ([0040e9e](https://github.com/anyup/uView-Pro/commit/0040e9e1095446536370e9aca3c135bc05527acb))

### 🐛 Bug Fixes | Bug 修复

- **u-input:** 修复输入框禁用状态时清空按钮仍显示的问题 ([722715f](https://github.com/anyup/uView-Pro/commit/722715f7d6607584c0e158ba2de2342147e3be17))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.2.0] - tag v0.2.0

Tagger: anyup <anyupxing@163.com>

Release version 0.2.0
2025-09-28

### ♻️ Code Refactoring | 代码重构

- **example:** 优化 about 页面中的链接处理 ([d04ba8a](https://github.com/anyup/uView-Pro/commit/d04ba8a26278b6a0ea4f5e906bfec89ce6954459))
- **css:** 重构 CSS 样式并添加新样式 ([50b2670](https://github.com/anyup/uView-Pro/commit/50b2670a5e09aff9994a97f60a7d376b5b99a544))
- **libs:** 重构 libs 工具类代码并优化导出方式 ([10a604e](https://github.com/anyup/uView-Pro/commit/10a604e86f8712ee65c658a019c231b56cdcc7e7))
- **u-icon:** 移除 customStyle 属性并整合全局样式 ([cd52e14](https://github.com/anyup/uView-Pro/commit/cd52e14739604f1f126205e16383f187f1d38e8e))
- **props:** 优化 Props 类型定义和样式处理 ([c6ca0de](https://github.com/anyup/uView-Pro/commit/c6ca0de0876cb61671c25e58f33e51674edab266))
- **u-text:** 优化文本组件的样式和布局 ([885a0cf](https://github.com/anyup/uView-Pro/commit/885a0cf3f348184b3546979f1cc1914ded198411))
- **u-text:** 优化文本组件样式和属性 ([315d437](https://github.com/anyup/uView-Pro/commit/315d4379148fddbed059e55e5f9a0d0268345e62))
- **pages:** 优化微信小程序多个页面的用户提示展示，审核相关 ([0f3741f](https://github.com/anyup/uView-Pro/commit/0f3741f65d39f74bc3dc27df8514324e02c3582a))
- **pages:** 添加微信小程序端布局演示提示 ([9eaac70](https://github.com/anyup/uView-Pro/commit/9eaac70cf143327589d56a627160f33c56585d2e))

### ✨ Features | 新功能

- **components:** 添加 input 组件演示页面 ([91baf00](https://github.com/anyup/uView-Pro/commit/91baf0012e381856b79ca49edb60735928d78099))
- **collapse:** 更新折叠面板组件默认配置和样式 ([a03e0be](https://github.com/anyup/uView-Pro/commit/a03e0be3a9f8ac8b03dbd406d5d8c37227e869bd))
- **components:** 新增 Text 组件 ([a034f9d](https://github.com/anyup/uView-Pro/commit/a034f9d029ab38dbf1a066978f3c62c1328c96a5))
- **hooks:** 重构 useParent 并添加父子组件关系管理 ([37e35d8](https://github.com/anyup/uView-Pro/commit/37e35d84112a08b3d28aa8e5caec12a0a2696594))
- **hooks:** 新增自定义 Hooks 工具库 ([0b3f680](https://github.com/anyup/uView-Pro/commit/0b3f68051b09917fbd39006093291f6dcc4eb0ef))

### 📝 Documentation | 文档

- 添加 Copilot 提示词 ([c10cd20](https://github.com/anyup/uView-Pro/commit/c10cd201214907ae2ac8228498927a59f8411cfb))

### 🐛 Bug Fixes | Bug 修复

- **u-collapse:** 重构手风琴组件并解决手风琴失效问题 ([a64e607](https://github.com/anyup/uView-Pro/commit/a64e6075f556ffeb3f5ad6b9ea443e3a22f83a86))
- **u-collapse:** 修复折叠面板内容高度在头条小程序适配 ([5fdcd26](https://github.com/anyup/uView-Pro/commit/5fdcd262ab3e134a97a4f25482d188d93222fddf))

### 👷 Continuous Integration | CI 配置

- **vscode:** 设置 Vue 文件默认格式化工具为 Prettier ([84d5259](https://github.com/anyup/uView-Pro/commit/84d52599f2632e814a137e8d553793fb3cdad1f1))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.2.0 ([41a9319](https://github.com/anyup/uView-Pro/commit/41a93199896682b574f78f161b5a63b2268ae89a))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.1.1] - tag v0.1.1

Tagger: anyup <anyupxing@163.com>

Release version 0.1.1
2025-09-22

### ♻️ Code Refactoring | 代码重构

- **theme:** 重构主题颜色定义和导出 ([a58a477](https://github.com/anyup/uView-Pro/commit/a58a477c8af42e466ed544d7737d84de80f3dc27))

### ✨ Features | 新功能

- **i18n:** 优化国际化配置并添加安全措施 ([952dd88](https://github.com/anyup/uView-Pro/commit/952dd887dcadeebccb98a25ec066181904ab727e))

### 📝 Documentation | 文档

- 简化提交 issue 模板结构 ([c818685](https://github.com/anyup/uView-Pro/commit/c818685383ae400b10d6662e7f4b9ba6be5b31f6))

### 🐛 Bug Fixes | Bug 修复

- **u-input:** 解决u-input组件在微信小程序端，开启clearable属性后，focus会自动清空输入问题 ([283551c](https://github.com/anyup/uView-Pro/commit/283551c54cd7006899a66b97afe7137b4bbb14b1))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.1.1 ([7397b86](https://github.com/anyup/uView-Pro/commit/7397b86aa2670cb8c7a7d094a62a895ec1fb560d))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.1.0] - tag v0.1.0

Tagger: anyup <anyupxing@163.com>

Release version 0.1.0
2025-09-21

### ♻️ Code Refactoring | 代码重构

- **http:** 优化 HTTP 请求和响应拦截器 ([b9ea27f](https://github.com/anyup/uView-Pro/commit/b9ea27f7a2fc3425316211784a07b2cde030282a))
- 修改路由基础路径 ([23143c8](https://github.com/anyup/uView-Pro/commit/23143c839242fcd19c9c6ca73a8ff1bcfdb8b83b))
- 移除多个组件中未使用的样式标签 ([f8d353a](https://github.com/anyup/uView-Pro/commit/f8d353a0b99b3d9a2530d8d8a4bd8d0d5fe7dcc5))
- 更新项目文档链接和基础配置 ([435a1ea](https://github.com/anyup/uView-Pro/commit/435a1ea5b89f8ba850f3cd469f4583d3946f8142))

### 📦‍ Build System | 打包构建

- **vite:** 配置别名和服务器设置 ([b319288](https://github.com/anyup/uView-Pro/commit/b3192882a104963ab6a2c7b6c03e2fb8ee17f609))
- **vite:** 配置别名和服务器设置 ([9483730](https://github.com/anyup/uView-Pro/commit/9483730b371a5722511cd515d20a1eac28834f04))
- 添加修复空 CSS 文件的脚本 ([38b943d](https://github.com/anyup/uView-Pro/commit/38b943d0f1234978e90284fa759f13b604160e96))

### ✨ Features | 新功能

- **theme:** 支持自定义的color值传入 ([3de798f](https://github.com/anyup/uView-Pro/commit/3de798f8de48af07774376366f5472f463b07177))

### 💄 Styles | 风格

- 移除多余空格和换行 ([80df4d4](https://github.com/anyup/uView-Pro/commit/80df4d44b631b12adb1ae45a6dd0dfa69a2694b1))

### 📝 Documentation | 文档

- 更新交流群图片 ([3b71cb0](https://github.com/anyup/uView-Pro/commit/3b71cb092efd4c5a89c36ee559028d0fe438a013))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.1.0 ([2b3ef26](https://github.com/anyup/uView-Pro/commit/2b3ef26968f8c87bd3086877315efee8d11183fe))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.23] - tag v0.0.23

Tagger: anyup <anyupxing@163.com>

Release version 0.0.23
2025-09-15

### 🐛 Bug Fixes | Bug 修复

- **u-collapse:** fix accordion mode ([c411fef](https://github.com/anyup/uView-Pro/commit/c411fef340cff07ab06a64f623741e9c1ad125cb))

### 🚀 Chore | 构建/工程依赖/工具

- revert comments ([3eed330](https://github.com/anyup/uView-Pro/commit/3eed330c27a7026eb87cb9ef285d1ecbe6789552))
- **docs:** 增加贡献者 ([8b9d44e](https://github.com/anyup/uView-Pro/commit/8b9d44e281c02f639079b77b7c32cc0a566b35a1))
- **docs:** add contributors ([b4035da](https://github.com/anyup/uView-Pro/commit/b4035da5a39acc5ae9dcb13b06143cda6a73fec3))
- **release:** bump version to 0.0.23 ([b230c3f](https://github.com/anyup/uView-Pro/commit/b230c3fb9436bf9ea8c51c20c9c0a0d8cb5bb34a))

### 📝 Documentation | 文档

- 更新交流群二维码图片 ([00c0581](https://github.com/anyup/uView-Pro/commit/00c058159ea9d169219474728e8b31cdc892ab2c))

### 👥 Contributors

<a href="https://github.com/bin"><img src="https://github.com/bin.png?size=40" width="40" height="40" alt="Bin" title="Bin"/></a> <a href="https://github.com/fuwb"><img src="https://github.com/fuwb.png?size=40" width="40" height="40" alt="fuwb" title="fuwb"/></a> <a href="https://github.com/qianyuanji"><img src="https://github.com/qianyuanji.png?size=40" width="40" height="40" alt="qianyuanji" title="qianyuanji"/></a> <a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.22] - tag v0.0.22

Tagger: anyup <anyupxing@163.com>

Release version 0.0.22
2025-09-11

### 🚀 Chore | 构建/工程依赖/工具

- 忽略 pnpm-lock.yaml 文件 ([28802d3](https://github.com/anyup/uView-Pro/commit/28802d308d3c1f2d0d6b583b3b27725b6b40b1a9))
- **release:** bump version to 0.0.22 ([1b30faa](https://github.com/anyup/uView-Pro/commit/1b30faab76518af4799767204abd838a876d9fd0))

### 🐛 Bug Fixes | Bug 修复

- **td/th:** fix invalid width setting ([21718fc](https://github.com/anyup/uView-Pro/commit/21718fc3b2f09e1ccf9f1ce8247b78f30e5fe465))
- **u-modal:** 修复在 modal 组件中添加 clearLoading 方法的暴露，以便外部可以调用 ([34b51a7](https://github.com/anyup/uView-Pro/commit/34b51a7187da296b11f4b5db027a86c41a50a477))

### ✨ Features | 新功能

- **components:** add u-status-bar and u-safe-bottom component ([2085e73](https://github.com/anyup/uView-Pro/commit/2085e73be725f921c436069c27c124e507b24d0e))
- **u-upload:** 调整上传组件默认值和功能 ([4808627](https://github.com/anyup/uView-Pro/commit/48086274f5fe16f4b3b7554a99038a76aa08e8c5))
- **pages:** 在多个页面中添加功能说明的弹窗提示 ([5e59855](https://github.com/anyup/uView-Pro/commit/5e59855ff81f21c54cbfa44a3f4641b4b9f1f6bd))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/bin"><img src="https://github.com/bin.png?size=40" width="40" height="40" alt="Bin" title="Bin"/></a> <a href="https://github.com/lonely-flyer"><img src="https://github.com/lonely-flyer.png?size=40" width="40" height="40" alt="Lonely-flyer" title="Lonely-flyer"/></a>

## [0.0.21] - tag v0.0.21

Tagger: anyup <anyupxing@163.com>

Release version 0.0.21
2025-09-09

### ⚡ Performance Improvements | 性能优化

- **pages:** options 语法升级为 composition 语法 ([e38878c](https://github.com/anyup/uView-Pro/commit/e38878c696ffc548374169423613e97c3878bafd))
- **pages:** options 语法升级为 composition 语法 ([0403545](https://github.com/anyup/uView-Pro/commit/040354507bd187a9bff4371fc4950dfd6412cd5b))
- **pages:** options 语法升级为 composition 语法 ([514ecb6](https://github.com/anyup/uView-Pro/commit/514ecb6f8e2b133b962a6cbe7609a64e4d973928))
- **pages:** options 语法升级为 composition 语法 ([ffcc1cb](https://github.com/anyup/uView-Pro/commit/ffcc1cb8993196252535ea6553d7fd999ab57719))
- **pages:** options 语法升级为 composition 语法 ([2c755e3](https://github.com/anyup/uView-Pro/commit/2c755e3e1f386c3be1ae8955607d64f72b2b6640))
- 优化首页图标渲染问题 ([a6d4b16](https://github.com/anyup/uView-Pro/commit/a6d4b1690544f3261fb138cb490a10131d4fb749))

### 🐛 Bug Fixes | Bug 修复

- **u-tag:** 修复 u-tag 类型 ([c9071a6](https://github.com/anyup/uView-Pro/commit/c9071a610e08efc4581eff97e4d4998c2d01c9eb))
- **u-table:** 修复 u-table props style 属性变化时，u-th/t-td 未更新问题 ([b1ee7d6](https://github.com/anyup/uView-Pro/commit/b1ee7d6ade7a59e305d7a4081415418387bb6832))
- 修复微信小程序环境下 http interceptor 的路径问题 ([a7fe746](https://github.com/anyup/uView-Pro/commit/a7fe7466b3f66644e097ee6be23f231bce77fa5f))
- 优化checkbox示例页面逻辑 ([9818b20](https://github.com/anyup/uView-Pro/commit/9818b20471e11b96ded606db808f2eda32904f82))
- 修复微信小程序不支持u-circle-progress绘制canvas失败问题 ([46406c5](https://github.com/anyup/uView-Pro/commit/46406c593260f29b081c6a5d98c48dc97e225600))
- 修复 u-picker 组件 params 属性默认值设置 ([36a713b](https://github.com/anyup/uView-Pro/commit/36a713b3c84ddb6e9ef40132512063cdde35ea19))

### 📝 Documentation | 文档

- 更新微信交流群图片 ([825b187](https://github.com/anyup/uView-Pro/commit/825b187619ee745a23559bfe0b597b75f90f220d))

### 🚀 Chore | 构建/工程依赖/工具

- update project configuration and add prettier support ([9c0cc6a](https://github.com/anyup/uView-Pro/commit/9c0cc6ae3719b975d702b0283bd0c15ee4f3c374))
- **release:** bump version to 0.0.21 ([7bbcbeb](https://github.com/anyup/uView-Pro/commit/7bbcbeb8fa98057e6ff94a9c3233fbc5fc13758d))

### ♻️ Code Refactoring | 代码重构

- **library:** 移除不需要的 globalVariable ([420c40e](https://github.com/anyup/uView-Pro/commit/420c40eac3c67e184924e166edaf4cf2ea904477))
- 更新 pages.json ([03297ce](https://github.com/anyup/uView-Pro/commit/03297ce219ae9337c1a424b9583fa53c74f0291d))

### 💄 Styles | 风格

- 格式化代码 ([a9e0a38](https://github.com/anyup/uView-Pro/commit/a9e0a387ffa55df740b828ea4a1463d97089c4bd))

### 📦‍ Build System | 打包构建

- mp-alipay 开启 component2 支持 ([430d248](https://github.com/anyup/uView-Pro/commit/430d248ef9e805365dcee0373f6a524bd7084a38))

### 👥 Contributors

<a href="https://github.com/bin"><img src="https://github.com/bin.png?size=40" width="40" height="40" alt="Bin" title="Bin"/></a> <a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.20] - tag v0.0.20

Tagger: anyup <anyupxing@163.com>

Release version 0.0.20
2025-09-08

### ♻️ Code Refactoring | 代码重构

- 优化http使用示例 ([39d0910](https://github.com/anyup/uView-Pro/commit/39d091056dc1e335625ce884aade35c8bd11ee6f))

### 📝 Documentation | 文档

- 更新微信交流群图片 ([21bbec1](https://github.com/anyup/uView-Pro/commit/21bbec14937ee52b225d1f415d90aecbe4d4950f))

### 🚀 Chore | 构建/工程依赖/工具

- update project configuration and add prettier support ([74a714d](https://github.com/anyup/uView-Pro/commit/74a714ddc30dc0c2c5a6389f254f1e2c922d905e))
- **release:** bump version to 0.0.20 ([0b94520](https://github.com/anyup/uView-Pro/commit/0b945200d962e584b4c467fdd312e45f944f3f64))

### 🐛 Bug Fixes | Bug 修复

- 修复微信小程序环境下 http interceptor 的路径问题 ([6db4db8](https://github.com/anyup/uView-Pro/commit/6db4db89ef1ab22e3051a6ee944ba44430aa3474))

### 👷 Continuous Integration | CI 配置

- update husky pre-commit ([dd04f9a](https://github.com/anyup/uView-Pro/commit/dd04f9a8f2ebdbec37a148e1cf2fa3280c1ab2cd))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.19] - tag v0.0.19

Tagger: anyup <anyupxing@163.com>

Release version 0.0.19
2025-09-04

### 🐛 Bug Fixes | Bug 修复

- include uview-pro changelog.md in release commit ([18d902d](https://github.com/anyup/uView-Pro/commit/18d902db2bba4f8f574d7b3b72be218747525bb9))

### 📝 Documentation | 文档

- update uview pro changelog ([31261db](https://github.com/anyup/uView-Pro/commit/31261dbd6b17aea8126a43def1912324b782096e))

### ♻️ Code Refactoring | 代码重构

- 移除 uni-http 模块 ([5f21735](https://github.com/anyup/uView-Pro/commit/5f2173503cc904fb0a7fa2abd3ed3b9dbe09aeb2))

### ✨ Features | 新功能

- 新增http请求模块并实现插件化 ([31c6f88](https://github.com/anyup/uView-Pro/commit/31c6f880d12e586d445faddcc1a3910fda9926bc))
- 增强 toast 工具函数的灵活性 ([2232054](https://github.com/anyup/uView-Pro/commit/22320540acee36c6c11688387431a4ddba93520f))
- 添加 HTTP 请求拦截器和配置示例代码 ([aba7cf9](https://github.com/anyup/uView-Pro/commit/aba7cf97ed2424432da51be1841aa17a5a2d7932))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.0.19 ([ac9f999](https://github.com/anyup/uView-Pro/commit/ac9f9990cab450e14ddcd14681004417a14846ac))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.18] - tag v0.0.18

Tagger: anyup <anyupxing@163.com>

Release version 0.0.18
2025-09-03

### 🚀 Chore | 构建/工程依赖/工具

- update release script for better version management ([b64f38f](https://github.com/anyup/uView-Pro/commit/b64f38fea28de39c99cdf84f7e767aa7ceac1344))
- **release:** bump version to 0.0.18 ([ba61715](https://github.com/anyup/uView-Pro/commit/ba61715b4288f0c7beba5452f1c00a7dbfa3fb47))

### 🐛 Bug Fixes | Bug 修复

- **u-checkbox:** 兼容头条小程序获取父组件数据不支持provide/inject的写法 ([498e12e](https://github.com/anyup/uView-Pro/commit/498e12e2f3aa52021d1be282426536b45f39ca6a))

### 👷 Continuous Integration | CI 配置

- optimize changelog generation and spacing ([3103e7b](https://github.com/anyup/uView-Pro/commit/3103e7b56a0e2dd0392efdb6a85824b11ef6800c))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.17] - tag v0.0.17

Tagger: anyup <anyupxing@163.com>

Release version 0.0.17
2025-09-02

### ✨ Features | 新功能

- **components:** add u-loading-popup component ([6245df9](https://github.com/anyup/uView-Pro/commit/6245df951034b06225ab36d3f18cae8e7ab4b329))
- loading popup component enhance functionality and customization ([82f2aba](https://github.com/anyup/uView-Pro/commit/82f2aba81ead557e6c827cee13c2354fb8c3e16a))
- 添加 Loading 加载弹窗组件的示例页面 ([1bce868](https://github.com/anyup/uView-Pro/commit/1bce86810863012c5a73104ca0a85ebacb4aa92a))
- 更新发布脚本，支持同时更新两个package.json文件的版本号 ([b251b31](https://github.com/anyup/uView-Pro/commit/b251b314d0ef6f64653299460bcf321ec0872e0b))

### 🐛 Bug Fixes | Bug 修复

- 修复瀑布流组件u-waterfll，暴露celar/remove/modify方法 ([240e023](https://github.com/anyup/uView-Pro/commit/240e0238af092d4c6bde86d0db9e49636b806d6f))

### ♻️ Code Refactoring | 代码重构

- migrate waterfall demo to vue 3 composition api ([93949ad](https://github.com/anyup/uView-Pro/commit/93949ad8ae2a36c6130f87340c222ab9ec69d21f))
- 优化 loading popup 弹窗组件 ([eb0c981](https://github.com/anyup/uView-Pro/commit/eb0c981184a28952004c137f2db4fbc460e72a0f))

### 📝 Documentation | 文档

- update docs ([8604485](https://github.com/anyup/uView-Pro/commit/860448594a35814f0f0891ac12b586b7e2b533a4))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.0.17 ([9fcbdd9](https://github.com/anyup/uView-Pro/commit/9fcbdd90a0a1764134c8d33a011223a5dda990be))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.15] - tag v0.0.15

Tagger: anyup <anyupxing@163.com>

Release version 0.0.15
2025-08-30

### 📝 Documentation | 文档

- update readme docs ([2633c45](https://github.com/anyup/uView-Pro/commit/2633c4504a678802a997e6065292204f3b3fda2a))
- update readme docs ([2fd99d8](https://github.com/anyup/uView-Pro/commit/2fd99d8f6f9531e172e6eeabff513bdb3efcee41))
- update readme ([179c9d3](https://github.com/anyup/uView-Pro/commit/179c9d36f9872b4d69d4792f65cf0e01cca96f85))
- update readme docs ([ed211d7](https://github.com/anyup/uView-Pro/commit/ed211d7cf5cee823e94294506f786d8ce1877d14))
- 更新文档链接 ([58e34d5](https://github.com/anyup/uView-Pro/commit/58e34d50b1bff89ad76132b2b72fe7abe45918ed))
- types/v3-directive not published ([fc93b34](https://github.com/anyup/uView-Pro/commit/fc93b349c326aa29f872d3e337954fc91c9221c9))

### 🐛 Bug Fixes | Bug 修复

- 解决使用u-swipe-action右边会出现一条背景线的bug ([a5b60c6](https://github.com/anyup/uView-Pro/commit/a5b60c6485120e164c0e0c29eea3b765c10f9aac))
- update error text descriptions ([314c394](https://github.com/anyup/uView-Pro/commit/314c3940145c657b12f16d005af7d271f4ae74e3))
- **u-form:** update form validation rules and improve form component ([3912fd6](https://github.com/anyup/uView-Pro/commit/3912fd6ade3a1d612f6f5e86ddc0336376ee5618))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.0.14 ([d1afdf7](https://github.com/anyup/uView-Pro/commit/d1afdf735853eae65cc8676f2182379868ed9c4a))
- **release:** bump version to 0.0.15 ([d5bc854](https://github.com/anyup/uView-Pro/commit/d5bc854a4410104ca1864e35f9a932c7452a196f))

### ✨ Features | 新功能

- 优化 u-image 组件 slot 使用体验，兼容头条小程序 ([a6ca54f](https://github.com/anyup/uView-Pro/commit/a6ca54fce06b20b7a6938d0bef9342954b787641))

### ♻️ Code Refactoring | 代码重构

- **form:** migrate form demo to vue 3 composition api ([9d7c7d3](https://github.com/anyup/uView-Pro/commit/9d7c7d3f1bbfeda145bd3de57c65e0eccbcfdde9))

### 👷 Continuous Integration | CI 配置

- update changelog script with correct github url ([7761721](https://github.com/anyup/uView-Pro/commit/7761721dbd580de37fa94ac48514aeb4d570bc77))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.13] - tag v0.0.13

Tagger: anyup <anyupxing@163.com>

Release version 0.0.13
2025-08-27

### 🐛 Bug Fixes | Bug 修复

- 修复count-down组件暴露start和end方法 ([0f42a01](https://github.com/anyup/uView-Pro/commit/0f42a01f55aa6799f57eb93dc5d029b06115b154))

### 📝 Documentation | 文档

- 更新文档 ([ec8d987](https://github.com/anyup/uView-Pro/commit/ec8d987c840d32729b9d227f6cdcb1005aec4028))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.0.13 ([ea5c4df](https://github.com/anyup/uView-Pro/commit/ea5c4df6b77c4a7004fb0e4a9d538917e1ed4003))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.12] - tag v0.0.12

Tagger: anyup <anyupxing@163.com>

Release version 0.0.12
2025-08-27

### 📝 Documentation | 文档

- update readme docs ([103114b](https://github.com/anyup/uView-Pro/commit/103114b364add458d7d986fc2bfea2960b71231a))
- update readme docs ([06fd2ac](https://github.com/anyup/uView-Pro/commit/06fd2acbcbd2693bb77cf541f99bbcda41c4547d))
- update readme docs ([db35ab7](https://github.com/anyup/uView-Pro/commit/db35ab7e11daafd28097bae9eb4afeb92556cc83))

### 🐛 Bug Fixes | Bug 修复

- 优化 async-validator 文件多余注释导致的问题 ([f06c80d](https://github.com/anyup/uView-Pro/commit/f06c80d57e61e7b75f1384fe89f309b8a0e379fa))

### 📦‍ Build System | 打包构建

- 编译文件 ([212ec8d](https://github.com/anyup/uView-Pro/commit/212ec8d306725cb5e7a7680b399553ddbaff07b4))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.0.12 ([f791252](https://github.com/anyup/uView-Pro/commit/f7912525316f493d925eef34fed01594eb6d7d61))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.11] - tag v0.0.11

Tagger: anyup <anyupxing@163.com>

Release version 0.0.11
2025-08-26

### 🐛 Bug Fixes | Bug 修复

- 修复u-count-down倒计时符号显示逻辑 ([a4c9498](https://github.com/anyup/uView-Pro/commit/a4c94986b020c5ac0fdf92bde3c7b79cdfbedbe8))

### ♻️ Code Refactoring | 代码重构

- 取消 async-validator ts 检查 ([772a729](https://github.com/anyup/uView-Pro/commit/772a729164f2cb268a886b6749e4a58846ebb3dc))
- 移除u-tr未使用的类型导入和属性定义 ([46ce459](https://github.com/anyup/uView-Pro/commit/46ce4590166a30a0eb048110efc046095a87f6e8))

### 📝 Documentation | 文档

- update docs ([541f7bb](https://github.com/anyup/uView-Pro/commit/541f7bbc31a40cc7ce286c2a20b49545b1e823f5))
- 更新 package.json 描述文件 ([e1ced9c](https://github.com/anyup/uView-Pro/commit/e1ced9c412f2cd85d485054946df436b014b726e))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.0.11 ([86f972a](https://github.com/anyup/uView-Pro/commit/86f972ab537120e86acac35441466ca710370b0b))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.10] - tag v0.0.10

Tagger: anyup <anyupxing@163.com>

Release version 0.0.10
2025-08-26

### ♻️ Code Refactoring | 代码重构

- 完善 select 组件类型定义 ([26af2da](https://github.com/anyup/uView-Pro/commit/26af2da5be7801e35ffbbdd4aebcbfd13e5a44fe))

### ✨ Features | 新功能

- 添加 easycom 组件自动扫描 ([b125039](https://github.com/anyup/uView-Pro/commit/b1250390a4f594f5deaa133d7a92bd6e72707890))
- 增强 u-select 组件的类型安全和功能 ([38635e9](https://github.com/anyup/uView-Pro/commit/38635e963f9eff6e4c730692e8c97f10b3a092c5))

### 📝 Documentation | 文档

- 更新快速上手指南 ([a863a7a](https://github.com/anyup/uView-Pro/commit/a863a7a1b25a28dbb8318c35986f8e86117475be))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.0.10 ([7914ffb](https://github.com/anyup/uView-Pro/commit/7914ffb5d13ddf192c8d489b85ce7c38804deda4))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.9] - tag v0.0.9

Tagger: anyup <anyupxing@163.com>

Release version 0.0.9
2025-08-25

### ♻️ Code Refactoring | 代码重构

- 优化全局工具导出方式 ([7a80b6f](https://github.com/anyup/uView-Pro/commit/7a80b6f99ad3022ca995f99f8ec6803af7941eb9))

### 📦‍ Build System | 打包构建

- update version to 0.0.9 ([1bb904a](https://github.com/anyup/uView-Pro/commit/1bb904ab28017afb0e7fcad19db422ddfeeb4c3f))

### 📝 Documentation | 文档

- update changelog ([48d8e88](https://github.com/anyup/uView-Pro/commit/48d8e88f9e9918542777a77c1098d9c183b7be4d))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.0.9 ([e7cedb3](https://github.com/anyup/uView-Pro/commit/e7cedb37e2b1917f1bb66c43012e4d33662b5ec2))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.8] - tag v0.0.8

Tagger: anyup <anyupxing@163.com>

Release version 0.0.8
2025-08-25

### ♻️ Code Refactoring | 代码重构

- 重构类型定义types ([466463e](https://github.com/anyup/uView-Pro/commit/466463ea51909210c698d52577b0fccf35091558))
- 重构组件Props属性定义，每个组件具有完善的ts类型定义 ([8cc0de7](https://github.com/anyup/uView-Pro/commit/8cc0de7c1527b48dd223d89207135eea01766294))
- 重构类型定义并统一到全局类型文件global types ([b0fd010](https://github.com/anyup/uView-Pro/commit/b0fd0107289eb1c6df2f58d91b63d9b25902caee))

### 📦‍ Build System | 打包构建

- release v0.0.8 ([6f8c240](https://github.com/anyup/uView-Pro/commit/6f8c24044f966fbdc8323e3a29718c45b31005c2))

### 🚀 Chore | 构建/工程依赖/工具

- **release:** bump version to 0.0.8 ([168fd72](https://github.com/anyup/uView-Pro/commit/168fd7298f89e886e44d418250297b487b573c93))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.7] - tag v0.0.7

Tagger: anyup <anyupxing@163.com>

Release version 0.0.7
2025-08-21

### 📝 Documentation | 文档

- **README:** 更新文档 ([7b0fcaf](https://github.com/anyup/uView-Pro/commit/7b0fcaf8d940077a3626bf5b4d27ea76281aa4cc))
- 更新项目文档链接 ([a5b2ec1](https://github.com/anyup/uView-Pro/commit/a5b2ec12e932beb483dc7235e255e4ea258eb6e3))
- 更新插件市场下载链接 ([16ecf8d](https://github.com/anyup/uView-Pro/commit/16ecf8d2a8339467f34d2b39779be89b2fb195f5))
- 添加 issue 和 PR 模板以提高项目管理效率 ([fd93594](https://github.com/anyup/uView-Pro/commit/fd93594649bb082ebb031d3835a5bd8db1141347))
- 更新 issue 和 PR 模板 ([b090a23](https://github.com/anyup/uView-Pro/commit/b090a23443103008a88fb708deb3b8600a5dd070))
- 添加 issue 和 PR 模板 ([5b94bff](https://github.com/anyup/uView-Pro/commit/5b94bff012db1f3baa8eec692d423535b9fd431f))
- 删除无用的 issue 模板 ([b85761c](https://github.com/anyup/uView-Pro/commit/b85761ceebe25ef06b275b4497d6cfb10667aca8))
- 更新 README.md 中的徽章 ([4f9e241](https://github.com/anyup/uView-Pro/commit/4f9e241518a19db051bb7d787bca3deddfdd3bdf))
- **README:** 更新项目徽章和文档链接 ([e759065](https://github.com/anyup/uView-Pro/commit/e759065dced747c68ccf4a8258dce1b273aba260))
- **request:** 添加 uni-http 使用说明并实现 hooks 版本 ([00191b3](https://github.com/anyup/uView-Pro/commit/00191b3dd2110cb5a15e170ba0fab0fce41a1f7c))
- **uview-pro:** 更新 readme 文档 ([8d300a8](https://github.com/anyup/uView-Pro/commit/8d300a82a64149d33e76f6a927050a23158856c9))
- 更新 README ([81243c6](https://github.com/anyup/uView-Pro/commit/81243c6d70006202420f0e831d650db458fe043d))
- **uview-pro:** 更新组件功能和优化描述 ([a840a46](https://github.com/anyup/uView-Pro/commit/a840a46cd3d35b8d2a4d287f2a9ca192ff596969))
- **uview-pro:** 更新组件列表和 changelog ([aee4275](https://github.com/anyup/uView-Pro/commit/aee4275641f3e5f97192349587b1b53acc5321e2))
- 更新 SSR 安装指南和 pages.json 配置 ([dcb8b91](https://github.com/anyup/uView-Pro/commit/dcb8b91b45b2fedb02fbfd59f24d8627b38cb600))
- 更新图片链接 ([24484aa](https://github.com/anyup/uView-Pro/commit/24484aae02f4bcc0880b80c2910b264486e9b592))

### ♻️ Code Refactoring | 代码重构

- **components:** [icon] 优化 margin 为 space ([e26b5db](https://github.com/anyup/uView-Pro/commit/e26b5dbc1d0d670484744d55bbfeb61a7b33bf6c))
- 更新文档链接为 Netlify 部署地址 ([3b7adfd](https://github.com/anyup/uView-Pro/commit/3b7adfde4d22403123c27f777027884a93ec516b))
- **page-nav:** 重构页面导航栏组件 ([9ae343c](https://github.com/anyup/uView-Pro/commit/9ae343c3fda13599f02528e3c7ee5d75e1c021b6))
- **gitee:** 优化 Gitee Issue 模板并调整页面配置 ([be54720](https://github.com/anyup/uView-Pro/commit/be547205d2c095316d7eb9252be0f4010719d06f))
- **uview-pro:** 重构 md5 函数的默认导出方式 ([75b6d3c](https://github.com/anyup/uView-Pro/commit/75b6d3c8840c922bbb03835ae4899cd28742e129))
- **example:** 重构 components 页面 ([a03c62d](https://github.com/anyup/uView-Pro/commit/a03c62ddd5bb0809f869cb847179549ae2b9cbd2))
- **library:** 重构工具库示例页面 ([49b438e](https://github.com/anyup/uView-Pro/commit/49b438ef141327af01b61d4ef2d1e14387dcd340))
- **components:** 更新多个组件插槽使用方式 ([c38ea5b](https://github.com/anyup/uView-Pro/commit/c38ea5b75e2a63f0bc54e489eaa09449122d6911))
- 优化关于页面布局和内容 ([ad5f6a4](https://github.com/anyup/uView-Pro/commit/ad5f6a47847999268b43b8c5dbf1a34cb8f70802))
- 删除分类数据文件 ([5ed7a11](https://github.com/anyup/uView-Pro/commit/5ed7a1113db58ff493ad606296a210358348affe))
- 重构index list页面 ([13d780e](https://github.com/anyup/uView-Pro/commit/13d780ea5acc4c8eed72062482735df826d4b37a))
- 更新商场菜单组件引用 ([a5f1bf3](https://github.com/anyup/uView-Pro/commit/a5f1bf3f256705d6cad028d60701b4b0544332de))
- 修改图片地址 ([c459893](https://github.com/anyup/uView-Pro/commit/c459893848936aa9a44e7bda3277ab1428109869))
- 重构upload上传组件示例页面 ([686831d](https://github.com/anyup/uView-Pro/commit/686831de357aca67bbf7015e2f0696cf6bf48164))
- 优化多个组件的代码结构和样式 ([f2af44c](https://github.com/anyup/uView-Pro/commit/f2af44ca1710334495e4c4fad99d04027b3788f8))
- 删除不再使用的u-parse组件及相关文件 ([a09bc6d](https://github.com/anyup/uView-Pro/commit/a09bc6d595d5ee8757c97778433488a9c08431ab))
- 优化多个组件的代码结构 ([df66344](https://github.com/anyup/uView-Pro/commit/df663445ae7082e2e6c88ac5d8cead1b757e8fc8))
- 重构 u-avatar-cropper 组件的类型声明文件 ([dc951c9](https://github.com/anyup/uView-Pro/commit/dc951c96346946e651c889dcaa3a7cb198e67116))
- 添加 async-validator 类型声明文件 ([752116b](https://github.com/anyup/uView-Pro/commit/752116b2b723160764579f5c63a13a638dd14240))

### 📦‍ Build System | 打包构建

- 修改路由基础路径，去除h5 ([24dbff7](https://github.com/anyup/uView-Pro/commit/24dbff796e577157ac2ec8764d48b476cb6eb2ea))
- 更新版本号versionCode ([3877b67](https://github.com/anyup/uView-Pro/commit/3877b67dd8b9a2a6acb142c9ee7cdfe0bbf31912))
- 更新 android sdk 版本号 ([8885a1d](https://github.com/anyup/uView-Pro/commit/8885a1d2c2d1b165a1930452bb741d3e895c3957))
- version 0.0.5 ([2f97a50](https://github.com/anyup/uView-Pro/commit/2f97a50c9954375257e430d971dd80b2d7234fa6))
- 更新版本号 ([1280508](https://github.com/anyup/uView-Pro/commit/1280508612cfefa8fbf12df0c089886581d24ed5))
- 更新组件库显示名称 ([89f06df](https://github.com/anyup/uView-Pro/commit/89f06df683e76104eab4ba7cf09094cd2930d63f))
- 更新项目依赖并优化打包构建 ([c172d36](https://github.com/anyup/uView-Pro/commit/c172d368d82404564650756a872cd7c7e29ebfa2))
- 更新版本号至 0.0.6 ([04c8bac](https://github.com/anyup/uView-Pro/commit/04c8bace794fd1fe16c53565df2236c96e80a835))

### ✨ Features | 新功能

- **example:** 添加页面分享功能 ([0c1a8e2](https://github.com/anyup/uView-Pro/commit/0c1a8e2d05a194791c494a6cb2c1b7c6fe4873a8))
- **components:** 添加 demo-animation 组件 ([aca752b](https://github.com/anyup/uView-Pro/commit/aca752b02d37c8c8382bae65825401f4531f227d))
- **components:** 添加 demo-card 组件 ([60ca440](https://github.com/anyup/uView-Pro/commit/60ca4403df5d7336d3a6bf533aee765dfcfba0a6))
- **example:** 添加 JS 工具库示例页面 ([685ab38](https://github.com/anyup/uView-Pro/commit/685ab38bae80161b9db795069eb9497944fcb746))
- **tabBar:** 添加工具页面并调整 tabBar 列表 ([1f4ba43](https://github.com/anyup/uView-Pro/commit/1f4ba43f9d29a4c8fd6bf12de577ff59933ea312))
- **uview-pro:** 发布 0.0.4 版本 ([5d595d2](https://github.com/anyup/uView-Pro/commit/5d595d281ed957184d3925c5d059224f6cafb9e6))
- 添加提交规范相关配置文件git-cz/husky/changelog ([d93b816](https://github.com/anyup/uView-Pro/commit/d93b816a5a3e468c4bc45e3161d7c006cba5fbf6))
- 优化 deepClone 和 deepMerge 页面的结果展示 ([b0daa70](https://github.com/anyup/uView-Pro/commit/b0daa700b6a385e037d38dc1f10b3612596e2403))
- 新增优惠券模板 ([1b77762](https://github.com/anyup/uView-Pro/commit/1b777621615f7ebe9d83606d53650987c8b2c4e0))
- 更新easycom配置说明，一定要放在custom里，否则不生效 ([fc14bf9](https://github.com/anyup/uView-Pro/commit/fc14bf90cb77088d258e20e79e3d25820f37e97e))
- 添加 u-city-select 城市选择器组件 ([0eb4806](https://github.com/anyup/uView-Pro/commit/0eb4806db3be39e1a6c6f33c9ea511d8445da884))
- 添加模板示例页面 ([3336af4](https://github.com/anyup/uView-Pro/commit/3336af406161648d18578c988d9b3ad79b86059a))
- 新增模版相关页面 ([8925a02](https://github.com/anyup/uView-Pro/commit/8925a02f9fa88f4742d984f2ff02909afc6ad0d7))
- 重构request类，优化泛型支持 ([d7b2e6a](https://github.com/anyup/uView-Pro/commit/d7b2e6a224d96f717e5bdbaf09edb19b712ced47))
- 完善u-button的open-type支持类型 ([37c0db5](https://github.com/anyup/uView-Pro/commit/37c0db527258bca57dbd55d7013b633230489853))
- 添加 uview-pro 组件库的 TypeScript 类型声明 ([e6b2cbf](https://github.com/anyup/uView-Pro/commit/e6b2cbfc8417b0877c8cd1d374e2cd8731ec6bec))
- changelog增加生成指定范围变更日志的功能 ([79c6fd0](https://github.com/anyup/uView-Pro/commit/79c6fd01426ff3b4a83db2b98a8b595805fc9d22))

### 🐛 Bug Fixes | Bug 修复

- **components:** update ([b0f7b17](https://github.com/anyup/uView-Pro/commit/b0f7b171916b0c65ed452d04354a5b80f3745e87))
- **upload:** 解决上传组件并添加自定义按钮不生效的问题 ([ae35c0e](https://github.com/anyup/uView-Pro/commit/ae35c0e5517add4ec703ffd6a9a3d0133d17ddb5))
- u-upload 暴露 lists 属性 ([09f8424](https://github.com/anyup/uView-Pro/commit/09f8424774baaee3b6fc7a42458949f8d5903951))
- u-upload深度监听文件列表变化并优化事件触发 ([a41a571](https://github.com/anyup/uView-Pro/commit/a41a5719ddf9d6793b78c55a13025bbdc88fdfe3))
- 修复 notice 组件背景色和键盘组件默认值问题 ([4ef252a](https://github.com/anyup/uView-Pro/commit/4ef252a4f4a093d0899fc3de4ad1b3bfc74277b4))
- 修复中tabbar布局高度计算错误的问题 ([5c1342c](https://github.com/anyup/uView-Pro/commit/5c1342cb3fb6dd2c7c84fe785953fcaed13e809f))

### 🚀 Chore | 构建/工程依赖/工具

- 更新 .gitignore 文件 ([8ff834e](https://github.com/anyup/uView-Pro/commit/8ff834ed6d0bceaf9c2c467a1d4a5f63bc06ad19))
- **release:** bump version to 0.0.7 ([6830df1](https://github.com/anyup/uView-Pro/commit/6830df1cde517c063c26c2d5f16f22259b3b2f5d))

### 💄 Styles | 风格

- 添加 referrer 策略 meta 标签 ([5f8961a](https://github.com/anyup/uView-Pro/commit/5f8961ab19cd166b06f7d42af204c84ed61f42b9))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/wjp"><img src="https://github.com/wjp.png?size=40" width="40" height="40" alt="wjp" title="wjp"/></a> <a href="https://github.com/chouchouji"><img src="https://github.com/chouchouji.png?size=40" width="40" height="40" alt="chouchouji" title="chouchouji"/></a> <a href="https://github.com/yourname"><img src="https://github.com/yourname.png?size=40" width="40" height="40" alt="Your Name" title="Your Name"/></a>

## [0.0.3] - tag v0.0.3

Tagger: anyup <anyupxing@163.com>

- 添加插件使用示例工程
- github/gitee/npmjs/插件市场版本同步2025-08-06

### 📝 Documentation | 文档

- 添加 uView Pro QQ 交流群链接 ([756befb](https://github.com/anyup/uView-Pro/commit/756befbf5646129f2d6dd4652bc6e5934cbe3a3b))
- 更新 README 中的徽章链接 ([b28b150](https://github.com/anyup/uView-Pro/commit/b28b150614cd8fffff4763ec6cd2ce35a76bb777))
- 调整 README.md 中的徽标位置 ([56aa752](https://github.com/anyup/uView-Pro/commit/56aa7523ac4c7da57eeb7cc024ec2f2e2473ff78))
- **readme:** 更新 uView Pro 项目文档 ([5bf77b5](https://github.com/anyup/uView-Pro/commit/5bf77b50763307f0a9569c0a48bfd996fb876396))
- **README:** 更新项目徽标展示布局 ([650ed2f](https://github.com/anyup/uView-Pro/commit/650ed2f5c5ca4a092d468342bf1e113befd07784))
- 更新 README 中的项目链接 ([335b707](https://github.com/anyup/uView-Pro/commit/335b707a8941a5c4a429f9734a69a2cae951cbfc))
- **README:** 更新安装方式说明 ([c1f95ac](https://github.com/anyup/uView-Pro/commit/c1f95ac6f57aefe069adcdb7ab4bc51edac8aab8))
- 更新官方文档链接 ([7cd7ce9](https://github.com/anyup/uView-Pro/commit/7cd7ce9425987993b3e6a0c89e271d6bffac3a64))
- **uview-pro:** 更新文档链接地址 ([9688d79](https://github.com/anyup/uView-Pro/commit/9688d790af3526f8dcecd08574ab6a7ee7a2a1c6))
- **README:** 更新快速入门指南并优化文档结构 ([d894a5b](https://github.com/anyup/uView-Pro/commit/d894a5b7bfa6944bda7267d5ccc030c58019ce0b))
- **README:** 更新中文和英文版本的 README 文件 ([a9102c1](https://github.com/anyup/uView-Pro/commit/a9102c12672db1cf5df79f385d5f46d4d63c3ca0))
- 更新 README 文件中的 GitHub 链接 ([dc80417](https://github.com/anyup/uView-Pro/commit/dc804176d4a11a79e1fdbaf510935be00f94aebb))
- **readme:** 移除升级指南链接 ([e6417dd](https://github.com/anyup/uView-Pro/commit/e6417dd3078f132c3040ea5a089c1445f82bc27a))
- **README:** 更新文档链接 ([6794352](https://github.com/anyup/uView-Pro/commit/6794352e3a15a568e1fb9a75201fde8cb4a4cf59))

### 🚀 Chore | 构建/工程依赖/工具

- 更新 .gitignore 文件 ([b38550b](https://github.com/anyup/uView-Pro/commit/b38550bb0861b04afedfa2e50ffd1fa8435b43b2))

### 👷 Continuous Integration | CI 配置

- **uview-pro:** 更新 Vue 版本兼容性并调整文档 ([82c3725](https://github.com/anyup/uView-Pro/commit/82c37255f42a0b7a26bf829552fb0d27f8a38a15))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## [0.0.2] - tag v0.0.2

Tagger: anyup <anyupxing@163.com>

## 67个组件已使用Vue3+TS完成重构，如下：

### 基础组件（8）

- Color 色彩
- Icon 图标
- Image 图片
- Button 按钮
- Layout 布局
- Cell 单元格
- Badge 徽标数
- Tag 标签

---

### 表单组件（15）

- Form 表单
- Calendar 日历
- Select 列选择器
- Keyboard 键盘
- Picker 选择器
- Rate 评分
- Search 搜索
- NumberBox 步进器
- Upload 上传
- VerificationCode 验证码倒计时
- Field 输入框
- Checkbox 复选框
- Radio 单选框
- Switch 开关选择器
- Slider 滑动选择器

---

### 数据组件（4）

- Progress 进度条
- Table 表格
- CountDown 倒计时
- CountTo 数字滚动

---

### 反馈组件（10）

- ActionSheet 操作菜单
- AlertTips 警告提示
- Toast 消息提示
- NoticeBar 滚动通知
- TopTips 顶部提示
- SwipeAction 滑动单元格
- Collapse 折叠面板
- Popup 弹出层
- Modal 模态框
- fullScreen 压窗屏

---

### 布局组件（11）

- Line 线条
- Card 卡片
- Mask 遮罩层
- NoNetwork 无网络提示
- Grid 宫格布局
- Swiper 轮播图
- TimeLine 时间轴
- Skeleton 骨架屏
- Sticky 吸顶
- Waterfall 瀑布流
- Divider 分割线

---

### 导航组件（11）

- Dropdown 下拉菜单
- Tabbar 底部导航栏
- BackTop 返回顶部
- Navbar 导航栏
- Tabs 标签
- TabsSwiper 全屏选项卡
- Subsection 分段器
- IndexList 索引列表
- Steps 步骤条
- Empty 内容为空
- Section 查看更多

---

### 其他组件（8）

- MessageInput 验证码输入
- Loadmore 加载更多
- ReadMore 展开阅读更多
- LazyLoad 懒加载
- Gap 间隔槽
- Avatar 头像
- Link 超链接
- Loading 加载动画

---

2025-08-04

### ♻️ Code Refactoring | 代码重构

- update components to use $u directly for utility functions ([e97b9fd](https://github.com/anyup/uView-Pro/commit/e97b9fda94cb79b3f6317b6568a801ae0dce900c))
- **u-icon:** 重构 u-icon 组件 ([5d8ea1b](https://github.com/anyup/uView-Pro/commit/5d8ea1b63cd8ae17fcf58dbcac5af011c442264a))
- **u-image:** 重构 u-image 组件 ([7768616](https://github.com/anyup/uView-Pro/commit/7768616b4e9d0966d9e8172a2cc6658e934a8ecd))
- **u-loading:** 优化 u-loading 组件的模板和样式 ([891cc65](https://github.com/anyup/uView-Pro/commit/891cc65e6f17e205bacc2376a8fe818391a756d3))
- **u-icon:** 重构 u-icon 组件，优化代码结构和样式 ([6fc8e86](https://github.com/anyup/uView-Pro/commit/6fc8e867b9d3342ff4ec03f539999dd13ac5d28f))
- **button:** 重构按钮组件，优化代码结构和使用 Composition API ([e110919](https://github.com/anyup/uView-Pro/commit/e11091904a1a3c9f816e48a30226f5fc91f95b2e))
- **u-button:** 重构 u-button 组件，优化代码结构，使用 Composition API ([9f5cfe3](https://github.com/anyup/uView-Pro/commit/9f5cfe367fc581b74c96518c0e27f9383a298328))
- **u-image:** 增加 changeStatus 方法以管理加载状态和错误状态 ([31bf604](https://github.com/anyup/uView-Pro/commit/31bf6043008ce610c1aff32ad3afa08a3f176dd2))
- **color:** 优化颜色组件结构，简化模板和样式 ([e637df1](https://github.com/anyup/uView-Pro/commit/e637df19eda555677a9fa3f3b544e37694b0c8bb))
- **u-image:** 重构 u-image 组件，迁移至 Composition API，优化代码结构 ([ccb088a](https://github.com/anyup/uView-Pro/commit/ccb088a7d7de3d54f2dd9aa1615e910826cad982))
- **u-col, u-row:** 重构 u-col 和 u-row 组件，迁移至 Composition API，优化代码结构 ([690cfc6](https://github.com/anyup/uView-Pro/commit/690cfc6c6ef2d6ff8fe3b87ca3c681ce90bd2a4a))
- **u-cell-group, u-cell-item:** 重构 u-cell-group 和 u-cell-item 组件，迁移至 Composition API，优化代码结构 ([56b3848](https://github.com/anyup/uView-Pro/commit/56b3848cdb7924d5b0f9e471dd2dda534c163ee7))
- **index.vue:** 移除 u-demo-wrap 的内联样式，优化布局结构 ([e4bd433](https://github.com/anyup/uView-Pro/commit/e4bd433ea1f04aaa5d2fa6830360312ac44214d7))
- **keyboard:** 重构键盘组件并添加 TypeScript 支持 ([5d6db3d](https://github.com/anyup/uView-Pro/commit/5d6db3de1bb425816acb5c37149a4134ef9a2206))
- **modal:** 重构模态组件 ([4f1d03c](https://github.com/anyup/uView-Pro/commit/4f1d03c39895ad99fb0f0086fd58d1a86b9b69c8))
- **components:** 重构 u-select 组件 ([ed6492f](https://github.com/anyup/uView-Pro/commit/ed6492fae447907b46cc211c4ccec2c3081898e4))
- **picker:** 更新 v-model 语法 ([ad88e98](https://github.com/anyup/uView-Pro/commit/ad88e98eec6b2a214e5f74d4a77960a98ba667eb))
- **rate:** 重构 rate 组件 ([cb5fdf6](https://github.com/anyup/uView-Pro/commit/cb5fdf6f48f9da732b3ca268df296fa696c938b6))
- **u-search:** 重构搜索框组件 ([cf21fae](https://github.com/anyup/uView-Pro/commit/cf21fae30fd0ec156d09649cc3b007f5c283f2f0))
- **toast:** 重构 toast 组件 ([c51eb14](https://github.com/anyup/uView-Pro/commit/c51eb144c4cbb935444f6654bba83174e246b43c))
- **u-image:** 重构 u-image 组件 ([2f121ef](https://github.com/anyup/uView-Pro/commit/2f121efad4b8d7a74c581d221da94e903ddb6fc0))
- **citySelect:** 更新城市选择器数据文件路径 ([194202a](https://github.com/anyup/uView-Pro/commit/194202a2e8ee06cec9b70822789a896a3b2c9c7d))
- **colorful-uni-plus:** 重构 u-badge 组件 ([c274d54](https://github.com/anyup/uView-Pro/commit/c274d548606b8719da7af0c8e4e21b6809a2f48c))
- **colorful-uni-plus:** 重构 u-calendar 组件 ([87ca8da](https://github.com/anyup/uView-Pro/commit/87ca8daa65930b9b13928dd37a07f6907c26d360))
- **colorful-uni-plus:** 重构 u-tag 组件 ([1d227ff](https://github.com/anyup/uView-Pro/commit/1d227ff175e43a8793e9615a900130d7011ea5c6))
- **i18n:** 优化国际化配置并添加全局翻译函数 ([fe13f34](https://github.com/anyup/uView-Pro/commit/fe13f342e554dc66671c1e4a3af5d26ab4a4f55a))
- **colorful-uni-plus:** 重构 u-switch 组件 ([e7eeac7](https://github.com/anyup/uView-Pro/commit/e7eeac79b3382a4130277b59927d2bf3f0e20207))
- **全局:** 重构 v-model 用法并优化 $u 工具库 ([c3c9d6e](https://github.com/anyup/uView-Pro/commit/c3c9d6e6f58b58a3a052534af2173e03c02ab0f1))
- **colorful-uni-plus:** 重构事件派发和广播工具，新增 mitt 实现 ([4a4b22f](https://github.com/anyup/uView-Pro/commit/4a4b22fcaf33b88a0b54d4c4dda885428c0c6f2b))
- **colorful-uni-plus:** 将 u-action-sheet 组件重构为组合式 API，优化 props 和事件处理 ([c23469b](https://github.com/anyup/uView-Pro/commit/c23469b431ee41a2fed94a823ec7145e8bc2b2e1))
- **colorful-uni-plus:** 将 u-checkbox 组件重构为组合式 API，优化 props 和事件处理 ([75bbb92](https://github.com/anyup/uView-Pro/commit/75bbb923d33f2d739437521da97924aebb678afa))
- **colorful-uni-plus:** 将 u-checkbox-group 组件重构为组合式 API，优化 props 和事件处理 ([c38bf5d](https://github.com/anyup/uView-Pro/commit/c38bf5d4f7f537a27979bcf1aee28f7ecac8840f))
- **colorful-uni-plus:** 将 u-form 组件重构为组合式 API，优化 props 和事件处理 ([f84a8f9](https://github.com/anyup/uView-Pro/commit/f84a8f97ea8997fb55997a42cc746cc77b032a77))
- **u-rate:** 使用 getCurrentInstance 优化节点获取方法 ([aa1dc53](https://github.com/anyup/uView-Pro/commit/aa1dc538e705ad19bda8c19d339a0b106f8ff566))
- **u-upload:** 重构 u-upload 组件 ([3f0c01e](https://github.com/anyup/uView-Pro/commit/3f0c01eb0d5b8ae06f88aa502d1b9d79f82d2a7d))
- **form:** 重构 u-form 和 u-form-item 组件 ([2445f3b](https://github.com/anyup/uView-Pro/commit/2445f3b689d50abd52c8feb95e0eb9ce7d950bd3))
- **colorful-uni-plus:** 重构 u-back-top 组件 ([bcae27f](https://github.com/anyup/uView-Pro/commit/bcae27f64650631ea353f4d1120e05314a78eadc))
- **avatar:** 重构头像组件，使用 Vue 3 的新特性 ([d8b7ea7](https://github.com/anyup/uView-Pro/commit/d8b7ea79d37928fa0773408831b5fa2a8da358be))
- **colorful-uni-plus:** 重构 u-alert-tips 组件 ([dd5aee3](https://github.com/anyup/uView-Pro/commit/dd5aee3b537ca18172bf7c06f313dbf85add079e))
- **card:** 重构卡片组件并优化示例 ([bd0a312](https://github.com/anyup/uView-Pro/commit/bd0a312482401a5dc99eaa1f4550eccc9e555c25))
- **colorful-uni-plus:** 重构 u-circle-progress 组件 ([63f2dec](https://github.com/anyup/uView-Pro/commit/63f2dec21a6acf18c12fb6e9db3e8c603ed86af4))
- **colorful-uni-plus:** 重构 u-line-progress 组件 ([853c585](https://github.com/anyup/uView-Pro/commit/853c585371e0e00af9b769e959ebaccf4c691862))
- **componentsC:** 优化 progress 组件中的颜色处理 ([53bfb95](https://github.com/anyup/uView-Pro/commit/53bfb95b4aea795e41cec9e480467b0497783f43))
- **colorful-uni-plus:** 重构 u-collapse 组件 ([319f8f6](https://github.com/anyup/uView-Pro/commit/319f8f6d63018551fbae4ed4673f9827075f9a82))
- **divider:** 重构 u-divider 组件 ([90f9e0a](https://github.com/anyup/uView-Pro/commit/90f9e0ae180bcbbda49441bf048a72f241119782))
- **colorful-uni-plus:** 重构 u-empty 组件 ([5a51281](https://github.com/anyup/uView-Pro/commit/5a51281d3283c610b79c9f8c7b9a564db0299dac))
- **components:** 重构 u-gap 组件 ([e0abd72](https://github.com/anyup/uView-Pro/commit/e0abd725af20e0a0b512090861395f8d9df4d0fb))
- **components:** 重构 u-line 组件 ([623d25c](https://github.com/anyup/uView-Pro/commit/623d25cdb6117d460d79c90179174fcab227d9ba))
- **components:** 重构 u-link 组件 ([46e509c](https://github.com/anyup/uView-Pro/commit/46e509cbd763de253b1e78d43c15d2acc8fc4c72))
- 删除无用的加载页面组件 ([b656ce2](https://github.com/anyup/uView-Pro/commit/b656ce27c9c46b7ec8a970320059223882117b62))
- **components:** 重构 u-loadmore 组件 ([43e983a](https://github.com/anyup/uView-Pro/commit/43e983ad88c1811a94e44cb119faa3e3fae8bb00))
- **components:** 重构 u-mask 组件 ([4a7962e](https://github.com/anyup/uView-Pro/commit/4a7962e2dc1b24e4c1747ee268c6f9c3bfff8bb5))
- **components:** 重构 u-message-input 组件 ([eba51d2](https://github.com/anyup/uView-Pro/commit/eba51d254537175b91d3471076e19e4b2ba68b72))
- **libs:** 重构组件库代码并添加类型定义 ([add879d](https://github.com/anyup/uView-Pro/commit/add879d085e078310e94db48dc3a4168da805643))
- **colorful-uni-plus:** 重构 $u 工具库 ([cdac9e2](https://github.com/anyup/uView-Pro/commit/cdac9e23d39d351e6db74b3c827ce99634f3efc1))
- **i18n:** 重构国际化文案并支持简体中文 ([2024330](https://github.com/anyup/uView-Pro/commit/20243309d5120d724afd0bc3e3a37e044d22da0a))
- **i18n:** 重构国际化配置并简化代码 ([8cf46ad](https://github.com/anyup/uView-Pro/commit/8cf46adde563d588324a5c8a673442c6edd9292e))
- **modal:** 更新模态组件以支持 Vue 3 ([6587764](https://github.com/anyup/uView-Pro/commit/6587764d61a57289d2df6050e06e32decd9384da))
- 更新组件属性绑定方式 ([3cb5643](https://github.com/anyup/uView-Pro/commit/3cb5643437cae1e428cbdd97758356037693791f))
- **components:** 更新组件以使用 modelValue ([272107b](https://github.com/anyup/uView-Pro/commit/272107ba6422017594a7baf3c4051a1af2e275d0))
- **$parent:** 重构 $parent 方法以适配 Vue 3 ([189a029](https://github.com/anyup/uView-Pro/commit/189a0290dab31e0adb67240c1d660aa887f25e24))
- **subsection:** 重构分段器组件 ([dbf7659](https://github.com/anyup/uView-Pro/commit/dbf765947b4996d4341c794b1587f918c9c7906c))
- **u-tabbar:** 重构 u-tabbar 组件 ([c089528](https://github.com/anyup/uView-Pro/commit/c089528dd8994993ed9c96f9eb08a7d256e0f25c))
- **colorful-uni-plus:** 优化 u-circle-progress 组件代码 ([c5ff9cf](https://github.com/anyup/uView-Pro/commit/c5ff9cf0920656c8faf444136d21b87030bf864f))
- **notice-bar:** 重构 u-column-notice 和 u-notice-bar 组件 ([43ab34c](https://github.com/anyup/uView-Pro/commit/43ab34c2ff5162afa9fbb3df4b95a0db5856b06a))
- **time-line:** 重构时间轴组件 ([63ebfed](https://github.com/anyup/uView-Pro/commit/63ebfeddc3976e60d7b2a06b3caa818f9277f2dc))
- **componentsB:** 优化瀑布流组件代码 ([bac061f](https://github.com/anyup/uView-Pro/commit/bac061f66c7dcfaa87a936ff9d54331a0837f2c9))
- **countDown:** 重构倒计时组件 ([94f66ea](https://github.com/anyup/uView-Pro/commit/94f66ea96616f80fd2fdb3d402b5cfcce3e55792))
- **u-count-to:** 重构计数器组件 ([fff0e56](https://github.com/anyup/uView-Pro/commit/fff0e569b4e14001c060db7b12d9f43f0873bb44))
- **field:** 重构 u-field 组件 ([b8daf24](https://github.com/anyup/uView-Pro/commit/b8daf247c9748f8809cda58f71f733872c78deaa))
- **components:** 重构 u-full-screen 组件 ([deb3d65](https://github.com/anyup/uView-Pro/commit/deb3d65ba44ead65134c948f9cb7be3c751ffb66))
- **pages:** 调整页面配置并优化组件示例 ([98f0141](https://github.com/anyup/uView-Pro/commit/98f014113673d08d80dcae7d145b2b0f87ae34dd))
- **components:** 重构 u-read-more 组件 ([151bcd2](https://github.com/anyup/uView-Pro/commit/151bcd2106af943719bc28cd479bab3cd205bb33))
- **function:** 重构 getRect 方法并移至独立模块 ([be2e19e](https://github.com/anyup/uView-Pro/commit/be2e19ec25dd56340067fc45f639978140c9fa6a))
- **verificationCode:** 重构验证码组件 ([68e823c](https://github.com/anyup/uView-Pro/commit/68e823ccaf5c01259a8854353ad4165eb35b3a5f))
- **components:** 重构 u-section 组件 ([3d81859](https://github.com/anyup/uView-Pro/commit/3d81859239e63aea2f161c0123774e37d91b0b3a))
- **u-search:** 重构搜索组件 ([e404a74](https://github.com/anyup/uView-Pro/commit/e404a74416806d927758c752ec61057aa01fb01a))
- **u-slider:** 重构滑块组件，支持 Composition API ([2eb5a85](https://github.com/anyup/uView-Pro/commit/2eb5a85f54216ce9d136a7950236d0726ca1a419))
- **slider:** 优化 slider 组件的代码结构和功能 ([323e419](https://github.com/anyup/uView-Pro/commit/323e4199e78f25519a6bc177f72955689fe5411a))
- **components:** 优化组件中的 slot 判断逻辑 ([3325cbf](https://github.com/anyup/uView-Pro/commit/3325cbf1166904d846dede55c604de7b832f1b17))
- **components:** 重构 u-steps 组件 ([4e46526](https://github.com/anyup/uView-Pro/commit/4e46526b0b1806f12ddf8f9dc4829dc0bc5be554))
- **sticky:** 重构 u-sticky 组件 ([ae2ff1b](https://github.com/anyup/uView-Pro/commit/ae2ff1b130a4888bdb7ca9048c11c1534ec7718f))
- **components:** 重构 u-top-tips 组件 ([970250f](https://github.com/anyup/uView-Pro/commit/970250f66e87ba709e42008380bc285a175e2491))
- **skeleton:** 重构骨架屏组件 ([8e50b08](https://github.com/anyup/uView-Pro/commit/8e50b083cac2f10f3e299fc7368541121d629d82))
- **u-toast:** 删除冗余的 defineExpose 代码 ([9495c47](https://github.com/anyup/uView-Pro/commit/9495c47c2b9ccf679eb31db24d3df1458fa04acb))
- **components:** 重构 u-checkbox-group 组件 ([577c68f](https://github.com/anyup/uView-Pro/commit/577c68fc4bed5eb6cec649858c2decce7920864d))
- **avatar-cropper:** 重构头像裁剪组件并添加 TypeScript 支持 ([4f320bb](https://github.com/anyup/uView-Pro/commit/4f320bbfb0adbb41da4daca2c0f3ef45ec519b0c))
- 启用头像裁剪功能 ([10b7cea](https://github.com/anyup/uView-Pro/commit/10b7cea104b67e2e81ac113110eabbace4241a6f))
- **radio:** 重构单选框组件 ([526c62f](https://github.com/anyup/uView-Pro/commit/526c62f5c41d1a24dc15d7de986b57bf725d86c7))
- 更新项目依赖库名称 ([854cef1](https://github.com/anyup/uView-Pro/commit/854cef1f02e2b8be6ac2758d7cda76e37f503a18))
- 移除未使用的 Vue 导入 ([3831f58](https://github.com/anyup/uView-Pro/commit/3831f58f12b624d29cf1a985a1861de848989288))
- **timeFrom:** 删除未使用的时间格式化函数 ([f72f84a](https://github.com/anyup/uView-Pro/commit/f72f84a3a1135086789ad964921b8a2319158125))
- **table:** 重构表格组件并添加 TypeScript 支持 ([efcf0cc](https://github.com/anyup/uView-Pro/commit/efcf0ccc33439168918d9e7f89a45a7123bb2f4f))
- **componentsB:** 优化 table 组件中的代码 ([813f4cc](https://github.com/anyup/uView-Pro/commit/813f4cc0dfc38de7496ffe4eaf017669f9918fed))
- **components:** 重构 u-dropdown 组件 ([121d36c](https://github.com/anyup/uView-Pro/commit/121d36ce27fc1846942c7219b3e0d83cf3246774))
- **uview-next:** 重构 u-grid 和 u-grid-item 组件 ([ab497b5](https://github.com/anyup/uView-Pro/commit/ab497b5b9d67fda886e38bace640117ea523310d))
- **src:** 优化代码结构和功能 ([d05634d](https://github.com/anyup/uView-Pro/commit/d05634d3730704d5f6f30b5a2ed7ba2cee879f78))
- **components:** 重构 tabs 组件 ([7d18f15](https://github.com/anyup/uView-Pro/commit/7d18f1535e549eeb5b5baf7faa278067c4d882f5))
- **u-swiper:** 重构轮播图组件 ([2c6677e](https://github.com/anyup/uView-Pro/commit/2c6677eeb67de65a5a9efa788bacb3089ca883d6))
- **order:** 优化订单列表数据处理 ([e22ba25](https://github.com/anyup/uView-Pro/commit/e22ba253ff0709bd97851833defa84fa09541929))
- **u-tabs-swiper:** 重构 tabs-swiper 组件 ([0bd1e07](https://github.com/anyup/uView-Pro/commit/0bd1e07dccd661ed91d65644f60b0ad4bf9c2d45))
- **components:** 重构 swipeAction 组件 ([7bab063](https://github.com/anyup/uView-Pro/commit/7bab0630311e5967f13e5a7f4615ffecddd1154e))
- **src:** 修改 index.list.js 文件的模块导出方式 ([1eb1e34](https://github.com/anyup/uView-Pro/commit/1eb1e347579908de00fd1e78c6c621bd6443c0c0))
- **u-keyboard:** 优化键盘组件代码结构 ([57fef9d](https://github.com/anyup/uView-Pro/commit/57fef9d1cdc8df1c7ea84dedeb861459aa634f72))
- **citySelect:** 优化城市选择器组件 ([893cd23](https://github.com/anyup/uView-Pro/commit/893cd2330dc07725759d3236f62b18baf2cb00ba))
- **components:** 移除未使用的 defineOptions 导入 ([9ffe702](https://github.com/anyup/uView-Pro/commit/9ffe7024561a79051444f5517d21f449ed745275))
- **components:** 更新 image 组件的示例图片 ([80e1eb9](https://github.com/anyup/uView-Pro/commit/80e1eb9136e1576f1a9b9bcc3136b053390d5e6d))
- **uview:** 调整 getRect 函数中 getCurrentInstance 的调用时机 ([a862ca2](https://github.com/anyup/uView-Pro/commit/a862ca2dc307e39c98e992c340403d9c7ebb1acd))
- **hooks:** 重命名 useParent 为 useEmitter ([2d7dac3](https://github.com/anyup/uView-Pro/commit/2d7dac31d65d25c294184a0213290c3f7bf89081))
- **uview-next:** 重构获取父组件方法 ([62fb181](https://github.com/anyup/uView-Pro/commit/62fb18103e117a7bf4e54451a884ff374c741a9b))
- **uview:** 优化 $parent 函数 ([8b5c307](https://github.com/anyup/uView-Pro/commit/8b5c3074fd0fa108cea67d2a2a1ce759d94dd5bd))
- **uview:** 重构索引列表组件 ([4cba486](https://github.com/anyup/uView-Pro/commit/4cba48679d46160e0d5014eb8739ff542a29717d))
- 删除未使用的库 ([ba16bcf](https://github.com/anyup/uView-Pro/commit/ba16bcfb21fef5bd1129e75e0a50bd74520c6a6e))
- update uview-pro ([cd25350](https://github.com/anyup/uView-Pro/commit/cd25350f399125ad53bcbd3cb5caf62082761415))
- **components:** 优化多个组件的代码结构和样式 ([2528e32](https://github.com/anyup/uView-Pro/commit/2528e32c7becc837dd65d68fd02645ebd4daa287))
- **u-number-box:** 重构步进器组件 ([86ab625](https://github.com/anyup/uView-Pro/commit/86ab6257e33cc21178375259ece0dc3846a8f19a))
- 更新 logo 和资源链接 ([e5edd61](https://github.com/anyup/uView-Pro/commit/e5edd61cd3f696ef46350d5f7dfb119788f74b09))
- **example:** 重构组件页面布局和样式 ([a2c44e0](https://github.com/anyup/uView-Pro/commit/a2c44e0832dafd4e9bc73434a301a498f161d44b))
- **components:** 重构 getRect 方法的调用方式 ([73695d4](https://github.com/anyup/uView-Pro/commit/73695d4b1dac0f6d3f4df3a6976a322b09a9a7de))
- **components:** 优化组件内部实例获取方式 ([60f563d](https://github.com/anyup/uView-Pro/commit/60f563d73b0bc5ee49dbde44a393012d9171ca75))
- **u-tabbar:** 修改 beforeSwitch 回调的执行方式 ([2a5d3de](https://github.com/anyup/uView-Pro/commit/2a5d3de1a94278099f37d6c3ad41aae8f7d5675d))
- **i18n:** 更新多语言文案并简化导航栏标题 ([f78a437](https://github.com/anyup/uView-Pro/commit/f78a437432c5b924c9ce61d2b607d5896345a27a))
- **example:** 重构组件页面并迁移到 TypeScript ([f65df40](https://github.com/anyup/uView-Pro/commit/f65df402bd92a3f7a770408bd133b2197e1155f9))
- **u-alert-tips:** 优化类型定义和代码结构 ([22af614](https://github.com/anyup/uView-Pro/commit/22af61445411dbd52881fd03603952f8240ee7e6))
- **example:** 注释掉 AvatarCropper 组件的路由配置 ([2bb17d7](https://github.com/anyup/uView-Pro/commit/2bb17d7aaf0c8f0c3b7fc3247947a777429edb44))
- **about:** 重构关于页面 ([6d9b76d](https://github.com/anyup/uView-Pro/commit/6d9b76d44fca5934d488e9086aa4faef22ae5fc1))
- **pages:** 优化关于页面样式和布局 ([5b0d08b](https://github.com/anyup/uView-Pro/commit/5b0d08baa2d732ed038d549a40558b79221acea7))
- **componentsC:** 重构 cell 组件的模板和样式 ([ff67d6d](https://github.com/anyup/uView-Pro/commit/ff67d6df94ebbaec2d1a1e1b3c0052c2d96fca46))
- **components:** 优化组件示例和替换图片链接 ([42cbd53](https://github.com/anyup/uView-Pro/commit/42cbd532d6f34d353b15b717f7a3c4ad04579c36))
- **src:** 更新 uview-pro 插件引用 ([f4bcc4d](https://github.com/anyup/uView-Pro/commit/f4bcc4dd976784ce885eddf56795808428f9c16e))
- 更新文档链接和网址 ([0b358c8](https://github.com/anyup/uView-Pro/commit/0b358c8d9655b21eff06982befb2af2e6c244cfd))

### 📦‍ Build System | 打包构建

- **deps:** 升级 Vue 依赖版本 ([955bb69](https://github.com/anyup/uView-Pro/commit/955bb69f8539f3b196088c93a4e31f16cf1b659c))
- 更新项目配置和版本信息 ([faecbb8](https://github.com/anyup/uView-Pro/commit/faecbb89fdc1d0e6ed8d13b82e508c3506d97cf4))
- 更新项目配置和版本信息 ([939e370](https://github.com/anyup/uView-Pro/commit/939e370d7c3549c7bd1817bd0a4abe5a617f9854))
- **manifest:** 优化 H5 端性能并更新标题 ([1c05616](https://github.com/anyup/uView-Pro/commit/1c0561625a6b1ab6e52f733dc469660c5c0d48e7))
- **.gitignore:** 更新 .gitignore 文件 ([877dbc6](https://github.com/anyup/uView-Pro/commit/877dbc6818d6c9435c3c0367ed07969cdb12e5eb))
- 更新 manifest 文件 ([29a739b](https://github.com/anyup/uView-Pro/commit/29a739be2bb94eff6eca9aeb080eec1497909ad3))
- **uview-pro:** 添加 npm 配置文件 ([b17b0de](https://github.com/anyup/uView-Pro/commit/b17b0de7fde38f9f192e7304c4ceab0cfa8743c1))
- **uview-pro:** 更新项目配置和依赖 ([9e47ac9](https://github.com/anyup/uView-Pro/commit/9e47ac9f145f146dbdc77ebe9e3dfe3c54314638))

### ✨ Features | 新功能

- add utils ([cdbd7a5](https://github.com/anyup/uView-Pro/commit/cdbd7a567174a6e48324d4975cd548210668b6b4))
- **navbar:** 添加自定义返回事件功能 ([651221e](https://github.com/anyup/uView-Pro/commit/651221e41d83075396f15193a18fe7b142752c5e))
- **utils:** 添加 parent 函数并实现 useParent 钩子 ([08b52e9](https://github.com/anyup/uView-Pro/commit/08b52e9df5260b378af596ab770c76f76badd4b8))
- **i18n:** 实现国际化切换功能 ([d759245](https://github.com/anyup/uView-Pro/commit/d75924501e77e4f3b596f30e3d9a17763868cbac))
- 移除 request/index.ts 中的冗余 interface 定义，简化代码结构 ([0f4b3cb](https://github.com/anyup/uView-Pro/commit/0f4b3cb67e316aa1b2c6b3b7e5371e1c91c47e0b))
- 更新页面样式和国际化逻辑 ([696c705](https://github.com/anyup/uView-Pro/commit/696c70571fdb76ca918563b137bfb43cb2a1b291))
- **common:** 添加分类数据和 HTTP 相关文件 ([d9d7b06](https://github.com/anyup/uView-Pro/commit/d9d7b06cbcfe8ed6cebc234a445b2f823efafe5a))
- **store:** 添加 Pinia store 工具方法 ([faa56c8](https://github.com/anyup/uView-Pro/commit/faa56c8e8a4f2281fba13ed1961b517140df6994))
- **hooks:** 新增 useEmitter 钩子用于组件间通信 ([40229ff](https://github.com/anyup/uView-Pro/commit/40229ff25dbac04f0b012f07896b74a2759439fc))
- **noNetwork:** 添加无网络提示图片 ([6ef777f](https://github.com/anyup/uView-Pro/commit/6ef777f945e37294e2d98e3b4dd9ddecc204ede5))
- **uview:** 新增 parentData 方法并重构相关功能 ([996f73a](https://github.com/anyup/uView-Pro/commit/996f73ae86977a7815ad9137522ddd3d2556f3ed))
- swiper示例 ([582a9c7](https://github.com/anyup/uView-Pro/commit/582a9c7265d70ebd42d5b948f8b2470f8f8730b2))
- 更新小程序配置并调整页面结构 ([40b562a](https://github.com/anyup/uView-Pro/commit/40b562ab5bc5e8e80bcb9d03e88b9ad59b635e2b))
- **manifest:** 添加应用图标并更新应用 ID ([941733a](https://github.com/anyup/uView-Pro/commit/941733ad5eddc6740c2935e7f3be1a8ebea07fea))
- **example:** 添加关于页面并更新图标 ([f10479f](https://github.com/anyup/uView-Pro/commit/f10479f5fc016cc3046097d17f98c4348f9ff398))
- **pages:** 添加关于页面 ([0bf8afd](https://github.com/anyup/uView-Pro/commit/0bf8afd1a826942c95b2592998a7842d0c360d6a))

### 💄 Styles | 风格

- **.prettierrc.js:** 调整代码格式化配置 ([fa4a40e](https://github.com/anyup/uView-Pro/commit/fa4a40ef3b3bb88818fe5796482f05a66595101b))
- **components:** 更新组件样式穿透写法 - 将 /deep/ 样式穿透写法替换为 ::v-deep ([a63c896](https://github.com/anyup/uView-Pro/commit/a63c896868fb14ef71dd4f9e268b7fd3496a16b9))
- **components:** 优化代码格式和引用 ([9099838](https://github.com/anyup/uView-Pro/commit/909983831a75a809f16814b3fee866a499608a6b))
- **components:** 优化多语言切换显示和组件样式 ([16e5e3f](https://github.com/anyup/uView-Pro/commit/16e5e3fc455736246394dddd3b8a74c211937f08))

### 🐛 Bug Fixes | Bug 修复

- **i18n:** 优化国际化配置和语言切换逻辑 ([0ab3efa](https://github.com/anyup/uView-Pro/commit/0ab3efa72b471ac67470f034edaadfccf4c1981f))
- **u-picker:** 优化地区选择器数据结构和渲染逻辑 ([b580381](https://github.com/anyup/uView-Pro/commit/b580381e0c40f974b4e2afd1d1fdb06343fdadf2))
- **u-read-more:** 优化 getRect 方法调用 ([2c8dd25](https://github.com/anyup/uView-Pro/commit/2c8dd2515a477ce9cd744e08daf09c6cd0b60215))
- **u-circle-progress:** 修复支付宝小程序不支持 canvas-id 的问题 ([0990ae3](https://github.com/anyup/uView-Pro/commit/0990ae3751d3864fadb3335dcd567044d6bf5d12))
- **componentsA:** 优化键盘组件演示页面 ([8fc7592](https://github.com/anyup/uView-Pro/commit/8fc7592d91795633274743444c08b7061ad3bfda))
- **u-button:** 优化$u库的导入方式 ([2db0a0d](https://github.com/anyup/uView-Pro/commit/2db0a0d59d7c0f81dd95c4a2d9ef7f4942c10ee4))

### 📝 Documentation | 文档

- **README:** 添加 pnpm 依赖管理说明 ([89f987f](https://github.com/anyup/uView-Pro/commit/89f987fddeef031bc969eb854a39aa57f4d39431))
- **README:** 更新 uView Pro 项目文档 ([17e3958](https://github.com/anyup/uView-Pro/commit/17e3958dcd50e58c743b7a2bfcaf876cb6498058))
- **README:** 更新 uView Pro 项目文档 ([781b53e](https://github.com/anyup/uView-Pro/commit/781b53e1db9cc2e9b683a1f3526c720c845975ed))
- **README:** update readme ([2bf9fcc](https://github.com/anyup/uView-Pro/commit/2bf9fcc366a5990a42300e7dd605e1adbc49aed0))
- **uview-pro:** 添加项目说明和快速上手指南 ([d9c23c6](https://github.com/anyup/uView-Pro/commit/d9c23c6732d0ecde85a111fb486158fc80d5dfbe))
- **README:** 更新快速上手指南以适配 uView Pro 和 Vue 3 ([d361392](https://github.com/anyup/uView-Pro/commit/d361392c078227cc669b60f83d05280b47935f2f))
- **uview-pro:** 更新文档和元数据 ([ac09984](https://github.com/anyup/uView-Pro/commit/ac09984c6019ced104433ade41ac205a76127e00))

### 🚀 Chore | 构建/工程依赖/工具

- remove yarn.lock file ([83c2a35](https://github.com/anyup/uView-Pro/commit/83c2a358305c1c76f4d35b7f65c33ed8267211ea))
- **package:** 添加 App 平台开发和构建脚本 ([42220ed](https://github.com/anyup/uView-Pro/commit/42220edc95a9b6686cddf235e094a398bd2d1f78))

### ⚡ Performance Improvements | 性能优化

- **$parent:** 优化 $parent 函数以提升性能 ([b3b8d4a](https://github.com/anyup/uView-Pro/commit/b3b8d4a91372eac1399294e83e0569719cbc1012))
- **u-sticky:** 优化内容观测者初始化 ([17111a0](https://github.com/anyup/uView-Pro/commit/17111a05622dc6738c7526e52cfaa20729444e7d))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>
