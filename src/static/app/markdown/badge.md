## Badge 徽标数 <to-api/>
该组件一般用于图标右上角显示未读的消息数量，提示用户点击，有圆点和圆包含文字两种形式。

<demo-model url="/pages/componentsC/badge/index"></demo-model>


### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`count`参数定义徽标内容
- 通过`type`设置主题。重申一次，uView中，所有组件的`type`参数都只有5个固定的可选值，分别是`primary`(蓝色-主色)，`warning`(黄色-警告)，
`error`(红色-错误)，`success`(绿色-成功)，`info`(灰色-信息)

::: warning 注意
此组件内部默认为`absolute`绝对定位，所以需要给`badge`父组件(元素)设置`position: relative`相对定位，
再通过调整`offset`偏移值(数组，两个元素，第一个元素为`top`值，第二个元素为`right`值，单位rpx，可为负值，如"[-10, -10]")设置到合适的位置即可。  
如果不需要组件内容默认的自动绝对定位，设置`absolute`参数为`false`即可。
:::

```html
<u-badge type="error" count="7"></u-badge>
```

### 设置徽标的尺寸

`size`参数默认为`default`，如果设置为`mini`，将会得到一个小尺寸的徽标，组件内部通过css的`scale`属性值进行缩放。

```html
<u-badge size="mini" type="success"></u-badge>
```

### 设置徽标的类型为一个圆点

通过`is-dot`参数设置，该形式组件没有内容，只显示一个圆点

```html
<u-badge :is-dot="true" type="success"></u-badge>
```

### 自定义徽标样式

该组件内部通过一个`view`元素实现，是一个根元素，依据`vue-cli`的`vue-loader`特性，在引用的组件上直接写类名或者内联样式，可以作用于组件内部的
根元素上(微信小程序除外)，所以用户可以在组件引用时自定义修改样式 

```html
<u-badge type="green" class="badge"></u-badge>

<style scoped>
	.badge {
		background-color: blue;
		color: white;
	}
</style>
```

### 如何让组件中心点与父组件右上角重合

某些特殊的场景下，特别是`badge`内容值是通过后端获取，长度未知时，会导致最终渲染出来的`badge`组件的位置与父组件右上角的位置有出入，
为了解决这个问题，uView提供了一个`is-center`(默认为`false`)，如果设置为`true`，`offset`参数将会失效，同时`badge`组件的中心点
将会和父组件的右上角重合。


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| count | 展示的数字，大于 `overflowCount` 时显示为 `${overflowCount}+`，为`0`且`show-zero`为`false`时隐藏  | String \| Number | - | - |
| is-dot | 不展示数字，只有一个小点 | Boolean  | false | true |
| absolute | 组件是否绝对定位，为`true`时，`offset`参数才有效 | Boolean  | true | false |
| overflow-count | 展示封顶的数字值 | String \| Number  | 99 | - |
| type | 使用预设的背景颜色 | String  | error | success / primary / warning / info |
| show-zero | 当数值为 0 时，是否展示 Badge | Boolean  | false | true |
| size | Badge的尺寸，设为`mini`会得到小一号的`Badge` | String  | default | mini |
| offset | 设置badge的位置偏移，格式为 [x, y]，也即设置的为`top`和`right`的值，单位rpx。`absolute`为`true`时有效 | Array | [20, 20] | - |
| color | 字体颜色 | String  | #ffffff | - |
| bgColor | 背景颜色，优先级比`type`高，如设置，`type`参数会失效 | String  | - | - |
| is-center | 组件中心点是否和父组件右上角重合，优先级比`offset`高，如设置，`offset`参数会失效 | Boolean  | false | true |



<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 40%;
}
</style>
