import type { ExtractPropTypes, PropType } from 'vue';
import type { PlayState, ThemeType } from '../../types/global';

/**
 * RowNoticeProps 水平滚动通告栏 props 类型定义
 * @description 水平滚动通告栏，支持主题、图标、关闭等
 */
export const RowNoticeProps = {
    /** 显示的内容，数组 */
    list: { type: Array as PropType<string[]>, default: () => [] },
    /** 显示的主题，success|error|primary|info|warning|none */
    type: { type: String as PropType<ThemeType | 'none'>, default: 'warning' },
    /** 是否显示左侧的音量图标 */
    volumeIcon: { type: Boolean, default: true },
    /** 是否显示右侧的右箭头图标 */
    moreIcon: { type: Boolean, default: false },
    /** 是否显示右侧的关闭图标 */
    closeIcon: { type: Boolean, default: false },
    /** 是否自动播放 */
    autoplay: { type: Boolean, default: true },
    /** 文字颜色，各图标也会使用文字颜色 */
    color: { type: String, default: '' },
    /** 背景颜色 */
    bgColor: { type: String, default: '' },
    /** 是否显示 */
    show: { type: Boolean, default: true },
    /** 字体大小，单位rpx */
    fontSize: { type: [Number, String] as PropType<number | string>, default: 26 },
    /** 音量喇叭的大小 */
    volumeSize: { type: [Number, String] as PropType<number | string>, default: 34 },
    /** 水平滚动时的滚动速度，即每秒滚动多少rpx */
    speed: { type: [Number, String] as PropType<number | string>, default: 160 },
    /** 播放状态，play-播放，paused-暂停 */
    playState: { type: String as PropType<PlayState>, default: 'play' },
    /** 通知的边距 */
    padding: { type: [Number, String] as PropType<number | string>, default: '18rpx 24rpx' }
};

export type RowNoticeProps = ExtractPropTypes<typeof RowNoticeProps>;
