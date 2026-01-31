import {
    U_TOAST_EVENT_HIDE,
    U_TOAST_EVENT_SHOW,
    U_TOAST_GLOBAL_EVENT_HIDE,
    U_TOAST_GLOBAL_EVENT_SHOW,
    type ToastPayload
} from '../../components/u-toast/service';
import type { ThemeType } from '../../types/global';

export type UseToastShowOptions = ToastPayload;

export type UseToast = {
    /**
     * 显示 toast
     * - show('文本')
     * - show({ title, type, duration, ... })
     */
    show: (titleOrOptions: string | UseToastShowOptions) => void;
    /** 关闭 toast */
    close: () => void;
    /** 成功 */
    success: (titleOrOptions: string | UseToastShowOptions) => void;
    /** 错误 */
    error: (titleOrOptions: string | UseToastShowOptions) => void;
    /** 警告 */
    warning: (titleOrOptions: string | UseToastShowOptions) => void;
    /** 信息 */
    info: (titleOrOptions: string | UseToastShowOptions) => void;
    /** 加载中（默认常驻，需 close 关闭） */
    loading: (titleOrOptions: string | UseToastShowOptions) => void;
};

export type UseToastOptions = {
    /** 是否使用全局根部 <u-toast global />，默认 true；为 false 时走页面级 <u-toast /> */
    global?: boolean;
    /** 是否使用页面级 <u-toast page /> */
    page?: boolean;
};

function normalize(titleOrOptions: string | UseToastShowOptions): UseToastShowOptions {
    if (typeof titleOrOptions === 'string') return { title: titleOrOptions };
    return titleOrOptions || {};
}

/**
 * Toast 函数式调用
 * @description 需要页面/应用中至少存在一个 <u-toast global /> 或 <u-toast page /> 实例用于承接事件；不影响原 ref 调用方式。
 * 支持两种调用方式：应用级 useToast() / useToast({ global: true }) 页面级 useToast({ page: true }) / useToast(false)
 */
export function useToast(): UseToast;
export function useToast(options: UseToastOptions): UseToast;
export function useToast(global: boolean): UseToast;
export function useToast(optionsOrGlobal: UseToastOptions | boolean = true): UseToast {
    const isGlobal = typeof optionsOrGlobal === 'boolean' ? optionsOrGlobal !== false : optionsOrGlobal.global === true;
    const isPage = typeof optionsOrGlobal === 'boolean' ? optionsOrGlobal === false : optionsOrGlobal.page === true;
    const showEvent = isGlobal ? U_TOAST_GLOBAL_EVENT_SHOW : isPage ? U_TOAST_EVENT_SHOW : '';
    const hideEvent = isGlobal ? U_TOAST_GLOBAL_EVENT_HIDE : isPage ? U_TOAST_EVENT_HIDE : '';

    function emitShow(payload: UseToastShowOptions) {
        if (showEvent) {
            uni?.$emit && uni.$emit(showEvent, payload);
        }
    }

    function emitHide() {
        if (hideEvent) {
            uni?.$emit && uni.$emit(hideEvent);
        }
    }
    function show(titleOrOptions: string | UseToastShowOptions) {
        emitShow(normalize(titleOrOptions));
    }

    function close() {
        emitHide();
    }

    function withType(type: ThemeType, titleOrOptions: string | UseToastShowOptions) {
        const options = normalize(titleOrOptions);
        emitShow({ ...options, type });
    }

    return {
        show,
        close,
        success: (v: any) => withType('success', v),
        error: (v: any) => withType('error', v),
        warning: (v: any) => withType('warning', v),
        info: (v: any) => withType('info', v),
        loading: (v: any) => {
            const options = normalize(v);
            // loading 通常需要常驻，除非用户显式传 duration
            emitShow({ ...options, loading: true, duration: options.duration ?? 0 });
        }
    };
}
