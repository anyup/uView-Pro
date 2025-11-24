export const apis = `
# Fab 悬浮按钮

悬浮按钮（Floating Action Button）用于在页面右下角或指定位置提供常用快捷操作入口，支持拖拽、展开子操作项、以及多种布局策略。本文件按组件文档规范提供示例与 API 说明，包含平台差异与常见问题说明。

## 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

## 基本用法（默认右下角）

\`\`\`html
<template>
  <u-fab @trigger="onTrigger" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

function onTrigger() {
  uni.showToast({ title: '触发', icon: 'none' })
}
</script>
\`\`\`


示例：

\`\`\`html
<!-- 有子项 -->
<u-fab>
  <u-button custom-style="margin:16rpx">收藏</u-button>
  <u-button custom-style="margin:16rpx">点赞</u-button>
</u-fab>

<!-- 自定义触发器 -->
<u-fab>
  <template #trigger>
    <u-button type="primary">触发器</u-button>
  </template>
</u-fab>
\`\`\`

## 启用拖拽并关闭自动吸边

\`\`\`html
<u-fab :draggable="true" :autoStick="false">
  <u-button custom-style="margin:12rpx">收藏</u-button>
  <u-button custom-style="margin:12rpx">分享</u-button>
</u-fab>
\`\`\`

## 传入四边 gap 并设置右上角（position）

\`\`\`html
<u-fab :position="'right-top'" :gap="{ top: 20, right: 20, bottom: 20, left: 20 }" :draggable="true">
  <u-icon name="star" size="60rpx"></u-icon>
  <u-icon name="heart" size="60rpx"></u-icon>
</u-fab>
\`\`\`

## 自定义触发器并通过 ref 控制展开

\`\`\`html
<template>
  <u-fab ref="fabRef" :draggable="true" :position="'left-bottom'">
    <template #trigger>
      <u-button type="primary" @click="onBtnClick">Menu</u-button>
    </template>
    <u-icon name="star" size="36rpx"></u-icon>
    <u-icon name="share" size="36rpx"></u-icon>
  </u-fab>
  <u-button @click="toggleFab">切换 FAB</u-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const fabRef = ref<any>(null)
function toggleFab() {
  fabRef.value?.toggle?.()
}
function onBtnClick() {
  // 自定义触发器点击逻辑
}
</script>
\`\`\`

## API

## Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|:- |:- |:- |:-: |:-: |
| type | 主题颜色 | String | \`primary\` | \`primary\` / \`info\` / \`error\` / \`warning\` / \`success\` |
| disabled | 是否禁用 | Boolean | \`false\` | - |
| draggable | 是否允许拖拽 | Boolean | \`false\` | - |
| autoStick | 拖拽释放后是否自动吸边（仅当 draggable=true 时生效） | Boolean | \`true\` | - |
| gap | 与屏幕边缘的间距，支持单值或对象分别配置四边间距，单位px |  Object | \`{ left: 16, right: 16, top: 16, bottom: 16 }\` | - |
| position | 预设停靠位置 | String | \`right-bottom\` | \`left-top\` / \`right-top\` / \`left-bottom\` / \`right-bottom\` / \`left-center\` / \`right-center\` / \`top-center\` / \`bottom-center\` |
| direction | 子操作项展开方向 | String | \`top\` | \`top\` / \`bottom\` / \`left\` / \`right\` |
| zIndex | 层级 | Number | \`99\` | - |

> 说明：\`gap\` 支持对象形式 \`{ top, right, bottom, left }\`，单位：px。

## Events

| 事件名 | 说明 | 回调参数 |
|:-|:-|:-|
| trigger | 当没有子项时，点击触发此事件 | event |

## 暴露方法

| 方法名 | 说明 |
|:-|:-|
| toggle | 切换展开/收缩状态（通过组件 ref 调用） |

## Slots

| 名称 | 说明 |
|:-|:-|
| default | 子操作项插槽（存在 slot 时组件作为展开菜单展示） |
| trigger | 自定义触发器（覆盖默认圆形按钮） |

`;
