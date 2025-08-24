import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-city-select 城市选择器 Props
 * @description 用于选择省、市、区三级行政区域，支持回显和自定义初始值。
 */
export const CitySelectProps = {
    /** 控制弹窗显示与隐藏（v-model） */
    modelValue: { type: Boolean, default: false },
    /** 默认选中的省市区名称数组 */
    defaultRegion: { type: Array as PropType<string[]>, default: () => [] },
    /** 默认选中的省市区编码数组 */
    areaCode: { type: Array as PropType<string[]>, default: () => [] },
    /** 是否允许点击遮罩关闭弹窗 */
    maskCloseAble: { type: Boolean, default: true },
    /** 弹窗层级 */
    zIndex: { type: [String, Number] as PropType<string | number>, default: 0 }
};

export type CitySelectProps = ExtractPropTypes<typeof CitySelectProps>;
