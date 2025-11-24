## Section 查看更多 <to-api/>

<demo-model url="/pages/componentsC/section/index"></demo-model>


该组件一般用于分类信息有很多，但是限于篇幅只能列出一部分，让用户通过"查看更多"获得更多信息的场景，实际效果见演示。


### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 基本使用

说明：此组件会在最左边显示一个竖条

- 通过`title`参数设置主标题
- 通过`sub-title`参数设置副标题

```html
<u-section title="今日热门" sub-title="查看更多"></u-section>
```

### 是否显示右边内容

可以通过设置`right`为`false`来隐藏右边的内容

```html
<u-section title="今日热门" :right="false"></u-section>
```


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| title | 左边主标题 | String | - | - |
| sub-title | 右边副标题 | String  | 更多 | - |
| right | 是否显示右边的内容 | Boolean  | true | false |
| show-line | 是否显示左边的竖条 | Boolean  | true | false |
| font-size | 主标题的字体大小 | String \| Number  | 28 | - |
| bold | 主标题是否加粗 | Boolean  | true | false |
| color | 主标题颜色 | String  | #303133 | - |
| sub-color | 右边副标题的颜色(右箭头同此颜色) | String  | #909399 | - |
| line-color | 左边竖线的颜色，默认同`color`参数值 | String  | - | - |
| arrow | 是否显示右边箭头 | Boolean  | true | false |


### Events


| 事件名 | 说明 | 回调参数 | 版本 |
| :- | :- | :- | :- |
| click | 组件右侧的内容被点击时触发，用于跳转"更多" | - | - |


### Slot

| 名称          | 说明            |
|-------------  |---------------- |
| right | 自定义右侧内容  |


<style scoped>
h3[id=slot] + table thead tr th:nth-child(2){
	width: 50%;
}
</style>
