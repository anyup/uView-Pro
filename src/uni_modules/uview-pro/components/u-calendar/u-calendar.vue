<template>
    <!-- isPage 为 true 时直接嵌入页面，不使用弹窗 -->
    <template v-if="props.isPage">
        <view class="u-calendar u-calendar--page" :class="props.customClass" :style="$u.toStyle(customStyle)">
            <view class="u-calendar__header" v-if="!props.isPage">
                <view class="u-calendar__header__text" v-if="!slots.tooltip">
                    {{ toolTip }}
                </view>
                <slot v-else name="tooltip" />
            </view>
            <view class="u-calendar__action u-flex u-row-center">
                <view class="u-calendar__action__icon">
                    <u-icon
                        v-if="changeYear"
                        name="arrow-left-double"
                        :color="yearArrowColor"
                        @click="changeYearHandler(0)"
                    ></u-icon>
                </view>
                <view class="u-calendar__action__icon">
                    <u-icon
                        v-if="changeMonth"
                        name="arrow-left"
                        :color="monthArrowColor"
                        @click="changeMonthHandler(0)"
                    ></u-icon>
                </view>
                <view class="u-calendar__action__text">{{ showTitle }}</view>
                <view class="u-calendar__action__icon">
                    <u-icon
                        v-if="changeMonth"
                        name="arrow-right"
                        :color="monthArrowColor"
                        @click="changeMonthHandler(1)"
                    ></u-icon>
                </view>
                <view class="u-calendar__action__icon">
                    <u-icon
                        v-if="changeYear"
                        name="arrow-right-double"
                        :color="yearArrowColor"
                        @click="changeYearHandler(1)"
                    ></u-icon>
                </view>
            </view>
            <view class="u-calendar__week-day">
                <view class="u-calendar__week-day__text" v-for="(item, index) in weekDayZh" :key="index">
                    {{ item }}
                </view>
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
                        'u-calendar__content--start-date':
                            (mode == 'range' && startDate == `${year}-${month}-${index + 1}`) || mode == 'date',
                        'u-calendar__content--end-date':
                            (mode == 'range' && endDate == `${year}-${month}-${index + 1}`) || mode == 'date',
                        'u-calendar__content--checked': isCheckedDate(index + 1),
                        'u-calendar__content--today-checked': isTodayChecked(index + 1),
                        'u-calendar__content--checkin-mode': props.checkinMode
                    }"
                    :style="{
                        backgroundColor:
                            !props.checkinMode && props.checkedDates.length === 0 && !props.todayChecked
                                ? getColor(index, 1)
                                : ''
                    }"
                    v-for="(item, index) in daysArr"
                    :key="index"
                    @tap="dateClick(index)"
                >
                    <view
                        class="u-calendar__content__item__inner"
                        :class="{ 'u-calendar__content__item__inner--today-checked': isTodayChecked(index + 1) }"
                        :style="{
                            color: getCheckinTextColor(index + 1) || getColor(index, 2),
                            backgroundColor: getCheckinColor(index + 1)
                        }"
                    >
                        <!-- 今日已打卡时显示对勾，否则显示日期 -->
                        <view v-if="isTodayChecked(index + 1)" class="u-calendar__content__item__checkmark">
                            <u-icon name="checkmark" size="36" :color="props.checkedColor"></u-icon>
                        </view>
                        <template v-else>
                            <!-- 自定义日期内容插槽 - 优先级最高 -->
                            <template v-if="props.useDateSlot">
                                <view class="u-calendar__content__item__day">{{ index + 1 }}</view>
                                <view
                                    class="u-calendar__content__item__lunar"
                                    :style="{ color: getSlotColor(index + 1) }"
                                >
                                    <slot name="date" :date="getDateInfo(index + 1)"></slot>
                                </view>
                            </template>
                            <template v-else>
                                <!-- 日期数字右上角标记：休/班 -->
                                <view
                                    v-if="isHoliday(index + 1)"
                                    class="u-calendar__content__item__mark u-calendar__content__item__mark--holiday"
                                    :style="{ color: getHolidayWorkdayColor(index + 1, props.holidayColor) }"
                                >
                                    {{ t('uCalendar.holiday') }}
                                </view>
                                <view
                                    v-else-if="isWorkday(index + 1)"
                                    class="u-calendar__content__item__mark u-calendar__content__item__mark--workday"
                                    :style="{ color: getHolidayWorkdayColor(index + 1, props.workdayColor) }"
                                >
                                    {{ t('uCalendar.workday') }}
                                </view>
                                <view class="u-calendar__content__item__day">{{ index + 1 }}</view>
                                <!-- 范围选择开始日期显示"开始" -->
                                <view
                                    v-if="
                                        mode == 'range' &&
                                        startDate == `${year}-${month}-${index + 1}` &&
                                        startDate != endDate
                                    "
                                    class="u-calendar__content__item__lunar"
                                    :style="{ color: activeColor }"
                                >
                                    {{ startText }}
                                </view>
                                <!-- 范围选择结束日期显示"结束" -->
                                <view
                                    v-else-if="mode == 'range' && endDate == `${year}-${month}-${index + 1}`"
                                    class="u-calendar__content__item__lunar"
                                    :style="{ color: activeColor }"
                                >
                                    {{ endText }}
                                </view>
                                <!-- 节日名称 -->
                                <view
                                    v-else-if="getFestival(index + 1)"
                                    class="u-calendar__content__item__lunar u-calendar__content__item__festival"
                                    :style="{ color: getHolidayWorkdayColor(index + 1, props.festivalColor) }"
                                >
                                    {{ getFestival(index + 1) }}
                                </view>
                                <!-- 农历 -->
                                <view
                                    v-else-if="props.showLunar"
                                    class="u-calendar__content__item__lunar"
                                    :style="{ color: getCheckinLunarColor(index + 1) || getColor(index, 2) }"
                                >
                                    {{
                                        lunarArr[index]?.dayCn === '初一'
                                            ? lunarArr[index].monthCn
                                            : (lunarArr[index]?.dayCn ?? '')
                                    }}
                                </view>
                                <!-- 占位元素：当有节日/农历数据时保持高度一致 -->
                                <view
                                    v-else-if="props.showFestival"
                                    class="u-calendar__content__item__lunar u-calendar__content__item__placeholder"
                                ></view>
                            </template>
                        </template>
                    </view>
                </view>
                <view class="u-calendar__content__bg-month">{{ month }}</view>
            </view>
            <!-- 页面模式下不显示确定按钮，选择完成自动触发change事件 -->
            <view class="u-calendar__bottom" v-if="!props.isPage">
                <view class="u-calendar__bottom__choose">
                    <text>{{ mode == 'date' ? activeDate : startDate }}</text>
                    <text v-if="endDate">{{ t('uCalendar.to') }}{{ endDate }}</text>
                </view>
                <view class="u-calendar__bottom__btn">
                    <u-button
                        :type="btnType"
                        :disabled="btnDisable"
                        shape="circle"
                        size="default"
                        @click="btnFix(false)"
                    >
                        {{ t('uCalendar.confirmText') }}
                    </u-button>
                </view>
            </view>
        </view>
    </template>
    <!-- isPage 为 false 时使用弹窗模式 -->
    <u-popup
        v-else
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
        <view class="u-calendar" :class="props.customClass" :style="$u.toStyle(customStyle)">
            <view class="u-calendar__header">
                <view class="u-calendar__header__text" v-if="!slots.tooltip">
                    {{ toolTip }}
                </view>
                <slot v-else name="tooltip" />
            </view>
            <view class="u-calendar__action u-flex u-row-center">
                <view class="u-calendar__action__icon">
                    <u-icon
                        v-if="changeYear"
                        name="arrow-left-double"
                        :color="yearArrowColor"
                        @click="changeYearHandler(0)"
                    ></u-icon>
                </view>
                <view class="u-calendar__action__icon">
                    <u-icon
                        v-if="changeMonth"
                        name="arrow-left"
                        :color="monthArrowColor"
                        @click="changeMonthHandler(0)"
                    ></u-icon>
                </view>
                <view class="u-calendar__action__text">{{ showTitle }}</view>
                <view class="u-calendar__action__icon">
                    <u-icon
                        v-if="changeMonth"
                        name="arrow-right"
                        :color="monthArrowColor"
                        @click="changeMonthHandler(1)"
                    ></u-icon>
                </view>
                <view class="u-calendar__action__icon">
                    <u-icon
                        v-if="changeYear"
                        name="arrow-right-double"
                        :color="yearArrowColor"
                        @click="changeYearHandler(1)"
                    ></u-icon>
                </view>
            </view>
            <view class="u-calendar__week-day">
                <view class="u-calendar__week-day__text" v-for="(item, index) in weekDayZh" :key="index">
                    {{ item }}
                </view>
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
                        'u-calendar__content--start-date':
                            (mode == 'range' && startDate == `${year}-${month}-${index + 1}`) || mode == 'date',
                        'u-calendar__content--end-date':
                            (mode == 'range' && endDate == `${year}-${month}-${index + 1}`) || mode == 'date'
                    }"
                    :style="{ backgroundColor: getColor(index, 1) }"
                    v-for="(item, index) in daysArr"
                    :key="index"
                    @tap="dateClick(index)"
                >
                    <view class="u-calendar__content__item__inner" :style="{ color: getColor(index, 2) }">
                        <!-- 自定义日期内容插槽 - 优先级最高 -->
                        <template v-if="props.useDateSlot">
                            <view class="u-calendar__content__item__day">{{ index + 1 }}</view>
                            <view class="u-calendar__content__item__lunar" :style="{ color: getSlotColor(index + 1) }">
                                <slot name="date" :date="getDateInfo(index + 1)"></slot>
                            </view>
                        </template>
                        <template v-else>
                            <!-- 日期数字右上角标记：休/班 -->
                            <view
                                v-if="isHoliday(index + 1)"
                                class="u-calendar__content__item__mark u-calendar__content__item__mark--holiday"
                                :style="{ color: getHolidayWorkdayColor(index + 1, props.holidayColor) }"
                            >
                                {{ t('uCalendar.holiday') }}
                            </view>
                            <view
                                v-else-if="isWorkday(index + 1)"
                                class="u-calendar__content__item__mark u-calendar__content__item__mark--workday"
                                :style="{ color: getHolidayWorkdayColor(index + 1, props.workdayColor) }"
                            >
                                {{ t('uCalendar.workday') }}
                            </view>
                            <view class="u-calendar__content__item__day">{{ index + 1 }}</view>
                            <!-- 范围选择开始日期显示"开始" -->
                            <view
                                v-if="
                                    mode == 'range' &&
                                    startDate == `${year}-${month}-${index + 1}` &&
                                    startDate != endDate
                                "
                                class="u-calendar__content__item__lunar"
                                :style="{ color: activeColor }"
                            >
                                {{ startText }}
                            </view>
                            <!-- 范围选择结束日期显示"结束" -->
                            <view
                                v-else-if="mode == 'range' && endDate == `${year}-${month}-${index + 1}`"
                                class="u-calendar__content__item__lunar"
                                :style="{ color: activeColor }"
                            >
                                {{ endText }}
                            </view>
                            <!-- 节日名称 -->
                            <view
                                v-else-if="getFestival(index + 1)"
                                class="u-calendar__content__item__lunar u-calendar__content__item__festival"
                                :style="{ color: getHolidayWorkdayColor(index + 1, props.festivalColor) }"
                            >
                                {{ getFestival(index + 1) }}
                            </view>
                            <!-- 农历 -->
                            <view
                                v-else-if="props.showLunar"
                                class="u-calendar__content__item__lunar"
                                :style="{ color: getColor(index, 2) }"
                            >
                                {{
                                    lunarArr[index]?.dayCn === '初一'
                                        ? lunarArr[index].monthCn
                                        : (lunarArr[index]?.dayCn ?? '')
                                }}
                            </view>
                            <!-- 占位元素：当有节日/农历数据时保持高度一致 -->
                            <view
                                v-else-if="props.showFestival"
                                class="u-calendar__content__item__lunar u-calendar__content__item__placeholder"
                            ></view>
                        </template>
                    </view>
                </view>
                <view class="u-calendar__content__bg-month">{{ month }}</view>
            </view>
            <view class="u-calendar__bottom">
                <view class="u-calendar__bottom__choose">
                    <text>{{ mode == 'date' ? activeDate : startDate }}</text>
                    <text v-if="endDate">{{ t('uCalendar.to') }}{{ endDate }}</text>
                </view>
                <view class="u-calendar__bottom__btn">
                    <u-button
                        :type="btnType"
                        :disabled="btnDisable"
                        shape="circle"
                        size="default"
                        @click="btnFix(false)"
                    >
                        {{ t('uCalendar.confirmText') }}
                    </u-button>
                </view>
            </view>
        </view>
    </u-popup>
</template>

<script lang="ts">
export default {
    name: 'u-calendar',
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
import { ref, computed, watch, onMounted, useSlots } from 'vue';
import { $u, useLocale } from '../..';
import { CalendarProps, type CalendarEmits } from './types';
import Calendar from '../../libs/util/calendar';

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
 * @property {String} month-arrow-color 月份切换按钮箭头颜色(默认var(--u-content-color))
 * @property {String} year-arrow-color 年份切换按钮箭头颜色(默认var(--u-tips-color))
 * @property {String} color 日期字体的默认颜色(默认var(--u-main-color))
 * @property {String} active-bg-color 起始/结束日期按钮的背景色(默认主题色primary)
 * @property {String Number} z-index 弹出时的z-index值(默认10075)
 * @property {String} active-color 起始/结束日期按钮的字体颜色(默认var(--u-white-color))
 * @property {String} range-bg-color 起始/结束日期之间的区域的背景颜色(默认rgba(41,121,255,0.13))
 * @property {String} range-color 选择范围内字体颜色(默认主题色primary)
 * @property {String} start-text 起始日期底部的提示文字(默认 '开始')
 * @property {String} end-text 结束日期底部的提示文字(默认 '结束')
 * @property {String} btn-type 底部确定按钮的主题(默认 'primary')
 * @property {String} toolTip 顶部提示文字，如设置名为tooltip的slot，此参数将失效(默认 '选择日期')
 * @property {Boolean} closeable 是否显示右上角的关闭图标(默认true)
 * @property {Boolean} is-page 是否在页面中直接显示，不使用弹窗(默认false)
 * @property {String} default-date 默认选中的日期，mode=date时生效，格式：2024-01-01
 * @property {String} start-date 默认选中的开始日期，mode=range时生效，格式：2024-01-01
 * @property {String} end-date 默认选中的结束日期，mode=range时生效，格式：2024-01-01
 * @property {Boolean} readonly 是否只读，只读模式下禁止点击选择日期(默认false)
 * @example <u-calendar v-model="show" :mode="mode"></u-calendar>
 */

const props = defineProps(CalendarProps);
const emit = defineEmits<CalendarEmits>();
const slots = useSlots();

const { t } = useLocale();

// 组件内部状态
// 星期几,值为1-7
const weekday = ref(1);
const weekdayArr = ref<number[]>([]);
const days = ref(0);
const daysArr = ref<number[]>([]);
const lunarArr = ref<any[]>([]);
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
const weekDayZh = ref([
    t('uCalendar.sun'),
    t('uCalendar.mon'),
    t('uCalendar.tue'),
    t('uCalendar.wed'),
    t('uCalendar.thu'),
    t('uCalendar.fri'),
    t('uCalendar.sat')
]);

// 内置中国传统节日（公历日期）
const builtInFestivals: Record<string, string> = {
    '1-1': '元旦',
    '2-14': '情人节',
    '3-8': '妇女节',
    '3-12': '植树节',
    '4-1': '愚人节',
    '5-1': '劳动节',
    '5-4': '青年节',
    '6-1': '儿童节',
    '7-1': '建党节',
    '8-1': '建军节',
    '9-10': '教师节',
    '10-1': '国庆节',
    '11-11': '光棍节',
    '12-25': '圣诞节'
};

const dataChange = computed(() => `${props.mode}-${props.minDate}-${props.maxDate}`);
const lunarChange = computed(() => props.showLunar);
const defaultDateChange = computed(
    () => `${props.defaultDate}-${props.startDate}-${props.endDate}-${props.defaultSelectToday}`
);
// 如果用户有传递z-index值，优先使用
const uZIndex = computed(() => (props.zIndex ? props.zIndex : $u.zIndex.popup));
const popupValue = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
});

const btnDisable = computed(() => {
    let disable = false;
    if (props.mode == 'range') {
        if (!startDate.value || !endDate.value) {
            disable = true;
        }
    } else {
        if (!activeDate.value) {
            disable = true;
        }
    }
    return disable;
});

watch([dataChange, lunarChange], () => {
    init();
});

watch(defaultDateChange, () => {
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
 * 判断日期是否已打卡
 */
function isCheckedDate(dayNum: number) {
    const date = `${year.value}-${month.value}-${dayNum}`;
    return props.checkedDates.includes(date);
}

/**
 * 判断是否是今日且已打卡
 * 优先级：1. todayChecked 属性 2. 自动判断 checkedDates 中是否包含今天
 */
function isTodayChecked(dayNum: number) {
    const date = `${year.value}-${month.value}-${dayNum}`;
    // 首先检查是否是今天
    if (date !== today.value) {
        return false;
    }
    // 优先级1：手动设置的 todayChecked
    if (props.todayChecked) {
        return true;
    }
    // 优先级2：自动判断 checkedDates 中是否包含今天
    if (props.checkedDates.includes(date)) {
        return true;
    }
    return false;
}

/**
 * 获取打卡日期背景色
 */
function getCheckinColor(dayNum: number) {
    const date = `${year.value}-${month.value}-${dayNum}`;
    const isToday = date === today.value;
    const isInCheckedDates = props.checkedDates.includes(date);

    // 只有在打卡签到模式下或设置了打卡数据时才返回颜色
    if (!props.checkinMode && props.checkedDates.length === 0 && !props.todayChecked) {
        return '';
    }

    // 今日已打卡显示绿色（优先级：todayChecked > 自动判断）
    if (isToday && (props.todayChecked || isInCheckedDates)) {
        return props.todayCheckedBgColor;
    }

    // 其他已打卡日期显示橙色
    if (isInCheckedDates) {
        return props.checkedBgColor;
    }

    // 打卡签到模式下，未打卡日期显示灰色
    if (props.checkinMode) {
        return props.uncheckedBgColor;
    }
    return '';
}

/**
 * 获取打卡日期文字颜色
 */
function getCheckinTextColor(dayNum: number) {
    // 只有在打卡签到模式下或设置了打卡数据时才返回颜色
    if (!props.checkinMode && props.checkedDates.length === 0 && !props.todayChecked) {
        return '';
    }
    const date = `${year.value}-${month.value}-${dayNum}`;
    // 已打卡日期显示白色文字
    if (props.checkedDates.includes(date) || (date === today.value && props.todayChecked)) {
        return props.checkedColor;
    }
    // 打卡签到模式下，未打卡日期显示白色文字
    if (props.checkinMode) {
        return props.uncheckedColor;
    }
    return '';
}

/**
 * 获取打卡日期农历文字颜色
 */
function getCheckinLunarColor(dayNum: number) {
    // 只有在打卡签到模式下或设置了打卡数据时才返回颜色
    if (!props.checkinMode && props.checkedDates.length === 0 && !props.todayChecked) {
        return '';
    }
    const date = `${year.value}-${month.value}-${dayNum}`;
    // 已打卡日期的农历显示白色文字
    if (props.checkedDates.includes(date) || (date === today.value && props.todayChecked)) {
        return props.checkedColor;
    }
    // 打卡签到模式下，未打卡日期的农历显示白色文字
    if (props.checkinMode) {
        return props.uncheckedColor;
    }
    return '';
}

/**
 * 获取自定义插槽的颜色
 * 当选中日期时显示白色，否则显示默认颜色
 */
function getSlotColor(dayNum: number) {
    const date = `${year.value}-${month.value}-${dayNum}`;
    // 选中日期的自定义内容显示白色（仅在 isActiveCurrent 为 true 时）
    if (props.isActiveCurrent && (activeDate.value === date || startDate.value === date || endDate.value === date)) {
        return props.activeColor;
    }
    // 打卡签到模式下使用对应的颜色
    if (props.checkinMode || props.checkedDates.length > 0 || props.todayChecked) {
        return getCheckinLunarColor(dayNum) || props.color;
    }
    return props.color;
}

/**
 * 获取日期信息，用于自定义插槽
 */
function getDateInfo(dayNum: number) {
    const dateStr = `${year.value}-${month.value}-${dayNum}`;
    const dateObj = new Date(dateStr.replace(/\-/g, '/'));
    const dayOfWeek = dateObj.getDay();
    const weekNames = [
        t('uCalendar.sun'),
        t('uCalendar.mon'),
        t('uCalendar.tue'),
        t('uCalendar.wed'),
        t('uCalendar.thu'),
        t('uCalendar.fri'),
        t('uCalendar.sat')
    ];

    const isSelected = activeDate.value === dateStr || startDate.value === dateStr || endDate.value === dateStr;

    return {
        year: year.value,
        month: month.value,
        day: dayNum,
        date: dateStr,
        week: weekNames[dayOfWeek],
        weekNum: dayOfWeek,
        isToday: dateStr === today.value,
        isHoliday: props.holidays.includes(dateStr),
        isWorkday: props.workdays.includes(dateStr),
        isChecked: props.checkedDates.includes(dateStr),
        isSelected,
        isTodayChecked: dateStr === today.value && props.todayChecked,
        lunar: lunarArr[dayNum - 1] || null
    };
}

/**
 * 判断是否是节假日
 */
function isHoliday(dayNum: number) {
    const date = `${year.value}-${month.value}-${dayNum}`;
    return props.holidays.includes(date);
}

/**
 * 判断是否是加班日
 */
function isWorkday(dayNum: number) {
    const date = `${year.value}-${month.value}-${dayNum}`;
    return props.workdays.includes(date);
}

/**
 * 获取节日名称（合并内置节日和用户自定义节日）
 * 用户传入空字符串可覆盖内置节日，表示不显示该节日
 */
function getFestival(dayNum: number) {
    if (!props.showFestival) {
        return '';
    }
    const date = `${year.value}-${month.value}-${dayNum}`;
    const monthDay = `${month.value}-${dayNum}`;
    // 优先检查用户自定义节日（包括空字符串，用于覆盖内置节日）
    if (date in props.festivals) {
        return props.festivals[date];
    }
    // 然后检查内置节日（如果启用了 showFestival）
    if (builtInFestivals[monthDay]) {
        return builtInFestivals[monthDay];
    }
    return '';
}

/**
 * 获取节假日/加班日文字颜色
 * 当选中日期时显示白色，否则显示对应的颜色
 */
function getHolidayWorkdayColor(dayNum: number, defaultColor: string) {
    const date = `${year.value}-${month.value}-${dayNum}`;
    // 选中日期的节假日/加班日显示白色
    if (activeDate.value === date || startDate.value === date || endDate.value === date) {
        return props.activeColor;
    }
    return defaultColor;
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
    min.value = initDate(String(props.minDate));
    max.value = initDate(String(props.maxDate) || today.value);

    // 处理默认选中日期
    // 优先级1: defaultDate / startDate / endDate（显式指定日期）
    // 优先级2: defaultSelectToday（默认选中今天）
    // 优先级3: 不选中任何日期
    if (props.mode === 'date' && props.defaultDate) {
        // 单选模式：使用 defaultDate（优先级1）
        const defaultDateObj = new Date(props.defaultDate.replace(/\-/g, '/'));
        if (!isNaN(defaultDateObj.getTime())) {
            year.value = defaultDateObj.getFullYear();
            month.value = defaultDateObj.getMonth() + 1;
            day.value = defaultDateObj.getDate();
            // 统一格式为 YYYY-M-D，与 getColor 中的格式一致
            activeDate.value = `${year.value}-${month.value}-${day.value}`;
        } else if (props.defaultSelectToday) {
            activeDate.value = today.value;
        } else {
            activeDate.value = '';
        }
    } else if (props.mode === 'range' && (props.startDate || props.endDate)) {
        // 范围模式：使用 startDate 和 endDate（优先级1）
        const startDateObj = props.startDate ? new Date(props.startDate.replace(/\-/g, '/')) : null;
        const endDateObj = props.endDate ? new Date(props.endDate.replace(/\-/g, '/')) : null;

        if (startDateObj && !isNaN(startDateObj.getTime())) {
            // 设置当前显示月份为开始日期所在月份
            year.value = startDateObj.getFullYear();
            month.value = startDateObj.getMonth() + 1;

            // 设置开始日期 - 统一格式为 YYYY-M-D
            startYear.value = startDateObj.getFullYear();
            startMonth.value = startDateObj.getMonth() + 1;
            startDay.value = startDateObj.getDate();
            startDate.value = `${startYear.value}-${startMonth.value}-${startDay.value}`;
        }

        if (endDateObj && !isNaN(endDateObj.getTime())) {
            // 设置结束日期 - 统一格式为 YYYY-M-D
            endYear.value = endDateObj.getFullYear();
            endMonth.value = endDateObj.getMonth() + 1;
            endDay.value = endDateObj.getDate();
            endDate.value = `${endYear.value}-${endMonth.value}-${endDay.value}`;
        }

        isStart.value = true;
        activeDate.value = '';
    } else if (props.defaultSelectToday) {
        // 优先级2：默认选中今天
        activeDate.value = today.value;
        resetRangeState();
    } else {
        // 优先级3：不选中任何日期
        activeDate.value = '';
        resetRangeState();
    }

    changeData();
}

/**
 * 重置范围选择状态
 */
function resetRangeState() {
    startDate.value = '';
    startYear.value = 0;
    startMonth.value = 0;
    startDay.value = 0;
    endYear.value = 0;
    endMonth.value = 0;
    endDay.value = 0;
    endDate.value = '';
    isStart.value = true;
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
 * 检查年月是否超出范围
 */
function checkRange(yearNum: number, monthNum: number) {
    if (yearNum < Number(props.minYear) || yearNum > Number(props.maxYear)) {
        uni.showToast({ title: t('uCalendar.outOfRange'), icon: 'none' });
        return true;
    }

    const beforeMin =
        min.value && (yearNum < min.value.year || (yearNum === min.value.year && monthNum < min.value.month));
    const afterMax =
        max.value && (yearNum > max.value.year || (yearNum === max.value.year && monthNum > max.value.month));

    if (beforeMin || afterMax) {
        uni.showToast({ title: t('uCalendar.outOfRange'), icon: 'none' });
        return true;
    }

    return false;
}

/**
 * 切换月份
 */
function changeMonthHandler(isAdd: number) {
    if (isAdd) {
        let m = month.value + 1;
        let y = m > 12 ? year.value + 1 : year.value;
        m = m > 12 ? 1 : m;
        if (!checkRange(y, m)) {
            month.value = m;
            year.value = y;
            changeData();
        }
    } else {
        let m = month.value - 1;
        let y = m < 1 ? year.value - 1 : year.value;
        m = m < 1 ? 12 : m;
        if (!checkRange(y, m)) {
            month.value = m;
            year.value = y;
            changeData();
        }
    }
}

/**
 * 切换年份：若 minDate/maxDate 的月份在当前年超出，则切换到该年的最小/最大有效月
 */
function changeYearHandler(isAdd: number) {
    let y = isAdd ? year.value + 1 : year.value - 1;
    let m = month.value;
    if (min.value && y === min.value.year && m < min.value.month) {
        m = min.value.month;
    }
    if (max.value && y === max.value.year && m > max.value.month) {
        m = max.value.month;
    }
    if (!checkRange(y, m)) {
        year.value = y;
        month.value = m;
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
    showTitle.value = `${year.value}${t('uCalendar.year')}${month.value}${t('uCalendar.month')}`;
    if (props.showLunar) {
        lunarArr.value = [];
        daysArr.value.forEach(d => {
            lunarArr.value.push(getLunar(year.value, month.value, d));
        });
    }
    if (props.isChange && props.mode == 'date') {
        btnFix(true);
    }
}

/**
 * 获取农历
 */
function getLunar(year: any, month: any, day: any) {
    const val = Calendar.solar2lunar(year, month, day);
    return {
        dayCn: val.IDayCn,
        weekCn: val.ncWeek,
        monthCn: val.IMonthCn,
        day: val.lDay,
        week: val.nWeek,
        month: val.lMonth,
        year: val.lYear
    };
}

/**
 * 日期点击事件
 */
function dateClick(dayIdx: number) {
    // 只读模式下禁止点击
    if (props.readonly) return;

    const d = dayIdx + 1;
    if (!openDisAbled(year.value, month.value, d)) {
        day.value = d;
        let date = `${year.value}-${month.value}-${d}`;
        if (props.mode == 'date') {
            activeDate.value = date;
            // 页面模式下，单选日期选择完成自动触发change事件
            if (props.isPage) {
                btnFix(true);
            }
        } else {
            let compare =
                new Date(date.replace(/\-/g, '/')).getTime() < new Date(startDate.value.replace(/\-/g, '/')).getTime();
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
                // 页面模式下，范围选择完成（选了结束日期）自动触发change事件
                if (props.isPage) {
                    btnFix(true);
                }
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
    // 页面模式下不关闭，弹窗模式下关闭
    if (!show && !props.isPage) {
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
        const lunar = props.showLunar ? getLunar(y, m, d) : null;
        emit('change', {
            year: y,
            month: m,
            day: d,
            days: daysNum,
            result: result,
            week: weekText,
            isToday: isToday,
            lunar: lunar
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
        let startLunar = null;
        let endLunar = null;
        if (props.showLunar) {
            startLunar = getLunar(startYear.value, startMonth.value, startDay.value);
            endLunar = getLunar(endYear.value, endMonth.value, endDay.value);
        }
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
            endWeek: endWeek,
            startLunar: startLunar,
            endLunar: endLunar
        });
    }
}
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-calendar {
    color: $u-content-color;

    &--page {
        background-color: var(--u-bg-white);
        border-radius: 16rpx;
    }

    &__header {
        width: 100%;
        box-sizing: border-box;
        font-size: 30rpx;
        background-color: var(--u-bg-white);
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
        background-color: var(--u-bg-white);
        position: relative;

        &--end-date {
            border-top-right-radius: 8rpx;
            border-bottom-right-radius: 8rpx;
        }

        &--start-date {
            border-top-left-radius: 8rpx;
            border-bottom-left-radius: 8rpx;
        }

        &--checked {
            .u-calendar__content__item__inner {
                width: 80rpx;
                height: 80rpx;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        &--today-checked {
            .u-calendar__content__item__inner {
                width: 80rpx;
                height: 80rpx;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        &--checkin-mode {
            .u-calendar__content__item__inner {
                width: 80rpx;
                height: 80rpx;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
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

            &__day {
                font-size: 32rpx;
                line-height: 1;
            }

            &__lunar {
                font-size: 22rpx;
                line-height: 1;
                margin-top: 2rpx;
                transform: scale(0.85);
            }

            // 节假日/加班日标签样式
            &__holiday,
            &__workday {
                font-size: 22rpx;
                line-height: 1;
                margin-top: 2rpx;
                transform: scale(0.85);
            }

            // 右上角标记样式（休/班）
            &__mark {
                position: absolute;
                top: 8rpx;
                right: 8rpx;
                font-size: 24rpx;
                line-height: 1;
                transform: scale(0.75);
                z-index: 1;

                &--holiday {
                    color: var(--u-type-error);
                }

                &--workday {
                    color: var(--u-type-primary);
                }
            }

            // 节日名称样式（与农历保持一致）
            &__festival {
                font-size: 22rpx;
                line-height: 1;
                transform: scale(0.85);
                color: var(--u-type-primary);
            }

            // 占位元素样式
            &__placeholder {
                min-height: 22rpx;
                margin-top: 2rpx;
                opacity: 0;
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

            &__check-icon {
                position: absolute;
                right: 4rpx;
                top: 4rpx;
                z-index: 3;
            }

            &__checkmark {
                @include vue-flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }

            &__inner--today-checked {
                @include vue-flex;
                align-items: center;
                justify-content: center;
            }
        }

        &__bg-month {
            position: absolute;
            font-size: 130px;
            line-height: 130px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: var(--u-border-color);
            z-index: 1;
        }
    }

    &__bottom {
        width: 100%;
        @include vue-flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: var(--u-bg-white);
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
