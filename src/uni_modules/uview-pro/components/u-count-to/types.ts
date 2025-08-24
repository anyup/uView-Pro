import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-count-to 数字滚动 Props
 * @description 该组件一般用于需要滚动数字到某一个值的场景，目标要求是一个递增的值。
 */
export const CountToProps = {
    /** 开始的数值，默认从0增长到某一个数 */
    startVal: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 要滚动的目标数值，必须 */
    endVal: { type: [Number, String] as PropType<number | string>, default: 0, required: true },
    /** 滚动到目标数值的动画持续时间，单位为毫秒（ms） */
    duration: { type: [Number, String] as PropType<number | string>, default: 2000 },
    /** 设置数值后是否自动开始滚动 */
    autoplay: { type: Boolean, default: true },
    /** 要显示的小数位数 */
    decimals: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 是否在即将到达目标数值的时候，使用缓慢滚动的效果 */
    useEasing: { type: Boolean, default: true },
    /** 十进制分割符号 */
    decimal: { type: [Number, String] as PropType<number | string>, default: '.' },
    /** 字体颜色 */
    color: { type: String, default: '#303133' },
    /** 字体大小 */
    fontSize: { type: [Number, String] as PropType<number | string>, default: 50 },
    /** 是否加粗字体 */
    bold: { type: Boolean, default: false },
    /** 千位分隔符，类似金额的分割(￥23,321.05中的",") */
    separator: { type: String, default: '' }
};

export type CountToProps = ExtractPropTypes<typeof CountToProps>;
