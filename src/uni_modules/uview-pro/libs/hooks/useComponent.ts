// utils/useComponent.ts
import { ref, reactive, getCurrentInstance, onUnmounted, nextTick, computed } from 'vue';
import { logger } from '../util/logger';
import { mitt } from '../util/mitt';

// 简化类型定义
interface ParentContext {
    name: string;
    addChild: (child: ChildContext) => void;
    removeChild: (childId: string) => void;
    broadcast: (event: string, data?: any) => void;
    getChildren: () => ChildContext[];
    getExposed: () => Record<string, any>;
    getChildExposed: (childId: string) => Record<string, any>;
    getChildrenExposed: () => Array<{ id: string; name: string; exposed: Record<string, any> }>;
}

interface ChildContext {
    id: string;
    name: string;
    emitToParent: (event: string, data?: any) => void;
    getParentExposed: () => Record<string, any>;
    getInstance: () => any;
    getExposed: () => Record<string, any>;
}

// 全局存储
const parentMap = new Map<string, ParentContext>();
const childMap = new Map<string, ChildContext>();

// 事件常量
const PARENT_REGISTERED_EVENT = 'parent:registered';
const PARENT_UNMOUNTED_EVENT = 'parent:unmounted';
const CHILD_REGISTERED_EVENT = 'child:registered';

// 创建事件总线实例
type EventBusEvents = {
    [PARENT_REGISTERED_EVENT]: { name: string; parent: ParentContext };
    [PARENT_UNMOUNTED_EVENT]: { name: string };
    [CHILD_REGISTERED_EVENT]: { id: string; name: string; parentName: string };
    [key: `parent:${string}:${string}`]: { data?: any; childId: string; childName: string };
    [key: `child:${string}:${string}`]: any;
};

const eventBus = mitt<EventBusEvents>();

// 热更新重新注册管理器
let isHotReloading = false;
const hotReloadReconnectCallbacks: Map<string, Function[]> = new Map();

/**
 * 注册热更新重新连接回调
 */
function registerHotReloadReconnect(key: string, callback: Function): void {
    if (!hotReloadReconnectCallbacks.has(key)) {
        hotReloadReconnectCallbacks.set(key, []);
    }
    hotReloadReconnectCallbacks.get(key)!.push(callback);
}

/**
 * 注销热更新重新连接回调
 */
function unregisterHotReloadReconnect(key: string, callback: Function): void {
    const callbacks = hotReloadReconnectCallbacks.get(key);
    if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
        if (callbacks.length === 0) {
            hotReloadReconnectCallbacks.delete(key);
        }
    }
}

/**
 * 执行热更新重新连接
 */
function executeHotReloadReconnect(): void {
    logger.log('Executing hot reload reconnection for all registered callbacks');
    hotReloadReconnectCallbacks.forEach((callbacks, key) => {
        callbacks.forEach(callback => {
            try {
                callback();
                logger.log(`Successfully reconnected: ${key}`);
            } catch (error) {
                logger.warn(`Failed to reconnect ${key}:`, error);
            }
        });
    });
}

// 热更新清理函数
export function cleanupComponentRelations(): void {
    logger.log('Cleaning up component relations for hot reload');
    parentMap.clear();
    childMap.clear();
    eventBus.clear();
}

// 热更新处理
if (import.meta.hot) {
    import.meta.hot.accept(() => {
        isHotReloading = true;
        logger.log('Hot reload detected, starting reconnection process');

        // 第一步：清理旧的组件关系
        setTimeout(() => {
            cleanupComponentRelations();

            // 第二步：执行重新连接
            setTimeout(() => {
                executeHotReloadReconnect();
                isHotReloading = false;
                logger.log('Hot reload reconnection completed');
            }, 30);
        }, 20);
    });
}

/**
 * 生成实例唯一ID
 */
function generateInstanceId(componentName: string): string {
    return `${componentName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 父组件 Hook
 */
export function useParent(componentName: string) {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error('useParent must be called within setup function');
    }

    if (!componentName) {
        throw new Error('Component name is required for useParent');
    }

    // 热更新时清理旧的父组件
    if (parentMap.has(componentName)) {
        logger.log(`Cleaning up existing parent ${componentName} for hot reload`);
        parentMap.delete(componentName);
    }

    const children = reactive<ChildContext[]>([]);

    // 父组件上下文
    const parentContext: ParentContext = {
        name: componentName,

        addChild(child: ChildContext) {
            if (!children.find(c => c.id === child.id)) {
                children.push(child);
                logger.log(`Parent ${componentName} added child: ${child.name}`);
            }
        },

        removeChild(childId: string) {
            const index = children.findIndex(c => c.id === childId);
            if (index > -1) {
                children.splice(index, 1);
                logger.log(`Parent ${componentName} removed child: ${childId}`);
            }
        },

        broadcast(event: string, data?: any) {
            logger.log(`Parent ${componentName} broadcasting event: ${event}`);
            children.forEach(child => {
                eventBus.emit(`child:${child.id}:${event}`, data);
            });
        },

        getChildren() {
            return [...children];
        },

        getExposed() {
            return instance.exposed || {};
        },

        getChildExposed(childId: string) {
            const child = children.find(c => c.id === childId);
            if (child && child.getExposed) {
                return child.getExposed();
            }
            logger.warn(`Child ${childId} not found or does not have getExposed method`);
            return {};
        },

        getChildrenExposed() {
            return children
                .filter(child => child.getExposed)
                .map(child => {
                    const exposed = child.getExposed();
                    return {
                        id: child.id,
                        name: child.name,
                        exposed: exposed
                    };
                })
                .filter(item => Object.keys(item.exposed).length > 0);
        }
    };

    // 注册父组件并广播事件
    parentMap.set(componentName, parentContext);
    logger.log(`Parent ${componentName} registered`);

    // 广播父组件注册事件
    eventBus.emit(PARENT_REGISTERED_EVENT, { name: componentName, parent: parentContext });

    // 组件卸载时清理
    onUnmounted(() => {
        parentMap.delete(componentName);
        eventBus.emit(PARENT_UNMOUNTED_EVENT, { name: componentName });
        logger.log(`Parent ${componentName} unmounted`);
    });

    return {
        parentName: componentName,
        children,
        broadcast: parentContext.broadcast,
        getChildren: parentContext.getChildren,
        getChildExposed: parentContext.getChildExposed,
        getChildrenExposed: parentContext.getChildrenExposed
    };
}

/**
 * 子组件 Hook
 */
export function useChildren(componentName: string, parentName: string) {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error('useChildren must be called within setup function');
    }

    if (!componentName || !parentName) {
        throw new Error('Component name and parent name are required for useChildren');
    }

    const instanceId = generateInstanceId(componentName);
    const parentRef = ref<ParentContext | null>(null);
    const parentExposed = ref<Record<string, any>>({});

    // 热更新时清理旧的子组件
    if (childMap.has(instanceId)) {
        logger.log(`Cleaning up existing child ${componentName} for hot reload`);
        childMap.delete(instanceId);
    }

    // 获取父组件暴露内容
    const getParentExposed = (): Record<string, any> => {
        if (parentRef.value) {
            const exposed = parentRef.value.getExposed();
            parentExposed.value = exposed;
            return exposed;
        }
        return {};
    };

    // 获取子组件exposed内容
    const getExposed = (): Record<string, any> => {
        return instance.exposed || {};
    };

    // 链接到父组件
    const linkParent = (): boolean => {
        const parent = parentMap.get(parentName);
        if (parent) {
            parentRef.value = parent;
            parent.addChild(childContext);
            getParentExposed();
            logger.log(`Child ${componentName} linked to parent ${parentName}`);
            return true;
        }
        return false;
    };

    // 子组件上下文
    const childContext: ChildContext = {
        id: instanceId,
        name: componentName,

        emitToParent(event: string, data?: any) {
            eventBus.emit(`parent:${parentName}:${event}`, {
                data,
                childId: instanceId,
                childName: componentName
            });
        },

        getParentExposed,
        getInstance() {
            return instance;
        },
        getExposed
    };

    // 注册子组件
    childMap.set(instanceId, childContext);
    logger.log(`Child ${componentName} registered`);

    // 广播子组件注册事件
    eventBus.emit(CHILD_REGISTERED_EVENT, {
        id: instanceId,
        name: componentName,
        parentName: parentName
    });

    // 立即尝试连接父组件
    let connected = linkParent();

    // 如果没连接上，监听父组件注册事件
    if (!connected) {
        const parentRegisteredHandler = (eventData: { name: string; parent: ParentContext }) => {
            if (eventData.name === parentName) {
                connected = linkParent();
                if (connected) {
                    eventBus.off(PARENT_REGISTERED_EVENT, parentRegisteredHandler);
                }
            }
        };
        eventBus.on(PARENT_REGISTERED_EVENT, parentRegisteredHandler);
    }

    // 监听父组件卸载事件
    const parentUnmountedHandler = (eventData: { name: string }) => {
        if (eventData.name === parentName && parentRef.value) {
            parentRef.value = null;
            parentExposed.value = {};
            logger.log(`Parent ${parentName} unmounted, child ${componentName} disconnected`);
        }
    };
    eventBus.on(PARENT_UNMOUNTED_EVENT, parentUnmountedHandler);

    // 组件卸载时清理
    onUnmounted(() => {
        if (parentRef.value) {
            parentRef.value.removeChild(instanceId);
        }
        childMap.delete(instanceId);
        eventBus.off(PARENT_REGISTERED_EVENT);
        eventBus.off(PARENT_UNMOUNTED_EVENT, parentUnmountedHandler);
        logger.log(`Child ${componentName} unmounted`);
    });

    return {
        childId: instanceId,
        childName: componentName,
        parent: parentRef,
        emitToParent: childContext.emitToParent,
        getParentExposed,
        parentExposed: computed(() => parentExposed.value),
        getExposed: childContext.getExposed
    };
}

/**
 * 监听子组件事件（返回取消监听函数）
 */
export function onChildEvent(
    parentName: string,
    event: string,
    handler: (data?: any, childId?: string, childName?: string) => void
): () => void {
    const eventHandler = (eventData: { data?: any; childId: string; childName: string }) => {
        handler(eventData.data, eventData.childId, eventData.childName);
    };

    eventBus.on(`parent:${parentName}:${event}`, eventHandler);

    // 返回取消监听函数
    return () => {
        eventBus.off(`parent:${parentName}:${event}`, eventHandler);
    };
}

/**
 * 监听父组件事件（返回取消监听函数）
 */
export function onParentEvent(childId: string, event: string, handler: (data?: any) => void): () => void {
    eventBus.on(`child:${childId}:${event}`, handler);

    // 返回取消监听函数
    return () => {
        eventBus.off(`child:${childId}:${event}`, handler);
    };
}

/**
 * 自动取消监听的事件注册 - 单个事件
 */
export function useParentEvent(
    childId: string,
    event: string,
    handler: (data?: any) => void,
    autoClean = true,
    hotReloadReconnect = true
): () => void {
    const instance = getCurrentInstance();
    const unsubscribe = onParentEvent(childId, event, handler);

    // 热更新重新注册支持
    if (hotReloadReconnect && instance) {
        const reconnectKey = `parent-event-${childId}-${event}`;
        const reconnectCallback = () => {
            logger.log(`Reconnecting parent event: ${event} for child: ${childId}`);
            onParentEvent(childId, event, handler);
        };

        registerHotReloadReconnect(reconnectKey, reconnectCallback);

        // 组件卸载时清理重新注册回调
        onUnmounted(() => {
            unregisterHotReloadReconnect(reconnectKey, reconnectCallback);
        });
    }

    // 自动在组件卸载时清理
    if (autoClean && instance) {
        onUnmounted(unsubscribe);
    }

    return unsubscribe;
}

/**
 * 自动取消监听的事件注册 - 批量事件
 */
export function useParentEvents(
    childId: string,
    events: Record<string, (data?: any) => void>,
    autoClean = true,
    hotReloadReconnect = true
): () => void {
    const instance = getCurrentInstance();
    const cleanups: Function[] = [];

    Object.entries(events).forEach(([event, handler]) => {
        const unsubscribe = onParentEvent(childId, event, handler);
        cleanups.push(unsubscribe);

        // 热更新重新注册支持
        if (hotReloadReconnect && instance) {
            const reconnectKey = `parent-events-${childId}-${event}`;
            const reconnectCallback = () => {
                logger.log(`Reconnecting parent event: ${event} for child: ${childId}`);
                onParentEvent(childId, event, handler);
            };

            registerHotReloadReconnect(reconnectKey, reconnectCallback);

            // 组件卸载时清理重新注册回调
            onUnmounted(() => {
                unregisterHotReloadReconnect(reconnectKey, reconnectCallback);
            });
        }
    });

    const cleanupAll = () => {
        cleanups.forEach(cleanup => cleanup());
        cleanups.length = 0;
    };

    if (autoClean && instance) {
        onUnmounted(cleanupAll);
    }

    return cleanupAll;
}

/**
 * 自动取消监听的子组件事件注册 - 单个事件
 */
export function useChildEvent(
    parentName: string,
    event: string,
    handler: (data?: any, childId?: string, childName?: string) => void,
    autoClean = true,
    hotReloadReconnect = true
): () => void {
    const instance = getCurrentInstance();
    const unsubscribe = onChildEvent(parentName, event, handler);

    // 热更新重新注册支持
    if (hotReloadReconnect && instance) {
        const reconnectKey = `child-event-${parentName}-${event}`;
        const reconnectCallback = () => {
            logger.log(`Reconnecting child event: ${event} for parent: ${parentName}`);
            onChildEvent(parentName, event, handler);
        };

        registerHotReloadReconnect(reconnectKey, reconnectCallback);

        // 组件卸载时清理重新注册回调
        onUnmounted(() => {
            unregisterHotReloadReconnect(reconnectKey, reconnectCallback);
        });
    }

    // 自动在组件卸载时清理
    if (autoClean && instance) {
        onUnmounted(unsubscribe);
    }

    return unsubscribe;
}

/**
 * 自动取消监听的子组件事件注册 - 批量事件
 */
export function useChildEvents(
    parentName: string,
    events: Record<string, (data?: any, childId?: string, childName?: string) => void>,
    autoClean = true,
    hotReloadReconnect = true
): () => void {
    const instance = getCurrentInstance();
    const cleanups: Function[] = [];

    Object.entries(events).forEach(([event, handler]) => {
        const unsubscribe = onChildEvent(parentName, event, handler);
        cleanups.push(unsubscribe);

        // 热更新重新注册支持
        if (hotReloadReconnect && instance) {
            const reconnectKey = `child-events-${parentName}-${event}`;
            const reconnectCallback = () => {
                logger.log(`Reconnecting child event: ${event} for parent: ${parentName}`);
                onChildEvent(parentName, event, handler);
            };

            registerHotReloadReconnect(reconnectKey, reconnectCallback);

            // 组件卸载时清理重新注册回调
            onUnmounted(() => {
                unregisterHotReloadReconnect(reconnectKey, reconnectCallback);
            });
        }
    });

    const cleanupAll = () => {
        cleanups.forEach(cleanup => cleanup());
        cleanups.length = 0;
    };

    if (autoClean && instance) {
        onUnmounted(cleanupAll);
    }

    return cleanupAll;
}

/**
 * 检查父组件是否存在
 */
export function hasParent(parentName: string): boolean {
    return parentMap.has(parentName);
}

/**
 * 获取所有已注册的父组件名称
 */
export function getRegisteredParents(): string[] {
    return Array.from(parentMap.keys());
}

/**
 * 获取父组件实例
 */
export function getParent(parentName: string): ParentContext | undefined {
    return parentMap.get(parentName);
}

/**
 * 获取子组件实例
 */
export function getChild(childId: string): ChildContext | undefined {
    return childMap.get(childId);
}

/**
 * 手动触发热更新重新连接（用于调试）
 */
export function manualHotReloadReconnect(): void {
    logger.log('Manual hot reload reconnection triggered');
    executeHotReloadReconnect();
}

/**
 * 获取热更新状态
 */
export function getHotReloadStatus(): { isHotReloading: boolean; reconnectCallbacksCount: number } {
    let totalCallbacks = 0;
    hotReloadReconnectCallbacks.forEach(callbacks => {
        totalCallbacks += callbacks.length;
    });

    return {
        isHotReloading,
        reconnectCallbacksCount: totalCallbacks
    };
}
