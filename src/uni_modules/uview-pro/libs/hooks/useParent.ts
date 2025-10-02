import { getCurrentInstance, onUnmounted } from 'vue';

export function useParent(name: string) {
    const instance = getCurrentInstance();

    function getParent() {
        if (!instance) return null;

        // 查找父组件
        let parent: any = instance.parent;
        while (parent) {
            const parentName = parent.type?.name;
            if (parentName === name) break;
            parent = parent.parent;
        }

        // 建立父子关系
        if (parent) {
            (parent as any).children = (parent as any).children || [];
            (parent as any).children.push(instance);
            // 卸载时移除
            onUnmounted(() => {
                const i = parent.children.indexOf(instance);
                i > -1 && parent.children.splice(i, 1);
            });
        }
        return parent;
    }

    return {
        getParent
    };
}
