<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">u-loading-popup 原生用法</view>
            <view class="u-demo-area">
                <button type="primary" @click="openLoading">显示 Loading Popup</button>
                <!-- v-model:modelValue 控制弹窗显示，支持所有原生 props -->
                <u-loading-popup
                    ref="uLoadingPopupRef"
                    v-model="show"
                    :text="text"
                    :cancelTime="cancelTime"
                    :duration="duration"
                    :direction="direction"
                    :color="color"
                    :size="size"
                    @cancel="onCancel"
                />
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom">参数配置</view>
            <view class="u-config-item">
                <view class="u-item-title">方向</view>
                <u-subsection :list="['vertical', 'horizontal']" @change="directionChange" />
            </view>
            <view class="u-config-item">
                <view class="u-item-title">颜色</view>
                <u-subsection :list="['#c7c7c7', 'primary', 'error', 'warning', 'success']" @change="colorChange" />
            </view>
            <view class="u-config-item">
                <view class="u-item-title">尺寸(单位rpx)</view>
                <u-subsection current="1" :list="['32', '48', '64']" @change="sizeChange" />
            </view>
            <view class="u-config-item">
                <view class="u-item-title">文案</view>
                <input class="u-input" v-model="text" placeholder="请输入 loading 文案" />
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自动关闭(ms)-0为不自动关闭</view>
                <input class="u-input" type="number" v-model.number="duration" placeholder="0=不自动关闭" />
            </view>
            <view class="u-config-item">
                <view class="u-item-title">遮罩可关闭延时(ms)</view>
                <input class="u-input" type="number" v-model.number="cancelTime" placeholder="默认10000" />
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

// 是否显示 loading popup
const show = ref(false);
// loading 文案
const text = ref('加载中...');
// 遮罩可关闭延时（ms）
const cancelTime = ref(2000);
// 自动关闭时长（ms，0为不自动关闭）
const duration = ref(2000);
// loading 方向
const direction = ref<'vertical' | 'horizontal'>('vertical');
// loading 颜色
const color = ref<string>('#c7c7c7');
// loading 尺寸
const size = ref<string | number>(48);

const uLoadingPopupRef = ref();

/** 显示 loading popup */
function openLoading() {
    show.value = true;
    // uLoadingPopupRef.value.show();
    // setTimeout(() => {
    //     show.value = false;
    //     // uLoadingPopupRef.value.hide();
    // }, 1000);
}

/** 切换方向 */
function directionChange(index: number) {
    direction.value = index === 0 ? 'vertical' : 'horizontal';
}

/** 切换颜色 */
function colorChange(index: number) {
    if (index === 0) {
        color.value = '#c7c7c7';
    } else {
        const colorMap: Record<number, keyof typeof $u.color> = {
            1: 'primary',
            2: 'error',
            3: 'warning',
            4: 'success'
        };
        color.value = $u.color[colorMap[index]];
    }
}

/** 切换尺寸 */
function sizeChange(index: number) {
    const sizeMap: Record<number, number> = {
        0: 40,
        1: 50,
        2: 60
    };
    size.value = sizeMap[index];
}

/** 遮罩点击关闭回调 */
function onCancel() {
    show.value = false;
    // 这里可做自定义提示
}
</script>

<style scoped lang="scss">
.u-demo-area {
    margin-bottom: 24rpx;
}

.u-input {
    width: 300rpx;
    border: 1px solid #eee;
    border-radius: 8rpx;
    padding: 8rpx 16rpx;
    font-size: 28rpx;
    margin-top: 8rpx;
}
</style>
