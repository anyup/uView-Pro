## Button 按钮 <to-api/>

<demo-model url="/pages/componentsC/button/index"></demo-model>


该组件内部实现以uni-app`button`组件为基础，进行二次封装，主要区别在于：
- 按钮`type`值有更多的主题颜色
- 有可选的按钮点击水波纹效果
- 按钮`size`值有更多的尺寸可选


1. 此组件内部使用uni-app`button`组件为基础，除了开头中所说的增加的功能，另外暴露出来的props属性和官方组件的属性完全一致，
uni-app`button`组件比较特殊，因为它有一些其他小程序平台的特定能力，请参考文档后面的参数列表，更详细说明请参uni-app方文档：  
[uni-app方button组件](https://uniapp.dcloud.io/component/button)  
2. 由于微信小程序的限制，在微信小程序中设置了`form-type`的`u-button`无法触发`form`组件的`submit`事件(H5和APP正常)，详见微信小程序文档[Bug & Tip部分](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)


### 平台差异说明

|  App  |  H5   | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 |
| :---: | :---: | :--------: | :----------: | :--------: | :--------: | :------: |
|   √   |   √   |     √      |      √       |     √      |     √      |    √     |

### 基本使用
文字内容通过`slot`传入

```html
<u-button>月落</u-button>
```

### 设置按钮的主题

`type`值可选的有`default`(默认)、`primary`、`success`、`info`、`warning`、`error`

```html
<u-button >默认按钮</u-button>
<u-button type="primary">主要按钮</u-button>
<u-button type="success">成功按钮</u-button>
<u-button type="info">信息按钮</u-button>
<u-button type="warning">警告按钮</u-button>
<u-button type="error">危险按钮</u-button>
```

### 设置按钮为半圆形  

`shape`默认值为`square`(按钮为圆角矩形)，设置为`circle`，则按钮两边为半圆形

```html
<u-button shape="square">乌啼</u-button>
```

### 设置尺寸

`button`组件的`size`（可选值为`default`(默认)，`mini`(小尺寸)和`medium`(中等尺寸)）

```html
<u-button size="default">江湖</u-button>
<u-button size="medium">夜雨</u-button>
<u-button size="mini">十年灯</u-button>
```

### 设置按钮的镂空状态

镂空状态按钮背景为白色，边框和文字同色，通过`plain`来设置

```html
<u-button plain>披荆</u-button>

<!-- 或者显式设置为true -->
<u-button :plain="true">斩棘</u-button>
```

### 设置点击按钮的水波纹效果

该效果通过给按钮绝对定位形式覆盖一个`view`，点击时改变`view`的`scale`，`opacity`样式属性，形成扩散再消失的水波纹效果。

```html
<u-button :ripple="true">十年</u-button>

<!-- 通过rippleBgColor设置水波纹的背景颜色 -->
<u-button :ripple="true" ripple-bg-color="#909399">之约</u-button>
```

### 如何修改按钮的样式

1. 针对非微信小程序平台，组件的根元素就是uni-app`button`组件，所以修改按钮的样式很容易，直接给组件定义`类名`或者嵌入`内联样式`即可。  
2. 如果是微信小程序，编译后页面会有组件同名的元素存在，导致样式传递有问题。 
3. 如果是为了修改按钮与其他元素之间的距离或者宽度等，可以给按钮外面套一个`view`元素，控制这个`view`与其他元素的距离或者宽度，即可达到同等效果。  

所以：我们提供了一个`custom-style`参数，推荐用户可以用对象形式传递样式给组件内部，注意驼峰命名。

```html
/* 以下形式在微信小程序会无效，APP和H5有效 */
<u-button class="custom-style">雪月夜</u-button>

<style scoped>
	.custom-style {
		color: #606266;
		width: 400rpx;
	}
</style>


/* 推荐如下 */
<u-button :custom-style="customStyle">雪月夜</u-button>

<script>
export default {
	data() {
		return {
			customStyle: {
				marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
				color: 'red'
			}
		};
	}
};
</script>
```


### 各家小程序开放能力的对接

uView已对接uni-app档关于[uni-app方button组件](https://uni-app.dcloud.io/component/button)的所有开放能力(截止2020-04-14)uni-app-app文档说明使用即可，如果有发现遗漏的地方，请加群反馈。

### API

### Props


| 属性名                 | 说明                                                                                                                                                           | 类型             | 默认值              | 可选值                                    | 平台差异说明                                    |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------- | :------------------ | :---------------------------------------- | :---------------------------------------------- |
| size                   | 按钮的大小                                                                                                                                                     | String           | default             | medium / mini                             | -                                               |
| ripple                 | 是否开启点击水波纹效果                                                                                                                                         | Boolean          | false               | true                                      | -                                               |
| ripple-bg-color        | 水波纹的背景色，ripple为true时有效                                                                                                                             | String           | rgba(0, 0, 0, 0.15) | -                                         | -                                               |
| type                   | 按钮的样式类型                                                                                                                                                 | String           | default             | primary / success / info/ warning / error | -                                               |
| plain                  | 按钮是否镂空，背景色透明                                                                                                                                       | Boolean          | false               | true                                      | -                                               |
| disabled               | 是否禁用                                                                                                                                                       | Boolean          | false               | true                                      | -                                               |
| hair-line              | 是否显示按钮的细边框                                                                                                                                           | Boolean          | true                | false                                     | -                                               |
| shape                  | 按钮外观形状，见上方说明                                                                                                                                       | String           | square              | circle                                    | -                                               |
| loading                | 按钮名称前是否带 loading 图标                                                                                                                                  | Boolean          | false               | true                                      | App-nvue 平台，在 ios 上为雪花，Android上为圆圈 |
| form-type              | 用于 `<form>` 组件，点击分别会触发 `<form>` 组件的 submit/reset 事件                                                                                           | String           | -                   | submit / reset                            | -                                               |
| open-type              | 开放能力                                                                                                                                                       | String           | 请参考uni-app方文档 | -                                         | -                                               |
| hover-class            | 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果                                                                                               | String           | button-hover        | -                                         | App-nvue 平台暂不支持                           |
| hover-start-time       | 按住后多久出现点击态，单位毫秒                                                                                                                                 | String \| Number | 20                  | -                                         | -                                               |
| hover-stay-time        | 手指松开后点击态保留时间，单位毫秒                                                                                                                             | String \| Number | 150                 | -                                         | -                                               |
| custom-style           | 对按钮的自定义样式，对象形式，见上方说明                                                                                                                       | Object           | -                   | -                                         | -                                               |
| app-parameter          | 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效                                                                                                      | Boolean          | false               | true                                      | 微信小程序、QQ小程序                            |
| hover-stop-propagation | 指定是否阻止本节点的祖先节点出现点击态                                                                                                                         | Boolean          | false               | true                                      | 微信小程序                                      |
| lang                   | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文                                                                                                | String           | en                  | zh_CN \ zh_TW                             | 微信小程序                                      |
| session-from           | 会话来源，open-type="contact"时有效                                                                                                                            | String           | -                   | -                                         | 微信小程序                                      |
| send-message-title     | 会话内消息卡片标题，open-type="contact"时有效                                                                                                                  | String           | 当前标题            | -                                         | 微信小程序                                      |
| send-message-path      | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效                                                                                                    | String           | 当前分享路径        | -                                         | 微信小程序                                      |
| send-message-img       | 会话内消息卡片图片，open-type="contact"时有效                                                                                                                  | String           | 当前页面截图        | -                                         | 微信小程序                                      |
| show-message-card      | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 | String           | -                   | -                                         | 微信小程序                                      |
| throttle-time          | 节流的时间间隔(一定时间内无论点击多少次，只会触发一次`click`事件)，单位ms，详见[节流防抖](/js/debounce.html)                                                   | String \| Number | 500                 | -                                         | -                                               |


### Events

**说明**：目前经测试(Hbuilder X 2.6.8)，在H5，APP，可以直接对组件监听`tap`事件，等同组件内部发出的`click`事件效果，某些HX版本上，
微信小程序对组件使用`tap`事件可能无效，故建议对按钮组件的点击事件监听统一使用组件内部发出的`click`事件。

| 属性名         | 说明                                                                                      | 类型    | 默认值     | 可选值 | 平台差异说明 |
| :------------- | :---------------------------------------------------------------------------------------- | :------ | :--------- | :----- | :----------- |
| click          | 按钮点击，请勿使用`@tap`点击事件，微信小程序无效，返回值为点击事件及参数                  | Handler | -          |
| getphonenumber | open-type="getPhoneNumber"时有效                                                          | Handler | 微信小程序 |
| getuserinfo    | 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo | Handler | 微信小程序 |
| error          | 当使用开放能力时，发生错误的回调                                                          | Handler | 微信小程序 |
| opensetting    | 在打开授权设置页并关闭后回调                                                              | Handler | 微信小程序 |
| launchapp      | 打开 APP 成功的回调                                                                       | Handler | 微信小程序 |
