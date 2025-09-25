import type { PropType } from 'vue';

export const stringProp = <T>(defaultVal: T) => ({
    type: String as unknown as PropType<T>,
    default: defaultVal
});

export const stringOrObjectProp = <T>(defaultVal: T) => ({
    type: [String, Object] as PropType<string | Record<string, any>>,
    default: defaultVal
});

export const baseProps = {
    /**
     * 自定义根节点样式
     */
    customStyle: stringOrObjectProp(''),
    /**
     * 自定义根节点样式类
     */
    customClass: stringProp('')
};
