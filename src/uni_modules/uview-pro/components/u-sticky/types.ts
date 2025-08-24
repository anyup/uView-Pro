import type { ExtractPropTypes, PropType } from 'vue';

/**
 * StickyProps 吸顶组件 props 类型定义
 * @description 吸顶组件，支持自定义吸顶距离、z-index、背景色等
 */
export const StickyProps = {
    /** 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px */
    offsetTop: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 列表中的索引值 */
    index: { type: [Number, String] as PropType<number | string>, default: '' },
    /** 是否开启吸顶功能 */
    enable: { type: Boolean, default: true },
    /** h5顶部导航栏的高度 */
    h5NavHeight: { type: [Number, String] as PropType<number | string>, default: 44 },
    /** 吸顶区域的背景颜色 */
    bgColor: { type: String, default: '#ffffff' },
    /** z-index值 */
    zIndex: { type: [Number, String] as PropType<number | string>, default: '' }
};

export type StickyProps = ExtractPropTypes<typeof StickyProps>;
