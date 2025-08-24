import type { ExtractPropTypes, PropType } from 'vue';

/**
 * SwitchProps 开关选择器 props 类型定义
 * @description 选择开关，支持自定义颜色、尺寸、值等
 */
export const SwitchProps = {
    /** 是否显示加载中状态 */
    loading: { type: Boolean, default: false },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 开关尺寸，单位rpx */
    size: { type: [Number, String] as PropType<number | string>, default: 50 },
    /** 打开时的颜色 */
    activeColor: { type: String, default: '#2979ff' },
    /** 关闭时的颜色 */
    inactiveColor: { type: String, default: '#ffffff' },
    /** v-model 绑定值，是否选中 */
    modelValue: { type: Boolean, default: false },
    /** 是否开启轻微震动反馈 */
    vibrateShort: { type: Boolean, default: false },
    /** 打开时的值 */
    activeValue: { type: [Number, String, Boolean] as PropType<number | string | boolean>, default: true },
    /** 关闭时的值 */
    inactiveValue: { type: [Number, String, Boolean] as PropType<number | string | boolean>, default: false }
};

export type SwitchProps = ExtractPropTypes<typeof SwitchProps>;
