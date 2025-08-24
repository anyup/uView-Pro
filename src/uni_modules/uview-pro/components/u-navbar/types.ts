import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-navbar 组件 props 类型定义
 * @description 自定义导航栏，支持多种样式
 */
export const NavbarProps = {
    /** 导航栏高度，单位px，非rpx */
    height: {
        type: [String, Number] as PropType<string | number>,
        default: ''
    },
    /** 返回箭头的颜色 */
    backIconColor: {
        type: String,
        default: '#606266'
    },
    /** 左边返回的图标 */
    backIconName: {
        type: String,
        default: 'nav-back'
    },
    /** 左边返回图标的大小，rpx */
    backIconSize: {
        type: [String, Number] as PropType<string | number>,
        default: '44'
    },
    /** 返回的文字提示 */
    backText: {
        type: String,
        default: ''
    },
    /** 返回的文字的 样式 */
    backTextStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({ color: '#606266' })
    },
    /** 导航栏标题 */
    title: {
        type: String,
        default: ''
    },
    /** 标题的宽度，单位rpx */
    titleWidth: {
        type: [String, Number] as PropType<string | number>,
        default: '250'
    },
    /** 标题的颜色 */
    titleColor: {
        type: String,
        default: '#606266'
    },
    /** 标题字体是否加粗 */
    titleBold: {
        type: Boolean,
        default: false
    },
    /** 标题的字体大小 */
    titleSize: {
        type: [String, Number] as PropType<string | number>,
        default: 32
    },
    /** 是否显示导航栏左边返回图标和辅助文字 */
    isBack: {
        type: [Boolean, String] as PropType<boolean | string>,
        default: true
    },
    /** 导航栏背景设置 */
    background: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({ background: '#ffffff' })
    },
    /** 导航栏是否固定在顶部 */
    isFixed: {
        type: Boolean,
        default: true
    },
    /** 是否沉浸式，允许fixed定位后导航栏塌陷，仅fixed定位下生效 */
    immersive: {
        type: Boolean,
        default: false
    },
    /** 是否显示导航栏的下边框 */
    borderBottom: {
        type: Boolean,
        default: true
    },
    /** 固定在顶部时的z-index值 */
    zIndex: {
        type: [String, Number] as PropType<string | number>,
        default: ''
    },
    /** 自定义返回逻辑方法 */
    customBack: {
        type: Function as PropType<() => void>,
        default: null
    }
};

/**
 * u-navbar 组件 props 类型
 */
export type NavbarProps = ExtractPropTypes<typeof NavbarProps>;
