import type { ExtractPropTypes, PropType } from 'vue';
import type { OptionType } from '../../types/global';

/**
 * u-dropdown-item 下拉菜单项 Props
 * @description 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景
 * @property {String|Number|Array} modelValue 双向绑定选项卡选择值
 * @property {String|Number} title 菜单项标题
 * @property {OptionType[]} options 选项数据，如果传入了默认slot，此参数无效
 * @property {Boolean} disabled 是否禁用此选项卡（默认false）
 * @property {String|Number} height 弹窗下拉内容的高度(内容超出将会滚动)（默认auto）
 */

export const DropdownItemProps = {
    /** 当前选中项的value值 */
    modelValue: { type: [Number, String, Array] as PropType<number | string | any[]>, default: '' },
    /** 菜单项标题 */
    title: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 选项数据，如果传入了默认slot，此参数无效 */
    options: { type: Array as PropType<OptionType[]>, default: () => [] },
    /** 是否禁用此菜单项 */
    disabled: { type: Boolean, default: false },
    /** 下拉弹窗的高度 */
    height: { type: [Number, String] as PropType<number | string>, default: 'auto' }
};

export type DropdownItemProps = ExtractPropTypes<typeof DropdownItemProps>;
