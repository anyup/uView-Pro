import type { ExtractPropTypes, PropType } from 'vue';

/**
 * ReadMoreProps 阅读更多 props 类型定义
 * @description 内容较长时收起/展开的场景
 */
export const ReadMoreProps = {
    /** 默认的显示占位高度，单位为rpx */
    showHeight: { type: [Number, String] as PropType<number | string>, default: 400 },
    /** 展开后是否显示"收起"按钮 */
    toggle: { type: Boolean, default: false },
    /** 关闭时的提示文字 */
    closeText: { type: String, default: '展开阅读全文' },
    /** 展开时的提示文字 */
    openText: { type: String, default: '收起' },
    /** 提示的文字颜色 */
    color: { type: String, default: '#2979ff' },
    /** 提示文字的大小 */
    fontSize: { type: [String, Number] as PropType<number | string>, default: 28 },
    /** 是否显示阴影 */
    shadowStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({
            backgroundImage: 'linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)',
            paddingTop: '300rpx',
            marginTop: '-300rpx'
        })
    },
    /** 段落首行缩进的字符个数 */
    textIndent: { type: String, default: '2em' },
    /** open和close事件时，将此参数返回在回调参数中 */
    index: { type: [Number, String] as PropType<number | string>, default: '' }
};

export type ReadMoreProps = ExtractPropTypes<typeof ReadMoreProps>;
