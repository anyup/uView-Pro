## Tag 标签 <to-api/>

<demo-model url="/pages/componentsA/tag/index"></demo-model>


该组件一般用于标记和选择，有如下特点：
- `mode`参数可以设置3种模式，`dark`(深色背景)、`light`(浅色背景)、`plain`(白色背景)
- `shape`参数可以设置多种形状，`circle`（两边半圆形）, `square`（方形，带圆角），`circleLeft`（左边半圆），`circleRight`（右边半圆）
- `type`参数可以设置5种主题，`primary`，`success`，`warning`，`error`，`info`

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`type`参数设置主题类型，默认为`primary`
- `text`设置标签内容

```html
<u-tag text="雪月夜" type="success" />
```

### 设置标签的类型

- 通过设置`mode`参数，可以设置标签的类型，`dark`(深色背景)、`light`(浅色背景)、`plain`(白色背景)

```html
<u-tag text="一丘之貉" mode="dark" />
<u-tag text="沆瀣一气" mode="light" />
<u-tag text="狼狈为奸" mode="plain" />
```

### 设置标签的形状

通过`shape`参数，可以设置标签的形状，默认是`square`（方形，带圆角），可选：`circle`（两边半圆形）, `circleLeft`（左边半圆），`circleRight`（右边半圆）

```html
<u-tag text="主谓宾" shape="circle" />
<u-tag text="定状补" shape="circleLeft" />
```

### 设置标签是否可以关闭

设置`closeable`参数为`true`，会在标签上自动添加一个关闭图标  
设置可关闭后，点击关闭按钮，会发出`close`事件，回调中手动设置`show`参数为`false`，可以隐藏`Tag`

```html
<template>
	<u-tag text="要清楚" closeable :show="show" @close="tagClick" />
</template>

<script>
	export default {
		data() {
			return {
				show: true
			}
		},
		methods: {
			tagClick(index) {
				this.show = false;
			}
		}
	}
</script>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| type | 主题类型  | String	 | primary | success / info / warning / error |
| size | 标签大小  | String	 | default | mini |
| shape | 标签形状 | String | square | circle / circleLeft / circleRight |
| text | 标签的文字内容 | String | - | - |
| bg-color | 自定义标签的背景颜色 | String  | - | - |
| color | 文字的颜色 | String  | - | - |
| border-color | 标签的边框颜色  | String | - | - |
| close-color | 关闭按钮的颜色  | String | - | - |
| index | 点击标签时，会通过`click`事件返回该值  | String \| Number | - | - |
| mode | 模式选择，见上方说明 | String | light | dark / plain |
| closeable | 是否可关闭，设置为`true`，文字右边会出现一个关闭图标  | Boolean | false | true |
| show | 标签显示与否  | Boolean | true | false |

### Event

|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
| click | 点击标签触发 | index: 传递的`index`参数值 | - |
| close | `closeable`为`true`时，点击标签关闭按钮触发 | index: 传递的`index`参数值 | - |
