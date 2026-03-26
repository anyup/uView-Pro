import type { ExtractPropTypes, PropType } from 'vue';
import type { FormRules, InputAlign, FormErrorType, InputLabelPosition, SizeType } from '../../types/global';

/**
 * u-form 组件 Props 类型定义
 * @description 表单组件属性
 */
export const FormProps = {
    /** 自定义根节点样式 */
    customStyle: {
        type: [String, Object] as PropType<string | Record<string, any>>,
        default: () => ({})
    },
    /** 自定义根节点样式类 */
    customClass: {
        type: String as unknown as PropType<string>,
        default: ''
    },
    /** 当前form的需要验证字段的集合 */
    model: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 表单验证规则 */
    rules: { type: Object as PropType<FormRules>, default: () => ({}) },
    /** 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，border-bottom-下边框呈现红色，none-无提示 */
    errorType: { type: Array as PropType<FormErrorType[]>, default: () => ['message', 'toast'] },
    /** 是否显示表单域的下划线边框 */
    borderBottom: { type: Boolean, default: true },
    /** label的位置，left-左边，top-上边 */
    labelPosition: { type: String as PropType<InputLabelPosition>, default: 'left' },
    /** label的宽度，单位rpx */
    labelWidth: { type: [String, Number] as PropType<string | number>, default: 90 },
    /** label字体的对齐方式 */
    labelAlign: { type: String as PropType<InputAlign>, default: 'left' },
    /** label的样式，对象形式 */
    labelStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 表单内组件的大小，仅支持预设值 default/small/large（默认 default） */
    size: { type: String as PropType<SizeType>, default: 'default' }
};

export type FormProps = ExtractPropTypes<typeof FormProps>;
