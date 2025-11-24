## Upload 上传 <to-api/>

<demo-model url="/pages/componentsB/upload/index"></demo-model>


该组件用于上传图片场景

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 可以通过设置`file-list`参数(数组，元素为对象)，显示预置的图片。其中元素的`url`属性为图片路径
- 设置`action`参数为后端服务器地址，注意H5在浏览器可能会有跨域限制，让后端允许域即可

```html
<template>
	<u-upload :action="action" :file-list="fileList" ></u-upload>
</template>

<script>
	export default {
		data() {
			return {
				// 演示地址，请勿直接使用
				action: 'http://www.example.com/upload',
				fileList: [
					{
						url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
					}
				]
			}
		}
	}
</script>
```

### 手动上传

组件默认为自动上传，可以设置`auto-upload`为`false`，然后通过`ref`调用组件的`upload`方法，手动上传图片

```html
<template>
	<view>
		<u-upload ref="uUpload" :action="action" :auto-upload="false" ></u-upload>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 非真实地址
				action: 'http://www.example.com/upload',
			}
		},
		methods: {
			submit() {
				this.$refs.uUpload.upload();
			},
		}
	}
</script>
```

### 获取上传的图片列表

图片选择或者上传成功后，会保存在组件内部的`lists`数组中，数组元素为对象，有如下属性：
- url: 图片地址
- error：组件内部使用，不应根据此值判断上传是否成功，而应根据`progress`属性
- progress：如果值为100，表示图片上传成功
- response：上传成功后，服务器返回的数据，这是最有用的了

为了获得上传的文件列表，可以在提交表单时，通过`ref`获取组件内部的`lists`文件数组，历遍元素筛选出`progress`为100的文件

```html
<template>
	<view>
		<u-upload ref="uUpload" :action="action" :auto-upload="true" ></u-upload>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action: 'http://www.example.com/upload',
				filesArr: []
			}
		},
		methods: {
			submit() {
				let files = [];
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				files = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				// 如果您不需要进行太多的处理，直接如下即可
				// files = this.$refs.uUpload.lists;
				console.log(files)
			}
		}
	}
</script>
```

### 报错提示

在以下几种情况，组件会默认通过toast提示用户信息，可以把`show-tips`设置为`false`取消默认的提示，这时可以通过API
中的各种事件，进行自定义的个性化提示
- 超出允许的最大上传数量
- 图片大小超出最大允许大小
- 上传图片出错
- 移除图片

以下示例为屏蔽组件内部的提示，在移除图片时，监听`onRemove`事件，手动提示的情况

```html
<template>
	<u-upload ref="uUpload" :action="action" :show-tips="false" @on-remove="onRemove"></u-upload>
</template>

<script>
	export default {
		data() {
			return {
				action: 'http://www.example.com/upload',
			}
		},
		methods: {
			onRemove(index, lists) {
				console.log('图片已被移除')
			},
		}
	}
</script>
```

### 限制图片数量和大小

- 通过`max-count`可以设置最多可以选择的图片的数量
- 通过`max-size`设置单张图片最大的大小，单位为B(byte)，默认不限制

下方示例为单张最大为5M，最多选择6张的情况：

```html
<u-upload :max-size="5 * 1024 * 1024" max-count="6"></u-upload>
```


### 上传前的钩子

某些时候，**每个文件**上传前可能需要动态修改文件名，修改额外参数等，就会需要用到一个叫`before-upload`的钩子(参数注意不要加括号)，也即回调方法，此方法会返回两个参数：

- `index`——即当前上传文件在上传列表中的索引
- `lists`——当前所有的文件列表

此回调可以返回一个`promise`、`true`，或者`false`，下面分别阐述三者的处理情况：

- `false`——如果返回`false`，将会跳过当前文件，继续上传下一张图片(如果有)，并且再次执行`before-upload`钩子
- `true`——如果返回`true`，会随即上传当前文件，上传成功后，继续上传下一张图片(如果有)，并且再次执行`before-upload`钩子
- `promise`——如果返回的是一个`promise`，如果进入`then`回调，就会和返回`true`的情况一样，如果进入`catch`回调，就会和返回`false`的情况一样

下面举例说明：

#### 1. 普通返回

```html
<template>
	<u-upload :before-upload="beforeUpload"></u-upload>
</template>

<script>
	export default {
		methods: {
			beforeUpload(index, list) {
				// 只上传偶数索引的文件
				if(index % 2 == 0) return true;
				else return false;
			}
		}
	}
</script>
```

#### 2. 请求之后再返回

```html
<template>
	<u-upload :before-upload="beforeUpload"></u-upload>
</template>

<script>
	export default {
		methods: {
			async beforeUpload(index, list) {
				// await等待一个请求，请求回来后再返回true，继续上传文件
				let data = await uni.$u.post('url');
				return true; // 或者根据逻辑返回false
			}
		}
	}
</script>
```

#### 3. 返回一个Promise

```html
<template>
	<u-upload :before-upload="beforeUpload"></u-upload>
</template>

<script>
	export default {
		methods: {
			beforeUpload(index, list) {
				// 返回一个promise
				return new Promise((resolve, reject) => {
					uni.$u.post('url').then(res => {
						// resolve()之后，将会进入promise的组件内部的then回调，相当于返回true
						resolve();
					}).catch(err => {
						// reject()之后，将会进入promise的组件内部的catch回调，相当于返回false
						reject();
					})
				})
			}
		}
	}
</script>
```

### 移除前的钩子

某些时候，文件被移除前可能需要进行判断是否可以被移除，就会需要用到一个叫`before-remove`的钩子(参数注意不要加括号)，也即回调方法，此方法会返回两个参数：

- `index`——即当前上传文件在上传列表中的索引
- `lists`——当前所有的文件列表

此回调可以返回一个`promise`、`true`，或者`false`，下面分别阐述三者的处理情况：

- `false`——如果返回`false`，终止移除操作
- `true`——如果返回`true`，执行移除操作
- `promise`——如果返回的是一个`promise`，如果进入`then`回调，就会和返回`true`的情况一样，如果进入`catch`回调，就会和返回`false`的情况一样

此处不举例说明，参考`before-upload`的示例即可。


### 自定义相关说明

1. 组件内部样式  
组件默认选取图片会展示预览缩略图，包括默认的选取图片的按钮，他们的宽高都是`200rpx`，`border-radius`值为`10rpx`，
另外预览图片的盒子有一个默认的边框，值为`border: 1px solid rgb(235, 236, 238)`。如果用户需要自定义上传按钮，可以参考这些值。

2. 自定义上传按钮  
通过传递名为`addBtn`的`slot`，同时配置`custom-btn`为`true`，可以自定义想要的上传按钮。

如下所示：

```html
<u-upload :custom-btn="true">
	<template #addBtn>
		<view class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
			<u-icon name="photo" size="60" color="#2979ff"></u-icon>
		</view>
	</template>
</u-upload>

<style>
.slot-btn {
	width: 329rpx;
	height: 140rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgb(244, 245, 246);
	border-radius: 10rpx;
}

.slot-btn__hover {
	background-color: rgb(235, 236, 238);
}
</style>
```

3. 自定义预览列表
首先需要设置`show-upload-list`为`false`来去除组件内部的默认预览列表，其次需要通过`ref`获取组件，进而
操作组件内部的变量和方法，下面为一些组件内部的方法和变量说明：
- `lists`(变量)，可以通过此值，构建自定义的预览列表，该变量内部如下：

```js
lists = [
	{
		url: 'xxx.png', // 预览图片的地址
		error: false, // 上传失败，此值为true
		progress: 100, // 0-100之间的值
	},
	......
]
```

- `deleteItem(index)`(方法)，可以用此方法在自定义列表中通过`ref`删除某一张图片

以下为完整的自定义图片预览列表示例：

```html
<template>
	<view class="wrap">
		<view class="pre-box" v-if="!showUploadList">
			<view class="pre-item" v-for="(item, index) in lists" :key="index">
				<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
			</view>
		</view>
		<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action">
			<template #addBtn>
				<view class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="photo" size="60" color="#c0c4cc"></u-icon>
				</view>
			</template>
		</u-upload>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action: 'http://www.example.com', // 演示地址
				showUploadList: false, 
				// 如果将某个ref的组件实例赋值给data中的变量，在小程序中会因为循环引用而报错
				// 这里直接获取内部的lists变量即可
				lists: []
			}
		},
		// 只有onReady生命周期才能调用refs操作组件
		onReady() {
			// 得到整个组件对象，内部图片列表变量为"lists"
			this.lists = this.$refs.uUpload.lists;
		}
	}
</script>

<style lang="scss">
	.wrap {
		padding: 24rpx;
	}
	
	.slot-btn {
		width: 341rpx;
		height: 140rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}

	.pre-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.pre-item {
		flex: 0 0 48.5%;
		border-radius: 10rpx;
		height: 140rpx;
		overflow: hidden;
		position: relative;
		margin-bottom: 20rpx;
	}

	.pre-item-image {
		width: 100%;
		height: 140rpx;
	}
</style>
```


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| action | 服务器上传地址  | String | - | - |
| max-count | 最大选择图片的数量 | String \| Number | 99 | - |
| width | 图片预览区域和添加图片按钮的宽度，单位rpx，不能是百分比，或者`auto` | String \| Number | 200 | - |
| height | 图片预览区域和添加图片按钮的高度，单位rpx，不能是百分比，或者`auto` | String \| Number | 200 | - |
| custom-btn | 如果需要自定义选择图片的按钮，设置为`true` | Boolean | false | true |
| show-progress | 是否显示进度条 | Boolean  | true | false |
| disabled | 是否启用(显示/隐藏)组件 | Boolean  | false | true |
| image-mode | 预览图片等显示模式，可选值为uni的image的`mode`属性值 | String  | aspectFill | - |
| header | 上传携带的头信息，对象形式 | Object | {} | - |
| form-data | 上传额外携带的参数 | Object | {} | - |
| name | 上传文件的字段名，供后端获取使用 | String  | file | - |
| size-type | original 原图，compressed 压缩图，默认二者都有，H5无效 | Array\<String\>  | ['original', 'compressed'] | - |
| source-type | 选择图片的来源，album-从相册选图，camera-使用相机，默认二者都有 | Array\<String\>  | ['album', 'camera'] | - |
| preview-full-image | 是否可以通过`uni.previewImage`预览已选择的图片 | Boolean  | true | false |
| multiple | 是否开启图片多选，部分安卓机型不支持  | Boolean  | true | false |
| deletable | 是否显示删除图片的按钮 | Boolean  | true | false |
| max-size | 选择单个文件的最大大小，单位B(byte)，默认不限制 | String \| Number  | Number.MAX_VALUE | - |
| file-list | 默认显示的图片列表，数组元素为对象，必须提供`url`属性 | Array\<Object\>  | - | - |
| upload-text | 选择图片按钮的提示文字 | String  | 选择图片 | - |
| auto-upload | 选择完图片是否自动上传，见上方说明 | Boolean  | true | false |
| show-tips | 特殊情况下是否自动提示toast，见上方说明 | Boolean  | true | false |
| show-upload-list | 是否显示组件内部的图片预览 | Boolean  | true | false |
| del-icon | 右上角删除图标名称，只能为uView内置图标 | String  | close | - |
| del-bg-color | 右上角关闭按钮的背景颜色 | String  | #fa3534 | - |
| del-color | 右上角关闭按钮图标的颜色 | String  | #ffffff | - |
| to-json | 如果上传后服务端返回的值为`json`字符串的话，是否自动转为`json` | Boolean | true  | false |
| before-upload | 每个文件上传前触发的钩子回调函数，见上方说明，注意不要加括号 | Function | - | - |
| limitType | 允许的图片后缀 | Array | ['png', 'jpg', 'jpeg', 'webp', 'gif'] | - |
| index  | 在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件 | String \| Number  | - | - |


### Methods

此方法如要通过ref手动调用

| 名称          | 说明            |
|-------------  |---------------- |
| upload | 调用此方法，手动上传图片  |
| clear | 调用此方法，清空内部文件列表  |
| reUpload | 调用此方法，重新上传内部上传失败或者尚未上传的图片  |
| remove(index) | 手动移除列表的某一个图片，`index`为`lists`数组的索引  |


### Slot

|名称|说明|
|:-|:-|
| addBtn | 自定义的选择图片按钮 |



### Events

回调参数中的`lists`参数，为目前组件内的所有图片数组，`index`为当前操作的图片的索引，`name`为通过`props`传递的`index`参数(1.6.1加入)

|事件名|说明|回调参数|
|:-|:-|:-|:-|
| on-oversize | 图片大小超出最大允许大小 | (file, lists, name), name为通过`props`传递的`index`参数 |
| on-preview | 全屏预览图片时触发 | (url, lists, name)，url为当前选中的图片地址，index为通过`props`传递的`index`参数 |
| on-remove | 移除图片时触发 | (index, lists, name)，name为通过`props`传递的`index`参数 |
| on-success | 图片上传成功时触发 | (data, index, lists, name)，data为服务器返回的数据，name为通过`props`传递的`index`参数 |
| on-change | 图片上传后，无论成功或者失败都会触发 | (res, index, lists, name)，res为服务器返回的信息，name为通过`props`传递的`index`参数 |
| on-error | 图片上传失败时触发 | (res, index, lists, name)，res为服务器返回的信息，name为通过`props`传递的`index`参数 |
| on-progress | 图片上传过程中的进度变化过程触发 | (res, index, lists, name)，res为服务器返回的信息，具体参数请打印查看，name为通过`props`传递的`index`参数 |
| on-uploaded | 所有图片上传完毕触发 | (lists, name)，可以通过此事件，将lists参数获取，提交给后端使用，name为通过`props`传递的`index`参数 |
| on-choose-complete | 每次选择图片后触发，只是让外部可以得知每次选择后，内部的文件列表 | (lists, name)，内部当前的文件列表，name为通过`props`传递的`index`参数 |
| on-list-change | 当内部文件列表被加入文件、移除文件，或手动调用`clear`方法时触发 | (lists, name)，内部文件变化之后的列表，name为通过`props`传递的`index`参数 |
| on-choose-fail | 选择文件出错时触发，比如选择文件时取消了操作，只在微信和APP有效 | (error)，错误信息 |


<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=events] + p + table thead tr th:nth-child(3){
	width: 45%;
}

h3[id=methods] + p + table thead tr th:nth-child(2){
	width: 50%;
}
</style>