## Avatar 头像 <to-api/>

<demo-model url="/pages/componentsA/avatar/index"></demo-model>


本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

通过`src`指定头像的路径即可简单使用，如果传递了`text`参数，`text`将会优先起作用  

**注意：** 请保证传递给`src`的是绝对地址，而不是相对地址，为什么呢？因为传入`avatar`组件的相对地址，是相对于组件的，而不是父组件(页面)，所以相对址可能会出错。


```html
<template>
	<view>
		<u-avatar :src="src"></u-avatar>
		<u-avatar :text="text"></u-avatar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				text: '无头像'
			}
		}
	}
</script>
```

### 头像类型

- `mode`参数指定头像的类型，取值`circle`为圆形，取值`square`为圆角方形

```html
<template>
	<u-avatar :src="src" mode="square"></u-avatar>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
			}
		}
	}
</script>
```

### 默认头像

如果头像加载失败，导致加载图片失败，将会显示一个默认的灰色头像


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| bg-color | 背景颜色，一般显示文字时用  | String | #ffffff | - |
| src | 头像路径，如加载失败，将会显示默认头像  | String	 | - | - |
| size | 头像尺寸，可以为指定字符串(large, default, mini)，或者数值，单位rpx | String \| Number  | default | - |
| mode | 显示类型，见上方说明 | String  | circle | square |
| text | 用文字替代图片，级别优先于`src` | String  | - | - |
| img-mode | 头像图片的裁剪类型，与uni的`image`组件的`mode`参数一致，如效果达不到需求，可尝试传`widthFix`值 | String  | aspectFill | - |
| show-sex | 是否显示右上角的性别图标 | Boolean  | false | true |
| sex-icon | 右上角性别图标，可传入图片路径，或内置图标名 | String  | man | woman |
| sex-bg-color | 性别图标的背景颜色 | String  | man-primary主题，woman-error主题 | - |
| show-level | 是否显示右下角的等级图标 | Boolean  | false | true |
| level-icon | 右下角等级图标，可传入图片路径，或内置图标名 | String  | level | - |
| level-bg-color | 等级图标的背景颜色 | String  | warning主题 | - |



### Event

|事件名|说明|回调参数|
|:-|:-|:-|
| click | 头像被点击 | index: 用户传递的标识符 |




<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 35%;
}
</style>
