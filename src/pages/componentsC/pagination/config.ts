export const apis = `
# Pagination 分页

分页组件（Pagination）用于在数据量较大的情况下，将数据进行分页，并允许用户进行主动点击跳转。

## 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

## 基本用法

\`\`\`html
<u-pagination v-model="current" :total="21"></u-pagination>
\`\`\`


## 使用图标

\`\`\`html
<u-pagination v-model="current1" :total="35" show-icon></u-pagination>
\`\`\`

## 自定义图标（仅支持内置图标）

\`\`\`html
<u-pagination
    v-model="current2"
    :total="49"
    show-icon
    prev-icon="arrow-left-double"
    next-icon="arrow-right-double"
></u-pagination>
\`\`\`

## 触发 change 事件

\`\`\`html
<template>
  <u-pagination v-model="current3" :total="50" @change="handleChange"></u-pagination>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { $u } from 'uview-pro'
import type { PaginationChangePayload } from 'uview-pro/types/global';

const current3 = ref(1);

// 触发 change 事件
function handleChange(val: PaginationChangePayload) {
    $u.toast(\`触发器被点击：\${val.type}\`);
}
\`\`\`

## API

## Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|:- |:- |:- |:-: |:-: |
| prevText | 左侧按钮文字 | String | 上一页 | - |
| nextText | 右侧按钮文字 | String | 下一页 | - |
| total | 总条目数 | Number | Number | - |
| pageSize | 每页数据量 | Number | 10 | - |
| showIcon | 是否以 icon 形式展示按钮 | Boolean | false | - |
| prevIcon | 左侧按钮图标，仅支持内置图标 | String | arrow-left | - |
| nextIcon | 右侧按钮图标，仅支持内置图标 | String | arrow-right | - |

## Events

| 事件名 | 说明 | 回调参数 |
|:-|:-|:-|
| change | 切换分页事件 | \`{ type: string, current: number }\` current 为当前页，type 值为：next/prev，表示点击的是上一页还是下一页 |

## Slots

| 名称 | 说明 |
|:-|:-|
| default | 分页内容 |

`;
