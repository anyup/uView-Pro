import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-index-list 组件 props 类型定义
 * @description 通过折叠面板收纳内容区域,搭配<u-index-anchor>使用
 */
export const IndexListProps = {
    /** 是否开启锚点自动吸顶 */
    sticky: {
        type: Boolean,
        default: true
    },
    /** 锚点吸顶时的层级 */
    zIndex: {
        type: [Number, String] as PropType<number | string>,
        default: ''
    },
    /** 当前滚动高度 */
    scrollTop: {
        type: [Number, String] as PropType<number | string>,
        default: 0
    },
    /** 锚点自动吸顶时与顶部的距离 */
    offsetTop: {
        type: [Number, String] as PropType<number | string>,
        default: 0
    },
    /** 索引字符列表 */
    indexList: {
        type: Array as PropType<string[]>,
        default: undefined // 组件内用 getIndexList() 兜底
    },
    /** 锚点和右边索引字符高亮颜色 */
    activeColor: {
        type: String,
        default: '#2979ff'
    }
};

/**
 * u-index-list 组件 props 类型
 */
export type IndexListProps = ExtractPropTypes<typeof IndexListProps>;
