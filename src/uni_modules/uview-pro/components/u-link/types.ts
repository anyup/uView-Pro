import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-link 组件 props 类型定义
 * @description 超链接组件，支持多端跳转/复制/提示
 */
export const LinkProps = {
    /** 文字颜色 */
    color: {
        type: String,
        default: '#2979ff'
    },
    /** 字体大小，单位rpx */
    fontSize: {
        type: [String, Number] as PropType<string | number>,
        default: 28
    },
    /** 是否显示下划线 */
    underLine: {
        type: Boolean,
        default: false
    },
    /** 要跳转的链接 */
    href: {
        type: String,
        default: ''
    },
    /** 小程序中复制到粘贴板的提示语 */
    mpTips: {
        type: String,
        default: '链接已复制，请在浏览器打开'
    },
    /** 下划线颜色 */
    lineColor: {
        type: String,
        default: ''
    }
};

/**
 * u-link 组件 props 类型
 */
export type LinkProps = ExtractPropTypes<typeof LinkProps>;
