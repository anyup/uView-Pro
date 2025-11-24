## Image 图片 <to-api/>

<demo-model url="/pages/componentsB/image/index"></demo-model>

此组件为 uni-app 的`image`组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等。  
**我们推荐您在任何使用图片场景的地方，都优先考虑使用这个小巧，精致而实用的组件。**

### 平台差异说明

| App | H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ 小程序 |
| :-: | :-: | :--------: | :----------: | :--------: | :--------: | :-------: |
|  √  |  √  |     √      |      √       |     √      |     √      |     √     |

### 基本使用

配置图片的`width`宽和`height`高，以及`src`路径即可使用。

```html
<template>
  <u-image width="100%" height="300rpx" :src="src"></u-image>
</template>

<script>
  export default {
    data() {
      return {
        src: "https://cdn.uviewui.com/uview/example/fade.jpg",
      };
    },
  };
</script>
```

### 填充模式

通过`mode`参数配置填充模式，此模式用法与 uni-app 的`image`组件的`mode`参数完全一致，详见：[Image](https://uniapp.dcloud.io/component/image)

```html
<u-image src="https://cdn.uviewui.com/uview/example/fade.jpg" mode="widthFix"></u-image>
```

### 图片形状

- 通过`shape`参数设置图片的形状，`circle`为圆形，`square`为方形
- 如果为方形时，还可以通过`border-radius`参数设置圆角值

```html
<u-image src="https://cdn.uviewui.com/uview/example/fade.jpg" shape="circle"></u-image>
```

### 懒加载

注意：此功能只对微信小程序、App、百度小程序、字节跳动小程序有效，默认开启。

```html
<u-image src="https://cdn.uviewui.com/uview/example/fade.jpg" :lazy-load="true"></u-image>
```

### 加载中提示

图片加载过程中，为加载中状态(默认显示一个小图标)，可以通过`loading`自定义插槽，结合 uView 的`u-loading`组件，实现加载的动画效果。

```html
<u-image src="https://cdn.uviewui.com/uview/example/fade.jpg">
  <template #loading>
    <u-loading></u-loading>
  </template>
</u-image>
```

### 加载错误提示

图片加载失败时，默认显示一个错误提示图标，可以通过`error`自定义插槽，实现个性化的提示方式。

```html
<u-image src="https://cdn.uviewui.com/uview/example/fade.jpg">
  <template #error>
    <view style="font-size: 24rpx;">加载失败</view>
  </template>
</u-image>
```

### 淡入动画

组件自带了加载完成时的淡入动画效果：

- 通过`fade`参数配置是否开启动画效果
- 通过`duration`参数配置动画的过渡时间，单位 ms

```html
<u-image
  src="https://cdn.uviewui.com/uview/example/fade.jpg"
  :fade="true"
  duration="450"
></u-image>
```

### 事件冒泡

默认情况下，组件是允许内部向外事件冒泡的，因为很多情况下，我们都希望点击图片，同时图片所在的父元素的点击事件也能触发。  
如果您想避免事件冒泡，那么您可以在组件外面嵌套一个`view`，同时给它加上`@tap.stop`即可。

```html
<!-- 点击图片将不会触发clickHandler -->
<view @tap="clickHandler">
  <view @tap.stop>
    <u-image src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
  </view>
</view>
```

### API

### Props

**注意：** 此组件为 1.4.0 版本加入的，[如何查看版本？](/components/install.html)

| 参数                            | 说明                                                          | 类型             | 默认值       | 可选值 |
| ------------------------------- | ------------------------------------------------------------- | ---------------- | ------------ | ------ |
| src                             | 图片地址，**强烈建议**使用绝对或者网络路径                    | String           | -            | -      |
| mode                            | 裁剪模式，见上方说明                                          | String           | aspectFill   | -      |
| width                           | 宽度，单位任意，如果为数值，则为 rpx 单位                     | String \| Number | 100%         | -      |
| height                          | 高度，单位任意，如果为数值，则为 rpx 单位                     | String \| Number | auto         | -      |
| shape                           | 图片形状，circle-圆形，square-方形                            | String           | square       | circle |
| border-radius                   | 圆角值，单位任意，如果为数值，则为 rpx 单位                   | String \| Number | 0            | -      |
| lazy-load                       | 是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效 | Boolean          | true         | -      |
| show-menu-by-longpress          | 是否开启长按图片显示识别小程序码菜单，仅微信小程序有效        | Boolean          | true         | -      |
| loading-icon                    | 加载中的图标，或者小图片                                      | String           | photo        | -      |
| error-icon                      | 加载失败的图标，或者小图片                                    | String           | error-circle | -      |
| show-loading                    | 是否显示加载中的图标或者自定义的 slot                         | Boolean          | true         | false  |
| show-error                      | 是否显示加载错误的图标或者自定义的 slot                       | Boolean          | true         | false  |
| fade                            | 是否需要淡入效果                                              | Boolean          | true         | false  |
| webp                            | 只支持网络资源，只对微信小程序有效                            | Boolean          | false        | true   |
| duration                        | 搭配`fade`参数的过渡时间，单位 ms                             | String \| Number | 500          | -      |
| bg-color | 背景颜色                                                      | String           | #f3f4f6      | -      |

### Slot

| 名称    | 说明                   |
| :------ | :--------------------- |
| loading | 自定义加载中的提示内容 |
| error   | 自定义失败的提示内容   |

### CellItem Events

| 事件名 | 说明               | 回调参数      |
| :----- | :----------------- | :------------ |
| click  | 点击图片时触发     | -             |
| error  | 图片加载失败时触发 | err: 错误信息 |
| load   | 图片加载成功时触发 | -             |

<style scoped>
h3[id=slot] + table thead tr th:nth-child(2){
	width: 50%;
}
</style>
