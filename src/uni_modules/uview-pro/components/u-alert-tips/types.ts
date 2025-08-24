import { type ExtractPropTypes, type PropType } from 'vue';
import type { ThemeType } from '../../types/global';

/**
 * alertTips 警告提示
 * @description 警告提示，展现需要关注的信息
 */
export const AlertTipsProps = {
    /** 显示文字 */
    title: { type: String, default: '' },
    /** 主题，success/warning/info/error */
    type: { type: String as PropType<ThemeType>, default: 'warning' },
    /** 辅助性文字 */
    description: { type: String, default: '' },
    /** 是否可关闭 */
    closeAble: { type: Boolean, default: false },
    /** 关闭按钮自定义文本 */
    closeText: { type: String, default: '' },
    /** 是否显示图标 */
    showIcon: { type: Boolean, default: false },
    /** 文字颜色，如果定义了color值，icon会失效 */
    color: { type: String, default: '' },
    /** 背景颜色 */
    bgColor: { type: String, default: '' },
    /** 边框颜色 */
    borderColor: { type: String, default: '' },
    /** 是否显示 */
    show: { type: Boolean, default: true },
    /** 左边显示的icon */
    icon: { type: String, default: '' },
    /** icon的样式 */
    iconStyle: { type: Object, default: () => ({}) },
    /** 标题的样式 */
    titleStyle: { type: Object, default: () => ({}) },
    /** 描述文字的样式 */
    descStyle: { type: Object, default: () => ({}) }
};

export type AlertTipsProps = ExtractPropTypes<typeof AlertTipsProps>;
