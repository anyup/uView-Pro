import type { ExtractPropTypes, PropType } from 'vue';
import type { SelectListItem, SelectMode } from '../../types/global';

/**
 * SelectProps 列选择器 props 类型定义
 * @description 用于单列、多列、多列联动的选择场景
 */
export const SelectProps = {
    /** 列数据 */
    list: { type: Array as PropType<SelectListItem[] | SelectListItem[][]>, default: () => [] },
    /** 是否显示边框 */
    border: { type: Boolean, default: true },
    /** 通过双向绑定控制组件的弹出与收起 */
    modelValue: { type: Boolean, default: false },
    /** "取消"按钮的颜色 */
    cancelColor: { type: String, default: '#606266' },
    /** "确定"按钮的颜色 */
    confirmColor: { type: String, default: '#2979ff' },
    /** 弹出的z-index值 */
    zIndex: { type: [String, Number] as PropType<string | number>, default: 0 },
    /** 是否开启底部安全区适配 */
    safeAreaInsetBottom: { type: Boolean, default: false },
    /** 是否允许通过点击遮罩关闭Picker */
    maskCloseAble: { type: Boolean, default: true },
    /** 提供的默认选中的下标 */
    defaultValue: { type: Array as PropType<number[]>, default: () => [0] },
    /** 模式选择，single-column-单列，mutil-column-多列，mutil-column-auto-多列联动 */
    mode: { type: String as PropType<SelectMode>, default: 'single-column' },
    /** 自定义value属性名 */
    valueName: { type: String, default: 'value' },
    /** 自定义label属性名 */
    labelName: { type: String, default: 'label' },
    /** 自定义多列联动模式的children属性名 */
    childName: { type: String, default: 'children' },
    /** 顶部标题 */
    title: { type: String, default: '' },
    /** 取消按钮的文字 */
    cancelText: { type: String, default: '取消' },
    /** 确认按钮的文字 */
    confirmText: { type: String, default: '确认' }
};

export type SelectProps = ExtractPropTypes<typeof SelectProps>;
