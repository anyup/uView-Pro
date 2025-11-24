export const apis = `
# Steps 步骤条

该组件一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景。

## 平台差异说明

| App | H5 | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| √ | √ | √ | √ | √ | √ | √ |

## 基本使用

- 通过\`list\`参数传入一个数组，标识步骤的总数
- 通过\`current\`参数标识目前处于第几步，从0开始

\`\`\`html
<template>
	<view>
		<u-steps :list="numList" :current="1"></u-steps>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义步骤项接口
interface StepItem {
	name: string
}

// 定义响应式数据
const numList = ref<StepItem[]>([
	{
		name: '下单'
	}, 
	{
		name: '出库'
	}, 
	{
		name: '运输'
	}, 
	{
		name: '签收'
	}
])
</script>
\`\`\`

## 设置步骤条的主题

- \`type\`值可选的有\`primary\`(默认)、\`success\`、\`info\`、\`warning\`、\`error\`
- \`type\`值和\`active-color\`(默认为空)为互斥关系，如果设置了\`active-color\`，会优先起作用

\`\`\`html
<u-steps :list="numList" active-color="#fa3534"></u-steps>
\`\`\`

## 设置步骤条的模式

\`mode\`可以设置为\`dot\`(圆点，默认值)或者\`number\`(数字)，二者有不同形式，见示例

\`\`\`html
<u-steps :list="numList" mode="number"></u-steps>
\`\`\`

## Step 组合 <BadgeVersion text="0.3.6" />

\`u-step\` 为新增组件，可以完整替换 \`u-steps\` list 模式，同时也用于自定义步骤条的样式，将来可能会弃用 \`list\` 模式，推荐使用 \`u-steps\` 和 \`u-step\` 组合的方式：

\`\`\`html
<template>
	<u-steps :direction="direction" :current="current" :mode="mode" :icon="icon">
		<u-step v-for="(item, index) in list" :key="index" :name="item.name" :desc="item.desc" />
	</u-steps>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { StepDirection, StepMode } from '@/uni_modules/uview-pro/types/global';

const list = ref([
	{
		name: '下单',
		desc: '10:30'
	},
	{
		name: '出库',
		desc: '11:00'
	},
	{
		name: '运输',
		desc: '14:00'
	},
	{
		name: '签收',
		desc: '18:30'
	}
]);
const current = ref(0);
const icon = ref('checkmark');
const mode = ref<StepMode>('number');
const direction = ref<StepDirection>('row');
</script>
\`\`\`

## 自定义slot <BadgeVersion text="0.3.6" />

\`\`\`html
<template>
	<u-steps :direction="direction" :current="current" :mode="mode" :icon="icon">
		<u-step name="预约">
			<template #desc>
				<text v-show="current < 0">自定义描述</text>
				<text v-show="current >= 0" class="custom-desc">自定义描述</text>
			</template>
		</u-step>
		<u-step desc="10:30">
			<template #name>
				<text v-show="current < 1">名额确认</text>
				<text v-show="current >= 1" class="custom-name">名额不足</text>
			</template>
		</u-step>
		<u-step desc="11:00">
			<template #name>
				<text v-show="current < 2">预约成功</text>
				<text v-show="current >= 2" class="custom-error-name">预约失败</text>
			</template>
			<template #icon>
				<u-icon size="32" color="red" name="close"></u-icon>
			</template>
		</u-step>
	</u-steps>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { StepDirection, StepMode } from '@/uni_modules/uview-pro/types/global';

const current = ref(0);
const icon = ref('checkmark');
const mode = ref<StepMode>('number');
const direction = ref<StepDirection>('row');
</script>
\`\`\`

## API

## Steps Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| mode | 设置模式 | \`String\` | \`dot\` | \`number\` |
| list | 步骤数据数组（具体见示例） | \`Array\` | \`[]\` | - |
| current | 设置当前处于第几步 | \`Number \| String\` | \`0\` | - |
| direction | \`row\`-横向，\`column\`-竖向 | \`String\` | \`row\` | \`column\` |
| active-color | 已完成步骤的激活颜色，如设置，\`type\`值会失效 | \`String\` | - | - |
| un-active-color | 未激活的颜色，用于表示未完成步骤的颜色 | \`String\` | \`#606266\` | - |
| icon | \`mode = number\`时的自定义图标 | \`String\` | \`checkmark\` | - |

## Step Props <BadgeVersion text="0.3.6" />

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| mode | 设置模式 | \`String\` | \`dot\` | \`number\` |
| direction | \`row\`-横向，\`column\`-竖向 | \`String\` | \`row\` | \`column\` |
| active-color | 已完成步骤的激活颜色，如设置，\`type\`值会失效 | \`String\` | - | - |
| un-active-color | 未激活的颜色，用于表示未完成步骤的颜色 | \`String\` | \`#606266\` | - |
| icon | \`mode = number\`时的自定义图标 | \`String\` | \`checkmark\` | - |
| name | 标题 | \`String\` | - | - |
| desc | 描述 | \`String\` | - | - |

## Step Slots <BadgeVersion text="0.3.6" />

| 名称 | 说明 |
| --- | --- |
| \`icon\` | 自定义图标内容 |
| \`name\` | 自定义标题内容 |
| \`desc\` | 自定义描述内容 |

`;
