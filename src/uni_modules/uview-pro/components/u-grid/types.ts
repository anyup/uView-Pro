import type { ExtractPropTypes, PropType } from 'vue';
import type { InputAlign } from '../../types/global';

/**
 * u-grid 组件 Props 类型定义
 * @description 宫格组件属性
 */
export const GridProps = {
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
    /** 分成几列 */
    col: { type: [Number, String] as PropType<string | number>, default: 3 },
    /** 是否显示边框 */
    border: { type: Boolean, default: true },
    /** 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右 */
    align: { type: String as PropType<InputAlign>, default: 'left' },
    /** 宫格按压时的样式类，"none"为无效果 */
    hoverClass: { type: String, default: 'u-hover-class' }
};

export type GridProps = ExtractPropTypes<typeof GridProps>;
