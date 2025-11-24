## Toast 消息提示 <to-api/>

<demo-model url="/pages/componentsA/toast/index"></demo-model>


此组件表现形式类似uni的`uni.showToast`API，但也有不同的地方，具体表现在：
- uView Pro的`toast`有5种主题可选
- 可以配置toast结束后，跳转相应URL
- 目前没有加载中的状态，请用uni的`uni.showLoading`，这个需求uni已经做得很好


:::warning 注意：
由于uni中无法通过js创建元素，所以需要在页面中调用`<toast />`组件，再通过`ref`开启
:::

### 基本使用

以下为一个模拟登录成功后，弹出toast提示，并在一定时间(默认2000ms)后，自动跳转页面到个人中心页(也可以配置跳转的参数)的示例

``` html
<template>
	<view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		methods: {
			showToast() {
				this.$refs.uToast.show({
					title: '登录成功',
					type: 'success',
					url: '/pages/user/index'
				})
			}
		}
	}
</script>
```

### 配置toast主题

一共有6种主题可选，如下：
- default-灰黑色，最普通的场景，此为默认主题，可以不用填`type`参数
- error-红色，代表错误
- success-绿色，代表成功
- warning-黄色，代表警告
- info-灰色，比default浅一点
- primary-蓝色，uView的主色调

除了`default`状态，其他5种主题，都是默认带有一个左边的图标，可以通过配置`icon`参数为`none`来取消

``` js
this.$refs.uToast.show({
	title: '操作成功',
	// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
	// type: 'success', 
	// 如果不需要图标，请设置为false
	// icon: false
})
```

### toast结束跳转URL

- 如果配置了`url`参数，在toast结束的时候，就会用`uni.navigateTo`(默认)或者`uni.switchTab`(需另外设置`isTab`为`true`)
- 如果配置了`params`参数，就会在跳转时自动在URL后面拼接上这些参数，具体用法如下：

``` js
this.$refs.uToast.show({
	title: '操作成功',
	url: '/pages/user/index',
	params: {
		id: 1,
		menu: 3
	}
})
```

### API

### Props

| 参数      | 说明        | 类型     |  默认值  |  可选值   |
|-----------|-----------|----------|----------|---------|
| z-index | toast展示时的`z-index`值  | String \| Number | 10090 | - |

### Params

这些参数为通过`ref`调用`<toast/>`组件内部的`show`方法时，需要传递参数

| 参数      | 说明        | 类型     |  默认值  |  可选值   |
|-----------|-----------|----------|----------|---------|
| title | 显示的文本  | String | - | - |
| type | 主题类型，不填默认为`default` | String  | default | primary / success / error / warning / info |
| duration | toast的持续时间，单位ms | Nubmer  | 2000 | - |
| url | toast结束跳转的url，不填不跳转，优先级高于`back`参数 | String  | - | - |
| icon | 是否显示显示`type`对应的图标，为`false`不显示图标 | Boolean  | true | false |
| position | toast出现的位置 | String  | center | top / bottom |
| callback | toast结束后执行的回调方法 | Function  | - | - |
| isTab | toast结束后，跳转tab页面时需要配置为`true` | Boolean  | false | true |
| back | toast结束后，是否返回上一页，优先级低于`url`参数 | Boolean  | false | true |

### Methods

方法是通过`ref`调用的，参见上方说明
注意：所有有关`ref`的调用，都不能在页面的`onLoad`生命周期调用，因为此时组件尚未创建完毕，会报错，应该在`onReady`生命周期调用。

|方法名|说明|参数|版本|
|:-|:-|:-|:-|
| show | 显示toast，如需一进入页面就显示toast，请在`onReady`生命周期调用 | 见上方说明 |  -  |
