## 0.5.18（2026-04-22）

### 🐛 Bug Fixes | Bug 修复

- **u-calendar:** 修复农历数据响应式访问问题 ([0a88b13](https://github.com/anyup/uView-Pro/commit/0a88b13911fc8c47229f5d9cab0fdfc8ade09ecb))
- **mp-weixin:** 修复微信小程序演示示例vue-i18n多语言切换后uni.getLocale()始终获取中文的问题 ([30b811f](https://github.com/anyup/uView-Pro/commit/30b811f85db29165cd150bea380dfe44f94fda79))
- **demo:** 取消底部导航标题配置设置国际化文案 ([7b949ab](https://github.com/anyup/uView-Pro/commit/7b949ab8695fbc3d9db51b96da1b25a1f05c2ed3))
- **demo:** 修复日历组件demo切换逻辑 ([9aa706a](https://github.com/anyup/uView-Pro/commit/9aa706a0e7b564c2bef75d1d6e7a90023dfc1c17))

### ✨ Features | 新功能

- **u-tabbar:** 底部导航栏支持自定义item宽度配置，优化item平分功能 ([997846f](https://github.com/anyup/uView-Pro/commit/997846fb5f8ba4648e4d0514f0846ce80a217490))

### 📝 Documentation | 文档

- update uview pro desc ([ba65d2e](https://github.com/anyup/uView-Pro/commit/ba65d2e34a1e620b595122a81df48a333c97bbcd))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.17（2026-04-15）

### 🐛 Bug Fixes | Bug 修复

- **demo:** 修复topTips组件演示示例在小程序中不弹出的问题，需设置自定义navbar高度 ([0c72d24](https://github.com/anyup/uView-Pro/commit/0c72d24cd77f4ba6b6cb411810fcf5f0bd1d3272))
- **u-table:** 修复表格表头暗黑模式背景色问题 ([c7fd1a5](https://github.com/anyup/uView-Pro/commit/c7fd1a58e87c4efb84ccf737fe9d1e755908ba8f))
- **u-alert-tips:** 修复关闭按钮颜色样式问题 ([94001cf](https://github.com/anyup/uView-Pro/commit/94001cf79a03ea75695e414a7971e7ec39f445b6))

### ✨ Features | 新功能

- **theme:** 更新主题配置和本地化文本 ([4caa2ed](https://github.com/anyup/uView-Pro/commit/4caa2edf9542f7f2b0a7bb9870585390f0241e80))
- **u-calendar:** 增强日历组件功能，支持多种日历模式：打卡签到、节假日标记、价格日历等场景，支持自定义插槽功能，动态价格显示；支持选中日期，只读模式设置；修复范围选择背景色样式问题 ([7a9250e](https://github.com/anyup/uView-Pro/commit/7a9250eb49f6694286bb0c3dad7bc9780ae95864))
- **u-popup:** 新增inline模式支持，允许弹窗组件直接插入页面内容而非传统弹窗形式 ([2e8890c](https://github.com/anyup/uView-Pro/commit/2e8890ca3c9cacb90739b33cb0e38db7e2bdb473))
- **u-calendar:** 统一日期格式YYYY-MM-DD，确保跨组件日期处理的一致性 ([092cc53](https://github.com/anyup/uView-Pro/commit/092cc5392b64990342c43fcbac9aec1bfa2bf982))

### ♻️ Code Refactoring | 代码重构

- **u-calendar:** 重构日历组件模板，统一页面和弹窗模式的日历组件结构 ([42894b8](https://github.com/anyup/uView-Pro/commit/42894b850f903e2471ca42e02f0379443139838b))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.16（2026-03-26）

### ✨ Features | 新功能

- **web:** 浏览器平台添加触摸模拟器支持 ([cf96a73](https://github.com/anyup/uView-Pro/commit/cf96a73e09512291143954401aa7850ac59f1207))
- **u-button:** 新增 large、small 按钮尺寸选项，丰富按钮尺寸规格 ([053d7e8](https://github.com/anyup/uView-Pro/commit/053d7e8ab92af403cdfde36369f38a2aded27288))
- **u-input:** u-input添加size属性，支持small/default/large预设值以及自定义尺寸（#137） ([afed961](https://github.com/anyup/uView-Pro/commit/afed961f65c86bd84a2b02828bb361480c7f95b3))
- **u-textarea:** u-textarea组件新增size属性，支持small/default/large预设值以及自定义数值（#137） ([47296e8](https://github.com/anyup/uView-Pro/commit/47296e8669d419d41959dff01de758a610122d34))
- **u-checkbox:** u-checkbox，u-checkbox-group支持small/default/large预设尺寸配置，优化组件样式（#137） ([e8918e2](https://github.com/anyup/uView-Pro/commit/e8918e28a413d861e05a213d49f9a1b39af17964))
- **u-radio:** u-radio，u-radio-group支持small/default/large预设尺寸配置（#137） ([51af7f8](https://github.com/anyup/uView-Pro/commit/51af7f8f86eed99ee159738e43d5dc2d5c6747c8))
- **u-switch:** u-switch支持small/default/large预设尺寸配置（#137） ([6041d52](https://github.com/anyup/uView-Pro/commit/6041d52338172d40957e3ed7af1dde01aa7de074))
- **u-form:** 新增表单大小配置功能，u-form支持小、中、大三种尺寸设置（#137） ([324adb9](https://github.com/anyup/uView-Pro/commit/324adb99de9dfbb72a0a0c40748c11323d3b9470))
- **u-tag:** 为深色模式标签添加边框样式，保持统一性 ([84d0ad6](https://github.com/anyup/uView-Pro/commit/84d0ad6c805d570e216beaa2dc586687a5aae848))

### ♻️ Code Refactoring | 代码重构

- 添加调试模式配置并重构日志系统 ([a52a3f7](https://github.com/anyup/uView-Pro/commit/a52a3f7d6be7d8332a67c1d8458f4e65e0a0204e))
- **props:** 移除baseProps公共属性并内联到各组件，修复uni_modules引入方式在微信小程序正式打包运行报错的问题 ([f30f779](https://github.com/anyup/uView-Pro/commit/f30f7792a48679afc3cf705a5eb0b182591fe9b5))
- **form:** 调整表单大小配置位置 ([45ffecd](https://github.com/anyup/uView-Pro/commit/45ffecd3522df85cdaaa62ecb9c33d7839443586))

### 🐛 Bug Fixes | Bug 修复

- **useChildren:** 修复组件关系工具子组件ID缓存问题，避免同组件多次调用useChildren时重复注册 ([3a8c659](https://github.com/anyup/uView-Pro/commit/3a8c659ce596b483559cf4b061d0b54d784a902b))
- **u-form:** 修复移除字段时方法不存在的错误 ([58ada99](https://github.com/anyup/uView-Pro/commit/58ada99a8cbd44874eebfd305a4aeb721add8558))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.15（2026-03-25）

### 🐛 Bug Fixes | Bug 修复

- **u-form:** 修复表单项底部边框默认值逻辑 ([d939fbd](https://github.com/anyup/uView-Pro/commit/d939fbd5df85c266f8a8f5e23ebeca251eee94ec))
- **u-input:** 修复u-input输入框在某些微信小程序平台下，重新获取焦点时会清空输入框的问题 ([cedecfa](https://github.com/anyup/uView-Pro/commit/cedecfa4bf2142046bb512b1d9e87f6c9d77516d))
- **demo:** 优化微信小程序首页u-sticky使用配置 ([cc4e9ac](https://github.com/anyup/uView-Pro/commit/cc4e9ac9f022e7713b2eb2746038a8481729c0b4))

### ✨ Features | 新功能

- **types:** 添加昵称输入类型支持 ([bd15170](https://github.com/anyup/uView-Pro/commit/bd15170d0ccc76098debb9e37b4acfbe43fef043))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/xaunseus"><img src="https://github.com/xaunseus.png?size=40" width="40" height="40" alt="xaunseus" title="xaunseus"/></a> 

## 0.5.14（2026-03-23）

### 🐛 Bug Fixes | Bug 修复

- **u-toast:** 调整提示框位置和边框样式 ([093e31a](https://github.com/anyup/uView-Pro/commit/093e31a34a26902ced26ac841ddfa738fa796528))
- **u-form:** 修复表单项错误消息样式显示问题 ([462eb6e](https://github.com/anyup/uView-Pro/commit/462eb6e9e3b4d676ac97877327d93705f53400a5))

### 📝 Documentation | 文档

- **readme:** 添加快速启动模板链接 ([afce866](https://github.com/anyup/uView-Pro/commit/afce866f0e7e20b97132bebcbaf56f9aafc25c5c))

### ✨ Features | 新功能

- **u-form-item:** 增加前后图标前缀自定义配置和插槽支持 ([9f32cf7](https://github.com/anyup/uView-Pro/commit/9f32cf7f32e0697ab6771711bc96bc2d8395c597))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.13（2026-03-17）

### ✨ Features | 新功能

- **u-tabs:** tabs标签组件添加徽标圆点配置功能 ([4c9fe9b](https://github.com/anyup/uView-Pro/commit/4c9fe9b36ee9f04721f53e177bea08407c5e6d11))
- **u-input:** 优化输入框清除图标显示控制逻辑（#141） ([e08bc10](https://github.com/anyup/uView-Pro/commit/e08bc10ffe81945b09f1afc50e273588b346c9d8))
- **u-textarea:** 优化textarea清空按钮显示逻辑（#141） ([feab6cf](https://github.com/anyup/uView-Pro/commit/feab6cf55c17e655b7a89b9f748ef814b5ff8472))
- **demo:** 优化微信小程序声明显示条件 ([72a5cd2](https://github.com/anyup/uView-Pro/commit/72a5cd2503bf90e99a9b7379703e7dce284896cc))
- **toast:** 调整toast组件配置并添加回调功能 ([e9f697f](https://github.com/anyup/uView-Pro/commit/e9f697f58c6cc207bc4df3c16203565762cb860e))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.12（2026-03-09）

### 🐛 Bug Fixes | Bug 修复

- **u-tabs:** 延迟初始化tabs组件以确保正确获取尺寸信息，修复在App端滑块偏移问题（#139） ([90f79ff](https://github.com/anyup/uView-Pro/commit/90f79ff8f1e71a2ebc05be7d0318b8107425e09a))
- **u-upload:** 优化u-upload组件在暗黑模式下的显示效果 ([24955ad](https://github.com/anyup/uView-Pro/commit/24955ad947d6edc736c695f9052344a83fa191ae))
- **u-calendar:** 优化日历组件设置为range范围选择时，仅当开始、结束时间选择完成时才可点击确定（#136） ([4dee864](https://github.com/anyup/uView-Pro/commit/4dee864abda5e65a755aaaccbaffc430ca463cdd))

### ✨ Features | 新功能

- **demo:** 添加H5平台条件编译控制，优化组件描述文案 ([d482223](https://github.com/anyup/uView-Pro/commit/d4822234e1f0e13a6480732350f884d5034368b5))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.11（2026-03-02）

### 🐛 Bug Fixes | Bug 修复

- **u-table:** 修复table文字换行后导致的行高度不一致，边框线错位的问题 ([b6b9c33](https://github.com/anyup/uView-Pro/commit/b6b9c33d41ac3adc6f6a1eb33edd50a355d267bf))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.10（2026-02-28）

### 🐛 Bug Fixes | Bug 修复

- **useToast:** 修复useToast使用全局弹出时，某场景下弹出失败的问题 ([83b3d7b](https://github.com/anyup/uView-Pro/commit/83b3d7b64995a1801fdf6a33ff2ce0c99ecceaa6))
- **useModal:** 修复useModal使用全局弹出时，某场景下弹出失败的问题 ([43f98ea](https://github.com/anyup/uView-Pro/commit/43f98ea4adda12e28cd1d906c36279f808b3ea32))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.9（2026-02-26）

### 🐛 Bug Fixes | Bug 修复

- **calendar:** minDate / maxDate 纳入校验年月范围 ([249c04f](https://github.com/anyup/uView-Pro/commit/249c04f11e8610df4964f2d24d5fbe580e9236f8))

### ✨ Features | 新功能

- **calendar:** 日历选择演示页面新增最小/最大日期切换功能 ([dc8aeae](https://github.com/anyup/uView-Pro/commit/dc8aeae5072774d3d1be1318e4f7b4567c9b0385))

### 👥 Contributors

<a href="https://github.com/zakicheung"><img src="https://github.com/zakicheung.png?size=40" width="40" height="40" alt="张淇" title="张淇"/></a> <a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.8（2026-02-10）

### 🚀 Chore | 构建/工程依赖/工具

- **deps:** 更新 uni-app 相关依赖包版本到 4.87，修复更新包后运行到 h5 报错问题 ([b00751b](https://github.com/anyup/uView-Pro/commit/b00751b2643bd582f2d1b9472e245d856352d4ed))

### 📝 Documentation | 文档

- 添加npm下载量统计徽章 ([63971ee](https://github.com/anyup/uView-Pro/commit/63971eead3365d5efe29166b2252e58904c0306c))

### 🐛 Bug Fixes | Bug 修复

- **useToast:** 修复使用useToast全局提示会触发多次监听的问题（#130） ([ae56413](https://github.com/anyup/uView-Pro/commit/ae564132604d27c3d92de2f6ece5eaae75980aaa))
- **useModal:** 修复使用useModal全局弹窗会触发多次监听的问题（#130） ([50da10c](https://github.com/anyup/uView-Pro/commit/50da10c7c19d65885244df5c99634775be088824))
- **u-upload:** 修复u-upload组件中删除确认弹窗的“取消”和“确认”按钮国际化问题（#128） ([e48ab1d](https://github.com/anyup/uView-Pro/commit/e48ab1d23f50c850b1fd85c9b48860bd1d5105b0))

### ✨ Features | 新功能

- **useToast:** 支持使用useToast页面级弹出时，toast可指定页面ID（#130） ([7d09ffe](https://github.com/anyup/uView-Pro/commit/7d09ffe5f8bbee5a3872dfc716dc7ba013f7e1bc))
- **useModal:** 支持使用useModal页面级弹出时，modal可指定页面ID（#130） ([63af409](https://github.com/anyup/uView-Pro/commit/63af409370f775bac7ceabe98db8b5225491baa8))
- **u-button:** 添加按钮文本属性支持 ([72fda47](https://github.com/anyup/uView-Pro/commit/72fda47673f1b099f12dcd88ca20570d20d3d5bc))
- **router:** 添加路由跳转hooks功能 ([cb5a687](https://github.com/anyup/uView-Pro/commit/cb5a687bd7ec8c863d237f69b5cb486e86016398))
- **demo:** 添加useModal和useToast示例页面 ([f42ca51](https://github.com/anyup/uView-Pro/commit/f42ca51839b1ebd3f02106da0310f4bbbfbb96cf))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.7（2026-02-06）

### 🐛 Bug Fixes | Bug 修复

- **u-tabs:** 修复u-tabs的scroll-view在不同平台会显示滚动条的问题，统一各平台的滚动条隐藏逻辑 ([6ba904b](https://github.com/anyup/uView-Pro/commit/6ba904b85fdc5be69ab8b430878e16fa74674c64))
- **demo:** 修复演示项目在钉钉小程序调用uni.setTabBarItem报错问题（#125） ([fd4ea39](https://github.com/anyup/uView-Pro/commit/fd4ea3987928039e9dcc3a53dc8bea42fce2b685))
- **u-input,u-field:** 修复输入框绑定值为undefined和null时的显示异常问题 ([4af659f](https://github.com/anyup/uView-Pro/commit/4af659fb365179e3ed7db26a1d8571c327497f7a))

### ✨ Features | 新功能

- **demo-page:** 所有页面支持小程序分享功能 ([a055904](https://github.com/anyup/uView-Pro/commit/a05590443e898ed076d47a04cb8bfc74c2e73da8))
- **u-card:** u-card添加圆角配置功能并调整默认边框样式 ([e43c939](https://github.com/anyup/uView-Pro/commit/e43c9396a17fe485305e63895a7ea8d6edf1906b))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.6（2026-02-04）

### 🐛 Bug Fixes | Bug 修复

- **vue-tsc:** 修复部分定时器ts类型定义错误问题（#124） ([dada764](https://github.com/anyup/uView-Pro/commit/dada764eaa6ea73402e8fa6d96a783ae2a68715a))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.5（2026-02-02）

### ✨ Features | 新功能

- **u-toast:** 新增页面级toast功能并优化loading逻辑 ([4eae5b7](https://github.com/anyup/uView-Pro/commit/4eae5b7ef5d4494c4619bee383e62490994b4317))
- **useModal:** 新增useModal函数式调用API和全局modal功能（#101） ([724edf3](https://github.com/anyup/uView-Pro/commit/724edf3cd69607a6d4e33954f8d2d701f9502ff3))
- **locale:** 新增语言配置的标签字段label和区域设置字段locale ([49ba6cb](https://github.com/anyup/uView-Pro/commit/49ba6cbea6b53712496e465dd40654af7608a02d))

### ♻️ Code Refactoring | 代码重构

- **demo:** 调整demo演示中吸顶组件默认偏移量为200 ([165da80](https://github.com/anyup/uView-Pro/commit/165da80eb9eec54cf1a5fa8511d82e2b3d11fed1))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.4（2026-01-30）

### 🐛 Bug Fixes | Bug 修复

- **types:** 优化组件库类型定义和代码健壮性 ([e83eac8](https://github.com/anyup/uView-Pro/commit/e83eac8192476dea5e2d4e5b8b3c68b7da992673))
- **u-navbar:** 修复状态栏高度获取的条件判断，区分鸿蒙、微信小程序和其他 ([b13d112](https://github.com/anyup/uView-Pro/commit/b13d112be80c46f62bfa343a089f2de70a00f774))

### ✨ Features | 新功能

- **u-loading:** 增强u-loading的自定义样式功能 ([c9151ce](https://github.com/anyup/uView-Pro/commit/c9151ce4bee44c762bd7970ab280184c730e97b1))
- **u-toast:** 新增函数式调用API和全局toast功能（#101） ([b8c8fbf](https://github.com/anyup/uView-Pro/commit/b8c8fbff70c14fe0a6106794a638e450cecbeddf))
- **components:** 优化组件类型安全 ([02b638f](https://github.com/anyup/uView-Pro/commit/02b638f6e251c9b52e5e3ebb1e40d644d895308a))

### ♻️ Code Refactoring | 代码重构

- **demo:** 移除多余的toast引用 ([67b2677](https://github.com/anyup/uView-Pro/commit/67b26772eb67e9e2b830c95359688b0116395452))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.3（2026-01-26）

### ♻️ Code Refactoring | 代码重构

- **demo-page:** 移除标签栏外层sticky组件 ([ed49275](https://github.com/anyup/uView-Pro/commit/ed49275bc2962426dc4f9185b4b35f6a994cf383))

### 👷 Continuous Integration | CI 配置

- 添加 npm 包测试脚本 ([78c5524](https://github.com/anyup/uView-Pro/commit/78c5524abbbc368949ec58437361c995f5146234))

### 🐛 Bug Fixes | Bug 修复

- **locale:** 修复本地运行时locale国际化字段未加载成功的问题 ([10c017a](https://github.com/anyup/uView-Pro/commit/10c017a401232224ca1642274d65f031f74f12f0))
- **u-picker:** 修复u-picker/u-select选择器在亮色/暗黑模式下背景色显示问题 ([072a6cc](https://github.com/anyup/uView-Pro/commit/072a6cc1095b5f17b0c15c3cd2a3d6a75d8a9f08))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.2（2026-01-23）

### ✨ Features | 新功能

- **u-checkbox-group:** 重构u-checkbox多选框组件，group支持v-model双向绑定，标准化使用api ([e4a12f1](https://github.com/anyup/uView-Pro/commit/e4a12f1af6a4d8cae18823b42a918052df36b62d))
- **hooks:** 新增防抖和节流hook ([4b09373](https://github.com/anyup/uView-Pro/commit/4b09373c31dc3ab7ded01c6ea0cfdf902642b857))
- **u-search:** 新增adjust-position属性控制键盘弹出时的高度调节 ([3443e7c](https://github.com/anyup/uView-Pro/commit/3443e7cc0d754c10df03134e8bc2c6c977758610))
- **u-tabbar:** 调整u-tabbar凸起图标上边距以优化显示效果 ([d0963be](https://github.com/anyup/uView-Pro/commit/d0963be197079733779719aae43694ae5b47e6bc))
- **u-transition:** 新增transition过渡动画组件 ([28ee2c8](https://github.com/anyup/uView-Pro/commit/28ee2c8b0f74bae722f0fe50e498e3407907d2f6))
- **u-transition:** 添加动画模式切换时的时序控制 ([af4bf0a](https://github.com/anyup/uView-Pro/commit/af4bf0a690128ba16e7660d2ae54c5b93644cfdf))
- **u-text:** 优化按钮模式在block模式下的样式 ([afda81d](https://github.com/anyup/uView-Pro/commit/afda81d0c8fa7b628b81f8368e6bd2983779b7c9))
- **u-radio:** 添加label和value属性支持 ([1b824d7](https://github.com/anyup/uView-Pro/commit/1b824d7867dc7fcc3793d7b5d84cbbbcb512dab0))

### 🐛 Bug Fixes | Bug 修复

- **u-checkbox-group:** 修复全选时，u-checkbox-group多次触发change的问题 ([9f813df](https://github.com/anyup/uView-Pro/commit/9f813dfb8a2b8e178b7347223281e09b039f74b0))
- **u-gap:** 修复 gap 间隔槽传递带单位尺寸无法正确解析的问题 ([cc24efd](https://github.com/anyup/uView-Pro/commit/cc24efd658e510fb9655a189ceaee2647db81528))
- **u-alert-tips:** 修复微信小程序下组件样式和图标配置不生效的问题 ([d74900e](https://github.com/anyup/uView-Pro/commit/d74900e9e8a61a68b8971abc81e440e8449d3576))
- **u-navbar:** 修复获取状态栏高度在某些平台失败的问题 ([b8b288e](https://github.com/anyup/uView-Pro/commit/b8b288e33348b78e03be349c6c123e36511342af))
- **u-toast:** 修复toast提示组件设置prop无效的问题 ([ecd3a0a](https://github.com/anyup/uView-Pro/commit/ecd3a0a23a0ca039fa0abe3a946bfdf1024dd10a))
- **locale:** 修复注册uview-pro组件库时，未传递locale导致初始化语言包失败的问题 ([d716100](https://github.com/anyup/uView-Pro/commit/d7161000fe9e3d222453603d8fa31d29a1b9a9bb))
- **u-field:** 修复u-field在禁用状态下，点击输入框无法触发click事件的问题 ([f47761d](https://github.com/anyup/uView-Pro/commit/f47761d00fe2913f0e611577651a3f4108e060b6))

### ♻️ Code Refactoring | 代码重构

- **demo:** 重构u-checkbox复选框演示示例 ([77fc19b](https://github.com/anyup/uView-Pro/commit/77fc19b6f23f8d776b7a56ef9ac27726da7405a1))
- **demo:** 同步鸿蒙应用功能 ([2ac7050](https://github.com/anyup/uView-Pro/commit/2ac70500004e04bd22442d696e3e869ba33ac355))
- update release scripts ([818f8b9](https://github.com/anyup/uView-Pro/commit/818f8b9cf6a0a22893305f76e4af2b71409cbc12))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.1（2026-01-15）

### ✨ Features | 新功能

- **locale:** 统一组件国际化命名空间，以保持命名的一致性并避免与自定义字段时冲突 ([8bd3cc3](https://github.com/anyup/uView-Pro/commit/8bd3cc32b26349da63f5005cb3c29e575c831142))
- **u-form:** 支持label插槽功能 ([f82994f](https://github.com/anyup/uView-Pro/commit/f82994f5500ec4509dff64c05e115afb0465d4a2))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.5.0（2026-01-14）

### ✨ Features | 新功能

- **locale:** 添加组件国际化支持和 use locale hooks ([ff96211](https://github.com/anyup/uView-Pro/commit/ff96211423d27bde350a2ea4b9f1d5a5eb72d604))
- **locale:** 添加中、英文国际化语言字段支持 ([257eb41](https://github.com/anyup/uView-Pro/commit/257eb4143ac39cab4940ab76844d0c3be02b198c))
- **locale:** 所有组件实现组件国际化显示替换 ([ef52ff7](https://github.com/anyup/uView-Pro/commit/ef52ff7669c8cb7389377b8bdd4da681dddbb0a6))
- **locale:** 跟随vue-i18n国际化语言切换功能 ([cccecb0](https://github.com/anyup/uView-Pro/commit/cccecb03763990689e6e66d856cf3588157a61b6))
- **fullScreen:** 优化fullscreen页面配置和实现，支持国际化 ([8518218](https://github.com/anyup/uView-Pro/commit/85182186848fa6443ed74de9af1e3f5cd15fa724))
- **locale:** 新增locale国际化和vue-i18n切换示例页面 ([da79723](https://github.com/anyup/uView-Pro/commit/da797230005ff130ea66c315921e4d8d9fa613c1))
- **demo-page:** 添加支付宝小程序navbar兼容性处理 ([75284a4](https://github.com/anyup/uView-Pro/commit/75284a403b9eb7dee9625279ca5cadd14bba3a63))
- **u-skeleton:** 重构u-skeleton骨架屏组件实现全新设计 ([c39405d](https://github.com/anyup/uView-Pro/commit/c39405dfd8c4e1fe06fd842efde79ebf6706b0d1))
- **u-tabbar:** 重构u-tabbar组件内部结构，增加图标文字间距配置 ([e5655da](https://github.com/anyup/uView-Pro/commit/e5655da55c515a8288b12e37084dfec093da542b))
- **mp-weixin:** 添加小程序全局分享功能 ([e4f8bf5](https://github.com/anyup/uView-Pro/commit/e4f8bf5baae237e8dc443de7c90cd751ef045101))
- **useLocale:** uselocale hooks 支持命名空间功能 ([4d6e8f2](https://github.com/anyup/uView-Pro/commit/4d6e8f26976725cfdf862bd21af3648b864fdc29))
- **u-tabbar:** 优化u-tabbar文本样式渲染优先级 ([7d73861](https://github.com/anyup/uView-Pro/commit/7d73861b4cbe1266bc4cbfff31b45a57d9ed960f))
- **locale:** 初始化多语言时添加 isForce 参数支持强制设置默认语言 ([3309017](https://github.com/anyup/uView-Pro/commit/3309017e6fea3bc00f10efcec9f3ec3f83de9a88))
- **demo:** 优化国际化配置示例并添加多语言支持 ([177b978](https://github.com/anyup/uView-Pro/commit/177b97869f14023daf4bca632093076716b616d6))
- **theme:** 主题配置支持强制初始化功能 ([95c895d](https://github.com/anyup/uView-Pro/commit/95c895d0cfb1df37aa6285b88a2247f83add7361))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.4.13（2026-01-06）

### ✨ Features | 新功能

- **theme:** 主题初始化时支持默认主题设置 ([f2b61f6](https://github.com/anyup/uView-Pro/commit/f2b61f6caa1c285753b2e02f97309aa55bb77cca))
- **theme:** 增强主题系统初始化配置，支持在初始化时设置默认主题和暗黑模式 ([d228d10](https://github.com/anyup/uView-Pro/commit/d228d100baf619799b1dc1c8e289e1e8c9a30699))

### 🐛 Bug Fixes | Bug 修复

- **u-number-box:** 修复 u-number-box 步进器 disabled 时字体不显示问题 ([75b3a74](https://github.com/anyup/uView-Pro/commit/75b3a74e6e763dec1a1ee0d3b4d0a62d646ee389))
- **u-textarea:** 修复u-textarea组件设置props.border='none'无效的问题 ([c5a97ba](https://github.com/anyup/uView-Pro/commit/c5a97ba4c00d226c8c0fd9605660d2654dec9dc2))

### ♻️ Code Refactoring | 代码重构

- **theme:** 调整u-bg-gray-light默认色值，优化演示示例 ([37d6bda](https://github.com/anyup/uView-Pro/commit/37d6bda939f5d7c54aec09960878f236dfa32bb2))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.4.12（2026-01-04）

### ♻️ Code Refactoring | 代码重构

- **u-action-sheet:** 优化u-action-sheet组件的类型定义 ([bc5e474](https://github.com/anyup/uView-Pro/commit/bc5e474e7117e20495504ff0e2397a147595033c))
- **zIndex:** 统一组件z-index值配置 ([ae1da98](https://github.com/anyup/uView-Pro/commit/ae1da986d307e5b4855fa32e5b2995fdb7be69e8))

### 🐛 Bug Fixes | Bug 修复

- **form:** 修复field实例销毁时没有正常移除问题 ([57bfd3b](https://github.com/anyup/uView-Pro/commit/57bfd3bf9315d74c416869cd5a8c41562231166a))

### ✨ Features | 新功能

- **u-tabbar:** 新增z-index属性支持自定义层级 ([c75d45f](https://github.com/anyup/uView-Pro/commit/c75d45f45e237453d0248124cdbe5bb797edb117))
- **u-modal:** 增加u-modal基础属性支持和自定义样式功能 ([201231e](https://github.com/anyup/uView-Pro/commit/201231ee2e0c25c605f12f582650b048e83213de))
- **components:** 增加u-pagination和u-picker自定义样式支持 ([eb22265](https://github.com/anyup/uView-Pro/commit/eb222657540179fcf8359133df83da89c10b09b8))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/yoshinosk"><img src="https://github.com/yoshinosk.png?size=40" width="40" height="40" alt="yoshinosk" title="yoshinosk"/></a> <a href="https://github.com/liujiayii"><img src="https://github.com/liujiayii.png?size=40" width="40" height="40" alt="liujiayii" title="liujiayii"/></a> 

## 0.4.11（2025-12-30）

### 📦‍ Build System | 打包构建

- 添加edgeone.json配置 ([ed7ba7d](https://github.com/anyup/uView-Pro/commit/ed7ba7d94dbfa791264a624a03938dc6ac58c0bb))

### 🐛 Bug Fixes | Bug 修复

- **theme:** 修复运行时设置 color 与 theme 主题色不同步问题 ([1dcf56a](https://github.com/anyup/uView-Pro/commit/1dcf56a232f5b046e0dce5eb58ec90fb46ce19d5))
- **u-top-tips:** 修复顶部提示组件zindex显示问题，避免影响其他组件的层级显示 ([91391a8](https://github.com/anyup/uView-Pro/commit/91391a8ca10d505936c0b45488af0a3145cab335))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.4.10（2025-12-26）

### 🚀 Chore | 构建/工程依赖/工具

- **contributors:** 更新贡献者映射配置 ([d496b21](https://github.com/anyup/uView-Pro/commit/d496b21d85bede68fefc9ffd752e31ecde14735a))

### 🐛 Bug Fixes | Bug 修复

- **u-popup:** 修复u-popup设置mode=center，点击遮罩层无法关闭的问题 ([3896019](https://github.com/anyup/uView-Pro/commit/389601965933d9e1dc74d32c370c4e858df86595))
- **u-upload:** 优化u-upload组件在多个平台的样式兼容性 ([bfb60b5](https://github.com/anyup/uView-Pro/commit/bfb60b5c2f431d14425eceed9c9e5c248e7cfa29))

### ✨ Features | 新功能

- **u-tabbar:** 增强u-tabbar组件能力，支持文字和图标显示隐藏配置功能 ([29f3394](https://github.com/anyup/uView-Pro/commit/29f3394d7e8a5e2a818e397ffe97420855970333))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.4.9（2025-12-24）

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

## 0.4.8（2025-12-23）

### 🐛 Bug Fixes | Bug 修复

- **u-avatar:** 修复 ios 微信小程序默认头像不显示问题 ([9e3420f](https://github.com/anyup/uView-Pro/commit/9e3420fb8d0db533ce7fb3a8e83543b43ac0c7a7))
- 修复 u-cell 组件中使用 u-icon 样式在微信小程序不生效问题，修复 u-upload 图片上传失败重试是否显示提示配置不生效问题 ([e591d62](https://github.com/anyup/uView-Pro/commit/e591d62befce95c207ca47158549e6fd97f1e58d))
- **u-cell-item:** 修复图标样式问题并优化组件结构 ([294bf4b](https://github.com/anyup/uView-Pro/commit/294bf4be88fb53a2ccd72fcc8702b09f6d736a30))

### ♻️ Code Refactoring | 代码重构

- **theme:** 修改主题默认为官方内置主题，暗黑模式默认为亮色 ([176b482](https://github.com/anyup/uView-Pro/commit/176b48210209ae362fe30e459e73dff6fc81b53e))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/limes-cloud"><img src="https://github.com/limes-cloud.png?size=40" width="40" height="40" alt="limes-cloud" title="limes-cloud"/></a> 

## 0.4.7（2025-12-19）

### 🚀 Chore | 构建/工程依赖/工具

- 忽略部分文件 ([a8a747f](https://github.com/anyup/uView-Pro/commit/a8a747f97e93ed278a305cd1b2671d2ede5c0fde))

### ✨ Features | 新功能

- **u-tabbar:** u-tabbar 组件支持 custom-icon 直接配置图标 custom-prefix ([e577c2d](https://github.com/anyup/uView-Pro/commit/e577c2d083cf46db7124b0df46b2848ef9bdbe80))

### 🐛 Bug Fixes | Bug 修复

- **u-icon:** 修复图标组件样式和事件处理问题 ([1cadf27](https://github.com/anyup/uView-Pro/commit/1cadf27f8bd2aec3a11fb1befb9255256a2e3b3a))
- **u-pagination:** 修复分页切换时传递不正确的当前页码值 ([4befe02](https://github.com/anyup/uView-Pro/commit/4befe02c5cbb4e7db6fbf49f04ca68fac0f69a37))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.4.6（2025-12-17）

### 📝 Documentation | 文档

- 添加鸿蒙系统预览说明及二维码 ([7f6199a](https://github.com/anyup/uView-Pro/commit/7f6199a30d5477743c20b27a94711b4605787757))

### ✨ Features | 新功能

- **u-slider:** 增强滑块组件功能与灵活性，支持设置滑块的整体范围起点(start)和终点(end) ([a20c44b](https://github.com/anyup/uView-Pro/commit/a20c44b0270cffde02afd8738a932b2d6bae49f4))
- **button:** 新增按钮禁用与自定义样式功能演示 ([5f1f482](https://github.com/anyup/uView-Pro/commit/5f1f4823e027dc5ab2e6f49f29fe327c6d4318c6))

### 🐛 Bug Fixes | Bug 修复

- **button:** 更新禁用状态下按钮样式优先级 ([b3ff20b](https://github.com/anyup/uView-Pro/commit/b3ff20b59818c8bc8204bb2a489eff42ded7e842))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.4.5（2025-12-10）

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

## 0.4.4（2025-12-08）

### ✨ Features | 新功能

- **u-card:** u-card 组件的默认插槽同 body 插槽 ([ffa13ed](https://github.com/anyup/uView-Pro/commit/ffa13edcf17ff1559e8bdf2260f6b146680f9d07))
- **u-tag:** 优化自定义样式 custom-style 应用，支持 text 插槽内容 ([5bdb733](https://github.com/anyup/uView-Pro/commit/5bdb73346252850d74165cda0bb00766e5f6f59f))
- **u-line-progress:** 优化u-line-progress进度条百分比显示方式 ([1c1d979](https://github.com/anyup/uView-Pro/commit/1c1d97958f3c7e5a28943b46ea25d38b50449364))
- **switch:** 增强开关组件支持自定义值类型 ([2bcb136](https://github.com/anyup/uView-Pro/commit/2bcb1368aa1f3c7fe83799e909b89fc4349b30c3))

### 📝 Documentation | 文档

- 优化 Markdown 文档样式和格式 ([c80ff6d](https://github.com/anyup/uView-Pro/commit/c80ff6df269eb92a88001373aa96344ff4cafb79))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> <a href="https://github.com/liujiayii"><img src="https://github.com/liujiayii.png?size=40" width="40" height="40" alt="liujiayii" title="liujiayii"/></a> 

## 0.4.3（2025-12-03）

### 📝 Documentation | 文档

- 更新项目描述和移除冗余信息 ([3d5c105](https://github.com/anyup/uView-Pro/commit/3d5c1053873a1a1dc592e02caf62b5e5f9aba3ad))
- **readme:** 更新交流反馈和捐赠链接 ([266e788](https://github.com/anyup/uView-Pro/commit/266e7883a4e2f3ea8058e0bba0b7ce07a972bad8))

### 🐛 Bug Fixes | Bug 修复

- **theme:** 修复不使用 u-config-privider 全局注入时，部分颜色变量不存在的问题 ([cd82d9d](https://github.com/anyup/uView-Pro/commit/cd82d9da3e8fd6066177e3b78b855583e2756a5f))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.4.2（2025-12-01）

### 📝 Documentation | 文档

- **scripts:** 更新发布指定版本说明文档 ([db6bfe8](https://github.com/anyup/uView-Pro/commit/db6bfe8a7ec2812f34738b5b707240cdfe57e8b3))

### 🐛 Bug Fixes | Bug 修复

- **theme:** 修复npm方式加载主题包失效的问题 ([7b9c947](https://github.com/anyup/uView-Pro/commit/7b9c947581697ddbd36632919652689ca8595503))
- **dark-mode:** 修复 App 平台暗黑模式跟随系统下，切换系统暗黑模式后不即时生效问题 ([880b181](https://github.com/anyup/uView-Pro/commit/880b18153d186f6f5c5f9c81bf12307bd8f00c22))
- **initTheme:** 优化组件库 install 方法中的主题初始化默认逻辑 ([39e273b](https://github.com/anyup/uView-Pro/commit/39e273b98cd53ec2891c7e68419dd6dfbbeb30c0))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a> 

## 0.4.1（2025-11-30）

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

## 0.3.16（2025-11-21）

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

## 0.3.15（2025-11-14）

### ✨ Features | 新功能

- **u-dropdown:** u-dropdown中的u-dropdown-item中新增控制显示隐藏属性 ([e4ee28f](https://github.com/anyup/uView-Pro/commit/e4ee28fd0a66ceb6bbed07b7969862e936e5e573))
- **u-form:** 支持嵌套属性验证(a.b.c格式) ([1bbead8](https://github.com/anyup/uView-Pro/commit/1bbead8be764491844a7d3909480a360ff2dc4d4))
- **form:** 添加表单字段的嵌套校验演示示例 ([73b4abe](https://github.com/anyup/uView-Pro/commit/73b4abe98047ac5193b56b71cdacb05957760e93))

### 🚀 Chore | 构建/工程依赖/工具

- 更新应用 logo 和图标 ([38d52e4](https://github.com/anyup/uView-Pro/commit/38d52e4a9e8656bcae89892a5f94a5201a1af7b2))

### ♻️ Code Refactoring | 代码重构

- 更新 logo 图片地址 ([c0fe3d1](https://github.com/anyup/uView-Pro/commit/c0fe3d15d6f4498229feaba860ff78e43a5297e6))

### 👥 Contributors

<a href="https://github.com/zuo-wentao"><img src="https://github.com/zuo-wentao.png?size=40" width="40" height="40" alt="zuo-wentao" title="zuo-wentao"/></a> <a href="https://github.com/elkelkelkelkelk"><img src="https://github.com/elkelkelkelkelk.png?size=40" width="40" height="40" alt="elkelkelkelkelk" title="elkelkelkelkelk"/></a> <a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## 0.3.14（2025-11-14）

### ✨ Features | 新功能

- **app-harmony:** 更新应用信息并添加鸿蒙签名配置，鸿蒙应用打包差异性编译 ([81a33c1](https://github.com/anyup/uView-Pro/commit/81a33c13a471721848033cc5f7ac1e3b3b30abc6))
- **u-message-input:** 新增输入框类型prop，支持number，text等模式 ([68a865a](https://github.com/anyup/uView-Pro/commit/68a865a12b7e0b20db458ea403579d28a227aaeb))

### ♻️ Code Refactoring | 代码重构

- **components:** 优化 u-icon 和 u-toast 组件样式和结构 ([3cfb01d](https://github.com/anyup/uView-Pro/commit/3cfb01ddb8612e274e1bccd43fca0b5bb4e0a405))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## 0.3.13（2025-11-11）

### 🐛 Bug Fixes | Bug 修复

- **u-root-portal:** 修复根节点传送组件运行时报错问题 ([3c24a75](https://github.com/anyup/uView-Pro/commit/3c24a75de00982bbdc1388a413721377de4f1e3d))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## 0.3.12（2025-11-10）

### 🐛 Bug Fixes | Bug 修复

- **u-dropdown:** 修复下拉菜单激活颜色不正确的问题 ([d3cc1e8](https://github.com/anyup/uView-Pro/commit/d3cc1e87ff0951c5385da5e667a528d30b7fd1cf))

### 📦‍ Build System | 打包构建

- **app-harmony:** 新增 HarmonyOS 构建配置 ([c18a537](https://github.com/anyup/uView-Pro/commit/c18a537d9bf4edcbe626290642225363486cfb1e))
- 更新项目版本号 ([8eaee77](https://github.com/anyup/uView-Pro/commit/8eaee7784fb348c5637b55b037f62ba51409a4f2))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## 0.3.10（2025-11-06）

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

## 0.3.9（2025-11-05）

### 🐛 Bug Fixes | Bug 修复

- **types:** 修正组件声明文件中uLoadmore的命名大小写问题 ([eb69b18](https://github.com/anyup/uView-Pro/commit/eb69b18d969dac13a75375501018edc4f3097e33))
- **loadmore:** 修复 u-loadmore 组件使用类型声明报错问题 ([92facfd](https://github.com/anyup/uView-Pro/commit/92facfdb5b2b57bcd634d93412c90661c5f6e59d))

### ✨ Features | 新功能

- **theme:** 新增本地主题文件支持 ([a989314](https://github.com/anyup/uView-Pro/commit/a989314a7b691e94ed81e524100e70d6e9a22a12))
- **theme:** 实现运行时主题变更功能，新增 setTheme 函数 ([12765d0](https://github.com/anyup/uView-Pro/commit/12765d07244a9d6ca49c4dd34d81f66a61c87c6d))

### 👥 Contributors

<a href="https://github.com/liujiayii"><img src="https://github.com/liujiayii.png?size=40" width="40" height="40" alt="liujiayii" title="liujiayii"/></a> <a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## 0.3.8（2025-11-04）

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

## 0.3.7（2025-10-28）

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

## 0.3.6（2025-10-24）

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

## 0.3.5（2025-10-21）

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

## 0.3.4（2025-10-20）

### ♻️ Code Refactoring | 代码重构

- **components:** 移除不必要的父组件和事件总线相关代码，优化组件间通信 ([280c2f8](https://github.com/anyup/uView-Pro/commit/280c2f8acc75764a7706ec38c742cc16703c941a))
- **u-safe-bottom:** 优化底部安全区组件 ([161f2d3](https://github.com/anyup/uView-Pro/commit/161f2d32ff6b9abbb6f8221a4dd99c438a606e94))
- **u-status-bar:** 优化状态栏组件 ([53c50ab](https://github.com/anyup/uView-Pro/commit/53c50ab8b6314a7d702b90e6b48b79301a334090))

### 🐛 Bug Fixes | Bug 修复

- **u-subsection:** 优化列表和模式变化的监听逻辑，移除不必要的初始化调用 ([f77ee7c](https://github.com/anyup/uView-Pro/commit/f77ee7ccc7521ec2472f72dcf2fb47362ca0abd9))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## 0.3.3（2025-10-16）

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

## 0.3.2（2025-10-15）

### 📝 Documentation | 文档

- **changelog:** 更新 CHANGELOG.md 生成配置 ([27a2609](https://github.com/anyup/uView-Pro/commit/27a26095b92cf8cbc6477c563a68b1557f9fb045))
- 更新交流群图片链接 ([832815d](https://github.com/anyup/uView-Pro/commit/832815deb63f8b144f525591d16e3ccf900b8632))

### ⚡ Performance Improvements | 性能优化

- **component-relation:** 增强组件间通信功能；修改 broadcast 方法，支持定向广播；移除对子组件名称的强制要求，允许匿名组件 ([28ea814](https://github.com/anyup/uView-Pro/commit/28ea814810055aa4c99b53d676b16da337fdf7d5))

### 🐛 Bug Fixes | Bug 修复

- **u-index-list:** 重构索引锚点组件，兼容多端，修复IndexList索引列表在微信小程序没有吸顶效果 ([ce6a7a3](https://github.com/anyup/uView-Pro/commit/ce6a7a3c01b622cad268779098390c0d593f75bc))

### 👥 Contributors

<a href="https://github.com/anyup"><img src="https://github.com/anyup.png?size=40" width="40" height="40" alt="anyup" title="anyup"/></a>

## 0.3.1（2025-10-14）

### 📝 Documentation | 文档

- 更新 package.json 中的平台支持信息 ([c30da7c](https://github.com/anyup/uView-Pro/commit/c30da7cf32c8c97e740df75166d1d7dfa4016942))

### 🐛 Bug Fixes | Bug 修复

- **request:** 修复http request请求拦截器中config.header为undefined的问题 ([8da453a](https://github.com/anyup/uView-Pro/commit/8da453afe193338a53c9f320346acabdb8803a79))

## 0.3.0（2025-10-12）

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
