import type { ExtractPropTypes, PropType } from 'vue';

/**
 * RateProps 评分组件 props 类型定义
 * @description 满意度调查、星型评分场景
 */
export const RateProps = {
    /** v-model双向绑定选中的星星数量 */
    modelValue: { type: [Number, String] as PropType<number | string>, default: -1 },
    /** 要显示的星星数量 */
    count: { type: [Number, String] as PropType<number | string>, default: 5 },
    /** 当前需要默认选中的星星(选中的个数) */
    current: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 是否不可选中 */
    disabled: { type: Boolean, default: false },
    /** 星星的大小，单位rpx */
    size: { type: [Number, String] as PropType<number | string>, default: 32 },
    /** 未选中时的颜色 */
    inactiveColor: { type: String, default: '#b2b2b2' },
    /** 选中的颜色 */
    activeColor: { type: String, default: '#FA3534' },
    /** 星星之间的间距，单位rpx */
    gutter: { type: [Number, String] as PropType<number | string>, default: 10 },
    /** 最少能选择的星星个数 */
    minCount: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 是否允许半星 */
    allowHalf: { type: Boolean, default: false },
    /** 选中时的图标(星星) */
    activeIcon: { type: String, default: 'star-fill' },
    /** 未选中时的图标(星星) */
    inactiveIcon: { type: String, default: 'star' },
    /** 自定义扩展前缀，方便用户扩展自己的图标库 */
    customPrefix: { type: String, default: 'uicon' },
    /** 分段颜色 */
    colors: { type: Array as PropType<string[]>, default: () => [] },
    /** 分段图标 */
    icons: { type: Array as PropType<string[]>, default: () => [] }
};

export type RateProps = ExtractPropTypes<typeof RateProps>;
