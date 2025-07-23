import { type ComponentInternalInstance, getCurrentInstance } from 'vue';

export function parent(componentName?: string) {
    const instance: ComponentInternalInstance | null | undefined = getCurrentInstance();
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

export function parentData(componentName?: string) {
    const parentData = parent(componentName);
    return parentData?.exposed ?? null;
}
