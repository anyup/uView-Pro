<template>
    <view :style="style" :class="['u-status-bar', { 'safe-area-inset-top': noBar }]">
        <slot />
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, withDefaults, type CSSProperties } from 'vue';
import { sys } from '../../libs/function/sys';
import addUnit from '../../libs/function/addUnit';
import deepMerge from '../../libs/function/deepMerge';
import { mergeStyles } from '../../libs/function/styleUtils';

defineOptions({
    name: 'u-status-bar'
});

/**
 * StatusBar 状态栏
 * @property {String | Object} customStyle 自定义样式
 * @property {String} background 背景颜色
 * @example <u-status-bar></u-status-bar>
 */
const props = withDefaults(
    defineProps<{
        background?: string;
        customStyle?: string | CSSProperties;
    }>(),
    {
        // 背景颜色
        background: 'transparent',
        customStyle: () => ({})
    }
);

const noBar = ref(false);

const style = computed(() => {
    let r: CSSProperties = {
        background: props.background
    };
    const sh = sys().statusBarHeight;
    if (sh === 0) {
        noBar.value = true;
    } else {
        r.height = addUnit(sh, 'px');
    }
    return deepMerge(r, mergeStyles(props.customStyle));
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
