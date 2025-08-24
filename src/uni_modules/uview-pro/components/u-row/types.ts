import type { ExtractPropTypes, PropType } from 'vue';
import type { RowAlign, RowJustify } from '../../types/global';

/**
 * RowProps 行布局 props 类型定义
 * @description 12分栏布局，快速创建布局
 */

export const RowProps = {
    /** 给col添加间距，左右边距各占一半 */
    gutter: { type: [String, Number] as PropType<number | string>, default: 20 },
    /** 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`) */
    justify: { type: String as PropType<RowJustify>, default: 'start' },
    /** 垂直对齐方式，可选值为top、center、bottom */
    align: { type: String as PropType<RowAlign>, default: 'center' },
    /** 是否阻止事件传播 */
    stop: { type: Boolean, default: true }
};

export type RowProps = ExtractPropTypes<typeof RowProps>;
