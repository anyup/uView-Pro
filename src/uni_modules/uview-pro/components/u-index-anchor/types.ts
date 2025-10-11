import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';

/**
 * u-index-anchor 组件 Props 类型定义
 * @description 索引锚点属性
 */
export const IndexAnchorProps = {
    ...baseProps,
    /** 是否使用自定义内容的插槽 */
    useSlot: { type: Boolean, default: false },
    /** 索引字符，如果定义了use-slot，此参数自动失效 */
    index: { type: String, default: '' }
};

export type IndexAnchorProps = ExtractPropTypes<typeof IndexAnchorProps>;
