## NoNetwork 无网络提示 <to-api/>

<demo-model url="/pages/componentsA/noNetwork/index"></demo-model>


该组件无需任何配置，引入即可，内部自动处理所有功能和事件，有如下特点：
- 如果没有网络，该组件会以`fixed`定位，并且以很大的`z-index`值覆盖原来的内容。一旦有网络了，会自动隐藏该组件，实现自动化
- 在APP上，嵌入了5+接口，可以直接打开手机的设置页面，方便用户进行网络相关的设置

::: warning 说明
1. 应用有网络时，是不会触发本组件的，为了测试此功能，请关闭手机的数据连接以及WiFi即可
2. 由于普通的组件无法覆盖原生组件，所以本组件不适用那些有`video`，`map`等原生表现的组件的页面，可以自行使用uni的`cover-view`组件修改
:::

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|

### 基本使用

```html
<template>
	<view>
		<view class="u-text">
			这里是页面正式内容
		</view>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.u-text {
		padding-top: 300rpx;
		font-size: 30rpx;
		color: $u-type-primary;
		text-align: center;
	}
</style>
```


### 兼容性

- `头条小程序`不支持监听网络状态变化，故本组件不支持`头条小程序`


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| tips | 没有网络时的提示语 | String | 哎呀，网络信号丢失 | - |
| zIndex | 组件的`z-index`值  | String \| Number | 10080 | - |
| image | 无网络的图片提示，可用的src地址或base64图片 | String | - | - |

### Events


| 事件名 | 说明 | 回调参数 |
| :- | :- | :- |
| retry | 用户点击页面的"重试"按钮时触发 | - |

