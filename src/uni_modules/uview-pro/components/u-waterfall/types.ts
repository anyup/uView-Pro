import type { ExtractPropTypes, PropType } from 'vue';

/**
 * WaterfallProps waterfall props 类型定义
 * @description 瀑布流组件，支持数据、间隔、idKey
 */
export const WaterfallProps = {
    /** 自定义根节点样式 */
    customStyle: {
        type: [String, Object] as PropType<string | Record<string, any>>,
        default: () => ({})
    },
    /** 自定义根节点样式类 */
    customClass: {
        type: String as unknown as PropType<string>,
        default: ''
    },
    /** 瀑布流数据数组，必填 */
    modelValue: { type: Array as PropType<any[]>, required: true, default: () => [] },
    /** 新增数据的动画间隔，单位ms */
    addTime: { type: [Number, String] as PropType<number | string>, default: 200 },
    /** 数据项的唯一标识key */
    idKey: { type: String, default: 'id' }
};

export type WaterfallProps = ExtractPropTypes<typeof WaterfallProps>;
