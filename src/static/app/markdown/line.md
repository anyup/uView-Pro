## Line 线条 <to-api/>

<demo-model url="/pages/componentsB/line/index"></demo-model>

此组件一般用于显示一根线条，用于分隔内容块，有横向和竖向两种模式，且能设置0.5px线条，使用也很简单。


### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

组件内部有预置的参数，直接使用即可，有如下几个参数需要了解：

- `color`为线条的颜色
- `direction`为线条的方向，默认为横向
- `hair-line`为是否设置细线条(0.5px)，默认为`true`
- `length`参数需要特别留意，它需要带上单位，比如设置为"50%"，"500rpx"等，在线条为横向时，表现为线条的长度；在线条为竖向时，表现为线条的高度。

```html
<template>
	<u-line color="red" />
	
	/* 等同于 */
	<u-line color="red"></u-line>
</template>
```


### 线条类型

我们可以通过`border-style`参数设置线条的类型，有如下三种可选项：

- `solid`表示实线
- `dashed`表示方形虚线
- `dotted`表示圆点虚线


### 兼容性

由于`头条小程序`的兼容性，如果组件无效的情况下，您可能需要给组件加上`u-line`类，如下：

```html
<u-line class="u-line"></u-line>
```


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| color | 线条的颜色 | String | #e4e7ed | - |
| length | 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带rpx单位的值等 | String | 100% | - |
| direction | 线条的方向，`row`-横向，`column`-竖向 | String | row | column |
| hair-line | 是否显示细线条 | Boolean  | true | false |
| margin | 线条与上下左右元素的间距，字符串形式，如"30rpx"、"20rpx 30rpx" | String  | - | - |
| border-style | 线条类型，见上方说明 | String  | solid | dashed / dotted |


<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 37%;
}
</style>