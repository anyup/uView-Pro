import type { ExtractPropTypes, PropType } from 'vue';
import type { InputAlign, InputErrorType, InputLabelPosition } from '../../types/global';

/**
 * u-form 组件 Props 类型定义
 * @description 表单组件属性
 */
export const FormProps = {
    /** 当前form的需要验证字段的集合 */
    model: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，border-bottom-下边框呈现红色，none-无提示 */
    errorType: { type: Array as PropType<InputErrorType[]>, default: () => ['message', 'toast'] },
    /** 是否显示表单域的下划线边框 */
    borderBottom: { type: Boolean, default: true },
    /** label的位置，left-左边，top-上边 */
    labelPosition: { type: String as PropType<InputLabelPosition>, default: 'left' },
    /** label的宽度，单位rpx */
    labelWidth: { type: [String, Number] as PropType<string | number>, default: 90 },
    /** lable字体的对齐方式 */
    labelAlign: { type: String as PropType<InputAlign>, default: 'left' },
    /** lable的样式，对象形式 */
    labelStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) }
};

export type FormProps = ExtractPropTypes<typeof FormProps>;
