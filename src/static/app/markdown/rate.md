## Rate 评分 <to-api/>

<demo-model url="/pages/componentsB/rate/index"></demo-model>


该组件一般用于满意度调查，星型评分的场景。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`count`参数设置总共有多少颗星星可选择
- 通过`v-model`双向绑定初始化时默认选中的星星数量
- ~~通过`current`设置初始化时默认选中的星星数量~~(1.4.5后建议使用v-model的方式，此参数为了向前兼容依然有效，但优先级低于`v-model`)

```html
<template>
	<u-rate :count="count" v-model="value"></u-rate>
</template>

<script>
	export default {
		data() {
			return {
				count: 4,
				value: 2
			}
		}
	}
</script>
```

### 自定义样式

- 通过`active-color`设置选中的星星的颜色
- 通过`inactive-color`设置未选中时星星的颜色
- 通过`gutter`设置星星的间距，左右内边距各占`gutter`的一半

```html
<u-rate active-color="#FA3534" inactive-color="#b2b2b2" gutter="20"></u-rate>
```

### 自定义图标

- 通过`active-icon`设置激活的图标
- 通过`inactive-icon`设置未激活的图标
- 通过`custom-prefix`设置自定义图标，详见：[扩展自定义图标库](https://www.uviewui.com/guide/customIcon.html) 

下方示例为使用心形图标替代默认的星星图标：

```html
<u-rate active-icon="heart-fill" inactive-icon="heart"></u-rate>
```

### 评分分级分层

- 通过`colors`设置不同颜色区分评分层级
- 通过`icons`设置不同类型图标区分评分层级

```html
<template>
  <view>
    <u-rate v-model="value" :colors="colors" :icons="icons" inactive-icon="thumb-up"></u-rate>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        value: 2,
        colors: ['#ffc454', '#ffb409', '#ff9500'],
        icons: ['thumb-down-fill', 'thumb-down-fill', 'thumb-up-fill', 'thumb-up-fill']
      }
    }
  }
</script>
```

### 最少选中的数量

```html
<u-rate :min-count="5"></u-rate>
```

### 禁用状态

禁用下，无法点击或者滑动选择，但是可以通过`current`设置默认选中的数量，禁用状态下用来展示分数，允许出现半星

```html
<u-rate :current="3.7" :disabled="true"></u-rate>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| v-model | 双向绑定选择星星的数量 | String \| Number | 0 | - |
| count | 最多可选的星星数量 | String \| Number | 5 | - |
| current | 默认选中的星星数量，1.4.5起建议使用`v-model`方式  | String \| Number | 0 | - |
| disabled | 是否禁止用户操作 | Boolean | false | true |
| size | 星星的大小，单位rpx | String \| Number | 32 | - |
| inactive-color | 未选中星星的颜色 | String | #b2b2b2 | - |
| active-color | 选中的星星颜色 | String | #FA3534 | - |
| gutter | 星星之间的距离 | String \| Number | 10 | - |
| min-count | 最少选中星星的个数 | String \| Number | 0 | - |
| active-icon | 选中时的图标名，只能为uView的内置图标 | String | star-fill | - |
| inactive-icon | 未选中时的图标名，只能为uView的内置图标 | String | star | - |
| custom-prefix | 自定义字体图标库时，需要写上此值，详见：[扩展自定义图标库](https://www.uviewui.com/guide/customIcon.html) | String  | uicon | - |
| colors | 颜色分级显示，可以用不同颜色区分评分层级 | Array  | - | - |
| icons | 图标分级显示，可以用不同类型的icon区分评分层级 | Array  | - | - |

<!-- | allow-half | 是否允许半星选择 | Boolean | false | true | -->

### Events

| 事件名 | 说明 | 回调参数 |
| :- | :- | :- |
| change | 选中的星星发生变化时触发 | value：当前选中的星星的数量，如果使用`v-model`双向绑定方式，无需监听此事件|
