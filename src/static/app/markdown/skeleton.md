## Skeleton 骨架屏 <to-api/>

<demo-model url="/pages/componentsB/skeleton/index"></demo-model>


骨架屏一般用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验。  

::: tip 说明
该组件原理是通过uni的uni.createSelectorQuery接口，查询页面带有指定类名的元素的位置和尺寸，
通过绝对定位的方式，用同样尺寸的灰色块定位到相同的位置。  
所以要求在请求数据尚未完成时，填写一些模拟数据，才能让对应的元素有对应的尺寸和位置，供uni.createSelectorQuery查询使用
:::

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

该组件的使用，需要有几个类名是必须的，如下：
- `u-skeleton`(必须)，该类名用于页面的`最外层元素`，供骨架屏组件查询和定位出绘制骨架的位置和尺寸
- `u-skeleton-circle`(可选)，该类名用于页面的圆形元素，供骨架组件描绘出圆形的骨架块
- `u-skeleton-rect`(可选)，该类名用于页面的矩形元素，供骨架组件描绘出矩形的骨架块
- `u-skeleton-fillet`(可选)，该类名用于页面的矩形带圆角元素，供骨架组件描绘出矩形带圆角的骨架块

数据请求完成后，将`loading`设置为`false`，会隐藏骨架组件

```html
<template>
	<view>
		<view class="container u-skeleton">
			<view class="userinfo">
				<block>
					<!--u-skeleton-circle 绘制圆形-->
					<image class="userinfo-avatar u-skeleton-circle" :src="userInfo.avatarUrl"></image>
					<!--u-skeleton-fillet 绘制圆角矩形-->
					<text class="u-skeleton-fillet">{{userInfo.nickName}}</text>
				</block>
			</view>
			<view style="margin: 20px 0">
				<view v-for="(item,index) in lists" :key="index" class="lists">
					<!--u-skeleton-rect 绘制矩形-->
					<text class="u-skeleton-rect">{{item}}</text>
				</view>
			</view>
		</view>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 随意填充一些模拟数据，以撑开元素，供骨架组件查询和模拟块状数据
				userInfo: {
					avatarUrl: 'https://qlogo2.store.qq.com/qzone/1416956117/1416956117/100?1531323520',
					nickName: 'uView'
				},
				lists: [
					'君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。',
					'人生得意须尽欢，莫使金樽空对月',
					'天生我材必有用，千金散尽还复来',
				],
				loading: true, // 是否显示骨架屏组件
			}
		},
		onLoad() {
			// 通过延时模拟向后端请求数据，调隐藏骨架屏
			setTimeout(() => {
				this.loading = false;
			}, 2000)
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx 60rpx;
	}

	.userinfo {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.userinfo-avatar {
		width: 128rpx;
		height: 128rpx;
		margin: 20rpx;
		border-radius: 50%;
	}

	.lists {
		margin: 10px 0;
	}
</style>
```

### 加载中动画

设置`animation`为`true`，加载中的骨架块将会有一个动画效果，用以加强视觉效果。

```html
<u-skeleton :loading="true" :animation="true"></u-skeleton>
```

### 其他设置

- 通过`el-color`参数设置骨架块的背景颜色
- 通过`bg-color`参数设置整个骨架组件的背景颜色

```html
<u-skeleton :loading="true" el-color="#ddd" bg-color="#fff"></u-skeleton>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| el-color | 骨架块状元素的背景颜色  | String | #e5e5e5 | - |
| bg-color | 骨架组件背景颜色 | String  | #ffffff | - |
| animation | 骨架块是否显示动画效果 | Boolean  | false | true |
| border-radius | `u-skeleton-fillet`类名元素，对应的骨架块的圆角大小，单位rpx | String \| Number  | 10 | - |	
| loading | 是否显示骨架组件，请求完成后，将此值设置为`false` | Boolean  | true | false |

