<template>
    <u-popup
        :maskCloseAble="maskCloseAble"
        mode="bottom"
        :popup="false"
        v-model="popupValue"
        length="auto"
        :safeAreaInsetBottom="safeAreaInsetBottom"
        @close="close"
        :z-index="uZIndex"
        :border-radius="borderRadius"
        :closeable="closeable"
    >
        <view class="u-calendar">
            <view class="u-calendar__header">
                <view class="u-calendar__header__text" v-if="!slots.tooltip">
                    {{ toolTip }}
                </view>
                <slot v-else name="tooltip" />
            </view>
            <view class="u-calendar__action u-flex u-row-center">
                <view class="u-calendar__action__icon">
                    <u-icon v-if="changeYear" name="arrow-left-double" :color="yearArrowColor" @click="changeYearHandler(0)"></u-icon>
                </view>
                <view class="u-calendar__action__icon">
                    <u-icon v-if="changeMonth" name="arrow-left" :color="monthArrowColor" @click="changeMonthHandler(0)"></u-icon>
                </view>
                <view class="u-calendar__action__text">{{ showTitle }}</view>
                <view class="u-calendar__action__icon">
                    <u-icon v-if="changeMonth" name="arrow-right" :color="monthArrowColor" @click="changeMonthHandler(1)"></u-icon>
                </view>
                <view class="u-calendar__action__icon">
                    <u-icon v-if="changeYear" name="arrow-right-double" :color="yearArrowColor" @click="changeYearHandler(1)"></u-icon>
                </view>
            </view>
            <view class="u-calendar__week-day">
                <view class="u-calendar__week-day__text" v-for="(item, index) in weekDayZh" :key="index">{{ item }}</view>
            </view>
            <view class="u-calendar__content">
                <!-- 前置空白部分 -->
                <block v-for="(item, index) in weekdayArr" :key="index">
                    <view class="u-calendar__content__item"></view>
                </block>
                <view
                    class="u-calendar__content__item"
                    :class="{
                        'u-hover-class': openDisAbled(year, month, index + 1),
                        'u-calendar__content--start-date': (mode == 'range' && startDate == `${year}-${month}-${index + 1}`) || mode == 'date',
                        'u-calendar__content--end-date': (mode == 'range' && endDate == `${year}-${month}-${index + 1}`) || mode == 'date'
                    }"
                    :style="{ backgroundColor: getColor(index, 1) }"
                    v-for="(item, index) in daysArr"
                    :key="index"
                    @tap="dateClick(index)"
                >
                    <view class="u-calendar__content__item__inner" :style="{ color: getColor(index, 2) }">
                        <view>{{ index + 1 }}</view>
                    </view>
                    <view
                        class="u-calendar__content__item__tips"
                        :style="{ color: activeColor }"
                        v-if="mode == 'range' && startDate == `${year}-${month}-${index + 1}` && startDate != endDate"
                        >{{ startText }}</view
                    >
                    <view class="u-calendar__content__item__tips" :style="{ color: activeColor }" v-if="mode == 'range' && endDate == `${year}-${month}-${index + 1}`">{{
                        endText
                    }}</view>
                </view>
                <view class="u-calendar__content__bg-month">{{ month }}</view>
            </view>
            <view class="u-calendar__bottom">
                <view class="u-calendar__bottom__choose">
                    <text>{{ mode == 'date' ? activeDate : startDate }}</text>
                    <text v-if="endDate">至{{ endDate }}</text>
                </view>
                <view class="u-calendar__bottom__btn">
                    <u-button :type="btnType" shape="circle" size="default" @click="btnFix(false)">确定</u-button>
                </view>
            </view>
        </view>
    </u-popup>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, useSlots } from 'vue';
import { $u } from '../..';
import { CalendarProps } from './types';

defineOptions({
    name: 'u-calendar'
});
/**
 * calendar 日历
 * @description 此组件用于单个选择日期，范围选择日期等，日历被包裹在底部弹起的容器中。
 * @tutorial https://uviewpro.cn/zh/components/calendar.html
 * @property {String} mode 选择日期的模式，date-为单个日期，range-为选择日期范围
 * @property {Boolean} v-model 布尔值变量，用于控制日历的弹出与收起
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配(默认false)
 * @property {Boolean} change-year 是否显示顶部的切换年份方向的按钮(默认true)
 * @property {Boolean} change-month 是否显示顶部的切换月份方向的按钮(默认true)
 * @property {String Number} max-year 可切换的最大年份(默认2050)
 * @property {String Number} min-year 可切换的最小年份(默认1950)
 * @property {String Number} min-date 最小可选日期(默认1950-01-01)
 * @property {String Number} max-date 最大可选日期(默认当前日期)
 * @property {String Number} 弹窗顶部左右两边的圆角值，单位rpx(默认20)
 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭日历(默认true)
 * @property {String} month-arrow-color 月份切换按钮箭头颜色(默认#606266)
 * @property {String} year-arrow-color 年份切换按钮箭头颜色(默认#909399)
 * @property {String} color 日期字体的默认颜色(默认#303133)
 * @property {String} active-bg-color 起始/结束日期按钮的背景色(默认#2979ff)
 * @property {String Number} z-index 弹出时的z-index值(默认10075)
 * @property {String} active-color 起始/结束日期按钮的字体颜色(默认#ffffff)
 * @property {String} range-bg-color 起始/结束日期之间的区域的背景颜色(默认rgba(41,121,255,0.13))
 * @property {String} range-color 选择范围内字体颜色(默认#2979ff)
 * @property {String} start-text 起始日期底部的提示文字(默认 '开始')
 * @property {String} end-text 结束日期底部的提示文字(默认 '结束')
 * @property {String} btn-type 底部确定按钮的主题(默认 'primary')
 * @property {String} toolTip 顶部提示文字，如设置名为tooltip的slot，此参数将失效(默认 '选择日期')
 * @property {Boolean} closeable 是否显示右上角的关闭图标(默认true)
 * @example <u-calendar v-model="show" :mode="mode"></u-calendar>
 */

const props = defineProps(CalendarProps);
const emit = defineEmits(['update:modelValue', 'input', 'change']);
const slots = useSlots();

// 组件内部状态
// 星期几,值为1-7
const weekday = ref(1);
const weekdayArr = ref<number[]>([]);
const days = ref(0);
const daysArr = ref<number[]>([]);
const showTitle = ref('');
const year = ref(2020);
const month = ref(0);
// 当前月有多少天
const day = ref(0);
const startYear = ref(0);
const startMonth = ref(0);
const startDay = ref(0);
const endYear = ref(0);
const endMonth = ref(0);
const endDay = ref(0);
const today = ref('');
const activeDate = ref('');
const startDate = ref('');
const endDate = ref('');
const isStart = ref(true);
const min = ref<{ year: number; month: number; day: number } | null>(null);
const max = ref<{ year: number; month: number; day: number } | null>(null);
const weekDayZh = ref(['日', '一', '二', '三', '四', '五', '六']);

const dataChange = computed(() => `${props.mode}-${props.minDate}-${props.maxDate}`);
// 如果用户有传递z-index值，优先使用
const uZIndex = computed(() => (props.zIndex ? props.zIndex : $u.zIndex.popup));
const popupValue = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
});

watch(dataChange, () => {
    init();
});

onMounted(() => {
    init();
});

/**
 * 获取日期颜色
 * @param index
 * @param type 1 背景色 2 字体色
 */
function getColor(index: number, type: number) {
    let color = type == 1 ? '' : props.color;
    let dayNum = index + 1;
    let date = `${year.value}-${month.value}-${dayNum}`;
    let timestamp = new Date(date.replace(/\-/g, '/')).getTime();
    let start = startDate.value.replace(/\-/g, '/');
    let end = endDate.value.replace(/\-/g, '/');
    if ((props.isActiveCurrent && activeDate.value == date) || startDate.value == date || endDate.value == date) {
        color = type == 1 ? props.activeBgColor : props.activeColor;
    } else if (endDate.value && timestamp > new Date(start).getTime() && timestamp < new Date(end).getTime()) {
        color = type == 1 ? props.rangeBgColor : props.rangeColor;
    }
    return color;
}

/**
 * 初始化日历数据
 */
function init() {
    let now = new Date();
    let minDateObj = new Date(String(props.minDate));
    let maxDateObj = new Date(String(props.maxDate || ''));
    if (isNaN(maxDateObj.getTime())) maxDateObj = new Date();
    if (now < minDateObj) now = minDateObj;
    if (now > maxDateObj) now = maxDateObj;
    year.value = now.getFullYear();
    month.value = now.getMonth() + 1;
    day.value = now.getDate();
    today.value = `${now.getFullYear()}-${month.value}-${day.value}`;
    activeDate.value = today.value;
    min.value = initDate(String(props.minDate));
    max.value = initDate(String(props.maxDate) || today.value);
    startDate.value = '';
    startYear.value = 0;
    startMonth.value = 0;
    startDay.value = 0;
    endYear.value = 0;
    endMonth.value = 0;
    endDay.value = 0;
    endDate.value = '';
    isStart.value = true;
    changeData();
}

/**
 * 日期字符串转对象
 */
function initDate(date: string) {
    let fdate = date.split('-');
    return {
        year: Number(fdate[0] || 1920),
        month: Number(fdate[1] || 1),
        day: Number(fdate[2] || 1)
    };
}

/**
 * 判断日期是否可选
 */
function openDisAbled(yearNum: number, monthNum: number, dayNum: number) {
    let bool = true;
    let date = `${yearNum}/${monthNum}/${dayNum}`;
    // let today = this.today.replace(/\-/g, '/');
    let minStr = min.value ? `${min.value.year}/${min.value.month}/${min.value.day}` : '';
    let maxStr = max.value ? `${max.value.year}/${max.value.month}/${max.value.day}` : '';
    let timestamp = new Date(date).getTime();
    if (min.value && max.value && timestamp >= new Date(minStr).getTime() && timestamp <= new Date(maxStr).getTime()) {
        bool = false;
    }
    return bool;
}

/**
 * 生成数组
 */
function generateArray(start: number, end: number) {
    return Array.from(new Array(end + 1).keys()).slice(start);
}

/**
 * 格式化数字
 */
function formatNum(num: number) {
    return num < 10 ? '0' + num : num + '';
}

/**
 * 获取某月天数
 */
function getMonthDay(yearNum: number, monthNum: number) {
    return new Date(yearNum, monthNum, 0).getDate();
}

/**
 * 获取某月第一天星期几
 */
function getWeekday(yearNum: number, monthNum: number) {
    let date = new Date(`${yearNum}/${monthNum}/01 00:00:00`);
    return date.getDay();
}

/**
 * 检查年份是否超出范围
 */
function checkRange(yearNum: number) {
    let overstep = false;
    if (yearNum < Number(props.minYear) || yearNum > Number(props.maxYear)) {
        uni.showToast({ title: '日期超出范围啦~', icon: 'none' });
        overstep = true;
    }
    return overstep;
}

/**
 * 切换月份
 */
function changeMonthHandler(isAdd: number) {
    if (isAdd) {
        let m = month.value + 1;
        let y = m > 12 ? year.value + 1 : year.value;
        if (!checkRange(y)) {
            month.value = m > 12 ? 1 : m;
            year.value = y;
            changeData();
        }
    } else {
        let m = month.value - 1;
        let y = m < 1 ? year.value - 1 : year.value;
        if (!checkRange(y)) {
            month.value = m < 1 ? 12 : m;
            year.value = y;
            changeData();
        }
    }
}

/**
 * 切换年份
 */
function changeYearHandler(isAdd: number) {
    let y = isAdd ? year.value + 1 : year.value - 1;
    if (!checkRange(y)) {
        year.value = y;
        changeData();
    }
}

/**
 * 更新日历数据
 */
function changeData() {
    days.value = getMonthDay(year.value, month.value);
    daysArr.value = generateArray(1, days.value);
    weekday.value = getWeekday(year.value, month.value);
    weekdayArr.value = generateArray(1, weekday.value);
    showTitle.value = `${year.value}年${month.value}月`;
    if (props.isChange && props.mode == 'date') {
        btnFix(true);
    }
}

/**
 * 日期点击事件
 */
function dateClick(dayIdx: number) {
    const d = dayIdx + 1;
    if (!openDisAbled(year.value, month.value, d)) {
        day.value = d;
        let date = `${year.value}-${month.value}-${d}`;
        if (props.mode == 'date') {
            activeDate.value = date;
        } else {
            let compare = new Date(date.replace(/\-/g, '/')).getTime() < new Date(startDate.value.replace(/\-/g, '/')).getTime();
            if (isStart.value || compare) {
                startDate.value = date;
                startYear.value = year.value;
                startMonth.value = month.value;
                startDay.value = day.value;
                endYear.value = 0;
                endMonth.value = 0;
                endDay.value = 0;
                endDate.value = '';
                activeDate.value = '';
                isStart.value = false;
            } else {
                endDate.value = date;
                endYear.value = year.value;
                endMonth.value = month.value;
                endDay.value = day.value;
                isStart.value = true;
            }
        }
    }
}

/**
 * 关闭弹窗
 */
function close() {
    emit('input', false);
    emit('update:modelValue', false);
}

/**
 * 获取星期文本
 */
function getWeekText(date: string) {
    const d = new Date(`${date.replace(/\-/g, '/')} 00:00:00`);
    let week = d.getDay();
    return '星期' + ['日', '一', '二', '三', '四', '五', '六'][week];
}

/**
 * 确定按钮事件
 */
function btnFix(show: boolean) {
    if (!show) {
        close();
    }
    if (props.mode == 'date') {
        let arr = activeDate.value.split('-');
        let y = props.isChange ? year.value : Number(arr[0]);
        let m = props.isChange ? month.value : Number(arr[1]);
        let d = props.isChange ? day.value : Number(arr[2]);
        let daysNum = getMonthDay(y, m);
        let result = `${y}-${formatNum(m)}-${formatNum(d)}`;
        let weekText = getWeekText(result);
        let isToday = false;
        if (`${y}-${m}-${d}` == today.value) {
            // 今天
            isToday = true;
        }
        emit('change', {
            year: y,
            month: m,
            day: d,
            days: daysNum,
            result: result,
            week: weekText,
            isToday: isToday
            // switch: show //是否是切换年月操作
        });
    } else {
        if (!startDate.value || !endDate.value) return;
        let startMonthStr = formatNum(startMonth.value);
        let startDayStr = formatNum(startDay.value);
        let startDateStr = `${startYear.value}-${startMonthStr}-${startDayStr}`;
        let startWeek = getWeekText(startDateStr);
        let endMonthStr = formatNum(endMonth.value);
        let endDayStr = formatNum(endDay.value);
        let endDateStr = `${endYear.value}-${endMonthStr}-${endDayStr}`;
        let endWeek = getWeekText(endDateStr);
        emit('change', {
            startYear: startYear.value,
            startMonth: startMonth.value,
            startDay: startDay.value,
            startDate: startDateStr,
            startWeek: startWeek,
            endYear: endYear.value,
            endMonth: endMonth.value,
            endDay: endDay.value,
            endDate: endDateStr,
            endWeek: endWeek
        });
    }
}
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-calendar {
    color: $u-content-color;

    &__header {
        width: 100%;
        box-sizing: border-box;
        font-size: 30rpx;
        background-color: #fff;
        color: $u-main-color;

        &__text {
            margin-top: 30rpx;
            padding: 0 60rpx;
            @include vue-flex;
            justify-content: center;
            align-items: center;
        }
    }

    &__action {
        padding: 40rpx 0 40rpx 0;

        &__icon {
            margin: 0 16rpx;
        }

        &__text {
            padding: 0 16rpx;
            color: $u-main-color;
            font-size: 32rpx;
            line-height: 32rpx;
            font-weight: bold;
        }
    }

    &__week-day {
        @include vue-flex;
        align-items: center;
        justify-content: center;
        padding: 6px 0;
        overflow: hidden;

        &__text {
            flex: 1;
            text-align: center;
        }
    }

    &__content {
        width: 100%;
        @include vue-flex;
        flex-wrap: wrap;
        padding: 6px 0;
        box-sizing: border-box;
        background-color: #fff;
        position: relative;

        &--end-date {
            border-top-right-radius: 8rpx;
            border-bottom-right-radius: 8rpx;
        }

        &--start-date {
            border-top-left-radius: 8rpx;
            border-bottom-left-radius: 8rpx;
        }

        &__item {
            width: 14.2857%;
            @include vue-flex;
            align-items: center;
            justify-content: center;
            padding: 6px 0;
            overflow: hidden;
            position: relative;
            z-index: 2;

            &__inner {
                height: 84rpx;
                @include vue-flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-size: 32rpx;
                position: relative;
                border-radius: 50%;

                &__desc {
                    width: 100%;
                    font-size: 24rpx;
                    line-height: 24rpx;
                    transform: scale(0.75);
                    transform-origin: center center;
                    position: absolute;
                    left: 0;
                    text-align: center;
                    bottom: 2rpx;
                }
            }

            &__tips {
                width: 100%;
                font-size: 24rpx;
                line-height: 24rpx;
                position: absolute;
                left: 0;
                transform: scale(0.8);
                transform-origin: center center;
                text-align: center;
                bottom: 8rpx;
                z-index: 2;
            }
        }

        &__bg-month {
            position: absolute;
            font-size: 130px;
            line-height: 130px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: #e4e7ed;
            z-index: 1;
        }
    }

    &__bottom {
        width: 100%;
        @include vue-flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #fff;
        padding: 0 40rpx 30rpx;
        box-sizing: border-box;
        font-size: 24rpx;
        color: $u-tips-color;

        &__choose {
            height: 50rpx;
        }

        &__btn {
            width: 100%;
        }
    }
}
</style>
