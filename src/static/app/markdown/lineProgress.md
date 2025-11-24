## LineProgress 线形进度条 <to-api/>


<demo-model url="/pages/componentsC/progress/index"></demo-model>


展示操作或任务的当前进度，比如上传文件，是一个线形的进度条。

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

- 通过`percent`设置当前的进度值，该值区间为0-100.
- 通过`active-color`设置进度条的颜色，也可以直接设置`type`主题颜色(优先起作用)，使用预置值

```html
<u-line-progress active-color="#2979ff" :percent="70"></u-line-progress>
```

### 设置进度条动画效果

该效果会在已完成的百分比部分显示移动的条纹(具体见示例效果)
- `striped`参数配置是否显示条纹
- `striped-active`参数配置条纹是否具有动态效果

```html
<u-line-progress :striped="true" :percent="70" :striped-active="true"></u-line-progress>
```

### 设置进度条内部显示百分比值

参数为`show-percent`  
- 说明：进度条可以通过`height`设置高度，如果高度太小的话，是无法在内部显示当前的百分比值的

```html
<u-line-progress :percent="70" :show-percent="true"></u-line-progress>
```

### 修改进度条的样式

- `active-color`参数修改激活部分的颜色
- `round`参数设置进度条两端是否为半圆

```html
<u-line-progress :percent="70" :round="false" active-color="#ff9900"></u-line-progress>
```

### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| percent | 进度条百分比值，为数值类型，0-100  | String \| Number | - | - |
| round | 进度条两端是否为半圆  | Boolean | true | false |
| type | 如设置，`active-color`值将会失效 | String  | - | success / primary / error / info / warning |
| active-color | 进度条激活部分的颜色 | String  | #19be6b | - |
| inactive-color | 进度条的底色，默认为灰色 | String  | #ececec | - |
| show-percent | 是否在进度条内部显示当前的百分比值数值 | Boolean  | true | false |
| height | 进度条的高度，单位rpx | String \| Number  | 28 | - |
| striped | 是否显示进度条激活部分的条纹 | Boolean  | false | true |
| striped-active | 条纹是否具有动态效果 | Boolean  | false | true |


 ### Slots

| 名称 | 说明 |
|:-|:-|
| default | 传入自定义的显示内容，将会覆盖默认显示的百分比值 |


<style scoped>
h3[id=slots] + table thead tr th:nth-child(2){
	width: 50%;
}
</style>
