## 底部安全区适配

这个适配，主要是针对IPhone X等一些底部带指示条的机型，指示条的操作区域与页面底部存在重合，容易导致用户误操作，因此我们需要针对这些机型进行底部安全区适配。  
uView是uni-app态的UI框架uni-app专门针对底部安全区域的解决方案，具体如下(也可见uni官方说明[全面屏、刘海屏适配（iphoneX适配）及安全区设置](https://ask.dcloud.net.cn/article/35564))：
- 在APP上(以下只对APP生效)，可以通过项目根目录的`mainfest.json`文件`app-plus`节点下配置`safearea`的`bottom`属性为`none`，以此来关闭IPhone X等机型的底部安全区域。
配置后需要重新编译，并重启调试基座才会生效，具体如下：

``` json
"app-plus": {
	"safearea": {
		"bottom": {
			"offset": "none"
		}
	}
}
```
如果`offset`设置为`auto`，那么在IPhone X的底部安全区，APP上就会生成一个原生的元素进行占位，此时也就无需解决安全区指示条引起的问题。

- 在非APP端，诸如小程序，或者微信浏览器(其他浏览器，如UC等手机浏览器，底部有浏览器工具条，不存在安全区指示条引起的问题)，底部是没有安全区占位的，
这种情况，就要使用css去解决，一般是通过给元素添加底部内边距的形式，如下：

``` html 
<style>  
	.list {  
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
	}  
</style>
```

鉴于以上问题，uView提供了一个样式类`safe-area-inset-bottom`，如果有需要，您可以在任何写元素的地方引用它，它会自动判断在并且在IPhone X等机型的时候，给元素加上一个适当
底部内边距，在APP上，即使您保留了原生安全区占位(`offset`设置为`auto`)，也不会导致底部出现双倍的空白区域，也即APP上`offset`设置为`auto`时，
`safe-area-inset-bottom`类自动无效。
``` html 
<template>
	<view class="safe-area-inset-bottom">
		......
	</view>
</template>
```

### 关于uView某些组件`safe-area-inset`参数的说明

在uView中，一些组件如`u-popup`、`u-keyboard`组件等，提供了一个`safe-area-inset-bottom`参数(布尔类型)，如果设置为`true`，就会在组件内部元素中添加一个
`safe-area-inset-bottom`样式类名，从而避免安全区指示条引起的问题，以下为uView的`u-keyboard`组件在`微信浏览器`中分别设置`safe-area-inset-bottom`参数
为`false`和`true`的表现：

<div>
	<img src="https://ik.imagekit.io/anyup/uview-pro/docs/common/keyboard.png" alt="uView" class="logo">
</div>