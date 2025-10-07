// utils/useComponent.ts
import { ref, reactive, getCurrentInstance, onUnmounted, nextTick, computed } from 'vue';
import { logger } from '../util/logger';
import { mitt } from '../util/mitt';

// 简化类型定义
interface ParentContext {
    name: string;
    uid: string; // 添加唯一ID
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
    uid: string; // 添加唯一ID
    name: string;
    emitToParent: (event: string, data?: any) => void;
    getParentExposed: () => Record<string, any>;
    getInstance: () => any;
    getExposed: () => Record<string, any>;
}

// 全局存储 - 改为页面级别存储
const pageComponentMaps = new Map<
    string,
    {
        parentMap: Map<string, ParentContext>;
        childMap: Map<string, ChildContext>;
    }
>();

// 获取当前页面的组件映射
function getCurrentPageMaps() {
    // 在uniapp中，可以通过getCurrentPages()获取当前页面路径
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const pagePath = currentPage?.route || 'default';

    if (!pageComponentMaps.has(pagePath)) {
        pageComponentMaps.set(pagePath, {
            parentMap: new Map<string, ParentContext>(),
            childMap: new Map<string, ChildContext>()
        });
    }

    return pageComponentMaps.get(pagePath)!;
}

// 清理指定页面的组件关系
function cleanupPageComponentRelations(pagePath: string) {
    if (pageComponentMaps.has(pagePath)) {
        const pageMaps = pageComponentMaps.get(pagePath)!;
        pageMaps.parentMap.clear();
        pageMaps.childMap.clear();
        pageComponentMaps.delete(pagePath);
        logger.log(`Cleaned up component relations for page: ${pagePath}`);
    }
}

// 事件常量
const PARENT_REGISTERED_EVENT = 'parent:registered';
const PARENT_UNMOUNTED_EVENT = 'parent:unmounted';
const CHILD_REGISTERED_EVENT = 'child:registered';

// 创建事件总线实例
type EventBusEvents = {
    [PARENT_REGISTERED_EVENT]: { name: string; parent: ParentContext; pagePath: string };
    [PARENT_UNMOUNTED_EVENT]: { name: string; pagePath: string };
    [CHILD_REGISTERED_EVENT]: { id: string; name: string; parentName: string; pagePath: string };
    [key: `parent:${string}:${string}`]: { data?: any; childId: string; childName: string; pagePath: string };
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
    pageComponentMaps.clear();
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
            }, 100); // 增加延迟确保组件已重新创建
        }, 50);
    });
}

/**
 * 生成实例唯一ID
 */
function generateInstanceId(componentName: string): string {
    return `${componentName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 生成组件唯一UID
 */
function generateComponentUid(): string {
    return `uid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 获取当前页面路径
 */
function getCurrentPagePath(): string {
    // 在uniapp中获取当前页面路径
    try {
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        return currentPage?.route || 'default';
    } catch (error) {
        return 'default';
    }
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

    const pagePath = getCurrentPagePath();
    const pageMaps = getCurrentPageMaps();

    // 生成父组件唯一UID
    const parentUid = generateComponentUid();

    // 使用组合名称：组件名 + UID，确保唯一性
    const uniqueParentName = `${componentName}-${parentUid}`;

    // 热更新时清理旧的父组件
    if (pageMaps.parentMap.has(uniqueParentName)) {
        logger.log(`Cleaning up existing parent ${uniqueParentName} for hot reload on page ${pagePath}`);
        pageMaps.parentMap.delete(uniqueParentName);
    }

    const children = reactive<ChildContext[]>([]);

    // 父组件上下文
    const parentContext: ParentContext = {
        name: uniqueParentName, // 使用唯一名称
        uid: parentUid, // 添加唯一ID

        addChild(child: ChildContext) {
            if (!children.find(c => c.id === child.id)) {
                children.push(child);
                logger.log(`Parent ${uniqueParentName} on page ${pagePath} added child: ${child.name}`);
            }
        },

        removeChild(childId: string) {
            const index = children.findIndex(c => c.id === childId);
            if (index > -1) {
                children.splice(index, 1);
                logger.log(`Parent ${uniqueParentName} on page ${pagePath} removed child: ${childId}`);
            }
        },

        broadcast(event: string, data?: any) {
            logger.log(`Parent ${uniqueParentName} on page ${pagePath} broadcasting event: ${event}`);
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
            logger.warn(`Child ${childId} not found or does not have getExposed method on page ${pagePath}`);
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
    pageMaps.parentMap.set(uniqueParentName, parentContext);
    logger.log(`Parent ${uniqueParentName} registered on page ${pagePath}`);

    // 广播父组件注册事件（包含页面路径信息）
    eventBus.emit(PARENT_REGISTERED_EVENT, {
        name: uniqueParentName,
        parent: parentContext,
        pagePath
    });

    // 组件卸载时清理
    onUnmounted(() => {
        pageMaps.parentMap.delete(uniqueParentName);
        eventBus.emit(PARENT_UNMOUNTED_EVENT, {
            name: uniqueParentName,
            pagePath
        });
        logger.log(`Parent ${uniqueParentName} unmounted from page ${pagePath}`);
    });

    return {
        parentName: uniqueParentName, // 返回唯一名称
        parentUid, // 返回唯一ID
        children,
        broadcast: parentContext.broadcast,
        getChildren: parentContext.getChildren,
        getChildExposed: parentContext.getChildExposed,
        getChildrenExposed: parentContext.getChildrenExposed,
        pagePath
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

    const pagePath = getCurrentPagePath();
    const pageMaps = getCurrentPageMaps();
    const instanceId = generateInstanceId(componentName);
    const childUid = generateComponentUid(); // 生成子组件唯一UID
    const parentRef = ref<ParentContext | null>(null);
    const parentExposed = ref<Record<string, any>>({});

    // 热更新时清理旧的子组件
    if (pageMaps.childMap.has(instanceId)) {
        logger.log(`Cleaning up existing child ${componentName} for hot reload on page ${pagePath}`);
        pageMaps.childMap.delete(instanceId);
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

    // 链接到父组件（只在当前页面查找）
    const linkParent = (): boolean => {
        // 在当前页面中查找匹配的父组件
        let parent: ParentContext | undefined;

        // 首先尝试精确匹配
        parent = pageMaps.parentMap.get(parentName);

        // 如果精确匹配失败，尝试前缀匹配（支持向后兼容）
        if (!parent) {
            for (const [key, value] of pageMaps.parentMap.entries()) {
                if (key.startsWith(parentName + '-')) {
                    parent = value;
                    break;
                }
            }
        }

        if (parent) {
            parentRef.value = parent;
            parent.addChild(childContext);
            getParentExposed();
            logger.log(`Child ${componentName} linked to parent ${parent.name} on page ${pagePath}`);
            return true;
        }
        return false;
    };

    // 子组件上下文
    const childContext: ChildContext = {
        id: instanceId,
        uid: childUid, // 添加唯一ID
        name: componentName,

        emitToParent(event: string, data?: any) {
            if (parentRef.value) {
                eventBus.emit(`parent:${parentRef.value.name}:${event}`, {
                    data,
                    childId: instanceId,
                    childName: componentName,
                    pagePath
                });
            }
        },

        getParentExposed,
        getInstance() {
            return instance;
        },
        getExposed
    };

    // 注册子组件
    pageMaps.childMap.set(instanceId, childContext);
    logger.log(`Child ${componentName} registered on page ${pagePath}`);

    // 广播子组件注册事件
    eventBus.emit(CHILD_REGISTERED_EVENT, {
        id: instanceId,
        name: componentName,
        parentName: parentName,
        pagePath
    });

    // 立即尝试连接父组件
    let connected = linkParent();

    // 如果没连接上，监听父组件注册事件（只监听当前页面的父组件）
    if (!connected) {
        const parentRegisteredHandler = (eventData: { name: string; parent: ParentContext; pagePath: string }) => {
            // 检查是否是我们要连接的父组件（精确匹配或前缀匹配）
            if (
                (eventData.name === parentName || eventData.name.startsWith(parentName + '-')) &&
                eventData.pagePath === pagePath
            ) {
                connected = linkParent();
                if (connected) {
                    eventBus.off(PARENT_REGISTERED_EVENT, parentRegisteredHandler);
                }
            }
        };
        eventBus.on(PARENT_REGISTERED_EVENT, parentRegisteredHandler);
    }

    // 监听父组件卸载事件（只监听当前页面的父组件）
    const parentUnmountedHandler = (eventData: { name: string; pagePath: string }) => {
        if (
            (eventData.name === parentName || eventData.name.startsWith(parentName + '-')) &&
            eventData.pagePath === pagePath &&
            parentRef.value
        ) {
            parentRef.value = null;
            parentExposed.value = {};
            logger.log(`Parent ${parentName} unmounted from page ${pagePath}, child ${componentName} disconnected`);
        }
    };
    eventBus.on(PARENT_UNMOUNTED_EVENT, parentUnmountedHandler);

    // 组件卸载时清理
    onUnmounted(() => {
        if (parentRef.value) {
            parentRef.value.removeChild(instanceId);
        }
        pageMaps.childMap.delete(instanceId);
        eventBus.off(PARENT_REGISTERED_EVENT);
        eventBus.off(PARENT_UNMOUNTED_EVENT, parentUnmountedHandler);
        logger.log(`Child ${componentName} unmounted from page ${pagePath}`);
    });

    return {
        childId: instanceId,
        childUid, // 返回唯一ID
        childName: componentName,
        parent: parentRef,
        emitToParent: childContext.emitToParent,
        getParentExposed,
        parentExposed: computed(() => parentExposed.value),
        getExposed: childContext.getExposed,
        pagePath
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
    const pagePath = getCurrentPagePath();

    const eventHandler = (eventData: { data?: any; childId: string; childName: string; pagePath: string }) => {
        // 只处理当前页面的事件
        if (eventData.pagePath === pagePath) {
            handler(eventData.data, eventData.childId, eventData.childName);
        }
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
 * 检查父组件是否存在（在当前页面）
 */
export function hasParent(parentName: string): boolean {
    const pageMaps = getCurrentPageMaps();

    // 精确匹配
    if (pageMaps.parentMap.has(parentName)) {
        return true;
    }

    // 前缀匹配（支持向后兼容）
    for (const key of pageMaps.parentMap.keys()) {
        if (key.startsWith(parentName + '-')) {
            return true;
        }
    }

    return false;
}

/**
 * 获取所有已注册的父组件名称（当前页面）
 */
export function getRegisteredParents(): string[] {
    const pageMaps = getCurrentPageMaps();
    return Array.from(pageMaps.parentMap.keys());
}

/**
 * 获取父组件实例（当前页面）
 */
export function getParent(parentName: string): ParentContext | undefined {
    const pageMaps = getCurrentPageMaps();

    // 精确匹配
    let parent = pageMaps.parentMap.get(parentName);
    if (parent) {
        return parent;
    }

    // 前缀匹配（支持向后兼容）
    for (const [key, value] of pageMaps.parentMap.entries()) {
        if (key.startsWith(parentName + '-')) {
            return value;
        }
    }

    return undefined;
}

/**
 * 获取子组件实例（当前页面）
 */
export function getChild(childId: string): ChildContext | undefined {
    const pageMaps = getCurrentPageMaps();
    return pageMaps.childMap.get(childId);
}

/**
 * 清理当前页面的组件关系（用于页面卸载时调用）
 */
export function cleanupCurrentPageComponents(): void {
    const pagePath = getCurrentPagePath();
    cleanupPageComponentRelations(pagePath);
    logger.log(`Cleaned up component relations for current page: ${pagePath}`);
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
