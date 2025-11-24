## 安装

<demo-model url="/"></demo-model>

:::tip 说明

1. 由于 uView Pro 使用`easycom`模式，让您无需引入组件即可直接使用，但是此功能需要 Hbuilder X 2.5.5 及以上版本才支持，详见[配置 easycom 组件模式](/components/quickstart.html#_3-配置easycom组件模式)。
   `easycom`打包的时候是**按需引入**的，您可以放心引入 uView Pro 的整个组件库，发布打包时会自动剔除您没有使用的组件(注意：调试时仍然是全部引入的)

2. 请确保您下载的[Hbuilder X](https://www.dcloud.io/hbuilderx.html)为`APP开发版`，而非`标准版`，并且在"工具-插件安装"中安装了"scss/sass 编译"插件

:::

### 方式一：npm 安装

使用 npm 的方式安装，能更方便进行升级。

- 如果您的项目是通过[vue-cli](https://uniapp.dcloud.io/quickstart?id=_2-%e9%80%9a%e8%bf%87vue-cli%e5%91%bd%e4%bb%a4%e8%a1%8c)模式创建的，
  无需手动 npm 安装`scss`，因为已内置`scss`。

**注意：** 此安装方式必须要按照[npm 方式安装的配置](/components/npmSetting.html)中的说明配置了才可用，且项目名称不能有**中文**字符。

```js
// 如果您的项目是HX创建的，根目录又没有package.json文件的话，请先执行如下命令：
// npm init -y

// npm 安装
npm install uview-pro
// yarn 安装
yarn add uview-pro
// pnpm 安装
pnpm add uview-pro
```

### 版本查询

- 通过源码查看的形式

可以查阅 uView Pro 的配置文件得知当前版本号，具体位置为 "/uview-pro/package.json" 中的 "version" 字段。

### 方式二：下载安装

使用下载的方式安装，能更方便阅读源码，但是每次升级都需要重新下载并覆盖 `uview-pro` 文件夹。

- 在 uni-app 插件市场右上角选择 `下载并导入HBuilder X`，会直接导入到项目 `src` 目录的 `uni_modules` 目录中。
- 如果您的项目是由 HBuilder X 创建的标准 uni-app 项目，将下载后的`uview-pro`文件夹，复制到项目`uni_modules`目录。
- 如果您的项目是由[vue-cli](https://uniapp.dcloud.io/quickstart?id=_2-%e9%80%9a%e8%bf%87vue-cli%e5%91%bd%e4%bb%a4%e8%a1%8c)模式创建的，请将下载后的`uview-pro`文件夹放到项目的`src`的 `uni_modules`文件夹中即可。

**注意：** 此安装方式必须要按照[下载方式安装的配置](/components/downloadSetting.html)中的说明配置了才可用。

<br>
<div @click="downloadPost(2)" class="download-link">
	<!-- 下载地址：<a href="https://download.uviewui.com/uView_1.3.6.zip">uView_1.3.6.zip</a> -->
	下载地址：<a target="_blank" href="https://ext.dcloud.net.cn/plugin?id=24633">https://ext.dcloud.net.cn/plugin?id=24633</a>
</div>
<br>
<br>

### 示例项目

此方式为整个 uView Pro 演示项目，里面有 uView Pro 核心，组件演示，模板等，建议用户可以下载
此项目运行用于查看 UI 演示效果，复制模板案例，通过里面的示例，可以快速掌握某一个组件的用法。

<!-- - 途径一：uView示例项目已内置到`HBuilder X`中，在`文件 -> 新建 -> 项目 -> uni-app`中，找到`uView Pro`下载运行即可。 -->

<!-- - 途径二：在uni-app插件市场右上角选择`使用 HBuilderX 导入示例项目`或者`下载示例项目ZIP`，然后在HBuilder X中运行即可。 -->

通过 github 或 gitee 下载 uView Pro 示例项目，在 VSCode 中运行即可。

- github：[https://github.com/anyup/uview-pro](https://github.com/anyup/uview-pro)
- gitee：[https://gitee.com/anyup/uview-pro](https://gitee.com/anyup/uview-pro)

```bash

pnpm install

pnpm run dev:h5
```

<br>
<div @click="downloadPost(3)" class="download-link">
	<!-- 下载地址：<a href="https://download.uviewui.com/uView_1.3.6_demo.zip">uView_1.3.6_demo.zip</a> -->
	uni-app插件市场地址：<a target="_blank" href="https://ext.dcloud.net.cn/plugin?id=24633">https://ext.dcloud.net.cn/plugin?id=24633</a>
</div>
<br>
<br>

:::tip 注意
演示项目不适用于直接开发中，它只是演示用的，可以直接运行并查看效果。  
如果在微信开发工具真机预览时，提示分包太大运行的问题，请在`HBuilder X`进行设置：菜单栏 运行 -> 运行到小程序模拟器，在下拉菜单中**勾选**"运行时是否压缩代码"
:::

<br>
<br>

<script>
import axios from "axios";
export default {
	data() {
		return {
			
		}
	},
	methods: {
		downloadPost(type) {
			let url = this.$themeConfig.baseUrl + '/index/index/download';
			axios.post(url, {
			    type: type,
			})
			.then(function (response) {
			    // console.log(response);
			})
			.catch(function (error) {
			   // console.log(error);
			});
		}
	}
}
</script>

<style scoped>
.download-link {
	font-size: 14px;
	color: #5e6d82;
}
</style>
