## Calendar 日历 <to-api/>

<demo-model url="/pages/componentsA/calendar/index"></demo-model>


此组件用于单个选择日期，范围选择日期等，日历被包裹在底部弹起的容器中。

**注意：** 此组件与[Picker 选择器](/components/picker.html)的日期选择模式有一定的重合之处，区别在于本组件为更专业的日期选择场景，能选择日期范围等。
另外`Picker`组件的日期模式可以配置更多的参数，如时、分、秒等，可以根据不同的使用场景进行选择。


### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|


### 基本使用


- 通过`v-model`绑定一个布尔变量用于打开或收起日历弹窗。
- 通过`mode`参数指定选择单个日期，还是选择日期范围。

```html
<template>
	<view>
		<u-calendar v-model="show" :mode="mode"></u-calendar>
		<u-button @click="show = true">打开</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				mode: 'date'
			}
		}
	}
</script>
```


### 日历模式

- `mode`为`date`只能选择单个日期
- `mode`为`range`可以选择日期范围


### 单个日期模式

选择日期后，需要点击底部的`确定`按钮才能触发回调事件，回调参数为一个对象，有如下属性：

```js
{
	day: 4, // 选择了哪一天
	days: 30, // 这个月份有多少天
	isToday: true, // 选择的日期是否今天
	month: 6, // 选择的月份
	result: "2020-06-04", // 选择的日期整体值
	week: "星期四", // 选择日期所属的星期数
	year: 2020 , // 选择的年份
}
```

示例代码：

```html
<template>
	<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				mode: 'date'
			}
		},
		methods: {
			change(e) {
				console.log(e);
			}
		}
	}
</script>
```


### 日期范围模式

此模式用于选择一个日期范围，比如住酒店的入住到离店的日期范围，有如下可配置的参数：

- `active-bg-color`参数配置起始/结束日期按钮的背景色
- `active-color`参数配置起始/结束日期按钮的字体颜色
- `range-bg-color`参数配置起始/结束日期之间的区域的背景颜色，默认为`rgba(41,121,255,0.13)`，为浅蓝色
- `start-text`参数用于设置起始日期底部的提示文字，如"住店"
- `end-text`参数用于设置结束日期底部的提示文字，如"离店"


此模式的返回参数如下：

```js
{
	endDate: "2020-06-04", // 选择的结束日期
	endDay: 4, // 结束日期是哪一天
	endMonth: 6, // 结束日期的月份
	endWeek: "星期四", // 结束日期的星期数
	endYear: 2020, // 结束日期的年份
	startDate: "2020-06-01", // 选择的起始日期
	startDay: 1, // 起始日期是哪一天
	startMonth: 6, // 起始日期的月份
	startWeek: "星期一", // 起始日期的星期数
	startYear: 2020 // 起始日期的年份
}
```

示例代码：

```html
<template>
	<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				mode: 'range'
			}
		},
		methods: {
			change(e) {
				console.log(e);
			}
		}
	}
</script>
```


### 自定义内容

组件有一个默认插槽，名为`tooltip`，传入的内容将会显示在键盘的顶部位置，如使用，需要为传入的内容自定义样式。

```html
<template>
	<u-calendar v-model="show" :mode="mode" @change="change">
		<template #tooltip>
			<view class="title">
				请选择住店/离店时间
			</view>
		</template>
	</u-calendar>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				mode: 'range'
			}
		},
		methods: {
			change(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		color: $u-type-primary;
		text-align: center;
		padding: 20rpx 0 0 0;
	}
</style>
```



### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| mode | 选择日期的模式，date-为单个日期，range-为选择日期范围 | String | date | range |
| v-model | 布尔值变量，用于控制日历的弹出与收起 | Boolean | false | true |
| safe-area-inset-bottom | 是否开启[底部安全区适配](/components/safeAreaInset.html#关于uview某些组件safe-area-inset参数的说明) | Boolean  | false | true |
| change-year | 是否显示顶部的切换年份方向的按钮  | Boolean | true | false |
| change-month | 是否显示顶部的切换月份方向的按钮  | Boolean | true | false |
| max-year | 可切换的最大年份 | Number \| String | 2050 | - |
| min-year | 可切换的最小年份 | Number \| String | 1950 | - |
| min-date | 最小可选日期 | Number \| String | 1950-01-01 | - |
| max-date | 最大可选日期 | Number \| String | 当前日期 | - |
| border-radius | 弹窗顶部左右两边的圆角值，单位rpx  | Number \| String | 20 | - |
| mask-close-able | 是否允许通过点击遮罩关闭日历  | Boolean | true | false |
| month-arrow-color | 月份切换按钮箭头颜色 | String | #606266 | - |
| year-arrow-color | 年份切换按钮箭头颜色 | String | #909399 | - |
| color | 日期字体的默认颜色 | String | #303133 | - |
| active-bg-color | 起始/结束日期按钮的背景色 | String | #2979ff | - |
| z-index | 弹出时的`z-index`值 | String \| Number | 10075 | - |
| active-color | 起始/结束日期按钮的字体颜色 | String | #ffffff | - |
| range-bg-color | 起始/结束日期之间的区域的背景颜色 | String | rgba(41,121,255,0.13) | - |
| range-color | 选择范围内字体颜色 | String | #2979ff | - |
| start-text | 起始日期底部的提示文字 | String | 开始 | - |
| end-text | 结束日期底部的提示文字 | String | 结束 | - |
| btn-type | 底部确定按钮的主题 | String | primary | default / success / info/ warning / error |
| toolTip | 顶部提示文字，如设置名为`tooltip`的`slot`，此参数将失效 | String | 选择日期 | - |
| closeable | 是否显示右上角的关闭图标 | Boolean | true | false |


### Slot

|名称|说明|
|:-|:-|
| tooltip | 自定义日历顶部的内容 |


### Event

|事件名|说明|回调参数|
|:-|:-|:-|:-|
| change | 点击右上角`确定`按钮时触发 | 选择日期相关的返回参数 |



<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=slot] + table thead tr th:nth-child(2){
	width: 50%;
}
</style>