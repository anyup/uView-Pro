export const apis = `
# ActionSheet 操作菜单

本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。  
本组件功能类似于 uni 的\`uni.showActionSheet\`API，配置更加灵活，所有平台都表现一致。

## 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

## 基本使用

- 通过\`list\`设置需要显示的菜单，该值为一个数组，元素为对象，对象至少要提供\`text\`属性，另外可选的有\`fontSize\`(字体大小)，\`color\`(颜色)，\`disabled\`(是否禁用)，
  \`subText\`(描述信息)
- 通过\`v-model\`绑定一个值为布尔值的变量控制组件的弹出与收起，\`v-model\`的值是双向绑定的

\`\`\`html
<template>
  <view>
    <u-action-sheet :list="list" v-model="show"></u-action-sheet>
    <u-button @click="show = true">打开ActionSheet</u-button>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { ActionSheetItem } from 'uview-pro/types/global'

  // 定义列表数据
  const list = ref<ActionSheetItem[]>([
    {
      text: '点赞',
      color: 'blue',
      fontSize: 28,
      subText: '感谢您的点赞'
    },
    {
      text: '分享'
    },
    {
      text: '评论'
    }
  ])

  // 控制 ActionSheet 显示状态
  const show = ref(false)
</script>
\`\`\`

## 配置顶部的提示信息和底部取消按钮

- \`tips\`参数为一个对象类型，属性可以设置\`text\`，\`fontSize\`(字体大小)，\`color\`(颜色)，文本内容将会显示组件的上方，起提示作用。
- \`cancel-btn\`参数配置是否显示底部的取消按钮，默认显示

\`\`\`html
<template>
  <u-action-sheet
    :list="list"
    v-model="show"
    :tips="tips"
    :cancel-btn="true"
  ></u-action-sheet>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { ActionSheetTips, ActionSheetItem } from 'uview-pro/types/global'

  // 顶部提示信息
  const tips = ref<ActionSheetTips>({
    text: '在水一方',
    color: '#909399',
    fontSize: 24
  })

  // 按钮列表
  const list = ref<ActionSheetItem[]>([
    {
      text: '点赞',
      color: 'blue',
      fontSize: 28
    }
  ])

  // 控制显示状态
  const show = ref(true)
</script>
\`\`\`

## 如何知道点了第几项

\`click\`回调事件带有一个\`index\`值，这个索引值为传递的\`list\`数组的索引值，根据回调事件，能获得点击了
第几项和该项的内容

\`\`\`html
<template>
  <u-action-sheet
    :list="list"
    @click="handleClick"
    v-model="show"
  ></u-action-sheet>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { ActionSheetItem } from 'uview-pro/types/global'

  // 按钮列表
  const list = ref<ActionSheetItem[]>([
    {
      text: '点赞',
      color: 'blue',
      fontSize: 28
    },
    {
      text: '分享'
    },
    {
      text: '评论'
    }
  ])

  // 控制显示状态
  const show = ref(true)

  // 处理点击事件
  const handleClick = (index: number) => {
    console.log(\`点击了第\${index + 1}项，内容为：\${list.value[index].text}\`)
  }
</script>
\`\`\`

## 自定义 item 内容 <BadgeVersion text="0.3.5" />

从\`v0.3.5\`开始，\`u-action-sheet\`开始支持自定义\`item\`内容，通过定义 u-action-sheet-item 的\`slot="default"\`插槽，传入自定义的\`item\`内容，会覆盖默认的\`item\`内容。
该功能兼容使用\`list\`配置数据的方式。

如下示例：

\`\`\`vue
<template>
  <u-action-sheet
    :list="list"
    v-model="show"
    @click="handleClick"
  ></u-action-sheet>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { ActionSheetItem } from 'uview-pro/types/global'

const show = ref(true)

const list = ref<ActionSheetItem[]>([
  {
    text: '最是人间留不住'
  },
  {
    text: '朱颜辞镜花辞树',
    disabled: true
  },
  {
    text: '正是江南好风景',
    subText: '春江水暖鸭先知'
  },
  {
    text: '落花时节又逢君'
  }
])

function handleClick(index: number) {
  console.log('点击了第' + (index + 1) + '项')
}
</script>
\`\`\`

当你要使用\`u-action-sheet-item\`时，不需要传入\`list\`即可，如使用以下代码是同样的效果：

\`\`\`html
<template>
  <u-action-sheet v-model="show" @click="handleClick">
    <u-action-sheet-item
      v-for="(item, index) in list"
      :key="index"
      :text="item.text"
      :sub-text="item.subText"
      :disabled="item.disabled"
    />
  </u-action-sheet>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import type { ActionSheetItem } from 'uview-pro/types/global'

  const show = ref(true)

  const list = ref<ActionSheetItem[]>([
    {
      text: '最是人间留不住'
    },
    {
      text: '朱颜辞镜花辞树',
      disabled: true
    },
    {
      text: '正是江南好风景',
      subText: '春江水暖鸭先知'
    },
    {
      text: '落花时节又逢君'
    }
  ])

  function handleClick(index: number) {
    console.log('点击了第' + (index + 1) + '项')
  }
</script>
\`\`\`

使用\`slot\`自定义内容，则需要使用\`u-action-sheet-item\`组件，如下示例：

\`\`\`html
<template>
  <u-action-sheet v-model="show">
    <u-action-sheet-item>
      <u-text
        type="success"
        text="我是自定义的（微信能力）"
        size="32"
        openType="openSetting"
        @click="handleClick"
      ></u-text>
    </u-action-sheet-item>
  </u-action-sheet>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import type { ActionSheetItem } from 'uview-pro/types/global'

  const show = ref(true)

  function handleClick(index: number) {
    console.log('点击了第' + (index + 1) + '项')
    show.value = false
  }
</script>
\`\`\`

## API

## ActionSheet Props

注意：props 中没有控制组件弹出与收起的参数，因为这是通过 v-model 绑定变量实现的，见上方说明。
|参数|说明|类型|默认值|可选值|
|-|-|-|-|-|
|list|按钮的文字数组，见上方文档示例|Array\<Object\>|[]|-|
|tips|顶部的提示文字，见上方文档示例|Object|-|-|
|cancel-btn|是否显示底部的取消按钮|Boolean|true|false|
|border-radius|弹出部分顶部左右的圆角值，单位 rpx|Number \ String|0|-|
|mask-close-able|点击遮罩是否可以关闭|Boolean|true|false|
|safe-area-inset-bottom|是否开启[底部安全区适配](/zh/components/safeAreaInset.html#关于uview某些组件safe-area-inset参数的说明)|Boolean|false|true|
|z-index|\`z-index\`值|Number \ String|1075|-|
|cancel-text|取消按钮的提示文字|String|取消|-|
|async-close <BadgeVersion text="0.3.5" />|是否异步关闭|Boolean|false|true|

## ActionSheet Event

|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
| click | 点击ActionSheet列表项时触发 | index: 点击了第几个，从0开始 | - |
| close | 点击取消按钮时触发 | - | - |

## ActionSheet-item Props <BadgeVersion text="0.3.5" />

注意：props 中没有控制组件弹出与收起的参数，因为这是通过 v-model 绑定变量实现的，见上方说明。

|参数|说明|类型|默认值|可选值|
|:-|:-|:-|:-|:-|
|text|标题|String|''|-|
|subText|描述|String|''|-|
|padding|边距|Number \ String|'34rpx 0'|-|
|color|字体颜色|String|mainColor|-|
|fontSize|字体大小|Number \ String|'32rpx'|-|
|disabled|是否禁用|Boolean|false|true|
|asyncClose|是否异步关闭|Boolean|false|true|

## ActionSheet-item Slot <BadgeVersion text="0.3.5" />

|名称|说明|
|:-|:-|
|default|自定义item内容|

## ActionSheet-item Event <BadgeVersion text="0.3.5" />

|事件名|说明|回调参数|版本|
|:-|:-|:-|:-|
| click | 点击ActionSheet列表项时触发 | index: 点击了第几个，从0开始 | - |
| async-close | 是否异步关闭 | Boolean  | false | true |


`;
