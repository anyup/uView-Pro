export const apis = `
# LoadingPopup 加载弹窗

\`u-loading-popup\` 是 uView Pro 提供的弹窗式加载动画组件，常用于页面或局部异步加载、数据请求等待等场景。相比普通的 \`u-loading\`，它支持遮罩、内容插槽、自动关闭等高级功能。

## 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

## 基本使用

通过 \`v-model\` 实现弹窗的双向绑定显示，\`mode\` 设定动画类型（\`circle\` 圆圈、\`flower\` 花朵），可自定义内容。

\`\`\`html
<template>
  <u-loading-popup v-model="show" mode="circle" text="加载中..." />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const show = ref(true)
</script>
\`\`\`

## 方向

可通过 \`direction\` 属性设置内容方向，可选值有 \`vertical\`（垂直）和 \`horizontal\`（水平）。

\`\`\`html
<template>
  <u-loading-popup
    v-model="show"
    text="正在加载，请稍候..."
    :direction="direction"
  />
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  const show = ref(true)

  const direction = ref<'vertical' | 'horizontal'>('vertical')
</script>
\`\`\`

## 动画颜色与尺寸

- \`color\` 设置动画颜色（仅 mode=circle 有效）。
- \`size\` 设置动画尺寸，单位 rpx。

\`\`\`html
<u-loading-popup v-model="show" color="#2979ff" size="40" />
\`\`\`

## 自动关闭与遮罩交互

- \`duration\` 设置自动关闭时间（ms），默认（设置为 0）表示不自动关闭。
- \`cancelTime\` 允许点击遮罩关闭的最短时间（ms），默认 10000。
  - 遮罩层点击在 cancelTime 毫秒后可关闭弹窗，触发 cancel 事件。

\`\`\`html
<u-loading-popup v-model="show" :duration="2000" :cancelTime="5000" />
\`\`\`

## 事件

- \`@cancel\` 点击遮罩关闭时触发。

\`\`\`html
<template>
  <u-loading-popup v-model="show" @cancel="handleCancel" />
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  const show = ref(true)

  function handleCancel() {
    console.log('cancel')
  }
</script>
\`\`\`

## API

### Props

| 参数       | 说明                       | 类型          | 默认值   | 可选值              |
| ---------- | -------------------------- | ------------- | -------- | ------------------- |
| v-model    | 弹窗显示的双向绑定         | Boolean       | false    | true/false          |
| mode       | 加载动画类型               | String        | circle   | circle/flower       |
| text       | 加载提示文字               | String        | -        | -                   |
| direction  | 内容方向                   | String        | vertical | vertical/horizontal |
| duration   | 自动关闭时间（ms）         | Number        | 0        | -                   |
| cancelTime | 允许点击遮罩关闭的最短时间 | Number        | 10000    | -                   |
| color      | 动画颜色                   | String        | #c7c7c7  | -                   |
| size       | 加载动画尺寸（rpx）        | String/Number | 48       | -                   |

### Events

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| cancel | 点击遮罩关闭时触发 | -        |

---

更多用法请参考组件源码和实际业务场景。

`;
