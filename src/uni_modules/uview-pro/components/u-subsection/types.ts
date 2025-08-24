import type { ExtractPropTypes, PropType } from 'vue';
import type { SubsectionListItem, SubsectionMode } from '../../types/global';

/**
 * SubsectionProps 分段器 props 类型定义
 * @description 分段器，支持按钮/分段模式、动画、颜色等
 */

export const SubsectionProps = {
    /** tab的数据 */
    list: { type: Array as PropType<Array<string | SubsectionListItem>>, default: () => [] },
    /** 当前活动的tab的index */
    current: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 激活的颜色 */
    activeColor: { type: String, default: '#303133' },
    /** 未激活的颜色 */
    inactiveColor: { type: String, default: '#606266' },
    /** 模式选择，mode=button为按钮形式，mode=subsection时为分段模式 */
    mode: { type: String as PropType<SubsectionMode>, default: 'button' },
    /** 字体大小，单位rpx */
    fontSize: { type: [Number, String] as PropType<number | string>, default: 28 },
    /** 是否开启动画效果 */
    animation: { type: Boolean, default: true },
    /** 组件的高度，单位rpx */
    height: { type: [Number, String] as PropType<number | string>, default: 70 },
    /** 激活tab的字体是否加粗 */
    bold: { type: Boolean, default: true },
    /** mode=button时，组件背景颜色 */
    bgColor: { type: String, default: '#eeeeef' },
    /** mode = button时，滑块背景颜色 */
    buttonColor: { type: String, default: '#ffffff' },
    /** 在切换分段器的时候，是否让设备震一下 */
    vibrateShort: { type: Boolean, default: false }
};

export type SubsectionProps = ExtractPropTypes<typeof SubsectionProps>;
