import type { ExtractPropTypes, PropType } from 'vue';
import zIndex from '../../libs/config/zIndex';

/**
 * TopTipsProps top-tips props 类型定义
 * @description 顶部提示组件，支持导航栏高度、z-index
 */
export const TopTipsProps = {
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
    /** 导航栏高度，用于提示的初始化 */
    navbarHeight: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** z-index值 */
    zIndex: { type: [Number, String] as PropType<number | string>, default: zIndex.topTips }
};

export type TopTipsProps = ExtractPropTypes<typeof TopTipsProps>;
