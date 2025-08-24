import type { ExtractPropTypes, PropType } from 'vue';

/**
 * WaterfallProps waterfall props 类型定义
 * @description 瀑布流组件，支持数据、间隔、idKey
 */
export const WaterfallProps = {
    /** 瀑布流数据数组，必填 */
    modelValue: { type: Array as PropType<any[]>, required: true, default: () => [] },
    /** 新增数据的动画间隔，单位ms */
    addTime: { type: [Number, String] as PropType<number | string>, default: 200 },
    /** 数据项的唯一标识key */
    idKey: { type: String, default: 'id' }
};

export type WaterfallProps = ExtractPropTypes<typeof WaterfallProps>;
