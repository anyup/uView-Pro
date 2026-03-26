import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-full-screen 组件 Props 类型定义
 * @description 用于APP弹窗遮盖导航栏和底部tabbar，提示新版本升级内容
 */
export const FullScreenProps = {
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
    /** 是否显示弹窗 */
    show: { type: Boolean, default: false },
    /** 弹窗标题 */
    title: { type: String, default: '' },
    /** 升级内容，支持富文本 */
    content: { type: String, default: '' }
};

export type FullScreenProps = ExtractPropTypes<typeof FullScreenProps>;
