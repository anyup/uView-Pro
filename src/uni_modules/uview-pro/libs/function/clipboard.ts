function H5Copy(text: string, config: TClipboardOptions) {
    const success = (result: string) => {
        if (config.showToast) {
            uni.showToast({
                title: '复制成功',
                icon: 'none'
            });
        }
        config.success(result);
        config.complete(result);
    };
    const fail = (err: string) => {
        if (config.showToast) {
            uni.showToast({
                title: '复制失败',
                icon: 'none'
            });
        }
        config.fail(err);
        config.complete(err);
    };

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.readOnly = true;
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, text.length);

    try {
        const result = document.execCommand('copy');
        if (result) {
            success('复制成功');
        } else {
            // console.error(`复制失败，可能不是用户主动触发点击的方式调用,因web安全性，不能js直接调用!`);
            fail('复制失败，可能不是用户主动触发点击的方式调用,因browser安全性，不能js直接调用!');
        }
    } catch (err) {
        // console.error('【Clipboard Error】:', err);
        fail(err);
    } finally {
        document.body.removeChild(textarea);
    }
}

function UniCopy(text: string, config: TClipboardOptions) {
    const opt = Object.assign({ data: text }, config);
    console.log(opt);
    uni.setClipboardData(opt);
}

type TClipboardOptions = Omit<UniNamespace.SetClipboardDataOptions, 'data'>;

export function clipboard(content: string, options?: TClipboardOptions) {
    const text = String(content);
    const showToast = typeof options.showToast === 'boolean' ? options.showToast : true;
    const copySuccessCb = typeof options.success === 'function' ? options.success : () => {};
    const copyFailCb = typeof options.success === 'function' ? options.fail : () => {};
    const copyCompleteCb = typeof options.complete === 'function' ? options.complete : () => {};

    let config: TClipboardOptions = {
        showToast,
        success: copySuccessCb,
        fail: copyFailCb,
        complete: copyCompleteCb
    };

    // #ifdef H5
    H5Copy(text, config);
    // #endif

    // #ifndef H5
    UniCopy(text, config);
    // #endif
}
