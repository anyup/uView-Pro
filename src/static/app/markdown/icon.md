## Icon 图标 <to-api/>

<demo-model url="/pages/componentsA/icon/index"></demo-model>

基于字体的图标集，包含了大多数常见场景的图标。

### 平台差异说明

| App | H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ 小程序 |
| :-: | :-: | :--------: | :----------: | :--------: | :--------: | :-------: |
|  √  |  √  |     √      |      √       |     √      |     √      |     √     |

### 基本使用

<br>

:::tip 提示
如果您觉得内置的图标数量不够，或者不合符您的需求，别担心，我们还精心为您准备了一份简单易用的扩展自定义图标库教程：[扩展自定义图标库](https://www.uviewui.com/guide/customIcon.html)
:::

<br>

通过`<u-icon>`形式来调用，设置`name`参数为图标名即可

```html
<u-icon name="photo"></u-icon>
```

### 修改图标的样式

- 通过`color`参数修改图标的颜色
- 通过`size`参数修改图标的大小，单位为 rpx

```html
<u-icon name="photo" color="#2979ff" size="28"></u-icon>
```

### 图片图标

这里说的图片图标，指的是小图标，起作用定位为"icon"图标作用，而非大尺寸的图片展示场景，理论上，这个小图标应该为`png`格式的正方形图标。

上面说到，给组件的`name`参数传入一个图片的名称即可显示字体图标，这些名称中不能带有`/`斜杠符号，否则会被认为是传入了图片图标，同时，`size`参数
也被设置为这个图片图标的宽度，由于是图片，诸如颜色`color`等参数都会失效。

```html
<u-icon
  label="uView"
  size="40"
  name="https://cdn.uviewui.com/uview/example/button.png"
></u-icon>
```

### API

### Props

| 参数                                     | 说明                                                                                                                         | 类型             | 默认值  | 可选值              |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- | ------------------- |
| name                                     | 图标名称，见示例图标集，如名称带有`/`，会被认为是图片图标                                                                    | String           | -       | -                   |
| color                                    | 图标颜色                                                                                                                     | String           | inherit | -                   |
| size                                     | 图标字体大小，单位 rpx                                                                                                       | String \| Number | inherit | -                   |
| index                                    | 一个用于区分多个图标的值，点击图标时通过`click`事件传出                                                                      | String           | -       | -                   |
| hover-class                              | 图标按下去的样式类，用法同 uni 的`view`组件的`hover-class`参数，详见：[hover-class](https://uniapp.dcloud.io/component/view) | String           | -       | -                   |
| label                                    | 图标右侧/下方的 label 文字                                                                                                   | String           | -       | -                   |
| label-size                               | `label`字体大小，单位 rpx                                                                                                    | String \| Number | 28      | -                   |
| label-color                              | `label`字体颜色                                                                                                              | String           | #606266 | -                   |
| custom-prefix                            | 自定义字体图标库时，需要写上此值，详见：[扩展自定义图标库](https://www.uviewui.com/guide/customIcon.html)                    | String           | uicon   | -                   |
| space <Badge text="0.0.4" />            | `label`在四周时与图标的距离，权重高于 margin，单位 rpx                                                                        | String \| Number | -       | -                   |
| margin-left                              | `label`在右方时与图标的距离，单位 rpx                                                                                        | String \| Number | 6       | -                   |
| margin-top                               | `label`在下方时与图标的距离，单位 rpx                                                                                        | String \| Number | 6       | -                   |
| margin-bottom     | `label`在上方时与图标的距离，单位 rpx                                                                                        | String \| Number | 6       | -                   |
| margin-right      | `label`在左侧时与图标的距离，单位 rpx                                                                                        | String \| Number | 6       | -                   |
| label-pos                                | `label`相对于图标的位置(left 和 top 为 1.4.1 新增)                                                                           | String           | right   | bottom / top / left |
| custom-style      | 图标的样式，可以设置字体大小，颜色等，对象形式，`size`和`color`优先级高于此参数                                              | Object           | -       | -                   |
| width             | `name`为图片路径时图片的宽度，单位任意，数值默认为 rpx 单位                                                                  | String \| Number | -       | -                   |
| height            | `name`为图片路径时图片的高度，单位任意，数值默认为 rpx 单位                                                                  | String \| Number | -       | -                   |
| top               | 如果某些场景，如果图标没有垂直居中，可以调整此参数，单位任意，数值默认为 rpx 单位                                            | String \| Number | 0       | -                   |
| show-decimal-icon | 是否为 DecimalIcon                                                                                                           | Boolean          | false   | true                |
| inactive-color    | 背景颜色，可接受主题色，仅 Decimal 时有效                                                                                    | String           | #ececec | -                   |
| percent           | 显示的百分比，仅 Decimal 时有效                                                                                              | String \| Number | 50      | -                   |

### Events

| 事件名 | 说明           | 回调参数                          | 版本 |
| :----- | :------------- | :-------------------------------- | :--- |
| click  | 点击图标时触发 | index: 通过`props`传递的`index`值 | -    |

### 图标集

<icon />
