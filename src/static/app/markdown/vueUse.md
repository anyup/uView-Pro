## 简要介绍Vue.use的原理

uView会努力做好框架的内容，同时我们也希望您能学习到一些更深入的知识，我们坚信授之以鱼，不如授之以渔。

当您使用一些第三方插件或者框架时，经常会看到他们的安装引导处会让您写大概如下的内容：

```js
import uView from "@/uview";

Vue.use(uView);
```

这里第一句没什么好说的，我们着重讲第二句`Vue.use(uView)`：  
这里我们把`uView`传递给了`Vue.use`，在`Vue`内部，是有定义一个`use`方法的，大概如下：  

```js
// 这里的plugin参数就是，就是我们通过Vue.use(uView)引入的"uView"
Vue.use = function (plugin: Function | Object) {
    
	// ......
	
	const args = toArray(arguments, 1)
	// 这一句很重要，这里的this，就是Vue，把他添加到args数组的第一个元素
	args.unshift(this)
	// 判断我们传递进来的"uView"，也即这里的"plugin"内部是否有一个叫"install"的方法
	// 如果有，就执行我们的"uView"，也即"plugin.install"方法
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
	
	// ......
}
```

从上面，我们可以看出，Vue的`use`方法内部，接受了`uView`这个插件，并判断`uView`内部是否有一个叫`install`的方法，如果有，就执行它，并且
通过`apply`方法把数组当做参数传递进去(这里数组内部第一个元素`Vue`这个对象，见上方注释，`apply`可以把数组[arg1, agr2]形式拆成(arg1, agr2)的形式)


有了上面的分析，我们知道uView内部，肯定定义了一个叫`install`的方法，并且这个方法的第一个参数就是`Vue`这个对象，uView内部如下：

```js
// 这里我们定义了一个叫"install"的变量，它的内容是一个方法(函数)
// 它的第一个参数是Vue对象(上面有提到传进来的第一个参数就是Vue)，我们把$u挂载到了Vue.prototype中
const install = (Vue) => {
	Vue.prototype.$u = $u;
}

// 这里我们导出一个对象，内部有一个叫"install"的方法，给上面说的Vue.use调用
export default {
	install
}
```

从上面我们可以看出，uView把"$u"挂载到了`Vue.prototype`上，所以我们在项目的内部可以使用`uni.$u.xxx`这种形式。
