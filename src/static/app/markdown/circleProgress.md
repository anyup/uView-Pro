## CircleProgress 圆形进度条 <to-api/>


<demo-model url="/pages/componentsC/progress/index"></demo-model>


展示操作或任务的当前进度，比如上传文件，是一个圆形的进度环。  

### 内部实现

组件内部通过`canvas`实现，有更好的性能和通用性。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`percent`设置当前的进度值，该值区间为0-100
- 通过`active-color`设置圆环的颜色，也可以直接设置`type`主题颜色，使用预置值
- 通过默认`slot`传入内容，将会显示在圆环的内部

```html
<template>
	<u-circle-progress active-color="#2979ff" :percent="80">
		<view class="u-progress-content">
			<view class="u-progress-dot"></view>
			<text class='u-progress-info'>查找中</text>
		</view>
	</u-circle-progress>
</template>

<style lang="scss" scoped>
	.u-progress-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.u-progress-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background-color: #fb9126;
	}
	
	.u-progress-info {
		font-size: 28rpx;
		padding-left: 16rpx;
		letter-spacing: 2rpx
	}
</style>
```

### 设置圆环的动画时间

通过`duration`设置圆环从0递增到100%(也即一圆周)所需的时间，如需动态修改进度值时会用到，比如用户进行某一个操作之后，
需要把进度值从30%改为80%，这里增加了50%(80% - 30% = 50%)，也即半个圆周，所需时间为`duration`的一半，因为`duration`值为一个圆周的时间。

```html
<u-circle-progress type="primary" :percent="30" duration="2000"></u-circle-progress>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| percent | 圆环进度百分比值，为数值类型，0-100  | String \| Number | - | - |
| inactive-color | 圆环的底色，默认为灰色(该值无法动态变更) | String  | #ececec | - |
| active-color | 圆环激活部分的颜色(该值无法动态变更) | String  | #19be6b | - |
| width | 整个圆环组件的宽度，高度默认等于宽度值，单位rpx | String \| Number  | 200 | - |
| border-width | 圆环的边框宽度，单位rpx | String \| Number  | 14 | - |
| duration | 整个圆环执行一圈的时间，单位ms | String \| Number  | 1500 | - |
| type | 如设置，`active-color`值将会失效 | String  | - | success / primary / error / info / warning |
| bg-color | 整个组件背景颜色，默认为白色 | String  | #ffffff | - |


<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 40%;
}
</style>