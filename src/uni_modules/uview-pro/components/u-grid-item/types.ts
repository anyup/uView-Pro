import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-grid-item 组件 Props 类型定义
 * @description 宫格项组件属性
 */
export const GridItemProps = {
    /** 自定义根节点样式 */
    customStyle: {
        type: [String, Object] as PropType<string | Record<string, any>>,
        default: () => ({})
    },
    /** 自定义根节点样式类 */
    customClass: {
        type: String as unknown as PropType<string>,
        default: ''
    },
    /** 背景颜色 */
    bgColor: { type: String, default: 'var(--u-bg-white)' },
    /** 点击时返回的index */
    index: { type: [Number, String] as PropType<string | number>, default: '' }
};

export type GridItemProps = ExtractPropTypes<typeof GridItemProps>;
