import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-count-down 倒计时 Props
 * @description 该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作。
 */
export const CountDownProps = {
    /** 倒计时的时间，秒为单位 */
    timestamp: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 是否自动开始倒计时 */
    autoplay: { type: Boolean, default: true },
    /** 分隔符 */
    separator: { type: String, default: 'colon' },
    /** 分隔符的大小，单位rpx */
    separatorSize: { type: [Number, String] as PropType<number | string>, default: 30 },
    /** 分隔符颜色 */
    separatorColor: { type: String, default: '#303133' },
    /** 字体颜色 */
    color: { type: String, default: '#303133' },
    /** 字体大小，单位rpx */
    fontSize: { type: [Number, String] as PropType<number | string>, default: 30 },
    /** 背景颜色 */
    bgColor: { type: String, default: '#fff' },
    /** 数字框高度，单位rpx */
    height: { type: [Number, String] as PropType<number | string>, default: 'auto' },
    /** 是否显示数字框 */
    showBorder: { type: Boolean, default: false },
    /** 边框颜色 */
    borderColor: { type: String, default: '#303133' },
    /** 是否显示秒 */
    showSeconds: { type: Boolean, default: true },
    /** 是否显示分钟 */
    showMinutes: { type: Boolean, default: true },
    /** 是否显示小时 */
    showHours: { type: Boolean, default: true },
    /** 是否显示“天” */
    showDays: { type: Boolean, default: true },
    /** 当"天"的部分为0时，不显示 */
    hideZeroDay: { type: Boolean, default: false }
};

export type CountDownProps = ExtractPropTypes<typeof CountDownProps>;
