## Sticky 吸顶 <to-api/>

<demo-model url="/pages/componentsB/sticky/index"></demo-model>


该组件与CSS中`position: sticky`属性实现的效果一致，当组件达到预设的到顶部距离时，
就会固定在指定位置，组件位置大于预设的顶部距离时，会重新按照正常的布局排列。

<custom-block text="由于右侧的演示是通过iframe标签引入的，缺少了手机端运行的相关API，所以吸顶是看不到效果的，手机端有不会这些问题，请在右上角的“演示”中用手机扫码查看对应的效果"></custom-block>

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

通过`slot`，将需要吸顶的内容放在`Sticky`组件中即可，`slot`中只能有一个根元素

:::danger 注意！
由于页面依赖相关的原因的，部分页面会出现**Cannot read property 'bottom' of null**的报错，可以参考 [issue #239](https://github.com/YanxinNet/uView/issues/239) 进行处理。
:::

```html
<template>
	<view class="container">
		<u-sticky>
			<!-- 只能有一个根元素 -->
			<view class="sticky">
				宝剑锋从磨砺出,梅花香自苦寒来
			</view>
		</u-sticky>
	</view>
</template>

<style lang="scss" scoped>
	.container {
		height: 200vh;
		margin-top: 150rpx;
	}
	
	.sticky {
		width: 750rpx;
		height: 120rpx;
		background-color: #2979ff;
		color: #fff;
		padding: 24rpx;
	}
</style>
```

### 吸顶距离

通过`offset-top`参数设置组件在吸顶时与顶部的距离

```html
<u-sticky offset-top="200">
	<view>
		塞下秋来风景异，衡阳雁去无留意
	</view>
</u-sticky>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| offset-top | 吸顶时与顶部的距离，单位rpx  | String \| Number | 0 | - |
| index | 自定义标识，用于区分是哪一个组件 | String \| Number  | - | - |
| enable | 是否开启吸顶功能 | Boolean  | true | false |
| bg-color | 组件背景颜色 | String  | #ffffff | - |
| z-index | 吸顶时的`z-index`值 | String \| Number  | 970 | - |
| h5-nav-height | 导航栏高度，自定义导航栏时(无导航栏时需设置为`0`)，需要传入此值，单位**px** | String \| Number  | 44 | - |

### Event

|事件名|说明|回调参数|
|:-|:-|:-|
| fixed | 组件吸顶时触发 | index: 通过props传递的`index` |
| unfixed | 组件取消吸顶时触发 | index: 通过props传递的`index` |
