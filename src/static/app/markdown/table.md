## Table 表格 <to-api/>

<demo-model url="/pages/componentsB/table/index"></demo-model>


表格组件一般用于展示大量结构化数据的场景

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

本组件标签类似HTML的table表格，由`table`、`tr`、`th`、`td`四个组件组成

- `table`组件裹在最外层，可以配置一些基础参数
- `tr`组件用于显示"行"数据
- `th`组件用于显示表头内容，类似`td`，不同之处在于字体加粗了，也带有背景颜色，也可以直接用`td`替代`th`
- `td`组件不是最小单位，为了合并单元格时，内部可以嵌入`tr`和`td`组件

```html
<template>
	<u-table>
		<u-tr>
			<u-th>学校</u-th>
			<u-th>班级</u-th>
			<u-th>年龄</u-th>
		</u-tr>
		<u-tr>
			<u-td>浙江大学</u-td>
			<u-td>二年级</u-td>
			<u-td>22</u-td>
		</u-tr>
		<u-tr>
			<u-td>清华大学</u-td>
			<u-td>05班</u-td>
			<u-td>20</u-td>
		</u-tr>
	</u-table>
</template>
```

### 兼容性

由于`头条小程序`的兼容性问题，您需要给表格相关的组件(`u-tr`、`u-th`、`u-td`)写上对应的类名才有效，如下：

```html
<u-table>
	<u-tr class="u-tr">
		<u-th class="u-th">姓名</u-th>
		<u-th class="u-th">年龄</u-th>
		<u-th class="u-th">籍贯</u-th>
		<u-th class="u-th">性别</u-th>
	</u-tr>
	<u-tr class="u-tr">
		<u-td class="u-td">吕布</u-td>
		<u-td class="u-td">22</u-td>
		<u-td class="u-td">楚河</u-td>
		<u-td class="u-td">男</u-td>
	</u-tr>
</u-table>
```

<!-- ### 合并单元格

:::warning 注意
由于微信小程序编译后特殊的元素结构，目前合并单元格暂不支持微信小程序端
:::


- 可以在`td`组件嵌入多个`tr`，就会得到多行，`tr`中再嵌入`td`，就可以合并单元格，可以通过`width`参数
设置单元格的百分比长度，默认为每个单元格平均分`tr`的长度

下面的示例为合并"行"单元格的写法，设置`td`的`width`为33.33333%，第一行的第一个`td`宽度占据三分之一

```html
<u-table>
	<u-tr>
		<u-td width="33.33333%">浙江大学</u-td>
		<u-td>
			<u-tr>
				<u-td>二年级</u-td>
				<u-td>22</u-td>
			</u-tr>
			<u-tr>
				<u-td>二年级</u-td>
				<u-td>22</u-td>
			</u-tr>
		</u-td>
	</u-tr>
	<u-tr>
		<u-td>清华大学</u-td>
		<u-td>05班</u-td>
		<u-td>20</u-td>
	</u-tr>
</u-table>
```

<br>

下面的示例为合并"列"单元格的写法，设置`td`的`width`为66.66666%，第一行的第一个`td`宽度占据总宽度的三分之二

```html
<u-table>
	<u-tr>
		<u-td width="66.66666%">浙江大学</u-td>
		<u-td>
			二年级
		</u-td>
	</u-tr>
	<u-tr>
		<u-td>清华大学</u-td>
		<u-td>05班</u-td>
		<u-td>20</u-td>
	</u-tr>
</u-table>
``` -->

### API

### Table Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| border-color | 表格边框的颜色 | String | #e4e7ed | - |
| bg-color | 表格的背景颜色 | String | #ffffff | - |
| align | 单元格的内容对齐方式，作用类似css的`text-align` | String  | center | left / right |
| padding | 单元格的内边距，同css的`padding`写法 | String  | 10rpx 0 | - |
| font-size | 单元格字体大小，单位rpx | String \| Number  | 28 | - |
| color | 单元格字体颜色 | String  | #606266 | - |
| th-style | `th`单元格的样式，对象形式(将`th`所需参数放在`table`组件，是为了避免每一个`th`组件要写一遍) | Object  | {} | - |

### Td Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| width | 单元格宽度百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比，单元格宽度默认为均分`tr`的长度 | String \| Number | auto | - |

### Th Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| width | 标题单元格宽度百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比，单元格宽度默认为均分`tr`的长度 | String \| Number | - | - |



<style scoped>
h3[id=table-props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=td-props] + table thead tr th:nth-child(2){
	width: 43%;
}

h3[id=th-props] + table thead tr th:nth-child(2){
	width: 43%;
}
</style>