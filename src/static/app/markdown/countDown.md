## CountDown 倒计时 <to-api/>

<demo-model url="/pages/componentsC/countDown/index"></demo-model>


该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`timestamp`参数设置倒计时间，单位为`秒`

```html
<template>
	<u-count-down :timestamp="timestamp"></u-count-down>
</template>

<script>
	export default {
		data() {
			timestamp: 86400,
		}
	}
</script>
```

### 设置是否显示天，时，分，秒

说明：参数的配置原则应该是"自右向左"的，设置了"时"，它右边的"分"和"秒"也应该设置为`true`

- `show-days`，`show-hours`，`show-minutes`，`show-seconds`等参数默认为`true`，分别对应是否显示倒计时的"天"，"时"，"分"，"秒"。

该示例表示只显示倒计时的分和秒

```html
<u-count-down :timestamp="86400" :show-days="false" :show-hours="false"></u-count-down>
```

### 倒计时分隔符

通过配置`separator`参数为`colon`或者`zh`来区分分隔符。`separator-size`配置分隔符的大小，单位rpx。`separator-color`配置分隔符的颜色
`separator`可选值如下：
- `colon`(默认)时显示为冒号，如：23:14:51
- `zh`时显示为中文，如：23时14分51秒

```html
<u-count-down :timestamp="86400" separator="colon" separator-size="28" separator-color="#606266"></u-count-down>
```

### 倒计时样式

- 通过`color`设置倒计数字的颜色
- `font-size`设置倒计数字的大小，重申一次：uView中，所有`font-size`，`width`，`height`，`padding`，`margin`等props参数
的单位默认都是`rpx`，特别说明除外(极少数场景会要求px单位)。关于`rpx`单位的说明，请参考uni官方文档：[尺寸单位](https://uniapp.dcloud.io/frame?id=%e5%b0%ba%e5%af%b8%e5%8d%95%e4%bd%8d)
- `show-border`参数设置倒计数字是否添加边框，`border-color`参数设置边框的颜色

```html
<u-count-down :timestamp="86400" :show-border="true" font-size="28" color="#606266" border-color="#909399"></u-count-down>
```

### 倒计时执行的时机

通过`autoplay`配置倒计时是否在组件的`mounted`生命周期进行初始化(在`timestamp`有值前提下)，如果设置`autoplay`为`false`，就需要手动通过
`refs`的形式通知倒计时开始执行，调用的是组件内部的`start()`方法

```html
<template>
	<u-count-down ref="uCountDown" :timestamp="86400" :autoplay="false"></u-count-down>
</template>

<script>
	export default {
		onLoad() {
			setTimeout(() => {
				this.$refs.uCountDown.start();
			}, 2000)
		}
	}
</script>
```


### 如何获取当前倒计的秒数

有时候我们可会需要记录当前剩余的秒数，并在某个时机重新触发，可以通过如下两个方式实现：

- 监听`change`事件，在回调中获得当前剩余的秒数
- 通过ref调用，获取内部的`seconds`参数即为当前剩余的秒数


```html
<template>
	<u-count-down ref="uCountDown" :timestamp="timestamp" @change="change"></u-count-down>
</template>

<script>
	export default {
		data() {
			return {
				timestamp: 86400
			}
		},
		methods: {
			// 事件触发，每秒一次
			change(timestamp) {
				console.log(timestamp);
			},
			// ref形式获取内部的值
			getSeconds() {
				console.log(this.$refs.uCountDown.seconds);
			}
		}
	}
</script>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| timestamp | 倒计时，单位为秒 | String \| Number | 0 | - |
| autoplay | 是否自动开始倒计时，如果为`false`，需手动调用开始方法。见上方说明  | Boolean | true | false |
| separator | 分隔符，`colon`为英文冒号，`zh`为中文 | String  | colon | zh |
| separator-size | 分隔符的字体大小，单位rpx | String \| Number  | 30 | - |
| separator-color | 分隔符的颜色 | String  | #303133 | - |
| font-size | 倒计时字体大小，单位rpx | String \| Number  | 30 | - |
| show-border | 是否显示倒计时数字的边框 | Boolean | false | true |
| border-color | 数字边框的颜色 | String  | #303133 | - |
| bg-color | 倒计时数字的背景颜色 | String  | #ffffff | - |
| color | 倒计时数字的颜色 | String  | #303133 | - |
| height | 数字高度值(宽度等同此值)，设置边框时看情况是否需要设置此值，单位rpx | String  | auto | - |
| show-days | 是否显示倒计时的"天"部分 | Boolean  | true | false |
| show-hours | 是否显示倒计时的"时"部分 | Boolean  | true | false |
| show-minutes | 是否显示倒计时的"分"部分 | Boolean  | true | false |
| show-seconds | 是否显示倒计时的"秒"部分 | Boolean  | true | false |
| hide-zero-day | 当"天"的部分为0时，隐藏该字段 | Boolean  | true | false |


### Events

|事件名|说明|回调参数|
|:-|:-|:-|
|end|倒计时结束|-|
|change|倒计过程中，每秒触发一次|timestamp: 当前剩余的倒计秒数|



### Methods

需要通过ref获取倒计时组件才能调用，见上方"倒计时执行的时机"说明

| 名称          | 说明            |
|-------------  |---------------- |
| start | 开始倒计时  |
