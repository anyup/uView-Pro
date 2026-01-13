import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';
import type { TabbarItem } from '../../types/global';
import zIndex from '../../libs/config/zIndex';

/**
 * TabbarProps 底部导航栏 props 类型定义
 * @description 底部导航栏，支持凸起按钮、徽标、切换前回调等
 */
export const TabbarProps = {
    ...baseProps,
    /** 是否显示tabbar */
    show: { type: Boolean, default: true },
    /** v-model绑定当前激活项的值 */
    modelValue: { type: [String, Number] as PropType<string | number>, default: 0 },
    /** tabbar背景色 */
    bgColor: { type: String, default: 'var(--u-bg-white)' },
    /** tabbar高度，单位任意，数值默认rpx */
    height: { type: [String, Number] as PropType<string | number>, default: '50px' },
    /** 非凸起图标的大小，单位任意，数值默认rpx */
    iconSize: { type: [String, Number] as PropType<string | number>, default: 40 },
    /** 凸起图标的大小，单位任意，数值默认rpx */
    midButtonSize: { type: [String, Number] as PropType<string | number>, default: 100 },
    /** 文本大小，单位任意，数值默认rpx */
    textSize: { type: [String, Number] as PropType<string | number>, default: 26 },
    /** 激活时的颜色 */
    activeColor: { type: String, default: 'var(--u-main-color)' },
    /** 未激活时的颜色 */
    inactiveColor: { type: String, default: 'var(--u-content-color)' },
    /** 是否显示中部凸起按钮 */
    midButton: { type: Boolean, default: false },
    /** tabbar配置项数组 */
    list: { type: Array as PropType<TabbarItem[]>, default: () => [] },
    /** 切换前回调，返回true或Promise */
    beforeSwitch: { type: Function as PropType<((index: number) => boolean | Promise<any>) | null>, default: null },
    /** 是否显示顶部横线 */
    borderTop: { type: Boolean, default: true },
    /** 是否隐藏原生tabbar */
    hideTabBar: { type: Boolean, default: true },
    /** z-index层级 */
    zIndex: { type: [String, Number] as PropType<string | number>, default: zIndex.tabbar },
    /** icon和text的间距，单位任意，数值默认rpx */
    gap: { type: [String, Number] as PropType<string | number>, default: 8 }
};

export type TabbarProps = ExtractPropTypes<typeof TabbarProps>;
