import { type ExtractPropTypes, type PropType } from 'vue';
import type { BadgeSize, ThemeType } from '../../types/global';

/**
 * badge 角标类型定义
 * @description 供 u-badge 组件 props 使用
 */

export const BadgeProps = {
    /** 使用预设的背景颜色 primary,warning,success,error,info */
    type: { type: String as PropType<ThemeType>, default: 'error' },
    /** Badge的尺寸，default, mini */
    size: { type: String as PropType<BadgeSize>, default: 'default' },
    /** 是否是圆点 */
    isDot: { type: Boolean, default: false },
    /** 显示的数值内容 */
    count: { type: [Number, String], default: undefined },
    /** 展示封顶的数字值 */
    overflowCount: { type: Number, default: 99 },
    /** 当数值为 0 时，是否展示 Badge */
    showZero: { type: Boolean, default: false },
    /** 位置偏移 [number, number] */
    offset: { type: Array as unknown as PropType<[number, number]>, default: () => [20, 20] },
    /** 是否开启绝对定位，开启了offset才会起作用 */
    absolute: { type: Boolean, default: true },
    /** 字体大小 */
    fontSize: { type: [String, Number], default: '24' },
    /** 字体颜色 */
    color: { type: String, default: '#ffffff' },
    /** badge的背景颜色 */
    bgColor: { type: String, default: '' },
    /** 是否让badge组件的中心点和父组件右上角重合，配置的话，offset将会失效 */
    isCenter: { type: Boolean, default: false }
};

export type BadgeProps = ExtractPropTypes<typeof BadgeProps>;
