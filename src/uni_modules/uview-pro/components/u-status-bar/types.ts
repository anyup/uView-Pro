import type { ExtractPropTypes, PropType } from 'vue';

export const StatusBarProps = {
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
    /** 背景设置 */
    background: {
        type: String,
        default: 'transparent'
    }
};

export type StatusBarProps = ExtractPropTypes<typeof StatusBarProps>;
