import type { ExtractPropTypes, PropType } from 'vue';
import type { ThemeType } from '../../types/global';
import { baseProps } from '../common/props';

export const TextProps = {
    ...baseProps,
    // 主题颜色
    type: { type: String as PropType<ThemeType>, default: '' },
    /** 是否显示文本 */
    show: { type: Boolean, default: true },
    /** 显示的值 */
    text: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 前置图标 */
    prefixIcon: { type: String, default: '' },
    /** 后置图标 */
    suffixIcon: { type: String, default: '' },
    /** 文本处理模式 */
    mode: { type: String as PropType<'text' | 'price' | 'phone' | 'name' | 'date' | 'link'>, default: 'text' },
    /** 链接地址 */
    href: { type: String, default: '' },
    /** 格式化规则 */
    format: { type: [String, Function] as PropType<string | ((val: any) => any)>, default: '' },
    /** 是否拨打电话 */
    call: { type: Boolean, default: false },
    /** 小程序打开方式 */
    openType: { type: String, default: '' },
    /** 是否粗体 */
    bold: { type: Boolean, default: false },
    /** 是否块状 */
    block: { type: Boolean, default: false },
    /** 显示行数，超出省略号 */
    lines: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 文本颜色 */
    color: { type: String, default: '#303133' },
    /** 字体大小 */
    size: { type: [String, Number] as PropType<string | number>, default: 28 },
    /** 图标样式 */
    iconStyle: {
        type: [Object, String] as PropType<Record<string, any> | string>,
        default: () => ({ fontSize: '15px' })
    },
    /** 文字样式 */
    textStyle: { type: [Object, String] as PropType<Record<string, any> | string>, default: () => ({}) },
    /** 文字装饰 */
    decoration: { type: String as PropType<'none' | 'underline' | 'line-through'>, default: 'none' },
    /** 外边距 */
    margin: { type: [Object, String, Number] as PropType<Record<string, any> | string | number>, default: 0 },
    /** 行高 */
    lineHeight: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 对齐方式 */
    align: { type: String as PropType<'left' | 'center' | 'right'>, default: 'left' },
    /** 换行方式 */
    wordWrap: { type: String as PropType<'break-word' | 'normal' | 'anywhere'>, default: 'normal' },
    /** 语言 */
    lang: { type: String, default: '' },
    /** 会话来源 */
    sessionFrom: { type: String, default: '' },
    /** 消息标题 */
    sendMessageTitle: { type: String, default: '' },
    /** 消息路径 */
    sendMessagePath: { type: String, default: '' },
    /** 消息图片 */
    sendMessageImg: { type: String, default: '' },
    /** 是否显示消息卡片 */
    showMessageCard: { type: Boolean, default: false },
    /** app参数 */
    appParameter: { type: String, default: '' },
    /** 表单类型 */
    formType: { type: String, default: '' }
};

export type TextProps = ExtractPropTypes<typeof TextProps>;
