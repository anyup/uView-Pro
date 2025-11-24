## Select 列选择器 <to-api/>

<demo-model url="/pages/componentsA/select/index"></demo-model>


此选择器用于单列，多列，多列联动的选择场景。

**注意：** 从`1.3.0`版本起，不建议使用`Picker`组件的单列和多列模式，`Select`组件是专门为列选择而构造的组件，更简单易用。


### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|


### 基本使用


所有的配置模式中，都要求传入数组的元素(对象)中含有`value`和`label`属性(可以通过`value-name`和`label-name`参数自定义)，
`value`用于在回调时，区别选择了哪一个(针对开发者)，`label`用于展示在选择器中，供用户选择和查看(针对用户)。


- 通过v-model绑定一个布尔值变量，用于控制组件的弹出与收起。
- 组件共有3种模式，通过配置`mode`参数实现，如下：

1. mode = single-column，为单列选择模式。
2. mode = mutil-column，为多列选择模式。
3. mode = mutil-column-auto，为多列联动模式，多列联动的数据格式比较特殊，见下方说明。


```html
<template>
	<view>
		<u-select v-model="show" :list="list"></u-select>
		<u-button @click="show = true">打开</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				list: [
					{
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}
				],
			}
		}
	}
</script>
```


### 单列模式

此方式使用较为简单，需要传入一个一维数组，数组的元素为对象，要求必须有`value`和`label`属性，这两个值也将会在回调中被返回。

```html
<template>
	<u-select v-model="show" mode="single-column" :list="list" @confirm="confirm"></u-select>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				list: [
					{
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}
				],
			}
		},
		methods: {
			// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
			confirm(e) {
				console.log(e);
			}
		}
	}
</script>
```


### 多列模式

此模式类似于单列模式，不同之处在于`list`参数为二维数组，同样要求数组的元素必须要有`value`和`label`属性，回调参数为包含多个元素的数组，
分别表示每一列的选择情况。

```html
<template>
	<u-select v-model="show" mode="mutil-column" :list="list" @confirm="confirm"></u-select>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				list: [
					[
						{
							value: '1',
							label: '江'
						},
						{
							value: '2',
							label: '湖'
						}
					],
					[
						{
							value: '3',
							label: '夜'
						},
						{
							value: '4',
							label: '雨'
						}
					],
					
				],
			}
		},
		methods: {
			// 回调参数为包含多个元素的数组，每个元素分别反应每一列的选择情况
			confirm(e) {
				console.log(e);
			}
		}
	}
</script>
```


### 多列联动模式

由于需要多列联动，此模式和上面的"多列模式"基本相同，但是也有区别的地方，因为需要"联动"，需要在每个对象中多一个`children`属性，用于标识
它的子列(后一列)的可选值，回调参数和"多列模式"一致。

```html
<template>
	<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				list: [
					{
						value: 1,
						label: '中国',
						children: [
							{
								value: 2,
								label: '广东',
								children: [
									{
										value: 3,
										label: '深圳'
									},
									{
										value: 4,
										label: '广州'
									}
								]
							},
							{
								value: 5,
								label: '广西',
								children: [
									{
										value: 6,
										label: '南宁'
									},
									{
										value: 7,
										label: '桂林'
									}
								]
							}
						]
					},
					{
						value: 8,
						label: '美国',
						children: [
							{
								value: 9,
								label: '纽约',
								children: [
									{
										value: 10,
										label: '皇后街区'
									}
								]
							}
						]
					}
				]
			}
		},
		methods: {
			confirm(e) {
				console.log(e);
			}
		}
	}
</script>
```


### 默认值

此组件的所有模式，都可以设置默认值，通过`default-value`数组参数配置，数组元素的0表示选中每列的哪个值(从0开始)，下面分别对几种模式进行说明：  

**注意：** `default-value`数组的长度，必须与列数相同，否则无效。

1. 单列模式

如设置`default-value`为`[1]`表示默认选中第2个(从0开始)，`[5]`表示选中第6个。


2. 多列模式

如设置`default-value`为`[1, 3]`表示第一列默认选中第2个，第二列默认选中第4个。


3. 多列联动模式

配置方法同"多列模式"，见上。

<br>

### 回调参数

**注意：** 如果您觉得回调的`value`和`label`属性还无法满足您的需求，您可以在传递给`list`的参数中多带一个`extra`属性，如果有此属性，
在回调中将会多返回一个`extra`属性值(1.3.6新增)。

1. 单列模式

此模式点击`确定`或`取消`按钮，会返回一个只有一个元素的数组，此元素即为回调结果，数组内容可能如下：  

```js
res = [
	{
		label: '雪月夜',
		value: '1',
		// 如果传递给"list"的对象中有extra属性，将会在此返回
		// extra: 'xxx'
	}
]
```

2. 多列模式

此模式点击`确定`或`取消`按钮，会返回一个有多个元素的数组，元素的数量和列数相等，第0个元素(索引从0开始)与第一列(也可以认为是第0列)相匹配，以此类推，
返回结果可能如下：

```js
res = [
	{
		label: '雪月夜',
		value: '1'
	},
	{
		label: '冷夜雨',
		value: '2'
	},
]
```


3. 多列联动

返回结果同上方的"多列模式"。


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| mode | 模式选择，"single-column"-单列模式，"mutil-column"-多列模式，"mutil-column-auto"-多列联动模式  | String	 | single-column | mutil-column / mutil-column-auto |
| list | 列数据，数组形式，见上方说明 | Array | - | - |
| v-model | 布尔值变量，用于控制选择器的弹出与收起 | Boolean | false | true |
| safe-area-inset-bottom | 是否开启[底部安全区适配](/components/safeAreaInset.html#关于uview某些组件safe-area-inset参数的说明) | Boolean  | false | true |
| cancel-color | 取消按钮的颜色  | String | #606266 | - |
| confirm-color | 确认按钮的颜色  | String | #2979ff | - |
| default-value | 提供的默认选中的下标，见上方说明  | Array | - | - |
| mask-close-able | 是否允许通过点击遮罩关闭Picker  | Boolean | true | false |
| z-index | 弹出时的`z-index`值 | String \| Number | 10075 | - |
| value-name | 自定义`list`数据的`value`属性名 | String | value | - |
| label-name | 自定义`list`数据的`label`属性名 | String | label | - |
| child-name | 自定义`list`数据的`children`属性名，只对多列联动模式有效 | String | children | - |
| title | 顶部中间的标题 | String | - | - |
| confirm-text  | 确认按钮的文字 | String | 确认 | - |
| cancel-text  | 取消按钮的文字 | String | 取消 | - |


### Events

|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
| confirm | 点击确定按钮，返回当前选择的值 | Array: 见上方"回调参数"部分说明 | - |
| cancel | 点击取消按钮，返回当前选择的值 | Array: 见上方"回调参数"部分说明 | - |



<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 30%;
}
</style>
