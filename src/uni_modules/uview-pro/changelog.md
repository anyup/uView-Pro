## 0.2.4（2025-10-08）

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

## 0.2.3（2025-10-06）

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

## 0.2.2（2025-09-30）

### 🚀 Chore | 构建/工程依赖/工具

- 删除未使用的公共 API 和国际化文件 ([e73d3da](https://github.com/anyup/uView-Pro/commit/e73d3da7ede71584ec8b58a386307747b62f5e7a))

### ♻️ Code Refactoring | 代码重构

- **components:** 提示组件抽离为全局组件 wx-tips ([3fc0111](https://github.com/anyup/uView-Pro/commit/3fc0111f296de37bdb9b56fdfc023537aa6d79c4))
- **u-collapse:** 优化手风琴模式和样式配置 ([5cff422](https://github.com/anyup/uView-Pro/commit/5cff422a8462403f3c3f23a66f9306a81499a3b0))

### ✨ Features | 新功能

- **components:** 新增 u-root-portal 根节点传送组件 ([891d021](https://github.com/anyup/uView-Pro/commit/891d021faf76ad0248ef21248d89ff1fe1c5b669))
- **manifest:** 添加支付宝小程序配置 ([cb0b42a](https://github.com/anyup/uView-Pro/commit/cb0b42a9397df1c335d2c5492136efa38dde2ca0))

### 📝 Documentation | 文档

- 添加支付宝小程序二维码并更新微信群聊图片 ([1dc0db3](https://github.com/anyup/uView-Pro/commit/1dc0db340e34675f15a7e83c79c3ac5d453853a2))

## 0.2.1（2025-09-29）

### 🚀 Chore | 构建/工程依赖/工具

- 优化代码格式化和 ESLint 配置 ([771eacd](https://github.com/anyup/uView-Pro/commit/771eacd58d410e468a8aec4225bbe7b402480b2f))

### ⚡ Performance Improvements | 性能优化

- 压缩部分js工具库 ([6615b70](https://github.com/anyup/uView-Pro/commit/6615b7085a51c4fbc9f884ec68e05db1a1e89e27))

### ✨ Features | 新功能

- **u-calendar:** 日历组件增加农历显示功能 ([e2368ac](https://github.com/anyup/uView-Pro/commit/e2368ac88b0abb4493ab12a1785eb2a0e38e502c))

### ♻️ Code Refactoring | 代码重构

- **calendar:** 重构日历组件类型定义 ([0040e9e](https://github.com/anyup/uView-Pro/commit/0040e9e1095446536370e9aca3c135bc05527acb))

### 🐛 Bug Fixes | Bug 修复

- **u-input:** 修复输入框禁用状态时清空按钮仍显示的问题 ([722715f](https://github.com/anyup/uView-Pro/commit/722715f7d6607584c0e158ba2de2342147e3be17))

## 0.2.0（2025-09-28）

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

## 0.1.1（2025-09-22）

### ♻️ Code Refactoring | 代码重构

- **theme:** 重构主题颜色定义和导出 ([a58a477](https://github.com/anyup/uView-Pro/commit/a58a477c8af42e466ed544d7737d84de80f3dc27))

### ✨ Features | 新功能

- **i18n:** 优化国际化配置并添加安全措施 ([952dd88](https://github.com/anyup/uView-Pro/commit/952dd887dcadeebccb98a25ec066181904ab727e))

### 📝 Documentation | 文档

- 简化提交 issue 模板结构 ([c818685](https://github.com/anyup/uView-Pro/commit/c818685383ae400b10d6662e7f4b9ba6be5b31f6))

### 🐛 Bug Fixes | Bug 修复

- **u-input:** 解决u-input组件在微信小程序端，开启clearable属性后，focus会自动清空输入问题 ([283551c](https://github.com/anyup/uView-Pro/commit/283551c54cd7006899a66b97afe7137b4bbb14b1))

## 0.1.0（2025-09-21）

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

## 0.0.23（2025-09-15）

### 🐛 Bug Fixes | Bug 修复

- **u-collapse:** fix accordion mode ([c411fef](https://github.com/anyup/uView-Pro/commit/c411fef340cff07ab06a64f623741e9c1ad125cb))

### 🚀 Chore | 构建/工程依赖/工具

- revert comments ([3eed330](https://github.com/anyup/uView-Pro/commit/3eed330c27a7026eb87cb9ef285d1ecbe6789552))
- **docs:** 增加贡献者 ([8b9d44e](https://github.com/anyup/uView-Pro/commit/8b9d44e281c02f639079b77b7c32cc0a566b35a1))
- **docs:** add contributors ([b4035da](https://github.com/anyup/uView-Pro/commit/b4035da5a39acc5ae9dcb13b06143cda6a73fec3))

### 📝 Documentation | 文档

- 更新交流群二维码图片 ([00c0581](https://github.com/anyup/uView-Pro/commit/00c058159ea9d169219474728e8b31cdc892ab2c))

## 0.0.22（2025-09-11）

### 🚀 Chore | 构建/工程依赖/工具

- 忽略 pnpm-lock.yaml 文件 ([28802d3](https://github.com/anyup/uView-Pro/commit/28802d308d3c1f2d0d6b583b3b27725b6b40b1a9))

### 🐛 Bug Fixes | Bug 修复

- **td/th:** fix invalid width setting ([21718fc](https://github.com/anyup/uView-Pro/commit/21718fc3b2f09e1ccf9f1ce8247b78f30e5fe465))
- **u-modal:** 修复在 modal 组件中添加 clearLoading 方法的暴露，以便外部可以调用 ([34b51a7](https://github.com/anyup/uView-Pro/commit/34b51a7187da296b11f4b5db027a86c41a50a477))

### ✨ Features | 新功能

- **components:** add u-status-bar and u-safe-bottom component ([2085e73](https://github.com/anyup/uView-Pro/commit/2085e73be725f921c436069c27c124e507b24d0e))
- **u-upload:** 调整上传组件默认值和功能 ([4808627](https://github.com/anyup/uView-Pro/commit/48086274f5fe16f4b3b7554a99038a76aa08e8c5))
- **pages:** 在多个页面中添加功能说明的弹窗提示 ([5e59855](https://github.com/anyup/uView-Pro/commit/5e59855ff81f21c54cbfa44a3f4641b4b9f1f6bd))

## 0.0.21（2025-09-09）

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

### ♻️ Code Refactoring | 代码重构

- **library:** 移除不需要的 globalVariable ([420c40e](https://github.com/anyup/uView-Pro/commit/420c40eac3c67e184924e166edaf4cf2ea904477))
- 更新 pages.json ([03297ce](https://github.com/anyup/uView-Pro/commit/03297ce219ae9337c1a424b9583fa53c74f0291d))

### 💄 Styles | 风格

- 格式化代码 ([a9e0a38](https://github.com/anyup/uView-Pro/commit/a9e0a387ffa55df740b828ea4a1463d97089c4bd))

### 📦‍ Build System | 打包构建

- mp-alipay 开启 component2 支持 ([430d248](https://github.com/anyup/uView-Pro/commit/430d248ef9e805365dcee0373f6a524bd7084a38))

## 0.0.20（2025-09-08）

### ♻️ Code Refactoring | 代码重构

- 优化http使用示例 ([39d0910](https://github.com/anyup/uView-Pro/commit/39d091056dc1e335625ce884aade35c8bd11ee6f))

### 📝 Documentation | 文档

- 更新微信交流群图片 ([21bbec1](https://github.com/anyup/uView-Pro/commit/21bbec14937ee52b225d1f415d90aecbe4d4950f))

### 🚀 Chore | 构建/工程依赖/工具

- update project configuration and add prettier support ([74a714d](https://github.com/anyup/uView-Pro/commit/74a714ddc30dc0c2c5a6389f254f1e2c922d905e))

### 🐛 Bug Fixes | Bug 修复

- 修复微信小程序环境下 http interceptor 的路径问题 ([6db4db8](https://github.com/anyup/uView-Pro/commit/6db4db89ef1ab22e3051a6ee944ba44430aa3474))

### 👷 Continuous Integration | CI 配置

- update husky pre-commit ([dd04f9a](https://github.com/anyup/uView-Pro/commit/dd04f9a8f2ebdbec37a148e1cf2fa3280c1ab2cd))

## 0.0.19（2025-09-04）

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

## 0.0.18（2025-09-03）

### 🚀 Chore | 构建/工程依赖/工具

- update release script for better version management ([b64f38f](https://github.com/anyup/uView-Pro/commit/b64f38fea28de39c99cdf84f7e767aa7ceac1344))

### 🐛 Bug Fixes | Bug 修复

- **u-checkbox:** 兼容头条小程序获取父组件数据不支持provide/inject的写法 ([498e12e](https://github.com/anyup/uView-Pro/commit/498e12e2f3aa52021d1be282426536b45f39ca6a))

### 👷 Continuous Integration | CI 配置

- optimize changelog generation and spacing ([3103e7b](https://github.com/anyup/uView-Pro/commit/3103e7b56a0e2dd0392efdb6a85824b11ef6800c))

## 0.0.17（2025-09-02）

### ♻️ Code Refactoring | 代码重构

- 瀑布流组件示例代码重构为 Vue3 ([93949ad](https://github.com/anyup/uView-Pro/commit/93949ad8ae2a36c6130f87340c222ab9ec69d21f))

### ✨ Features | 新功能

- 新增组件 u-loading-popup，一个可以配置的加载提示弹窗 ([6245df9](https://github.com/anyup/uView-Pro/commit/6245df951034b06225ab36d3f18cae8e7ab4b329))
- 新增 Loading 加载弹窗组件的示例页面 ([1bce868](https://github.com/anyup/uView-Pro/commit/1bce86810863012c5a73104ca0a85ebacb4aa92a))

### 🐛 Bug Fixes | Bug 修复

- 修复瀑布流组件 u-waterfll，暴露 celar/remove/modify 方法 ([240e023](https://github.com/anyup/uView-Pro/commit/240e0238af092d4c6bde86d0db9e49636b806d6f))

## 0.0.15（2025-08-30）

### ✨ Features | 新功能

- 优化 u-image 组件 slot 使用体验，兼容头条小程序 ([a6ca54f](https://github.com/anyup/uView-Pro/commit/a6ca54fce06b20b7a6938d0bef9342954b787641))

### ♻️ Bug Fixes | Bug 修复

- 优化 label 的声明错误问题 ([314c394](https://github.com/anyup/uView-Pro/commit/314c3940145c657b12f16d005af7d271f4ae74e3))
- 优化头条小程序 form 表单校验的兼容性问题 ([3912fd6](https://github.com/anyup/uView-Pro/commit/3912fd6ade3a1d612f6f5e86ddc0336376ee5618))

## 0.0.14（2025-08-28）

### 🐛 Bug Fixes | Bug 修复

- 修复使用 u-swipe-action 右边会出现一条背景线的 bug ([a5b60c6](https://github.com/anyup/uView-Pro/commit/a5b60c6485120e164c0e0c29eea3b765c10f9aac))

## 0.0.13（2025-08-27）

### 🐛 Bug Fixes | Bug 修复

- 修复 count-down 组件暴露 start 和 end 方法 ([0f42a01](https://github.com/anyup/uView-Pro/commit/0f42a01f55aa6799f57eb93dc5d029b06115b154))

## 0.0.12（2025-08-27）

### 🐛 Bug Fixes | Bug 修复

- 优化 async-validator 文件多余注释导致的问题 ([f06c80d](https://github.com/anyup/uView-Pro/commit/f06c80d57e61e7b75f1384fe89f309b8a0e379fa))

## 0.0.11（2025-08-26）

### ♻️ Code Refactoring | 代码重构

- 取消 async-validator ts 检查 ([772a729](https://github.com/anyup/uView-Pro/commit/772a729164f2cb268a886b6749e4a58846ebb3dc))
- 移除 u-tr 未使用的类型导入和属性定义 ([46ce459](https://github.com/anyup/uView-Pro/commit/46ce4590166a30a0eb048110efc046095a87f6e8))

### 🐛 Bug Fixes | Bug 修复

- 修复 u-count-down 倒计时符号显示逻辑 ([a4c9498](https://github.com/anyup/uView-Pro/commit/a4c94986b020c5ac0fdf92bde3c7b79cdfbedbe8))

## 0.0.10（2025-08-26）

### ✨ Features | 新功能

- 添加 easycom 组件自动扫描 ([b125039](https://github.com/anyup/uView-Pro/commit/b1250390a4f594f5deaa133d7a92bd6e72707890))
- 增强 u-select 组件的类型安全和功能 ([38635e9](https://github.com/anyup/uView-Pro/commit/38635e963f9eff6e4c730692e8c97f10b3a092c5))

## 0.0.9（2025-08-25）

### ♻️ Code Refactoring | 代码重构

- 优化全局工具导出方式 ([7a80b6f](https://github.com/anyup/uView-Pro/commit/7a80b6f99ad3022ca995f99f8ec6803af7941eb9))

## 0.0.8（2025-08-25）

### ♻️ Code Refactoring | 代码重构

- 重构组件 Props 属性定义，每个组件具有完善的 ts 类型定义 ([8cc0de7](https://github.com/anyup/uView-Pro/commit/8cc0de7c1527b48dd223d89207135eea01766294))
- 重构类型定义并统一到全局类型文件 global types ([b0fd010](https://github.com/anyup/uView-Pro/commit/b0fd0107289eb1c6df2f58d91b63d9b25902caee))

## 0.0.7（2025-08-21）

### 🐛 Bug Fixes | Bug 修复

- 修复中 tabbar 布局高度计算错误的问题 ([5c1342c](https://github.com/anyup/uView-Pro/commit/5c1342cb3fb6dd2c7c84fe785953fcaed13e809f))

### 📦‍ Build System | 打包构建

- 更新项目依赖并优化打包构建 ([c172d36](https://github.com/anyup/uView-Pro/commit/c172d368d82404564650756a872cd7c7e29ebfa2))

## 0.0.5（2025-08-19）

### ✨ Features | 新功能

- 新增 u-city-select 城市选择器组件 ([0eb4806](https://github.com/anyup/uView-Pro/commit/0eb4806db3be39e1a6c6f33c9ea511d8445da884))
- 完善 u-button 的 open-type 支持类型 ([37c0db5](https://github.com/anyup/uView-Pro/commit/37c0db527258bca57dbd55d7013b633230489853))

### 🐛 Bug Fixes | Bug 修复

- u-upload 暴露 lists 属性 ([09f8424](https://github.com/anyup/uView-Pro/commit/09f8424774baaee3b6fc7a42458949f8d5903951))
- u-upload 深度监听文件列表变化并优化事件触发 ([a41a571](https://github.com/anyup/uView-Pro/commit/a41a5719ddf9d6793b78c55a13025bbdc88fdfe3))

### 🚀 Demos | 示例页面优化

- 优化关于页面布局和内容 ([ad5f6a4](https://github.com/anyup/uView-Pro/commit/ad5f6a47847999268b43b8c5dbf1a34cb8f70802))
- 删除分类数据文件 ([5ed7a11](https://github.com/anyup/uView-Pro/commit/5ed7a1113db58ff493ad606296a210358348affe))
- 重构 index list 页面 ([13d780e](https://github.com/anyup/uView-Pro/commit/13d780ea5acc4c8eed72062482735df826d4b37a))
- 更新商场菜单组件引用 ([a5f1bf3](https://github.com/anyup/uView-Pro/commit/a5f1bf3f256705d6cad028d60701b4b0544332de))
- 修改图片地址 ([c459893](https://github.com/anyup/uView-Pro/commit/c459893848936aa9a44e7bda3277ab1428109869))
- 重构 upload 上传组件示例页面 ([686831d](https://github.com/anyup/uView-Pro/commit/686831de357aca67bbf7015e2f0696cf6bf48164))
- 优化多个组件的代码结构和样式 ([f2af44c](https://github.com/anyup/uView-Pro/commit/f2af44ca1710334495e4c4fad99d04027b3788f8))
- 添加提交规范相关配置文件 git-cz/husky/changelog ([d93b816](https://github.com/anyup/uView-Pro/commit/d93b816a5a3e468c4bc45e3161d7c006cba5fbf6))
- 优化 deepClone 和 deepMerge 页面的结果展示 ([b0daa70](https://github.com/anyup/uView-Pro/commit/b0daa700b6a385e037d38dc1f10b3612596e2403))
- 新增优惠券模板 ([1b77762](https://github.com/anyup/uView-Pro/commit/1b777621615f7ebe9d83606d53650987c8b2c4e0))
- 更新 easycom 配置说明，一定要放在 custom 里，否则不生效 ([fc14bf9](https://github.com/anyup/uView-Pro/commit/fc14bf90cb77088d258e20e79e3d25820f37e97e))
- 添加模板示例页面 ([3336af4](https://github.com/anyup/uView-Pro/commit/3336af406161648d18578c988d9b3ad79b86059a))
- 新增模版相关页面 ([8925a02](https://github.com/anyup/uView-Pro/commit/8925a02f9fa88f4742d984f2ff02909afc6ad0d7))
- 重构 request 类，优化泛型支持 ([d7b2e6a](https://github.com/anyup/uView-Pro/commit/d7b2e6a224d96f717e5bdbaf09edb19b712ced47))

## 0.0.4（2025-08-14）

### 新增

- `u-icon` 组件新增 `space` 属性，表示`label` 在四周时与图标的距离，权重高于 `margin`，单位 rpx
- 新增`$u`工具库各类方法，同步文档
- 组件全部 setup 化，全面支持 TypeScript 和 Vue3
- 工具库示例页面全部 setup 化

### 优化

- 组件样式兼容多端
- 代码注释与类型完善
- 优化演示代码兼容性

### 修复

- 修复类型声明、变量冲突、lint 报错等问题

## 0.0.3（2025-08-06）

- 添加插件使用示例工程

## 0.0.2（2025-08-04）

- 解决一些 npm 包依赖问题

## 0.0.1（2025-08-04）

- 70+精选组件，使用 Vue3+TS 全面重构，功能丰富，多端兼容，让您快速集成，开箱即用
- 兼容安卓，iOS，微信小程序，H5 等
- 详尽的文档支持，现代化的演示效果
- 按需引入，精简打包体积

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
