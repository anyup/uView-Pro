/**
 * u-modal 函数式调用事件名（全平台）
 * @description
 * - useModal() 通过 uni.$emit 派发事件
 * - <u-modal /> 通过 uni.$on 监听事件并转调自身 show/hide
 */

import type { ModalProps } from './types';

// 普通（页面级）modal 事件
export const U_MODAL_EVENT_SHOW = 'uview-pro:u-modal:show';
export const U_MODAL_EVENT_HIDE = 'uview-pro:u-modal:hide';
export const U_MODAL_EVENT_CLEAR_LOADING = 'uview-pro:u-modal:clear-loading';

// 全局（App 根部）modal 事件，供 useModal() 使用
export const U_MODAL_GLOBAL_EVENT_SHOW = 'uview-pro:u-modal:global:show';
export const U_MODAL_GLOBAL_EVENT_HIDE = 'uview-pro:u-modal:global:hide';
export const U_MODAL_GLOBAL_EVENT_CLEAR_LOADING = 'uview-pro:u-modal:global:clear-loading';

/**
 * u-modal 函数式调用载荷类型
 * @description 完整覆盖 u-modal 的所有 props（除 modelValue 外）
 */
export type ModalPayload = Partial<Omit<ModalProps, 'modelValue'>> & {
    /** 确认回调 */
    onConfirm?: () => void;
    /** 取消回调 */
    onCancel?: () => void;
};
