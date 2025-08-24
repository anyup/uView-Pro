import type { ExtractPropTypes, PropType } from 'vue';
import type { TabsSwiperAutoCenterMode, TabsSwiperListItem } from '../../types/global';

/**
 * TabsSwiperProps 全屏选项卡 props 类型定义
 * @description 全屏选项卡，支持滑块、渐变色、滚动居中等
 */
export const TabsSwiperProps = {
    /** tabs是否可以左右拖动 */
    isScroll: { type: Boolean, default: true },
    /** 标签数组，元素为对象，如[{name: '推荐'}] */
    list: { type: Array as PropType<Array<TabsSwiperListItem>>, default: () => [] },
    /** 指定哪个tab为激活状态 */
    current: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 导航栏的高度，单位rpx */
    height: { type: [Number, String] as PropType<number | string>, default: 80 },
    /** tab文字大小，单位rpx */
    fontSize: { type: [Number, String] as PropType<number | string>, default: 30 },
    /** tabs组件外部swiper的宽度，单位rpx */
    swiperWidth: { type: [String, Number] as PropType<number | string>, default: 750 },
    /** 滑块和激活tab文字的颜色 */
    activeColor: { type: String, default: '#2979ff' },
    /** tabs文字颜色 */
    inactiveColor: { type: String, default: '#303133' },
    /** 滑块宽度，单位rpx */
    barWidth: { type: [Number, String] as PropType<number | string>, default: 40 },
    /** 滑块高度，单位rpx */
    barHeight: { type: [Number, String] as PropType<number | string>, default: 6 },
    /** 单个tab标签的左右内边距之和，单位rpx */
    gutter: { type: [Number, String] as PropType<number | string>, default: 40 },
    /** z-index 层级 */
    zIndex: { type: [Number, String] as PropType<number | string>, default: 1 },
    /** tabs导航栏的背景颜色 */
    bgColor: { type: String, default: '#ffffff' },
    /** 居中模式，window/组件宽度 */
    autoCenterMode: { type: String as unknown as PropType<TabsSwiperAutoCenterMode>, default: 'window' },
    /** 组件内部读取的list参数中的属性名（tab名称） */
    name: { type: String, default: 'name' },
    /** 组件内部读取的list参数中的属性名（badge徽标数） */
    count: { type: String, default: 'count' },
    /** 设置badge徽标数的位置偏移，格式为 [x, y]，单位rpx */
    offset: { type: Array as unknown as PropType<[number, number]>, default: () => [5, 20] },
    /** 激活选项的字体是否加粗 */
    bold: { type: Boolean, default: true },
    /** 活动tabs item的样式，对象形式 */
    activeItemStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 是否显示底部的滑块 */
    showBar: { type: Boolean, default: true },
    /** 底部滑块的样式，对象形式 */
    barStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) }
};

export type TabsSwiperProps = ExtractPropTypes<typeof TabsSwiperProps>;
