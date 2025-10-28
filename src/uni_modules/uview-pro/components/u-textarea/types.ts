import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';

const textarea = {
    value: '',
    placeholder: '',
    placeholderClass: 'input-placeholder',
    placeholderStyle: 'color: #c0c4cc',
    height: '100rpx',
    confirmType: 'done',
    disabled: false,
    count: false,
    focus: false,
    autoHeight: false,
    fixed: false,
    cursorSpacing: 0,
    cursor: '',
    showConfirmBar: true,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    disableDefaultPadding: false,
    holdKeyboard: false,
    maxlength: 140,
    border: 'surround',
    formatter: null
};

export const TextareaProps = {
    ...baseProps,
    // 输入框的内容
    modelValue: { type: [String, Number] as PropType<string | number>, default: textarea.value },
    // 输入框为空时占位符
    placeholder: { type: [String, Number] as PropType<string | number>, default: textarea.placeholder },
    // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
    placeholderClass: { type: String as PropType<string>, default: textarea.placeholderClass },
    // 指定placeholder的样式
    placeholderStyle: {
        type: [String, Object] as PropType<string | Record<string, any>>,
        default: textarea.placeholderStyle
    },
    // 输入框高度
    height: { type: [String, Number] as PropType<string | number>, default: textarea.height },
    // 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
    confirmType: { type: String as PropType<string>, default: textarea.confirmType },
    // 是否禁用
    disabled: { type: Boolean as PropType<boolean>, default: textarea.disabled },
    // 是否显示统计字数
    count: { type: Boolean as PropType<boolean>, default: textarea.count },
    // 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
    focus: { type: Boolean as PropType<boolean>, default: textarea.focus },
    // 是否自动增加高度
    autoHeight: { type: Boolean as PropType<boolean>, default: textarea.autoHeight },
    // 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
    fixed: { type: Boolean as PropType<boolean>, default: textarea.fixed },
    // 指定光标与键盘的距离
    cursorSpacing: { type: Number as PropType<number>, default: textarea.cursorSpacing },
    // 指定focus时的光标位置
    cursor: { type: [String, Number] as PropType<string | number>, default: textarea.cursor },
    // 是否显示键盘上方带有”完成“按钮那一栏，
    showConfirmBar: { type: Boolean as PropType<boolean>, default: textarea.showConfirmBar },
    // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
    selectionStart: { type: Number as PropType<number>, default: textarea.selectionStart },
    // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
    selectionEnd: { type: Number as PropType<number>, default: textarea.selectionEnd },
    // 键盘弹起时，是否自动上推页面
    adjustPosition: { type: Boolean as PropType<boolean>, default: textarea.adjustPosition },
    // 是否去掉 iOS 下的默认内边距，只微信小程序有效
    disableDefaultPadding: { type: Boolean as PropType<boolean>, default: textarea.disableDefaultPadding },
    // focus时，点击页面的时候不收起键盘，只微信小程序有效
    holdKeyboard: { type: Boolean as PropType<boolean>, default: textarea.holdKeyboard },
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: { type: [String, Number] as PropType<string | number>, default: textarea.maxlength },
    // 边框类型，surround-四周边框，bottom-底部边框
    border: { type: [String, Boolean] as PropType<string | boolean>, default: textarea.border },
    // 用于处理或者过滤输入框内容的方法
    formatter: { type: Function as PropType<((val: any) => any) | null>, default: textarea.formatter },
    // 是否忽略组件内对文本合成系统事件的处理
    ignoreCompositionEvent: { type: Boolean as PropType<boolean>, default: true },
    /** 是否可清空(默认true) */
    clearable: { type: Boolean, default: true },
    /** 输入框的验证状态，用于错误时，边框是否改为红色 */
    validateState: { type: Boolean, default: false }
};

export type TextareaProps = ExtractPropTypes<typeof TextareaProps>;

export default TextareaProps;
