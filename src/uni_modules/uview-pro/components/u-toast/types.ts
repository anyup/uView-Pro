import type { ExtractPropTypes, PropType } from 'vue';
import type { ThemeType, ToastPosition } from '../../types/global';
import { baseProps } from '../common/props';
import zIndex from '../../libs/config/zIndex';

/**
 * ToastProps toast props 类型定义
 * @description 消息提示组件，支持 z-index 及多种配置项
 */
export const ToastProps = {
    ...baseProps,
    /** 层级 z-index */
    zIndex: { type: [Number, String] as PropType<number | string>, default: zIndex.toast },
    /** 提示类型，success/warning/error/loading 等 */
    type: { type: String as PropType<ThemeType | 'default'>, default: '' },
    /** 显示时长，单位ms。设为 0 表示不自动关闭，需手动调用 hide/close 方法 */
    duration: { type: Number, default: 2000 },
    /** 是否显示图标 */
    icon: { type: Boolean, default: true },
    /** 显示位置，center/top/bottom */
    position: { type: String as PropType<ToastPosition>, default: 'center' },
    /** 关闭时的回调函数 */
    callback: { type: Function as unknown as PropType<(() => void) | null>, default: null },
    /** 是否返回上一页 */
    back: { type: Boolean, default: false },
    /** 是否为tab页面跳转 */
    isTab: { type: Boolean, default: false },
    /** 跳转的url */
    url: { type: String, default: '' },
    /** 跳转参数对象 */
    params: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 是否作为全局根部 toast（通常放在 App.vue 中，给 useToast() 使用） */
    global: { type: Boolean, default: false },
    /** 是否作为页面级 toast（通常放在页面中，给 useToast({ page: true }) 使用） */
    page: { type: [Boolean, String] as PropType<boolean | string>, default: false },
    /** 是否为loading “常驻” */
    loading: { type: Boolean, default: false }
};

export type ToastProps = ExtractPropTypes<typeof ToastProps>;

export type ToastExpose = {
    show: (options: Record<string, any>) => void;
    hide: () => void;
    close: () => void;
};
