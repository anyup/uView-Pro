# 便捷工具

<demo-model url="/pages/componentsA/toast/index"></demo-model>


此专题内容为一些方便用户快速，便捷使用的小工具，可能是uView的一些方法的简易版，或者对uni的一些方法进行二次封装，方便用户
快速使用。


### toast(title, duration = 1500)

- `title` <String\> toast的消息内容
- `duration` <Number\> toast出现到消失的时间，单位ms，默认1500ms

此方法为uniapp的`uni.showToast`的二次封装，方便用户使用，参数只能配置`title`和`duration`

```js
uni.$u.toast('Hello uView!');
```


### os()

此属性用于返回平台的名称，为小写的`ios`或`android`  

**注意：** 以方法形式调用

```js
console.log(uni.$u.os())
```


### sys()

此属性用于获取设备的信息，相当于uni.getSystemInfoSync()的效果  

**注意：** 以方法形式调用，因为属性方式调用，结果可能会不准确

```js
console.log(uni.$u.sys())
```

