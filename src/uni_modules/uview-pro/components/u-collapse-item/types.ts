import type { ExtractPropTypes, PropType } from 'vue';
import type { TextAlign } from '../../types/global';

/**
 * u-collapse-item 手风琴Item Props
 * @description 通过折叠面板收纳内容区域（搭配u-collapse使用）
 */
export const CollapseItemProps = {
    /** 标题 */
    title: { type: String, default: '' },
    /** 标题的对齐方式 */
    align: { type: String as PropType<TextAlign>, default: 'left' },
    /** 是否可以点击收起 */
    disabled: { type: Boolean, default: false },
    /** collapse显示与否 */
    open: { type: Boolean, default: false },
    /** 唯一标识符 */
    name: { type: [Number, String] as PropType<number | string>, default: '' },
    /** 活动样式 */
    activeStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 标识当前为第几个 */
    index: { type: [String, Number] as PropType<string | number>, default: '' }
};

export type CollapseItemProps = ExtractPropTypes<typeof CollapseItemProps>;
