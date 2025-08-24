import type { ExtractPropTypes, PropType } from 'vue';
import type { StepDirection, StepMode, StepsListItem, ThemeType } from '../../types/global';

/**
 * StepsProps 步骤条 props 类型定义
 * @description 步骤条，支持横向/竖向、主题色、激活色等
 */

export const StepsProps = {
    /** 步骤条的类型，dot|number */
    mode: { type: String as PropType<StepMode>, default: 'dot' },
    /** 步骤条的数据 */
    list: { type: Array as PropType<StepsListItem[]>, default: () => [] },
    /** 主题类型, primary|success|info|warning|error */
    type: { type: String as PropType<ThemeType>, default: 'primary' },
    /** 当前哪一步是激活的 */
    current: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 激活步骤的颜色 */
    activeColor: { type: String, default: '#2979ff' },
    /** 未激活的颜色 */
    unActiveColor: { type: String, default: '#909399' },
    /** 自定义图标 */
    icon: { type: String, default: 'checkmark' },
    /** step的排列方向，row-横向，column-竖向 */
    direction: { type: String as PropType<StepDirection>, default: 'row' }
};

export type StepsProps = ExtractPropTypes<typeof StepsProps>;
