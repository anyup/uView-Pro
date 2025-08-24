import type { ExtractPropTypes, PropType } from 'vue';
import type { ImgMode, SwiperIndicatorPosition, SwiperMode } from '../../types/global';

/**
 * SwiperProps 轮播图 props 类型定义
 * @description 轮播图，支持多种指示器、3D、自动播放等
 */
export const SwiperProps = {
    /** 轮播数据列表，数组对象 */
    list: { type: Array as PropType<Array<Record<string, any>>>, default: () => [] },
    /** 是否显示标题 */
    title: { type: Boolean, default: false },
    /** 指示器配置对象 */
    indicator: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 圆角，单位rpx */
    borderRadius: { type: [Number, String] as PropType<number | string>, default: 8 },
    /** 自动切换时间间隔，单位ms */
    interval: { type: [String, Number] as PropType<number | string>, default: 3000 },
    /** 指示器类型，round/dot/line等 */
    mode: { type: String as PropType<SwiperMode>, default: 'round' },
    /** 轮播高度，单位rpx */
    height: { type: [Number, String] as PropType<number | string>, default: 250 },
    /** 指示器位置 */
    indicatorPos: { type: String as PropType<SwiperIndicatorPosition>, default: 'bottomCenter' },
    /** 是否开启3D效果 */
    effect3d: { type: Boolean, default: false },
    /** 3D模式下前一项的边距，单位rpx */
    effect3dPreviousMargin: { type: [Number, String] as PropType<number | string>, default: 50 },
    /** 是否自动播放 */
    autoplay: { type: Boolean, default: true },
    /** 切换动画时长，单位ms */
    duration: { type: [Number, String] as PropType<number | string>, default: 500 },
    /** 是否循环播放 */
    circular: { type: Boolean, default: true },
    /** 图片裁剪模式 */
    imgMode: { type: String as PropType<ImgMode>, default: 'aspectFill' },
    /** 轮播项对象的图片字段名 */
    name: { type: String, default: 'image' },
    /** 轮播背景色 */
    bgColor: { type: String, default: '#f3f4f6' },
    /** 当前激活项索引 */
    current: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 标题样式对象 */
    titleStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) }
};

export type SwiperProps = ExtractPropTypes<typeof SwiperProps>;
