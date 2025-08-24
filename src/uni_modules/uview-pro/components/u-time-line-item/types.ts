import type { ExtractPropTypes, PropType } from 'vue';

/**
 * TimeLineItemProps 时间轴节点 props 类型定义
 * @description 时间轴节点组件，支持自定义节点颜色、位置
 */
export const TimeLineItemProps = {
    /** 节点的背景颜色 */
    bgColor: { type: String, default: '#ffffff' },
    /** 节点左边图标绝对定位的top值，单位rpx */
    nodeTop: { type: [String, Number] as PropType<string | number>, default: '' }
};

export type TimeLineItemProps = ExtractPropTypes<typeof TimeLineItemProps>;
