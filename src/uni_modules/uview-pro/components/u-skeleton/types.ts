import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';

const skeleton = {
    loading: true,
    animate: true,
    rows: 0,
    rowsWidth: '100%',
    rowsHeight: 18,
    title: true,
    titleWidth: '50%',
    titleHeight: 18,
    avatar: false,
    avatarSize: 32,
    avatarShape: 'circle'
};

/**
 * SkeletonProps 骨架屏 props 类型定义
 * @description 骨架屏用于页面数据加载时的占位
 */
export const SkeletonProps = {
    ...baseProps,
    // 是否展示骨架组件
    loading: {
        type: Boolean,
        default: skeleton.loading
    },
    // 是否开启动画效果
    animate: {
        type: Boolean,
        default: skeleton.animate
    },
    // 段落占位图行数
    rows: {
        type: [String, Number],
        default: skeleton.rows
    },
    // 段落占位图的宽度
    rowsWidth: {
        type: [String, Number, Array],
        default: skeleton.rowsWidth
    },
    // 段落占位图的高度
    rowsHeight: {
        type: [String, Number, Array],
        default: skeleton.rowsHeight
    },
    // 是否展示标题占位图
    title: {
        type: Boolean,
        default: skeleton.title
    },
    // 段落标题的宽度
    titleWidth: {
        type: [String, Number],
        default: skeleton.titleWidth
    },
    // 段落标题的高度
    titleHeight: {
        type: [String, Number],
        default: skeleton.titleHeight
    },
    // 是否展示头像占位图
    avatar: {
        type: Boolean,
        default: skeleton.avatar
    },
    // 头像占位图大小
    avatarSize: {
        type: [String, Number],
        default: skeleton.avatarSize
    },
    // 头像占位图的形状，circle-圆形，square-方形
    avatarShape: {
        type: String,
        default: skeleton.avatarShape
    }
};

export type SkeletonProps = ExtractPropTypes<typeof SkeletonProps>;
