# vite-plugin-uni-root

UniApp 虚拟根组件 Vite 插件，零额外依赖，纯字符串操作实现。

## 解决的问题

UniApp 不支持原生的根组件包裹机制，无法在全局统一注入 `u-config-provider`、`u-toast`、`u-modal` 等需要在每个页面根部存在的组件。传统方案需要在每个页面手动添加，维护成本高。

本插件通过 Vite 构建时注入，自动为每个页面包裹 `<global-root-view>` 根组件，无需修改任何页面代码本身。

## 技术方案

### 架构

```
App.root.vue（源码）        → 在 main.ts 中导入并注册为全局组件 global-root-view
                              → 页面模板被包裹 <global-root-view> 页面内容 </global-root-view>
                              → 渲染时页面内容填入 <slot />
```

### 工作流程

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│ main.ts     │ →   │ 注入 import  │ →   │ 全局注册组件     │
│             │     │ + 注册代码    │     │ global-root-view │
└─────────────┘     └──────────────┘     └─────────────────┘
                                                 │
┌─────────────┐     ┌──────────────┐            │
│ page.vue    │ →   │ 包裹模板     │            │
│             │     │ <global-...> │ ←─────────┘
└─────────────┘     └──────────────┘
                            │
┌─────────────┐            │
│ App.root.vue│ →  <slot /> 接收页面内容
└─────────────┘
```

### 三步实现

1. **main.ts 注入**（`root.ts -> registerRootApp`）
   - 在 main.ts 中注入 `import GlobalRootView from "./App.root.vue"`
   - 注入 `app.component("global-root-view", GlobalRootView)` 注册为全局组件
   - 注：`GlobalRootView` 仅为局部变量名，实际组件就是 `App.root.vue`

2. **页面模板包裹**（`page.ts -> transformPage`）
   - 解析 SFC，定位 `<template>` 标签的起止位置
   - 提取 PageMeta 节点（如有则放到包裹层外部）
   - 将模板内容包裹在 `<global-root-view>...</global-root-view>` 中

3. **App.root.vue 加载**（`index.ts -> load`）
   - 拦截 `App.root.vue` 的模块请求，从文件读取并返回
   - 模板中的 `<slot />` 接收并渲染页面内容

### 跨端兼容

插件是纯 Vite 构建时插件，在 UniApp 编译之前完成源代码转换，不依赖任何平台特定 API，所有 UniApp 支持的平台均可正常工作：

| 平台 | 支持 |
|------|------|
| H5 | ✅ |
| 微信小程序 | ✅ |
| 支付宝小程序 | ✅ |
| 头条/抖音小程序 | ✅ |
| Android App | ✅ |
| iOS App | ✅ |
| 鸿蒙 App | ✅ |

## 使用方式

### 1. 创建 App.root.vue

在 `src/` 目录下创建 `App.root.vue` 文件：

```vue
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { useTheme, useLocale } from 'uview-pro';

const { darkMode, themes, currentTheme } = useTheme();
const { currentLocale } = useLocale();

onLoad(() => {
    console.log('darkMode->', darkMode.value);
    console.log('theme->', currentTheme.value?.name);
    console.log('locale->', currentLocale.value?.name);
});
</script>

<template>
    <u-config-provider
        :dark-mode="darkMode"
        :themes="themes"
        :current-theme="currentTheme?.name"
        :current-locale="currentLocale?.name"
    >
        <slot />
        <u-toast global></u-toast>
        <u-modal global></u-modal>
    </u-config-provider>
</template>
```

关键点：`<slot />` 是页面内容的渲染位置，必须保留。

### 2. 配置 vite.config.ts

```ts
// npm 安装
import { UniRoot } from 'uview-pro/plugins';

// uni_modules 安装
import { UniRoot } from './src/uni_modules/uview-pro/plugins';

export default defineConfig({
    plugins: [
        UniRoot(), // 放在其他插件之前
        // ...其他插件
    ],
});
```

### 3. 运行

```bash
npm run dev
```

不需要修改任何页面代码，所有页面自动被 `<global-root-view>` 包裹。

## 文件结构

```
src/uni_modules/uview-pro/plugins/root/
├── index.ts     # 插件入口，Vite 插件生命周期
├── root.ts      # main.ts 注入 + App.root.vue 处理
├── page.ts      # 页面模板包裹转换
└── utils.ts     # 工具函数（SFC 解析、pages.json 加载、AST 查找等）
```

## 配置项

```ts
UniRoot({
    rootFileName: 'App.root', // 根组件文件名（不含扩展名），默认 App.root
})
```

## HMR 支持

修改 `pages.json` 后自动重载页面列表，无需手动重启开发服务器。

## 注意事项

- Vue 版本需 >= 3.2.13（使用 `vue/compiler-sfc` 的 `parse` API）
- 页面模板中如有 `<page-meta>` 组件，会被提取到包裹层外部，确保微信小程序兼容
- 页面模板中如有嵌套 `<template #slot>` 具名插槽，不影响根模板的正确识别

## 致谢

本插件的实现参考了 [@uni-ku/root](https://github.com/uni-ku/root)（MIT License，作者 skiyee），核心思路受其启发并进行了重新实现。
