import {
    U_MODAL_EVENT_SHOW,
    U_MODAL_EVENT_HIDE,
    U_MODAL_EVENT_CLEAR_LOADING,
    U_MODAL_GLOBAL_EVENT_SHOW,
    U_MODAL_GLOBAL_EVENT_HIDE,
    U_MODAL_GLOBAL_EVENT_CLEAR_LOADING,
    type ModalPayload
} from '../../components/u-modal/service';

export type UseModalShowOptions = ModalPayload;

export type UseModal = {
    /**
     * 显示 modal
     * - show('标题')
     * - show({ title, content, showCancelButton, ... })
     */
    show: (contentOrOptions: string | UseModalShowOptions) => void;
    /**
     * 显示 confirm 类型的 modal（带确认和取消按钮）
     * - confirm('标题')
     * - confirm({ title, content, onConfirm, onCancel })
     */
    confirm: (contentOrOptions: string | UseModalShowOptions) => void;
    /** 关闭 modal */
    close: () => void;
    /** 清除 loading 状态 */
    clearLoading: () => void;
};

export type UseModalOptions = {
    /** 是否使用全局根部 <u-modal global /> */
    global?: boolean;
    /** 是否使用页面级 <u-modal page /> */
    page?: boolean;
};

function normalize(contentOrOptions: string | UseModalShowOptions): UseModalShowOptions {
    if (typeof contentOrOptions === 'string') {
        // 如果是简单的字符串，可能是标题或内容
        return { content: contentOrOptions };
    }
    return contentOrOptions || {};
}

/**
 * Modal 函数式调用
 * @description 需要页面/应用中至少存在一个 <u-modal global /> 或 <u-modal page /> 实例用于承接事件；不影响原调用方式。
 * 支持两种调用方式：应用级 useModal() / useModal({ global: true }) 页面级 useModal({ page: true }) / useModal(false)
 */
export function useModal(optionsOrGlobal: UseModalOptions | boolean = true): UseModal {
    const isGlobal = typeof optionsOrGlobal === 'boolean' ? optionsOrGlobal !== false : optionsOrGlobal.global === true;
    const isPage = typeof optionsOrGlobal === 'boolean' ? optionsOrGlobal === false : optionsOrGlobal.page === true;

    const showEvent = isGlobal ? U_MODAL_GLOBAL_EVENT_SHOW : isPage ? U_MODAL_EVENT_SHOW : '';
    const hideEvent = isGlobal ? U_MODAL_GLOBAL_EVENT_HIDE : isPage ? U_MODAL_EVENT_HIDE : '';
    const clearLoadingEvent = isGlobal ? U_MODAL_GLOBAL_EVENT_CLEAR_LOADING : isPage ? U_MODAL_EVENT_CLEAR_LOADING : '';

    function emitShow(payload: UseModalShowOptions) {
        if (showEvent) {
            uni?.$emit && uni.$emit(showEvent, payload);
        }
    }

    function emitHide() {
        if (hideEvent) {
            uni?.$emit && uni.$emit(hideEvent);
        }
    }

    function emitClearLoading() {
        if (clearLoadingEvent) {
            uni?.$emit && uni.$emit(clearLoadingEvent);
        }
    }

    function show(contentOrOptions: string | UseModalShowOptions) {
        emitShow(normalize(contentOrOptions));
    }

    function confirm(contentOrOptions: string | UseModalShowOptions) {
        const options = normalize(contentOrOptions);
        emitShow({
            ...options,
            showCancelButton: options.showCancelButton ?? true,
            showConfirmButton: options.showConfirmButton ?? true
        });
    }

    function clearLoading() {
        emitClearLoading();
    }

    function close() {
        emitHide();
    }

    return {
        show,
        confirm,
        close,
        clearLoading
    };
}
