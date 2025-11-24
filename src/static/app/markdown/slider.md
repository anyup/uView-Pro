## Slider 滑动选择器 <to-api/>
      
<demo-model url="/pages/componentsA/slider/index"></demo-model>

该组件一般用于表单中，手动选择一个区间范围的场景。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

需要通过`v-model`绑定一个值，来初始化滑块的选择值(0到100之间)，这个值是双向绑定的，您可以通过这个值，实时地得知内部的滑动结果。


```html
<template>
	<view class="wrap">
		<u-slider v-model="value"></u-slider>
	</view>
</template>
	
<script>
	export default {
		data() {	
			return {
				value: 30
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
	}
</style>
```

### 设置最大和最小值

通过`min`和`max`，可以设置滑块所能选择的最大和最小值

```html
<u-slider v-model="value" min="30" max="80"></u-slider>
```


### 设置步进值

通过`step`参数设置步进值，这个步进值为每次跳变的值，具体表现请见示例。  

:::tip 提示
需要注意的是，这个`step`必须要被`max`值整除，否则会出现无法无法滑动到最大值的情况
:::

```html
<u-slider v-model="value" step="20" min="30" max="100"></u-slider>
```


### 自定义按钮的内容和样式

通过设置`use-slot`为`true`，可以以传入`slot`的形式，替换默认的滑块按钮。

以下示例结合了`value`值，在按钮上实时显示选择的值：

```html
<template>
	<view class="wrap">
		<u-slider v-model="value" :use-slot="true">
			<!-- 这里外面需要多一层view，否则".badge-button"样式可能不生效 -->
			<view class="">
				<view class="badge-button">
					{{value}}
				</view>
			</view>
		</u-slider>
	</view>
</template>
	
<script>
	export default {
		data() {	
			return {
				value: 30
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
	}
	
	.badge-button {
		padding: 4rpx 6rpx;
		background-color: $u-type-error;
		color: #fff;
		border-radius: 10rpx;
		font-size: 22rpx;
		line-height: 1;
	}
</style>
```


### 自定义滑动选择器整体的样式

- 通过`inactive-color`配置底部滑动条背景颜色
- 通过`active-color`配置底部选择部分的背景颜色
- 通过`block-width`配置滑块宽度(高等于宽)
- 通过`block-color`配置滑动按钮按钮的颜色
- 通过`height`配置滑块条高度，单位rpx

其他更多参数详见底部API

```html
<u-slider v-model="value" block-width="40" block-color="red"></u-slider>
```


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| v-model | 双向绑定滑块选择值  | String \| Number | 0 | - |
| min | 可选的最小值(0-100之间)  | String \| Number | 0 | - |
| max | 可选的最大值(0-100之间)  | String \| Number | 100 | - |
| step | 选择的步长  | String \| Number | 1 | - |
| block-width | 滑动按钮的宽度(高等于宽)，单位rpx  | String \| Number | 30 | - |
| height | 滑动选择条的高度，单位rpx | String \| Number | 6 | - |
| inactive-color | 滑动选择条的底部背景颜色  | String | #c0c4cc | - |
| active-color | 底部选择部分的背景颜色  | String | #2979ff | - |
| block-color | 滑块背景颜色  | String | #ffffff | - |
| block-style | 给滑块按钮自定义样式，对象形式  | Object | - | - |
| disabled | 是否禁用滑块  | Boolean | false | true |
| use-slot | 是否使用slot传入自定义滑块  | Boolean | false | true |


### Slot

| 名称          | 说明            |
|-------------  |---------------- |
| - | 自定义滑块内容  |



### Events

|事件名|说明|回调参数|
|:-|:-|:-|:-|
| start | 触发滑块移动 | - |
| moving | 正在滑动中 | - |
| end | 滑动结束 | - |

