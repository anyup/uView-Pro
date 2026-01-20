export function useThrottle(delay: number = 500) {
    let previous: number = 0;
    // 节流函数
    function throttle(callback: () => void, throttleTime?: number) {
        throttleTime = throttleTime || delay;
        let now = Date.now();
        if (now - previous > throttleTime) {
            callback();
            previous = now;
        }
    }

    return {
        throttle
    };
}
