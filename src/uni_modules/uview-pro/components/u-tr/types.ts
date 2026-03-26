import type { ExtractPropTypes, PropType } from 'vue';

/**
 * TrProps tr props 类型定义
 * @description 表格行组件，无特殊 props
 */
export const TrProps = {
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
export type TrProps = ExtractPropTypes<typeof TrProps>;
