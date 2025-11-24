## ActionSheet 操作菜单 <to-api/>

<demo-model url="/pages/componentsC/actionSheet/index"></demo-model>

本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。  
本组件功能类似于uni的`uni.showActionSheet`API，配置更加灵活，所有平台都表现一致。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用


- 通过`list`设置需要显示的菜单，该值为一个数组，元素为对象，对象至少要提供`text`属性，另外可选的有`fontSize`(字体大小)，`color`(颜色)，`disabled`(是否禁用，1.5.6引入)，
`subText`(描述信息，1.6.8引入) 
- 通过`v-model`绑定一个值为布尔值的变量控制组件的弹出与收起，`v-model`的值是双向绑定的

```html
<template>
	<view>
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
		<u-button @click="show = true">打开ActionSheet</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28,
					subText: '感谢您的点赞'
				}, {
					text: '分享'
				}, {
					text: '评论' 
				}],
				show: false
			}
		}
	}
</script>
```

### 配置顶部的提示信息和底部取消按钮

- `tips`参数为一个对象类型，属性可以设置`text`，`fontSize`(字体大小)，`color`(颜色)，文本内容将会显示组件的上方，起提示作用。
- `cancel-btn`参数配置是否显示底部的取消按钮，默认显示

```html
<template>
	<u-action-sheet :list="list" v-model="show" :tips="tips" :cancel-btn="true"></u-action-sheet>
</template>

<script>
	export default {
		data() {
			return {
				tips: {
					text: '在水一方',
					color: '#909399',
					fontSize: 24
				},
				list: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				}],
				show: true
			}
		}
	}
</script>
```

### 如何知道点了第几项

`click`回调事件带有一个`index`值，这个索引值为传递的`list`数组的索引值，根据回调事件，能获得点击了
第几项和该项的内容


```html
<template>
	<u-action-sheet :list="list" @click="click" v-model="show"></u-action-sheet>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				}, {
					text: '分享'
				}, {
					text: '评论'
				}],
				show: true
			}
		},
		methods: {
			click(index) {
				console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`)
			}
		}
	}
</script>
```


### API

### Props

注意：props中没有控制组件弹出与收起的参数，因为这是通过v-model绑定变量实现的，见上方说明。

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| list | 按钮的文字数组，见上方文档示例  | Array\<Object\>	 | [ ] | - |
| tips | 顶部的提示文字，见上方文档示例 | Object  | - | - |
| cancel-btn | 是否显示底部的取消按钮 | Boolean  | true | false |
| border-radius | 弹出部分顶部左右的圆角值，单位rpx | Number \ String  | 0 | - |
| mask-close-able | 点击遮罩是否可以关闭 | Boolean  | true | false |
| safe-area-inset-bottom | 是否开启[底部安全区适配](/components/safeAreaInset.html#关于uview某些组件safe-area-inset参数的说明) | Boolean  | false | true |
| z-index | `z-index`值 | Number \ String  | 1075 | - |
| cancel-text | 取消按钮的提示文字 | String  | 取消 | - |


### Event

|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
| click | 点击ActionSheet列表项时触发 | index: 点击了第几个，从0开始 | - |
| close | 点击取消按钮时触发 | - | - |

