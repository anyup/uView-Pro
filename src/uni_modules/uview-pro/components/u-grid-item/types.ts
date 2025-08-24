import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-grid-item 组件 Props 类型定义
 * @description 宫格项组件属性
 */
export const GridItemProps = {
    /** 背景颜色 */
    bgColor: { type: String, default: '#ffffff' },
    /** 点击时返回的index */
    index: { type: [Number, String] as PropType<string | number>, default: '' },
    /** 自定义样式，对象形式 */
    customStyle: { type: Object as PropType<Record<string, any>>, default: () => ({ padding: '30rpx 0' }) }
};

export type GridItemProps = ExtractPropTypes<typeof GridItemProps>;
