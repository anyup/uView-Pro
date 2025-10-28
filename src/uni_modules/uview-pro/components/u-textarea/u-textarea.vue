<template>
    <view
        class="u-textarea"
        :class="[
            {
                'u-textarea--error': validateState
            },
            textareaClass,
            customClass
        ]"
        :style="$u.toStyle(textareaStyle, customStyle)"
    >
        <textarea
            class="u-textarea__field"
            :value="innerValue"
            :style="getStyle"
            :placeholder="props.placeholder"
            :placeholder-style="$u.toStyle(props.placeholderStyle)"
            :placeholder-class="props.placeholderClass"
            :disabled="props.disabled"
            :focus="props.focus"
            :autoHeight="props.autoHeight"
            :fixed="props.fixed"
            :cursorSpacing="props.cursorSpacing"
            :cursor="props.cursor"
            :showConfirmBar="props.showConfirmBar"
            :selectionStart="props.selectionStart"
            :selectionEnd="props.selectionEnd"
            :adjustPosition="props.adjustPosition"
            :disableDefaultPadding="props.disableDefaultPadding"
            :holdKeyboard="props.holdKeyboard"
            :maxlength="props.maxlength"
            :confirmType="props.confirmType"
            :ignoreCompositionEvent="props.ignoreCompositionEvent"
            @focus="onFocus"
            @blur="onBlur"
            @linechange="onLinechange"
            @input="onInput"
            @confirm="onConfirm"
            @keyboardheightchange="onKeyboardheightchange"
        ></textarea>
        <text
            class="u-textarea__count"
            :style="{
                'background-color': props.disabled ? 'transparent' : '#fff'
            }"
            v-if="props.count"
        >
            {{ innerValue.length }}/{{ props.maxlength }}
        </text>

        <view class="u-textarea__right-icon u-flex">
            <view
                class="u-textarea__right-icon__clear u-textarea__right-icon__item"
                v-if="clearable && modelValue != '' && !disabled"
            >
                <u-icon size="32" name="close-circle-fill" color="#c0c4cc" @click="onClear" />
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-textarea',
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
import { ref, computed, watch, nextTick } from 'vue';
import { TextareaProps } from './types';
import { $u, useChildren } from '../../';

/**
 * Textarea 文本域
 * @description 文本域此组件满足了可能出现的表单信息补充，编辑等实际逻辑的功能，内置了字数校验等
 * @tutorial https://uviewpro.cn/zh/components/textarea.html
 * @property {String | Number} 		value					输入框的内容
 * @property {String | Number}		placeholder				输入框为空时占位符
 * @property {String}			    placeholderClass		指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ （ 默认 'input-placeholder' ）
 * @property {String | Object}	    placeholderStyle		指定placeholder的样式，字符串/对象形式，如"color: red;"
 * @property {String | Number}		height					输入框高度（默认 70 ）
 * @property {String}				confirmType				设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效（默认 'done' ）
 * @property {Boolean}				disabled				是否禁用（默认 false ）
 * @property {Boolean}				count					是否显示统计字数（默认 false ）
 * @property {Boolean}				focus					是否自动获取焦点，nvue不支持，H5取决于浏览器的实现（默认 false ）
 * @property {Boolean | Function}	autoHeight				是否自动增加高度（默认 false ）
 * @property {Boolean}				fixed					如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true（默认 false ）
 * @property {Number}				cursorSpacing			指定光标与键盘的距离（默认 0 ）
 * @property {String | Number}		cursor					指定focus时的光标位置
 * @property {Function}			    formatter			    内容式化函数
 * @property {Boolean}				showConfirmBar			是否显示键盘上方带有”完成“按钮那一栏，（默认 true ）
 * @property {Number}				selectionStart			光标起始位置，自动聚焦时有效，需与selection-end搭配使用，（默认 -1 ）
 * @property {Number | Number}		selectionEnd			光标结束位置，自动聚焦时有效，需与selection-start搭配使用（默认 -1 ）
 * @property {Boolean}				adjustPosition			键盘弹起时，是否自动上推页面（默认 true ）
 * @property {Boolean | Number}		disableDefaultPadding	是否去掉 iOS 下的默认内边距，只微信小程序有效（默认 false ）
 * @property {Boolean}				holdKeyboard			focus时，点击页面的时候不收起键盘，只微信小程序有效（默认 false ）
 * @property {String | Number}		maxlength				最大输入长度，设置为 -1 的时候不限制最大长度（默认 140 ）
 * @property {String}				border					边框类型，surround-四周边框，none-无边框，bottom-底部边框（默认 'surround' ）
 * @property {Boolean}				ignoreCompositionEvent	是否忽略组件内对文本合成系统事件的处理
 * @event {Function(e)} focus					输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
 * @event {Function(e)} blur					输入框失去焦点时触发，event.detail = {value, cursor}
 * @event {Function(e)} linechange				输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0}
 * @event {Function(e)} input					当键盘输入时，触发 input 事件
 * @event {Function(e)} confirm					点击完成时， 触发 confirm 事件
 * @event {Function(e)} keyboardheightchange	键盘高度发生变化的时候触发此事件
 * @example <u-textarea v-model="value1" placeholder="请输入内容" ></u-textarea>
 */

const props = defineProps(TextareaProps);
const emit = defineEmits([
    'update:modelValue',
    'focus',
    'blur',
    'linechange',
    'input',
    'confirm',
    'keyboardheightchange',
    'change'
]);

const { emitToParent } = useChildren('u-textarea', 'u-form-item');

// state
const innerValue = ref('');
const focused = ref(false);
const firstChange = ref(true);
const changeFromInner = ref(false);
const innerFormatter = ref((v: any) => v);
const validateState = ref(props.validateState); // 当前input的验证状态，用于错误时，边框是否改为红色

// watch value prop
watch(
    () => props.modelValue,
    (newVal: any) => {
        innerValue.value = newVal;
        /* #ifdef H5 */
        // 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
        if (firstChange.value === false && changeFromInner.value === false) {
            valueChange();
        }
        /* #endif */
        firstChange.value = false;
        // 重置changeFromInner的值为false，标识下一次引起默认为外部引起的
        changeFromInner.value = false;
    },
    { immediate: true }
);

// 监听 validateState 变化
watch(
    () => props.validateState,
    val => {
        validateState.value = val;
    }
);

// 组件的类名
const textareaClass = computed(() => {
    let classes: string[] = [];
    if (props.border) {
        if (props.border === 'surround') {
            classes = classes.concat(['u-textarea--border', 'u-textarea--radius']);
        } else if (props.border === 'bottom') {
            classes = classes.concat(['u-border-bottom', 'u-textarea--no-radius']);
        } else {
            classes = classes.concat(['u-textarea--border', 'u-textarea--radius']);
        }
    }
    props.disabled && classes.push('u-textarea--disabled');
    return classes.join(' ');
});

// 组件的样式
const textareaStyle = computed(() => {
    const style: Record<string, any> = {};
    if (props.border) {
        style.padding = `${props.border ? 20 : 0}rpx`;
    }
    // #ifdef APP-NVUE
    if ($u.os() === 'android') {
        style.paddingTop = '6px';
        style.paddingLeft = '9px';
        style.paddingBottom = '3px';
        style.paddingRight = '6px';
    }
    // #endif
    return style;
});

const getStyle = computed(() => {
    let style: Record<string, any> = {};
    // 如果没有自定义高度，就根据textarea来分配一个默认的高度
    if (props.autoHeight) {
        style.minHeight = $u.addUnit(props.height || '100rpx');
        style.height = 'auto';
    } else {
        style.height = $u.addUnit(props.height);
    }
    return $u.toStyle(style, props.customStyle);
});

function onFormItemError(status: boolean) {
    validateState.value = status;
}

// methods
function setFormatter(e: any) {
    innerFormatter.value = e;
}

function onFocus(e: any) {
    emit('focus', e);
}

function onBlur(e: any) {
    setTimeout(() => {
        e.detail.value = innerValue.value;
        let value = e.detail.value;
        emit('blur', e);
        emitToParent('onFormBlur', value);
    }, 40);
}

function onLinechange(e: any) {
    emit('linechange', e);
}

function onInput(e: any) {
    let { value = '' } = e.detail || {};
    // 格式化过滤方法
    const formatter = props.formatter || innerFormatter.value;
    const formatValue = typeof formatter === 'function' ? formatter(value) : value;
    // 为了避免props的单向数据流特性，需要先将innerValue值设置为当前值，再在$nextTick中重新赋予设置后的值才有效
    innerValue.value = value;
    nextTick(() => {
        innerValue.value = formatValue;
        valueChange();
    });
}

function valueChange() {
    const value = innerValue.value;
    nextTick(() => {
        emit('input', value);
        emit('update:modelValue', value);
        // 标识value值的变化是由内部引起的
        changeFromInner.value = true;
        emit('change', value);
        emitToParent('onFormChange', value);
    });
}

function onConfirm(e: any) {
    emit('confirm', e);
}

function onKeyboardheightchange(e: any) {
    emit('keyboardheightchange', e);
}
function onClear(event: any) {
    try {
        event.stopPropagation();
    } catch (e) {
        console.log(e);
    }
    innerValue.value = '';
    valueChange();
}

defineExpose({
    onFormItemError
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-textarea {
    border-radius: 4px;
    background-color: #fff;
    position: relative;
    @include flex;
    flex: 1;

    &--border {
        border-radius: 4px;
        border: 1px solid $u-form-item-border-color;
    }

    &--error {
        border-color: $u-type-error !important;
    }

    &--radius {
        border-radius: 4px;
    }

    &--no-radius {
        border-radius: 0;
    }

    &--disabled {
        background-color: #f5f7fa;
    }

    &__field {
        flex: 1;
        font-size: 28rpx;
        color: $u-content-color;
        width: 100%;
    }

    &__count {
        position: absolute;
        right: 1px;
        bottom: 0;
        font-size: 12px;
        color: $u-tips-color;
        background-color: #ffffff;
        padding: 1px 4px;
        border-radius: 10px;
        line-height: 16px;
    }

    &__right-icon {
        &__item {
            margin-left: 10rpx;
        }
    }
}
</style>
