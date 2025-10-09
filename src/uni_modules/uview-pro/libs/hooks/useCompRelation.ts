// utils/useComponent.ts
import { ref, reactive, getCurrentInstance, onUnmounted, nextTick, computed, watch, onMounted } from 'vue';
import { logger } from '../util/logger';

// 类型定义
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

// 符号定义
const PARENT_CONTEXT_SYMBOL = Symbol('parent_context');
const CHILDREN_CONTEXT_SYMBOL = Symbol('children_context');

/**
 * 生成实例唯一ID
 */
function generateInstanceId(componentName: string): string {
    return `${componentName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 查找父组件实例
 */
function findParentInstance(name: string, instance: any): any {
    if (!instance) return null;

    let parent = instance.parent;
    while (parent) {
        const parentName = parent.type?.name || parent.type?.__name;
        if (parentName === name) {
            return parent;
        }
        parent = parent.parent;
    }
    return null;
}

/**
 * 获取父组件上下文
 */
function getParentContext(name: string, instance: any): ParentContext | null {
    const parentInstance = findParentInstance(name, instance);
    if (parentInstance) {
        return parentInstance.proxy?.[PARENT_CONTEXT_SYMBOL] || null;
    }
    return null;
}

/**
 * 父组件 Hook
 */
export function useParent(componentName?: string) {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error('useParent must be called within setup function');
    }

    // 使用组件名称作为默认名称
    const name = componentName || instance.type.name || instance.type.__name;
    if (!name) {
        throw new Error('Component name is required for useParent. Either provide a name or set component name.');
    }

    const children = reactive<ChildContext[]>([]);
    const childrenMap = new Map<string, ChildContext>();

    // 父组件上下文
    const parentContext: ParentContext = {
        name,

        addChild(child: ChildContext) {
            if (!childrenMap.has(child.id)) {
                childrenMap.set(child.id, child);
                children.push(child);
                logger.log(`Parent ${name} added child: ${child.name} (${child.id})`);
            }
        },

        removeChild(childId: string) {
            if (childrenMap.has(childId)) {
                const child = childrenMap.get(childId)!;
                childrenMap.delete(childId);
                const index = children.findIndex(c => c.id === childId);
                if (index > -1) {
                    children.splice(index, 1);
                }
                logger.log(`Parent ${name} removed child: ${childId}`);
            }
        },

        broadcast(event: string, data?: any) {
            logger.log(`Parent ${name} broadcasting event: ${event} to ${childrenMap.size} children`);
            childrenMap.forEach(child => {
                const exposed = child.getExposed();
                if (exposed && typeof exposed[event] === 'function') {
                    try {
                        exposed[event](data);
                    } catch (error) {
                        logger.warn(`Error calling child method ${event}:`, error);
                    }
                }
            });
        },

        getChildren() {
            return Array.from(childrenMap.values());
        },

        getExposed() {
            return instance.exposed || {};
        },

        getChildExposed(childId: string) {
            const child = childrenMap.get(childId);
            if (child && child.getExposed) {
                return child.getExposed();
            }
            logger.warn(`Child ${childId} not found or does not have getExposed method`);
            return {};
        },

        getChildrenExposed() {
            return Array.from(childrenMap.values())
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

    // 在组件实例上存储父组件上下文
    if (instance.proxy) {
        instance.proxy[PARENT_CONTEXT_SYMBOL] = parentContext;
    }

    // 组件卸载时清理
    onUnmounted(() => {
        // 清理所有子组件引用
        childrenMap.forEach((child, childId) => {
            parentContext.removeChild(childId);
        });
        if (instance.proxy) {
            delete instance.proxy[PARENT_CONTEXT_SYMBOL];
        }
        logger.log(`Parent ${name} unmounted and cleaned up`);
    });

    return {
        parentName: name,
        children,
        broadcast: parentContext.broadcast,
        getChildren: parentContext.getChildren,
        getChildExposed: parentContext.getChildExposed,
        getChildrenExposed: parentContext.getChildrenExposed,
        getExposed: parentContext.getExposed
    };
}

/**
 * 子组件 Hook
 */
export function useChildren(componentName?: string, parentName?: string) {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error('useChildren must be called within setup function');
    }

    // 使用组件名称作为默认名称
    const name = componentName || instance.type.name || instance.type.__name;
    if (!name) {
        throw new Error('Component name is required for useChildren. Either provide a name or set component name.');
    }

    const instanceId = generateInstanceId(name);
    const parentRef = ref<ParentContext | null>(null);
    const parentExposed = ref<Record<string, any>>({});

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

    // 查找父组件
    const findParent = (): ParentContext | null => {
        // 如果指定了父组件名称，使用精确查找
        if (parentName) {
            return getParentContext(parentName, instance);
        }

        // 否则查找最近的父组件上下文
        let current = instance.parent;
        while (current) {
            const context = current.proxy?.[PARENT_CONTEXT_SYMBOL];
            if (context) {
                return context;
            }
            current = current.parent;
        }
        return null;
    };

    // 链接到父组件
    const linkParent = (): boolean => {
        const parent = findParent();
        if (parent) {
            parentRef.value = parent;
            parent.addChild(childContext);
            getParentExposed();
            logger.log(`Child ${name} linked to parent ${parent.name}`);
            return true;
        }
        return false;
    };

    // 向父组件发送事件
    const emitToParent = (event: string, data?: any) => {
        if (parentRef.value) {
            const exposed = parentRef.value.getExposed();
            if (exposed && typeof exposed[event] === 'function') {
                try {
                    exposed[event](data, instanceId, name);
                } catch (error) {
                    logger.warn(`Error calling parent method ${event}:`, error);
                }
            } else {
                logger.warn(`Parent method ${event} not found or not a function`);
            }
        } else {
            logger.warn(`No parent found to emit event: ${event}`);
        }
    };

    // 子组件上下文
    const childContext: ChildContext = {
        id: instanceId,
        name,
        emitToParent,
        getParentExposed,
        getInstance() {
            return instance;
        },
        getExposed
    };

    logger.log(`Child ${name} registered, looking for parent`);

    onMounted(() => {
        nextTick(() => {
            // 立即尝试连接父组件
            let connected = linkParent();
            // 如果没连接上，使用watch监听组件树变化
            if (!connected) {
                const stopWatch = watch(
                    () => instance?.parent,
                    () => {
                        if (!parentRef.value) {
                            const linked = linkParent();
                            if (linked) {
                                stopWatch();
                            }
                        }
                    },
                    { immediate: false }
                );

                // 也尝试在nextTick后连接
                nextTick(() => {
                    if (!parentRef.value) {
                        const linked = linkParent();
                        if (linked) {
                            stopWatch();
                        }
                    }
                });

                // 组件卸载时停止监听
                onUnmounted(() => {
                    stopWatch();
                });
            }
        });
    });

    // 组件卸载时清理
    onUnmounted(() => {
        if (parentRef.value) {
            parentRef.value.removeChild(instanceId);
        }
        logger.log(`Child ${name} unmounted`);
    });

    return {
        childId: instanceId,
        childName: name,
        parent: parentRef,
        emitToParent,
        getParentExposed,
        parentExposed: computed(() => parentExposed.value),
        getExposed
    };
}

/**
 * 检查父组件是否存在
 */
export function hasParent(parentName?: string): boolean {
    const instance = getCurrentInstance();
    if (!instance) return false;

    if (parentName) {
        return getParentContext(parentName, instance) !== null;
    }

    // 查找最近的父组件上下文
    let current = instance.parent;
    while (current) {
        const context = current.proxy?.[PARENT_CONTEXT_SYMBOL];
        if (context) {
            return true;
        }
        current = current.parent;
    }
    return false;
}

/**
 * 获取父组件上下文
 */
export function getParentContextByName(parentName: string): ParentContext | null {
    const instance = getCurrentInstance();
    if (!instance) return null;
    return getParentContext(parentName, instance);
}

/**
 * 热更新清理函数
 */
export function cleanupComponentRelations(): void {
    logger.log('Cleaning up component relations for hot reload');
    // 由于使用组件实例存储，热更新时会自动重新建立关系
}

// 热更新处理
if (import.meta.hot) {
    import.meta.hot.accept(() => {
        logger.log('Hot reload detected, relations will be automatically reconnected');
    });
}

export default {
    useParent,
    useChildren,
    hasParent,
    getParentContextByName,
    cleanupComponentRelations
};
