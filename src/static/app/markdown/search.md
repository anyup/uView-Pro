## Search 搜索 <to-api/>

<demo-model url="/pages/componentsB/search/index"></demo-model>

<custom-block text="由于右侧的演示是通过iframe引入的，缺少移动端的@touchstart事件，故清除控件无效，请在真机演示中查看效果。"></custom-block>

搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`placeholder`参数设置占位内容
- 通过`v-model`双向绑定一个**变量**值，设置初始化时搜索框的值，如果初始内容为空，那么请绑定一个值为空字符的变量。

**说明：** 因为是双向绑定的，所以当组件内容输入框内容变化时，也会实时的反映到绑定的`keyword`变量，这意味着，您**无需**监听`change`事件，
也能实时的得知输入框的内容。

```html
<template>
	<u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '遥看瀑布挂前川'
			}
		}
	}
</script>
```

### 设置输入框形状

通过`shape`设置输入框两端的形状，`square`-方形带圆角，`round`(默认)-半圆形

```html
<u-search shape="round"></u-search>
```

### 是否开启清除控件

`clearabled`(默认为`true`)设置为`true`的话，输入框有内容时，右边会显示一个清除的图标

```html
<u-search :clearabled="true"></u-search>
```

### 是否开启右边控件

该控件为类似按钮形式，可以设置为"搜索"或者"取消"等内容，如果开启动画效果，用户确认搜索后，该控件会自动消失

- `show-action`配置是否开启右边按钮控件
- `action-text`配置控件内容
- `animation`(默认为`false`)设置为`true`的话，失去焦点，或者点击控件按钮时，控件自动消失，并且带有动画效果

::: warning 说明
1. 如果不想点击右侧控件时自动消失，请把`animation`设置为`false`
2. 右侧控件的默认文字为"搜索"(它本意为控件，碰巧内容为"搜索"二字，并非说它就是一个搜索按钮)，点击它的时候触发的是`custom`事件，而不是`search`事件
:::

```html
<u-search :show-action="true" action-text="搜索" :animation="true"></u-search>
```

### 自定义样式

- 通过`input-align`设置输入框内容的对其方式，和css的`text-align`同理
- 通过`border-color`设置整个搜索组件的边框，只要配置了颜色，才会出现边框
- 通过`height`设置组件高度
- 通过`disabled`设置是否禁用输入框
- 通过`bg-color`设置是搜索组件背景颜色

```html
<u-search input-align="center" height="70"></u-search>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| v-model | 双向绑定输入框搜索值 | String | - | - |
| shape | 搜索框形状，round-圆形，square-方形 | String | round | square |
| bg-color | 搜索框背景颜色  | String | #f2f2f2 | - |
| border-color | 边框颜色，配置了颜色，才会有边框  | String | - | - |
| placeholder | 占位文字内容 | String | 请输入关键字 | - |
| clearabled | 是否启用清除控件 | Boolean | true | false |
| focus | 是否自动获得焦点 | Boolean | false | true |
| show-action | 是否显示右侧控件(右侧的"搜索"按钮) | Boolean | true | false |
| action-text | 右侧控件文字 | String | 搜索 | - |
| action-style | 右侧控件的样式，对象形式 | Object | - | - |
| input-align | 输入框内容水平对齐方式 | String | left | center / right |
| disabled | 是否启用输入框 | Boolean | false | true |
| animation | 是否开启动画，见上方说明 | Boolean | false | true |
| height | 输入框高度，单位rpx | String \| Number | 64 | - |
| search-icon-color | 搜索图标的颜色，默认同输入框字体颜色 | String | - | - |
| color | 输入框字体颜色 | String | #606266 | - |
| placeholder-color | placeholder的颜色 | String | #909399 | - |
| margin | 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30rpx"、"30rpx 20rpx"等写法 | String | - | - |
| maxlength | 输入框最大能输入的长度，-1为不限制长度 | String \| Number | -1 | - |
| input-style | 自定义输入框样式，对象形式 | Object | - | - |
| search-icon | 输入框左边的图标，可以为uView图标名称或图片路径 | String | search | - |


### Events

您可以通过监听`change`事件，在回调中将返回的结果绑定一个变量去获得用户的输入内容。  
但如"基本使用"中的说明一样，您双向绑定了一个变量后，无需监听`change`事件也是可以的。

| 事件名 | 说明 | 回调参数 | 版本 |
| :- | :- | :- | :- |
| change | 输入框内容发生变化时触发 | value：输入框的值 | - |
| search | 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发 | value：输入框的值 | - |
| custom | 用户点击右侧控件时触发 | value：输入框的值 | - |
| blur | 输入框失去焦点时触发 | value：输入框的值 | - |
| focus | 输入框获得焦点时触发 | value：输入框的值 | - |
| clear | 配置了`clearabled`后，清空内容时会发出此事件 | - | - |
| click | `disabled`为`true`时，点击输入框，发出此事件，用于跳转搜索页 | - | - |


<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 35%;
}
</style>
