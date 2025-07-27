<template>
	<view class="u-tr">
		<slot></slot>
	</view>
</template>

<script setup lang="ts">
/**
 * tr 表格行标签
 * @description 表格组件一般用于展示大量结构化数据的场景（搭配<u-table>使用）
 * @tutorial https://www.uviewui.com/components/table.html
 * @example <u-tr></u-tr>
 */
defineOptions({ name: 'u-tr' })
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-tr {
	@include vue-flex;
}
</style>
