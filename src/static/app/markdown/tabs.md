## tabs 标签 <to-api/>

该组件，是一个tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动。 
该组件的一个特点是配置为滚动模式时，激活的tab会自动移动到组件的中间位置。
<br>

<demo-model url="/pages/componentsA/tabs/index"></demo-model>

uView中，共有2个组件可以实现tabs标签切换，分别是`tabs`组件，`tabsSwiper`组件，他们的异同点是：  

- `tabs`组件可以不结合uni-app`swiper`轮播组件使用，`tabsSwiper`组件是必须要结uni-app`swiper`轮播组件才能使用的。
- `tabs`组件使用更简洁明了(这也是其存在的理由)，`tabsSwiper`组件配置相对复杂一些。
- `tabsSwiper`组件相比`tabs`组件，由于搭配了uni-app`swiper`轮播组件，获得了滑块跟随，标签颜色渐变等效果(请在演示中扫码查看效果)，而`tabs`组件是不具备的。

总的来说，二者配置参数和功能都差不多，看用户的需求自行衡量该使用哪一个组件。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过设置`is-scroll`(默认为`true`)，配置tabs组件的内容是否可以左右拖动，一般4个标签以下时，无需拖动，设置为`false`，5个标签以上，建议可以左右拖动。  
- tabs标签的切换，需要绑定`current`值，在`change`事件回调中可以得到`index`，将其赋值给`current`即可。

具体的标签，通过`list`参数配置，该参数要求为数组，元素为对象，对象要有`name`属性，见示例：

:::tip 说明
`is-scroll`参数很重要，如果您的tabs项只有几个，且不想tabs导航栏可以被左右滑动的话，请一定要设置`is-scroll`为`false`，因为它默认为`true`。
:::


```html
<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '待收货'
				}, {
					name: '待付款'
				}, {
					name: '待评价',
					count: 5
				}],
				current: 0
			}
		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>
```


### 控制组件读取的数组元素属性名

某些情况下，数据可能是从后端获取的，`list`所需的数组中不一定会有`name`属性，比如可能为`cate_name`，如果这种情况还需一定要提供`name`属性
会导致用户需要循环一遍，把`cate_name`改成`name`，显然不人性的，所以uView给tabsSwiper组件提供了一个`name`参数，您可以设置其值为`cate_name`，组件内部会读取数组中的`cate_name`属性，而不是默认的`name`属性。

同理，在1.7.4版本中新增的`count`属性，您可以设置其值为`cate_count`，组件内部会读取数组中的`cate_count`属性，而不是默认的`count`属性。

```html
<u-tabs name="cate_name" count="cate_count" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>

<script>
	export default {
		data() {
			return {
				list: [{
					cate_name: '待收货'
				}, {
					cate_name: '待付款'
				}, {
					cate_name: '待评价',
                    cate_count: 5
				}],
				current: 0
			}
		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>
```


### 手动配置激活的标签

可以通过`current`控制tabs当前的第几个tab处于激活状态

```html
<u-tabs ref="tabs" :list="list" current="2"></u-tabs>
```


### 控制tabs组件的宽度

有时候我们并不想让tabs组件占满整个屏幕的宽度，如果有此需求，可以给tabs外面嵌套一个view元素，控制这个view的宽度或者内外边距，view里面的tabs组件
宽度也会相应的发生变化。

```html
<view style="width: 400rpx;">
	<u-tabs ref="tabs" :list="list" current="2"></u-tabs>
</view>
```


### 控制底部滑块的样式

1. 可以通过`active-color`控制颜色(同时为当前活动tab文字颜色和滑块的颜色)。
2. `bar-width`控制滑块的长度(rpx)。
3. `bar-height`控制滑块高度。

```html
<u-tabs ref="tabs" :list="list" bar-height="6" bar-width="40" active-color="#2979ff"></u-tabs>
```

### 控制tabs组件的活动tab样式

1. 通过`active-color`和`inactive-color`控制tabs的激活和非激活颜色。
2. `font-size`为tabs文字大小。
3. `current`为初始化tabs的激活tab索引，默认为0。`gutter`为单个tab标签的左右内边距之和，即左右各占`gutter`的一半。

```html
<u-tabs ref="tabs" :list="list" active-color="#2979ff" inactive-color="#606266" font-size="30" :current="current"></u-tabs>
```


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| is-scroll | tabs是否可以左右拖动  | Boolean | true | false |
| list | 标签数组，元素为对象，如[{name: '推荐'}] | Array  | - | - |
| current | 指定哪个tab为激活状态 | String \| Number  | 0，即`list`的第一项 | - |
| height | 导航栏的高度，单位rpx | String \| Number  | 80 | - |
| font-size | tab文字大小，单位rpx | String \| Number  | 30 | - |
| duration | 滑块移动一次所需的时间，单位**秒** | String \| Number  | 0.5 | - |
| active-color | 滑块和激活tab文字的颜色  | String | #2979ff | - |
| inactive-color | tabs文字颜色 | String  | #303133 | - |
| bar-width | 滑块宽度，单位rpx | String \| Number  | 40 | - |
| bar-height | 滑块高度，单位rpx | String \| Number  | 6 | - |
| gutter | 单个tab标签的左右内边距之和，单位rpx | String \| Number  | 40 | - |
| bg-color | tabs导航栏的背景颜色 | string  | #ffffff | - |
| name | 组件内部读取的`list`参数中的属性名（tab名称），见上方说明 | string  | name | - |
| bold | 激活选项的字体是否加粗 | Boolean | true | false |
| show-bar | 是否显示底部的滑块 | Boolean | true | false |
| bar-style | 底部滑块的样式，对象形式 | Object | {} | - |
| active-item-style | 当前活动Item的样式，对象形式 | Object | {} | - |
| item-width | 标签的宽度，单位rpx | String \| Number  | auto | - |
| count | 组件内部读取的`list`参数中的属性名（badge徽标数），用法与`name`一致，见上方说明 | string  | count | - |
| offset | 设置badge的位置偏移，格式为 [x, y]，也即设置的为`top`和`right`的值，单位rpx。 | Array  | [5, 20] | - |

### Events

|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
|change|点击标签时触发|index: 点击了第几个tab，索引从0开始|-|
