<template>
    <view class="u-field" :class="{ 'u-border-top': props.borderTop, 'u-border-bottom': props.borderBottom }">
        <view class="u-field-inner" :class="[props.type === 'textarea' ? 'u-textarea-inner' : '', 'u-label-postion-' + props.labelPosition]">
            <view
                class="u-label"
                :class="[props.required ? 'u-required' : '']"
                :style="{
                    justifyContent: justifyContent,
                    flex: props.labelPosition === 'left' ? `0 0 ${props.labelWidth}rpx` : '1'
                }"
            >
                <view class="u-icon-wrap" v-if="props.icon">
                    <u-icon size="32" :custom-style="props.iconStyle" :name="props.icon" :color="props.iconColor" class="u-icon"></u-icon>
                </view>
                <slot name="icon"></slot>
                <text class="u-label-text" :class="[$slots.icon || props.icon ? 'u-label-left-gap' : '']">{{ props.label }}</text>
            </view>
            <view class="fild-body">
                <view class="u-flex-1 u-flex" :style="[inputWrapStyle]">
                    <textarea
                        v-if="props.type === 'textarea'"
                        class="u-flex-1 u-textarea-class"
                        :style="[props.fieldStyle]"
                        :value="props.modelValue"
                        :placeholder="props.placeholder"
                        :placeholderStyle="props.placeholderStyle"
                        :disabled="props.disabled"
                        :maxlength="inputMaxlength"
                        :focus="props.focus"
                        :autoHeight="props.autoHeight"
                        :fixed="props.fixed"
                        @input="onInput"
                        @blur="onBlur"
                        @focus="onFocus"
                        @confirm="onConfirm"
                        @tap="fieldClick"
                    />
                    <input
                        v-else
                        :style="[props.fieldStyle]"
                        :type="props.type"
                        class="u-flex-1 u-field__input-wrap"
                        :value="props.modelValue"
                        :password="props.password || props.type === 'password'"
                        :placeholder="props.placeholder"
                        :placeholderStyle="props.placeholderStyle"
                        :disabled="props.disabled"
                        :maxlength="inputMaxlength"
                        :focus="props.focus"
                        :confirmType="props.confirmType"
                        @focus="onFocus"
                        @blur="onBlur"
                        @input="onInput"
                        @confirm="onConfirm"
                        @tap="fieldClick"
                    />
                </view>
                <u-icon
                    :size="props.clearSize"
                    v-if="props.clearable && props.modelValue != '' && focused"
                    name="close-circle-fill"
                    color="#c0c4cc"
                    class="u-clear-icon"
                    @click="onClear"
                />
                <view class="u-button-wrap"><slot name="right" /></view>
                <u-icon v-if="props.rightIcon" @click="rightIconClick" :name="props.rightIcon" color="#c0c4cc" :style="[rightIconStyle]" size="26" class="u-arror-right" />
            </view>
        </view>
        <view
            v-if="props.errorMessage !== false && props.errorMessage != ''"
            class="u-error-message"
            :style="{
                paddingLeft: props.labelWidth + 'rpx'
            }"
            >{{ props.errorMessage }}</view
        >
    </view>
</template>

<script setup lang="ts">
import { FieldProps } from './types';
import { ref, computed } from 'vue';
import { $u } from '../..';

defineOptions({ name: 'u-field' });

/**
 * field 输入框
 * @description 借助此组件，可以实现表单的输入， 有"text"和"textarea"类型的，此外，借助uView的picker和actionSheet组件可以快速实现上拉菜单，时间，地区选择等， 为表单解决方案的利器。
 * @tutorial https://uviewpro.cn/zh/components/field.html
 * @property {String} type 输入框的类型（默认text）
 * @property {String} icon label左边的图标，限uView的图标名称
 * @property {Object} icon-style 左边图标的样式，对象形式
 * @property {Boolean} right-icon 输入框右边的图标名称，限uView的图标名称（默认false）
 * @property {Boolean} required 是否必填，左侧显示红色"*"号（默认false）
 * @property {String} label 输入框左边的文字提示
 * @property {Boolean} password 是否密码输入方式(用点替换文字)，type为text时有效（默认false）
 * @property {Boolean} clearable 是否显示右侧清空内容的图标控件(输入框有内容，且获得焦点时才显示)，点击可清空输入框内容（默认true）
 * @property {Number | String} label-width label的宽度，单位rpx（默认130）
 * @property {String} label-align label的文字对齐方式（默认left）
 * @property {Object} field-style 自定义输入框的样式，对象形式
 * @property {Number | String} clear-size 清除图标的大小，单位rpx（默认30）
 * @property {String} input-align 输入框内容对齐方式（默认left）
 * @property {Boolean} border-bottom 是否显示field的下边框（默认true）
 * @property {Boolean} border-top 是否显示field的上边框（默认false）
 * @property {String} icon-color 左边通过icon配置的图标的颜色（默认#606266）
 * @property {Boolean} auto-height 是否自动增高输入区域，type为textarea时有效（默认true）
 * @property {String Boolean} error-message 显示的错误提示内容，如果为空字符串或者false，则不显示错误信息
 * @property {String} placeholder 输入框的提示文字
 * @property {String} placeholder-style placeholder的样式(内联样式，字符串)，如"color: #ddd"
 * @property {Boolean} focus 是否自动获得焦点（默认false）
 * @property {Boolean} fixed 如果type为textarea，且在一个"position:fixed"的区域，需要指明为true（默认false）
 * @property {Boolean} disabled 是否不可输入（默认false）
 * @property {Number String} maxlength 最大输入长度，设置为 -1 的时候不限制最大长度（默认140）
 * @property {String} confirm-type 设置键盘右下角按钮的文字，仅在type="text"时生效（默认done）
 * @event {Function} input 输入框内容发生变化时触发
 * @event {Function} focus 输入框获得焦点时触发
 * @event {Function} blur 输入框失去焦点时触发
 * @event {Function} confirm 点击完成按钮时触发
 * @event {Function} right-icon-click 通过right-icon生成的图标被点击时触发
 * @event {Function} click 输入框被点击或者通过right-icon生成的图标被点击时触发，这样设计是考虑到传递右边的图标，一般都为需要弹出"picker"等操作时的场景，点击倒三角图标，理应发出此事件，见上方说明
 * @example <u-field v-model="mobile" label="手机号" required :error-message="errorMessage"></u-field>
 */

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'confirm', 'right-icon-click', 'click']);

/**
 * field 输入框
 * @description 借助此组件，可以实现表单的输入， 有"text"和"textarea"类型的，此外，借助uView的picker和actionSheet组件可以快速实现上拉菜单，时间，地区选择等， 为表单解决方案的利器。
 * @property {string} icon label左边的图标，限uView的图标名称
 * @property {string} rightIcon 输入框右边的图标名称，限uView的图标名称（默认false）
 * @property {boolean} required 是否必填，左边显示红色"*"号（默认false）
 * @property {string} label 输入框左边的文字提示
 * @property {boolean} password 是否密码输入方式(用点替换文字)，type为text时有效（默认false）
 * @property {boolean} clearable 是否显示右侧清空内容的图标控件（默认true）
 * @property {number|string} labelWidth label的宽度，单位rpx（默认130）
 * @property {string} labelAlign label的文字对齐方式（默认left）
 * @property {string} inputAlign 输入框内容对齐方式（默认left）
 * @property {string} iconColor 左边通过icon配置的图标的颜色（默认#606266）
 * @property {boolean} autoHeight 是否自动增高输入区域，type为textarea时有效（默认true）
 * @property {string|boolean} errorMessage 显示的错误提示内容，如果为空字符串或者false，则不显示错误信息
 * @property {string} placeholder 输入框的提示文字
 * @property {string} placeholderStyle placeholder的样式(内联样式，字符串)，如"color: #ddd"
 * @property {boolean} focus 是否自动获得焦点（默认false）
 * @property {boolean} fixed 如果type为textarea，且在一个"position:fixed"的区域，需要指明为true（默认false）
 * @property {boolean} disabled 是否不可输入（默认false）
 * @property {number|string} maxlength 最大输入长度，设置为 -1 的时候不限制最大长度（默认140）
 * @property {string} confirmType 设置键盘右下角按钮的文字，仅在type="text"时生效（默认done）
 * @property {string} labelPosition label位置（默认left）
 * @property {Record<string, any>} fieldStyle 自定义输入框的样式，对象形式
 * @property {number|string} clearSize 清除图标的大小，单位rpx（默认30）
 * @property {Record<string, any>} iconStyle 左侧图标样式
 * @property {boolean} borderTop 是否显示field的上边框（默认false）
 * @property {boolean} borderBottom 是否显示field的下边框（默认true）
 * @property {boolean} trim 是否自动去除输入内容首尾空格（默认true）
 * @property {string|number} value 输入框绑定值
 * @property {string} type 输入框类型（text/textarea/password等，默认text）
 */
const props = defineProps(FieldProps);

const focused = ref(false);
const itemIndex = ref(0);

const inputWrapStyle = computed(() => {
    const style: Record<string, string> = {};
    style.textAlign = props.inputAlign;
    // 判断label的位置，如果是left的话，让input左边两边有间隙
    if (props.labelPosition === 'left') {
        style.margin = '0 8rpx';
    } else {
        // 如果label是top的，input的左边就没必要有间隙了
        style.marginRight = '8rpx';
    }
    return style;
});

const rightIconStyle = computed(() => {
    const style: Record<string, string> = {};
    // 方向属性已注释，保留原有逻辑
    if (props.arrowDirection === 'top') style.transform = 'rotate(-90deg)';
    if (props.arrowDirection === 'bottom') style.transform = 'rotate(90deg)';
    else style.transform = 'rotate(0deg)';
    return style;
});

const labelStyle = computed(() => {
    const style: Record<string, string> = {};
    if (props.labelAlign === 'left') style.justifyContent = 'flex-start';
    if (props.labelAlign === 'center') style.justifyContent = 'center';
    if (props.labelAlign === 'right') style.justifyContent = 'flex-end';
    return style;
});

// uni不支持在computed中写style.justifyContent = 'center'的形式，故用此方法
const justifyContent = computed(() => {
    if (props.labelAlign === 'left') return 'flex-start';
    if (props.labelAlign === 'center') return 'center';
    if (props.labelAlign === 'right') return 'flex-end';
    return 'flex-start';
});

// 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
const inputMaxlength = computed(() => Number(props.maxlength));

// label的位置
const fieldInnerStyle = computed(() => {
    const style: Record<string, string> = {};
    style.flexDirection = props.labelPosition === 'left' ? 'row' : 'column';
    return style;
});

function onInput(event: any) {
    // 兼容 uni-app input/textarea 事件参数
    let value = event?.detail?.value ?? '';
    // 判断是否去除空格
    if (props.trim) value = $u.trim(value);
    emit('update:modelValue', value);
}

function onFocus(event: any) {
    focused.value = true;
    emit('focus', event);
}

function onBlur(event: any) {
    // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
    // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
    setTimeout(() => {
        focused.value = false;
    }, 100);
    emit('blur', event);
}

function onConfirm(e: any) {
    emit('confirm', e?.detail?.value ?? '');
}

function onClear() {
    emit('update:modelValue', '');
}

function rightIconClick() {
    emit('right-icon-click');
    emit('click');
}

function fieldClick() {
    emit('click');
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-field {
    font-size: 28rpx;
    padding: 20rpx 28rpx;
    text-align: left;
    position: relative;
    color: $u-main-color;
}

.u-field-inner {
    @include vue-flex;
    align-items: center;
}

.u-textarea-inner {
    align-items: flex-start;
}

.u-textarea-class {
    min-height: 96rpx;
    width: auto;
    font-size: 28rpx;
}

.fild-body {
    @include vue-flex;
    flex: 1;
    align-items: center;
}

.u-arror-right {
    margin-left: 8rpx;
}

.u-label-text {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
}

.u-label-left-gap {
    margin-left: 6rpx;
}

.u-label-postion-top {
    flex-direction: column;
    align-items: flex-start;
}

.u-label {
    width: 130rpx;
    flex: 1 1 130rpx;
    text-align: left;
    position: relative;
    @include vue-flex;
    align-items: center;
}

.u-required::before {
    content: '*';
    position: absolute;
    left: -16rpx;
    font-size: 14px;
    color: $u-type-error;
    height: 9px;
    line-height: 1;
}

.u-field__input-wrap {
    position: relative;
    overflow: hidden;
    font-size: 28rpx;
    height: 48rpx;
    flex: 1;
    width: auto;
}

.u-clear-icon {
    @include vue-flex;
    align-items: center;
}

.u-error-message {
    color: $u-type-error;
    font-size: 26rpx;
    text-align: left;
}

.placeholder-style {
    color: rgb(150, 151, 153);
}

.u-input-class {
    font-size: 28rpx;
}

.u-button-wrap {
    margin-left: 8rpx;
}
</style>
