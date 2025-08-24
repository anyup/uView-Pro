import { type ExtractPropTypes, type PropType } from 'vue';

/**
 * cell-group 组件 props 类型定义
 * @description 供 u-cell-group 组件 props 使用
 */

export const CellGroupProps = {
    /** 分组标题 */
    title: { type: String, default: '' },
    /** 是否显示分组list上下边框 */
    border: { type: Boolean, default: true },
    /** 分组标题的样式，对象形式，注意驼峰属性写法 */
    titleStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) }
};

export type CellGroupProps = ExtractPropTypes<typeof CellGroupProps>;
