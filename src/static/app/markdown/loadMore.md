## loadMore 加载更多 <to-api/>

<demo-model url="/pages/componentsC/loadmore/index"></demo-model>


此组件一般用于标识页面底部加载数据时的状态，共有三种状态：
- 加载前，显示"加载更多"，加入点击可选，是因为数据不够一页时，无法触发页面的`onReachBottom`生命周期
- 加载中，显示"正在加载..."，2种动画可选
- 加载后，如果还有数据，回到"加载前"状态，否则加载结束，显示"没有更多了"

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`status`设置组件的状态，加载前值为`loadmore`，加载中为`loading`，没有数据为`nomore`

注意：以下示例仅为模拟效果，实际中请根据自己的逻辑，修改代码的实现

```html
<template>
	<view class="wrap">
		<view class="item u-border-bottom" v-for="(item, index) in list" :key="index">
			{{'第' + item + '条数据'}}
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				list: 15,
				page: 0
			}
		},
		onReachBottom() {
			if(this.page >= 3) return ;
			this.status = 'loading';
			this.page = ++ this.page;
			setTimeout(() => {
				this.list += 10;
				if(this.page >= 3) this.status = 'nomore';
				else this.status = 'loading';
			}, 2000)
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 24rpx;
	}
	
	.item {
		padding: 24rpx 0;
		color: $u-content-color;
		font-size: 28rpx;
	}
</style>
```

### 控制组件的提示以及动画效果

- 可以通过`icon-type`设置加载中的图标为`flower`或者`circle`，如果不需要图标，可以设置`icon`为`false`
- 可以设置`is-dot`为`true`，在没有数据时，内容显示为一个"●"替代默认的"没有更多了"
- 可以通过配置`load-text`配置提示的文字，该参数为一个对象值，可以修改默认的文字提示，见如下：

```html
<template>
	<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			}
		}
	}
</script>
```


### 手动触发加载更多

有时候可能会因为网络，或者数据不满一页的原因，导致无法上拉触发`onReachBottom`生命周期，这时候(需`status`为`loadmore`状态)，用户点击组件，就会触发`loadmore`
事件，可以在回调中，进行状态的控制和数据的加载，同时也可以修改`loadText`的`loadmore`为"上拉或点击加载更多"进行更加人性化的提示。


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| status | 组件状态  | String | loadmore | loading / nomore |
| bg-color | 组件背景颜色，在页面是非白色时会用到(1.7.0起废弃此参数，默认为transparent)  | String	 | #ffffff | - |
| icon | 加载中时是否显示图标  | Boolean | true | false |
| icon-type | 加载中时的图标类型， | String | circle | flower |
| icon-color | `icon-type`为`circle`时有效，加载中的动画图标的颜色  | String | #b7b7b7 | - |
| is-dot |  `status`为`nomore`时，内容显示为一个"●" | Boolean | false | true |
| color | 字体颜色  | String | #606266 | - |
| font-size | 字体大小，单位rpx  | String \| Number | 28 | - |
| load-text | 自定义显示的文字，见上方说明示例  | Object | - | - |
| margin-top | 与前一个元素的距离，单位rpx | String \| Number  | 0 | - |
| margin-bottom | 与后一个元素的距离，单位rpx | String \| Number  | 0 | - |


### Event


|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
| loadmore | `status`为`loadmore`时，点击组件会发出此事件 | - | - |