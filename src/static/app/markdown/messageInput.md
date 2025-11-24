## MessageInput 验证码输入 <to-api/>

<demo-model url="/pages/componentsC/messageInput/index"></demo-model>


该组件一般用于验证用户短信验证码的场景，也可以结合uView的[键盘组件](/components/keyboard.html)使用

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`mode`参数模式，可取如下值：
- `box`(默认)-输入位置位一个方框
- `bottomLine`-底部显示一条横线
- `middleLine`-中部显示一条横线

```html
<u-message-input mode="bottomLine"></u-message-input>
```

### 设置最大长度和初始值

- 通过`maxlength`参数配置可输入的方框个数，如5位验证码，该值设置为5即可
- 如果需要显示默认值，请通过`value`参数配置

```html
<u-message-input maxlength="5" value="46821"></u-message-input>
```

### 是否自动获取焦点

如果需要一打开页面，就自动弹出键盘获取焦点，请配置`focus`值为true，否则需要用户手动点击输入区域才能唤起键盘

```html
<u-message-input :focus="true"></u-message-input>
```

### 配置呼吸灯效果

配置`breathe`为`true`，当前激活输入框的样式会有一个类似光标一闪一闪的由浅到深的效果

```html
<u-message-input :breathe="true"></u-message-input>
```

### 用"●"替代输入内容

`dot-fill`参数配置后，输入内容将不可见，用点替代，事件回调中会返回真实值

```html
<u-message-input :dot-fill="true"></u-message-input>
```


### 禁止唤起系统键盘

uView有[键盘](/components/keyboard.html)组件，如果您想结合键盘组件进行自定义的输入效果，就需要设置`disabled-keyboard`为`true`，来保证点击
输入框时不会触发系统自带的键盘，否则会造成冲突。

### 事件回调

- 每当输入内容发生改变，会回调一个`change`事件，内容为当前输入的字符串，如"395"
- 当输入的内容长度(字符个数)达到`maxlength`值后，会触发`finish`事件，同时也会触发`change`事件

```html
<template>
	<view>
		<u-message-input @change="change" @finish="finish"></u-message-input>
	</view>
</template>

<script>
	export default {
		methods: {
			change(e) {
				console.log('内容改变，当前值为：' + e);
			},
			finish(e) {
				console.log('输入结束，当前值为：' + e);
			},
		}
	}
</script>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| maxlength | 输入字符个数 | String \| Number | 4 | - |
| dot-fill | 是否用圆点填充  | Boolean | false | true |
| mode | 模式选择，见上方"基本使用"说明 | String | box | bottomLine / middleLine |
| value | 预置值 | String \| Number | - | - |
| breathe | 是否开启呼吸效果，见上方说明 | Boolean | true | false |
| focus | 是否自动获取焦点 | Boolean | false | true |
| bold | 字体和输入横线是否加粗 | Boolean | true | false |
| font-size | 字体大小，单位rpx | String \| Number | 60 | - |
| active-color | 当前激活输入框的样式 | String | #2979ff | - |
| inactive-color | 非激活输入框的样式，文字颜色同此值 | String | #606266 | - |
| width | 输入框的宽度(高等于宽)，单位rpx | String \| Number | 80 | - |
| disabled-keyboard | 禁止点击输入框唤起系统键盘 | Boolean  | false | true |

### Events

| 事件名 | 说明 | 回调参数 | 版本 |
| :- | :- | :- | :- |
| change | 输入内容发生改变时触发，具体见上方说明 | value：当前输入的值 | - |
| finish | 输入字符个数达`maxlength`值时触发，见上方说明 | value：当前输入的值 | - |

