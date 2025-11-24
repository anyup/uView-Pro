## Waterfall 瀑布流 <to-api/>

<demo-model url="/pages/componentsB/waterfall/index"></demo-model>


这是一个瀑布流形式的组件，内容分为左右两列，结合uView的`懒加载`组件效果更佳。  
相较于某些只是奇偶数左右分别，或者没有利用vue作用域插槽的做法，uView Pro的瀑布流实现了真正的
组件化，搭配[LazyLoad 懒加载](/components/lazyLoad.html)和[loadMore 加载更多](/components/loadMore.html)组件，让您开箱即用，眼前一亮。

<custom-block></custom-block>

:::warning 注意
1. 在微信小程序中，需要hx2.8.11才支持在懒加载中结合其他组件
2. 从1.2.8版本起，新增了清空列表和移除某条数据的组件方法，原`flow-list`参数，需要改为`v-model`接收传值
3. 由于hx的问题，支付宝小程序需要hx2.8.2版本及以上才支持本组件
:::

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

本组件利用了vue的作用域插槽([详见vue文档](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD))特性，
将传入`waterfall`内部的数据，通过`slot`(作用域插槽)让用户能在父组件中引用和配置对应的数据，这样做的
原因是可以让用户自定义列表`item`的结构和样式，达到真正的组件化。  

需要注意的是，组件内部导出的数据，需要使用`template`元素接收，同时通过`v-slot`指定左右两列的`slot`，如
`v-slot:left="list"`，这里的`list`变量名为用户自定义的(意味着您可以起名叫`data`都是没问题的)，它为一个对象，它内部分别有`leftList`和`rightList`，用于
渲染左右两列的数据，见如下完整示例：

### 核心代码
```html
<u-waterfall v-model="flowList">
	<template v-slot:left="{leftList}">
		<view v-for="(item, index) in leftList" :key="index">
			<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
		</view>
	</template>
	<template v-slot:right="{rightList}">
		<view v-for="(item, index) in rightList" :key="index">
			<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
		</view>
	</template>
</u-waterfall>
```


### 移除或清空数据

移除或者清空，都需要通过`ref`调用组件内部的方法。

1. 移除数据

组件内部方法名为`remove`，需要传入"id"值，这个"id"键值的名称配置参数为`idKey`(默认`id`)，如下：

假设您的数据为:

```js
let arr = [
	{idx: 1, name: 'lisa'},
	{idx: 2, name: 'mary'}
]
```

那么您应该配置`idKey`为`idx`。

2. 清空数据

通过`ref`手动调用组件内部的`clear`方法，可以清空左右两列的数据。

说明：具体实现方法，请见下方的示例代码


### 完整应用示例

```html
<template>
	<view class="wrap">
		<u-button @click="clear">清空列表</u-button>
		<u-waterfall v-model="flowList" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="demo-title">
						{{item.title}}
					</view>
					<view class="demo-price">
						{{item.price}}元
					</view>
					<view class="demo-tag">
						<view class="demo-tag-owner">
							自营
						</view>
						<view class="demo-tag-text">
							放心购
						</view>
					</view>
					<view class="demo-shop">
						{{item.shop}}
					</view>
					<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="demo-title">
						{{item.title}}
					</view>
					<view class="demo-price">
						{{item.price}}元
					</view>
					<view class="demo-tag">
						<view class="demo-tag-owner">
							自营
						</view>
						<view class="demo-tag-text">
							放心购
						</view>
					</view>
					<view class="demo-shop">
						{{item.shop}}
					</view>
					<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon>
				</view>
			</template>
		</u-waterfall>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'loadmore',
				flowList: [],
				list: [
					{
						price: 35,
						title: '北国风光，千里冰封，万里雪飘',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 75,
						title: '望长城内外，惟余莽莽',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg',
					},
					{
						price: 385,
						title: '大河上下，顿失滔滔',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
					},
					{
						price: 784,
						title: '欲与天公试比高',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
					},
					{
						price: 7891,
						title: '须晴日，看红装素裹，分外妖娆',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg',
					},
					{
						price: 2341,
						shop: '李白杜甫白居易旗舰店',
						title: '江山如此多娇，引无数英雄竞折腰',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg',
					},
					{
						price: 661,
						shop: '李白杜甫白居易旗舰店',
						title: '惜秦皇汉武，略输文采',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
					},
					{
						price: 1654,
						title: '唐宗宋祖，稍逊风骚',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						price: 1678,
						title: '一代天骄，成吉思汗',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						price: 924,
						title: '只识弯弓射大雕',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						price: 8243,
						title: '俱往矣，数风流人物，还看今朝',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
				]
			}
		},
		onLoad() {
			this.addRandomData();
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		methods: {
			addRandomData() {
				for(let i = 0; i < 10; i++) {
					let index = uni.$u.random(0, this.list.length - 1);
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(this.list[index]))
					item.id = uni.$u.guid();
					this.flowList.push(item);
				}
			},
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			clear() {
				this.$refs.uWaterfall.clear();
			}
		}
	}
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}
	
	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}
	
	.demo-image {
		width: 100%;
		border-radius: 4px;
	}
	
	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}
	
	.demo-tag {
		display: flex;
		margin-top: 5px;
	}
	
	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}
	
	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}
	
	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}
	
	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>
```

### 注意事项

1. 上方的示例中，结合了uView的[lazyload懒加载](/components/lazyLoad.html)和[loadmore加载更多](/components/loadmore.html)组件，具体用法，请见文档。  
2. 需要通过`v-model`传递参数，将数据传递给组件，组件内部将每次新增的数据，通过动态查询左右列的高度
添加到高度低的一列。  
3. 组件有一个`add-time`参数，用于将单条数据添加到队列的时间间隔，因为图片加载是需要时间的，所以瀑布流左右列
的高度会不定时改变，`add-time`值越大，对程序效果越好，但是对用户来说，越大值可能就是以能感受的速度一个一个添加
到队列尾部的，所以这是一个双面性的结果。
4. 由于图片加载完成的时机是不确定的，导致图片加载完成时，队列的高度会发生改变，而且这个时机是无法确定的，
所以每次添加数据的时候，单次请求的所有数据中最后一个数据不一定能准确添加高度更低的队列一侧，但是可以保证下一次请求数据的第一条
能准确添加到队列高度低的一侧。


### API

### IndexBar Props

注意：1.2.8版本后，通过`v-model`双向绑定传递参数，因为组件内部需要修改父组件的值。

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| add-time | 单条数据添加到队列的时间间隔，单位ms，见上方注意事项说明  | String \| Number | 200 | - |
| idKey | 数据的唯一值的键名，见上方说明  | String | id | - |



### Methods

这些为组件内部的方法，需要通过`ref`调用

| 参数          | 说明            | 
|-------------  |---------------- |
| clear | 清空列表数据 | 
| remove(id) | `id`为唯一的"id"值，见上方说明  | 



<style scoped>
h3[id=methods] + p + table thead tr th:nth-child(2){
	width: 50%;
}
</style>