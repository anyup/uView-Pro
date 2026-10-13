import type { ExtractPropTypes, PropType } from 'vue';
import { useLocale } from '../../';
import { ColorSelectPanelProps } from '../u-color-select-panel/types';

const { t } = useLocale();

export const ColorPickerProps = {
    ...ColorSelectPanelProps,
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
    show: {
        type: Boolean,
        default: false
    },
    /** 模式：popup-弹窗，inline-内联 */
    mode: {
        type: String as PropType<'popup' | 'inline'>,
        default: 'popup'
    },
    /** 标题 */
    title: {
        type: String,
        default: () => t('uColorPicker.title')
    },
    /** 确认按钮文字 */
    confirmText: {
        type: String,
        default: () => t('uColorPicker.confirmText')
    },
    /** 取消按钮文字 */
    cancelText: {
        type: String,
        default: () => t('uColorPicker.cancelText')
    },
    /** z-index */
    zIndex: {
        type: [String, Number],
        default: 10075
    },
    /** 形状：square-方形，circle-圆形 */
    shape: {
        type: String as PropType<'square' | 'circle'>,
        default: 'square'
    },
    /** 大小 */
    size: {
        type: [String, Number],
        default: '60rpx'
    },
    /** 是否禁用 */
    disabled: {
        type: Boolean,
        default: false
    }
};

export type ColorPickerProps = ExtractPropTypes<typeof ColorPickerProps>;
