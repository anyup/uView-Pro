## 内置样式

<demo-model url="/"></demo-model>

### 说明

uView Pro 组件功能的实现，并不依赖全局样式，内置的一些类名，只是提供一些基础且常用的样式，仅此而已。  
注意：请根据[快速上手](/components/quickstart.html)中的说明，引入 uView Pro 提供的 scss 文件。

:::warning 温馨提示
由于 uView Pro 的内置样式均是写在 scss 文件中的，您在使用的时候，请确保要给页面的`style`标签加上`lang="scss"`属性，否则可能会报错。

<!-- 另外，您可能需要留意，如果页面的`style`标签加入了`lang="scss"`属性，就必须要在`style`标签中写入内容，哪怕是无用的样式也好，否则HX不会解析scss，此非uView的问题。 -->

:::

### 文字省略

`u-line-1`,`u-line-2`,`u-line-3`,`u-line-4`,`u-line-5`五个类名在文字超出内容盒子时，分别只显示一行、两行、三行、四行、五行+省略号。

```html
<view class="u-line-1">
  是日也，天朗气清，惠风和畅，仰观宇宙之大，俯察品类之盛，所以游目骋怀，足以极视听之娱，信可乐也
</view>
```

### 定位

uView Pro 内置了关于相对和绝对定位的两个类，分别为`u-relative`(`u-rela`)和`u-absolute`(`u-abso`)：

```css
.u-relative,
.u-rela {
  position: relative;
}

.u-absolute,
.u-abso {
  position: absolute;
}
```

### 字体大小

#### **1. 数值形式**

uView Pro 为了方便用户写字体，通过 SCSS 生成了一套样式类，专门用于定位字体的大小。对于字体，不同用户可能有喜欢`px`，也有喜欢`rpx`单位的，
一般来说，在 uni-app 上，`rpx`单位最终表现出来的大小数值为`px`的两倍左右，也就是说，`24rpx`和`12px`的字体大小是差不多的。  
uView Pro 为此提供了一个类`u-font-x`，这个`x`为 10-40 之间(包含 10 和 40)，当`x >= 10 && x < 20`时，表现为`px`性质，当`x >= 20 && x <= 40`时，表现为`rpx`性质。

用法如下：

- 当`x >= 10 && x < 20`时，表现为`px`性质

```html
<view class="u-font-13"></view>
```

这个`.u-font-13`在 uView 的内部样式定义为：

```css
.u-font-13 {
  font-size: 13px;
}
```

- 当`x >= 20 && x <= 40`时，表现为`rpx`性质

```html
<view class="u-font-26"></view>
```

这个`.u-font-26`在 uView Pro 的内部样式定义为：

```css
.u-font-26 {
  font-size: 26rpx;
}
```

#### **2. 断点形式**

为了更加形象和方便记忆，uView 另外提供了一套断点的字体大小，分别以`xs`、`sm`、`md`、`lg`、`xl`作为后缀，如下：

```css
.u-font-xs {
  font-size: 22rpx;
}

.u-font-sm {
  font-size: 26rpx;
}

.u-font-md {
  font-size: 28rpx;
}

.u-font-lg {
  font-size: 30rpx;
}

.u-font-xl {
  font-size: 34rpx;
}
```

### 文字对齐

uView Pro 为文字对齐定义了 3 个类，分别如下：

```css
/* 文字左对齐 */
.u-text-left {
  text-align: left;
}

/* 文字居中对齐 */
.u-text-center {
  text-align: center;
}

/* 文字右对齐 */
.u-text-right {
  text-align: right;
}
```

### 重置按钮样式

我们知道，uni-app 和微信小程序的`button`按钮是自带样式的，比如边框，内边距，行高等。在某些特殊场景，我们可能会需要清除这些样式，仅仅只留下按钮文本，就像
单纯的`view`元素一样，不带预置样式，场景：  
在微信小程序中，我们知道`button`设置`open-type`参数为`getUserInfo`(或者分享场景)，点击按钮可以弹出让用户授权的系统弹窗，有时候我们可能需要按钮形式展现，但也有时候我们仅仅需要
"点击登录/授权/分享"几个字，同时具备获取相应的功能，就需要清除按钮的样式了，只需要给`button`加上`u-reset-button`类名即可。

```html
<button class="u-reset-button">点击登录</button>
```

提示：

1. 此种场景，不建议使用 uView Pro 的`u-button`组件，使用原生的`button`即可
2. 有时候，我们可能弹出询问用户是否想授权，可以用`u-modal`组件，此组件有一个`confirm-button`的`slot`用于替换`确定`按钮，用户点击确定，即可授权。

````html
/* 请在微信开发工具中运行此代码 */ ```vue
<template>
  <view>
    <u-modal v-model="show" content="点击确定进行授权">
      <template #confirm-button>
        <button
          open-type="getUserInfo"
          class="u-reset-button"
          @getuserinfo="getUserInfo"
        >
          确定
        </button>
      </template>
    </u-modal>
    <u-button @click="show = true">打开modal</u-button>
  </view>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const show = ref(true);

  function getUserInfo(res: any) {
    console.log(res);
  }
</script>
````

### 内外边距

uView 定义了一套内外边距的类名，调用简单，方便用户使用，类似`u-padding-x`、`u-margin-left-x`等，这里的`x`取值规则如下：

- 1-80(可以等于 80)之间的偶数(双数)
- 能被 5 除尽的 1-80 之间的数，如 5，10，15，35 等

类名的取值有如下：

**注意：** uView 同时也给了一套简写的方法，二者是等价的。

- u-padding-x == u-p-x
- u-padding-left-x == u-p-l-x
- u-padding-top-x == u-p-t-x
- u-padding-right-x == u-p-r-x
- u-padding-bottom-x == u-p-b-x
- u-margin-x == u-m-x
- u-margin-left-x == u-m-l-x
- u-margin-top-x == u-m-t-x
- u-margin-right-x == u-m-r-x
- u-margin-bottom-x == u-m-b-x

<!-- 以下为1.3.9新增的样式：

- u-margin-left-right-x  ==  u-m-l-r-x
- u-margin-top-button-x  ==  u-m-t-b-x
- u-padding-left-right-x  ==  u-p-l-r-x
- u-padding-top-bottom-x  ==  u-p-t-b-x -->

如果我们想定义`26rpx`的**左外边距**：

```html
<view class="u-margin-left-26"></view>
```

这个`.u-margin-left-26`在 uView 的内部样式定义为：

```css
.u-margin-left-26 {
  margin-left: 26rpx;
}
```

如果我们想要`35rpx`的内边距：

```html
<view class="u-padding-35"></view>
```

这个`.u-padding-35`在 uView 的内部样式定义为：

```css
.u-padding-35 {
  padding: 35rpx;
}
```

### flex 布局

在看这个部分的时候，请确保您对`flex`是了解的，否则可以参考[阮一峰的 flex 教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)  
由于我们经常要使用`flex`布局，而其中的大部分样式又都是重复的，总是少不了如下的几句：

```css
/* 父盒子 */
display: flex;
flex-wrap: wrap;
flex-direction: row;
align-items: center;

/* 子元素 */
flex: 1;
```

基于以上，uView 定义了一个最常用的总集合类，名为`u-flex`，其内部值如下：

#### **1. 总超集**

```css
.u-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

#### **2. 子元素是否换行**

```css
/* 换行 */
.u-flex-wrap {
  flex-wrap: wrap;
}

/* 不换行 */
.u-flex-nowrap {
  flex-wrap: nowrap;
}
```

:::tip 提示
当我们写这些跟`flex`相关的类名时，总应该把`u-flex`写在`class`多个类名的左边，因为`u-flex`是一个集合类，如果你不想要其中的某个属性，如`align-items: center`
，可以通过右边的类名覆盖它。
:::

覆盖`u-flex`中的`align-items: center`(对齐)，改为顶部对齐`u-col-top`：

```html
<view class="u-flex u-col-top"> ...... </view>
```

最终内部表现如下(其它以此类推)：

```css
.u-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
}

/* 由于align-items: flex-start在后面，故覆盖了"u-flex"的align-items: center */
.u-col-top {
  align-items: flex-start;
}
```

#### **3. 子元素在上下左右的对齐方式**

这里类名的命名依据为，`col`为`column`(列，竖向)的缩写，`row`为行的意思(横向)，所以就有垂直方向上的诸如`u-col-center`表
垂直居中对齐，`u-row-left`代表水平左对齐。  
此类名控制的是子元素，是需要写在父元素盒子上的：

```css
/* 垂直居中 */
.u-col-center {
  align-items: center;
}

/* 顶部对齐 */
.u-col-top {
  align-items: flex-start;
}

/* 底部对齐 */
.u-col-bottom {
  align-items: flex-end;
}

/* 左边对齐 */
.u-row-left {
  justify-content: flex-start;
}

/* 水平居中 */
.u-row-center {
  justify-content: center;
}

/* 右边对齐 */
.u-row-right {
  justify-content: flex-end;
}

/* 水平两端对齐，项目之间的间隔都相等 */
.u-row-between {
  justify-content: space-between;
}

/* 水平每个项目两侧的间隔相等，所以项目之间的间隔比项目与父元素两边的间隔大一倍 */
.u-row-around {
  justify-content: space-around;
}
```

#### **4. 子元素空间分布**

此类名是写在子元素的`class`中的，主要用于决定子元素占据的父元素的空间大小，类名为`u-flex-x`，`x`的取值为`x >= 1 && x <= 12`：

```css
.u-flex-1 {
  flex: 1;
}

.u-flex-2 {
  flex: 2;
}

.u-flex-3 {
  flex: 3;
}

/* ...... */

.u-flex-12 {
  flex: 12;
}
```

### 边框

uni-app，iOS 和少数设备使用`1rpx`是能够得到类似`0.5px`的半像素宽度的，但是某些情况下是不兼容的，
故 uView 提供了一套兼容的 css 类名，方便用户使用。  
`u-border`表示给元素添加四周的边框，`u-border-top`为上边框，`u-border-right`为右边框，
`u-border-bottom`为下边框，`u-border-left`为左边框。  
说明：如果想调整边框与内容的距离，修改元素的内边距即可。

```html
<view class="u-border-bottom">
  夫人之相与，俯仰一世，或取诸怀抱，悟言一室之内；或因寄所托，放浪形骸之外
</view>
```

### 文字颜色

uView 提供了四个关于文字的颜色，具体详见文档的[Color 色彩](/components/color.html)部分，分别是：

- `main-color`主要颜色，可以用于标题等需要重颜色的场景
- `content-color`内容颜色，可以用于一般性内容的场景
- `tips-color`提示颜色，可以用于浅颜色的提示语的场景
- `light-color`为比`tips-color`更浅的颜色，可以和`tips-color`搭配使用

举个例子：  
我们平时看到的 APP 的新闻列表，标题颜色可以用`$u-main-color`，简介部分颜色可以用`$u-content-color`，底部的发布时间文字等可以用`$u-tips-color`。

#### **1. 类名方案**

这个方案，直接通过类名调用，有这几个对应类名：`u-main-color`、`u-content-color`、`u-tips-color`、`u-light-color`。

```html
<view class="u-main-color"> ...... </view>
```

#### **2. SCSS 变量名方案**

uView 提供了四个关于文字颜色的 scss 变量名，具体详见文档的[Color 色彩](/components/color.html)部分，分别是：

- `$u-main-color`
- `$u-content-color`
- `$u-tips-color`
- `$u-light-color`

```html
<!-- 请确保在style标签声明了"lang="scss"" -->
<style lang="scss" scoped>
  .box {
    color: $u-main-color;
  }

  .count {
    border-color: $u-light-color;
  }
</style>
```

### 主题色

uView 提供五个关于主题的 scss 颜色变量，如有需要，可合理使用。具体详见文档的[Color 色彩](/components/color.html)部分，分别是：

- `$u-type-primary`为蓝色，uView 的主色彩，代表热情，友好，积极，向上之意。
- `$u-type-warning`为黄色，代表警告之意。
- `$u-type-success`为绿色，代表成功之意。
- `$u-type-error`为红色，代表错误之意。
- `$u-type-info`为灰色，代表一般信息之意。

```html
<style lang="scss" scoped>
  .item {
    color: $u-type-primary;
  }
</style>
```
