import { type ComponentInternalInstance, getCurrentInstance } from 'vue';

export function useParent(name: string) {
    const instance: ComponentInternalInstance | null | undefined = getCurrentInstance();

    function getParent(componentName?: string) {
        componentName = componentName || name;
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
    function getParentData(componentName?: string) {
        componentName = componentName || name;
        const parent = getParent(componentName);
        return parent ? parent.exposed : null;
    }

    return {
        getParent,
        getParentData
    };
}
