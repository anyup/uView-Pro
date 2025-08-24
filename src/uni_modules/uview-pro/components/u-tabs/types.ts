import type { ExtractPropTypes, PropType } from 'vue';
import type { TabsItem } from '../../types/global';

/**
 * TabsProps tabs标签 props 类型定义
 * @description 标签组件，支持横向滚动、滑块、徽标等
 */
export const TabsProps = {
    /** tabs是否可以左右拖动 */
    isScroll: { type: Boolean, default: true },
    /** 标签数组 */
    list: { type: Array as PropType<Array<TabsItem>>, default: () => [] },
    /** 当前活动tab的索引 */
    current: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 导航栏的高度和行高 */
    height: { type: [String, Number] as PropType<number | string>, default: 80 },
    /** 字体大小 */
    fontSize: { type: [String, Number] as PropType<number | string>, default: 30 },
    /** 过渡动画时长, 单位s */
    duration: { type: [String, Number] as PropType<number | string>, default: 0.5 },
    /** 选中项的主题颜色 */
    activeColor: { type: String, default: '#2979ff' },
    /** 未选中项的颜色 */
    inactiveColor: { type: String, default: '#303133' },
    /** 菜单底部移动的bar的宽度，单位rpx */
    barWidth: { type: [String, Number] as PropType<number | string>, default: 40 },
    /** 移动bar的高度 */
    barHeight: { type: [String, Number] as PropType<number | string>, default: 6 },
    /** 单个tab的左右内边距之和，单位rpx */
    gutter: { type: [String, Number] as PropType<number | string>, default: 30 },
    /** 导航栏的背景颜色 */
    bgColor: { type: String, default: '#ffffff' },
    /** 读取传入的数组对象的属性(tab名称) */
    name: { type: String, default: 'name' },
    /** 读取传入的数组对象的属性(徽标数) */
    count: { type: String, default: 'count' },
    /** 徽标数位置偏移 */
    offset: { type: Array as unknown as PropType<[number, number]>, default: () => [5, 20] },
    /** 活动tab字体是否加粗 */
    bold: { type: Boolean, default: true },
    /** 当前活动tab item的样式 */
    activeItemStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 是否显示底部的滑块 */
    showBar: { type: Boolean, default: true },
    /** 底部滑块的自定义样式 */
    barStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 标签的宽度 */
    itemWidth: { type: [String, Number] as PropType<number | string>, default: 'auto' }
};

export type TabsProps = ExtractPropTypes<typeof TabsProps>;
