import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-no-network 组件 props 类型定义
 * @description 无网络提示，支持自定义图片、提示语、z-index
 */
export const NoNetworkProps = {
    /** 页面文字提示 */
    tips: {
        type: String,
        default: '哎呀，网络信号丢失'
    },
    /** 一个z-index值，用于设置没有网络这个组件的层次 */
    zIndex: {
        type: [Number, String] as PropType<number | string>,
        default: ''
    },
    /** 没有网络的图片提示 */
    image: {
        type: String,
        default: ''
    }
};

/**
 * u-no-network 组件 props 类型
 */
export type NoNetworkProps = ExtractPropTypes<typeof NoNetworkProps>;
