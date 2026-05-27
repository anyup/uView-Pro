import type { ExtractPropTypes, PropType } from 'vue';
import { getColor } from '../../';
import zIndex from '../../libs/config/zIndex';

/**
 * u-dropdown 下拉菜单 Props
 * @description 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景
 */
export const DropdownProps = {
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
    /** 菜单标题和选项的激活态颜色 */
    activeColor: { type: String, default: () => getColor('primary') },
    /** 菜单标题和选项的未激活态颜色 */
    inactiveColor: { type: String, default: () => getColor('contentColor') },
    /** 点击遮罩是否关闭菜单 */
    closeOnClickMask: { type: Boolean, default: true },
    /** 点击当前激活项标题是否关闭菜单 */
    closeOnClickSelf: { type: Boolean, default: true },
    /** 过渡时间 */
    duration: { type: [Number, String] as PropType<number | string>, default: 300 },
    /** 标题菜单的高度，单位任意，数值默认为rpx单位 */
    height: { type: [Number, String] as PropType<number | string>, default: 80 },
    /** 是否显示下边框 */
    borderBottom: { type: Boolean, default: false },
    /** 标题的字体大小 */
    titleSize: { type: [Number, String] as PropType<number | string>, default: 28 },
    /** 下拉出来的内容部分的圆角值 */
    borderRadius: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 菜单右侧的icon图标 */
    menuIcon: { type: String, default: 'arrow-down' },
    /** 菜单右侧图标的大小 */
    menuIconSize: { type: [Number, String] as PropType<number | string>, default: 26 },
    /**
     * 是否使用fixed定位，开启后下拉菜单固定在顶部，
     * 自动适配状态栏和导航栏高度，并生成占位区域防止页面塌陷
     */
    fixed: { type: Boolean, default: false },
    /**
     * fixed定位时，在自动计算的偏移量基础上的额外顶部偏移量（px），用于用户微调位置。
     * 实际top = statusBarHeight + navbarHeight + offsetTop
     */
    offsetTop: { type: [Number, String] as PropType<number | string>, default: 0 },
    /**
     * fixed定位时，状态栏和导航栏所占的总高度（px）。
     * 默认不设置（空字符串），组件会自动获取系统状态栏高度 + 默认导航栏高度（44px）。
     * 设置任意数值（包括0）则使用用户指定值，不再自动计算。
     */
    navbarHeight: { type: [Number, String] as PropType<number | string>, default: '' },
    /**
     * 沉浸式模式，仅在fixed下生效。
     * 开启后不生成占位区域，允许页面内容延伸到dropdown下方（类似沉浸式导航栏）
     */
    immersive: { type: Boolean, default: false },
    /** fixed定位时的z-index值 */
    zIndex: { type: [Number, String] as PropType<number | string>, default: zIndex.dropdown }
};

export type DropdownProps = ExtractPropTypes<typeof DropdownProps>;
