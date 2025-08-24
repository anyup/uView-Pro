import type { ExtractPropTypes, PropType } from 'vue';
import type { AlignType, JustifyType } from '../../types/global';

/**
 * u-col 布局单元格 Props
 * @description 通过基础的 12 分栏，迅速简便地创建布局（搭配<u-row>使用）
 * @property {String|Number} span 栅格占据的列数，总12等分（默认12）
 * @property {String|Number} offset 分栏左边偏移，计算方式与span相同（默认0）
 * @property {JustifyType} justify 水平排列方式，可选值为start、end、center、around、between（默认start）
 * @property {AlignType} align 垂直对齐方式，可选值为top、center、bottom（默认center）
 * @property {String} textAlign 文字对齐方式（默认left）
 * @property {Boolean} stop 是否阻止事件传播（默认true）
 */

export const ColProps = {
    /** 占父容器宽度的多少等分，总分为12份 */
    span: { type: [Number, String] as PropType<number | string>, default: 12 },
    /** 指定栅格左侧的间隔数(总12栏) */
    offset: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 水平排列方式 */
    justify: { type: String as PropType<JustifyType>, default: 'start' },
    /** 垂直对齐方式 */
    align: { type: String as PropType<AlignType>, default: 'center' },
    /** 文字对齐方式 */
    textAlign: { type: String, default: 'left' },
    /** 是否阻止事件传播 */
    stop: { type: Boolean, default: true }
};

export type ColProps = ExtractPropTypes<typeof ColProps>;
