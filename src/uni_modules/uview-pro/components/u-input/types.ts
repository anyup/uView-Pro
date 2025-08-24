import type { ExtractPropTypes, PropType } from 'vue';
import type { InputAlign, InputConfirmType, InputType } from '../../types/global';

/**
 * u-input 组件 props 类型定义
 * @description 此组件为一个输入框，默认没有边框和样式，是专门为配合表单组件u-form而设计的，利用它可以快速实现表单验证，输入内容，下拉选择等功能。
 */

export const InputProps = {
    /** 用于双向绑定输入框的值 */
    modelValue: {
        type: [String, Number] as PropType<string | number>,
        default: ''
    },
    /** 输入框的类型，textarea，text，number */
    type: {
        type: String as PropType<InputType>,
        default: 'text'
    },
    /** 输入框文字的对齐方式(默认left) */
    inputAlign: {
        type: String as PropType<InputAlign>,
        default: 'left'
    },
    /** placeholder显示值(默认 '请输入内容') */
    placeholder: {
        type: String,
        default: '请输入内容'
    },
    /** 是否禁用输入框(默认false) */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 输入框的最大可输入长度(默认140) */
    maxlength: {
        type: [Number, String] as PropType<number | string>,
        default: 140
    },
    /** placeholder的样式，字符串形式，如"color: red;"(默认 "color: #c0c4cc;") */
    placeholderStyle: {
        type: String,
        default: 'color: #c0c4cc;'
    },
    /** 设置键盘右下角按钮的文字，仅在type为text时生效(默认done) */
    confirmType: {
        type: String as PropType<InputConfirmType>,
        default: 'done'
    },
    /** 自定义输入框的样式，对象形式 */
    customStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    /** 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true */
    fixed: {
        type: Boolean,
        default: false
    },
    /** 是否自动获得焦点(默认false) */
    focus: {
        type: Boolean,
        default: false
    },
    /** 密码类型时，是否显示右侧的密码图标(默认true) */
    passwordIcon: {
        type: Boolean,
        default: true
    },
    /** input|textarea是否显示边框(默认false) */
    border: {
        type: Boolean,
        default: false
    },
    /** 输入框的边框颜色(默认#dcdfe6) */
    borderColor: {
        type: String,
        default: '#dcdfe6'
    },
    /** 是否自动增高输入区域，type为textarea时有效(默认true) */
    autoHeight: {
        type: Boolean,
        default: true
    },
    /** type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态 */
    selectOpen: {
        type: Boolean,
        default: false
    },
    /** 高度，单位rpx */
    height: {
        type: [Number, String] as PropType<number | string>,
        default: ''
    },
    /** 是否可清空(默认true) */
    clearable: {
        type: Boolean,
        default: true
    },
    /** 指定光标与键盘的距离，单位 px(默认0) */
    cursorSpacing: {
        type: [Number, String] as PropType<number | string>,
        default: 0
    },
    /** 光标起始位置，自动聚焦时有效，需与selection-end搭配使用（默认-1） */
    selectionStart: {
        type: [Number, String] as PropType<number | string>,
        default: -1
    },
    /** 光标结束位置，自动聚焦时有效，需与selection-start搭配使用（默认-1） */
    selectionEnd: {
        type: [Number, String] as PropType<number | string>,
        default: -1
    },
    /** 是否自动去除两端的空格(默认true) */
    trim: {
        type: Boolean,
        default: true
    },
    /** 是否显示键盘上方带有”完成“按钮那一栏(默认true) */
    showConfirmbar: {
        type: Boolean,
        default: true
    },
    /** 弹出键盘时是否自动调节高度，uni-app默认值是true */
    adjustPosition: {
        type: Boolean,
        default: true
    },
    /** 输入框的验证状态，用于错误时，边框是否改为红色 */
    validateState: {
        type: Boolean,
        default: false
    }
};

/**
 * u-input 组件 props 类型
 */
export type InputProps = ExtractPropTypes<typeof InputProps>;
