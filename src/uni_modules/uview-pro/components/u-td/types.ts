import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';

/**
 * TdProps td props 类型定义
 * @description 表格单元格组件，支持宽度自定义
 */
export const TdProps = {
    ...baseProps,
    /** 宽度，百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比 */
    width: { type: [Number, String] as PropType<number | string>, default: 'auto' }
};

export type TdProps = ExtractPropTypes<typeof TdProps>;
