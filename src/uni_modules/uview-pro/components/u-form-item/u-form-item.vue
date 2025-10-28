<template>
    <view
        class="u-form-item"
        :class="[
            {
                'u-border-bottom': elBorderBottom,
                'u-form-item__border-bottom--error': validateState === 'error' && showError('border-bottom'),
                'u-form-item__border--error': validateState === 'error' && showError('border')
            },
            customClass
        ]"
        :style="$u.toStyle(customStyle)"
    >
        <view
            class="u-form-item__body"
            :style="{
                flexDirection: elLabelPosition == 'left' ? 'row' : 'column'
            }"
        >
            <!-- 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" -->
            <view
                class="u-form-item--left"
                :style="{
                    width: uLabelWidth,
                    flex: `0 0 ${uLabelWidth}`,
                    marginBottom: elLabelPosition == 'left' ? 0 : '10rpx'
                }"
            >
                <!-- 为了块对齐 -->
                <view class="u-form-item--left__content" v-if="required || leftIcon || label">
                    <!-- nvue不支持伪元素before -->
                    <text v-if="required" class="u-form-item--left__content--required">*</text>
                    <view class="u-form-item--left__content__icon" v-if="leftIcon">
                        <u-icon :name="leftIcon" :custom-style="leftIconStyle"></u-icon>
                    </view>
                    <view
                        class="u-form-item--left__content__label"
                        :style="[
                            elLabelStyle,
                            {
                                'justify-content':
                                    elLabelAlign == 'left'
                                        ? 'flex-start'
                                        : elLabelAlign == 'center'
                                          ? 'center'
                                          : 'flex-end'
                            }
                        ]"
                    >
                        {{ label }}
                    </view>
                </view>
            </view>
            <view class="u-form-item--right u-flex">
                <view class="u-form-item--right__content">
                    <view class="u-form-item--right__content__slot">
                        <slot />
                    </view>
                    <view class="u-form-item--right__content__icon u-flex" v-if="$slots.right || rightIcon">
                        <u-icon :custom-style="rightIconStyle" v-if="rightIcon" :name="rightIcon"></u-icon>
                        <slot name="right" />
                    </view>
                </view>
            </view>
        </view>
        <view
            class="u-form-item__message"
            v-if="validateState === 'error' && showError('message')"
            :style="{
                paddingLeft: elLabelPosition == 'left' ? $u.addUnit(elLabelWidth) : '0'
            }"
            >{{ validateMessage }}</view
        >
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-form-item',
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
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { $u, useChildren, useParent } from '../..';
// @ts-ignore
import schema from '../../libs/util/async-validator';
import { FormItemProps } from './types';
// 去除警告信息
schema.warning = function () {};

const { broadcast } = useParent('u-form-item');

/**
 * form-item 表单item
 * @description 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。
 * @tutorial https://uviewpro.cn/zh/components/form.html
 * @property {String} label 左侧提示文字
 * @property {Object} prop 表单域model对象的属性名，在使用 validate、resetFields 方法的情况下，该属性是必填的
 * @property {Boolean} border-bottom 是否显示表单域的下划线边框
 * @property {String} label-position 表单域提示文字的位置，left-左侧，top-上方
 * @property {String Number} label-width 提示文字的宽度，单位rpx（默认90）
 * @property {Object} label-style label的样式，对象形式
 * @property {String} label-align label的对齐方式
 * @property {String} right-icon 右侧自定义字体图标(限uView内置图标)或图片地址
 * @property {String} left-icon 左侧自定义字体图标(限uView内置图标)或图片地址
 * @property {Object} left-icon-style 左侧图标的样式，对象形式
 * @property {Object} right-icon-style 右侧图标的样式，对象形式
 * @property {Boolean} required 是否显示左边的"*"号，这里仅起展示作用，如需校验必填，请通过rules配置必填规则(默认false)
 * @example <u-form-item label="姓名"><u-input v-model="form.name" /></u-form-item>
 */

const props = defineProps(FormItemProps);

const { parentExposed } = useChildren('u-form-item', 'u-form');

// 组件状态
const initialValue = ref(''); // 存储初始值，用于重置
const validateState = ref(''); // 校验状态 success/error/validating
const validateMessage = ref(''); // 校验失败的提示语
const errorType = ref<string[]>(['message']); // 错误提示方式，默认 message
const fieldValue = ref(''); // 当前表单项的值
const parentData = ref({
    borderBottom: true, // 父表单下划线边框
    labelWidth: 90, // 父表单 label 宽度
    labelPosition: 'left', // 父表单 label 位置
    labelStyle: {}, // 父表单 label 样式
    labelAlign: 'left' // 父表单 label 对齐
});

// 显示错误提示
// errorType: ['message', 'toast', 'border-bottom', 'none']
const showError = computed(() => (type: string) => {
    // 如果errorType数组中含有none，或者toast提示类型
    if (errorType.value.indexOf('none') >= 0) return false;
    else if (errorType.value.indexOf(type) >= 0) return true;
    else return false;
});

// 监听校验状态和父表单 errorType 变化
watch(validateState, () => {
    broadcastInputError();
});

// 监听u-form组件的errorType的变化
watch(
    () => parentExposed?.value?.props?.errorType,
    val => {
        if (val) errorType.value = val;
        broadcastInputError();
    },
    { immediate: true }
);

// 计算属性
const uLabelWidth = computed(() => {
    // 如果用户设置label为空字符串(微信小程序空字符串最终会变成字符串的'true')，意味着要将label的位置宽度设置为auto
    return elLabelPosition.value == 'left'
        ? props.label === 'true' || props.label === ''
            ? 'auto'
            : $u.addUnit(elLabelWidth.value)
        : '100%';
});

// label的宽度
const elLabelWidth = computed(() => {
    // label默认宽度为90，优先使用本组件的值，如果没有(如果设置为0，也算是配置了值，依然起效)，则用u-form的值
    return props.labelWidth != 0 && props.labelWidth !== ''
        ? props.labelWidth
        : parentData.value.labelWidth
          ? parentData.value.labelWidth
          : 90;
});

// label的样式
const elLabelStyle = computed(() => {
    return Object.keys(props.labelStyle).length
        ? props.labelStyle
        : parentData.value.labelStyle
          ? parentData.value.labelStyle
          : {};
});

// label的位置，左侧或者上方
const elLabelPosition = computed(() => {
    return props.labelPosition
        ? props.labelPosition
        : parentData.value.labelPosition
          ? parentData.value.labelPosition
          : 'left';
});

// label的对齐方式
const elLabelAlign = computed(() => {
    return props.labelAlign ? props.labelAlign : parentData.value.labelAlign ? parentData.value.labelAlign : 'left';
});

// label的下划线
const elBorderBottom = computed(() => {
    // 子组件的borderBottom默认为空字符串，如果不等于空字符串，意味着子组件设置了值，优先使用子组件的值
    return props.borderBottom !== ''
        ? props.borderBottom
        : parentData.value.borderBottom
          ? parentData.value.borderBottom
          : true;
});

// 事件派发/广播工具
function broadcastInputError() {
    // 子组件发出事件，参数为true或者false，true代表有错误
    broadcast('onFormItemError', validateState.value === 'error' && showError.value('border'));
}

/**
 * 获取当前u-form-item的校验规则
 */
function getRules() {
    // 父组件的所有规则
    let rules = parentExposed?.value?.rules?.value || {};
    rules = rules ? rules[props.prop] : [];
    // 保证返回的是一个数组形式
    return [].concat(rules || []);
}

// blur事件时进行表单校验
function onFieldBlur() {
    validation('blur');
}

// change事件进行表单校验
function onFieldChange() {
    validation('change');
}

function onFormBlur() {
    onFieldBlur();
}

function onFormChange() {
    onFieldChange();
}

/**
 * 过滤出符合要求的rule规则
 * @param triggerType 触发类型
 */
function getFilteredRule(triggerType = '') {
    // 获取所有规则
    const rules = getRules();
    // 整体验证表单时，triggerType为空字符串，此时返回所有规则进行验证
    if (!triggerType) return rules;
    // 历遍判断规则是否有对应的事件，比如blur，change触发等的事件
    // 使用indexOf判断，是因为某些时候设置的验证规则的trigger属性可能为多个，比如['blur','change']
    // 某些场景可能的判断规则，可能不存在trigger属性，故先判断是否存在此属性
    return rules.filter((res: any) => res.trigger && res.trigger.indexOf(triggerType) !== -1);
}

/**
 * 校验数据
 * @param trigger 触发类型
 * @param callback 校验回调
 */
function validation(trigger: string, callback: (msg: string) => void = () => {}) {
    // 检验之前，先获取需要校验的值
    fieldValue.value = parentExposed?.value?.model?.value[props.prop];
    // blur和change是否有当前方式的校验规则
    let rules = getFilteredRule(trigger);
    // 判断是否有验证规则，如果没有规则，也调用回调方法，否则父组件u-form会因为
    // 对count变量的统计错误而无法进入上一层的回调
    if (!rules || rules.length === 0) {
        callback('');
        return;
    }
    // 设置当前的状态，标识为校验中
    validateState.value = 'validating';
    // 调用async-validator的方法
    let validator = new schema({ [props.prop]: rules });
    validator.validate({ [props.prop]: fieldValue.value }, { firstFields: true }, (errors: any, fields: any) => {
        // 记录状态和报错信息
        validateState.value = !errors ? 'success' : 'error';
        validateMessage.value = errors ? errors[0].message : '';
        // 调用回调方法
        callback(validateMessage.value);
    });
}

/**
 * 清空当前的u-form-item
 */
function resetField() {
    if (parentExposed?.value?.model?.value && props.prop) {
        parentExposed.value.model.value[props.prop] = initialValue.value;
    }
    // 设置为`success`状态，只是为了清空错误标记
    // 延时50毫秒，如果立即清空状态，则无法清空错误标记
    setTimeout(() => {
        validateState.value = 'success';
    }, 50);
}

// 组件挂载时注册到父表单
onMounted(() => {
    nextTick(() => {
        if (parentExposed.value) {
            // 继承父表单配置
            // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
            Object.keys(parentData.value).forEach(key => {
                parentData.value[key] = parentExposed?.value?.props[key];
            });
            // 如果没有传入prop，或者uForm为空(如果u-form-input单独使用，就不会有uForm注入)，就不进行校验
            if (props.prop) {
                // 将本实例添加到父组件中
                parentExposed?.value?.addField &&
                    parentExposed?.value?.addField({
                        validation,
                        resetField,
                        prop: props.prop
                    });
                errorType.value = parentExposed?.value?.errorType || errorType.value;
                // 设置初始值
                fieldValue.value = parentExposed?.value?.model?.value[props.prop];
                // 设置初始值
                initialValue.value = fieldValue.value;
            }
        }
    });
});
// 组件销毁前，将实例从u-form的缓存中移除
onBeforeUnmount(() => {
    // 如果当前没有prop的话表示当前不要进行删除（因为没有注入）
    if (parentExposed?.value && props.prop) {
        parentExposed?.value?.removeField({ prop: props.prop });
    }
});

defineExpose({
    validation,
    resetField,
    onFormBlur,
    onFormChange
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-form-item {
    @include vue-flex;
    // align-items: flex-start;
    padding: 20rpx 0;
    font-size: 28rpx;
    color: $u-main-color;
    box-sizing: border-box;
    // line-height: $u-form-item-height;
    flex-direction: column;

    &__border-bottom--error:after {
        border-color: $u-type-error;
    }

    &__border--error {
        :deep(.u-input--border) {
            border-color: $u-type-error !important;
        }
    }

    &__body {
        @include vue-flex;
    }

    &--left {
        @include vue-flex;
        align-items: center;

        &__content {
            position: relative;
            @include vue-flex;
            align-items: center;
            padding-right: 10rpx;
            flex: 1;

            &__icon {
                margin-right: 8rpx;
            }

            &--required {
                position: absolute;
                left: -16rpx;
                vertical-align: middle;
                color: $u-type-error;
                padding-top: 6rpx;
            }

            &__label {
                @include vue-flex;
                align-items: center;
                flex: 1;
            }
        }
    }

    &--right {
        flex: 1;

        &__content {
            @include vue-flex;
            align-items: center;
            flex: 1;

            &__slot {
                flex: 1;
                /* #ifndef MP */
                @include vue-flex;
                align-items: center;
                /* #endif */
            }

            &__icon {
                margin-left: 10rpx;
                color: $u-light-color;
                font-size: 30rpx;
            }
        }
    }

    &__message {
        font-size: 24rpx;
        line-height: 24rpx;
        color: $u-type-error;
        margin-top: 12rpx;
    }
}
</style>
