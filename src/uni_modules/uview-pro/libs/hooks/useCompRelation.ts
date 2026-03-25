import { ref, reactive, getCurrentInstance, onUnmounted, nextTick, computed, onMounted } from 'vue';
import { isDebugMode } from '../config/config';

// 类型定义
interface ParentContext {
    name: string;
    addChild: (child: ChildContext) => void;
    removeChild: (childId: string) => void;
    broadcast: (event: string, data?: any, childIds?: string | string[]) => void;
    broadcastToChildren: (componentName: string, event: string, data?: any) => void;
    getChildren: () => ChildContext[];
    getExposed: () => Record<string, any>;
    getChildExposed: (childId: string) => Record<string, any>;
    getChildrenExposed: () => Array<{ id: string; name: string; exposed: Record<string, any> }>;
    getInstance: () => any;
}

interface ChildContext {
    id: string;
    name: string;
    getChildIndex: () => number;
    emitToParent: (event: string, data?: any) => void;
    getParentExposed: () => Record<string, any>;
    getInstance: () => any;
    getExposed: () => Record<string, any>;
}

// 符号定义
const PARENT_CONTEXT_SYMBOL = Symbol('parent_context');
// 每个组件实例的 child id 缓存，避免同个组件中多次调用 useChildren 时生成不同 id
const CHILD_ID_SYMBOL = Symbol('child_id');

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
    return parentInstance?.proxy?.[PARENT_CONTEXT_SYMBOL] || null;
}

/**
 * 递归查找所有指定名称的子组件
 */
function findAllChildComponents(componentName: string, instance: any): any[] {
    const components: any[] = [];

    function traverse(currentInstance: any) {
        if (!currentInstance?.subTree) return;

        const subTree = currentInstance.subTree?.children || [];
        const children = Array.isArray(subTree) ? subTree : [subTree];

        children.forEach((vnode: any) => {
            const child = vnode.component;
            if (!child) return;

            const name = child.type?.name || child.type?.__name;
            if (name === componentName) {
                components.push(child);
            }
            traverse(child);
        });
    }

    traverse(instance);
    if (isDebugMode()) console.log(`Found ${components.length} ${componentName} components`);
    return components;
}

/**
 * 父组件 Hook
 */
export function useParent(componentName?: string) {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error('useParent must be called within setup function');
    }

    const name = componentName || instance.type.name || instance.type.__name;
    if (!name) {
        throw new Error('Component name is required for useParent');
    }

    const children = reactive<ChildContext[]>([]);
    const childrenMap = new Map<string, ChildContext>();

    const broadcast = (event: string, data?: any, childIds?: string | string[]) => {
        const targetChildren = childIds
            ? ((Array.isArray(childIds) ? childIds : [childIds])
                  .map(id => childrenMap.get(id))
                  .filter(Boolean) as ChildContext[])
            : Array.from(childrenMap.values());

        if (isDebugMode())
            console.log(`Parent ${name} broadcasting event: ${event} to ${targetChildren.length} children`);

        targetChildren.forEach(child => {
            const exposed = child.getExposed();
            if (exposed && typeof exposed[event] === 'function') {
                try {
                    exposed[event](data);
                } catch (error) {
                    if (isDebugMode('error')) console.error(`Error calling child method ${event}:`, error);
                }
            }
        });
    };

    const broadcastToChildren = (componentName: string, event: string, data?: any) => {
        if (isDebugMode())
            console.log(`Parent ${name} broadcasting event: ${event} to all ${componentName} components`);

        const childComponents = findAllChildComponents(componentName, instance);
        let successCount = 0;

        childComponents.forEach(childComponent => {
            const exposed = childComponent.exposed || childComponent.proxy;
            if (exposed && typeof exposed[event] === 'function') {
                try {
                    exposed[event](data);
                    successCount++;
                } catch (error) {
                    if (isDebugMode('error')) console.error(`Error calling ${componentName} method ${event}:`, error);
                }
            }
        });

        if (isDebugMode())
            console.log(
                `Parent ${name} successfully called ${successCount} of ${childComponents.length} ${componentName} components`
            );
    };

    const parentContext: ParentContext = {
        name,
        addChild(child: ChildContext) {
            if (!childrenMap.has(child.id)) {
                childrenMap.set(child.id, child);
                children.push(child);
                if (isDebugMode()) console.log(`Parent ${name} added child: ${child.name}`);
            }
        },
        removeChild(childId: string) {
            if (childrenMap.has(childId)) {
                const child = childrenMap.get(childId)!;
                childrenMap.delete(childId);
                const index = children.findIndex(c => c.id === childId);
                if (index > -1) children.splice(index, 1);
                if (isDebugMode()) console.log(`Parent ${name} removed child: ${childId}`);
            }
        },
        broadcast,
        broadcastToChildren,
        getChildren: () => Array.from(childrenMap.values()),
        getExposed: () => instance.exposed || {},
        getChildExposed(childId: string) {
            const child = childrenMap.get(childId);
            return child?.getExposed?.() || {};
        },
        getChildrenExposed() {
            return Array.from(childrenMap.values())
                .filter(child => child.getExposed)
                .map(child => ({
                    id: child.id,
                    name: child.name,
                    exposed: child.getExposed()
                }))
                .filter(item => Object.keys(item.exposed).length > 0);
        },
        getInstance: () => instance
    };

    if (instance.proxy) {
        (instance.proxy as any)[PARENT_CONTEXT_SYMBOL] = parentContext;
    }

    onUnmounted(() => {
        childrenMap.forEach((_, childId) => parentContext.removeChild(childId));
        if (instance.proxy) {
            delete (instance.proxy as any)[PARENT_CONTEXT_SYMBOL];
        }
        if (isDebugMode()) console.log(`Parent ${name} unmounted and cleaned up`);
    });

    return {
        parentName: name,
        children,
        broadcast,
        broadcastToChildren,
        getChildren: parentContext.getChildren,
        getChildExposed: parentContext.getChildExposed,
        getChildrenExposed: parentContext.getChildrenExposed,
        getExposed: parentContext.getExposed,
        getInstance: parentContext.getInstance
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

    const name = componentName || instance.type.name || instance.type.__name;
    // 生成实例ID，同组件多次使用useChildren会重复创建
    // const instanceId = generateInstanceId(name || 'anonymous');
    // 尝试从实例上复用已有的 child id，避免同个组件内多次调用 useChildren 导致重复注册
    let instanceId: string | undefined = (instance.proxy as any)?.[CHILD_ID_SYMBOL];
    if (!instanceId) {
        instanceId = generateInstanceId(name || 'anonymous');
        if (instance.proxy) (instance.proxy as any)[CHILD_ID_SYMBOL] = instanceId;
    }
    const parentRef = ref<any | null>(null);
    const parentExposed = ref<Record<string, any>>({});

    const createSimulatedParentContext = (parentInstance: any): ParentContext => ({
        name: parentInstance?.type?.name || parentInstance?.type?.__name || 'unknown',
        addChild: () => isDebugMode() && console.log('Simulated parent added child'),
        removeChild: () => isDebugMode() && console.log('Simulated parent removed child'),
        broadcast: () => isDebugMode() && console.log('Simulated parent broadcasting'),
        broadcastToChildren: () => isDebugMode() && console.log('Simulated parent broadcasting to children'),
        getChildren: () => [],
        getExposed: () => parentInstance?.exposed || {},
        getChildExposed: () => ({}),
        getChildrenExposed: () => [],
        getInstance: () => parentInstance
    });

    const getParentExposed = (): Record<string, any> => {
        if (parentRef.value) {
            const exposed = parentRef.value.getExposed();
            parentExposed.value = exposed;
            return exposed;
        }
        return {};
    };

    const getExposed = (): Record<string, any> => instance.exposed || {};

    const findParent = (): ParentContext | null => {
        if (parentName) {
            const parentContext = getParentContext(parentName, instance);
            if (parentContext) {
                if (!parentContext.getInstance) {
                    parentContext.getInstance = () => findParentInstance(parentName, instance);
                }
                return parentContext;
            }

            const parentInstance = findParentInstance(parentName, instance);
            if (parentInstance) {
                return createSimulatedParentContext(parentInstance);
            }
        }

        let current = instance.parent;
        while (current) {
            const context = (current.proxy as any)?.[PARENT_CONTEXT_SYMBOL];
            if (context) {
                if (!context.getInstance) {
                    context.getInstance = () => current;
                }
                return context;
            }
            current = current.parent;
        }

        return instance.parent ? createSimulatedParentContext(instance.parent) : null;
    };

    const linkParent = (): boolean => {
        const parent = findParent();
        if (parent) {
            parentRef.value = parent;
            if (parent.addChild && childContext) {
                parent.addChild(childContext);
            }
            getParentExposed();
            if (isDebugMode()) console.log(`Child ${name || 'anonymous'} linked to parent ${parent.name}`);
            return true;
        }
        if (isDebugMode()) console.log(`Child ${name || 'anonymous'} no parent found, working in standalone mode`);
        return false;
    };

    const emitToParent = (event: string, data?: any) => {
        if (parentRef.value) {
            const exposed = getParentExposed();
            if (exposed && typeof exposed[event] === 'function') {
                try {
                    exposed[event](data, instanceId, name);
                } catch (error) {
                    if (isDebugMode('error')) console.error(`Error calling parent method ${event}:`, error);
                }
            }
        }
    };

    const getChildIndex = () => {
        if (!parentRef.value) return -1;
        try {
            const children = parentRef.value.getChildren();
            return children.findIndex((child: ChildContext) => child.id === instanceId);
        } catch (error) {
            return -1;
        }
    };

    const childContext: ChildContext = {
        id: instanceId,
        name: name || 'anonymous',
        getChildIndex,
        emitToParent,
        getParentExposed,
        getInstance: () => instance,
        getExposed
    };

    if (isDebugMode()) console.log(`Child ${name || 'anonymous'} registered, looking for parent`);

    onMounted(() => {
        let connected = linkParent();
        nextTick(() => {
            connected = linkParent();
            if (!connected) {
                setTimeout(linkParent, 500);
            }
        });
    });

    onUnmounted(() => {
        if (parentRef.value?.removeChild) {
            parentRef.value.removeChild(instanceId);
        }
        if (isDebugMode()) console.log(`Child ${name || 'anonymous'} unmounted`);
    });

    return {
        childId: instanceId,
        childName: name || 'anonymous',
        childIndex: computed(getChildIndex),
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

    let current = instance.parent;
    while (current) {
        if ((current.proxy as any)?.[PARENT_CONTEXT_SYMBOL]) return true;
        current = current.parent;
    }
    return false;
}

/**
 * 获取父组件上下文
 */
export function getParentContextByName(parentName: string): ParentContext | null {
    const instance = getCurrentInstance();
    return instance ? getParentContext(parentName, instance) : null;
}

/**
 * 热更新清理函数
 */
export function cleanupComponentRelations(): void {
    if (isDebugMode()) console.log('Cleaning up component relations for hot reload');
}

// 热更新处理
if (import.meta.hot) {
    import.meta.hot.accept(() => {
        if (isDebugMode()) console.log('Hot reload detected, relations will be automatically reconnected');
    });
}

export default {
    useParent,
    useChildren,
    hasParent,
    getParentContextByName,
    cleanupComponentRelations
};
