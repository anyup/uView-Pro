import type { ExtractPropTypes, PropType } from 'vue';
import type { NumberKeyboardMode } from '../../types/global';

/**
 * NumberKeyboardProps 数字/身份证键盘 props 类型定义
 * @description 支持数字、身份证、带小数点等多种模式，支持乱序，支持长按退格。
 */
export const NumberKeyboardProps = {
    /** 键盘的类型，number-数字键盘，card-身份证键盘 */
    mode: {
        type: String as PropType<NumberKeyboardMode>,
        default: 'number'
    },
    /** 是否显示键盘的"."符号 */
    dotEnabled: {
        type: Boolean,
        default: true
    },
    /** 是否打乱键盘按键的顺序 */
    random: {
        type: Boolean,
        default: false
    }
};

export type NumberKeyboardProps = ExtractPropTypes<typeof NumberKeyboardProps>;
