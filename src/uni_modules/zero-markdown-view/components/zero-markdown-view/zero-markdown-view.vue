<template>
	<view class="zero-markdown-view">
		<mp-html :key="mpkey" :selectable="selectable" :scroll-table='scrollTable' :tag-style="tagStyle"
			:markdown="true" :content="contentAi">
		</mp-html>
	</view>
</template>

<script>
import mpHtml from '../mp-html/mp-html';


export default {
	name: 'zero-markdown-view',
	components: {
		mpHtml
	},
	props: {
		markdown: {
			type: String,
			default: ''
		},
		selectable: {
			type: [Boolean, String],
			default: true
		},
		scrollTable: {
			type: Boolean,
			default: true
		},
		themeColor: {
			type: String,
			default: '#007AFF'
		},
		codeBgColor: {
			type: String,
			default: '#2d2d2d'
		},
		aiMode: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			content: '',
			tagStyle: '',
			mpkey: 'zero'
		};
	},
	computed: {
		contentAi() {
			if (!this.content) {
				return //处理特殊情况，比如网络异常导致的响应的 content 的值为空
			}
			let htmlString = ''
			// 检查是否有未闭合的代码块
			const codeBlocks = this.content.match(/```[\s\S]*?```|```[\s\S]*?$/g) || []
			const lastBlock = codeBlocks[codeBlocks.length - 1]
			if (lastBlock && !lastBlock.endsWith('```')) {
				// 最后一个代码块未闭合,需要补上结束标识符
				htmlString = this.content + '\n'
			} else {
				htmlString = this.content
			}
			return htmlString
		},
	},
	watch: {
		markdown: function (val) {
			this.content = this.markdown
		}
	},
	created() {
		if (this.aiMode) {
			this.initTagStyleForAi();
		} else {
			this.initTagStyle();
		}
	},
	mounted() {
		this.content = this.markdown
	},

	methods: {

		initTagStyle() {
			const themeColor = this.themeColor
			const codeBgColor = this.codeBgColor
			let zeroStyle = {
				p: `
				margin:5px 5px;
				font-size: 15px;
				line-height:1.75;
				letter-spacing:0.2em;
				word-spacing:0.1em;
				`,
				// 一级标题
				h1: `
				margin:25px 0;
				font-size: 24px;
				text-align: center;
				font-weight: bold;
				color: ${themeColor};
				padding:3px 10px 1px;
				border-bottom: 2px solid ${themeColor};
				border-top-right-radius:3px;
				border-top-left-radius:3px;
				`,
				// 二级标题
				h2: `
				margin:40px 0 20px 0;	
				font-size: 20px;
				text-align:center;
				color:${themeColor};
				font-weight:bolder;
				padding-left:10px;
				// border:1px solid ${themeColor};
				`,
				// 三级标题
				h3: `
				margin:30px 0 10px 0;
				font-size: 18px;
				color: ${themeColor};
				padding-left:10px;
				border-left:3px solid ${themeColor};
				`,
				// 引用
				blockquote: `
				margin:15px 0;
				font-size:15px;
				color: #777777;
				border-left: 4px solid #dddddd;
				padding: 0 10px;
				 `,
				// 列表 
				ul: `
				margin: 10px 0;
				color: #555;
				`,
				li: `
				margin: 5px 0;
				color: #555;
				`,
				// 链接
				a: `
				// color: ${themeColor};
				`,
				// 加粗
				strong: `
				font-weight: border;
				color: ${themeColor};
				`,
				// 斜体
				em: `
				color: ${themeColor};
				letter-spacing:0.3em;
				`,
				// 分割线
				hr: `
				height:1px;
				padding:0;
				border:none;
				text-align:center;
				background-image:linear-gradient(to right,rgba(248,57,41,0),${themeColor},rgba(248,57,41,0));
				margin:10px 0;
				`,
				// 表格
				table: `
				border-spacing:0;
				overflow:auto;
				min-width:100%;
				margin:10px 0;
				border-collapse: collapse;
				`,
				th: `
				border: 1px solid #202121;
				color: #555;
				`,
				td: `
				color:#555;
				border: 1px solid #555555;
				`,
				pre: `
				border-radius: 5px;
				white-space: pre;
				background: ${codeBgColor};
				font-size:12px;
				position: relative;
				`,
			}
			this.tagStyle = zeroStyle
		},
		initTagStyleForAi() {
			const themeColor = this.themeColor
			const codeBgColor = this.codeBgColor
			let zeroStyle = {
				p: `
				font-size: 16px;
				`,
				// 一级标题
				h1: `
				margin:18px 0 10px 0;
				font-size: 24px;
				color: ${themeColor};
				`,
				// 二级标题
				h2: `
				margin:14px 0 10px 0;
				font-size: 20px;
				color: ${themeColor};
				`,
				// 三级标题
				h3: `
				margin:12x 0 8px 0;
				font-size: 18px;
				color: ${themeColor};
				`,
				// 四级标题
				h4: `
				margin:12px 0 8px 0;
					font-size: 16px;
				color: ${themeColor};
				`,
				// 五级标题
				h5: `
				margin:10px 0 8px 0;
					font-size: 16px;
				color: ${themeColor};
				`,
				// 六级标题
				h6: `
				margin:8px 0 8px 0;
					font-size: 16px;
				color: ${themeColor}
				`,
				// 引用
				blockquote: `
				margin:15px 0;
				font-size:15px;
				color: #777777;
				border-left: 4px solid #dddddd;
				padding: 0 10px;
				 `,
				// 列表 
				ul: `
				margin: 10px 0;
				color: #555;
				`,
				li: `
				margin: 5px 0;
				color: #555;
				`,
				// 链接
				a: `
				// color: ${themeColor};
				`,
				// 加粗
				strong: `
				font-weight: border;
				color: ${themeColor};
				`,
				// 斜体
				em: `
				color: ${themeColor};
				letter-spacing:0.3em;
				`,
				// 分割线
				hr: `
				height:1px;
				padding:0;
				border:none;
				text-align:center;
				background-image:linear-gradient(to right,rgba(248,57,41,0),${themeColor},rgba(248,57,41,0));
				margin:10px 0;
				`,
				// 表格
				table: `
				border-spacing:0;
				overflow:auto;
				min-width:100%;
				margin:10px 0;
				border-collapse: collapse;
				`,
				th: `
				border: 1px solid #202121;
				color: #555;
				`,
				td: `
				color:#555;
				border: 1px solid #555555;
				`,
				pre: `
				border-radius: 5px;
				white-space: pre;
				background: ${codeBgColor};
				font-size:12px;
				position: relative;
				`,
			}
			this.tagStyle = zeroStyle
		},
	}
};
</script>

<style lang="scss">
.zero-markdown-view {
	padding: 15rpx;
	position: relative;
}
</style>