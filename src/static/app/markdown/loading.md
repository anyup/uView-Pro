## Loading 加载动画 <to-api/>

<demo-model url="/pages/componentsB/loading/index"></demo-model>


此组件为一个小动画，目前用在uView的[loadmore加载更多](/components/loadMore.html)和[switch开关](/components/switch.html)等组件的正在加载状态场景。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

通过`mode`设定动画的类型，`circle`为圆圈的形状，`flower`为经典类似花朵的形状


```html
<template>
	<view>
		<u-loading mode="circle"></u-loading>
		<u-loading mode="flower"></u-loading>
	</view>
</template>
```

### 动画颜色

`color`可以指定动画活动区域的颜色

```html
<u-loading color="red"></u-loading>
```

### 动画尺寸

通过`size`设定尺寸，单位rpx，组件内把`size`值体现为组件的宽和高

```html
<u-loading size="36"></u-loading>
```

### 显示或隐藏动画

通过`show`设置为`true`或`false`，来显示或隐藏动画

```html
<u-loading :show="true"></u-loading>

/* 等价于 */
<u-loading show></u-loading>
```


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| mode | 模式选择，见上方说明  | String | circle | flower |
| color | 动画活动区域的颜色，只对 mode = circle 模式有效  | String	 | #c7c7c7 | - |
| size |加载图标的大小，单位rpx | String \| Number  | 34 | - |
| show | 是否显示动画 | Boolean  | true | false |


