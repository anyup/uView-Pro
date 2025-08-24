import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-index-anchor 组件 Props 类型定义
 * @description 索引锚点属性
 */
export const IndexAnchorProps = {
    /** 是否使用自定义内容的插槽 */
    useSlot: { type: Boolean, default: false },
    /** 索引字符，如果定义了use-slot，此参数自动失效 */
    index: { type: String, default: '' },
    /** 自定义样式，对象形式 */
    customStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) }
};

export type IndexAnchorProps = ExtractPropTypes<typeof IndexAnchorProps>;
