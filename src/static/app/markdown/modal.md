## Modal 模态框 <to-api/>

弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作。

<demo-model url="/pages/componentsA/modal/index"></demo-model>


### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用


默认情况下，模态框只有一个`确认`按钮：
- 请至少要配置弹框的内容参数`content`。
- 通过`v-model`绑定一个布尔变量来控制模态框的显示与否。

```html
<template>
	<view>
		<u-modal v-model="show" :content="content"></u-modal>
		<u-button @click="open">
			打开模态框
		</u-button>
	</view>
</template>
	
<script>
	export default {
		data() {	
			return {
				show: false,
				content: '东临碣石，以观沧海'
			}
		},
		methods: {
			open() {
				this.show = true;
			}
		}
	}
</script>
```

### 传入富文本内容

有时候我们需要给模态框的内容，不一定是纯文本的字符串，可能会需要换行，嵌入其他元素等，这时候我们可以使用`slot`功能，再结合uni-app`rictText`组件，
就能传入富文本内容了，如下演示：


```html
<template>
	<view>
		<u-modal v-model="show" :title-style="{color: 'red'}">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
		<u-button @click="open">
			打开模态框
		</u-button>
	</view>
</template>
	
<script>
	export default {
		data() {	
			return {
				show: false,
				content: `
					空山新雨后<br>
					天气晚来秋
				`
			}
		},
		methods: {
			open() {
				this.show = true;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.slot-content {
		font-size: 28rpx;
		color: $u-content-color;
		padding-left: 30rpx;
	}
</style>
```

### 异步关闭

异步关闭只对"确定"按钮起作用，需要设置`async-close`为`true`，当点击确定按钮的时候，按钮的文字变成一个loading动画，此动画的颜色为
`confirm-color`参数的颜色，同时Modal不会自动关闭，需要手动设置通过`v-model`绑定的变量为`false`来实现手动关闭。

```html
<template>
	<view class="">
		<u-modal v-model="show" @confirm="confirm" ref="uModal" :async-close="true"></u-modal>
		<u-button @click="showModal">弹起Modal</u-button>
	</view>
</template>

<script>
export default {
    data() {
        return {
			show: false
		}
	},
	onLoad: function(opt) {
		
	},
	methods:{
		showModal() {
			this.show = true;
		},
		confirm() {
			setTimeout(() => {
				// 3秒后自动关闭
				this.show = false;
				// 如果不想关闭，而单是清除loading状态，需要通过ref手动调用方法
				// this.$refs.uModal.clearLoading();
			}, 3000)
		}
    }
}
</script>
```

### 点击遮罩关闭

有时候我们不显示"关闭"按钮的时候，需要点击遮罩也可以关闭Modal，这时通过配置`mask-close-able`为`true`即可

```html
<u-modal v-model="show" :mask-close-able="true"></u-modal>
```

### 控制模态框宽度

可以通过设置`width`参数控制模态框的宽度，此值可以为数值(单位rpx)，百分比，`auto`等。


```html
<u-modal v-model="show" width="70%"></u-modal>
```


### 自定义样式

此组件有完善的自定义功能，可以配置标题，内容，按钮等样式(传入对象形式)，具体参数详见底部的API说明

```html
<u-modal v-model="show" :title-style="{color: 'red'}"></u-modal>
```


### 缩放效果

开启缩放效果，在打开和收起模态框的时候，会带有缩放效果，具体效果请见示例，此效果默认开启，通过`zoom`参数配置

```html
<u-modal v-model="show" :zoom="false"></u-modal>
```


### API

### Props

注意：需要给`modal`组件通过`v-model`绑定一个布尔值，来初始化`modal`的状态，随后该值被双向绑定。

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| show | 是否显示模态框，请赋值给`v-model` | Boolean  | false | true |
| z-index | 层级  | String \| Number | 1075 | - |
| title | 标题内容  | String | 提示 | - |
| width | 模态框宽度，数值时单位为rpx | String \| Number  | 600 | 百分比 / auto |
| content | 模态框内容，如传入`slot`内容，则此参数无效 | String  | 内容 | - |
| show-title | 是否显示标题 | Boolean  | true | false |
| show-confirm-button | 是否显示确认按钮 | Boolean  | true | false |
| show-cancel-button | 是否显示取消按钮 | Boolean  | false | true |
| confirm-text | 确认按钮的文字 | String  | 确认 | - |
| cancel-text | 取消按钮的文字 | String  | 取消 | - |
| cancel-color | 取消按钮的颜色 | String  | #606266 | - |
| confirm-color | 确认按钮的颜色 | String  | #2979ff | - |
| border-radius | 模态框圆角值，单位rpx | String \| Number  | 16 | - |
| title-style | 自定义标题样式，对象形式 | Object  | - | - |
| content-style | 自定义内容样式，对象形式 | Object  | - | - |
| cancel-style | 自定义取消按钮样式，对象形式 | Object  | - | - |
| confirm-style | 自定义确认按钮样式，对象形式 | Object  | - | - |
| zoom | 是否开启缩放模式 | Boolean  | true | false |
| async-close | 是否异步关闭，只对确定按钮有效，见上方说明 | Boolean  | false | true |
| mask-close-able | 是否允许点击遮罩关闭Modal | Boolean  | false | true |
| negative-top | 往上偏移的值，以避免可能弹出的键盘重合，单位任意，数值则默认为rpx单位  | String \| Number | 0 | - |


### Event

|事件名|说明|回调参数|
|:-|:-|:-|:-|
| confirm | 点击确认按钮时触发 | - |
| cancel | 点击取消按钮时触发 | - |


### Method

此方法需要通过ref调用，详见上方的"异步关闭"

|事件名|说明|
|:-|:-|:-|
| clearLoading | 异步控制时，通过调用此方法，可以不关闭Modal，而单是清除loading状态 |


### Slots

| 名称 | 说明 |
|:-|:-|
| default | 传入自定义内容，一般为富文本，见上方说明 |
| confirm-button | 传入自定义按钮，用于在微信小程序弹窗通过按钮授权的场景 |


<style scoped>
h3[id=slots] + table thead tr th:nth-child(2){
	width: 50%;
}

h3[id=method] + p + table thead tr th:nth-child(2){
	width: 50%;
}
</style>