// hooks/useComponent.ts
import { ref, reactive, getCurrentInstance, onUnmounted, nextTick, computed, watch, toRefs, toRaw } from 'vue';
import { logger } from '../util/logger';

// 类型定义
interface ParentContext {
    name: string;
    addChild: (child: ChildContext) => void;
    removeChild: (childId: string) => void;
    broadcast: (event: string, data?: any) => void;
    getChildren: () => ChildContext[];
    getChildrenData: () => any[];
    expose: (exposed: Record<string, any>) => void;
    getExposed: () => Record<string, any>;
    getExposedReactive: () => Record<string, any>;
    updateExposed: (updates: Record<string, any>) => void;
}

interface ChildContext {
    id: string;
    name: string;
    componentInstance?: any;
    data?: any;
    emitToParent: (event: string, data?: any) => void;
    updateData: (newData: any) => void;
    getParentExposed: () => Record<string, any>;
    refreshParentExposed: () => void;
}

// 全局存储父子关系
const parentMap = new Map<string, ParentContext>();
const childMap = new Map<string, ChildContext>();
const pendingChildren = new Map<string, Array<{ childId: string; componentName: string }>>();
const parentExposedMap = new Map<
    string,
    {
        raw: Record<string, any>;
        reactive: Record<string, any>;
        version: number;
    }
>();

/**
 * 生成实例唯一ID
 * @param componentName 组件名称
 * @returns 唯一ID
 */
function generateInstanceId(componentName: string): string {
    return `${componentName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 创建深度响应式对象，特别处理props
 * @param obj 原始对象
 * @param seen 已处理对象集合（防止循环引用）
 * @returns 深度响应式对象
 */
function createDeepReactive(obj: any, seen = new WeakSet()): any {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (seen.has(obj)) {
        return obj;
    }
    seen.add(obj);

    if (Array.isArray(obj)) {
        return obj.map(item => createDeepReactive(item, seen));
    }

    // 特别处理props对象，确保所有属性都是响应式的
    const result: Record<string, any> = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // 对于props，使用ref确保每个属性都是响应式的
            if (key === 'props' && typeof obj[key] === 'object') {
                result[key] = reactive({ ...obj[key] });
            } else {
                result[key] = createDeepReactive(obj[key], seen);
            }
        }
    }

    return reactive(result);
}

/**
 * 父组件 Hook
 * 用于创建父组件上下文并管理子组件
 * @param componentName 父组件名称
 * @param props 父组件props（可选）
 * @returns 父组件相关方法和数据
 */
export function useParent(componentName: string, props?: Record<string, any>) {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error('useParent must be called within setup function');
    }

    if (!componentName) {
        throw new Error('Component name is required for useParent');
    }

    const children = reactive<ChildContext[]>([]);
    const exposedVersion = ref(0); // 暴露内容版本号

    // 创建响应式的props引用
    const reactiveProps = props ? reactive({ ...props }) : reactive({});

    // 父组件上下文
    const parentContext: ParentContext = {
        name: componentName,
        /**
         * 添加子组件
         * @param child 子组件上下文
         */
        addChild(child: ChildContext) {
            if (!children.find(c => c.id === child.id)) {
                children.push(child);
                logger.log(`Parent ${componentName} added child: ${child.name} (${child.id})`);
            }
        },
        /**
         * 移除子组件
         * @param childId 子组件ID
         */
        removeChild(childId: string) {
            const index = children.findIndex(c => c.id === childId);
            if (index > -1) {
                children.splice(index, 1);
                logger.log(`Parent ${componentName} removed child: ${childId}`);
            }
        },
        /**
         * 向所有子组件广播事件
         * @param event 事件名称
         * @param data 事件数据
         */
        broadcast(event: string, data?: any) {
            logger.log(`Parent ${componentName} broadcasting event: ${event} to ${children.length} children`);
            children.forEach(child => {
                emitToChild(child.id, event, data);
            });
        },
        /**
         * 获取所有子组件上下文
         * @returns 子组件上下文数组
         */
        getChildren() {
            return [...children];
        },
        /**
         * 获取所有子组件的数据
         * @returns 子组件数据数组
         */
        getChildrenData() {
            return children.map(child => child.data);
        },
        /**
         * 暴露内容给子组件
         * @param exposed 要暴露的内容
         */
        expose(exposed: Record<string, any>) {
            const rawExposed = toRaw(exposed);

            // 特别处理props，确保是响应式的
            if (rawExposed.props && typeof rawExposed.props === 'object') {
                rawExposed.props = reactive({ ...rawExposed.props });
            }

            const reactiveExposed = createDeepReactive(rawExposed);

            parentExposedMap.set(componentName, {
                raw: rawExposed,
                reactive: reactiveExposed,
                version: exposedVersion.value
            });

            exposedVersion.value++;
            logger.log(`Parent ${componentName} exposed (v${exposedVersion.value}):`, Object.keys(rawExposed));
        },
        /**
         * 获取暴露的原始内容
         * @returns 原始暴露内容
         */
        getExposed() {
            return parentExposedMap.get(componentName)?.raw || {};
        },
        /**
         * 获取响应式暴露内容
         * @returns 响应式暴露内容
         */
        getExposedReactive() {
            return parentExposedMap.get(componentName)?.reactive || reactive({});
        },
        /**
         * 更新暴露内容
         * @param updates 要更新的内容
         */
        updateExposed(updates: Record<string, any>) {
            const current = parentExposedMap.get(componentName);
            if (current) {
                // 合并更新
                Object.assign(current.raw, updates);

                // 特别处理props更新
                if (updates.props && typeof updates.props === 'object') {
                    Object.assign(current.raw.props, updates.props);
                    // 确保props保持响应式
                    current.raw.props = reactive({ ...current.raw.props });
                }

                // 更新响应式版本
                Object.assign(current.reactive, createDeepReactive(updates));

                current.version = exposedVersion.value;
                exposedVersion.value++;

                logger.log(`Parent ${componentName} updated exposed (v${current.version}):`, Object.keys(updates));

                // 通知所有子组件exposed已更新
                children.forEach(child => {
                    emitToChild(child.id, 'parentExposedUpdated', { version: current.version });
                });
            }
        }
    };

    // 注册父组件
    parentMap.set(componentName, parentContext);
    logger.log(`Parent ${componentName} registered`);

    // 如果传入了props，自动暴露
    if (props) {
        parentContext.expose({ props: reactiveProps });
    }

    /**
     * 处理等待连接的子组件
     */
    const processPendingChildren = () => {
        const pending = pendingChildren.get(componentName);
        if (pending) {
            logger.log(`Processing ${pending.length} pending children for parent ${componentName}`);
            pending.forEach(({ childId, componentName: childName }) => {
                const child = childMap.get(childId);
                if (child && !children.find(c => c.id === childId)) {
                    children.push(child);
                    logger.log(`Parent ${componentName} linked to pending child: ${childName} (${childId})`);
                }
            });
            pendingChildren.delete(componentName);
        }
    };

    // 在下一个tick处理等待的子组件
    nextTick(() => {
        processPendingChildren();
    });

    // 组件卸载时清理
    onUnmounted(() => {
        parentMap.delete(componentName);
        parentExposedMap.delete(componentName);
        logger.log(`Parent ${componentName} unmounted and cleaned up`);
    });

    return {
        parentName: componentName,
        children,
        broadcast: parentContext.broadcast,
        getChildren: parentContext.getChildren,
        getChildrenData: parentContext.getChildrenData,
        // 暴露exposed的方法
        expose: parentContext.expose,
        getExposed: parentContext.getExposed,
        getExposedReactive: parentContext.getExposedReactive,
        updateExposed: parentContext.updateExposed,
        // 手动刷新子组件列表
        refreshChildren: processPendingChildren,
        // 暴露版本号用于调试
        exposedVersion: computed(() => exposedVersion.value)
    };
}

/**
 * 子组件 Hook
 * 用于创建子组件上下文并连接到父组件
 * @param componentName 子组件名称
 * @param parentName 父组件名称（可选，可自动发现）
 * @returns 子组件相关方法和数据
 */
export function useChildren(componentName: string, parentName?: string) {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error('useChildren must be called within setup function');
    }

    if (!componentName) {
        throw new Error('Component name is required for useChildren');
    }

    // 为每个实例生成唯一ID
    const instanceId = generateInstanceId(componentName);
    const parentRef = ref<ParentContext | null>(null);
    const childData = ref<any>(null);
    const parentExposed = ref<Record<string, any>>(reactive({}));
    const parentExposedVersion = ref(0); // 跟踪父组件exposed版本

    /**
     * 自动发现父组件
     * @returns 父组件名称或null
     */
    const autoDiscoverParent = (): string | null => {
        if (parentName) {
            return parentName;
        }

        // 常见的父组件命名模式
        const commonParentPatterns = [
            `${componentName}-group`,
            `${componentName}-container`,
            `${componentName}-wrapper`,
            `${componentName}s`,
            `${componentName}List`,
            `parent-${componentName}`
        ];

        for (const pattern of commonParentPatterns) {
            if (parentMap.has(pattern)) {
                logger.log(`Child ${componentName} (${instanceId}) auto-discovered parent: ${pattern}`);
                return pattern;
            }
        }

        // 尝试从组件名称推断父组件
        const nameParts = componentName.split('-');
        if (nameParts.length > 1) {
            const inferredParent = `${nameParts.join('-')}-group`;
            if (parentMap.has(inferredParent)) {
                logger.log(`Child ${componentName} (${instanceId}) auto-discovered parent: ${inferredParent}`);
                return inferredParent;
            }

            const otherPatterns = [`${nameParts.slice(0, -1).join('-')}-group`, `${nameParts.join('-')}-parent`];

            for (const pattern of otherPatterns) {
                if (parentMap.has(pattern)) {
                    logger.log(`Child ${componentName} (${instanceId}) auto-discovered parent: ${pattern}`);
                    return pattern;
                }
            }
        }

        return null;
    };

    /**
     * 获取父组件exposed内容
     * @returns 父组件暴露的内容
     */
    const getParentExposed = (): Record<string, any> => {
        if (parentRef.value) {
            const exposed = parentRef.value.getExposedReactive();
            const currentVersion = parentExposedMap.get(parentRef.value.name)?.version || 0;

            // 只有当版本更新时才更新本地引用
            if (currentVersion !== parentExposedVersion.value) {
                // 清空现有属性
                Object.keys(parentExposed.value).forEach(key => {
                    delete parentExposed.value[key];
                });

                // 添加新属性
                Object.assign(parentExposed.value, exposed);
                parentExposedVersion.value = currentVersion;

                logger.log(`Child ${componentName} (${instanceId}) updated parent exposed to v${currentVersion}`);
            }

            return exposed;
        }
        return reactive({});
    };

    /**
     * 刷新父组件exposed内容
     * @returns 刷新后的父组件暴露内容
     */
    const refreshParentExposed = () => {
        return getParentExposed();
    };

    // 子组件上下文
    const childContext: ChildContext = {
        id: instanceId,
        name: componentName,
        componentInstance: instance,
        data: childData,
        /**
         * 向父组件发送事件
         * @param event 事件名称
         * @param data 事件数据
         */
        emitToParent(event: string, data?: any) {
            if (parentRef.value) {
                emitToParent(parentRef.value.name, event, data, instanceId, componentName);
            } else {
                logger.warn(
                    `Child ${componentName} (${instanceId}) tried to emit event ${event} but no parent is linked`
                );
                attemptLinkParent();
            }
        },
        /**
         * 更新子组件数据
         * @param newData 新数据
         */
        updateData(newData: any) {
            childData.value = newData;
            logger.log(`Child ${componentName} (${instanceId}) updated data:`, newData);
        },
        getParentExposed,
        refreshParentExposed
    };

    // 注册子组件
    childMap.set(instanceId, childContext);
    logger.log(`Child ${componentName} (${instanceId}) registered`);

    /**
     * 链接到父组件
     * @param targetParentName 目标父组件名称
     * @returns 是否链接成功
     */
    const linkParent = (targetParentName?: string): boolean => {
        const parentToLink = targetParentName || autoDiscoverParent();

        if (!parentToLink) {
            logger.warn(`Child ${componentName} (${instanceId}) cannot find a parent to link to`);

            if (!pendingChildren.has(componentName)) {
                pendingChildren.set(componentName, []);
            }
            pendingChildren.get(componentName)!.push({
                childId: instanceId,
                componentName
            });
            logger.log(`Child ${componentName} (${instanceId}) added to pending list`);
            return false;
        }

        const parent = parentMap.get(parentToLink);
        if (parent) {
            parentRef.value = parent;
            parent.addChild(childContext);
            // 链接成功后立即获取父组件exposed
            getParentExposed();
            logger.log(`Child ${componentName} (${instanceId}) linked to parent ${parentToLink}`);
            return true;
        } else {
            logger.warn(`Parent ${parentToLink} not found for child ${componentName} (${instanceId})`);

            if (!pendingChildren.has(parentToLink)) {
                pendingChildren.set(parentToLink, []);
            }
            pendingChildren.get(parentToLink)!.push({
                childId: instanceId,
                componentName
            });
            return false;
        }
    };

    /**
     * 尝试链接父组件（带重试）
     * @param retryCount 重试次数
     * @returns 是否链接成功
     */
    const attemptLinkParent = (retryCount = 3) => {
        if (retryCount <= 0) {
            logger.warn(`Child ${componentName} (${instanceId}) failed to link to parent after multiple attempts`);
            return false;
        }

        logger.log(`Child ${componentName} (${instanceId}) attempting to link to parent (${retryCount} retries left)`);

        nextTick(() => {
            if (linkParent()) {
                logger.log(`Child ${componentName} (${instanceId}) successfully linked to parent on retry`);
            } else {
                setTimeout(() => {
                    attemptLinkParent(retryCount - 1);
                }, 50);
            }
        });

        return false;
    };

    /**
     * 断开父组件链接
     */
    const unlinkParent = () => {
        if (parentRef.value) {
            parentRef.value.removeChild(instanceId);
            parentRef.value = null;
            // 清空父组件exposed
            Object.keys(parentExposed.value).forEach(key => {
                delete parentExposed.value[key];
            });
            parentExposedVersion.value = 0;
            logger.log(`Child ${componentName} (${instanceId}) unlinked from parent`);
        }
    };

    /**
     * 自动尝试链接父组件
     */
    const initLink = () => {
        setTimeout(() => {
            if (!linkParent()) {
                attemptLinkParent();
            }
        }, 0);
    };

    // 初始化链接
    initLink();

    // 监听父组件exposed更新事件
    onParentEvent(instanceId, 'parentExposedUpdated', data => {
        logger.log(`Child ${componentName} (${instanceId}) received parent exposed update, version: ${data.version}`);
        refreshParentExposed();
    });

    // 组件卸载时清理
    onUnmounted(() => {
        unlinkParent();
        childMap.delete(instanceId);

        // 清理等待列表中的当前实例
        for (const [parentName, children] of pendingChildren.entries()) {
            const index = children.findIndex(child => child.childId === instanceId);
            if (index > -1) {
                children.splice(index, 1);
            }
            if (children.length === 0) {
                pendingChildren.delete(parentName);
            }
        }

        logger.log(`Child ${componentName} (${instanceId}) unmounted and cleaned up`);
    });

    return {
        childId: instanceId,
        childName: componentName,
        parent: parentRef,
        linkParent,
        unlinkParent,
        emitToParent: childContext.emitToParent,
        updateData: childContext.updateData,
        data: childData,
        // 获取父组件exposed的方法
        getParentExposed,
        refreshParentExposed,
        // 响应式的父组件exposed引用
        parentExposed: computed(() => parentExposed.value),
        // 父组件exposed版本号
        parentExposedVersion: computed(() => parentExposedVersion.value),
        // 手动刷新链接状态
        refreshLink: () => attemptLinkParent(1)
    };
}

// 事件通信系统
const eventListeners = new Map<string, Map<string, Function>>();

/**
 * 向父组件发送事件
 * @param parentName 父组件名称
 * @param event 事件名称
 * @param data 事件数据
 * @param childId 子组件ID
 * @param childName 子组件名称
 */
function emitToParent(parentName: string, event: string, data?: any, childId?: string, childName?: string) {
    const listeners = eventListeners.get(`parent_${parentName}`);
    if (listeners) {
        const handler = listeners.get(event);
        if (handler) {
            handler(data, childId, childName);
        } else {
            logger.warn(`No listener for event ${event} in parent ${parentName}`);
        }
    } else {
        logger.warn(`No event listeners registered for parent ${parentName}`);
    }
}

/**
 * 向子组件发送事件
 * @param childId 子组件ID
 * @param event 事件名称
 * @param data 事件数据
 */
function emitToChild(childId: string, event: string, data?: any) {
    const listeners = eventListeners.get(`child_${childId}`);
    if (listeners) {
        const handler = listeners.get(event);
        if (handler) {
            handler(data);
        } else {
            logger.warn(`No listener for event ${event} in child ${childId}`);
        }
    } else {
        logger.warn(`No event listeners registered for child ${childId}`);
    }
}

/**
 * 注册子组件事件监听器（父组件使用）
 * @param parentName 父组件名称
 * @param event 事件名称
 * @param handler 事件处理函数
 */
export function onChildEvent(parentName: string, event: string, handler: Function) {
    const key = `parent_${parentName}`;
    if (!eventListeners.has(key)) {
        eventListeners.set(key, new Map());
    }
    eventListeners.get(key)!.set(event, handler);
    logger.log(`Parent ${parentName} registered listener for child event: ${event}`);
}

/**
 * 注册父组件事件监听器（子组件使用）
 * @param childId 子组件ID
 * @param event 事件名称
 * @param handler 事件处理函数
 */
export function onParentEvent(childId: string, event: string, handler: Function) {
    const key = `child_${childId}`;
    if (!eventListeners.has(key)) {
        eventListeners.set(key, new Map());
    }
    eventListeners.get(key)!.set(event, handler);
    logger.log(`Child ${childId} registered listener for parent event: ${event}`);
}

// 工具函数

/**
 * 检查是否存在指定父组件
 * @param parentName 父组件名称
 * @returns 是否存在
 */
export function hasParent(parentName: string): boolean {
    return parentMap.has(parentName);
}

/**
 * 获取所有已注册的父组件名称
 * @returns 父组件名称数组
 */
export function getRegisteredParents(): string[] {
    return Array.from(parentMap.keys());
}

/**
 * 获取所有已注册的子组件ID
 * @returns 子组件ID数组
 */
export function getRegisteredChildren(): string[] {
    return Array.from(childMap.keys());
}

/**
 * 获取等待连接的子组件列表
 * @returns 等待连接的子组件映射
 */
export function getPendingChildren(): Map<string, Array<{ childId: string; componentName: string }>> {
    return new Map(pendingChildren);
}

/**
 * 刷新所有父子组件链接
 */
export function refreshAllLinks() {
    logger.log('Refreshing all parent-child links');

    for (const [parentName, children] of pendingChildren.entries()) {
        const parent = parentMap.get(parentName);
        if (parent) {
            children.forEach(({ childId }) => {
                const child = childMap.get(childId);
                if (child && !parent.getChildren().find(c => c.id === childId)) {
                    parent.addChild(child);
                }
            });
            pendingChildren.delete(parentName);
        }
    }
}
