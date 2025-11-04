import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import type { FabDirection, FabGap, FabPosition, ThemeType } from '../../types/global';
import { baseProps } from '../common/props';

/**
 * fab 悬浮按钮类型定义
 * @description 供 u-fab 组件 props 使用
 */

export const FabProps = {
    ...baseProps,
    /** 按钮的预置样式，primary，info，error，warning，success */
    type: { type: String as PropType<ThemeType>, default: 'primary' },
    /** 是否禁止状态 */
    disabled: { type: Boolean, default: false },
    /** 按钮能否可以拖动 */
    draggable: { type: Boolean, default: false },
    /** 按钮与边缘的间距，单位 px。支持 number 或对象 {top,left,right,bottom}，优先级按键存在顺序 */
    gap: {
        type: Object as PropType<FabGap>,
        default: () => ({
            top: 16,
            left: 16,
            right: 16,
            bottom: 16
        })
    },
    /** 拖动结束时是否自动吸边（仅当 draggable 为 true 时生效） */
    autoStick: { type: Boolean, default: true },
    /** 预设定位：控制组件默认停靠位置 */
    position: {
        type: String as PropType<FabPosition>,
        default: 'right-bottom'
    },
    /** 菜单出现的方向 */
    direction: { type: String as PropType<FabDirection>, default: 'top' },
    /** 按钮自定义层级 */
    zIndex: { type: Number, default: 99 }
};

export type FabProps = ExtractPropTypes<typeof FabProps>;

interface DirectionConfig {
    opposite: keyof CSSProperties;
    sizeKey: 'width' | 'height';
    positionKey: 'left' | 'top';
    flexBase: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}

export const directionConfig: Record<FabDirection, DirectionConfig> = {
    top: {
        opposite: 'bottom',
        sizeKey: 'width',
        positionKey: 'left',
        flexBase: 'column'
    },
    bottom: {
        opposite: 'top',
        sizeKey: 'width',
        positionKey: 'left',
        flexBase: 'column-reverse'
    },
    left: {
        opposite: 'right',
        sizeKey: 'height',
        positionKey: 'top',
        flexBase: 'row'
    },
    right: {
        opposite: 'left',
        sizeKey: 'height',
        positionKey: 'top',
        flexBase: 'row-reverse'
    }
};
