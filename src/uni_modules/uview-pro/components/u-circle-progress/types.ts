import { type ExtractPropTypes, type PropType } from 'vue';
import type { ThemeType } from '../../types/global';

/**
 * circleProgress 环形进度条 Props
 * @description 展示操作或任务的当前进度，比如上传文件，是一个圆形的进度条。注意：此组件的percent值只能动态增加，不能动态减少。
 */
export const CircleProgressProps = {
    /** 圆环进度百分比值 */
    percent: {
        type: Number,
        default: 0,
        validator: (val: number) => val >= 0 && val <= 100
    },
    /** 底部圆环的颜色（灰色的圆环） */
    inactiveColor: {
        type: String,
        default: '#ececec'
    },
    /** 圆环激活部分的颜色 */
    activeColor: {
        type: String,
        default: '#19be6b'
    },
    /** 圆环线条的宽度，单位rpx */
    borderWidth: {
        type: [Number, String] as PropType<number | string>,
        default: 14
    },
    /** 整个圆形的宽度，单位rpx */
    width: {
        type: [Number, String] as PropType<number | string>,
        default: 200
    },
    /** 整个圆环执行一圈的时间，单位ms */
    duration: {
        type: [Number, String] as PropType<number | string>,
        default: 1500
    },
    /** 主题类型 */
    type: {
        type: String as PropType<ThemeType>,
        default: ''
    },
    /** 整个圆环进度区域的背景色 */
    bgColor: {
        type: String,
        default: '#ffffff'
    }
};

export type CircleProgressProps = ExtractPropTypes<typeof CircleProgressProps>;
