export const apis = `
# Picker 选择器

此选择器有四种弹出模式

1. 一是时间模式，可以配置年，日，月，时，分，秒参数
2. 二是地区模式，可以配置省，市，区参数
3. 三是单列模式
4. 四是多列模式

> 不再建议使用此组件的单列和多列模式，因为已经有更友好，简单易用，专门用于处理列选择的[Select 列选择器](/zh/components/select.html)组件，
> 以后此组件将专注于时间和地区的选择。



## 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

## 基本使用


- 通过\`mode\`参数设置为\`time\`、\`region\`、\`selector\`、\`multiSelector\`，区分时间、地区、单列，多列模式。
- 通过v-model双向绑定一个值为布尔值的变量，来打开或者收起picker。

\`\`\`html
<template>
	<view>
		<u-picker v-model="show" mode="time"></u-picker>
		<u-button @click="show = true">打开</u-button>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义响应式数据
const show = ref<boolean>(false)
</script>
\`\`\`

## 一、时间和地区模式

### 1. 设置默认值

- 如果\`mode\`为\`time\`，可以通过\`default-time\`参数设置打开时的默认时间，格式如"2025-07-02 13:01:00"、"2025-07-02 13:01"
- 如果\`mode\`为\`region\`，可以通过\`default-region\`(Array格式)中文的省市区名称，如：\`["河北省", "秦皇岛市", "北戴河区"]\`，或者代号的
省市区，如：\`["13", "1303", "130304"]\`。


**注意**：这些省市区的名称和代码，须是uView的\`Picker\`组件自身提供的，否则可能无法匹配

\`\`\`html
<template>
	<u-picker mode="time" v-model="show"></u-picker>
	
	<u-picker mode="region" v-model="show" :area-code='["13", "1303", "130304"]'></u-picker>
</template>
\`\`\`

### 2. 设置需要显示的参数

- 时间模式时：通过\`params\`参数传入一个对象给组件，给需要显示的参数属性置为\`true\`，可选的参数有：\`year\`、\`month\`、\`day\`、\`hour\`、\`minute\`、\`second\`。
其中，\`hour\`、\`minute\`、\`second\`值默认为\`false\`，其他值默认为\`true\`
- 地区模式时：可选的参数有：\`province\`、\`city\`、\`area\`，默认都为\`true\`

下方示例时间模式，只会显示年，月，日3个参数可供选择：

\`\`\`html
<template>
	<u-picker mode="time" v-model="show" :params="params"></u-picker>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 定义响应式数据
const show = ref<boolean>(false)

// 定义响应式参数对象
const params = reactive({
	year: true,
	month: true,
	day: true,
	hour: false,
	minute: false,
	second: false
})
</script>
\`\`\`

### 3. 回调参数

当点击\`picker\`的"取消"或者"确定"按钮时，会分别产生回调事件\`cancel\`和\`confirm\`，均为会返回组件内部的当前值。回调的参数为一个对象，属性和传递给\`picker\`组件的\`params\`对象为\`true\`的属性一致。   

注意：\`mode\`为\`region\`时，回调对象属性为一个对象，分别有\`label\`和\`value\`属性，见如下说明：

\`\`\`js
// 组件内部parmas参数默认值：
let params = {
	year: true,
	month: true,
	day: true,
	hour: false,
	minute: false,
	second: false,
	province: true,
	city: true,
	area: true,
	timestamp: true,
}


// 如果params值如下(时间选择模式)：：
let params = {
	year: true,
	month: true,
	day: true,
	hour: false,
	minute: false,
	second: false,
	// 选择时间的时间戳
	timestamp: true,
}

// 那么回调的参数可能如下：
{
	year: '2020',
	month: '05',
	day: '10'
}


// 如果params值如下(地区选择模式)：
let params = {
	province: true,
	city: true,
	area: true
}

// 那么回调的参数可能如下：
{
	area: {
		label: "宝安区",
		value: "440306"
	},
	city: {
		label: "深圳市",
		value: "4403"
	},
	province: {
		label: "广东省",
		value: "44"
	},
}
\`\`\`

## 二、单列和多列模式

**不再建议使用此组件的单列和多列模式，因为已经有更友好，简单易用，专门用于处理列选择的[Select 列选择器](/zh/components/select.html)组件。**

### 1. 设置默认值

- 如果\`mode\`为\`selector\`(单列)，可以通过设置\`default-selector\`为单元素的数组，表示选中单列中的第几个(索引从0开始)，如: \`[1]\`表示选中单列的第二个。
- 如果\`mode\`为\`multiSelector\`(多列)，可以通过设置\`default-selector\`为多元素的数组(元素数量等于列数)，分别表示选中每一列的第几个(索引从0开始)，如\`[0, 1, 2]\`
表示共有3列，分别选中第一列的第一个，第二列的第二个，第三列的第三个。

\`\`\`html
<template>
	<u-picker mode="selector" v-model="show"  :default-selector="[0]"></u-picker>
	
	<u-picker mode="multiSelector" v-model="show"  :default-selector='[0, 1, 3]'></u-picker>
</template>
\`\`\`


### 2. 设置数据

由于单列和多列模式不像时间和地区模式，没有内置数据，故需要您手动传入可选值，通过\`range\`参数(数组)传入对应的数据，单列时为一维数组，多列时为二维数组。

如果您数组中的元素为对象的话，可以通过指定\`range-key\`参数，让组件内部知道您想把对象的哪个属性当做要显示的值。

\`\`\`html
<template>
	<view class="">
		<u-picker mode="selector" v-model="show" :default-selector="[0]" :range="selector"></u-picker>
		
		<u-picker mode="selector" v-model="show" :default-selector="[0]" :range="selectorObj" range-key="cateName"></u-picker>
		
		<u-picker mode="multiSelector" v-model="show" :default-selector="[0, 1]" :range="multiSelector"></u-picker>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 定义响应式数据
const show = ref<boolean>(true)

// 定义选择器数据
const selector = ref<number[]>([1, 2, 3])

// 定义多列选择器数据
const multiSelector = ref<number[][]>([
	[1, 2, 3], 
	[4, 5, 6]
])

// 定义对象选择器数据
const selectorObj = reactive([
	{
		cateName: '1',
		id: 1
	},
	{
		cateName: '2',
		id: 2
	}
])
</script>
\`\`\`

### 3. 回调参数

当点击\`picker\`的"取消"或者"确定"按钮时，会分别产生回调事件\`cancel\`和\`confirm\`，均为会返回组件内部的当前值。回调的参数为一个数组，分别表示
当前各列选中的列索引值(从0开始)。

- 单列模式

回调参数可能为\`[3]\`，表示选中传入数组的第四个值(从0开始)

- 多列模式

回调参数可能为\`[1, 0, 3]\`，表示3列中，第一列选中了第二个值，第二列选中了第一个值，第三列选中了第四个值。  

其中，我们使用多列模式，一般都需要联动选择，在多列模式下，有一个\`columnchange\`事件，任意列改变都会触发该事件，回调参数为\`{column: column, index: index}\`，
\`column\`表示第几列发生了变化(从0开始)，\`index\`表示当前的下标值，如\`{column: 1, index: 2}\`表示第二列(从0开始)发生了变化，下标变成了\`2\`，您可以
根据这个回调，对应的修改\`default-selector\`参数，让多列中的其他列联动起来。

此处演示较为复杂，请见uView的演示代码，在[安装](/zh/components/install.html)页下载\`演示项目\`方式，内有所有演示的示例，是一个完整的HX工程。


## API

## Props

注意：props中没有控制Picker打开与收起的参数，因为这是通过v-model绑定变量实现的，见上方说明。

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|:-|:-|:-|:-|:-|
| params | 需要显示的参数，见上方说明，mode=region或mode=time时有效 | \`Object\` | - | - |
| mode | 模式选择 | \`String\` | \`time\` | \`region\` / \`selector\` / \`multiSelector\` |
| start-year | 可选的开始年份，mode=time时有效 | \`String \| Number\` | \`1950\` | - |
| end-year | 可选的结束年份，mode=time时有效 | \`String \| Number\` | \`2050\` | - |
| safe-area-inset-bottom | 是否开启底部安全区适配 | \`Boolean\` | \`false\` | \`true\` |
| cancel-color | 取消按钮的颜色 | \`String\` | \`#606266\` | - |
| confirm-color | 确认按钮的颜色 | \`String\` | \`#2979ff\` | - |
| default-time | 默认选中的时间，mode=time时有效，需在\`onReady\`生命周期赋值 | \`String\` | - | - |
| default-region | 默认选中的地区，中文形式，mode=region时有效，需在\`onReady\`生命周期赋值 | \`Array\` | - | - |
| area-code | 默认选中的地区，编号形式，mode=region时有效 | \`Array\` | - | - |
| default-selector | 数组形式，表示选择\`range\`对应项的索引，见上方说明 | \`Array\` | \`[]\` | - |
| mask-close-able | 是否允许通过点击遮罩关闭Picker | \`Boolean\` | \`true\` | \`false\` |
| show-time-tag | 时间模式时，是否显示后面的年月日中文提示 | \`Boolean\` | \`true\` | \`false\` |
| z-index | 弹出时的z-index值 | \`String \| Number\` | \`10075\` | - |
| range | 自定义选择的数据，mode=selector或mode=multiSelector时有效 | \`Array\` | \`[]\` | - |
| range-key | 当\`range\`参数的元素为对象时，指定要显示的key值 | \`String\` | - | - |
| title | 顶部中间的标题 | \`String\` | - | - |
| confirm-text | 确认按钮的文字 | \`String\` | \`确认\` | - |
| cancel-text | 取消按钮的文字 | \`String\` | \`取消\` | - |
| preserve-selection | 是否保留用户上次确认的选择 | \`Boolean\` | \`true\` | \`false\` |

## Events

| 事件名 | 说明 | 回调参数 | 版本 |
|:-|:-|:-|:-|
| confirm | 点击确定按钮，返回当前选择的值 | \`Object\` | - |
| cancel | 点击取消按钮，返回当前选择的值 | \`Object\` | - |
| columnchange | 列改变时触发(仅mode=multiSelector) | \`{column, index}\` | - |

`;
