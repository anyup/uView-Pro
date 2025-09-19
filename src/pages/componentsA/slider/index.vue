<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToast"></u-toast>
                <u-slider
                    :step="step"
                    :height="height"
                    :block-width="blockWidth"
                    :active-color="activeColor"
                    :value="30"
                    :use-slot="useSlot"
                    v-model="value"
                    :min="min"
                    :max="max"
                    @end="end"
                    @moving="moving"
                >
                    <!-- #ifndef MP-WEIXIN || MP-TOUTIAO -->
                    <template v-if="useSlot" #default>
                        <view>
                            <view class="badge-button">
                                {{ value }}
                            </view>
                        </view>
                    </template>
                    <!-- #endif -->
                </u-slider>
                <view class="u-demo-result-line"> 滑块值：{{ value }} </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom">参数配置</view>
            <view class="u-config-item">
                <view class="u-item-title">自定义颜色</view>
                <u-subsection :list="['primary', 'warning', 'error', 'success']" @change="typeChange"></u-subsection>
            </view>
            <!-- #ifndef MP-WEIXIN -->
            <view class="u-config-item">
                <view class="u-item-title">自定义传入内容</view>
                <u-subsection current="1" :list="['是', '否']" @change="slotChange"></u-subsection>
            </view>
            <!-- #endif -->
            <view class="u-config-item">
                <view class="u-item-title">自定义尺寸</view>
                <u-subsection current="1" :list="['是', '否']" @change="sizeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">步进值</view>
                <u-subsection :list="['1', '10', '20']" @change="stepChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">最大最小值</view>
                <u-subsection :list="['0-100', '40-80']" @change="minMaxchange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { $u } from '@/uni_modules/uview-pro';
import { computed, ref } from 'vue';

const value = ref(30);
const useSlot = ref(false);
const step = ref<string | number>(1);
const activeColor = ref($u.color.primary);
const height = ref(6);
const blockWidth = ref(30);
const min = ref(0);
const max = ref(100);

function typeChange(index: number) {
    let type = ['primary', 'warning', 'error', 'success'];
    activeColor.value = $u.color[type[index]];
}

function sizeChange(index: number) {
    if (index === 0) {
        height.value = 4;
        blockWidth.value = 30;
    } else {
        height.value = 6;
        blockWidth.value = 20;
    }
}

function stepChange(index: number) {
    let arr = ['1', '10', '20'];
    step.value = arr[index];
}

function slotChange(index: number) {
    useSlot.value = !index;
}

function minMaxchange(index: number) {
    if (index === 0) {
        min.value = 0;
        max.value = 100;
    } else {
        min.value = 40;
        max.value = 80;
    }
}

function end() {
    // console.log('end');
}

function moving() {
    // console.log('moving');
}
</script>

<style scoped lang="scss">
.badge-button {
    padding: 4rpx 6rpx;
    background-color: $u-type-error;
    color: #fff;
    border-radius: 10rpx;
    font-size: 22rpx;
    line-height: 1;
}
</style>
