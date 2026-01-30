/**
 * u-toast 函数式调用事件名（全平台）
 * @description
 * - useToast() 通过 uni.$emit 派发事件
 * - <u-toast /> 通过 uni.$on 监听事件并转调自身 show/hide
 */

import type { ToastProps } from './types';

// 普通（页面级）toast 事件
export const U_TOAST_EVENT_SHOW = 'uview-pro:u-toast:show';
export const U_TOAST_EVENT_HIDE = 'uview-pro:u-toast:hide';

// 全局（App 根部）toast 事件，供 useToast() 使用
export const U_TOAST_GLOBAL_EVENT_SHOW = 'uview-pro:u-toast:global:show';
export const U_TOAST_GLOBAL_EVENT_HIDE = 'uview-pro:u-toast:global:hide';

export type ToastPayload = Partial<ToastProps> & {
    /** 文案（兼容 toast.show('xxx')） */
    title?: string;
};
