import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-keyboard 组件 Props 类型定义
 * @description 自定义键盘面板属性
 */
export const KeyboardProps = {
    /** 键盘的类型，number-数字键盘，card-身份证键盘，car-车牌号键盘 */
    mode: { type: String, default: 'number' },
    /** 是否显示键盘的"."符号 */
    dotEnabled: { type: Boolean, default: true },
    /** 是否显示顶部工具条 */
    tooltip: { type: Boolean, default: true },
    /** 是否显示工具条中间的提示 */
    showTips: { type: Boolean, default: true },
    /** 工具条中间的提示文字 */
    tips: { type: String, default: '' },
    /** 是否显示工具条左边的"取消"按钮 */
    cancelBtn: { type: Boolean, default: true },
    /** 是否显示工具条右边的"完成"按钮 */
    confirmBtn: { type: Boolean, default: true },
    /** 是否打乱键盘按键的顺序 */
    random: { type: Boolean, default: false },
    /** 是否开启底部安全区适配 */
    safeAreaInsetBottom: { type: Boolean, default: false },
    /** 是否允许通过点击遮罩关闭键盘 */
    maskCloseAble: { type: Boolean, default: true },
    /** 通过双向绑定控制键盘的弹出与收起 */
    modelValue: { type: Boolean, default: false },
    /** 是否显示遮罩 */
    mask: { type: Boolean, default: true },
    /** z-index值 */
    zIndex: { type: [Number, String] as PropType<string | number>, default: '' },
    /** 取消按钮的文字 */
    cancelText: { type: String, default: '取消' },
    /** 确认按钮的文字 */
    confirmText: { type: String, default: '确认' }
};

export type KeyboardProps = ExtractPropTypes<typeof KeyboardProps>;
