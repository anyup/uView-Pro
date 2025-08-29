import { type ComponentPublicInstance, type ExtractPropTypes, type PropType } from 'vue';
import type { ImgMode, Shape } from '../../types/global';

// 定义 ImageProps 的类型
export const ImageProps = {
    /** 图片地址 */
    src: { type: String, default: '' },
    /** 裁剪模式 */
    mode: { type: String as PropType<ImgMode>, default: 'aspectFill' },
    /** 宽度，单位任意，如果为数值，则为rpx单位（默认100%） */
    width: { type: [String, Number], default: '100%' },
    /** 高度，单位任意，如果为数值，则为rpx单位（默认 auto） */
    height: { type: [String, Number], default: 'auto' },
    /** 图片形状，circle-圆形，square-方形（默认square） */
    shape: { type: String as PropType<Shape>, default: 'square' },
    /** 圆角值，单位任意，如果为数值，则为rpx单位（默认 0） */
    borderRadius: { type: [String, Number], default: 0 },
    /** 是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效（默认 true） */
    lazyLoad: { type: Boolean, default: true },
    /** 是否开启长按图片显示识别小程序码菜单，仅微信小程序有效（默认 true） */
    showMenuByLongpress: { type: Boolean, default: true },
    /** 加载中的图标，或者小图片（默认 photo） */
    loadingIcon: { type: String, default: 'photo' },
    /** 加载失败的图标，或者小图片（默认 error-circle） */
    errorIcon: { type: String, default: 'error-circle' },
    /** 是否显示加载中的图标或者自定义的slot（默认 true） */
    showLoading: { type: Boolean, default: true },
    /** 是否显示加载错误的图标或者自定义的slot（默认 true） */
    showError: { type: Boolean, default: true },
    /** 是否需要淡入效果（默认 true） */
    fade: { type: Boolean, default: true },
    /** 只支持网络资源，只对微信小程序有效（默认 false） */
    webp: { type: Boolean, default: false },
    /** 搭配fade参数的过渡时间，单位ms（默认 500） */
    duration: { type: [String, Number], default: 500 },
    /** 背景颜色，用于深色页面加载图片时，为了和背景色融合（默认 #f3f4f6） */
    bgColor: { type: String, default: '#f3f4f6' },
    /** 使用插槽名称对象，用于自定义插槽，默认 undefined，当动态切换slot隐藏时，需要使用useSlots使用，兼容头条小程序 */
    useSlots: { type: Object as PropType<Record<string, boolean>>, default: undefined }
};

// 将 ImageProps 转换为类型
export type ImageProps = ExtractPropTypes<typeof ImageProps>;

// 暴露的组件实例方法
export type ImageExpose = {
    changeStatus: (status: 'loading' | 'error' | 'normal') => void;
};

// 组件实例类型
export type ImageInstance = ComponentPublicInstance<ImageProps, ImageExpose>;
