## AlertTips 警告提示 <to-api/>

<demo-model url="/pages/componentsC/alertTips/index"></demo-model>

警告提示，展现需要关注的信息。

### 使用场景

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`title`和`description`设置组件的标题和描述内容，如果内容和标题同时存在，标题字体会被加粗加大
- 通过`type`设置主题类型，有`primary`,`success`,`error`,`warning`,`info`可选值

```html
<template>
	<u-alert-tips type="warning" :title="title" :description="description"></u-alert-tips>
</template>

<script>
	export default {
		data() {
			title: '登高望远',
			description: '欲穷千里目，更上一层楼'
		}
	}
</script>
```

### 图标

通过`show-icon`设置是否显示图标，作用是让信息类型更加醒目。

**注意**：当前版本图标为uView内置图标，根据`type`参数显示不同的图标，无法自定义。

```html
<u-alert-tips type="warning" :show-icon="true"></u-alert-tips>
```

### 可关闭的警告提示

显示关闭按钮，点击可关闭警告提示。
- `close-text`参数配置关闭的文字，默认为一个叉的icon图标。`close-able`为`true`时有效
- `close-able`参数配置是否允许关闭的文字或图标

::: warning 注意
由于`props`传参的限制，您需要监听组件的`close`事件，并在此此事件中设置`show`参数为`false`，才能关闭组件。
:::

```html
<template>
	<u-alert-tips :show="show" type="error" @close="show = false" :title="title" :close-able="true"></u-alert-tips>
	
	<u-alert-tips type="error" :title="title" close-text="close" :description="description" :close-able="true"></u-alert-tips>
</template>

<script>
	export default {
		data() {
			title: '寻隐者不遇',
			description: '松下问童子，言师采药去。只在此山中，云深不知处。',
			show: true
		}
	}
</script>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| title | 显示的文字  | String | - | - |
| description | 辅助性文字，颜色比`title`浅一点，字号也小一点，可选 | String  | - | - |
| close-able | 关闭按钮(默认为叉号icon图标) | Boolean  | false | true |
| type | 使用预设的颜色 | String  | warning | success / primary / error / info |
| close-text | 用文字替代关闭图标，`close-able`为`true`时有效 | String  | - | - |
| show-icon | 是否显示左边的辅助图标 | Boolean  | false | true |
| show | 显示或隐藏组件 | Boolean  | true | false |
| icon | 左侧的图标名称，如设置`type`和`show-icon`值，会有一个默认的图标 | String  | - | - |
| icon-style | 自定义图标的样式，对象形式 | Object  | - | - |
| title-style | 自定义标题的样式，对象形式 | Object  | - | - |
| desc-style | 自定义内容的样式，对象形式 | Object  | - | - |

### Events

|事件名|说明|回调参数|
|:-|:-|:-|
|close|点击关闭按钮时触发，需在此回调设置`show`为`false`|-|
|click|点击组件时触发|-|