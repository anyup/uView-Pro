import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-mask 组件 props 类型定义
 * @description 遮罩层，支持自定义样式、缩放、动画等
 */
export const MaskProps = {
    /** 是否显示遮罩 */
    show: {
        type: Boolean,
        default: false
    },
    /** 层级z-index */
    zIndex: {
        type: [Number, String] as PropType<number | string>,
        default: ''
    },
    /** 用户自定义样式 */
    customStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    /** 遮罩的动画样式，是否使用zoom进行scale进行缩放 */
    zoom: {
        type: Boolean,
        default: true
    },
    /** 遮罩的过渡时间，单位为ms */
    duration: {
        type: [Number, String] as PropType<number | string>,
        default: 300
    },
    /** 是否可以通过点击遮罩进行关闭 */
    maskClickAble: {
        type: Boolean,
        default: true
    }
};

/**
 * u-mask 组件 props 类型
 */
export type MaskProps = ExtractPropTypes<typeof MaskProps>;
