import type { PropType, ExtractPropTypes } from 'vue';
import type { InputAlign, InputLabelPosition } from '../../types/global';

/**
 * form-item 表单item Props
 */
export const FormItemProps = {
    /** input的label提示语 */
    label: {
        type: String,
        default: ''
    },
    /** 绑定的值 */
    prop: {
        type: String,
        default: ''
    },
    /** 是否显示表单域的下划线边框 */
    borderBottom: {
        type: [String, Boolean] as PropType<string | boolean>,
        default: ''
    },
    /** label的位置，left-左边，top-上边 */
    labelPosition: {
        type: String as PropType<InputLabelPosition>,
        default: ''
    },
    /** label的宽度，单位rpx */
    labelWidth: {
        type: [String, Number] as PropType<string | number>,
        default: ''
    },
    /** label的样式，对象形式 */
    labelStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    /** label字体的对齐方式 */
    labelAlign: {
        type: String as PropType<InputAlign>,
        default: ''
    },
    /** 右侧图标 */
    rightIcon: {
        type: String,
        default: ''
    },
    /** 左侧图标 */
    leftIcon: {
        type: String,
        default: ''
    },
    /** 左侧图标的样式 */
    leftIconStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    /** 右侧图标的样式 */
    rightIconStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    /** 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置 */
    required: {
        type: Boolean,
        default: false
    }
};

export type FormItemProps = ExtractPropTypes<typeof FormItemProps>;
