import type { ExtractPropTypes, PropType } from 'vue';
import type { IconLabelPosition, ImgMode } from '../../types/global';

/**
 * u-icon 组件 Props 类型定义
 * 所有属性均带详细注释，类型安全，便于 IDE 智能提示
 */
export const IconProps = {
    /** 图标名称，见示例图标集 */
    name: { type: String, default: '' },
    /** 图标颜色，可接受主题色 */
    color: { type: String, default: '' },
    /** 字体大小，单位rpx（默认32） */
    size: { type: [Number, String] as PropType<string | number>, default: 'inherit' },
    /** 是否显示粗体 */
    bold: { type: Boolean, default: false },
    /** 点击图标的时候传递事件出去的index（用于区分点击了哪一个） */
    index: { type: [Number, String] as PropType<string | number>, default: '' },
    /** 触摸图标时的类名 */
    hoverClass: { type: String, default: '' },
    /** 自定义扩展前缀，方便用户扩展自己的图标库 */
    customPrefix: { type: String, default: 'uicon' },
    /** 图标右边或者下面的文字 */
    label: { type: [String, Number] as PropType<string | number>, default: '' },
    /** label的位置，只能右边或者下边 */
    labelPos: { type: String as PropType<IconLabelPosition>, default: 'right' },
    /** label的大小，单位rpx（默认28） */
    labelSize: { type: [String, Number] as PropType<string | number>, default: '28' },
    /** label的颜色 */
    labelColor: { type: String, default: '#606266' },
    /** label与图标的距离(横向排列)，单位rpx（默认6） */
    marginLeft: { type: [String, Number] as PropType<string | number>, default: '6' },
    /** label与图标的距离(竖向排列)，单位rpx（默认6） */
    marginTop: { type: [String, Number] as PropType<string | number>, default: '6' },
    /** label与图标的距离(竖向排列)，单位rpx（默认6） */
    marginRight: { type: [String, Number] as PropType<string | number>, default: '6' },
    /** label与图标的距离(竖向排列)，单位rpx（默认6） */
    marginBottom: { type: [String, Number] as PropType<string | number>, default: '6' },
    /** label与图标的距离，单位rpx，权重高于 margin */
    space: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 图片的mode，参考uni-app image组件 */
    imgMode: { type: String as PropType<ImgMode>, default: 'widthFix' },
    /** 自定义样式，对象形式 */
    customStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 用于显示图片小图标时，图片的宽度，单位rpx */
    width: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 用于显示图片小图标时，图片的高度，单位rpx */
    height: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 用于解决某些情况下，让图标垂直居中的用途，单位rpx */
    top: { type: [String, Number] as PropType<string | number>, default: 0 },
    /** 是否为DecimalIcon */
    showDecimalIcon: { type: Boolean, default: false },
    /** 背景颜色，可接受主题色，仅Decimal时有效 */
    inactiveColor: { type: String, default: '#ececec' },
    /** 显示的百分比，仅Decimal时有效 */
    percent: { type: [Number, String] as PropType<string | number>, default: '50' }
};

/**
 * u-icon 组件 Props 类型
 */
export type IconProps = ExtractPropTypes<typeof IconProps>;
