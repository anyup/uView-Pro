## Input 输入框 <to-api/>

<!-- <demo-model url="/pages/componentsA/input/index"></demo-model> -->

此组件为一个输入框，默认没有边框和样式，是专门为配合表单组件[u-form](/components/form.html)而设计的，利用它可以快速实现表单验证，输入内容，下拉选择等功能。  

**注意：** 当您仅是需要一个输入框的话，可以考虑使用[u-field](/components/field.html)组件，而如果是一个表单组，比如有多个输入框一起，且需要验证功能的时候，
应该在`u-form`中嵌套`u-form-item`，再嵌套`u-input`去实现。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|


### 基本使用

- 通过`v-model`绑定输入框的值
- 通过`type`设置输入框的类型
- 通过`border`配置是否显示输入框的边框

```html
<template>
	<u-input v-model="value" :type="type" :border="border" />
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				type: 'text',
				border: true
			}
		}
	}
</script>
```


### 输入框的类型

综述：此组件通过配置`type`参数有两种形态：
1. 一是长文本内容输入的`textarea`类型。 
2. 二是类似普通输入框的`text`类型，在普通输入框时，由于HTML5或者小程序等一些特殊场景，此	`type`参数又可以设置为`text`、`number`、`idcard`、`digit`等值，
这些参数跟各个平台的兼容性有关，详见uni-app文档：[Input 组件](https://uniapp.dcloud.io/component/input)。


#### Textarea模式

此模式需要将`type`参数设置为`textarea`，有如下两个需要注意的参数：

- `auto-height`参数可以配置为`textarea`输入框的高度是否随着行数增加，而自动增加输入框的高度。
- `height`参数可以配置输入框的初始高度。

```html
<template>
	<u-input v-model="value" :type="type" :border="border" :height="height" :auto-height="autoHeight" />
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				type: 'textarea',
				border: true,
				height: 100,
				autoHeight: true,
			}
		}
	}
</script>
```

#### Text模式

将`type`设置为`text`，此种情况为一个单纯的输入框，但是还可以将其设置为`number`、`idcard`、`digit`等值，需要考虑兼容性，见上方说明。

```html
<template>
	<u-input v-model="value" :type="type" :border="border"  />
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				type: 'text',
				border: true,
			}
		},
	}
</script>
```


#### Password模式

`type`参数可以设置为`password`，此时输入内容将会用点替代：

- 如果设置`password-icon`设置为`true`，右侧将会出现一个可以切换密码与普通字符的图标。

```html
<template>
	<u-input v-model="value" :type="type" :border="border" :password-icon="passwordIcon" />
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				type: 'password',
				passwordIcon: true,
				border: true,
			}
		}
	}
</script>
```


#### Select下拉选择模式

如果将`type`设置为`select`，此时组件将会在外观上呈现出Select选择器的形态，主要体现在右侧多了一个下三角图标，但是此时组件并没有内置下拉的功能，
主要是考虑到移动端的特殊性和uView内置组件的关联性，因为想实现下拉选择，不同场景可能会使用不同的组件，比如uView的[Picker 选择器](/components/picker.html)、
[ActionSheet 操作菜单](/components/actionSheet.html)、[Select 列选择器](/components/select.html)等，您可以根据情况自由选择合适的组件做搭配。

- 以上说的可以配合的组件，它们都有一个共同的通过`v-model`绑定弹出与收起的参数，可以同时将此参数赋值给`Input`组件的`select-open`参数，
当此参数为`true`(也即`Select`选择器打开时)，右侧的下三角图标会翻转，为`false`时，恢复原位。
- 监听组件的`@click`事件，在此将绑定选择器的参数修改为`true`即可。

```html
<template>
	<view class="">
		<u-input v-model="value" :type="type" :border="border" @click="show = true" />
		<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				type: 'select',
				show: false,
				border: true,
				actionSheetList: [
					{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
					}
				],
			}
		},
		methods: {
			// 点击actionSheet回调
			actionSheetCallback(index) {
				this.value = this.actionSheetList[index].text;
			}
		}
	}
</script>
```


### API

### Props

| 参数                                     | 说明            | 类型            | 默认值             |  可选值   |
|----------------------------------------|---------------- |---------------|------------------ |-------- |
| type                                   | 模式选择，见上方说明  | String	 | text | select / password / textarea / number |
| clearable                              | 是否显示右侧的清除图标，type = select时无效 | Boolean | true | false |
| v-model                                | 用于双向绑定输入框的值 | - | - | - |
| input-align                            | 输入框文字的对齐方式  | String | left | center / right |
| placeholder                            | placeholder显示值  | String | 请输入内容 | - |
| disabled                               | 是否禁用输入框 | Boolean | false | true |
| maxlength                              | 输入框的最大可输入长度 | Number \| String | 140 | - |
| placeholder-style                      | placeholder的样式，字符串形式，如"color: red;" | String | "color: #c0c4cc;" | - |
| confirm-type                           | 设置键盘右下角按钮的文字，仅在`type`为`text`时生效  | String | done | - |
| custom-style                           | 自定义输入框的样式，对象形式  | Object | - | - |
| focus                                  | 是否自动获得焦点 | Boolean | false | true |
| fixed                                  | 如果`type`为`textarea`，且在一个"position:fixed"的区域，需要指明为`true` | Boolean | false | true |
| password-icon                          | `type`为`password`时，是否显示右侧的密码查看图标 | Boolean | true | false |
| border                                 | 是否显示边框 | Boolean | false | true |
| border-color                           | 输入框的边框颜色 | String | #dcdfe6 | - |
| auto-height                            | 是否自动增高输入区域，`type`为`textarea`时有效 | Boolean | true | false |
| height                                 | 高度，单位rpx | Number \| String | text类型时为70，textarea时为100 | - |
| cursor-spacing  | 指定光标与键盘的距离，单位**px** | Number \| String | 0 | - |
| selection-start | 光标起始位置，自动聚焦时有效，需与selection-end搭配使用 | Number \| String | -1 | - |
| selection-end   | 光标结束位置，自动聚焦时有效，需与selection-start搭配使用 | Number \| String | -1 | - |
| trim            | 是否自动去除两端的空格 | Boolean | true | false |
| show-confirmbar | 是否显示键盘上方带有”完成“按钮那一栏 | Boolean | true | false |
| adjust-position | 弹出键盘时是否自动调节高度 | Boolean | true | false |


<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 35%;
}
</style>
