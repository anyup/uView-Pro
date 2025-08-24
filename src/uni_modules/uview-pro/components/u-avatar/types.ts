import { type ExtractPropTypes, type PropType } from 'vue';
import type { ImgMode } from '../../types/global';

// u-avatar 组件 props
export const AvatarProps = {
    /** 背景颜色 */
    bgColor: { type: String, default: 'transparent' },
    /** 头像路径 */
    src: { type: String, default: '' },
    /** 尺寸，large-大，default-中等，mini-小，如果为数值，则单位为rpx，宽度等于高度 */
    size: { type: [String, Number], default: 'default' },
    /** 头像模型，square-带圆角方形，circle-圆形 */
    mode: { type: String, default: 'circle' },
    /** 文字内容 */
    text: { type: String, default: '' },
    /** 图片的裁剪模型 */
    imgMode: { type: String as PropType<ImgMode>, default: 'aspectFill' },
    /** 标识符 */
    index: { type: [String, Number], default: '' },
    /** 右上角性别角标，man-男，woman-女 */
    sexIcon: { type: String as PropType<'man' | 'woman'>, default: 'man' },
    /** 右下角的等级图标 */
    levelIcon: { type: String, default: 'level' },
    /** 右下角等级图标背景颜色 */
    levelBgColor: { type: String, default: '' },
    /** 右上角性别图标的背景颜色 */
    sexBgColor: { type: String, default: '' },
    /** 是否显示性别图标 */
    showSex: { type: Boolean, default: false },
    /** 是否显示等级图标 */
    showLevel: { type: Boolean, default: false }
};

export type AvatarProps = ExtractPropTypes<typeof AvatarProps>;
