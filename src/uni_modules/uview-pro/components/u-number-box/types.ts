import type { ExtractPropTypes, PropType } from 'vue';

/**
 * NumberBoxProps 步进器 props 类型定义
 * @description 商城购物选择物品数量，支持正整数、禁用、长按等
 */
export const NumberBoxProps = {
    /** 输入框初始值（默认1） */
    modelValue: { type: Number, default: 1 },
    /** 输入框和按钮的背景颜色（默认#F2F3F5） */
    bgColor: { type: String, default: '#F2F3F5' },
    /** 用户可输入的最小值（默认0） */
    min: { type: Number, default: 0 },
    /** 用户可输入的最大值（默认99999） */
    max: { type: Number, default: 99999 },
    /** 步长，每次加或减的值（默认1） */
    step: { type: Number, default: 1 },
    /** 是否禁用操作，禁用后无法加减或手动修改输入框的值（默认false） */
    disabled: { type: Boolean, default: false },
    /** 输入框文字和按钮字体大小，单位rpx（默认26） */
    size: { type: [Number, String] as PropType<number | string>, default: 26 },
    /** 输入框文字和加减按钮图标的颜色（默认#323233） */
    color: { type: String, default: '#323233' },
    /** 输入框宽度，单位rpx（默认80） */
    inputWidth: { type: [Number, String] as PropType<number | string>, default: 80 },
    /** 输入框和按钮的高度，单位rpx（默认50） */
    inputHeight: { type: [Number, String] as PropType<number | string>, default: 50 },
    /** 事件回调时用以区分当前发生变化的是哪个输入框 */
    index: { type: [Number, String] as PropType<number | string>, default: '' },
    /** 是否禁止输入框手动输入值（默认false） */
    disabledInput: { type: Boolean, default: false },
    /** 指定光标于键盘的距离，避免键盘遮挡输入框，单位rpx（默认100） */
    cursorSpacing: { type: [Number, String] as PropType<number | string>, default: 100 },
    /** 是否开启长按连续递增或递减(默认true) */
    longPress: { type: Boolean, default: true },
    /** 开启长按触发后，每触发一次需要多久，单位ms(默认250) */
    pressTime: { type: [Number, String] as PropType<number | string>, default: 250 },
    /** 是否只能输入大于或等于0的整数(正整数)（默认true） */
    positiveInteger: { type: Boolean, default: true }
};

export type NumberBoxProps = ExtractPropTypes<typeof NumberBoxProps>;
