## Popup 弹出层 <to-api/>

<demo-model url="/pages/componentsC/popup/index"></demo-model>


弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用


- 弹出层的内容通过`slot`传入，由用户自定义
- 通过`v-model`绑定一个布尔值的变量控制弹出层的打开和收起


```html
<template>
	<view>
		<u-popup v-model="show">
			<view>出淤泥而不染，濯清涟而不妖</view>
		</u-popup>
		<u-button @click="show = true">打开</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
		}
	}
</script>
```

### 设置弹出层的方向

- 可以通过`mode`参数设置，可以设置为`left`、`top`、`right`、`bottom`、`center`

```html
<template>
	<u-popup v-model="show" mode="top">
		<view>
			人生若只如初见，何事秋风悲画扇
		</view>
	</u-popup>
</template>
```

### 设置弹出层的圆角

可以给`border-radius`设置一个值来给弹窗增加圆角，单位rpx。

```html
<template>
	<u-popup v-model="show" mode="top" border-radius="14">
		<view>
			人生若只如初见，何事秋风悲画扇
		</view>
	</u-popup>
</template>
```


### 控制弹窗的宽度 | 高度

这里说的宽度，指的是左边，右边，中部弹出的场景，高度指的是顶部和底部弹出的场景(因为这两个场景宽度都是100%)。  
uView提供了`length`来控制此种情况，此值可以是`数值`(单位rpx)，`auto`，`百分比`等，内部会自动处理对应的逻辑。
如果为`auto`的时候，表示弹窗的宽度 | 高度由内容撑开。

**1.3.7版本新增`width`和`height`参数：**

1.3.7版本后，优先推荐`width`和`height`参数，并且优先级会高于`length`，这3个参数都可以设置`百分比`、`auto`、`数值`(单位rpx)、或者是带`px`和`rpx`单位的字符串：

- `width`只对`mode = left | center | right`模式有效
- `height`只对`mode = top | center | bottom`模式有效

:::tip 提示
1.3.7版本后，内置了`scroll-view`元素，内如内容超出容器的高度，将会自动获得**垂直**滚动的特性，如果您因为在`slot`内容做了滚动的处理，而造成了
冲突的话，请移除自定义关于滚动部分的逻辑。
:::


```html
<template>
	<u-popup v-model="show" mode="top" length="60%">
		<view>
			等闲变却故人心，却道故人心易变
		</view>
	</u-popup>
	
	<u-popup v-model="show" mode="center" width="500rpx" height="600px">
		<view>
			骊山语罢清宵半，泪雨霖铃终不怨
		</view>
	</u-popup>
</template>
```

### 内容局部滚动

如果您需要让弹窗中的内容局部滚动，局部固定，比如商城底部弹出SKU选择的场景，可以按如下思路进行处理： 

1. 在弹窗内容中放一个`scroll-view`组件，设置为竖向滚动，并指定高度(必须)
2. 在`scroll-view`组件下方放一块无需滚动内容，如下：

```html
<template>
	<view class="">
		<u-button @click="show = true;">打开弹窗</u-button>
		<u-popup mode="bottom" v-model="show">
			<view class="content">
				<scroll-view scroll-y="true" style="height: 300rpx;">
					<view>
						<view v-for="index in 20" :key="index">
							第{{index}}个Item
						</view>
					</view>
				</scroll-view>
				<view class="confrim-btn">
					<u-button @click="show = false;">确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 24rpx;
		text-align: center;
	}
</style>
```


### API

### Props

注意：props中没有控制弹窗打开与收起的参数，因为这是通过v-model绑定变量实现的，见上方说明。

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| mode | 弹出方向  | String	 | left | top / right / bottom / center |
| mask | 是否显示遮罩  | Boolean | true | false |
| length | mode=left \| 见上方说明 | String \| Number | auto | - |
| zoom | 是否开启缩放动画，只在`mode`为`center`时有效  | Boolean | true | false |
| safe-area-inset-bottom | 是否开启[底部安全区适配](/components/safeAreaInset.html#关于uview某些组件safe-area-inset参数的说明) | Boolean  | false | true |
| mask-close-able | 点击遮罩是否可以关闭弹出层  | Boolean | true | false |
| custom-style | 用户自定义样式  | Object | - | - |
| border-radius | 弹窗圆角值  | Number \| String | 0 | - |
| z-index | 弹出内容的`z-index`值  | Number \| String | 10075 | - |
| closeable | 是否显示关闭图标  | Boolean | false | true |
| close-icon | 关闭图标的名称，只能uView的内置图标  | String | close | - |
| close-icon-pos | 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角  | String | top-right | top-left / bottom-left / bottom-right |
| close-icon-color | 关闭图标的颜色  | String | #909399 | - |
| close-icon-size | 关闭图标的大小，单位rpx  | String \| Number | 30 | - |
| width  | mode = left \| center \| right时有效，优先级高于`length`  | String \| Number | - | - |
| height  | mode = top \| center \| bottom时有效，优先级高于`length`  | String \| Number | - | - |
| negative-top | 中部弹出时，以避免可能弹出的键盘重合，往上偏移的值，单位任意，数值则默认为rpx单位  | String \| Number | 0 | - |
| mask-custom-style | 遮罩自定义样式，一般用于修改遮罩透明度对象形式，如：{background: 'rgba(0, 0, 0, 0.5)'}  | Object | - | - |
| duration  | 遮罩打开或收起的动画过渡时间，单位ms | String \| Number | 250 | - |


### Event

|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
| open | 弹出层打开 | - | - |
| close | 弹出层收起 | - | - |
