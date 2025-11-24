export const apis = `
# Icon 图标

基于字体的图标集，包含了大多数常见场景的图标。

## 平台差异说明

| App | H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ 小程序 |
| :-: | :-: | :--------: | :----------: | :--------: | :--------: | :-------: |
|  √  |  √  |     √      |      √       |     √      |     √      |     √     |

## 基本使用

<br>


> 如果您觉得内置的图标数量不够，或者不合符您的需求，别担心，我们还精心为您准备了一份简单易用的扩展自定义图标库教程：[扩展自定义图标库](https://uviewpro.cn/zh/guide/customIcon.html)


<br>

通过\`<u-icon>\`形式来调用，设置\`name\`参数为图标名即可

\`\`\`html
<u-icon name="photo"></u-icon>
\`\`\`

## 修改图标的样式

- 通过\`color\`参数修改图标的颜色
- 通过\`size\`参数修改图标的大小，单位为 rpx

\`\`\`html
<u-icon name="photo" color="#2979ff" size="28"></u-icon>
\`\`\`

## 图片图标

这里说的图片图标，指的是小图标，起作用定位为"icon"图标作用，而非大尺寸的图片展示场景，理论上，这个小图标应该为\`png\`格式的正方形图标。

上面说到，给组件的\`name\`参数传入一个图片的名称即可显示字体图标，这些名称中不能带有\`/\`斜杠符号，否则会被认为是传入了图片图标，同时，\`size\`参数
也被设置为这个图片图标的宽度，由于是图片，诸如颜色\`color\`等参数都会失效。

\`\`\`html
<u-icon
  label="uView"
  size="40"
  name="https://ik.imagekit.io/anyup/uview-pro/logo/default.png"
></u-icon>
\`\`\`

## API

## Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|---|---|---|---|---|
| name | 图标名称，见示例图标集，如名称带有\`/\`，会被认为是图片图标 | String | - | - |
| color | 图标颜色 | String | inherit | - |
| size | 图标字体大小，单位 rpx | String\|Number | inherit | - |
| index | 一个用于区分多个图标的值，点击图标时通过\`click\`事件传出 | String | - | - |
| hover-class | 图标按下去的样式类，用法同 uni 的\`view\`组件的\`hover-class\`参数，详见：[hover-class](https://uniapp.dcloud.io/component/view) | String | - | - |
| label | 图标右侧/下方的 label 文字 | String | - | - |
| label-size | \`label\`字体大小，单位 rpx | String\|Number | 28 | - |
| label-color | \`label\`字体颜色 | String | #606266 | - |
| custom-prefix | 自定义字体图标库时，需要写上此值，详见：[扩展自定义图标库](https://uviewpro.cn/zh/guide/customIcon.html) | String | uicon | - |
| space <BadgeVersion text="0.0.4" /> | \`label\`在四周时与图标的距离，权重高于 margin，单位 rpx | String\|Number | - | - |
| margin-left | \`label\`在右方时与图标的距离，单位 rpx | String\|Number | 6 | - |
| margin-top | \`label\`在下方时与图标的距离，单位 rpx | String\|Number | 6 | - |
| margin-bottom | \`label\`在上方时与图标的距离，单位 rpx | String\|Number | 6 | - |
| margin-right | \`label\`在左侧时与图标的距离，单位 rpx | String\|Number | 6 | - |
| label-pos | \`label\`相对于图标的位置 | String | right | bottom/top/left |
| width | \`name\`为图片路径时图片的宽度，单位任意，数值默认为 rpx 单位 | String\|Number | - | - |
| height | \`name\`为图片路径时图片的高度，单位任意，数值默认为 rpx 单位 | String\|Number | - | - |
| top | 如果某些场景，如果图标没有垂直居中，可以调整此参数，单位任意，数值默认为 rpx 单位 | String\|Number | 0 | - |
| show-decimal-icon | 是否为 DecimalIcon | Boolean | false | true |
| inactive-color | 背景颜色，可接受主题色，仅 Decimal 时有效 | String | #ececec | - |
| percent | 显示的百分比，仅 Decimal 时有效 | String\|Number | 50 | - |

## Events

| 事件名 | 说明           | 回调参数                          | 版本 |
| :----- | :------------- | :-------------------------------- | :--- |
| click  | 点击图标时触发 | index: 通过\`props\`传递的\`index\`值 | -    |

`;

export const apis2 = `
# CustomIcon 扩展自定义图标库

uView Pro 已通过大量的实践中，收集了用户最有可能需要用到的图标，见 [Icon 图标](/zh/components/icon.html)，但我们也相信，它肯定无法覆盖所有的场景和需求。

用户也可以使用标签的方式，自行引入字体图标，为何要通过扩展的方式集成呢？  
这是因为 uView 有统一的字体图标组件，使用方便，配置灵活，且风格统一。

> 以下说明和演示，均针对[阿里字体图标库](https://www.iconfont.cn)，其他字体库源同理

总的来说，我们要实现的效果如下：

\`\`\`css
@font-face {
  /* 声明"custom-icon"字体 */
  font-family: "custom-icon";
  src: url("data:application/x-font-woff2;charset=utf-8;base64,xxxxxxxx") format("woff2");
}

.custom-icon {
  /* 引用上面声明的"custom-icon"字体 */
  font-family: "custom-icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 字体图标的前缀为"custom-icon-" */
.custom-icon-copy:before {
  content: "\e641";
}
\`\`\`

通过如下方式引用：

通过\`custom-prefix\`指定类名为\`custom-icon\`

\`\`\`html
<u-icon name="copy" custom-prefix="custom-icon"></u-icon>
\`\`\`

## 基础说明

我们假定您一个项目中，需要扩展多个图标，所以您应该把各个图标收集进一个阿里图标库的项目中，即使您后面不断的扩展图标，也能让它们在同一个库中。

一般情况下，我们建议您在收藏的项目中，使用"下载至本地"的功能，而后解压，复制文件夹中的"iconfont.css"至 uni-app 目中(其余的文件可忽略)

下面的操作默认您已进入阿里图标库的"图标管理"栏目中

1. 我们建议，您应该修改这个图标的前缀，这样以后有新图标加入的时候，不用每次频繁修改前缀，在右上角的"更多操作"中，进入"编辑项目"：

<img src="https://ik.imagekit.io/anyup/uview-pro/docs/custom_icon/custom_icon_3.png?updatedAt=1638330909645" />

2. 修改"FontClass/Symbol 前缀"项为"custom-icon-"，修改"Font Family"为"custom-icon"，如下图：

<img src="https://ik.imagekit.io/anyup/uview-pro/docs/custom_icon/custom_icon_4.png?updatedAt=1638330909645" />

3. 下载项目至本地

<img src="https://ik.imagekit.io/anyup/uview-pro/docs/custom_icon/custom_icon_1.png" />

4. 复制"iconfont.css"至项目，一般放在根目录的\`static\`文件夹下

<img src="https://ik.imagekit.io/anyup/uview-pro/docs/custom_icon/custom_icon_2.png" />

5. 复制"iconfont.css"文件到 uni-app 目根目录的\`static\`目录后(也可以为其他目录)，打开"iconfont.css"，内部如下：

删掉下图圈出的部分，记得把"src: url('data:application/x-font-woff2......"最后的逗号\`,\`改成分号\`;\`。

<img src="https://ik.imagekit.io/anyup/uview-pro/docs/custom_icon/custom_icon_8.png" />

6. 最终如下图：

<img src="https://ik.imagekit.io/anyup/uview-pro/docs/custom_icon/custom_icon_9.png" />

7. 在项目根目录的"App.vue"中，引入上述的"iconfont.css"，注意自己存放的路径，且通过"@import"引入的外部样式，为了兼容性建议使用相对路径，
   且引入的样式，需要写在\`style\`标签有效内容中的最前面，如下：

\`\`\`css
/* App.vue */
<style>
/* 此处为style标签内容的最前面 */
@import "./static/iconfont.css";

.view {
	......
}

/* 下面为错误示例，因为这里不是style标签内容的最前面，前面还有个".view"的样式 */
/* @import "./static/iconfont.css"; */
</style>
\`\`\`

8. 在页面通过 uView 的[Icon](/zh/components/icon.html)组件使用图标，图标名称为您在阿里图标库中点击"编辑图标"时的"Font Class / Symbol"(该值可修改，每次修改都需重新下载"iconfont.css"放到 uni-app 目中，
   覆盖原来的"iconfont.css")

<img src="https://ik.imagekit.io/anyup/uview-pro/docs/custom_icon/custom_icon_7.png" />

如上图，我们得到"backspace"值，使用如下：

\`\`\`html
<u-icon
  name="backspace"
  custom-prefix="custom-icon"
  size="30"
  color="#888888"
></u-icon>
\`\`\`

从上可以看出，相比 uView 内置的图标使用，多了一句固定的\`custom-prefix="custom-icon"\`，其余使用方法完全相同
<br>

**注意**：执行完上面的操作后，您就可以随心所欲的扩展自己的图标了，最重要的是第二步，修改了它，就免了以后每次都要修改"iconfont.css"的多处细节。
当然，每次新增图标，当您把"iconfont.css"复制至项目中覆盖原来的"iconfont.css"后，都需要执行一遍第 5 步删掉多余的内容，别忘了修改最后的\`,\`为\`;\`。

最后提一下，为了多平台兼容性，您应该仅把单色图标添加到阿里图标库的项目中，即使添加了多色的图标，在使用中，也会被转成单色。

祝您使用愉快！
`;
