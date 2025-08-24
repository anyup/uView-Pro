import type { ExtractPropTypes, PropType } from 'vue';

/**
 * TdProps td props 类型定义
 * @description 表格单元格组件，支持宽度自定义
 */
export const TdProps = {
    /** 宽度，百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比 */
    width: { type: [Number, String] as PropType<number | string>, default: 'auto' }
};

export type TdProps = ExtractPropTypes<typeof TdProps>;
