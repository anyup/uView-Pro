export const apis = `
# color 颜色值

此功能为uView Pro内部通过js提供的一些颜色值，可以用于通过js修改元素字体，背景颜色等一些场景，常用于uView Pro的各个组件中。  
这些颜色值，挂载在\`$u\`对象下的\`color\`数组中，关于这些颜色值的具体描述，详见[Color 色彩](/zh/components/color.html)  
使用方法：如使用\`primary\`颜色值，方法为：\`$u.color['primary']\`

**说明**：这些通过JS调用的颜色值，也是能通过CSS调用的，二者等价。详见[Color 色彩](/zh/components/color.html)  

## 主题颜色

该主题颜色值，一共有5个，分别是\`primary\`、\`error\`、\`success\`、\`info\`、\`warning\`

\`\`\`js
import { ref, onMounted } from 'vue';

const errorColor = ref('');

onMounted(() => {
  errorColor.value = uni.$u.color['error'];
});
\`\`\`


## 文字颜色

uView一共提供了四个颜色值，具体请见组件部分[Color色彩](/zh/components/color.html)  
分别有：\`mainColor\`、\`contentColor\`、\`tipsColor\`、\`lightColor\`、\`borderColor\`(边框颜色值)

\`\`\`js
console.log(uni.$u.color['contentColor']);
\`\`\`


## 背景颜色

uView提供了一个浅灰的背景颜色值，该值为\`#f3f4f6\`

\`\`\`js
console.log(uni.$u.color['bgColor']);
\`\`\`


`;

export const apis2 = `
# 自定义主题

<demo-model url="/pages/componentsC/color/index"></demo-model>

uView Pro 目前可以自定主题色，字体颜色，边框颜色等，所有组件内部的样式，都基于同一套主题，比如您修改了\`primary\`主题色，所有用到了\`primary\`颜色
的组件都会受影响。

## 教程

1. 可以在打开的颜色拾取器中输入或者选择颜色，再点"确定"按钮即可。
2. 颜色配置完后，在页面底部下载文件，会得到一个名为\`uview-pro.theme.scss\`和\`uview-pro.theme.ts\`(可选)的文件。

## 配置 scss 变量

1. 将\`uview-pro.theme.scss\`文件复制到项目的公共目录(视情况而定)中，再在项目根目录的\`uni.scss\`中引入即可。
2. 删除\`uni.scss\`文件中原来引入的\`@import 'uview-pro/theme.scss';\`(旧的内置主题文件引入语句)。
3. 重新编译项目或者重启编辑器即可生效。

## 配置 ts 变量

1. 将\`uview-pro.theme.ts\`文件复制到项目的公共目录(视情况而定)中，再在项目根目录的\`main.ts\`中引入即可，如下：
2. 重新编译项目即可生效。

引入方式：

\`\`\`ts
import { createSSRApp } from 'vue'
import App from './App.vue'
import theme from '@/common/uview-pro.theme'
import uViewPro from 'uview-pro'

export function createApp() {
  const app = createSSRApp(App)
  // 引入uView Pro 主库，及theme主题
  app.use(uViewPro, { theme })
  return {
    app
  }
}
\`\`\`

## 如何使用

在 scss 中使用：

\`\`\`html
<style lang="scss" scoped>
	.title{
		color: $u-type-primary;
	}
</style>

\`\`\`

在 ts 中使用：

\`\`\`js
import { ref, onMounted } from 'vue';

const color = ref('');

onMounted(() => {
  color.value = uni.$u.color['primary'];
});
\`\`\`

两者的主题即可同步！

`;
