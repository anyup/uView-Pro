## Link 超链接

<demo-model url="/pages/componentsC/link/index"></demo-model>


该组件为超链接组件，在不同平台有不同表现形式：
- 在APP平台会通过`plus`环境打开内置浏览器
- 在小程序中把链接复制到粘贴板，同时提示信息
- 在H5中通过`window.open`打开链接

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`href`设置打开的链接，`slot`传入显示的内容

```html
<u-link href="http://www.uviewui.com">蜀道难，难于上青天</u-link>
```

### 下划线

通过`under-line`设置是否显示链接的下划线

```html
<u-link href="http://www.uviewui.com" :under-line="true">蒹葭苍苍，白露为霜</u-link>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| color | 文字颜色 | String | #606266 | - |
| font-size | 字体大小，单位rpx | String \| Number  | 28 | - |
| under-line | 是否显示下划线 | Boolean  | false | true |
| href | 跳转的链接，要带上http(s) | String  | - | - |
| line-color | 下划线颜色，默认同`color`参数颜色 | String  | - | - |
| mp-tips | 各个小程序平台把链接复制到粘贴板后的提示语 | String  | 链接已复制，请在浏览器打开 | - |
