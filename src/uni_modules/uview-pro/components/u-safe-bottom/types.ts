import type { ExtractPropTypes, PropType } from 'vue';

/**
 * SafeBottomProps SafeBottom 底部安全区
 */
export const SafeBottomProps = {
    /** 自定义根节点样式 */
    customStyle: {
        type: [String, Object] as PropType<string | Record<string, any>>,
        default: () => ({})
    },
    /** 自定义根节点样式类 */
    customClass: {
        type: String as unknown as PropType<string>,
        default: ''
    }
};

export type SafeBottomProps = ExtractPropTypes<typeof SafeBottomProps>;
