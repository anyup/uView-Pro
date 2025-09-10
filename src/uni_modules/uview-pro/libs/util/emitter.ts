import { getCurrentInstance, type ComponentInternalInstance } from 'vue';

/**
 * 适用于 uni-app Vue3 的事件派发/广播工具
 * 用法：import { dispatch, broadcast } from './emitter'
 */

/**
 * 向上查找父组件并派发事件
 * @param instance 当前组件实例（setup中可用getCurrentInstance()）
 * @param componentName 目标组件名
 * @param eventName 事件名
 * @param params 参数
 */

// 将事件名转换为驼峰格式
// 例如：on-form-change -> onFormChange
function formatToCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
}

/**
 * 向上查找父组件
 * @param instance 当前组件实例（setup中可用getCurrentInstance()）
 * @param componentName 目标组件名
 * @returns 父组件实例
 */
function parent(instance: ComponentInternalInstance | null | undefined = undefined, componentName: string = '') {
    if (!instance) {
        instance = getCurrentInstance();
    }
    let parent = instance && (instance.parent as ComponentInternalInstance | null | undefined);

    if (!componentName) return parent;
    while (parent) {
        const name = (parent.type as any)?.name as string | undefined;
        if (name === componentName) {
            return parent;
        }
        parent = parent.parent;
    }
    return null;
}

/** * 向上查找父组件并派发事件
 * @param instance 当前组件实例（setup中可用getCurrentInstance()）
 * @param componentName 目标组件名
 * @param eventName 事件名
 * @param params 参数
 */
function dispatch(instance: ComponentInternalInstance | null | undefined, componentName: string, eventName: string, ...params: any[]) {
    let parent = instance && (instance.parent as ComponentInternalInstance | null | undefined);
    while (parent) {
        const name = (parent.type as any)?.name as string | undefined;
        if (name === componentName) {
            // 找到目标组件，派发事件
            // Vue3未解决，目标组件事件监听失效，待优化，暂时使用下面的方式解决，如果你有好的方式也可以告诉我或者提PR
            parent.emit && parent.emit(eventName, ...params);
            // 如果有对应的方法，执行方法
            // 这里可以考虑将 eventName 转换为驼峰格式
            // 例如：on-form-change -> onFormChange
            parent.exposed?.[formatToCamelCase(eventName)] && parent.exposed[formatToCamelCase(eventName)](...params);
            break;
        }
        parent = parent.parent;
    }
}

/**
 * 向下递归查找子组件并广播事件
 * @param instance 当前组件实例（setup中可用getCurrentInstance()）
 * @param componentName 目标组件名
 * @param eventName 事件名
 * @param params 参数
 */
function broadcast(instance: ComponentInternalInstance | null | undefined, componentName: string, eventName: string, ...params: any[]) {
    if (!instance) return;
    const subTree = (instance.subTree as any)?.children || [];
    const children = Array.isArray(subTree) ? subTree : [subTree];
    children.forEach((vnode: any) => {
        const child = vnode.component as ComponentInternalInstance | undefined;

        if (child) {
            const name = (child.type as any)?.name as string | undefined;
            if (name === componentName) {
                // 找到目标组件，广播事件
                // Vue3未解决，目标组件事件监听失效，待优化，暂时使用下面的方式解决，如果你有好的方式也可以告诉我或者提PR
                child.emit && child.emit(eventName, ...params);
                // 如果有对应的方法，执行方法
                // 这里可以考虑将 eventName 转换为驼峰格式
                // 例如：on-form-change -> onFormChange
                child.exposed?.[formatToCamelCase(eventName)] && child.exposed[formatToCamelCase(eventName)](...params);
            } else {
                broadcast(child, componentName, eventName, ...params);
            }
        }
    });
}

export { dispatch, broadcast, parent };
