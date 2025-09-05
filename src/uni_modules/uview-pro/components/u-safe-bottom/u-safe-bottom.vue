<template>
    <view class="u-safe-bottom" :style="style" :class="[!isNVue && 'safe-area-inset-bottom']"></view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, withDefaults, type CSSProperties } from 'vue';
import { sys } from '../../libs/function/sys';
import addUnit from '../../libs/function/addUnit';
import deepMerge from '../../libs/function/deepMerge';
import { mergeStyles } from '../../libs/function/styleUtils';

defineOptions({ name: 'u-safe-bottom' });

/**
 * SafeBottom 底部安全区
 * @description 这个适配，主要是针对IPhone X等一些底部带指示条的机型，指示条的操作区域与页面底部存在重合，容易导致用户误操作，因此我们需要针对这些机型进行底部安全区适配。
 * @property {String | Object} customStyle 自定义样式
 * @example <u-safe-bottom></u-safe-bottom>
 */
const props = withDefaults(
    defineProps<{
        customStyle?: string | CSSProperties;
    }>(),
    {
        customStyle: () => ({})
    }
);

const isNVue = ref(false);

const style = computed(() => {
    let r: CSSProperties = {};
    // #ifdef APP-NVUE || MP-TOUTIAO
    // nvue下，高度使用js计算填充
    r.height = addUnit(sys().safeAreaInsets.bottom, 'px');
    // #endif
    return deepMerge(r, mergeStyles(props.customStyle));
});

onMounted(() => {
    // #ifdef APP-NVUE
    // 标识为是否nvue
    isNVue.value = true;
    // #endif
});
</script>
