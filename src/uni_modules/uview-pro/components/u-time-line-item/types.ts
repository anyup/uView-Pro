import type { ExtractPropTypes, PropType } from 'vue';

/**
 * TimeLineItemProps 时间轴节点 props 类型定义
 * @description 时间轴节点组件，支持自定义节点颜色、位置
 */
export const TimeLineItemProps = {
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
    /** 节点的背景颜色 */
    bgColor: { type: String, default: 'var(--u-bg-white)' },
    /** 节点左边图标绝对定位的top值，单位rpx */
    nodeTop: { type: [String, Number] as PropType<string | number>, default: '' }
};

export type TimeLineItemProps = ExtractPropTypes<typeof TimeLineItemProps>;
