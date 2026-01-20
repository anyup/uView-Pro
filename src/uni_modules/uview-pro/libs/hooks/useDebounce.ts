export function useDebounce(delay: number = 500) {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    // 防抖函数
    function debounce(callback: () => void, debounceTime?: number) {
        debounceTime = debounceTime || delay;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback();
        }, debounceTime);
    }

    return {
        debounce
    };
}
