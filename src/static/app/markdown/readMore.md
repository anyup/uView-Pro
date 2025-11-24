## ReadMore 展开阅读更多 <to-api/>

<demo-model url="/pages/componentsB/readMore/index"></demo-model>


该组件一般用于内容较长，预先收起一部分，点击展开全部内容的场景。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

通过slot传入正文内容

```html
<template>
	<u-read-more>
		<rich-text :nodes="content"></rich-text>
	</u-read-more>
</template>

<script> 
	export default {
		data() {
			return {
				// 这是一段很长的文字，也可能包含有HTML标签等内容
				content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
				苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
				无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`,
			}
		}
	}
</script>
```

<!-- ### 兼容性

由于一些微信小程序平台的渲染能力的问题，在解析[u-parse](/components/readMore.html)组件内容时会比较耗时，导致`read-more`组件内部无法准确得知
内容的高度，而出现计算错误，这种情况下，我们需要借助`u-parse`组件的`@load`(内容多为文字时)或者`@ready`(内容多为图片时，可能会有较大延时)事件，通过`ref`
重新初始化`read-more`组件的高度，如下：

```html
<template>
	<u-read-more ref="uReadMore">
		<u-parse :html="content" @load="parseLoaded"></u-parse>
	</u-read-more>
</template>

<script> 
	export default {
		data() {
			return {
				// 这是一段很长的文字，也可能包含有HTML标签等内容
				content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
				苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
				无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`,
			}
		},
		methods: {
			parseLoaded() {
				this.$refs.uReadMore.init();
			}
		}
	}
</script>
``` -->


### 展开收起

配置`toggle`为`true`，展开后可以收起，否则展开后没有收起的按钮

```html
<u-read-more :toggle="true">
	<rich-text :nodes="content"></rich-text>
</u-read-more>
```

### 配置展开高度

可以配置一个高度，单位rpx，只有slot传入的内容高度超出这个值，才会出现"展开阅读全文"字样的按钮

```html
<u-read-more show-height="600">
	<rich-text :nodes="content"></rich-text>
</u-read-more>
```

### 异步初始化

有时候需要展示的内容是从后端获取的，组件内部的`mounted`生命周期初始化时，请求尚未回来，会导致
内容的高度在初始化有误差。可以在请求完毕渲染后(指的是this.$nextTick)，通过`ref`调用组件的`init`方法，重新初始化

```html
<template>
	<u-read-more ref="uReadMore">
		<rich-text :nodes="content"></rich-text>
	</u-read-more>
</template>

<script> 
	export default {
		data() {
			return {
				content: '',
			}
		},
		onLoad() {
			// 模拟后端请求
			setTimeout(() => {
				this.content = `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
				苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
				无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`,
				// 请注意上方已在组件中添加ref-uReadMore
				this.$nextTick(() => {
					this.$refs.uReadMore.init();
				})
			}, 2000);
		}
	}
</script>
```

### 自定义样式

此组件上边部分有一个白色虚化的阴影，用以将点击区域与文字内容进行融合，如果您不想要这个阴影，可以调整`shadow-style`对象，此对象内部如下：

```css
{
	backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
	paddingTop: "300rpx",
	marginTop: "-300rpx"
}
```

如果您不想要阴影，将`backgroundImage`设置为`none`即可，关于`paddingTop`和`marginTop`自行调整至合适数值即可。


```html
<template>
	<u-read-more ref="uReadMore" :shadow-style="shadowStyle" :show-height="200">
		<rich-text :nodes="content"></rich-text>
	</u-read-more>
</template>

<script> 
	export default {
		data() {
			return {
				content: '',
				shadowStyle: {
					backgroundImage: "none",
					paddingTop: "0",
					marginTop: "20rpx"
				}
			}
		}
	}
</script>
```


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| show-height | 内容超出此高度才会显示展开全文按钮，单位rpx | String \| Number | 400 | - |
| toggle | 展开后是否显示收起按钮 | Boolean  | false | true |
| close-text | 关闭时的提示文字 | String  | 展开阅读全文 | - |
| font-size | 提示文字的大小，单位rpx | String \| Number  | 28 | - |
| open-text | 展开时的提示文字 | String  | 收起 | - |
| color | 提示文字的颜色 | String  | #2979ff | - |
| shadow-style | 对阴影的自定义处理，对象形式 | Object  | 见上方说明 | - |
| text-indent | 段落首行缩进的字符个数，无需缩进请设置为0 | String  | 2em | - |
| index | 用于在`open`和`close`事件中当作回调参数返回 | String \| Number  | - | - |



### Methods

此方法如要通过ref手动调用

| 名称          | 说明            |
|-------------  |---------------- |
| init | 重新初始化组件内部高度计算过程，如果内嵌[u-parse](/components/readMore.html)组件时可能需要用到 |


### Events


| 事件名 | 说明 | 回调参数 |
| :- | :- | :- |
| open | 内容被展开时触发 | index - props中传入的`index`参数值 |
| close | 内容被收起时触发 | index - props中传入的`index`参数值 |


<style scoped>
h3[id=events] + table thead tr th:nth-child(2){
	width: 33.3%;
}

h3[id=methods] + p + table thead tr th:nth-child(2){
	width: 70%;
}
</style>