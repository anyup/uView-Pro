## Dropdown 下拉菜单  <to-api/>
      
<demo-model url="/pages/componentsB/dropdown/index"></demo-model>

该组件一般用于向下展开菜单，同时可切换多个选项卡的场景。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

使用前说明：

- 该组件必须结合`u-dorpdown`和`u-dropdown-item`一起使用，展开的内容由`u-dropdown-item`通过传递参数或者`slot`提供
- 组件的菜单栏标题由`u-dropdown-item`通过`title`参数提供
- `u-dropdown-item`带有默认的单选展示功能，通过`options`(见下方说明)配置，传入`slot`则会覆盖默认功能，通过`v-model`双向绑定`options`选中项的`value`值


```html
<template>
	<view class="">
		<u-dropdown>
			<u-dropdown-item v-model="value1" title="距离" :options="options1"></u-dropdown-item>
			<u-dropdown-item v-model="value2" title="温度" :options="options2"></u-dropdown-item>
		</u-dropdown>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: 1,
				value2: 2,
				options1: [{
						label: '默认排序',
						value: 1,
					},
					{
						label: '距离优先',
						value: 2,
					},
					{
						label: '价格优先',
						value: 3,
					}
				],
				options2: [{
						label: '去冰',
						value: 1,
					},
					{
						label: '加冰',
						value: 2,
					},
				],
			}
		},
	}
</script>
```

### 配置选项卡默认功能

如上所示，`u-dropdown-item`具有默认的单选功能，这里主要讲解其`options`和`v-model`参数：

`options`参数为一个数组，元素为对象，其中`label`为需要展示的提示文字，`value`为点击时双向绑定给`v-model`的值，`v-model`初始化时如果设置
某个`options`中的`value`，则该条目将会被默认选中：

```js
let options = [
	{
		label: '蜀道难',
		value: 1
	},
	{
		label: '难以上青天',
		value: 2
	}
]
```


### 配置选项卡自定义功能

在选项卡默认的单选功能无法满足的时候，我们可以给`u-dropw-item`传递`slot`来自定义需要展示的内容。  

问：如果自定义内容，如何实现点击其中的按钮关闭下拉菜单？

答：在`u-dropdown`中，有一个`close()`方法，可以通过`ref`获取实例，并调用方法进行关闭即可。


```html
<template>
	<view class="">
		<u-dropdown ref="uDropdown">
			<u-dropdown-item title="属性">
				<view class="slot-content">
					<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">其他自定义内容</view>
					<u-button type="primary" @click="closeDropdown">确定</u-button>
				</view>
			</u-dropdown-item>
		</u-dropdown>
	</view>
</template>

<script>
	export default {
		methods: {
			closeDropdown() {
				this.$refs.uDropdown.close();
			}
		}
	}
</script>
```

### 配置选项卡内容可滚动

如果我们想给自定义内容的选项中局部内容可滚动，可以通过嵌入`scroll-view`元素实现，需要注意的是`scroll-view`必须声明高度才有效，大概如下：

```html
<template>
	<view class="">
		<u-dropdown ref="uDropdown">
			<u-dropdown-item title="属性">
				<view class="slot-content" style="background-color: #FFFFFF;">
					<scroll-view scroll-y="true" style="height: 200rpx;">
						<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">无言独上西楼</view>
						<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">月如钩</view>
						<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">寂寞梧桐深院锁清秋</view>
						<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">剪不断</view>
						<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">理还乱</view>
						<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">是离愁</view>
						<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">别是一般滋味在心头</view>
					</scroll-view>
					<u-button type="primary" @click="closeDropdown">确定</u-button>
				</view>
			</u-dropdown-item>
		</u-dropdown>
	</view>
</template>

<script>
	export default {
		methods: {
			closeDropdown() {
				this.$refs.uDropdown.close();
			}
		}
	}
</script>
```


### 如何保持菜单高亮

有时候，我们可能会希望下拉菜单收起之后，标题部分可以保持高亮，组件内部可以做到这样的要求，但是如果通过自定义`slot`传入了内容，那么组件就不知道
收起的时候，是否该保持菜单的高亮了，因为组件不知道您在自定义的内容中是否进行了"操作"，所以我们提供了一个手动通过`ref`设置的`highlight(index)`方法，
让您自主决定是否让某个菜单高亮，可以自行结合`change`(dropdown-item)、`open`(dropdown)、`close`(dropdown)事件进行组合操作。

```html
<template>
	<view class="">
		<u-dropdown ref="uDropdown" @open="open" @close="close">
			<u-dropdown-item v-model="value1" title="距离" :options="options1" @change="change"></u-dropdown-item>
			<u-dropdown-item v-model="value2" title="温度" :options="options2"></u-dropdown-item>
		</u-dropdown>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: 1,
				value2: 2,
				options1: [{
						label: '默认排序',
						value: 1,
					},
					{
						label: '距离优先',
						value: 2,
					}
				],
				options2: [{
						label: '去冰',
						value: 1,
					},
					{
						label: '加冰',
						value: 2,
					},
				],
			}
		},
		methods: {
			open(index) {
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			change() {
				// 更多的细节，如有需要请自行根据业务逻辑进行处理
				// this.$refs.uDropdown.highlight(xxx);
			}
		}
	}
</script>
```

### 兼容性

- 由于`头条小程序`的兼容性原因，如果`u-dropdown`父元素设置了`display: flex`，您可能需要给组件添加`u-dropdown`类，如下：

```html
<u-dropdown class="u-dropdown"></u-dropdown>
```

### API

### Dropdown Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| active-color | 标题和选项卡选中的颜色  | String  | #2979ff | - |
| inactive-color | 标题和选项卡未选中的颜色  | String  | #606266 | - |
| close-on-click-mask | 点击遮罩是否关闭菜单  | Boolean | true | false |
| close-on-click-self | 点击当前激活项标题是否关闭菜单  | Boolean | true | false |
| duration | 选项卡展开和收起的过渡时间，单位ms  | String \| Number | 300 | - |
| height | 标题菜单的高度，单位任意，数值默认为rpx单位 | String \| Number | 80 | - |
| border-bottom | 标题菜单是否显示下边框  | Boolean | false | true |
| title-size | 标题的字体大小，单位任意，数值默认为rpx单位 | String \| Number | 28 | - |
| border-radius | 菜单展开内容下方的圆角值，单位任意 | String \| Number | 0 | - |
| menu-icon | 标题菜单右侧的图标 | String | arrow-down | arrow-down-fill |
| menu-icon-size | 标题菜单右侧的图标的大小，单位任意，数值默认为rpx单位 | String \| Number | 26 | - |


### Dropdown Events

|事件名|说明|回调参数|
|:-|:-|:-|:-|
| open | 下拉菜单被打开时触发 | (index) - 当前被打开菜单的索引 |
| close | 下拉菜单被关闭时触发 | (index) - 当前被关闭菜单的索引 |


### Dropdown-item Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| v-model | 双向绑定选项卡选择值  | String \| Number | - | - |
| title | 菜单项标题  | String  | - | - |
| options | 选项数据，如果传入了默认slot，此参数无效，数据结构见上方说明  | Array[Object]  | - | - |
| disabled | 是否禁用此选项卡  | Boolean | false | true |
| height | 弹窗下拉内容的高度(内容超出将会滚动)，`slot`自定义内容时无效(自行使用`scroll-view`处理)，单位任意，默认rpx | String \| Number | auto | - |



### Dropdown-item Slot

| 名称          | 说明            |
|-------------  |---------------- |
| - | 自定义选项卡内容  |



### Dropdown-item Events

|事件名|说明|回调参数|
|:-|:-|:-|:-|
| change | 每个`u-dropdown`均有此回调，点击某个`options`选项时触发 | (value) - 点击项绑定的`value`属性值 |


### Dropdown-item Methods

这些为组件内部的方法，需要通过`ref`调用

| 参数          | 说明            | 
|-------------  |---------------- |
| highlight(index) | index为需要设置高亮的菜单项的索引(从0开始)，不写表示清空内部的高亮 | 



<style scoped>
h3[id=dropdown-item-slot] + table thead tr th:nth-child(2){
	width: 50%;
}

h3[id=dropdown-item-methods] + p + table thead tr th:nth-child(2){
	width: 70%;
}

h3[id=dropdown-events] + table thead tr th:nth-child(2){
	width: 33.33%;
}

h3[id=dropdown-item-events] + table thead tr th:nth-child(2){
	width: 33.33%;
}
</style>