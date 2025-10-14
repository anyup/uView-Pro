import type { ExtractPropTypes } from 'vue';
import { baseProps } from '../common/props';

/**
 * u-copy 复制 Props
 * @description 文本复制
 */
export const CopyProps = {
    ...baseProps,
    /** 需要复制的文本内容 */
    content: { type: String, default: '' },
    /** 是否弹出提示，默认弹出提示 */
    toast: { type: Boolean, default: true }
};

export type CopyProps = ExtractPropTypes<typeof CopyProps>;
