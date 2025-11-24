## fullScreen 压窗屏

所谓压窗屏，是指遮罩能盖住原生导航栏和底部tabbar栏的弹窗，一般用于在APP端弹出升级应用弹框，或者其他需要增强型弹窗的场景。

<demo-model url="/pages/componentsA/fullScreen/index"></demo-model>


:::danger 警告
由于uni-app的Bug，在最新版的HX2.8.6(包括之前的多个版本)，此功能(组件)无效，等到uni-app修复此Bug时，我们会撤销此通告。
:::


:::tip 提示
这里的做法是在本页面打开一个新页面，同时在`pages.json`中配置本页面的背景为百分百透明，这样即可达到压窗效果。  
由于只有APP支持设置页面背景透明度，故只有APP支持本组件做法，非APP端不支持。
:::


### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|x|x|x|x|x|

### 基本使用

本组件只是提供参考思路和注意事项，因为每个人在弹窗需要实现的逻辑和样式都是不一样的，请参考本文档思路，自行实行相关功能。

首先，我们需要`pages.json`中声明一个页面用于弹窗：

```js
// pages.json

"pages": [
	{
		"path": "uview-pro/components/u-full-screen/u-full-screen",
		"style": {
			"navigationStyle": "custom",  // 取消本页面的导航栏
			"app-plus": {
				"animationType": "fade-in", // 设置fade-in淡入动画，为最合理的动画类型
				"background": "transparent", // 背景透明
				"backgroundColor": "rgba(0,0,0,0)", // 背景透明
				"popGesture": "none" // 关闭IOS屏幕左边滑动关闭当前页面的功能
			}
		}
	}
]
```

通过上面的配置，我们得到了一个页面：
- 这个页面去掉了导航栏
- 页面进入的时候，是采用淡入动画的形式
- 并且此页面的背景是百分比透明度，这样可以看到底层页面的内容
- 移除在iOS上左滑手势，避免本页被左滑关闭


### 触发压窗屏

我们在父页面(当前页面)通过路由方法，打开一个新页面(上面配置的压窗屏页面)，由于它是一个普通的页面，故可以通过常规方法传递参数。

```js
export default {
	onLoad() {
		// 也可以在onShow生命周期打开，此为uView封装的请求方法
		uni.$u.route("/uview-pro/components/u-full-screen/u-full-screen?id=1");
	}
}
```


### 定义压窗屏内容

当我们触发(打开)了压窗屏页面之后，将会有一个新的，背景透明的页面覆盖在本页面上，由于我们的终极目标就是要做一个弹窗，让其遮罩盖住"父页面"的导航栏和
Tabbar栏，所以这里我们可以使用uView的[Popup 弹出层](/components/popup.html)组件，并且将`popup`组件的`mode`参数设置`center`，即中部弹出的形式。

下方示例为打开一个[Modal 模态框](/components/modal.html)组件的示例，此组件内部用的也是`popup`组件。

```html
<template>
	<u-modal v-model="show" :show-cancel-button="true" confirm-text="升级"
		title="发现新版本" @cancel="cancel" @confirm="confirm"
	>
		<view class="u-update-content">
			<rich-text :nodes="content"></rich-text>
		</view>
	</u-modal>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				// 传递给uni-app"rich-text"组件的内容，可以使用"<br>"进行换行
				content: `
					1. 修复badge组件的size参数无效问题<br>
					2. 新增Modal模态框组件<br>
					3. 新增压窗屏组件，可以在APP上以弹窗的形式遮盖导航栏和底部tabbar<br>
					4. 修复键盘组件在微信小程序上遮罩无效的问题
				`,
			}
		},
		onReady() {
			this.show = true;
		},
		methods: {
			cancel() {
				this.closeModal();
			},
			confirm() {
				this.closeModal();
			},
			closeModal() {
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-full-content {
		background-color: #00C777;
	}
	
	.u-update-content {
		font-size: 26rpx;
		color: $u-content-color;
		line-height: 1.7;
		padding: 30rpx;
	}
</style>
```

上面有一个需要注意的点，我们打开"压窗"弹窗后，可能需要通过一些按钮来关闭弹窗，这里关闭弹窗的本质意义是关闭弹出的页面(压窗屏弹框)，所以用的是uni-app带的
关闭页面的接口`uni.navigateBack()`，见上方示例。


### 注意事项

由于压窗屏其实也是一个普通的页面的，当我们关闭弹窗(顶层页面)，"父页面"(上一个页面)就会显示出来，意味着会进入`onShow`生命周期，如有相关特定逻辑需要
处理，可关注此处。

由于弹窗打开的实际是一个页面，而不是一个组件，所以我们无法通过`props`的形式传递参数，有如下方式可以行进两个页面之间的通信：

- 父页面通过URL参数的形式将参数传递给弹窗
- 当弹窗内进行某些操作之后，可以通过`uni.$emit`的方式发送事件，父页面中通过`uni.$on`的形式接收事件和参数，达到通信的效果
- 通过Vuex的形式共享变量
