## Steps 步骤条 <to-api/>

<demo-model url="/pages/componentsB/steps/index"></demo-model>


该组件一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`list`参数传入一个数组，标识步骤的总数
- 通过`current`参数标识目前处于第几步，从0开始

```html
<template>
	<view>
		<u-steps :list="numList" :current="1"></u-steps>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numList: [{
					name: '下单'
				}, {
					name: '出库'
				}, {
					name: '运输'
				}, {
					name: '签收'
				}, ],
			}
		}
	}
</script>
```

### 设置步骤条的主题

- `type`值可选的有`primary`(默认)、`success`、`info`、`warning`、`error`
- `type`值和`active-color`(默认为空)为互斥关系，如果设置了`active-color`，会优先起作用

```html
<u-steps :list="numList" active-color="#fa3534"></u-steps>
```

### 设置步骤条的模式

`mode`可以设置为`dot`(圆点，默认值)或者`number`(数字)，二者有不同形式，见示例

```html
<u-steps :list="numList" mode="number"></u-steps>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| mode | 设置模式  | String | dot | number |
| list | 数轴条数据，数组。具体见上方示例  | Array | [ ] | - |
| type(1.3.7起已废弃) | type主题 | String  | primary | info / success / error / warning |
| current | 设置当前处于第几步 | Number \| String  | 0 | - |
| direction | row-横向，column-竖向 | String  | row | column |
| active-color | 已完成步骤的激活颜色，如设置，`type`值会失效 | String  | - | - |
| un-active-color | 未激活的颜色，用于表示未完成步骤的颜色 | String  | #606266 | - |
| icon | mode = number时的自定义图标  | String  | checkmark | - |