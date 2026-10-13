import type { ExtractPropTypes, PropType } from 'vue';

export const ColorSelectPanelProps = {
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
    /** 绑定值 */
    modelValue: {
        type: String,
        default: '#000000'
    },
    /** 颜色模式: 'solid'|'gradient'|'both' */
    colorMode: {
        type: String as PropType<'solid' | 'gradient' | 'both'>,
        default: 'both'
    },
    /** 是否显示透明度 */
    showAlpha: {
        type: Boolean,
        default: true
    },
    /** 是否显示吸管 */
    showEyeDropper: {
        type: Boolean,
        default: true
    },
    /** 是否显示历史记录 */
    showHistory: {
        type: Boolean,
        default: true
    },
    /** 是否显示预设颜色 */
    showPresets: {
        type: Boolean,
        default: true
    },
    /** 预设颜色列表 */
    presets: {
        type: Array as PropType<string[]>,
        default: () => [
            '#000000',
            '#ffffff',
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#ffff00',
            '#00ffff',
            '#ff00ff',
            '#c0c0c0',
            '#808080',
            '#800000',
            '#800080',
            '#008000',
            '#008080',
            '#000080'
        ]
    },
    /** 格式: 'HEX' | 'RGB' */
    format: {
        type: String as PropType<'HEX' | 'RGB'>,
        default: 'HEX'
    },
    /** 是否禁用 */
    disabled: {
        type: Boolean,
        default: false
    }
};

export type ColorSelectPanelProps = ExtractPropTypes<typeof ColorSelectPanelProps>;

export interface ColorObject {
    hex: string;
    rgb: { r: number; g: number; b: number };
    hsl: { h: number; s: number; l: number };
    hsv: { h: number; s: number; v: number };
    alpha: number;
    source: string; // 'hex' | 'rgb' | 'hsl'
}
