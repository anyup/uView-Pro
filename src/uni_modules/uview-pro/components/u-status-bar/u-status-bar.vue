<template>
    <view
        :style="$u.toStyle(style, customStyle)"
        :class="['u-status-bar', { 'safe-area-inset-top': noBar }, customClass]"
    >
        <slot />
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-status-bar',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted, type CSSProperties } from 'vue';
import { StatusBarProps } from './props';
import { $u } from '../../';

/**
 * StatusBar 状态栏
 * @property {String | Object} customStyle 自定义样式
 * @property {String} background 背景颜色
 * @example <u-status-bar></u-status-bar>
 */
const props = defineProps(StatusBarProps);
const noBar = ref(false);

const style = computed(() => {
    let result: CSSProperties = {
        background: props.background
    };
    const statusBarHeight = $u.sys().statusBarHeight;
    if (statusBarHeight === 0) {
        noBar.value = true;
    } else {
        result.height = $u.addUnit(statusBarHeight, 'px');
    }
    return result;
});

onMounted(() => {
    // #ifdef H5
    noBar.value = true;
    // #endif
});
</script>

<style scoped>
.u-status-bar {
    /* #ifndef APP-NVUE */
    /* nvue会默认100%，如果nvue下，显式写100%的话，会导致宽度不为100%而异常 */
    width: 100%;
    /* #endif */
}
</style>
