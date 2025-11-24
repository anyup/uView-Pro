## Collapse 折叠面板 <to-api/>

<demo-model url="/pages/componentsC/collapse/index"></demo-model>


通过折叠面板收纳内容区域

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

默认为手风琴模式，即打开一个，另外所有的都会关闭。可以将`u-collapse`的`accordion`设置为`false`，这样可以允许打开多个面板

```html
<template>
	<u-collapse>
		<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">
			{{item.body}}
		</u-collapse-item>
	</u-collapse>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [{
					head: "赏识在于角度的转换",
					body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
					open: true,
					disabled: true
				},{
					head: "生活中不是缺少美，而是缺少发现美的眼睛",
					body: "学会欣赏，实际是一种积极生活的态度，是生活的调味品，会在欣赏中发现生活的美",
					open: false,
				},{
					head: "周围一些不起眼的人、事、物，或许都隐藏着不同凡响的智慧",
					body: "但是据说雕刻大卫像所用的这块大理石，曾被多位雕刻家批评得一无是处，有些人认为这块大理石采凿得不好，有些人嫌它的纹路不够美",
					open: false,
				}],
			}
		}
	}
</script>
```

### 控制面板的初始状态，以及是否可以操作

- 设置`u-collapse-item`的`open`参数为`true`，可以让面板初始化时为打开状态
- 如果设置`u-collapse-item`的`disabled`参数为`true`，那么面板会保持初始状态，无法关闭或打开

```html
<template>
	<u-collapse>
		<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index" :open="item.open" :disabled="item.disabled">
			{{item.body}}
		</u-collapse-item>
	</u-collapse>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [{
					head: "赏识在于角度的转换",
					body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
					open: true,
					disabled: true
				},{
					head: "生活中不是缺少美，而是缺少发现美的眼睛",
					body: "学会欣赏，实际是一种积极生活的态度，是生活的调味品，会在欣赏中发现生活的美",
					open: false,
				},{
					head: "周围一些不起眼的人、事、物，或许都隐藏着不同凡响的智慧",
					body: "但是据说雕刻大卫像所用的这块大理石，曾被多位雕刻家批评得一无是处，有些人认为这块大理石采凿得不好，有些人嫌它的纹路不够美",
					open: false,
				}],
			}
		}
	}
</script>
```


### 自定义样式

在此组件中，可以通过多个方式对每个`Item`进行样式定义，我们可以从如下方面思考和着手：

#### 1. 如果修改展开后的内容？  
- 因为是通过默认的`slot`传入的(见上方示例)，我们可以加一个`view`元素当做外层，在父组件给它添加样式，如下：

```html
<template>
	<u-collapse :item-style="itemStyle" event-type="close" :arrow="arrow" :accordion="accordion" @change="change">
		<u-collapse-item :index="index" @change="itemChange" :title="item.head" v-for="(item, index) in itemList" :key="index">
			<view class="collapse-item">
				{{item.body}}
			</view>
		</u-collapse-item>
	</u-collapse>
</template>

<style scoped>
	.collapse-item {
		color: red;
		padding-bottom: 10px;
	}
</style>
```

- 通过`Collapse`的`body-style`参数也可以配置主体内容的样式，需要注意上面的自定义`slot`内容如果在父组件定义了样式，会优先起作用。

#### 2. 如何自定义标题的样式？

如果想修改头部标题的字体大小，颜色等，可以通过`head-style`参数修改。


#### 3. 如何修改整个`Item`的样式？

有时候我们需要修改`Item`的整体样式，比如将各个`Item`之间隔开，这时我们可以通过`item-style`参数进行设置，比如：

```html
<template>
	<u-collapse :item-style="itemStyle">
		......
	</u-collapse>
</template>

<script>
export default {
	data() {
		return {
			itemStyle: {
				marginTop: '20px'
			}
		}
	}
}
</script>
```



### API

### Collapse Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| accordion | 是否手风琴模式  | Boolean | true | false |
| arrow | 是否显示标题右侧的箭头  | Boolean | true | false |
| arrow-color | 标题右侧箭头的颜色 | String | #909399 | - |
| item-style<Badge text="1.3.0" /> | 整个`Item`的自定义样式，对象形式  | Object | - | - |
| head-style | `Item`的标题自定义样式，对象形式  | Object | - | - |
| body-style | `Item`的主体自定义样式，对象形式  | Object | - | - |
| hover-class | 样式类名，按下时有效，样式必须写在根目录的`App.vue`或通过其引入的全局样式中才有效，`none`为无效果，作用于头部标题区域  | String | u-hover-class | none / 其他 |

### Collapse Item Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| title | 面板标题  | String | - | - |
| index | 主要用于事件的回调，标识那个Item被点击  | String \/ Number | - | - |
| disabled | 面板是否可以打开或收起  | Boolean | false | true |
| open | 设置某个面板的初始状态是否打开  | Boolean | false | true |
| name | 唯一标识符，如不设置，默认用当前`collapse-item`的索引值 | String \/ Number | - | - |
| align | 标题的对齐方式  | String | left | - |
| active-style | 不显示箭头时，可以添加当前选择的collapse-item活动样式，对象形式  | Object | - | - |


### Collapse Event

注意：请在`<u-collapse></u-collapse>`上监听此事件

|事件名|说明|回调参数|
|:-|:-|:-|:-|
| change | 当前激活面板展开时触发(如果是手风琴模式，参数activeNames类型为String，否则为Array) | activeNames: String / Array |


### Collapse Item Event

注意：请在`<u-collapse-item></u-collapse-item>`上监听此事件

|事件名|说明|回调参数|
|:-|:-|:-|:-|
| change | 某个item被打开或者收起时触发 | 对象，{index: index, show: true \| false }，index为`collapse-item`的`index`参数，show为`true`表示被打开，`false`表示被收起 |


### Collapse Methods 

注意：此方法需要通过`ref`调用

|方法|说明|
|:-|:-|
| init  | 重新初始化内部高度计算，用于异步获取内容的情形，请结合`this.$nextTick()`使用 |


### Slot

| 名称          | 说明            |
|-------------  |---------------- |
| - |  主体部分的内容  |
| title |  头部的内容，不含右边的箭头  |
| title-all |  整个头部的内容，包含右边的箭头  |


<style scoped>
h3[id=collapse-props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=collapse-item-props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=collapse-event] + p + table thead tr th:nth-child(2){
	width: 50%;
}

h3[id=collapse-methods] + table thead tr th:nth-child(2){
	width: 50%;
}

h3[id=collapse-item-event] + p + table thead tr th:nth-child(3){
	width: 50%;
}

h3[id=slot] + table thead tr th:nth-child(2){
	width: 50%;
}
</style>