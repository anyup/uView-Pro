## 注意事项

由于 uni-app 支持多端开发，而各端，特别是各小程序平台，没有统一的标准，加重了开发者和企业的成本，幸好 uni-app 使用 Vue 标准，对各端进行了写法的统一，
推动了生态的发展，但是由于某些小程序平台自身的原因，仍然会出现某些兼容性问题，我们会将制作 uView 过程中遇到，和平时收集的兼容性问题呈现在本专题，希望能
帮助到 uni-app 开发者。

### 支付宝小程序

:::tip 注意
uView Pro 需要开启了`component2`模式才支持支付宝小程序
:::

1. 支付宝在很早前，已升级为`component2`模式，此模式支持更多的功能和特性，uni-app 上，很多的特性，如`provide/inject`、`$slots`等，需要开启此模式才能支持，
   而此模式在 uni-app 新建项目中默认是关闭的，因而需要在项目根目录的`manifest.json`中开启，如没有`alipay`属性节点，新增即可：

```json
......
"mp-alipay" : {
	"component2": true
},
......
```

2. uView Pro 的`waterfall`瀑布流组件使用了`$scoped slot`特性，由于 hx 的问题，在 hx2.8.2 修正了此问题，所以瀑布流组件需要 hx2.8.2 及以上才支持支付宝小程序。

### Vue 特性在各平台支持度

1. 以下特性，uView 已对各小程序开发工具，H5 浏览器，APP(不含 NVUE)进行过实测，均获得支持，其中支付宝小程序需要开启`component2`模式。

| App | H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ 小程序 |
| :-: | :-: | :--------: | :----------: | :--------: | :--------: | :-------: |
|  √  |  √  |     √      |      √       |     √      |     √      |     √     |

- provide / inject
- $slots
- v-model / sync
- $parent / $children

<style scoped>
h3[id=vue特性在各平台支持度] + ol + table thead tr th:nth-child(2){
	width: auto;
}
</style>

<!-- ### 二次修改封装uView组件

uView组件一直追求完善而精致，如果您觉得某个组件可能和您的需求不一致，或者您有更好的实现方案和或思路，您可以在群里反馈给我们，也可以在[github](https://github.com/anyup/uView-Pro)上
给我们提PR，我们会第一时间跟进和处理。
如果您仍然有需要修改uView组件源码的需求，通常情况下，可以有如下两个办法：

- 直接修改组件的部分源码，这样的好处是方便快捷，然而缺点也是显而易见的，这意味着您无法再升级后续的uView版本，这是我们不推荐的。
- 您可以将某个组件复制出来放到某个文件进行修改，再通过`import`的形式引入使用，这样可以正常升级uView的后续版本。

然而，我们有更好的方案，本质上还是利用了`easycom`的特性，让您能无感的修改并使用uView的组件，以下以修改`u-button`组件作为示例：

1). 到`uview-pro`组件库文件中的`components`目录中复制`u-button`目录，并粘贴到项目**根目录**的`components`目录中

2). 此时`uview-pro/components`和根目录的`components`目录中，各有一份`u-button`组件源码，在符合规则的情况下，hx编译会自动对根目录的`components`组件引用`easycom`
规则，但由于`pages.json`中定义了`easycom`规则，所以`uview-pro/components`中的同名组件比根目录的`components`目录中的同名组件优先级更高，解决办法是
在`pages.json`中定义另一条`easycom`规则：

```json
// pages.json
"easycom": {
	"^u-(.*)": "@/uview-pro/components/u-$1/u-$1.vue",
	// 由于后来者居上的原则，下面的规则覆盖上面的规则，所以同名组件时，components中的u-button比uview-pro中的u-button优先级更高
	"^u-(.*)": "@/components/u-$1/u-$1.vue"
}
```

3). 进行以上操作后，您可以尽情修改根目录的`components`中的`u-button`组件源码，在页面同样是通过`<u-button></u-button>`形式使用，
但最终引用的却是您修改后的组件。 -->

### 设置页面背景颜色

一般情况下，我们给页面的`page`节点或者给页面的最外层`view`设置背景颜色，二者分别有如下需要注意点：

#### 1. 通过`page`节点设置

这个方式全端有效，但是需要注意的是，在微信小程序，或者某些安卓机型上，该节点如果写在带`scoped`属性的样式标签内是无效的，所以我们建议
您可以在页面多加一个不带 scoped 属性的样式标签，如下：

```css
/* 如果需要css的支持，还可以添加lang属性 */
<style lang="scss">
page {
	background-color: $u-bg-color;
}
</style>

/* 带scoed属性的其他样式 */
<style lang="scss" scoped>
.box {
	......
}
</style>
```

#### 2. 通过页面外层`view`设置

相比`page`节点，`view`的高度默认为内容高度，所以如果页面内容不足一屏高度时，底部剩余部分依然为默认的白色，所以我们给需要这个`view`设置一个
最低高度，让它等于窗口高度：

```html
<template>
  <view class="wrap"> ...... </view>
</template>

<style scoped lang="scss">
  .wrap {
    background-color: $u-bg-color;
    min-height: 100vh;
  }
</style>
```

### 全局赋值设备信息的陷阱

我们都知道，可以通过`uni.getSystemInfoSync()`获取设备信息，但是每次用到时都写一遍是很繁琐的，所以很多同学们都会突发奇想，比如在`main.js`或者
在`App.vue`中将`uni.getSystemInfoSync()`的结果赋值给`Vue.prototype`，如下：

```js
// main.js
Vue.prototype.system = uni.getSystemInfoSync();
```

上面的写法没有问题，我们可以任意地方通过`this.system`得到设备的信息，但是这里有一个陷阱，写在`main.js`，意味着赋值代码只会被执行一次，且是 APP 启动的时候，
但是 uni-app 中，设备信息的`windowHeight`属性是不含 APP 的导航栏和 tabbar 高度在内的，当我们进入首页时，`windowHeight`不含 tabbar 高度在内，高度可能为
'700px'，但是进入内页后，没有 tabbar，这时的`windowHeight`高度依然为 700px(少掉了 tabbar 的 50px 高度)，显然是不正确的。  
上面说的只是对`windowHeight`属性有影响，其他的属性无碍，如果是需要获取高度，建议每次都执行`uni.getSystemInfoSync()`，或者通过 uView 提供的快捷工具
`uni.$u.sys()`方法获取即可。

### 小程序主包太大无法预览和发布

我们都知道微信小程序预览和发布的主包大小都不能超过`2M`，否则无法真机预览和上传发布，经常有同学反馈刚使用 uView，调试时候主包就超过了`2M`而无法真机预览，
我们在这里做一个说明，uView 是`按需引入`的，在发行时，HX 会自动剔除您没有使用组件，即使您使用了 uView 的全部组件，整个 uView 的大小也只有 500K 左右，但是有如下两点前提：

- **调试**  
  在调试阶段，为了调试的友好效果和编译速度等，HX 默认是没有对 JS 进行压缩和去除注释，也没有进行组件按需引入的，所以会导致 JS 文件都很大，我们需要在
  HBuilder X 进行如下操作，再重新编译即可：

```js
HBuilderX   运行->运行到小程序模拟器->勾选 运行时是否压缩代码
```

- **发布**  
  在 HX 中进行发布时，uView 的组件会按需引入(使用 uView 所有组件的情况下，占用空间 500k 左右)，如果主包依然超出`2M`，您需要从多个方面着手：

1. [小程序分包](https://uniapp.dcloud.io/collocation/pages?id=subpackages)
2. 将静态资源放到服务器进行引用
3. 取消"ES6 转 ES5"设置

### uni.scss 的优缺点

`uni.scss`为 uni-app 新建项目自带工程文件，使用的预处理器为`sass/scss`，由此可见，uni-app 官方推荐的是`scss`，同时我们 uView 也是`scss`的坚定推崇者，不建议在
uni-app 中使用`less`、`stylus`等。

`uni.scss`具有如下一些特点：

- 无需引入，uni-app 在编译时，会自动引入此文件
- 在此中定义的`scss`变量，可以全局使用，可以在此定义一些颜色，主题，尺寸等变量
- **`uni.scss`会编译到每个`scss`文件中**(请着重理解这一句话)

综上所述，我们可以得知，`uni.scss`主要是利用`scss`的特性，定义一些全局变量，供各个写了`lang=scss`的 style 标签引用，但是这引出了一个重要的问题：  
`uni.scss`中所写的一切内容，都会注入到每个声明了`scss`的文件中，这意味着，如果您的`uni.scss`如果有几百行，大小 10k 左右，那么这个 10k 都会被注入所有的
其他`scss`文件(页面)中，如果您的应用有 50 个页面，那么有可能因此导致整体的包体积多了 50 \* 10 = 500k 的大小，这可能会导致小程序包太大而无法预览和发布，
所以，我们建议您只将`scss`变量相关的内容放到`uni.scss`中。

### 样式覆盖兼容性

为了避免样式被用户覆盖，或者被污染，一般组件或者页面都会给`style`标签加上`scoped`属性，如下演示为一个组件的内部构造：

```html
/* item.vue */
<template>
  <view class="item"></view>
</template>

<style scoped>
  .item {
    border: 1px solid red;
  }
</style>
```

我们在页面中引入上方的`item`组件，并且想修改它的`border`边框为颜色(blue)，一般通过`v-deep`或`/deep/`指令修改，如下写法：

```html
<template>
  <item></item>
</template>

<style scoped>
  ::v-deep .item {
    border: 1px solid blue;
  }
</style>
```

上面的写法，在`App`和`H5`正常，但是在微信小程序无效，它要求`::v-deep`或`/deep/`前面必须还要有父元素的类名存在，如下：

```html
<template>
  <view class="wrap">
    <item></item>
  </view>
</template>

<style scoped>
  .wrap ::v-deep .item {
    border: 1px solid blue;
  }
</style>
```

如果是在支付宝小程序中，写在组件上的类名和内联样式，都是无效的，如下：

```html
<template>
  /*
  在支付宝小程序，组件标签上的任何class和style都会被剔除，不会添加到组件内部的根元素中
  */
  <item style="border: 1px solid blue" class="item"></item>
</template>
```
