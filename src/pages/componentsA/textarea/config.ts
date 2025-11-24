export const apis = `
# Textarea 文本域

文本域此组件满足了可能出现的表单信息补充，编辑等实际逻辑的功能，内置了字数校验等，和 [u-input](/zh/components/input.html) 的 textarea 基本一致。

## 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

## 基本使用

\`\`\`html
<template>
  <u-textarea v-model="value1" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref<string>('')
</script>
\`\`\`

## 字数统计

\`\`\`html
<template>
  <u-textarea v-model="value2" placeholder="请输入内容" count />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value2 = ref<string>('统计字数')
</script>
\`\`\`

## 自动增高

\`\`\`html
<template>
  <u-textarea v-model="value3" placeholder="请输入内容" autoHeight />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value3 = ref<string>('')
</script>
\`\`\`

## 禁用状态

设置\`disabled\`属性实现进行禁用，您也可以动态设置是否禁用

\`\`\`html
<template>
  <u-textarea v-model="value4" placeholder="文本域已被禁用" disabled count />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value4 = ref<string>('')
</script>
\`\`\`

## 下划线模式

设置\`border="bottom"\`属性单独设置底部下划线

\`\`\`html
<template>
  <u-textarea v-model="value5" placeholder="请输入内容" border="bottom" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value5 = ref<string>('')
</script>
\`\`\`

## 格式化处理


如有需要，可以通过\`formatter\`参数编写自定义格式化规则。


> 微信小程序不支持通过\`props\`传递函数参数，所以组件内部暴露了一个\`setFormatter\`方法用于设置格式化方法，注意在页面的\`onReady\`生命周期获取\`ref\`再操作。

\`\`\`html
<template>
	<u-textarea v-model="value" :formatter="formatter" ref="textarea" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const value = ref<string>('')
const textarea = ref<any>(null)

function formatter(val: string) {
	// 让输入框只能输入数值，过滤其他字符
	return val.replace(/[^0-9]/ig, '')
}
</script>
\`\`\`

<!-- \`\`\`html
<template>
	<u-textarea v-model="value" :formatter="formatter" ref="textarea" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const value = ref<string>('')
const textarea = ref<any>(null)

function formatter(val: string) {
	// 让输入框只能输入数值，过滤其他字符
	return val.replace(/[^0-9]/ig, '')
}

onMounted(() => {
	// 如果需要兼容微信小程序的话，需要在 mounted 后通过 ref 设置 formatter
	if (textarea.value && typeof textarea.value.setFormatter === 'function') {
		textarea.value.setFormatter(formatter)
	}
})
</script>
\`\`\` -->

## API

## Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|:- |:- |:- |:-: |:-: |
| value | 输入框的内容 | String &#124; String | - | - |
| placeholder | 输入框为空时占位符 | Number &#124; String | - | - |
| height | 输入框高度 | String &#124; Number | 70 | - |
| confirmType | 设置键盘右下角按钮的文字，仅微信小程序、App-vue 和 H5 有效 | String | done | - |
| disabled | 是否禁用 | Boolean | false | true |
| count | 是否显示统计字数 | Boolean | false | true |
| focus | 是否自动获取焦点，nvue 不支持，H5 取决于浏览器实现 | Boolean | false | true |
| autoHeight | 是否自动增加高度 | Boolean | false | true |
| ignoreCompositionEvent | 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件 | Boolean | true | false |
| fixed | 如果 textarea 在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true | Boolean | false | true |
| cursorSpacing | 指定光标与键盘的距离 | Number | 0 | - |
| cursor | 指定 focus 时的光标位置 | Number &#124; String | - | - |
| showConfirmBar | 是否显示键盘上方带有“完成”按钮的那一栏 | Boolean | true | false |
| selectionStart | 光标起始位置，自动聚焦时有效，需与 selectionEnd 搭配使用 | Number | -1 | - |
| selectionEnd | 光标结束位置，自动聚焦时有效，需与 selectionStart 搭配使用 | Number | -1 | - |
| adjustPosition | 键盘弹起时，是否自动上推页面 | Boolean | true | false |
| disableDefaultPadding | 是否去掉 iOS 下的默认内边距（仅微信小程序有效） | Boolean | false | true |
| holdKeyboard | focus 时，点击页面不会收起键盘（仅微信小程序有效） | Boolean | false | true |
| maxlength | 最大输入长度，设置为 -1 时不限制最大长度 | String &#124; Number | 140 | - |
| border | 边框类型：surround-四周边框，none-无边框，bottom-底部边框 | String | surround | bottom |
| placeholderClass | 指定 placeholder 的样式类，注意当页面或组件使用 scoped 时需在类名前写 /deep/ | String | textarea-placeholder | - |
| placeholderStyle | 指定 placeholder 的样式，字符串或对象形式，如 "color: red;" | String &#124; Object | color: #c0c4cc | - |
| formatter | 输入过滤或格式化函数 | Function | null | - |
| ignoreCompositionEvent | 是否忽略组件内对文本合成系统事件的处理 | Boolean | true | false |
<!-- | formatter | 输入过滤或格式化函数（如需兼容微信小程序，则只能通过 \`setFormatter\` 方法） | Function | null | - | -->


<!-- ## Methods
| 方法名 | 说明 |
|:-|:-|
| setFormatter | 为兼容微信小程序而暴露的内部方法，见上方说明 | -->


## Events

| 事件名 | 说明 | 回调参数 |
|:-|:-|:-|
| focus | 输入框聚焦时触发，\`event.detail = { value, height }\`，height 为键盘高度 | event |
| blur | 输入框失去焦点时触发，\`event.detail = {value, cursor}\` | event |
| linechange | 输入框行数变化时调用，\`event.detail = {height: 0, heightRpx: 0, lineCount: 0}\` | event |
| input | 当键盘输入时，触发 \`input\` 事件 | \`event.detail.value\` |
| confirm | 点击完成时， 触发 \`confirm\` 事件 | event |
| keyboardheightchange | 键盘高度发生变化的时候触发此事件 | event |

<style scoped>
h3[id=methods] + table thead tr th:nth-child(2) {
	width: 50%;
}
</style>

`;
