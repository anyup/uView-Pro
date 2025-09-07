<template>
    <view class="u-demo">
        <view class="u-demo-wrap" style="background-color: #ffffff">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-calendar
                    v-model="show"
                    ref="calendar"
                    @change="change"
                    :mode="mode"
                    :start-text="startText"
                    :end-text="endText"
                    :range-color="rangeColor"
                    :range-bg-color="rangeBgColor"
                    :active-bg-color="activeBgColor"
                    :btn-type="btnType"
                >
                </u-calendar>
                <view class="u-demo-result-line">
                    {{ result }}
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">状态</view>
                <u-subsection :current="showBtnStatus" :list="['显示', '隐藏']" @change="showChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">模式</view>
                <u-subsection current="1" :list="['单个日期', '日期范围']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义样式</view>
                <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { CalendarMode, ThemeType } from '@/uni_modules/uview-pro/types/global';

const show = ref(false);
const mode = ref<CalendarMode>('range');
const result = ref('请选择日期');
const startText = ref('开始');
const endText = ref('结束');
const rangeColor = ref('#2979ff');
const rangeBgColor = ref('rgba(41,121,255,0.13)');
const activeBgColor = ref('#2979ff');
const btnType = ref<ThemeType>('primary');

const showBtnStatus = computed(() => {
    return show.value ? 0 : 1;
});

function showChange(index: number) {
    show.value = !index;
}

function modeChange(index: number) {
    mode.value = index === 0 ? 'date' : 'range';
    show.value = true;
}

function styleChange(index: number) {
    if (index === 0) {
        startText.value = '住店';
        endText.value = '离店';
        activeBgColor.value = '#19be6b';
        rangeColor.value = '#19be6b';
        rangeBgColor.value = 'rgba(25,190,107, 0.13)';
        btnType.value = 'success';
    } else {
        startText.value = '开始';
        endText.value = '结束';
        activeBgColor.value = '#2979ff';
    }
}

function change(e: any) {
    if (mode.value == 'range') {
        result.value = e.startDate + ' - ' + e.endDate;
    } else {
        result.value = e.result;
    }
}
</script>
