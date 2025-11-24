## Grid 宫格布局 <to-api/>

<demo-model url="/pages/componentsC/grid/index"></demo-model>


宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件([badge](/components/badge.html))，或者图标等，也可以扩展为左右滑动的轮播形式。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 该组件外层为`u-grid`组件包裹，通过`col`设置内部宫格的列数
- 内部通过`ugrid-item`组件的`slot`设置宫格的内容
- 如果不需要宫格的边框，可以设置`border`为`false`

```html
<template>
	<u-grid :col="3">
		<u-grid-item>
			<u-icon name="photo" :size="46"></u-icon>
			<view class="grid-text">图片</view>
		</u-grid-item>
		<u-grid-item>
			<u-icon name="lock" :size="46"></u-icon>
			<view class="grid-text">锁头</view>
		</u-grid-item>
		<u-grid-item>
			<u-icon name="hourglass" :size="46"></u-icon>
			<view class="grid-text">沙漏</view>
		</u-grid-item>
	</u-grid>
</template>

<style scoped lang="scss">
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
```

### 给宫格设置右上角的角标和图标

可以通过uView的`badge`(注意Badge在此需要设置相关定位属性，详见[Badge](/components/badge.html))或者`image`设置宫格有右上角的内容

```html
<template>
	<u-grid :col="3">
		<u-grid-item>
			<u-badge count="9" :offset="[20, 20]"></u-badge>
			<u-icon name="photo" :size="46"></u-icon>
			<view class="grid-text">图片</view>
		</u-grid-item>
		<u-grid-item>
			<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
			<u-icon name="lock" :size="46"></u-icon>
			<view class="grid-text">锁头</view>
		</u-grid-item>
		<u-grid-item>
			<u-icon name="hourglass" :size="46"></u-icon>
			<view class="grid-text">沙漏</view>
		</u-grid-item>
	</u-grid>
</template>

<style scoped lang="scss">
	.badge-icon {
		position: absolute;
		top: 14rpx;
		right: 40rpx;
		width: 30rpx;
		height: 30rpx;
	}
	
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
```

### 实现宫格的左右滑动

结合uni的swiper组件可以实现宫格的左右滑动，因为`swiper`特性的关系，请指定`swiper`的高度 ，否则`swiper`的高度不会被内容撑开，可以自定义`swiper`的指示器，达到更高的灵活度

```html
<template>
	<swiper class="swiper" @change="change">
		<swiper-item>
			<u-grid :col="3" @click="click" hover-class="hover-class">
				<u-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<u-icon :name="item" :size="46"></u-icon>
					<text class="grid-text">{{ '宫格' + (index + 1) }}</text>
				</u-grid-item>
			</u-grid>
		</swiper-item>
		<swiper-item>
			<u-grid :col="3" @click="click">
				<u-grid-item v-for="(item, index) in list" :index="index + 9" :key="index">
					<u-icon :name="item" :size="46"></u-icon>
					<text class="grid-text">{{ '宫格' + (index + 1) }}</text>
				</u-grid-item>
			</u-grid>
		</swiper-item>
		<swiper-item>
			<u-grid :col="3" @click="click">
				<u-grid-item v-for="(item, index) in list" :index="index + 18" :key="index">
					<u-icon :name="item" :size="46"></u-icon>
					<text class="grid-text">{{ '宫格' + (index + 1) }}</text>
				</u-grid-item>
			</u-grid>
		</swiper-item>
	</swiper>
	<view class="indicator-dots" v-if="isSwiper">
		<view class="indicator-dots-item" :class="[current == 0 ? 'indicator-dots-active' : '']">
		</view>
		<view class="indicator-dots-item" :class="[current == 1 ? 'indicator-dots-active' : '']">
		</view>
		<view class="indicator-dots-item" :class="[current == 2 ? 'indicator-dots-active' : '']">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				list: ['integral', 'kefu-ermai', 'coupon', 'gift', 'scan', 'pause-circle', 'wifi', 'email', 'list']
			};
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			}
		}
	};
</script>

<style scoped lang="scss">
	/* 下方这些scss变量为uView内置变量，详见开发  组件-指南-内置样式 */

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
	
	.swiper {
		height: 480rpx;
	}
	
	.indicator-dots {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.indicator-dots-item {
		background-color: $u-tips-color;
		height: 6px;
		width: 6px;
		border-radius: 10px;
		margin: 0 3px;
	}
	
	.indicator-dots-active {
		background-color: $u-type-primary;
	}
</style>
```

### API

### Grid Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| col | 宫格的列数  | String \| Number | 3 | - |
| border | 是否显示宫格的边框  | Boolean	 | true | false |
| align | 宫格的对齐方式，用于控制只有一两个宫格时的对齐场景  | String | left | center / right |
| hover-class | 样式类名，按下时有效，样式必须写在根目录的`App.vue`或通过其引入的全局样式中才有效，`none`为无效果，作用于头部标题区域  | String | u-hover-class | none / 其他 |

### Grid-item Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| bg-color | 宫格的背景颜色  | String | #ffffff | - |
| index | 点击宫格时，返回的值  | String \| Number	 | - | - |
| custom-style | 自定义样式，对象形式 | Object | {padding: '30rpx 0'} | - |

### Grid Event

注意：请在`<u-grid></u-grid>`上监听此事件

|事件名|说明|回调参数|
|:-|:-|:-|
|click|点击宫格触发|index: `u-grid-item`通过`props`传递的`index`值|


### Grid-item Event

注意：请在`<u-grid-item></u-grid-item>`上监听此事件

|事件名|说明|回调参数|
|:-|:-|:-|
|click|点击宫格触发|index: `u-grid-item`通过`props`传递的`index`值|


<style scoped>
h3[id=grid-props] + table thead tr th:nth-child(2){
	width: 40%;
}
</style>