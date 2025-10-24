<template>
    <view class="u-demo">
        <view class="u-demo-wrap" style="background-color: #ffffff">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-calendar
                    v-model="show"
                    ref="calendar"
                    @change="change"
                    :is-page="isPage"
                    :mode="mode"
                    :show-lunar="showLunar"
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
                <view v-if="showLunar && lunarResult">
                    {{ lunarResult }}
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">显示方式</view>
                <u-subsection :current="showMode" :list="['弹窗', '页面']" @change="showModeChange"></u-subsection>
            </view>
            <view v-if="!isPage" class="u-config-item">
                <view class="u-item-title">状态</view>
                <u-subsection :current="showBtnStatus" :list="['显示', '隐藏']" @change="showChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">模式</view>
                <u-subsection current="0" :list="['单个日期', '日期范围']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">农历</view>
                <u-subsection current="1" :list="['显示', '隐藏']" @change="lunarChange"></u-subsection>
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
import type {
    CalendarChangeDate,
    CalendarChangeRange,
    CalendarMode,
    ThemeType
} from '@/uni_modules/uview-pro/types/global';
import { $u } from '@/uni_modules/uview-pro';

const isPage = ref(false);
const show = ref(false);
const showLunar = ref(false);
const mode = ref<CalendarMode>('date');
const result = ref('请选择日期');
const lunarResult = ref('');
const startText = ref('开始');
const endText = ref('结束');
const rangeColor = ref($u.color.primary);
const rangeBgColor = ref('rgba(41,121,255,0.13)');
const activeBgColor = ref($u.color.primary);
const btnType = ref<ThemeType>('primary');

const showMode = computed(() => {
    return isPage.value ? 1 : 0;
});

const showBtnStatus = computed(() => {
    return show.value ? 0 : 1;
});

const showModeChange = (index: number) => {
    isPage.value = index === 1;
};

function showChange(index: number) {
    show.value = !index;
}

function modeChange(index: number) {
    mode.value = index === 0 ? 'date' : 'range';
    show.value = true;
}

function lunarChange(index: number) {
    showLunar.value = index === 0;
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
        activeBgColor.value = $u.color.primary;
    }
    show.value = true;
}

function change(e: CalendarChangeRange | CalendarChangeDate) {
    if (mode.value === 'range') {
        const range = e as CalendarChangeRange;
        result.value = range.startDate + ' - ' + range.endDate;
        if (showLunar.value && range.startLunar && range.endLunar) {
            lunarResult.value =
                `${range.startLunar.monthCn ?? ''}${range.startLunar.dayCn ?? ''}` +
                ' - ' +
                `${range.endLunar.monthCn ?? ''}${range.endLunar.dayCn ?? ''}`;
        } else {
            lunarResult.value = '';
        }
    } else {
        const single = e as CalendarChangeDate;
        result.value = single.result;
        if (showLunar.value && single.lunar) {
            lunarResult.value = `${single.lunar.monthCn ?? ''}${single.lunar.dayCn ?? ''}`;
        } else {
            lunarResult.value = '';
        }
    }
}
</script>
