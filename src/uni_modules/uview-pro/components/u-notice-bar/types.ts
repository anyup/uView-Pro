import type { ExtractPropTypes, PropType } from 'vue';
import type { Direction, PlayState, ThemeType } from '../../types/global';

/**
 * NoticeBarProps 滚动通知 props 类型定义
 * @description 滚动通告场景，有多种模式可供选择
 */
export const NoticeBarProps = {
    /** 滚动内容，数组形式 */
    list: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    /** 显示的主题，success|error|primary|info|warning */
    type: {
        type: String as PropType<ThemeType>,
        default: 'warning'
    },
    /** 是否显示左侧的音量图标 */
    volumeIcon: {
        type: Boolean,
        default: true
    },
    /** 音量喇叭的大小 */
    volumeSize: {
        type: [Number, String] as PropType<number | string>,
        default: 34
    },
    /** 是否显示右侧的右箭头图标 */
    moreIcon: {
        type: Boolean,
        default: false
    },
    /** 是否显示右侧的关闭图标 */
    closeIcon: {
        type: Boolean,
        default: false
    },
    /** 是否自动播放 */
    autoplay: {
        type: Boolean,
        default: true
    },
    /** 文字颜色，各图标也会使用文字颜色 */
    color: {
        type: String,
        default: ''
    },
    /** 背景颜色 */
    bgColor: {
        type: String,
        default: ''
    },
    /** 滚动方向，horizontal-水平滚动，vertical-垂直滚动 */
    mode: {
        type: String as PropType<Direction>,
        default: 'horizontal'
    },
    /** 是否显示 */
    show: {
        type: Boolean,
        default: true
    },
    /** 字体大小，单位rpx */
    fontSize: {
        type: [Number, String] as PropType<number | string>,
        default: 28
    },
    /** 滚动一个周期的时间长，单位ms */
    duration: {
        type: [Number, String] as PropType<number | string>,
        default: 2000
    },
    /** 水平滚动时的滚动速度，即每秒滚动多少rpx */
    speed: {
        type: [Number, String] as PropType<number | string>,
        default: 160
    },
    /** 水平滚动时，是否采用衔接形式滚动 */
    isCircular: {
        type: Boolean,
        default: true
    },
    /** 播放状态，play-播放，paused-暂停 */
    playState: {
        type: String as PropType<PlayState>,
        default: 'play'
    },
    /** 是否禁止用手滑动切换 */
    disableTouch: {
        type: Boolean,
        default: true
    },
    /** 滚动通知设置圆角 */
    borderRadius: {
        type: [Number, String] as PropType<number | string>,
        default: 0
    },
    /** 通知的边距 */
    padding: {
        type: [Number, String] as PropType<number | string>,
        default: '18rpx 24rpx'
    },
    /** list列表为空时，是否显示组件 */
    noListHidden: {
        type: Boolean,
        default: true
    }
};

export type NoticeBarProps = ExtractPropTypes<typeof NoticeBarProps>;
