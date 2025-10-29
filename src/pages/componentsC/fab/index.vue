<template>
    <view class="u-demo">
        <u-fab
            :type="type"
            :disabled="disabled"
            :draggable="draggable"
            :direction="direction"
            :gap="gap"
            v-if="trigger"
        >
            <template #trigger>
                <u-button type="primary" @click="btnClick">触发器</u-button>
            </template>
        </u-fab>
        <u-fab :type="type" :disabled="disabled" :draggable="draggable" :direction="direction" :gap="gap" v-else>
        </u-fab>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">主题选择</view>
                <u-subsection
                    :list="['primary', 'info', 'error', 'warning', 'success']"
                    @change="typeChange"
                ></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">禁用</view>
                <u-subsection current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">可以拖动</view>
                <u-subsection current="1" :list="['是', '否']" @change="draggableChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">弹出方向</view>
                <u-subsection current="2" :list="['上', '下', '左', '右']" @change="directionChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">间距</view>
                <u-number-box v-model="gap" :step="2" :min="0" :max="40"></u-number-box>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义触发器</view>
                <u-switch v-model="trigger"></u-switch>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 主题选择
const type = ref<'primary' | 'info' | 'error' | 'warning' | 'success'>('primary');
const disabled = ref(false);
const draggable = ref(false);
const direction = ref('left');
const gap = ref(16);
const trigger = ref(false);

// 主题选择切换
function typeChange(e: number) {
    switch (e) {
        case 0:
            type.value = 'primary';
            break;
        case 1:
            type.value = 'info';
            break;
        case 2:
            type.value = 'error';
            break;
        case 3:
            type.value = 'warning';
            break;
        case 4:
            type.value = 'success';
            break;
    }
}

// 禁用状态切换
function disabledChange(index: number) {
    disabled.value = index === 0 ? true : false;
}

// 可拖动切换
function draggableChange(index: number) {
    draggable.value = index === 0 ? true : false;
}

// 弹出方向切换
function directionChange(index: number) {
    switch (index) {
        case 0:
            direction.value = 'top';
            break;
        case 1:
            direction.value = 'bottom';
            break;
        case 2:
            direction.value = 'left';
            break;
        case 3:
            direction.value = 'right';
            break;
    }
}

// 按钮点击事件
const btnClick = () => {
    uni.showToast({
        title: '按钮被点击',
        icon: 'none'
    });
};
</script>
