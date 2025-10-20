import type { ExtractPropTypes } from 'vue';
import { baseProps } from '../common/props';

/**
 * SafeBottomProps SafeBottom 底部安全区
 */
export const SafeBottomProps = {
    ...baseProps,
};

export type SafeBottomProps = ExtractPropTypes<typeof SafeBottomProps>;
