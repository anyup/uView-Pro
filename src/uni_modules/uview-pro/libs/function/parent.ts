import { type ComponentInternalInstance, getCurrentInstance } from 'vue';

export function parent(componentName?: string, _instance: ComponentInternalInstance | null | undefined = null) {
    const instance = _instance || getCurrentInstance();

    let parent = instance && (instance.parent as ComponentInternalInstance | null | undefined);

    while (parent) {
        const name = (parent.type as any)?.name as string | undefined;
        if (name === componentName) {
            return parent;
        }
        parent = parent.parent;
    }
    return null;
}
export function parentData(componentName?: string, _instance: ComponentInternalInstance | null | undefined = null) {
    const instance = _instance || getCurrentInstance();
    const findParent = parent(componentName, instance);
    return findParent ? findParent.exposed : null;
}
