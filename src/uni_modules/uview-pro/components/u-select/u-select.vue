<template>
    <view class="u-select">
        <!-- <view class="u-select__action" :class="{
		'u-select--border': border
	}" @tap.stop="selectHandler">
		<view class="u-select__action__icon" :class="{
			'u-select__action__icon--reverse': value == true
		}">
			<u-icon name="arrow-down-fill" size="26" color="#c0c4cc"></u-icon>
		</view>
	</view> -->
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
            <view class="u-select">
                <view class="u-select__header" @touchmove.stop.prevent="">
                    <view
                        class="u-select__header__cancel u-select__header__btn"
                        :style="{ color: cancelColor }"
                        hover-class="u-hover-class"
                        :hover-stay-time="150"
                        @tap="getResult('cancel')"
                    >
                        {{ cancelText }}
                    </view>
                    <view class="u-select__header__title">
                        {{ title }}
                    </view>
                    <view
                        class="u-select__header__confirm u-select__header__btn"
                        :style="{ color: moving ? cancelColor : confirmColor }"
                        hover-class="u-hover-class"
                        :hover-stay-time="150"
                        @touchmove.stop=""
                        @tap.stop="getResult('confirm')"
                    >
                        {{ confirmText }}
                    </view>
                </view>
                <view class="u-select__body">
                    <picker-view @change="columnChange" class="u-select__body__picker-view" :value="defaultSelector" @pickstart="pickstart" @pickend="pickend" v-if="modelValue">
                        <picker-view-column v-for="(item, index) in columnData" :key="index">
                            <view class="u-select__body__picker-view__item" v-for="(item1, index1) in item" :key="index1">
                                <view class="u-line-1">{{ item1[labelName] }}</view>
                            </view>
                        </picker-view-column>
                    </picker-view>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { SelectProps } from './types';
import type { SelectListItem } from '../../types/global';

defineOptions({
    name: 'u-select'
});

/**
 * select 列选择器
 * @description 此选择器用于单列，多列，多列联动的选择场景。(从1.3.0版本起，不建议使用Picker组件的单列和多列模式，Select组件是专门为列选择而构造的组件，更简单易用。)
 * @tutorial https://uviewpro.cn/zh/components/select.html
 * @property {String} mode 模式选择，"single-column"-单列模式，"mutil-column"-多列模式，"mutil-column-auto"-多列联动模式
 * @property {Array} list 列数据，数组形式，见官网说明
 * @property {Boolean} v-model 布尔值变量，用于控制选择器的弹出与收起
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配(默认false)
 * @property {String} cancel-color 取消按钮的颜色（默认#606266）
 * @property {String} confirm-color 确认按钮的颜色(默认#2979ff)
 * @property {String} confirm-text 确认按钮的文字
 * @property {String} cancel-text 取消按钮的文字
 * @property {String} default-value 提供的默认选中的下标，见官网说明
 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker(默认true)
 * @property {String Number} z-index 弹出时的z-index值(默认10075)
 * @property {String} value-name 自定义list数据的value属性名 1.3.6
 * @property {String} label-name 自定义list数据的label属性名 1.3.6
 * @property {String} child-name 自定义list数据的children属性名，只对多列联动模式有效 1.3.7
 * @event {Function} confirm 点击确定按钮，返回当前选择的值
 * @example <u-select v-model="show" :list="list"></u-select>
 */

const props = defineProps(SelectProps);
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'click']);
// 用于列改变时，保存当前的索引，下一次变化时比较得出是哪一列发生了变化

const defaultSelector = ref<number[]>([0]);
// picker-view的数据
const columnData = ref<SelectListItem[][]>([]);
// 每次队列发生变化时，保存选择的结果
const selectValue = ref<SelectListItem[]>([]);
// 上一次列变化时的index
const lastSelectIndex = ref<number[]>([]);
// 列数
const columnNum = ref(0);
// 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
const moving = ref(false);
// 如果用户有传递z-index值，优先使用
const uZIndex = computed(() => (props.zIndex ? props.zIndex : 10075));

const popupValue = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
});

watch(
    () => props.modelValue,
    val => {
        if (val) setTimeout(() => init(), 10);
    },
    { immediate: true }
);
// 标识滑动开始，只有微信小程序才有这样的事件
function pickstart() {
    // #ifdef MP-WEIXIN
    moving.value = true;
    // #endif
}
function pickend() {
    // #ifdef MP-WEIXIN
    moving.value = false;
    // #endif
}

function init() {
    setColumnNum();
    setDefaultSelector();
    setColumnData();
    setSelectValue();
}

// 获取默认选中列下标
function setDefaultSelector() {
    // 如果没有传入默认选中的值，生成长度为columnNum，用0填充的数组
    defaultSelector.value = props.defaultValue.length == columnNum.value ? props.defaultValue : Array(columnNum.value).fill(0);
    lastSelectIndex.value = [...defaultSelector.value];
}
// 计算列数
function setColumnNum() {
    // 单列的列数为1
    if (props.mode == 'single-column') columnNum.value = 1;
    // 多列时，this.list数组长度就是列数
    else if (props.mode == 'mutil-column') columnNum.value = props.list.length;
    // 多列联动时，通过历遍this.list的第一个元素，得出有多少列
    else if (props.mode == 'mutil-column-auto') {
        let num = 1;
        let column: any = props.list;
        // 只要有元素并且第一个元素有children属性，继续遍历
        while (Array.isArray(column) && column[0] && typeof column[0] === 'object' && props.childName in column[0]) {
            column = column[0][props.childName];
            num++;
        }
        columnNum.value = num;
    }
}

// 获取需要展示在picker中的列数据
function setColumnData() {
    let data: SelectListItem[][] = [];
    selectValue.value = [];
    if (props.mode == 'mutil-column-auto') {
        // 获得所有数据中的第一个元素
        let column: any = props.list[defaultSelector.value.length ? defaultSelector.value[0] : 0];
        // 通过循环所有的列数，再根据设定列的数组，得出当前需要渲染的整个列数组
        for (let i = 0; i < columnNum.value; i++) {
            // 第一列默认为整个list数组
            if (i == 0) {
                data[i] = is2DList(props.list) ? props.list[i] || [] : (props.list as SelectListItem[]);
                column = column && typeof column === 'object' ? column[props.childName] : [];
            } else {
                // 大于第一列时，判断是否有默认选中的，如果没有就用该列的第一项
                data[i] = Array.isArray(column) ? column : [];
                column =
                    Array.isArray(column) && column[defaultSelector.value[i]] && typeof column[defaultSelector.value[i]] === 'object'
                        ? column[defaultSelector.value[i]][props.childName]
                        : [];
            }
        }
    } else if (props.mode == 'single-column') {
        data[0] = Array.isArray(props.list) && !is2DList(props.list) ? (props.list as SelectListItem[]) : [];
    } else if (props.mode == 'mutil-column') {
        data = is2DList(props.list) ? props.list : [props.list as SelectListItem[]];
    }
    columnData.value = data;
}

// 获取默认选中的值，如果没有设置defaultValue，就默认选中每列的第一个
function setSelectValue() {
    for (let i = 0; i < columnNum.value; i++) {
        const tmp = columnData.value[i][defaultSelector.value[i]];
        let data: any = {
            value: tmp ? tmp[props.valueName] : null,
            label: tmp ? tmp[props.labelName] : null
        };

        // 判断是否存在额外的参数，如果存在，就返回
        if (tmp && tmp.extra !== undefined) data.extra = tmp.extra;
        selectValue.value.push(data);
    }
}

// 列选项
function columnChange(e: any) {
    let index: number = -1;
    const columnIndex = e.detail.value;
    // 由于后面是需要push进数组的，所以需要先清空数组
    selectValue.value = [];
    defaultSelector.value = columnIndex;
    if (props.mode == 'mutil-column-auto') {
        // 对比前后两个数组，寻找变更的是哪一列，如果某一个元素不同，即可判定该列发生了变化
        lastSelectIndex.value.map((val, idx) => {
            if (val != columnIndex[idx]) index = idx;
        });
        for (let i = index + 1; i < columnNum.value; i++) {
            // 当前变化列的下一列的数据，需要获取上一列的数据，同时需要指定是上一列的第几个的children，再往后的
            // 默认是队列的第一个为默认选项
            const prevCol = columnData.value[i - 1];
            const prevIdx = i - 1 == index ? columnIndex[index] : 0;
            columnData.value[i] = Array.isArray(prevCol) && prevCol[prevIdx] && typeof prevCol[prevIdx] === 'object' ? prevCol[prevIdx][props.childName] : [];
            // 改变的列之后的所有列，默认选中第一个
            defaultSelector.value[i] = 0;
        }
        // 在历遍的过程中，可能由于上一步修改this.columnData，导致产生连锁反应，程序触发columnChange，会有多次调用
        // 只有在最后一次数据稳定后的结果是正确的，此前的历遍中，可能会产生undefined，故需要判断
        columnIndex.map((item: any, idx: number) => {
            let data = columnData.value[idx][columnIndex[idx]];
            let tmp: any = {
                value: data ? data[props.valueName] : null,
                label: data ? data[props.labelName] : null
            };
            // 判断是否有需要额外携带的参数
            if (data && data.extra !== undefined) tmp.extra = data.extra;
            selectValue.value.push(tmp);
        });
        // 保存这一次的结果，用于下次列发生变化时作比较
        lastSelectIndex.value = [...columnIndex];
    } else if (props.mode == 'single-column') {
        let data = columnData.value[0][columnIndex[0]];
        // 初始默认选中值
        let tmp: any = {
            value: data ? data[props.valueName] : null,
            label: data ? data[props.labelName] : null
        };
        // 判断是否有需要额外携带的参数
        if (data && data.extra !== undefined) tmp.extra = data.extra;
        selectValue.value.push(tmp);
    } else if (props.mode == 'mutil-column') {
        // 初始默认选中值
        columnIndex.map((item: any, idx: number) => {
            let data = columnData.value[idx][columnIndex[idx]];
            // 初始默认选中值
            let tmp: any = {
                value: data ? data[props.valueName] : null,
                label: data ? data[props.labelName] : null
            };
            // 判断是否有需要额外携带的参数
            if (data && data.extra !== undefined) tmp.extra = data.extra;
            selectValue.value.push(tmp);
        });
    }
}

function close() {
    emit('update:modelValue', false);
    // 重置default-value默认值
    defaultSelector.value = [0];
}
// 点击确定或者取消
function getResult(event: 'update:modelValue' | 'confirm' | 'cancel' | 'click' | null = null) {
    // #ifdef MP-WEIXIN
    if (moving.value) return;
    // #endif

    if (event) emit(event, selectValue.value);
    close();
}

function selectHandler() {
    emit('click');
}

// 类型守卫提前声明
function is2DList(list: SelectListItem[] | SelectListItem[][]): list is SelectListItem[][] {
    return Array.isArray(list) && list.length > 0 && Array.isArray(list[0]);
}
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-select {
    &__action {
        position: relative;
        line-height: $u-form-item-height;
        height: $u-form-item-height;

        &__icon {
            position: absolute;
            right: 20rpx;
            top: 50%;
            transition: transform 0.4s;
            transform: translateY(-50%);
            z-index: 1;

            &--reverse {
                transform: rotate(-180deg) translateY(50%);
            }
        }
    }

    &__hader {
        &__title {
            color: $u-content-color;
        }
    }

    &--border {
        border-radius: 6rpx;
        border-radius: 4px;
        border: 1px solid $u-form-item-border-color;
    }

    &__header {
        @include vue-flex;
        align-items: center;
        justify-content: space-between;
        height: 80rpx;
        padding: 0 40rpx;
    }

    &__body {
        width: 100%;
        height: 500rpx;
        overflow: hidden;
        background-color: #fff;

        &__picker-view {
            height: 100%;
            box-sizing: border-box;

            &__item {
                @include vue-flex;
                align-items: center;
                justify-content: center;
                font-size: 32rpx;
                color: $u-main-color;
                padding: 0 8rpx;
            }
        }
    }
}
</style>
