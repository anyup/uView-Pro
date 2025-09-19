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
    >
        <view class="u-datetime-picker">
            <view class="u-picker-header" @touchmove.stop.prevent="">
                <view class="u-btn-picker u-btn-picker--tips" :style="{ color: cancelColor }" hover-class="u-opacity" :hover-stay-time="150" @tap="getResult('cancel')">{{
                    cancelText
                }}</view>
                <view class="u-picker__title">{{ title }}</view>
                <view
                    class="u-btn-picker u-btn-picker--primary"
                    :style="{ color: moving ? cancelColor : confirmColor }"
                    hover-class="u-opacity"
                    :hover-stay-time="150"
                    @touchmove.stop=""
                    @tap.stop="getResult('confirm')"
                >
                    {{ confirmText }}
                </view>
            </view>
            <view class="u-picker-body">
                <picker-view v-if="mode == 'region'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
                    <picker-view-column v-if="!reset && params.province">
                        <view class="u-column-item" v-for="(item, index) in provinces" :key="index">
                            <view class="u-line-1">{{ item.label }}</view>
                        </view>
                    </picker-view-column>
                    <picker-view-column v-if="!reset && params.city">
                        <view class="u-column-item" v-for="(item, index) in citysRef" :key="index">
                            <view class="u-line-1">{{ item.label }}</view>
                        </view>
                    </picker-view-column>
                    <picker-view-column v-if="!reset && params.area">
                        <view class="u-column-item" v-for="(item, index) in areasRef" :key="index">
                            <view class="u-line-1">{{ item.label }}</view>
                        </view>
                    </picker-view-column>
                </picker-view>
                <picker-view v-else-if="mode == 'time'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
                    <picker-view-column v-if="!reset && params.year">
                        <view class="u-column-item" v-for="(item, index) in years" :key="index">
                            {{ item }}
                            <text class="u-text" v-if="showTimeTag">年</text>
                        </view>
                    </picker-view-column>
                    <picker-view-column v-if="!reset && params.month">
                        <view class="u-column-item" v-for="(item, index) in months" :key="index">
                            {{ formatNumber(item) }}
                            <text class="u-text" v-if="showTimeTag">月</text>
                        </view>
                    </picker-view-column>
                    <picker-view-column v-if="!reset && params.day">
                        <view class="u-column-item" v-for="(item, index) in days" :key="index">
                            {{ formatNumber(item) }}
                            <text class="u-text" v-if="showTimeTag">日</text>
                        </view>
                    </picker-view-column>
                    <picker-view-column v-if="!reset && params.hour">
                        <view class="u-column-item" v-for="(item, index) in hours" :key="index">
                            {{ formatNumber(item) }}
                            <text class="u-text" v-if="showTimeTag">时</text>
                        </view>
                    </picker-view-column>
                    <picker-view-column v-if="!reset && params.minute">
                        <view class="u-column-item" v-for="(item, index) in minutes" :key="index">
                            {{ formatNumber(item) }}
                            <text class="u-text" v-if="showTimeTag">分</text>
                        </view>
                    </picker-view-column>
                    <picker-view-column v-if="!reset && params.second">
                        <view class="u-column-item" v-for="(item, index) in seconds" :key="index">
                            {{ formatNumber(item) }}
                            <text class="u-text" v-if="showTimeTag">秒</text>
                        </view>
                    </picker-view-column>
                </picker-view>
                <picker-view v-else-if="mode == 'selector'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
                    <picker-view-column v-if="!reset">
                        <view class="u-column-item" v-for="(item, index) in range" :key="index">
                            <view class="u-line-1">{{ getItemValue(item, 'selector') }}</view>
                        </view>
                    </picker-view-column>
                </picker-view>
                <picker-view v-else-if="mode == 'multiSelector'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
                    <picker-view-column v-if="!reset" v-for="(item, index) in range" :key="index">
                        <view class="u-column-item" v-for="(item1, index1) in item" :key="index1">
                            <view class="u-line-1">{{ getItemValue(item1, 'multiSelector') }}</view>
                        </view>
                    </picker-view-column>
                </picker-view>
            </view>
        </view>
    </u-popup>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import provinces from '../../libs/util/province';
import citys from '../../libs/util/city';
import areas from '../../libs/util/area';
import { PickerProps } from './types';

defineOptions({
    name: 'u-picker'
});

/**
 * picker picker弹出选择器
 * @description 此选择器有两种弹出模式：一是时间模式，可以配置年，日，月，时，分，秒参数 二是地区模式，可以配置省，市，区参数
 * @tutorial https://uviewpro.cn/zh/components/picker.html
 * @property {Object} params 需要显示的参数，见官网说明
 * @property {String} mode 模式选择，region-地区类型，time-时间类型（默认time）
 * @property {String Number} start-year 可选的开始年份，mode=time时有效（默认1950）
 * @property {String Number} end-year 可选的结束年份，mode=time时有效（默认2050）
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
 * @property {Boolean} show-time-tag 时间模式时，是否显示后面的年月日中文提示
 * @property {String} cancel-color 取消按钮的颜色（默认#606266）
 * @property {String} confirm-color 确认按钮的颜色（默认#2979ff）
 * @property {String} default-time 默认选中的时间，mode=time时有效
 * @property {String} confirm-text 确认按钮的文字
 * @property {String} cancel-text 取消按钮的文字
 * @property {String} default-region 默认选中的地区，中文形式，mode=region时有效
 * @property {String} default-code 默认选中的地区，编号形式，mode=region时有效
 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker（默认true）
 * @property {String Number} z-index 弹出时的z-index值（默认1075）
 * @property {Array} default-selector 数组形式，其中每一项表示选择了range对应项中的第几个
 * @property {Array} range 自定义选择的数据，mode=selector或mode=multiSelector时有效
 * @property {String} range-key 当range参数的元素为对象时，指定Object中的哪个key的值作为选择器显示内容
 * @event {Function} confirm 点击确定按钮，返回当前选择的值
 * @event {Function} cancel 点击取消按钮，返回当前选择的值
 * @example <u-picker v-model="show" mode="time"></u-picker>
 */
const props = defineProps(PickerProps);

const popupValue = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'columnchange']);

// 主要数据
const years = ref<number[]>([]);
const months = ref<number[]>([]);
const days = ref<number[]>([]);
const hours = ref<number[]>([]);
const minutes = ref<number[]>([]);
const seconds = ref<number[]>([]);
const year = ref<number>(0);
const month = ref<number>(0);
const day = ref<number>(0);
const hour = ref<number>(0);
const minute = ref<number>(0);
const second = ref<number>(0);
const reset = ref(false);
const startDate = ref('');
const endDate = ref('');
const valueArr = ref<number[]>([]);
const provincesRef = ref<any[]>(provinces);
const citysRef = ref<any[]>(citys[0]);
const areasRef = ref<any[]>(areas[0][0]);
const province = ref<number>(0);
const city = ref<number>(0);
const area = ref<number>(0);
// 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
const moving = ref(false);
const multiSelectorValue = ref<number[]>([]);

// 计算属性
// 引用这几个变量，是为了监听其变化
const propsChange = computed(() => `${props.mode}-${props.defaultTime}-${props.startYear}-${props.endYear}-${props.defaultRegion}-${props.areaCode}`);
// 引用这几个变量，是为了监听其变化
const regionChange = computed(() => `${province.value}-${city.value}`);

const yearAndMonth = computed(() => `${year.value}-${month.value}`);
// 如果用户有传递z-index值，优先使用
const uZIndex = computed(() => (props.zIndex ? props.zIndex : 1075));

// 监听
watch(propsChange, () => {
    reset.value = true;
    setTimeout(() => init(), 10);
});

// 如果地区发生变化，为了让picker联动起来，必须重置this.citys和this.areas
watch(regionChange, () => {
    citysRef.value = citys[province.value];
    areasRef.value = areas[province.value][city.value];
});

// watch监听月份的变化，实时变更日的天数，因为不同月份，天数不一样
// 一个月可能有30，31天，甚至闰年2月的29天，平年2月28天
watch(yearAndMonth, () => {
    if (props.params.year) setDays();
});
watch(
    () => props.modelValue,
    n => {
        if (n) {
            reset.value = true;
            setTimeout(() => init(), 10);
        }
    }
);

// 方法区
/**
 * 标识滑动开始，只有微信小程序才有这样的事件
 */
function pickstart() {
    // #ifdef MP-WEIXIN
    moving.value = true;
    // #endif
}
/**
 * 标识滑动结束
 */
function pickend() {
    // #ifdef MP-WEIXIN
    moving.value = false;
    // #endif
}
/**
 * 对单列和多列形式的判断是否有传入变量的情况
 * @param item 当前项
 * @param mode 模式
 */
function getItemValue(item: any, mode: string) {
    // 目前(2020-05-25)uni-app对微信小程序编译有错误，导致v-if为false中的内容也执行，错误导致
    // 单列模式或者多列模式中的getItemValue同时被执行，故在这里再加一层判断
    if (props.mode == mode) {
        return typeof item == 'object' ? item[props.rangeKey] : item;
    }
}
/**
 * 小于10前面补0，用于月份，日期，时分秒等
 */
function formatNumber(num: number | string) {
    return +num < 10 ? '0' + num : String(num);
}
/**
 * 生成递进的数组
 */
function generateArray(start: number, end: number) {
    // 转为数值格式，否则用户给end-year等传递字符串值时，下面的end+1会导致字符串拼接，而不是相加
    start = Number(start);
    end = Number(end);
    end = end > start ? end : start;
    // 生成数组，获取其中的索引，并剪出来
    return [...Array(end + 1).keys()].slice(start);
}
/**
 * 获取数组中指定值的索引
 */
function getIndex(arr: any[], val: any) {
    let index = arr.indexOf(val);
    // 如果index为-1(即找不到index值)，~(-1)=-(-1)-1=0，导致条件不成立
    return ~index ? index : 0;
}
/**
 * 日期时间处理，初始化各时间字段
 */
function initTimeValue() {
    // 格式化时间，在IE浏览器(uni不存在此情况)，无法识别日期间的"-"间隔符号
    let fdate = props.defaultTime.replace(/\-/g, '/');
    fdate = fdate && fdate.indexOf('/') == -1 ? `2020/01/01 ${fdate}` : fdate;
    let time: Date;
    if (fdate) time = new Date(fdate);
    else time = new Date();
    // 获取年日月时分秒
    year.value = time.getFullYear();
    month.value = Number(time.getMonth()) + 1;
    day.value = time.getDate();
    hour.value = time.getHours();
    minute.value = time.getMinutes();
    second.value = time.getSeconds();
}
/**
 * 初始化picker各列数据
 */
function init() {
    valueArr.value = [];
    reset.value = false;
    if (props.mode == 'time') {
        initTimeValue();
        if (props.params.year) {
            valueArr.value.push(0);
            setYears();
        }
        if (props.params.month) {
            valueArr.value.push(0);
            setMonths();
        }
        if (props.params.day) {
            valueArr.value.push(0);
            setDays();
        }
        if (props.params.hour) {
            valueArr.value.push(0);
            setHours();
        }
        if (props.params.minute) {
            valueArr.value.push(0);
            setMinutes();
        }
        if (props.params.second) {
            valueArr.value.push(0);
            setSeconds();
        }
    } else if (props.mode == 'region') {
        if (props.params.province) {
            valueArr.value.push(0);
            setProvinces();
        }
        if (props.params.city) {
            valueArr.value.push(0);
            setCitys();
        }
        if (props.params.area) {
            valueArr.value.push(0);
            setAreas();
        }
    } else if (props.mode == 'selector') {
        valueArr.value = props.defaultSelector as number[];
    } else if (props.mode == 'multiSelector') {
        valueArr.value = props.defaultSelector as number[];
        multiSelectorValue.value = props.defaultSelector as number[];
    }
    nextTick(() => {});
}
/**
 * 设置年份列
 */
function setYears() {
    // 获取年份集合
    years.value = generateArray(props.startYear as number, props.endYear as number);
    // 设置this.valueArr某一项的值，是为了让picker预选中某一个值
    valueArr.value.splice(valueArr.value.length - 1, 1, getIndex(years.value, year.value));
}
/**
 * 设置月份列
 */
function setMonths() {
    months.value = generateArray(1, 12);
    valueArr.value.splice(valueArr.value.length - 1, 1, getIndex(months.value, month.value));
}
/**
 * 设置天数列
 */
function setDays() {
    let totalDays = new Date(year.value, month.value, 0).getDate();
    days.value = generateArray(1, totalDays);
    let index = 0;
    // 这里不能使用类似setMonths()中的this.valueArr.splice(this.valueArr.length - 1, 1, xxx)做法
    // 因为this.month和this.year变化时，会触发watch中的this.setDays()，导致this.valueArr.length计算有误
    if (props.params.year && props.params.month) index = 2;
    else if (props.params.month) index = 1;
    else if (props.params.year) index = 1;
    else index = 0;
    // 当月份变化时，会导致日期的天数也会变化，如果原来选的天数大于变化后的天数，则重置为变化后的最大值
    // 比如原来选中3月31日，调整为2月后，日期变为最大29，这时如果day值继续为31显然不合理，于是将其置为29(picker-column从1开始)
    if (day.value > days.value.length) day.value = days.value.length;
    valueArr.value.splice(index, 1, getIndex(days.value, day.value));
}
/**
 * 设置小时列
 */
function setHours() {
    hours.value = generateArray(0, 23);
    valueArr.value.splice(valueArr.value.length - 1, 1, getIndex(hours.value, hour.value));
}
/**
 * 设置分钟列
 */
function setMinutes() {
    minutes.value = generateArray(0, 59);
    valueArr.value.splice(valueArr.value.length - 1, 1, getIndex(minutes.value, minute.value));
}
/**
 * 设置秒数列
 */
function setSeconds() {
    seconds.value = generateArray(0, 59);
    valueArr.value.splice(valueArr.value.length - 1, 1, getIndex(seconds.value, second.value));
}
/**
 * 设置省份列
 */
function setProvinces() {
    // 判断是否需要province参数
    if (!props.params.province) return;
    let tmp: any = '';
    let useCode = false;
    // 如果同时配置了defaultRegion和areaCode，优先使用areaCode参数
    if (props.areaCode.length) {
        tmp = props.areaCode[0];
        useCode = true;
    } else if (props.defaultRegion.length) tmp = props.defaultRegion[0];
    else tmp = 0;
    // 历遍省份数组匹配
    provinces.map((v: any, k: number) => {
        if (useCode ? v.value == tmp : v.label == tmp) {
            tmp = k;
        }
    });
    province.value = tmp;
    provincesRef.value = provinces;
    // 设置默认省份的值
    valueArr.value.splice(0, 1, province.value);
}
/**
 * 设置城市列
 */
function setCitys() {
    if (!props.params.city) return;
    let tmp: any = '';
    let useCode = false;
    if (props.areaCode.length) {
        tmp = props.areaCode[1];
        useCode = true;
    } else if (props.defaultRegion.length) tmp = props.defaultRegion[1];
    else tmp = 0;
    // 历遍城市数组匹配
    citys[province.value].map((v: any, k: number) => {
        if (useCode ? v.value == tmp : v.label == tmp) {
            tmp = k;
        }
    });
    city.value = tmp;
    citysRef.value = citys[province.value];
    // 设置默认城市的值
    valueArr.value.splice(1, 1, city.value);
}
/**
 * 设置区县列
 */
function setAreas() {
    if (!props.params.area) return;
    let tmp: any = '';
    let useCode = false;
    if (props.areaCode.length) {
        tmp = props.areaCode[2];
        useCode = true;
    } else if (props.defaultRegion.length) tmp = props.defaultRegion[2];
    else tmp = 0;
    // 历遍区县数组匹配
    areas[province.value][city.value].map((v: any, k: number) => {
        if (useCode ? v.value == tmp : v.label == tmp) {
            tmp = k;
        }
    });
    area.value = tmp;
    areasRef.value = areas[province.value][city.value];
    // 设置默认区县的值
    valueArr.value.splice(2, 1, area.value);
}
/**
 * 关闭picker弹窗
 */
function close() {
    emit('update:modelValue', false);
}
/**
 * 用户更改picker的列选项
 * @param e 事件对象
 */
function change(e: any) {
    valueArr.value = e.detail.value;
    let i = 0;
    if (props.mode == 'time') {
        // 这里使用i++，是因为valueArr数组的长度是不确定长度的，它根据params的值来配置长度
        // 进入if规则，i会加1，保证了能获取准确的值
        if (props.params.year) year.value = years.value[valueArr.value[i++]];
        if (props.params.month) month.value = months.value[valueArr.value[i++]];
        if (props.params.day) day.value = days.value[valueArr.value[i++]];
        if (props.params.hour) hour.value = hours.value[valueArr.value[i++]];
        if (props.params.minute) minute.value = minutes.value[valueArr.value[i++]];
        if (props.params.second) second.value = seconds.value[valueArr.value[i++]];
    } else if (props.mode == 'region') {
        if (props.params.province) province.value = valueArr.value[i++];
        if (props.params.city) city.value = valueArr.value[i++];
        if (props.params.area) area.value = valueArr.value[i++];
    } else if (props.mode == 'multiSelector') {
        let index: number | null = null;
        // 对比前后两个数组，寻找变更的是哪一列，如果某一个元素不同，即可判定该列发生了变化
        (props.defaultSelector as number[]).map((val: number, idx: number) => {
            if (val != e.detail.value[idx]) index = idx;
        });
        // 为了让用户对多列变化时，对动态设置其他列的变更
        if (index != null) {
            emit('columnchange', {
                column: index,
                index: e.detail.value[index]
            });
        }
    }
}
/**
 * 用户点击确定/取消按钮，获取结果
 * @param event 事件名
 */
function getResult(event: string | null = null) {
    // #ifdef MP-WEIXIN
    // 微信小程序滑动中不允许点击确定，防止取值不准确
    if (moving.value) return;
    // #endif
    let result: any = {};
    // 只返回用户在params中配置了为true的字段
    if (props.mode == 'time') {
        if (props.params.year) result.year = formatNumber(year.value || 0); // 年
        if (props.params.month) result.month = formatNumber(month.value || 0); // 月
        if (props.params.day) result.day = formatNumber(day.value || 0); // 日
        if (props.params.hour) result.hour = formatNumber(hour.value || 0); // 时
        if (props.params.minute) result.minute = formatNumber(minute.value || 0); // 分
        if (props.params.second) result.second = formatNumber(second.value || 0); // 秒
        if (props.params.timestamp) result.timestamp = getTimestamp(); // 时间戳
    } else if (props.mode == 'region') {
        // 地区模式，返回省市区对象
        if (props.params.province) result.province = provinces[province.value];
        if (props.params.city) result.city = citys[province.value][city.value];
        if (props.params.area) result.area = areas[province.value][city.value][area.value];
    } else if (props.mode == 'selector') {
        // 单列选择器，直接返回选中下标数组
        result = valueArr.value;
    } else if (props.mode == 'multiSelector') {
        // 多列选择器，直接返回选中下标数组
        result = valueArr.value;
    }
    // 只允许 emit 已声明的事件类型
    if (event && ['update:modelValue', 'confirm', 'cancel', 'columnchange'].includes(event)) emit(event as 'update:modelValue' | 'confirm' | 'cancel' | 'columnchange', result);
    close();
}
/**
 * 获取时间戳（秒）
 * @returns {number} 时间戳
 */
function getTimestamp() {
    // yyyy-mm-dd为安卓写法，不支持iOS，需要使用"/"分隔，才能二者兼容
    let time = year.value + '/' + month.value + '/' + day.value + ' ' + hour.value + ':' + minute.value + ':' + second.value;
    return new Date(time).getTime() / 1000;
}

// 组件挂载时初始化
onMounted(() => {
    init();
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-datetime-picker {
    position: relative;
    z-index: 999;
}

.u-picker-view {
    height: 100%;
    box-sizing: border-box;
}

.u-picker-header {
    width: 100%;
    height: 90rpx;
    padding: 0 40rpx;
    @include vue-flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    font-size: 30rpx;
    background: #fff;
    position: relative;
}

.u-picker-header::after {
    content: '';
    position: absolute;
    border-bottom: 1rpx solid #eaeef1;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    bottom: 0;
    right: 0;
    left: 0;
}

.u-picker__title {
    color: $u-content-color;
}

.u-picker-body {
    width: 100%;
    height: 500rpx;
    overflow: hidden;
    background-color: #fff;
}

.u-column-item {
    @include vue-flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    color: $u-main-color;
    padding: 0 8rpx;
}

.u-text {
    font-size: 24rpx;
    padding-left: 8rpx;
}

.u-btn-picker {
    padding: 16rpx;
    box-sizing: border-box;
    text-align: center;
    text-decoration: none;
}

.u-opacity {
    opacity: 0.5;
}

.u-btn-picker--primary {
    color: $u-type-primary;
}

.u-btn-picker--tips {
    color: $u-tips-color;
}
</style>
