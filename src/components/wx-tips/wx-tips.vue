<template>
    <view>
        <!-- #ifdef MP -->
        <u-sticky>
            <u-alert-tips :show="show" title="提示" :description="description" type="error" :close-able="true" @close="show = false"></u-alert-tips>
        </u-sticky>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const show = ref(true);

const props = defineProps({
    type: {
        type: Number,
        default: 0
    }
});

const description = computed(() => {
    switch (props.type) {
        case 1:
            return '该页面仅为布局演示功能，非电商类小程序，不具备实际功能！';
        default:
            return '该页面仅为表单校验演示功能，所有用户信息不存储！';
    }
});
</script>
