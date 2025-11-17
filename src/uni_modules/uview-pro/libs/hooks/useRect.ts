import { getCurrentInstance, nextTick, ref } from 'vue';

/**
 * useRect - 获取元素的位置信息（响应式，原生实现）
 * @param selector 选择器（如 #id 或 .class）
 * @param all 是否获取所有匹配元素
 * @returns rect 响应式的节点信息，refresh 主动刷新方法
 */
export function useRect(selector: string = null, all = false) {
    const rect = ref<any>(all ? [] : null);
    const instance = getCurrentInstance();

    async function getRect(realSelector: string = null, delay = 0): Promise<any> {
        realSelector = realSelector || selector;
        if (!realSelector) return rect.value;
        await nextTick();
        return new Promise(resolve => {
            setTimeout(() => {
                uni.createSelectorQuery()
                    .in(instance?.proxy)
                    [all ? 'selectAll' : 'select'](realSelector)
                    .boundingClientRect((res: any) => {
                        rect.value = res;
                        resolve(res);
                    })
                    .exec();
            }, delay);
        });
    }

    return {
        rect,
        getRect
    };
}
