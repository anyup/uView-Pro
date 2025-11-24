 ## Parse 富文本解析器 <Badge text="该组件已废弃" type="error" />

 建议使用 `mp-html` 或其他，`mp-html` 开源地址：[https://github.com/jin-yufeng/mp-html](https://github.com/jin-yufeng/mp-html)

<!-- ## Parse 富文本解析器 <to-api/>

<demo-model url="/pages/componentsA/parse/index"></demo-model>

该组件一般用于富文本解析场景，比如解析文章内容，商品详情，带原生 HTML 标签的各类字符串等，此组件和 uni-app 官方的`rich-text`组件功能有重合之处，但是也有不同的地方。

#### 相同点：

- 二者都能解析 HTML 字符串

#### 不同点：

- 对于轻量、简单的字符串，`rich-text`性能更好
- 对于复杂的字符串，使用`parse`组件效果更好，有更多的自定义属性和效果

总结：如果是简单的场景，比如一段简单的文字和图片内容，可以优先使用`rich-text`组件，在文章内容，商品详情等复杂的文本详情，可以优先使用`parse`组件。

:::tip 提示
此组件源于开源的优秀作品[Parser](https://jin-yufeng.github.io/Parser/#/)，本文档只对重要的功能进行介绍，如果需要更详细的说明，请参考[Parser](https://jin-yufeng.github.io/Parser/#/)官方文档。
:::

### 平台差异说明

| App | H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ 小程序 |
| :-: | :-: | :--------: | :----------: | :--------: | :--------: | :-------: |
|  √  |  √  |     √      |      √       |     √      |     √      |     √     |

### 基本使用

通过`html`参数绑定需要解析的内容即可。

```html
<template>
  <view class="u-content">
    <u-parse :html="content"></u-parse>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/xxx.jpg" />
				`,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .u-content {
    margin-top: 100rpx;
  }
</style>
```

### 长按复制

可以通过设置`selectable`参数为`true`来实现长按复制的效果

```html
<u-parse :html="content" :selectable="true"></u-parse>
```

### 设置样式

可以有两种方法可设置富文本的样式：

- 通过组件的`tag-style`参数可以精细化的对单独的标签设置样式，注意此方式设置的样式为**字符串**的形式，而非**对象**形式：

```html
<template>
  <view class="u-content">
    <u-parse :html="content" :tag-style="style"></u-parse>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/xxx.jpg" />
				`,
        style: {
          // 字符串的形式
          p: "color: red;font-size:32rpx",
          span: "font-size: 30rpx",
        },
      };
    },
  };
</script>
```

- 通过父元素标签，统一设置全文的颜色，行高，字体大小等，注意这种方式无法对单独的标签设置样式：

```html
<template>
  <view class="u-content">
    <u-parse :html="content"></u-parse>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/xxx.jpg" />
				`,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .u-content {
    margin-top: 100rpx;
    color: $u-content-color;
    font-size: 32rpx;
    line-height: 1.8;

    // 标签形式无效
    p {
      color: $u-tips-color;
    }
  }
</style>
```

### 懒加载和占位图

- 设置`lazy-load`为`true`即可开启图片懒加载功能
- 设置`loading-img`为网络路径或者 base64 图片，可以在图片加载完成前展示占位图

```html
<u-parse
  :html="content"
  :lazy-load="true"
  :loading-img="/xxx/xxx.jpg"
></u-parse>
```

### 渐变动画

设置`show-with-animation`为`true`，可以让内容展示时，获得一个淡入的效果。

```html
<u-parse :html="content" :show-with-animation="true"></u-parse>
```

<br>

### 图片预览

无需配置，点击图片，即可获得图片预览功能

<br>

### 链接跳转

H5、App（含 NVUE）外链可以直接打开，小程序端将自动复制链接  
小程序端`a`标签设置`app-id`后可以跳转到其他小程序

<br>

### 其他配置

本组件还有其他更多的配置功能，如获取页面的所有图片数组，跳转页内锚点，视频播放等，如需更多的配置信息，请移步`parser`插件文档：[parser 文档](https://jin-yufeng.github.io/Parser/#/)

<br>

### API

### Props

| 参数                | 说明                                                | 类型    | 默认值 | 可选值    |
| ------------------- | --------------------------------------------------- | ------- | ------ | --------- |
| html                | 要显示的 html 字符串                                | String  | -      | -         |
| autopause           | 是否允许播放视频时自动暂停其他视频                  | Boolean | true   | false     |
| autoscroll          | 是否自动给 table 加一个滚动层（使表格可以单独滚动） | Boolean | false  | true      |
| autosetTitle        | 是否自动将 title 标签的内容设置到页面标题           | Boolean | true   | false     |
| compress            | 压缩等级，可以选择是否移除 id 和 class(不建议修改)  | Number  | 0      | 1 / 2 / 3 |
| domain              | 主域名，设置后将给链接自动拼接上主域名或协议名      | String  | -      | -         |
| lazy-load           | 是否开启图片懒加载                                  | Boolean | false  | true      |
| loading-img         | 图片加载完成前的占位图，详见 占位图                 | String  | -      | -         |
| selectable          | 是否允许长按复制内容                                | Boolean | false  | true      |
| show-with-animation | 是否使用渐显动画                                    | Boolean | false  | true      |
| tag-style           | 设置标签的默认样式                                  | Object  | -      | -         |
| use-anchor          | 是否使用页面内锚点                                  | Boolean | false  | true      |
| use-cache           | 是否使用缓存，设置后多次打开不用重复解析            | Boolean | false  | true      |

### Event

| 事件名    | 说明               | 回调参数                                                                                                                                       |
| :-------- | :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| parse     | 解析完成时触发     | 返回解析结果，可以对该结果进行自定义修改，将在渲染时生效                                                                                       |
| load      | dom 加载完成时触发 | 所有节点被添加到节点树中时触发，无返回值，可以调用 api                                                                                         |
| ready     | 渲染完成时触发     | 返回 boundingClientRect 的查询结果（包含宽高、位置等信息），所有图片（除懒加载）加载完成时才会触发，图片较大时可能 延时较长                    |
| error     | 出错时触发         | 返回一个 object，其中 source 是错误来源，errMsg 为错误信息，target 包含出错标签的具体信息                                                      |
| imgtap    | 图片被点击时触发   | 返回一个 object，其中 src 是图片链接，ignore 是一个函数，在事件中调用将不进行预览；可用于阻挡 onShow 的调用                                    |
| linkpress | 在链接被点击时触发 | 返回一个 object，其中包含了被点击的 a 标签的所有属性，ignore 是一个函数，在事件中调用后将不自动跳转/复制；可在该事件中进行下载文档等进一步操作 |

<style scoped>
h3[id=event] + table thead tr th:nth-child(2){
	width: 20%;
}
h3[id=event] + table thead tr th:nth-child(3){
	width: 60%;
}
</style> -->
