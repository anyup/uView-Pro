import type { ExtractPropTypes, PropType } from 'vue';
import type { StepMode, ThemeType } from '../../types/global';
import { getColor } from '../../';

/**
 * StepProps 步骤条 props 类型定义
 * @description 步骤条，支持横向/竖向、主题色、激活色等
 */

export const StepProps = {
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
    /** 步骤条的类型，dot|number */
    mode: { type: String as PropType<StepMode>, default: 'dot' },
    /** 主题类型, primary|success|info|warning|error */
    type: { type: String as PropType<ThemeType>, default: 'primary' },
    /** 激活步骤的颜色 */
    activeColor: { type: String, default: () => getColor('primary') },
    /** 未激活的颜色 */
    unActiveColor: { type: String, default: () => getColor('info') },
    /** 自定义图标 */
    icon: { type: String, default: 'checkmark' },
    /** 标题 */
    name: { type: String, default: '' },
    /** 描述 */
    desc: { type: String, default: '' }
};

export type StepProps = ExtractPropTypes<typeof StepProps>;
