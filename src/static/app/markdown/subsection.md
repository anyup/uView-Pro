## Subsection 分段器 <to-api/>

<demo-model url="/pages/componentsC/subsection/index"></demo-model>


该分段器一般用于用户从几个选项中选择某一个的场景

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`list`数组参数传递分段的选项
- 通过`current`指定初始化时激活的选项

```html
<template>
	<u-subsection :list="list" :current="1"></u-subsection>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: '待发货'
					}, 
					{
						name: '待付款'
					}, 
					{
						name: '待评价'
					}
				],
				current: 1
			}
		}
	}
</script>
```

### 模式选择

通过`mode`设置分段器的模式
- 值为`button`时为按钮类型
- 值为`subsection`时为分段器形式

```html
<u-subsection :list="list" :current="1"></u-subsection>
```

### 是否开启动画效果

`animation`(默认为`true`)设置为`true`的话，分段器的三种模式滑块移动时都会有动画效果

```html
<u-subsection :animation="true"></u-subsection>
```

### 颜色配置

- 通过`active-color`配置激活选项的文字颜色，`mode`为`subsection`时无效，此时默认为白色：
- 通过`bgColor`配置背景颜色
- 通过`buttonColor`配置按钮颜色，`mode`为`button`时有效

```html
<u-subsection active-color="#ff9900"></u-subsection>
```


### 注意事项

如果想通过一个变量绑定`current`值，需要在`change`事件回调中修改此值，否则可能会由于`props`的限制，前后两次设置`current`为相同的值，
而导致无法通过修改`current`值触发分段器的变化。

```html
<template>
	<view>
		<u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: '待发货'
					}, 
					{
						name: '待付款'
					}, 
					{
						name: '待评价'
					}
				],
				curNow: 0
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
			}
		}
	}
</script>
```


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| list | 选项的数组，形式见上方"基本使用" | Array | - | - |
| current | 初始化时默认选中的选项索引值  | String \| Number | 0 | - |
| active-color | 激活时的颜色 | String | #303133 | - |
| inactive-color | 未激活时的颜色 | String | #606266 | - |
| mode | 模式选择，见上方"模式选择"说明 | String | button | subsection |
| font-size | 字体大小，单位rpx | String \| Number | 28 | - |
| height | 组件高度，单位rpx | String \| Number | 70 | - |
| animation | 是否开启动画效果，见上方说明 | Boolean | true | false |
| bold | 激活选项的字体是否加粗 | Boolean | true | false |
| bg-color | 组件背景颜色，`mode`为`button`时有效 | String | #eeeeef | - |
| button-color | 按钮背景颜色，`mode`为`button`时有效 | String | #ffffff | - |

### Events

| 事件名 | 说明 | 回调参数 |
| :- | :- | :- |
| change | 分段器选项发生改变时触发 | index：选项的index索引值，从0开始 |
