import type { ExtractPropTypes, PropType } from 'vue';

/**
 * ThProps th props 类型定义
 * @description 表格表头单元格组件，支持宽度自定义
 */
export const ThProps = {
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
    /** 宽度，百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比 */
    width: { type: [Number, String] as PropType<number | string>, default: 'auto' }
};

export type ThProps = ExtractPropTypes<typeof ThProps>;
