## Radio 单选框 <to-api/>

<demo-model url="/pages/componentsB/radio/index"></demo-model>


单选框用于有一个选择，用户只能选择其中一个的场景。


### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 该组件需要搭配`radioGroup`组件使用，以便用户进行操作时，获得当前单选框组的选中情况，当然，您也可以单独对某个`radio`进行事件监听
- 通过`v-model`给`radioGroup`组件绑定一个变量，这个绑定的变量是双向的(初始值只能是`true`或者`false`)，也就是说，您可以无需监听`radio`或者`radioGroup`组件的`change`事件，也能知道哪个
被勾选了


**注意：** 由于`radio`组件需要由`radioGroup`组件提供参数值，这些父子组件间通过Vue的"provide/inject"特性注入依赖，
所以您必须使用`radioGroup`包裹`radio`组件才能正常使用。


```html
<template>
	<view class="">
		<u-radio-group v-model="value" @change="radioGroupChange">
			<u-radio 
				@change="radioChange" 
				v-for="(item, index) in list" :key="index" 
				:name="item.name"
				:disabled="item.disabled"
			>
				{{item.name}}
			</u-radio>
		</u-radio-group>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					name: 'apple',
					disabled: false
				},
				{
					name: 'banner',
					disabled: false
				},
				{
					name: 'orange',
					disabled: false
				}
			],
			// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
			value: 'orange',
		};
	},
	methods: {
		// 选中某个单选框时，由radio时触发
		radioChange(e) {
			// console.log(e);
		},
		// 选中任一radio时，由radio-group触发
		radioGroupChange(e) {
			// console.log(e);
		}
	}
};
</script>
```

### 禁用radio

设置`disabled`为`true`，即可禁用某个组件，让用户无法点击，禁用分为两种状态，一是未勾选前禁用，这时只显示一个灰色的区域。二是已勾选后
再禁用，会有灰色的勾选的图标，但此时依然是不可操作的。

```html
<u-radio-group v-model="value">
	<u-radio :disabled="true">明月几时有</u-radio>
</u-radio-group>
```

### 自定义形状

可以通过设置`shape`为`square`或者`circle`，将单选框设置为方形或者圆形


```html
<u-radio-group v-model="value">
	<u-radio shape="circle">月明人倚楼</u-radio>
</u-radio-group>
```


### 自定义颜色

此处所指的颜色，为`radio`选中时的背景颜色，参数为`active-color`


```html
<u-radio-group v-model="value">
	<u-radio active-color="red">思悠悠，恨悠悠，恨到归时方始休</u-radio>
</u-radio-group>
```


### 文本是否可点击

设置`label-disabled`为`true`，点击文本时，无法操作`radio`


```html
<u-radio-group v-model="value">
	<u-radio :label-disabled="false">门掩黄昏，无计留春住</u-radio>
</u-radio-group>
```


### API

### Radio Props

注意：`radio`和`radio-group`二者同名参数中，`radio`的参数优先级更高。

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| icon-size | 图标大小，单位rpx  | String \| Number | - | - |
| label-size | label字体大小，单位rpx  | String \| Number | - | - |
| name | `radio`组件的标示符  | String \| Number | - | - |
| shape | 形状，见上方说明 | String  | - | circle / square |
| disabled | 是否禁用 | Boolean  | - | false / true |
| label-disabled | 是否禁止点击文本操作`radio` | Boolean  | - | true / false |
| active-color | 选中时的颜色，如设置`radioGroup`的`active-color`将失效 | String  | - | - |



### radioGroup Props

注意：需要给`radioGroup`组件通过`v-model`绑定一个**变量**，来初始化`radio`的状态，随后该值被双向绑定，
当用户勾单选框时，该值在`radio`内部被修改为`name`值，并反映到父组件，换言之，您无需监听`radio`的`change`事件，也能知道哪个`radio`被选中了。

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| v-model | 被选中`radio`双向绑定的值，如果初始值为某一个`radio`的`name`，该`radio`将会默认被选中 | String \ Number | - | - |
| disabled | 是否禁用所有`radio`  | Boolean | false | true |
| label-disabled | 是否禁止点击文本操作`radio` | Boolean  | false | true |
| shape | 形状，见上方说明 | String  | circle | square |
| icon-size | 图标大小，单位rpx  | String \ Number | 20 | - |
| active-color | 选中时的颜色，应用到所有子`Radio`组件 | String  | #2979ff | - |
| size | radio组件整体的大小，单位rpx  | String \ Number | 34 | - |
| width | `radio`的宽度，需带单位，如`50%`，`150rpx` | String \| Number | auto | - |
| wrap | 是否每个`radio`占一行 | Boolean  | false | true |


### radio Event

|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
| change | 某个`radio`状态发生变化时触发(选中状态) | name: 通过`props`传递的`name`参数 | - |


### radioGroup Event

|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
| change | 任一个`radio`状态发生变化时触发 | name: 值为`radio`通过`props`传递的`name`值 | - |
