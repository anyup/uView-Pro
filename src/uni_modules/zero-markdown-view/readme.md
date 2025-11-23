# zero-markdown-view

## 一. 重要更新说明

### v3.0.0

- 优化了代码块流式输出
- 增加aiMode模式（内容靠左对齐的，样式区别于普通模式）


### v2.1.0

- 新增 latex 公式支持
- 代码块高亮支持: languages=markup+css+clike+javascript+c+cpp+go+java+markup-templating+php+python+rust
- 代码包体积增加了不少(注意)

### v2.0.4 (仅需要基础功能可以使用此版本)

- 新增点击代码块复制代码-仅小程序可用

### v2.0.0

- 省去了 npm install marked
- 省去了 npm install highlight.js
- 使用 mp-html 自带的插件,重新生成 uniapp 包,大幅减少插件体积
  传送门: [优化思路及详细过程](https://juejin.cn/post/7160995270476431373/) https://juejin.cn/post/7160995270476431373/

## 二. 使用方法

> 建议放到分包里手动引入该插件

**符合`easycom`组件模式, 导入 `uni_modules` 后直接使用即可 **

```html
<template>
  <view class="container">
    <!-- 默认用法 直接传入md文本即可 普通md展示-->
    <zero-markdown-view :markdown="content"></zero-markdown-view>

	<!-- ai对话模式 -->
	 <zero-markdown-view :markdown="msgContent" :aiMode='true'></zero-markdown-view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        content: "## md格式的文本内容",
		msgContent: "## ai回复的内容，兼容流式输出",
      };
    },
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped></style>
```

## 三. 参数说明

| 参数        | 类型   | 默认值    | 描述          |
| ----------- | ------ | --------- | ------------- |
| markdown    | String |           | markdown 文本 |
| themeColor  | String | '#007AFF' | 主题色        |
| codeBgColor | String | '#2d2d2d' | 代码块背景色  |
| aiMode      | Boolean| false     | 是否为 AI 模式（内容靠左对齐） |


## 四. 注意事项

### 关于代码块高亮

如果需要更多语言或更换主题请前往 prism 官网 下载对应的 prism.min.js 和 prism.css 并替换 plugins/highlight/ 目录下的文件,重新运行打包命令并替换 mp-html. 不建议这样做,因为本插件还修改过其他地方,可能会导致插件不能正常使用.
具体请参考 mp-html 的文档,在文末有链接

### 关于代码块流式输出闪烁,可以尝试 给代码块后增加 `\n`

#### 已经在组件内的 `aiMode` 解决，不需要自行处理,也就是说，如何你是是用在ai上，直接把ai回复内容传给组件就可以了
#### 已经在组件内的 `aiMode` 解决，不需要自行处理,也就是说，如何你是是用在ai上，直接把ai回复内容传给组件就可以了
#### 已经在组件内的 `aiMode` 解决，不需要自行处理,也就是说，如何你是是用在ai上，直接把ai回复内容传给组件就可以了


> 注意小程序上的流逝输出需要结合unipush2使用

> 感谢评论区的一个朋友提供的代码

````javascript
		computed: {
						// 流式输出时代码块处理 , 这时候请使用 msgContent 传入组件中
		msgContent() {
			if (!this.markdown) {
				return
			}
			let htmlString = ''
			// 检查是否有未闭合的代码块
			const codeBlocks = this.markdown.match(/```[\s\S]*?```|```[\s\S]*?$/g) || []
			const lastBlock = codeBlocks[codeBlocks.length - 1]
			if (lastBlock && !lastBlock.endsWith('```')) {
				// 最后一个代码块未闭合,需要补上结束标识符
				htmlString = this.markdown + '\n'
			} else {
				htmlString = this.markdown
			}
			return htmlString
		},
		},
````

### 如何关闭点击代码块复制功能?

找到组件文件夹 `zero-markdown-view`-`mp-html`-`highlight`-`config.js`

**把 `copyByClickCode` 改成 false 即可**

```
export default {
  copyByClickCode: true, // 点击代码块复制
  showLanguageName: true, // 是否在代码块右上角显示语言的名称
}
```

### 感谢 mp-html 插件

插件地址: [https://ext.dcloud.net.cn/plugin?id=805](https://ext.dcloud.net.cn/plugin?id=805)

文档地址: [https://jin-yufeng.gitee.io/mp-html/#/overview/quickstart](https://jin-yufeng.gitee.io/mp-html/#/overview/quickstart)

插件预览:
![code](https://cdn.zerojs.cn/image/common/code-z_1722414660881_1.jpg?imageMogr2/thumbnail/200x)

> 小程序搜索: 零技术

> 预览的小程序不一定能及时更新当前插件
