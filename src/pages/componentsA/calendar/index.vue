<template>
    <demo-page
        title="Calendar 日历 "
        desc="此组件用于单个选择日期，范围选择日期等，日历被包裹在底部弹起的容器中。"
        :apis="'calendar'"
    >
        <view class="u-demo">
            <view class="u-demo-wrap">
                <view class="u-demo-title">演示效果</view>
                <view class="u-demo-area">
                    <u-calendar
                        v-model="show"
                        ref="calendar"
                        :is-page="isPage"
                        :mode="mode"
                        :show-lunar="showLunar"
                        :start-text="startText"
                        :end-text="endText"
                        :range-color="rangeColor"
                        :range-bg-color="rangeBgColor"
                        :active-bg-color="activeBgColor"
                        :btn-type="btnType"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :default-date="defaultDate"
                        :start-date="defaultStartDate"
                        :end-date="defaultEndDate"
                        :readonly="readonly"
                        :checked-dates="checkedDates"
                        :today-checked="todayChecked"
                        :checkin-mode="checkinMode"
                        :holidays="holidays"
                        :workdays="workdays"
                        :festivals="festivals"
                        :show-festival="showFestival"
                        :use-date-slot="useDateSlot"
                        :default-select-today="defaultSelectToday"
                        @change="change"
                    >
                        <!-- 自定义日期内容插槽 - 电商价格日历示例 -->
                        <template v-if="demoType === 3" #date="{ date }">
                            <text :class="getPriceClass(date)">{{ getPrice(date) }}</text>
                        </template>
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
                <view v-if="!isPage" class="u-config-item">
                    <view class="u-item-title">状态</view>
                    <u-subsection :current="showBtnStatus" :list="['显示', '隐藏']" @change="showChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">演示场景</view>
                    <u-subsection
                        :current="demoType"
                        :list="['基础用法', '打卡签到', '节假日', '价格日历']"
                        @change="demoTypeChange"
                    ></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">交互模式</view>
                    <u-subsection
                        :current="readonly ? 1 : 0"
                        :list="['可点击', '只读']"
                        @change="readonlyChange"
                    ></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">默认选中今天</view>
                    <u-subsection
                        :current="defaultSelectToday ? 0 : 1"
                        :list="['是', '否']"
                        @change="defaultSelectTodayChange"
                    ></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">默认选中日期</view>
                    <u-subsection :list="defaultDateList" @change="defaultDateChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">显示方式</view>
                    <u-subsection :current="showMode" :list="['弹窗', '页面']" @change="showModeChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">模式</view>
                    <u-subsection current="0" :list="['单个日期', '日期范围']" @change="modeChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">农历</view>
                    <u-subsection
                        :current="showLunar ? 0 : 1"
                        :list="['显示', '隐藏']"
                        @change="lunarChange"
                    ></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">最小可选日期</view>
                    <u-subsection :list="['1950-01-01', '2025-05-20']" @change="minDateChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">最大可选日期</view>
                    <u-subsection :list="['当前日期', '2028-05-20']" @change="maxDateChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">自定义样式</view>
                    <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type {
    CalendarChangeDate,
    CalendarChangeRange,
    CalendarMode,
    ThemeType
} from '@/uni_modules/uview-pro/types/global';
import { $u, useToast } from '@/uni_modules/uview-pro';

const toast = useToast();
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
const minDate = ref('1950-01-01');
const maxDate = ref($u.timeFormat(new Date().getTime(), 'yyyy-mm-dd'));

// 默认日期
const defaultDate = ref('');
const defaultStartDate = ref('');
const defaultEndDate = ref('');
const readonly = ref(false);

// 打卡签到数据
const demoType = ref(0);
const checkedDates = ref<string[]>([]);
const todayChecked = ref(false);

// 节假日和加班日数据
const holidays = ref<string[]>([]);
const workdays = ref<string[]>([]);
const showFestival = ref(false);

// 节日数据
const festivals = ref<Record<string, string>>({});

// 是否启用自定义日期插槽
const useDateSlot = ref(false);

// 是否启用打卡签到模式
const checkinMode = ref(false);

// 默认选中今天
const defaultSelectToday = ref(true);

// 价格日历数据
const priceMap = ref<Record<string, number>>({});

const showMode = computed(() => {
    return isPage.value ? 1 : 0;
});

const showBtnStatus = computed(() => {
    return show.value ? 0 : 1;
});

const defaultDateList = computed(() => {
    if (mode.value === 'date') {
        return ['无', '今天', '明天', '2025-01-01'];
    } else {
        return ['无', '本周', '本月', '近7天'];
    }
});

// 格式化日期为 YYYY-MM-DD 格式
const formatDate = (date: Date) => {
    return $u.timeFormat(date.getTime(), 'yyyy-mm-dd');
};

const showModeChange = (index: number) => {
    isPage.value = index === 1;
    show.value = index === 0;
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

function minDateChange(index: number) {
    minDate.value = index === 0 ? '1950-01-01' : '2025-05-20';
    show.value = true;
}

function maxDateChange(index: number) {
    maxDate.value = index === 0 ? $u.timeFormat(new Date().getTime(), 'yyyy-mm-dd') : '2028-05-20';
    show.value = true;
}

function readonlyChange(index: number) {
    readonly.value = index === 1;
    show.value = true;
}

function defaultSelectTodayChange(index: number) {
    defaultSelectToday.value = index === 0;
    show.value = true;
}

function defaultDateChange(index: number) {
    const now = new Date();

    if (mode.value === 'date') {
        // 单选模式
        switch (index) {
            case 0:
                defaultDate.value = '';
                break;
            case 1:
                defaultDate.value = formatDate(now);
                break;
            case 2:
                const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                defaultDate.value = formatDate(tomorrow);
                break;
            case 3:
                defaultDate.value = '2025-01-01';
                break;
        }
        defaultStartDate.value = '';
        defaultEndDate.value = '';
    } else {
        // 范围模式
        switch (index) {
            case 0:
                defaultStartDate.value = '';
                defaultEndDate.value = '';
                break;
            case 1:
                // 本周
                const dayOfWeek = now.getDay() || 7;
                const startOfWeek = new Date(now.getTime() - (dayOfWeek - 1) * 24 * 60 * 60 * 1000);
                const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
                defaultStartDate.value = formatDate(startOfWeek);
                defaultEndDate.value = formatDate(endOfWeek);
                break;
            case 2:
                // 本月
                const year = now.getFullYear();
                const month = now.getMonth();
                const startOfMonth = new Date(year, month, 1);
                const endOfMonth = new Date(year, month + 1, 0);
                defaultStartDate.value = formatDate(startOfMonth);
                defaultEndDate.value = formatDate(endOfMonth);
                break;
            case 3:
                // 自定义范围
                defaultStartDate.value = formatDate(now);
                const customEnd = new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000);
                defaultEndDate.value = formatDate(customEnd);
                break;
        }
        defaultDate.value = '';
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
        // 打卡签到模式下，点击日期模拟打卡
        if (demoType.value === 1) {
            const dateStr = single.result; // 使用 YYYY-MM-DD 格式
            const todayStr = formatDate(new Date());
            if (dateStr === todayStr) {
                todayChecked.value = true;
                toast.success('今日已打卡');
            } else if (!checkedDates.value.includes(dateStr)) {
                checkedDates.value.push(dateStr);
                toast.success('打卡成功 ' + dateStr);
            } else {
                toast.success('已经打卡了~');
            }
        }
    }
}

function demoTypeChange(index: number) {
    demoType.value = index;
    const now = new Date();
    if (index === 1) {
        // 切换到打卡签到模式，设置示例数据
        mode.value = 'date';
        readonly.value = false;
        showLunar.value = true;
        // 生成最近7天的打卡记录（模拟）
        checkedDates.value = [];
        for (let i = 1; i <= 7; i++) {
            const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            checkedDates.value.push(formatDate(d));
        }
        todayChecked.value = false;
        holidays.value = [];
        workdays.value = [];
        festivals.value = {};
        showFestival.value = false;
        useDateSlot.value = false;
        checkinMode.value = true;
        result.value = '点击今日日期进行打卡';
    } else if (index === 2) {
        // 切换到节假日模式
        mode.value = 'date';
        readonly.value = false;
        showLunar.value = true;
        checkedDates.value = [];
        todayChecked.value = false;
        useDateSlot.value = false;
        checkinMode.value = false;
        // 设置节假日（本月1-3号）- 使用 YYYY-MM-DD 格式
        holidays.value = [
            formatDate(new Date(now.getFullYear(), now.getMonth(), 1)),
            formatDate(new Date(now.getFullYear(), now.getMonth(), 2)),
            formatDate(new Date(now.getFullYear(), now.getMonth(), 3))
        ];
        // 设置加班日（本月6-7号）- 使用 YYYY-MM-DD 格式
        workdays.value = [
            formatDate(new Date(now.getFullYear(), now.getMonth(), 6)),
            formatDate(new Date(now.getFullYear(), now.getMonth(), 7))
        ];
        // 设置节日 - 使用 MM-DD 格式（每年固定）和 YYYY-MM-DD 格式（特定年份）
        festivals.value = {
            // 每年固定的节日（MM-DD 格式）
            '04-01': '愚人节',
            '04-04': '清明节',
            // 特定年份的节日（YYYY-MM-DD 格式）
            [formatDate(new Date(now.getFullYear(), now.getMonth(), 20))]: '自定义'
        };
        showFestival.value = true;
        result.value = '右上角红色"休"=节假日，蓝色"班"=加班日，下方显示节日名称或农历';
    } else if (index === 3) {
        // 切换到价格日历模式
        mode.value = 'date';
        readonly.value = false;
        showLunar.value = false;
        checkedDates.value = [];
        todayChecked.value = false;
        holidays.value = [];
        workdays.value = [];
        festivals.value = {};
        showFestival.value = false;
        useDateSlot.value = true;
        checkinMode.value = false;
        // 生成价格数据（模拟）
        priceMap.value = {};
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = formatDate(new Date(currentYear, currentMonth, i));
            // 随机生成价格 99-599
            const basePrice = 299;
            const randomPrice = Math.floor(Math.random() * 400) + 99;
            priceMap.value[dateStr] = randomPrice;
        }
        result.value = '价格日历示例，选择日期查看价格';
    } else {
        // 切换回基础用法
        checkedDates.value = [];
        todayChecked.value = false;
        holidays.value = [];
        workdays.value = [];
        festivals.value = {};
        showFestival.value = false;
        priceMap.value = {};
        useDateSlot.value = false;
        checkinMode.value = false;
        readonly.value = false;
        result.value = '请选择日期';
    }

    if (isPage.value === false) {
        showModeChange(index);
    }
}

// 获取日期价格
function getPrice(dateInfo: { date: string; isToday: boolean }) {
    if (dateInfo.isToday) {
        return '今天';
    }
    const price = priceMap.value[dateInfo.date];
    if (price) {
        return '¥' + price;
    }
    return '';
}

// 获取价格样式类
function getPriceClass(dateInfo: { date: string; isToday: boolean; isSelected?: boolean }) {
    // 选中的日期不添加颜色类，使用组件默认的白色
    if (dateInfo.isSelected) {
        return '';
    }
    if (dateInfo.isToday) {
        return 'price-today';
    }
    const price = priceMap.value[dateInfo.date];
    if (price && price < 200) {
        return 'price-low';
    }
    if (price && price > 400) {
        return 'price-high';
    }
    return 'price-normal';
}
</script>

<style lang="scss" scoped>
.price-today {
    color: var(--u-type-success);
    font-weight: bold;
}
.price-low {
    color: var(--u-type-error);
}
.price-high {
    color: var(--u-type-warning);
}
.price-normal {
    color: var(--u-tips-color);
}
</style>
