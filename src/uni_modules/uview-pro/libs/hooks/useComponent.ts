// utils/useComponent.ts
import { ref, reactive, getCurrentInstance, onUnmounted, nextTick, computed } from 'vue';
import { logger } from '../util/logger';
import { eventBus } from '../util/eventBus';

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

// 热更新清理函数
export function cleanupComponentRelations(): void {
    logger.log('Cleaning up component relations for hot reload');
    parentMap.clear();
    childMap.clear();
}

// 热更新处理
if (import.meta.hot) {
    console.error('Component relations are being hot updated');
    import.meta.hot.accept(() => {
        setTimeout(() => {
            cleanupComponentRelations();
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
        const parentRegisteredHandler = (eventData: any) => {
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
    const parentUnmountedHandler = (eventData: any) => {
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
 * 监听子组件事件
 */
export function onChildEvent(parentName: string, event: string, handler: Function) {
    eventBus.on(`parent:${parentName}:${event}`, eventData => {
        handler(eventData.data, eventData.childId, eventData.childName);
    });
}

/**
 * 监听父组件事件
 */
export function onParentEvent(childId: string, event: string, handler: Function) {
    // 修复类型问题：将 Function 转换为 EventCallback
    const eventCallback = (data?: any, ...args: any[]) => {
        handler(data, ...args);
    };
    eventBus.on(`child:${childId}:${event}`, eventCallback);

    // 返回取消监听函数
    return () => {
        eventBus.off(`child:${childId}:${event}`, eventCallback);
    };
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
