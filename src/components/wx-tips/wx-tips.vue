<template>
    <view>
        <u-alert-tips
            :show="show"
            :description="description"
            :close-able="true"
            :show-icon="true"
            title="提示"
            type="warning"
            @close="show = false"
        ></u-alert-tips>
    </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const show = ref(true);

const props = defineProps({
    type: {
        type: Number,
        default: -1
    }
});

const description = computed(() => {
    switch (props.type) {
        case 0:
            return '该页面仅为表单校验演示功能，所有用户信息不存储！';
        case 1:
            return '该页面仅为布局演示功能，非电商类小程序，不具备实际功能！';
        default:
            return '该页面仅为功能演示，所有用户信息不存储！非电商类小程序，不具备实际功能！';
    }
});
</script>
