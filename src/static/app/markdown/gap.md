## Gap 间隔槽 <to-api/>

<demo-model url="/pages/componentsC/gap/index"></demo-model>


该组件一般用于内容块之间的用一个灰色块隔开的场景，方便用户风格统一，减少工作量

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

直接引入即可使用
- 通过`height`配置高度，单位rpx
- 通过`bg-color`配置背景颜色

```html
<u-gap height="80" bg-color="#bbb"></u-gap>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| bg-color |  背景颜色 | String	 | transparent(背景透明) | - |
| height | 间隔槽高度，单位rpx  | String \| Number | 30 | - |
| margin-top | 与前一个元素的距离，单位rpx | String \| Number  | 0 | - |
| margin-bottom | 与后一个元素的距离，单位rpx | String \| Number  | 0 | - |
