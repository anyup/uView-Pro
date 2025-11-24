## Divider 分割线 <to-api/>

<demo-model url="/pages/componentsB/divider/index"></demo-model>


区隔内容的分割线，一般用于页面底部"没有更多"的提示。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

文字内容通过`slot`传入

```html
<u-divider>大漠孤烟直</u-divider>
```

### 设置文字颜色
可以通过`color`指定文字的颜色
```html
<u-divider color="#fa3534">长河落日圆</u-divider>
```

### 设置单边边线条宽度和颜色

- `half-width`指定文字某一边的线条宽度(注意这里设置的是一边，而不是文字两边线条的总长度)，`half-width`可以是数值(rpx)或者百分比
- `type`可以快捷的设置线条为某一个主题色(默认`primary`)，`border-color`参数同样也能设置线条颜色，优先级高于`type`，也即是说二者同时
设置了值，将会是`border-color`起作用。反之，如果要让`type`值起作用，就要将`border-color`置为空字符串或者`null`。

```html
<u-divider color="#fa3534" half-width="200" border-color="#6d6d6d">姑苏城外寒山寺</u-divider>
```


### API

### Props

| 参数          | 说明            | 类型            |        默认值        | 可选值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| half-width | 文字左或右边线条宽度，数值或百分比，数值时单位为rpx  | String \| Number | - | 150 |
| border-color | 线条颜色，优先级高于`type` | String  | #dcdfe6 | - |
| color | 文字颜色 | String  | #909399 | - |
| fontSize | 字体大小，单位rpx | String \| Number  | 26 | - |
| bg-color | 整个divider的背景颜色 | String  | #ffffff | - |
| height | 整个divider的高度，单位rpx | string \| Number  | 40 | - |
| type | 将线条设置主题色 | string  | primary | info \ success \ warning \ error |
| margin-top | 与前一个元素的距离，单位rpx | String \| Number  | 0 | - |
| margin-bottom | 与后一个元素的距离，单位rpx | String \| Number  | 0 | - |
| use-slot | 是否使用slot传入内容，如果不传入，中间不会有空隙 | Boolean  | true | false |



### Events


|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
| click | divider组件被点击时触发 | - | - |