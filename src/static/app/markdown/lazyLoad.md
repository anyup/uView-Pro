## LazyLoad 懒加载 <to-api/>

<demo-model url="/pages/componentsA/lazyload/index"></demo-model>


懒加载使用的场景为：页面有很多图片时，APP会同时加载所有的图片，导致页面卡顿，各个位置的图片出现前后不一致等   
本组件高度封装和集成，创新性地使用`uni.createIntersectionObserver`
接口，保证高性能的同时，还有其他友好的可配置参数，比如预加载占位图，加载错误占位图，加载位置参数(threshold)，各种事件等。

<custom-block></custom-block>

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

通过`image`参数传入图片的`src`路径即可

:::warning 注意
由于uni-app默认给了image组件的`height`为225px，同时也只有在uni-appimage组件的`mode`参数为`widthFix`时，image才会自动计算出一个高度值
覆盖默认的`height`(225px)。其他`mode`参数下，如果设置`height`为`auto`，或者`100%`的话，图片将会无法显示。  

所以：当您使用uView的`lazyload`组件时，如果设置`height`参数为`auto`，或者`100%`，而`img-mode`参数又不为`widthFix`的话，图片将会不显示，这不是uView的BUG。  

结论：如果`img-mode`参数不为`widthFix`的话，必须设置`height`参数为一个固定的高度(单位rpx)，否则无效。
:::


```html
<template>
	<view>
		<u-lazy-load v-for="(item, index) in list" :key="index" :image="item.src"></u-lazy-load>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 设计成数组内嵌对象而不是纯数组形式，是考虑到真实环境后端返回的数据为如此形式
				list: [{
						src: "https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg",
					},
					{
						src: "https://gtd.alicdn.com/sns_logo/i7/TB1IWtgQFXXXXcmXFXXSutbFXXX.jpg_240x240xz.jpg",
					},
					{
						src: "https://gtd.alicdn.com/sns_logo/i1/TB1_f_PLXXXXXbVXpXXSutbFXXX.jpg_240x240xz.jpg",
					},
					{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "xxx",
					},
				]
			}
		}
	}
</script>
```

### 配置占位图

占位图有两种情况：
- 一种是正常预加载时显示的，通过`loading-img`配置类似"正在加载"的占位图。
- 另一种是图片加载失败(如图片不存在，路径不完整等)，通过`error-img`参数配置类似"图片加载错误"的占位图

```html
<template>
	<view>
		<u-lazy-load :image="image" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				image: "https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg",
				loadingImg: '/static/uView/loading.png',
				errorImg: '/static/uView/load_error.png'
			}
		}
	}
</script>
```

### 图片加载位置

可以通过`threshold`参数设置图片距离屏幕底部多少距离时触发图片加载，单位rpx，说明：
- 如果取负值(如-300)，为尚未到达屏幕底部，距离300rpx时触发
- 如果取正数(如300)，为图片超出屏幕底部300rpx时触发

```html
<u-lazy-load :image="image" threshold="300"></u-lazy-load>
```


### API

###  Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| index | 用户自定义值，在事件触发时回调，用以区分是哪个图片 | String \| Number | - | - |
| image | 图片路径 | String | - | - |
| loading-img | 预加载时的占位图 | String | - | - |
| error-img | 图片加载出错时的占位图 | String | - | - |
| threshold | 触发加载时的位置，见上方说明，单位 rpx | String | 100 | - |
| duration | 图片加载成功时，淡入淡出时间，单位ms | String \| Number | 500 | - |
| effect | 图片加载成功时，淡入淡出的css动画效果 | String | ease-in-out | linear /  ease / ease-in / ease-out |
| is-effect | 图片加载成功时，是否启用淡入淡出效果 | Boolean | true | false |
| border-radius | 图片圆角值，单位rpx | String \| Number | 0 | - |
| height | 图片高度，注意：实际高度可能受`img-mode`参数影响 | String \| Number | 450 | - |
| img-mode | 图片的裁剪模式，详见[image组件裁剪模式](https://uniapp.dcloud.io/component/image) | String \| Number | widthFix | - |

### Events

|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
|click|点击图片时触发|index：用户通过props传递的`index`值|-|
|load|图片加载成功时触发|index：用户通过props传递的`index`值|-|
|error|图片加载失败时触发|index：用户通过props传递的`index`值|-|
