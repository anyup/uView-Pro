import type { ExtractPropTypes, PropType } from 'vue';
import type { InputAlign, InputConfirmType, InputLabelPosition, InputType } from '../../types/global';

/**
 * u-field 组件 Props 类型定义
 * @description 表单输入框属性
 */
export const FieldProps = {
    /** label左边的图标，限uView的图标名称 */
    icon: String,
    /** 输入框右边的图标名称，限uView的图标名称（默认false） */
    rightIcon: String,
    /** 方向属性 */
    arrowDirection: { type: String, default: 'right' },
    /** 是否必填，左边显示红色"*"号（默认false） */
    required: Boolean,
    /** 输入框左边的文字提示 */
    label: String,
    /** 是否密码输入方式(用点替换文字)，type为text时有效（默认false） */
    password: Boolean,
    /** 是否显示右侧清空内容的图标控件（默认true） */
    clearable: { type: Boolean, default: true },
    /** label的宽度，单位rpx（默认130） */
    labelWidth: { type: [Number, String] as PropType<string | number>, default: 130 },
    /** label的文字对齐方式（默认left） */
    labelAlign: { type: String as PropType<InputAlign>, default: 'left' },
    /** 输入框内容对齐方式（默认left） */
    inputAlign: { type: String as PropType<InputAlign>, default: 'left' },
    /** 左边通过icon配置的图标的颜色（默认#606266） */
    iconColor: { type: String, default: '#606266' },
    /** 是否自动增高输入区域，type为textarea时有效（默认true） */
    autoHeight: { type: Boolean, default: true },
    /** 显示的错误提示内容，如果为空字符串或者false，则不显示错误信息 */
    errorMessage: { type: [String, Boolean] as PropType<string | boolean>, default: '' },
    /** 输入框的提示文字 */
    placeholder: String,
    /** placeholder的样式(内联样式，字符串)，如"color: #ddd" */
    placeholderStyle: String,
    /** 是否自动获得焦点（默认false） */
    focus: Boolean,
    /** 如果type为textarea，且在一个"position:fixed"的区域，需要指明为true（默认false） */
    fixed: Boolean,
    /** 输入框绑定值 */
    modelValue: [Number, String],
    /** 输入框类型（text/textarea/password等，默认text） */
    type: { type: String as PropType<InputType>, default: 'text' },
    /** 是否不可输入（默认false） */
    disabled: { type: Boolean, default: false },
    /** 最大输入长度，设置为 -1 的时候不限制最大长度（默认140） */
    maxlength: { type: [Number, String] as PropType<string | number>, default: 140 },
    /** 设置键盘右下角按钮的文字，仅在type="text"时生效（默认done） */
    confirmType: { type: String as PropType<InputConfirmType>, default: 'done' },
    /** label位置（默认left）left-左边，top-上边 */
    labelPosition: { type: String as PropType<InputLabelPosition>, default: 'left' },
    /** 自定义输入框的样式，对象形式 */
    fieldStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 清除图标的大小，单位rpx（默认30） */
    clearSize: { type: [Number, String] as PropType<string | number>, default: 30 },
    /** 左侧图标样式 */
    iconStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 是否显示field的上边框（默认false） */
    borderTop: { type: Boolean, default: false },
    /** 是否显示field的下边框（默认true） */
    borderBottom: { type: Boolean, default: true },
    /** 是否自动去除输入内容首尾空格（默认true） */
    trim: { type: Boolean, default: true }
};

export type FieldProps = ExtractPropTypes<typeof FieldProps>;
