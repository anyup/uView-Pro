import { type ExtractPropTypes } from 'vue';

/**
 * u-car-keyboard 车牌号键盘类型定义
 * @description 供 u-car-keyboard 组件 props 使用
 */
export const CarKeyboardProps = {
    /** 是否打乱键盘按键的顺序 */
    random: { type: Boolean, default: false }
};

export type CarKeyboardProps = ExtractPropTypes<typeof CarKeyboardProps>;
