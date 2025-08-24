import type { ExtractPropTypes, PropType } from 'vue';
import type { PopupCloseIconPos, PopupMode } from '../../types/global';

/**
 * PopupMode 弹窗弹出方向类型
 */

/**
 * PopupProps 弹窗 props 类型定义
 * @description 弹出层容器，支持多种弹出方向和自定义内容
 */
export const PopupProps = {
    /** 显示状态 */
    show: { type: Boolean, default: false },
    /** 弹出方向，left|right|top|bottom|center */
    mode: { type: String as PropType<PopupMode>, default: 'left' },
    /** 是否显示遮罩 */
    mask: { type: Boolean, default: true },
    /** 抽屉的宽度(mode=left|right)，或者高度(mode=top|bottom)，单位rpx，或者"auto"，或者百分比"50%"，表示由内容撑开高度或者宽度 */
    length: { type: [Number, String] as PropType<number | string>, default: 'auto' },
    /** 是否开启缩放动画，只在mode=center时有效 */
    zoom: { type: Boolean, default: true },
    /** 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距 */
    safeAreaInsetBottom: { type: Boolean, default: false },
    /** 是否可以通过点击遮罩进行关闭 */
    maskCloseAble: { type: Boolean, default: true },
    /** 用户自定义样式 */
    customStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** v-model 控制弹窗显示 */
    modelValue: { type: Boolean, default: false },
    /** 内部参数，解决多层调用报错不能修改props值的问题 */
    popup: { type: Boolean, default: true },
    /** 圆角 */
    borderRadius: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 弹窗z-index */
    zIndex: { type: [Number, String] as PropType<number | string>, default: '' },
    /** 是否显示关闭图标 */
    closeable: { type: Boolean, default: false },
    /** 关闭图标的名称，只能uView的内置图标 */
    closeIcon: { type: String, default: 'close' },
    /** 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角 */
    closeIconPos: { type: String as PropType<PopupCloseIconPos>, default: 'top-right' },
    /** 关闭图标的颜色 */
    closeIconColor: { type: String, default: '#909399' },
    /** 关闭图标的大小，单位rpx */
    closeIconSize: { type: [String, Number] as PropType<number | string>, default: '30' },
    /** 弹窗宽度 */
    width: { type: String, default: '' },
    /** 弹窗高度 */
    height: { type: String, default: '' },
    /** 负top定位，支持rpx/px/百分比 */
    negativeTop: { type: [String, Number] as PropType<number | string>, default: 0 },
    /** 遮罩自定义样式 */
    maskCustomStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 动画时长，单位ms */
    duration: { type: [String, Number] as PropType<number | string>, default: 250 }
};

export type PopupProps = ExtractPropTypes<typeof PopupProps>;
