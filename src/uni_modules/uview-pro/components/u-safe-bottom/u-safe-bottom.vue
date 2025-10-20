<template>
    <view
        class="u-safe-bottom"
        :style="$u.toStyle(style, customStyle)"
        :class="[!isNVue && 'safe-area-inset-bottom', customClass]"
    ></view>
</template>

<script lang="ts">
export default {
    name: 'u-safe-bottom',
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
import { SafeBottomProps } from './props';
import { $u } from '../../';

/**
 * SafeBottom 底部安全区
 * @description 这个适配，主要是针对IPhone X等一些底部带指示条的机型，指示条的操作区域与页面底部存在重合，容易导致用户误操作，因此我们需要针对这些机型进行底部安全区适配。
 * @property {String | Object} customStyle 自定义样式
 * @example <u-safe-bottom></u-safe-bottom>
 */
const props = defineProps(SafeBottomProps);

const isNVue = ref(false);

const style = computed(() => {
    let result: CSSProperties = {};
    // #ifdef APP-NVUE || MP-TOUTIAO
    // nvue下，高度使用js计算填充
    result.height = $u.addUnit($u.sys().safeAreaInsets.bottom, 'px');
    // #endif
    return result;
});

onMounted(() => {
    // #ifdef APP-NVUE
    // 标识为是否nvue
    isNVue.value = true;
    // #endif
});
</script>
