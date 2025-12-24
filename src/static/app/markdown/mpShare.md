# mpShare 小程序分享

<demo-model url="/pages/library/mpShare/index"></demo-model>


此功能，是对uni的[onShareAppMessage 生命周期](https://uniapp.dcloud.io/api/plugins/share?id=onshareappmessage)的封装。  

这里说的小程序，指的是"微信小程序、百度小程序、头条小程序、QQ小程序，支付宝小程序等"。  

由于小程序的分享(微信、头条平台)，需要监听页面的`onShareAppMessage`生命周期，小程序需要在页面声明了此生命周期，点击右上角的"胶囊"才会有分享功能，
而一般情况下，我们希望每个页面都可以分享，那就需要每个页面都写一遍这个生命周期，是很繁琐的。   

基于以上，uView通过`mixin`的形式，给每一个页面注入了`onShareAppMessage`生命周期，让您简单引入，无需任何后续操作，即可让每一个页面都有分享功能(仅针对小程序)。  


## 平台差异说明

|  App  |  H5   | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 |
| :---: | :---: | :--------: | :----------: | :--------: | :--------: | :------: |
|   x   |   x   |     √      |      √       |     √      |     √      |    √     |


## 基本使用

需要注意的是，小程序(uni)没有提供类似"getNavigationBarTitle"这样的接口，所以我们无法获取当前页面导航栏的标题，换言之，我们想要每个页面个性化的
分享标题，需要手动设置，否则**默认为小程序的名称**。

分享功能是默认关闭的，但是我们写好各项配置，您只要在`main.js`中引入对应的文件即可，我们没有默认引入，是因为某些用户并不需要此功能。

打开小程序分享功能：
```js
// main.js

// 其他内容

// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-pro/libs/mixin/mpShare.js');
Vue.mixin(mpShare)

// 其他内容
```

分享功能，一般有三个参数，如下：

```js
// 该对象已集成到this.$u中，内部属性如下
uni.$u.mpShare = {
	title: '', // 默认为小程序名称，可自定义
	path: '', // 默认为当前页面路径，一般无需修改，QQ小程序不支持
	// 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
	// 支持PNG及JPG，默认为当前页面的截图
	imageUrl: '' 
}
```

以上这些，uView已通过`mixin`集成，当某一个页面您需要自定义分享信息时，可以通过"uni.$u.mpShare"对进行修改，在页面的`onLoad`生命周期修改即可。

```vue
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

onLoad(() => {
  uni.$u.mpShare.title = '天苍苍野茫茫，风吹草低见牛羊';
})
</script>
```


## 重写"onShareAppMessage"生命周期

如果您基于自己的一些业务逻辑，需要更加自定义的实现逻辑，可以在页面中重写`onShareAppMessage`生命周期即可覆盖uView通过`mixin`监听的`onShareAppMessage`生命周期。

```vue
<script setup lang="ts">
// 这里如果写成onShareAppMessage: res => { ... }形式的箭头函数，在内部会无法获得this
export function onShareAppMessage(res: any) {
  if (res.from === 'button') {// 来自页面内分享按钮
    console.log(res.target)
  }
  return {
    title: '自定义分享标题',
    path: '/pages/test/test?id=123'
  }
}
</script>
```

## 分享到朋友圈

此功能为微信小程序最新加入的功能，仅适用于微信小程序，uView也全局监听了此生命周期。

同理，你也可以在页面中重写`onShareTimeline`生命周期即可覆盖uView通过`mixin`监听的`onShareTimeline`生命周期。

```vue
<script setup lang="ts">
export function onShareTimeline(res: any) {
  if (res.from === 'button') {// 来自页面内分享按钮
    console.log(res.target)
  }
  return {
    title: '自定义分享标题',
    path: '/pages/test/test?id=123'
  }
}
</script>
```

<!-- ## 如何取消全局分享

此功能为uView默认开启的，如果用户想全局取消或者单个页面取消分享功能，只需将"uni.$u.mpShare"设置为`false`即可

- 全局取消，在App.vue的`onLaunch`应用生命周期中设置

```js
export default {
	onLaunch() {
		uni.$u.mpShare = false;
	}
}
```

- 某个特定的页面取消，在`onLoad`生命周期中设置

```js
export default {
	onLoad() {
		uni.$u.mpShare = false
	}
}
``` -->
