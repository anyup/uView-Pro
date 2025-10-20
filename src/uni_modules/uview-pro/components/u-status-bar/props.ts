import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';

export const StatusBarProps = {
    ...baseProps,
    /** 背景设置 */
    background: {
        type: String,
        default: 'transparent'
    },
};

export type StatusBarProps = ExtractPropTypes<typeof StatusBarProps>;
