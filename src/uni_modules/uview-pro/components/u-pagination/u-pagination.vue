<template>
    <view class="u-pagination" :style="$u.toStyle(customStyle)" :class="customClass">
        <u-button
            custom-class="custom-class"
            shape="circle"
            type="info"
            size="medium"
            :throttle-time="0"
            :disabled="current <= 1"
            @click="handleChange('prev')"
        >
            <u-icon v-if="showIcon" :name="prevIcon"></u-icon>
            <text v-else>{{ prevText }}</text>
        </u-button>
        <view class="u-pagination-text">
            <slot>
                <u-text type="primary" :text="current"></u-text>
                <text> / </text>
                <text>{{ totalPages }}</text>
            </slot>
        </view>
        <u-button
            custom-class="custom-class"
            shape="circle"
            type="info"
            size="medium"
            :throttle-time="0"
            :disabled="current >= totalPages"
            @click="handleChange('next')"
        >
            <u-icon v-if="showIcon" :name="nextIcon"></u-icon>
            <text v-else>{{ nextText }}</text>
        </u-button>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-pagination',
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
import { computed } from 'vue';
import { type PaginationEmits, PaginationProps } from './types';
import type { PaginationDirection } from '../../types/global';
import { $u } from '../../';

const props = defineProps(PaginationProps);
const emit = defineEmits<PaginationEmits>();

const current = defineModel({ type: Number, default: 1 });

// 自动计算总页数
const totalPages = computed(() => {
    const size = props.pageSize || 10;
    return Math.ceil((props.total || 0) / size);
});

// 切换分页
function handleChange(type: PaginationDirection) {
    // 先计算新值，确保获取到的是更新后的值
    const newCurrent = type === 'prev' ? current.value - 1 : current.value + 1;

    // 更新 current 值
    current.value = newCurrent;

    // current为当前页，type值为：next/prev，表示点击的是上一页还是下一页
    // 使用计算后的新值，而不是 current.value，避免异步更新导致的值不同步问题
    emit('change', { type, current: newCurrent });
}
</script>

<style scoped lang="scss">
.u-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;

    :deep(.custom-class) {
        margin: 0;
        padding: 0 30rpx;
        min-width: 120rpx;
    }
}
</style>
