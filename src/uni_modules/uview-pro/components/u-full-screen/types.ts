import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';

/**
 * u-full-screen 组件 Props 类型定义
 * @description 用于APP弹窗遮盖导航栏和底部tabbar，提示新版本升级内容
 */
export const FullScreenProps = {
    ...baseProps,
    /** 是否显示弹窗 */
    show: { type: Boolean, default: false },
    /** 升级内容，支持富文本 */
    content: { type: String, default: '' }
};

export type FullScreenProps = ExtractPropTypes<typeof FullScreenProps>;
