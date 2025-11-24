## Cell 单元格 <to-api/>

<demo-model url="/pages/componentsC/cell/index"></demo-model>


cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 该组件需要搭配`cell-group`使用，并由它实现列表组的上下边框，如不需要上下边框，配置`cellGroup`的`border`参数为`false`即可。
- 通过`title`设置左侧标题，`value`设置右侧内容。
- 通过`icon`字段设置图标，值为uView自带的[Icon 图标](/components/icon.html)名。

**注意：** 由于`cell`组件需要由`cellGroup`组件提供参数值，这些父子组件间通过Vue的"provide/inject"特性注入依赖，
所以您必须使用`cellGroup`包裹`cell`组件才能正常使用。

```html
<template>
	<u-cell-group>
		<u-cell-item icon="setting-fill" title="个人设置"></u-cell-item>
		<u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
	</u-cell-group>
</template>
```

### 自定义内容

- 通过插槽`icon`可以自定义图标，内容会替换左边图标位置
- 通过插槽`title`定义左边标题部分
- 通过插槽`right-icon`定义右边内容部分

```html
<u-cell-group>
	<u-cell-item  title="夕阳无限好" arrow-direction="down">
		<template #icon>
			<u-icon size="32" name="search"></u-icon>
		</template>
		<template #right-icon>
			<u-switch v-model="checked"></u-switch>
		</template>
	</u-cell-item>
	<u-cell-item icon="setting-fill" title="只是近黄昏"></u-cell-item>
</u-cell-group>
```

如上所示，可以给`cell-item`组件通过`<template #right-icon></template>`设定右边uView自带的`badge`或者`switch`组件：
- 如果搭配的是`badge`组件，注意设置`absolute`参数为`false`去掉绝对定位，否则其位于右侧的恰当位置，详见[Badge 徽标数](/components/badge.html)。
- 如果搭配的是`switch`组件，注意要通过`v-model`绑定一个内容为布尔值的变量，否则无法操作`switch`，详见[Switch 开关选择器](/components/switch.html)。

### 展示右箭头

设置`arrow`为`true`，将会显示右侧的箭头，可以通过arrow-direction控制箭头的方向

```html
<u-cell-group>
	<u-cell-item icon="share" title="停车坐爱枫林晚" :arrow="true" arrow-direction="down"></u-cell-item>
	<u-cell-item icon="map" title="霜叶红于二月花" :arrow="false"></u-cell-item>
</u-cell-group>
```

### 分组标题

通过`cell-group`的`title`参数可以指定分组标题

```html
<u-cell-group title="设置喜好">
	<u-cell-item icon="setting-fill" title="个人设置"></u-cell-item>
	<u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
</u-cell-group>
```


### 是否开启点击反馈

如果将`arrow`参数设置为`true`，意味着这是一个可点击的Cell，默认会给一个点击的反馈效果，如果您想自定义这个反馈效果，可以通过
`hover-class`参数传入一个样式类名，这个类必须写在全局样式中，如`App.vue`、或通过`Apop.vue`引入的全局样式中，一般建议定义反馈的背景颜色，或者是透明度即可。
如果不想要任何效果，将`hover-class`设置为`none`即可。

```html
<u-cell-group title="设置喜好">
	<u-cell-item icon="setting-fill" title="个人设置" hover-class="cell-hover-class"></u-cell-item>
</u-cell-group>
```

```css
/* App.vue */
.cell-hover-class {
	background-color: rgb(235, 237, 238);
}

/* 或者单是设置透明度 */
.cell-hover-class {
	opacity: 0.5;
}
```

### API

### CellGroup Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| title | 分组标题  | String | - | - |
| border | 是否显示外边框 | Boolean  | true | false |
| title-style | 分组标题的的样式，对象形式，如{'font-size': '24rpx'} 或 {'fontSize': '24rpx'} | object  | - | - |

### CellItem Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| title | 左侧标题  | String | - | - |
| icon | 左侧图标名，只支持uView内置图标，见[Icon 图标](/components/icon.html) | String  | - | - |
| icon-style | icon的样式，对象形式 | Object | - | - |
| value | 右侧内容 | String  | - | - |
| label | 标题下方的描述信息 | String | - | - |
| border-bottom | 是否显示cell的下边框 | Boolean  | true | false |
| border-top | 是否显示cell的上边框 | Boolean  | false | true |
| border-gap | `border-bottom`为`true`时，Cell列表中间的条目的下边框是否与左边有一个间隔 <Badge type="error" text="已废弃" />  | Boolean  | true | false |
| hover-class | 是否开启点击反馈，`none`为无效果，见上方说明 | String  | - | none |
| arrow | 是否显示右侧箭头，开启的话，将会默认带上点击反馈，可通过`hover-class`配置 | Boolean | true | false |
| arrow-direction | 箭头方向，可选值为 | String  | right | up / down |
| title-style | 标题样式，对象形式 | Object | - | - |
| required | 是否显示左边表示必填的星号 | Boolean | false | true |
| value-style | 右侧内容样式，对象形式 | Object | - | - |
| label-style | 标题下方描述信息的样式，对象形式 | Object | - | - |
| bg-color | 背景颜色，默认透明背景 | String  | transparent | - |
| index | 用于在`click`事件回调中返回，标识当前是第几个Item  | String \| Number | - | - |
| title-width | 标题的宽度，单位rpx | Number \| String | - | - |
| icon-size | 左边通过`icon`参数传入的图标的大小，单位rpx | Number \| String | 34 | - |
| center | 是否使内容垂直居中 | Boolean | false | true |


### CellItem Slot

| 名称          | 说明            |
|-------------  |---------------- |
| title | 自定义左侧标题部分的内容，如需使用，请勿定义`title`参数，或赋值`null`即可  |
| icon | 自定义左侧的图标 |
| right-icon | 自定义右侧图标内容，需设置`arrow`为`false`才起作用 |
| label | 自定义`label`内容，需同时设置`use-label-slot`为`true` |

### CellItem Event

|事件名|说明|回调参数|
|:-|:-|:-|:-|
| click | 点击cell列表时触发 | index: 通过`props`传递的`index`参数 |



<style scoped>
h3[id=cellgroup-props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=cellitem-props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=cellitem-slot] + table thead tr th:nth-child(2){
	width: 50%;
}
</style>