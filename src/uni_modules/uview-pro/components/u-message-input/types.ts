import type { ExtractPropTypes, PropType } from 'vue';
import type { MessageInputMode } from '../../types/global';

/**
 * u-message-input 组件 props 类型定义
 * @description 验证码/短信输入框，支持多种样式
 */
export const MessageInputProps = {
    /** 最大输入长度 */
    maxlength: {
        type: [Number, String] as PropType<number | string>,
        default: 4
    },
    /** 是否用圆点填充 */
    dotFill: {
        type: Boolean,
        default: false
    },
    /** 显示模式，box-盒子，bottomLine-底部横线，middleLine-中部横线 */
    mode: {
        type: String as PropType<MessageInputMode>,
        default: 'box'
    },
    /** 预置值 */
    value: {
        type: [String, Number] as PropType<string | number>,
        default: ''
    },
    /** 当前激活输入item，是否带有呼吸效果 */
    breathe: {
        type: Boolean,
        default: true
    },
    /** 是否自动获取焦点 */
    focus: {
        type: Boolean,
        default: false
    },
    /** 字体是否加粗 */
    bold: {
        type: Boolean,
        default: false
    },
    /** 字体大小 */
    fontSize: {
        type: [String, Number] as PropType<string | number>,
        default: 60
    },
    /** 激活样式 */
    activeColor: {
        type: String,
        default: '#2979ff'
    },
    /** 未激活的样式 */
    inactiveColor: {
        type: String,
        default: '#606266'
    },
    /** 输入框的大小，单位rpx，宽等于高 */
    width: {
        type: [Number, String] as PropType<number | string>,
        default: '80'
    },
    /** 是否隐藏原生键盘 */
    disabledKeyboard: {
        type: Boolean,
        default: false
    }
};

/**
 * u-message-input 组件 props 类型
 */
export type MessageInputProps = ExtractPropTypes<typeof MessageInputProps>;
