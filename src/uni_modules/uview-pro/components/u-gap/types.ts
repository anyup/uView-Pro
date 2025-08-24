import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-gap 组件 Props 类型定义
 * @description 间隔槽组件属性
 */
export const GapProps = {
    /** 背景颜色 */
    bgColor: { type: String, default: 'transparent' },
    /** 高度 */
    height: { type: [String, Number] as PropType<string | number>, default: 30 },
    /** 与上一个组件的距离 */
    marginTop: { type: [String, Number] as PropType<string | number>, default: 0 },
    /** 与下一个组件的距离 */
    marginBottom: { type: [String, Number] as PropType<string | number>, default: 0 }
};

export type GapProps = ExtractPropTypes<typeof GapProps>;
