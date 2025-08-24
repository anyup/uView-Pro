import type { ExtractPropTypes, PropType } from 'vue';
import type { ThemeType, ToastPosition } from '../../types/global';

/**
 * ToastProps toast props 类型定义
 * @description 消息提示组件，支持 z-index 及多种配置项
 */
export const ToastProps = {
    /** 层级 z-index */
    zIndex: { type: [Number, String] as PropType<number | string>, default: '' },
    /** 提示类型，success/warning/error/loading 等 */
    type: { type: String as PropType<ThemeType | 'default'>, default: '' },
    /** 显示时长，单位ms */
    duration: { type: Number, default: 2000 },
    /** 是否显示图标 */
    icon: { type: Boolean, default: true },
    /** 显示位置，center/top/bottom */
    position: { type: String as PropType<ToastPosition>, default: 'center' },
    /** 关闭时的回调函数 */
    callback: { type: Function as PropType<(() => void) | null>, default: null },
    /** 是否返回上一页 */
    back: { type: Boolean, default: false },
    /** 是否为tab页面跳转 */
    isTab: { type: Boolean, default: false },
    /** 跳转的url */
    url: { type: String, default: '' },
    /** 跳转参数对象 */
    params: { type: Object as PropType<Record<string, any>>, default: () => ({}) }
};

export type ToastProps = ExtractPropTypes<typeof ToastProps>;

export type ToastExpose = {
    show: (options: Record<string, any>) => void;
    hide: () => void;
};
