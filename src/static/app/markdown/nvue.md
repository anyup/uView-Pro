## Nvue 特性相关

前言：uView 在 1.x 版本，只有部分组件支持`nvue`，不推荐在`nvue`项目中使用，uView Pro 也不建议在`nvue`项目中使用，我们在这里做一个专题，列出一些`nvue`上的坑，希望能帮助到您。

### Text 组件

- 我们在`vue`中，可以将文本相关的内容放到`view`或者`text`组件，这都是没问题的，但是在`nvue`中，需要动态响应(双向绑定)的内容，必须放在`text`标签，如果放在`view`可以正常显示，但是无法双向绑定。

- 在`nvue`中，文本的样式无法继承父元素的颜色(color)，必须具体到给每一个`text`元素定义类名，在通过指定的类名给赋予颜色值，其他类似出现不能继承父组件的情况，也可参考此做法。

- 在`nvue`中，`text`组件不能换行写内容，否则会出现无法去除的周边空白内容(类似被加上了`padding`或者`margin`的效果)，如下：

```html
<!-- nvue中错误写法 -->
<text> 桃花潭水深千尺 </text>

<!-- nvue中正确写法 -->
<text>不及汪伦送我情</text>
```

### 事件冒泡

`weex`事件冒泡相关文档 —— [事件冒泡](https://weex.apache.org/zh/docs/events/event-bubbling.html#%E9%98%BB%E6%AD%A2%E5%86%92%E6%B3%A1)

在`weex`原文中，需要给给页面(组件)根元素设置`bubble="true"`才能产生事件冒泡机制，但是在`uni-app`的`nvue`中，已自动加上类似`bubble="true"`的操作，无需用户额外干预，自动就会获得事件冒泡的机制。另外，在 nvue 中，我们可以通过如下方式阻止事件冒泡：

```html
<template>
    <view @tap="parentClick">
        <text @tap="childClick">
    </view>
</template>

<script>
    export default {
        methods: {
            childClick(e) {
                console.log('内部被点击')
                e.stopPropagation()
            },
            parentClick() {
                console.log('父元素将不会捕获冒泡事件')
            }
        }
    }
</script>
```

### line-height

在`nvue`中，`line-height`与字体大小`font-size`无关，如果赋予数值，单位默认为`px`，这意味着不可以如下使用：

```css
.box {
  /* vue正常，nvue中会导致行高只有1px */
  line-height: 1;
}
```

### 样式穿透

在`weex`(`nvue`)中有如此描述：[在 Weex 里， 每一个 Vue 组件的样式都是 scoped](https://weex.apache.org/zh/guide/use-vue-in-weex.html#%E5%B9%B3%E5%8F%B0%E7%9A%84%E5%B7%AE%E5%BC%82)，这说明`vue`中的的`/deep/`和`::v-deep`在`nvue`中都是无效，修改子组件样式只能通过传参进行，而不能进行样式穿透。

### 字体引入不能加引号

`nvue`下，`font-family`的字体引入，不能加引号，否则会导致字体图标无法显示，如下：

```css
/* 错误写法 */
font-family: "uicon-iconfont";

/* 正确写法 */
font-family: uicon-iconfont;
```

### Scss 中的:export 无效

在`vue`中，我们可以通过`*.scss`中使用[:export](https://www.jianshu.com/p/069f4f79de16)进行变量导出，供`js`和`css`共同使用变量，但是`nvue`中不支持此写法，请勿使用。

### transition 属性不能简写

在`vue`中，我们可以很方便的简写`transition`属性，但是`nvue`中，必须分开写才有效，如下：

- [weex 文档关于 transition 的描述](https://weex.apache.org/zh/docs/styles/common-styles.html#transition)

```css
/* 如下写法，vue有效，nvue无效 */
transition: opacity 0.3s ease-in;

/* nvue页面需要拆分成如下写法 */
transition-property: opacity;
transition-duration: 0.3s;
transition-timing-function: ease-in;
```

### box-shadow

据关于[weex 关于 box-shadow 文档](https://weex.apache.org/zh/docs/styles/common-styles.html#%E9%98%B4%E5%BD%B1-box-shadow)描述，`weex`不支持`android`上的`box-shadow`属性，但是经实测，在`nvue`(uni-app 改良后台的`weex`)上`android`，是支持的`box-shadow`属性效果的。

需要说明的是，在`IOS`上，目前(2020-10-30)不允许将`box-shadow`值设置为`none`，否则会出现锐利的高亮白色边框，由于`nvue`支持`rgba`透明度，我们可以通过如下方式实现类似`none`的效果：

```css
.box {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}
```

### border-radius

[在`weex`文档中有明确的说明](https://weex.apache.org/zh/docs/styles/common-styles.html#border-radius)，`border-radius`支持简写形式，但是在`nvue`的`android`端，`border-radius`必须分开写才有效，如下：

```css
/* nvue下，安卓不支持此写法 */
.box {
  border-radius: 10px;
}

/* 必须如下写法才能兼容 */
.box {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
```

### 关于<template\/> 和 <block\/>

以下文字取自 uni-app 文档原文，[点此查看](https://uniapp.dcloud.io/frame?id=template-block)：

```
`<template/>` 和 `<block/>` 并不是一个组件，它们仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。
`<block/>` 在不同的平台表现存在一定差异，推荐统一使用 `<template/>`。
```

上面说，二者不会在页面做任何的渲染，但是在`nvue`中，`<block/>`确确实实被渲染成为一个`<block/>`元素，由于`nvue`默认`flex`布局，且为
`column`竖向布局，这可能会导致`<block/>`标签下存在多个其他元素时，这些元素会竖向排列，您不得不额外对`<block/>`元素设置样式，所以我们建议只要是`nvue`的场景，一律使用`<template/>`而不是`<block/>` 标签
