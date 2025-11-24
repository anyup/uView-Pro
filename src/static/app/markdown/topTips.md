## TopTips 顶部提示 <to-api/>

<demo-model url="/pages/componentsA/topTips/index"></demo-model>


该组件一般用于页面顶部向下滑出一个提示，尔后自动收起的场景。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

该组件通过`ref`调用，使用简单，只需`title`参数设置显示的内容即可  

注意：不要在onLoad中调用，应在onReady生命周期调用，因为onLoad生命周期组件尚未创建完成

```html
<template>
	<u-top-tips ref="uTips"></u-top-tips>
</template>

<script>
	export default {
		onReady() {
			this.$refs.uTips.show({
				title: '铁马冰河入梦来',
				type: 'success',
				duration: '2300'
			})
		}
	}
</script>
```

### 自定义导航栏使用本组件的问题

**注意：** 只有使用了自定义导航栏才需要注意如下事项，否则无需在意，不用处理。

由于本组件是预先将组件隐藏于导航栏底部，调用时显示，内部已兼容处理H5，APP，小程序等的系统导航栏高度问题。  
但是如果您是使用了自定义导航栏的话，组件内部不知道您的自定义导航栏高度是多少，可能会显示有误，所以您需要传入一个`navbar-height`参数(**单位为px**)。  
需要注意的是，这个`navbar-height`参数是您自定义导航栏的整个高度，比如在APP和各家小程序上，是“导航栏”+“状态栏”的高度，H5中，“状态栏”无法自定义，高度为0。

:::tip 温馨提示
uView 有推出[Navbar 自定义导航栏](/components/navbar.html)组件，此组件有一个`height`参数(**单位px**，默认44)，这个高度是不包含状态栏的高度的，
所以您使用uView的自定义导航栏组件的话，您还需要通过"uni.getSystemInfoSync().statusBarHeight"(字节跳动小程序不支持)去获得状态栏的高度，
加上你需要的导航栏高度(也即uView的`navbar`组件的`height`)，即为需要传入`u-top-tips`组件的`navbar-height`参数值。
:::

使用uView自定导航栏可进行如下处理，如果是其他的UI框架的导航栏或者自己做的导航栏组件，请以此类推，也能不需要下面的处理。

```html
<template>
	<view class="wrap">
		<u-navbar title="文章列表"></u-navbar>
		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight"></u-top-tips>
		<u-button @click="showTips">弹出Tips</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
			statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
			// 导航栏内容区域高度，不包括状态栏高度在内
			navbarHeight: 44
		};
	},
	methods: {
		showTips() {
			this.$refs.uTips.show({
				title: '雨打梨花深闭门，忘了青春，误了青春'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}
</style>
```

### 主题设置

可以通过配置`type`参数设置显示的背景颜色：

- `type`值可选的有`primary`(默认)、`success`、`info`、`warning`、`error`


### 显示时间设置

- `duration`值设置显示的时间，单位ms：


### API

### Methods

需要注意的是，这里的参数是通过`ref`调用的，调用方法如上方"基本使用"中所示

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| title | 要显示的内容  | String | - | - |
| type | 主题选择  | String | primary | success / info / warning / error |
| duration | 显示的时间，单位ms |  String \| Number | - |


### Props

需要注意到是，这里的参数是需要通过`props`调用的，只有**使用了自定义导航栏**才需要配置，见上方说明。

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| navbar-height | 导航栏高度(包含状态栏高度在内)，单位<span style="color: red">PX</span>  | String \| Number | - | - |
| z-index | `z-index`值 | String \| Number | 975 | - |

