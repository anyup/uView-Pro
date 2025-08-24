import type { ExtractPropTypes, PropType } from 'vue';

/**
 * TabbarProps 底部导航栏 props 类型定义
 * @description 底部导航栏，支持凸起按钮、徽标、切换前回调等
 */
export const TabbarProps = {
    /** 是否显示tabbar */
    show: { type: Boolean, default: true },
    /** v-model绑定当前激活项的值 */
    modelValue: { type: [String, Number] as PropType<string | number>, default: 0 },
    /** tabbar背景色 */
    bgColor: { type: String, default: '#ffffff' },
    /** tabbar高度，单位任意，数值默认rpx */
    height: { type: [String, Number] as PropType<string | number>, default: '50px' },
    /** 非凸起图标的大小，单位任意，数值默认rpx */
    iconSize: { type: [String, Number] as PropType<string | number>, default: 40 },
    /** 凸起图标的大小，单位任意，数值默认rpx */
    midButtonSize: { type: [String, Number] as PropType<string | number>, default: 90 },
    /** 激活时的颜色 */
    activeColor: { type: String, default: '#303133' },
    /** 未激活时的颜色 */
    inactiveColor: { type: String, default: '#606266' },
    /** 是否显示中部凸起按钮 */
    midButton: { type: Boolean, default: false },
    /** tabbar配置项数组 */
    list: { type: Array as PropType<any[]>, default: () => [] },
    /** 切换前回调，返回true或Promise */
    beforeSwitch: { type: Function as PropType<((index: number) => boolean | Promise<any>) | null>, default: null },
    /** 是否显示顶部横线 */
    borderTop: { type: Boolean, default: true },
    /** 是否隐藏原生tabbar */
    hideTabBar: { type: Boolean, default: true }
};

export type TabbarProps = ExtractPropTypes<typeof TabbarProps>;
