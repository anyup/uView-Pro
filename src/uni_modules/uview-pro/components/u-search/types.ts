import type { ExtractPropTypes, PropType } from 'vue';
import type { InputAlign, SearchShape } from '../../types/global';

/**
 * SearchProps 搜索框 props 类型定义
 * @description 集成常见搜索框功能，开箱即用
 */
export const SearchProps = {
    /** 搜索框形状，round-圆形，square-方形 */
    shape: { type: String as PropType<SearchShape>, default: 'round' },
    /** 搜索框背景色，默认值#f2f2f2 */
    bgColor: { type: String, default: '#f2f2f2' },
    /** 占位提示文字 */
    placeholder: { type: String, default: '请输入关键字' },
    /** 是否启用清除控件 */
    clearabled: { type: Boolean, default: true },
    /** 是否自动聚焦 */
    focus: { type: Boolean, default: false },
    /** 是否在搜索框右侧显示取消按钮 */
    showAction: { type: Boolean, default: true },
    /** 右边控件的样式 */
    actionStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 取消按钮文字 */
    actionText: { type: String, default: '搜索' },
    /** 输入框内容对齐方式，可选值为 left|center|right */
    inputAlign: { type: String as PropType<InputAlign>, default: 'left' },
    /** 是否启用输入框 */
    disabled: { type: Boolean, default: false },
    /** 开启showAction时，是否在input获取焦点时才显示 */
    animation: { type: Boolean, default: false },
    /** 边框颜色，只要配置了颜色，才会有边框 */
    borderColor: { type: String, default: 'none' },
    /** 输入框的初始化内容 */
    modelValue: { type: String, default: '' },
    /** 搜索框高度，单位rpx */
    height: { type: [Number, String] as PropType<number | string>, default: 64 },
    /** input输入框的样式，可以定义文字颜色，大小等，对象形式 */
    inputStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档) */
    maxlength: { type: [Number, String] as PropType<number | string>, default: '-1' },
    /** 搜索图标的颜色，默认同输入框字体颜色 */
    searchIconColor: { type: String, default: '' },
    /** 输入框字体颜色 */
    color: { type: String, default: '#606266' },
    /** placeholder的颜色 */
    placeholderColor: { type: String, default: '#909399' },
    /** 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30rpx"、"30rpx 20rpx"等写法 */
    margin: { type: String, default: '0' },
    /** 左边输入框的图标，可以为uView图标名称或图片路径 */
    searchIcon: { type: String, default: 'search' }
};

export type SearchProps = ExtractPropTypes<typeof SearchProps>;
