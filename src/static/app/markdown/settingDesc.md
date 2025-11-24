## 配置的原理

#### 1. 引入uView主JS库

为何要在`main.js`引入uView的JS库？

因为uView内部集成了很多的便捷JS工具，比如获取随机数的`radnom`方法，调用为`uni.$u.radom(min, max)`，可见这些方法都挂载在`$u`下，
我们能通过`this`调用`$u`，又是因为`$u`挂载在Vue的原型链上，在这里uView的做法为通过`Vue.use`，以插件的形式在内部进行`Vue.property`的挂载。  

而`main.js`就是整个项目JS的入口，且Vue也是在这里引入的，所以我们自然而然就会想到把uView的JS库在`mian.js`中引入了，如下：

```js
// main.js
import uView from "uview-pro";
Vue.use(uView);
```

注：或许您想知道`Vue.use`的作用是什么，见[简要介绍Vue.use的原理](/components/vueUse.html)


#### 2. 引入uView的全局SCSS主题文件

uni-app不支持将SCSS变量相关的样式通过`App.vue`引入，为了统一的主题，以及日后的扩展，
目前一些跟颜色相关的scss变量定义在全局变量中，这些变量有独特的命名(`u-`开头)，不会与您的类名冲突。  

这些变量需要写入到项目根目录的`uni.scss`中才有效(这是uni-app的机制问题)，它有一个特点是，编译成微信小程序后，不但注入到小程序工程
根目录的`app.wxss`(全局样式文件)，而且还会同步注入到每一个页面单独的`*.wxss`中，所以如果您在`uni.scss`中的样式很多的话，有可能导致
微信小程序编译单个包超出限制的`2M`大小，整包超出最大的`12M`大小，从而导致无法真机调试和发布微信小程序。

所以，我们建议，只将一些跟`scss`主题，变量相关的样式写入到`uni.scss`，而其他一般的全局样式文件，通过`App.vue`引入即可，在微信小程序编译的时候，
它只会编译到小程序根目录的`app.wxss`中，而不会注入到其他的单个页面的样式中。
 


#### 3. 引入基础样式

由于目前(2020-04-29)uni-app的V3模式不支持在`main.js`中引入样式文件，故需要在`App.vue`中引入uView的基础全局样式。  
同时上面第2点也有说明，`App.vue`的样式为全局样式，微信小程序编译后只会注入到小程序根目录的`app.wxss`中。



#### 4. 配置easycom组件模式

easycom功能可以让用户无需安装、引用、注册，三个步骤后才能使用组件，详见[easycom文档](https://uniapp.dcloud.io/collocation/pages?id=easycom)

easycom的另一个最大的特点是，它是**按需引入**的，所以您引入了整个uView组件，即使只用到了`button`组件，最终打包的时候只会把`button`打包进去，其他的组件都会被剔除。  

Hbuilder X自2.5.1版开始正式支持`easycom`特性，**HX2.5.5**版支持自动引入`components/组件名称/组件名称.vue`，考虑到用户的一些自定义组件
都会放在`components`目录中，为了不和用户的自定义组件混淆，同时也是为了能让用户一键升级uView，所以我们把uView相关的所有内容都放在了根目录的
`uview-pro`文件夹中。

:::tip 温馨提示
uni-app为了调试性能的原因，修改`easycom`规则不会实时生效，配置完后，您需要重启HX或者重新编译项目才能正常使用uView的功能。
:::