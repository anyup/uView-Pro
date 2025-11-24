## Switch 开关选择器 <to-api/>

<demo-model url="/pages/componentsB/switch/index"></demo-model>


选择开关一般用于只有两个选择，且只能选其一的场景。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

通过`v-model`绑定一个`布尔值`变量，这个变量是双向绑定的，当用户开或关选择器的时候，在父组件的该值也会相应的变为`true`或者`false`，也就是说，
您不用监听`change`事件，也能知道选择器当前处于**开**或者**关**的状态。


```html
<template>
	<u-switch v-model="checked"></u-switch>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
			};
		},
		methods: {
			// switch打开或者关闭时触发，值为true或者false
			// 即使不监听此事件，this.checked此时也会相应的变成true或者false
			change(status) {
				// console.log(status);
			},
		}
	};
</script>
```

### 禁用switch

设置`disabled`为`true`，即可禁用某个组件，让用户无法点击，禁用分为两种状态：

- 一是关闭情况下的禁用，这时只显示一个白色的区域。
- 二是打开后再禁用，这时会在原有的颜色上加一个`opacity`透明度，但此时依然是不可操作的。

```html
<u-switch v-model="checked" :disabled="true"></u-switch>
```

### 加载中

通过设置`loading`变量为`true`，可以让`switch`处于加载中的状态，这时`switch`是不可操作的

```html
<u-switch v-model="checked" :loading="true"></u-switch>

<!-- 等价于 -->
<u-switch v-model="checked" loading></u-switch>
```

### 自定义颜色

```html
<u-switch v-model="checked" active-color="red" inactive-color="#eee"></u-switch>
```

### 自定义值

可以通过设置`active-value`和`inactive-value`来控制选择器打开或者关闭时，通过`change`事件发出的回调值。

```html
<u-switch v-model="checked" active-value="1" inactive-value="0"></u-switch>
```


### 异步控制

这种场景，一般发生在用户打开或者关闭选择器时，需要本地或者向后端请求判断，是否允许用户打开或者关闭的场景。  

- 假设原来是打开状态

1. 您通过`watch`监听`v-model`绑定的`checked`变量，或者通过监听`switch`的`change`事件，得知`checked`变量发生了变化
2. 这时您可以通过设置`loading`为`true`，同时将`checked`值设置为`true`(因为用户已关闭，这里让它重新打开，并处于加载中)
3. 等请求结束后，根据判断结果，把`checked`值设置为`true`或者`false`，同时去掉加载中状态(`loading`设置为`false`)，让组件呈现最终的状态

<br>

- 假设原来处于关闭状态

处理方法同上，只不过对应的状态是反过来的  

下面示例为原本是打开状态，用户把它关闭，我们通过异步控制的场景

:::warning 注意
此处示例中，我们通过`watch`监听`checked`变量为`false`的情景，在定时器模拟回调中又将`checked`设置为`false`，会造成无限循环，所以这里
引入了一个中间变量`controlStatus`来识别
:::


```html
<template>
	<u-switch v-model="checked" :loading="loading"></u-switch>
</template>

<script>
	export default {
		data() {
			return {
				checked: true,
				loading: false,
				// 中间变量，避免在watch中多次回调，造成无限循环
				controlStatus: false
			};
		},
		watch: {
			checked(val) {
				// 等于false，意味着用户手动关闭了switch
				if (val == false) {
					if(this.controlStatus == true) {
						this.controlStatus = false;
						return ;
					}
					// 重新打开switch，并让它处于加载中的状态
					this.checked = true;
					this.loading = true;
					// 模拟向后端发起请求
					this.getRestultFromServer();
				}
			}
		},
		methods: {
			// switch打开或者关闭时触发，值为true或者false
			change(status) {
				// console.log(status);
			},
			getRestultFromServer() {
				// 通过定时器模拟向后端请求
				setTimeout(() => {
					this.controlStatus = true;
					// 后端允许用户关闭switch，设置checked为false，结束loading状态
					this.loading = false;
					this.checked = false;
				}, 1500);
			}
		}
	};
</script>
```



### API

### Switch Props

注意：需要给`switch`组件通过`v-model`绑定一个布尔值，来初始化`switch`的状态，随后该值被双向绑定，
当用打开选择器时，该值在`switch`组件内部被修改为`true`，并反映到父组件，否则为`false`，换言之，您无需监听`switch`的`change`事件，也能
知道某一个`switch`是否被选中的状态

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| loading | 是否处于加载中  | Boolean | false | true |
| disabled | 是否禁用  | Boolean | false | true |
| size | 开关尺寸，单位rpx | String \| Number  | 50 | - |
| active-color | 打开时的背景色 | String  | #2979ff | - |
| inactive-color | 关闭时的背景色 | String  | #ffffff | - |
| vibrate-short | 是否使手机发生短促震动，目前只在iOS的微信小程序和微信小程序开发工具有效  | Boolean | false | true |
| active-value | 打开选择器时通过change事件发出的值 | Boolean \| Number \| String  | true | |
| inactive-value | 关闭选择器时通过change事件发出的值 | Boolean \| Number \| String | false |


### Switch Event

|事件名|说明|回调参数|
|:-|:-|:-|:-|
| change | 在`switch`打开或关闭时触发 | value：打开时为`active-value`值，关闭时为`inactive-value`值 |
