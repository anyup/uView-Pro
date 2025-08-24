import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-dropdown 下拉菜单 Props
 * @description 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景
 */
export const DropdownProps = {
    /** 菜单标题和选项的激活态颜色 */
    activeColor: { type: String, default: '#2979ff' },
    /** 菜单标题和选项的未激活态颜色 */
    inactiveColor: { type: String, default: '#606266' },
    /** 点击遮罩是否关闭菜单 */
    closeOnClickMask: { type: Boolean, default: true },
    /** 点击当前激活项标题是否关闭菜单 */
    closeOnClickSelf: { type: Boolean, default: true },
    /** 过渡时间 */
    duration: { type: [Number, String] as PropType<number | string>, default: 300 },
    /** 标题菜单的高度，单位任意，数值默认为rpx单位 */
    height: { type: [Number, String] as PropType<number | string>, default: 80 },
    /** 是否显示下边框 */
    borderBottom: { type: Boolean, default: false },
    /** 标题的字体大小 */
    titleSize: { type: [Number, String] as PropType<number | string>, default: 28 },
    /** 下拉出来的内容部分的圆角值 */
    borderRadius: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 菜单右侧的icon图标 */
    menuIcon: { type: String, default: 'arrow-down' },
    /** 菜单右侧图标的大小 */
    menuIconSize: { type: [Number, String] as PropType<number | string>, default: 26 }
};

export type DropdownProps = ExtractPropTypes<typeof DropdownProps>;
