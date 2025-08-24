import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-modal 组件 props 类型定义
 * @description 弹窗模态框，支持多种样式和交互
 */
export const ModalProps = {
    /** 是否显示模态框 */
    modelValue: {
        type: Boolean,
        default: false
    },
    /** 层级z-index */
    zIndex: {
        type: [Number, String] as PropType<number | string>,
        default: ''
    },
    /** 标题 */
    title: {
        type: String,
        default: '提示'
    },
    /** 弹窗宽度 */
    width: {
        type: [Number, String] as PropType<number | string>,
        default: 600
    },
    /** 弹窗内容 */
    content: {
        type: String,
        default: '内容'
    },
    /** 是否显示标题 */
    showTitle: {
        type: Boolean,
        default: true
    },
    /** 是否显示确认按钮 */
    showConfirmButton: {
        type: Boolean,
        default: true
    },
    /** 是否显示取消按钮 */
    showCancelButton: {
        type: Boolean,
        default: false
    },
    /** 确认文案 */
    confirmText: {
        type: String,
        default: '确认'
    },
    /** 取消文案 */
    cancelText: {
        type: String,
        default: '取消'
    },
    /** 确认按钮颜色 */
    confirmColor: {
        type: String,
        default: '#2979ff'
    },
    /** 取消文字颜色 */
    cancelColor: {
        type: String,
        default: '#606266'
    },
    /** 圆角值 */
    borderRadius: {
        type: [Number, String] as PropType<number | string>,
        default: 16
    },
    /** 标题的样式 */
    titleStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    /** 内容的样式 */
    contentStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    /** 取消按钮的样式 */
    cancelStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    /** 确定按钮的样式 */
    confirmStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    /** 是否开启缩放效果 */
    zoom: {
        type: Boolean,
        default: true
    },
    /** 是否异步关闭，只对确定按钮有效 */
    asyncClose: {
        type: Boolean,
        default: false
    },
    /** 是否允许点击遮罩关闭modal */
    maskCloseAble: {
        type: Boolean,
        default: false
    },
    /** 给一个负的margin-top，往上偏移，避免和键盘重合的情况 */
    negativeTop: {
        type: [String, Number] as PropType<number | string>,
        default: 0
    }
};

/**
 * u-modal 组件 props 类型
 */
export type ModalProps = ExtractPropTypes<typeof ModalProps>;
