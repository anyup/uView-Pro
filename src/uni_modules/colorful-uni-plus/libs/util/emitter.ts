import type { ComponentInternalInstance } from 'vue'

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
function dispatch(
  instance: ComponentInternalInstance | null | undefined,
  componentName: string,
  eventName: string,
  ...params: any[]
) {
  let parent = instance && (instance.parent as ComponentInternalInstance | null | undefined)
  while (parent) {
    const name = (parent.type as any)?.name as string | undefined
    if (name === componentName) {
      // 找到目标组件，派发事件
      parent.emit && parent.emit(eventName, ...params)
      break
    }
    parent = parent.parent
  }
}

/**
 * 向下递归查找子组件并广播事件
 * @param instance 当前组件实例（setup中可用getCurrentInstance()）
 * @param componentName 目标组件名
 * @param eventName 事件名
 * @param params 参数
 */
function broadcast(
  instance: ComponentInternalInstance | null | undefined,
  componentName: string,
  eventName: string,
  ...params: any[]
) {
  if (!instance) return
  const subTree = (instance.subTree as any)?.children || []
  const children = Array.isArray(subTree) ? subTree : [subTree]
  children.forEach((vnode: any) => {
    const child = vnode.component as ComponentInternalInstance | undefined
    
    if (child) {
      const name = (child.type as any)?.name as string | undefined
      if (name === componentName) {
        child.emit && child.emit(eventName, ...params)
      } else {
        broadcast(child, componentName, eventName, ...params)
      }
    }
  })
}

export { dispatch, broadcast }
