## VerificationCode 验证码倒计时 <to-api/>

<demo-model url="/pages/componentsA/verificationCode/index"></demo-model>


考虑到用户实际发送验证码的场景，可能是一个按钮，也可能是一段文字，提示语各有不同，所以本组件
不提供界面显示，只提供提示语，由用户将提示语嵌入到具体的场景

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

通过ref获取组件对象，再执行后面的操作，见下方示例。

1. 通过`seconds`设置需要倒计的秒数(默认`60`)
2. 通过ref调用组件内部的`start`方法，开始倒计时
3. 通过监听`change`事件(从开始到结束之间，每秒触发一次)获得提示的文字，可能值如"获取验证码|12秒后重新获取|重新获取"，可以自定义

注意：用户可能在倒计时的过程中点击获取验证码的按钮，组件内部提供了通过ref获取的`canGetCode`变量，在倒计时
过程中，该值为`false`，如果为`false`应该给予提示并不要再次向后端请求验证码，如果为`true`，则为获取验证码
之前，或者倒计结束之后，可以再次向后端请求验证码。

以下为完整示例，见如下： 

```html
<template>
	<view class="wrap">
		<u-toast ref="uToast"></u-toast>
		<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
		@change="codeChange"></u-verification-code>
		<u-button @tap="getCode">{{tips}}</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '',
				// refCode: null,
				seconds: 10,
			}
		},
		onReady() {
			// 注意这里不能将一个组件赋值给data的一个变量，否则在微信小程序会
			// 造成循环引用而报错，如果你想这样做，请在非data中定义refCode变量
			// this.refCode = this.$refs.uCode;
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				uni.$u.toast('倒计时结束');
			},
			start() {
				uni.$u.toast('倒计时开始');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 24rpx;
	}
</style>
```

### 自定义提示语

组件内部有内置的提示语，如获取验证码前的提示语为"获取验证码"，用户可以通过参数配置自定义的提示：
- 获取前，参数为`start-text`，默认值为"获取验证码"
- 倒计时期间，参数为`change-text`，默认为"X秒重新获取"，这里的"x"(大小写均可)，将会被倒计的秒数替代
- 倒计时结束，参数为`end-text`，默认值为"重新获取"


### 保持倒计时

一般情况下，在H5刷新浏览器，或者各端返回再进入时，倒计时会消失，导致用户可以再次尝试获取验证码，虽然后端还会对此进行进一步的判断。  
对于这种情况，uView给出了一个`keep-running`参数(默认为`false`)，为`true`的时候，即使刷新浏览器，或者返回上一个页面，
倒计时依然会继续(如果还在倒计时间内的话)。

**注意：** 如果您的一个页面或者多个页面同时使用了多个此组件，为了防止多个组件之间，保存在本地的多个继续倒计时的变量之间互相干扰，可以配置
各个组件的`unique-key`为一个不重复的字符串，以作区分：

```html
/* A.vue */
<u-verification-code unique-key="page-a"></u-verification-code>

/* B.vue */
<u-verification-code unique-key="page-b"></u-verification-code>
```


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| seconds | 倒计时所需的秒数  | Number \| String | 60 | - |
| start-text | 开始前的提示语，见上方说明  | String | 获取验证码 | - |
| change-text | 倒计时期间的提示语，必须带有字母"x"，见上方说明 | String  | X秒重新获取 | - |
| end-text | 倒计结束的提示语，见上方说明 | String  | 重新获取 | - |
| keep-running | 是否在H5刷新或各端返回再进入时继续倒计时 | Boolean  | false | true |
| unique-key | 多个组件之间继续倒计时的区分`key`，见上方说明 | String  | - | - |


### Methods

需要通过ref获取验证码组件才能调用，见上方"基本使用"说明


| 名称          | 说明            |
|-------------  |---------------- |
| start | 开始倒计时  |
| reset | 结束当前正在进行中的倒计时，设置组件为可以重新获取验证码的状态  |


### Event

|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
| change | 倒计时期间，每秒触发一次 | text: 当前剩余多少秒的状态，见上方说明 | - |
| start | 开始倒计时触发 | - | - |
| end | 结束倒计时触发 | - | - |



<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 35%;
}

h3[id=methods] + p + table thead tr th:nth-child(2){
	width: 60%;
}
</style>