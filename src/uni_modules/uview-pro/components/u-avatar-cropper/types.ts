import { type ExtractPropTypes, type PropType } from 'vue';
import type { AvatarCropperBoundStyle } from '../../types/global';

export const AvatarCropperProps = {
    /** 裁剪矩形框的样式 */
    boundStyle: {
        type: Object as PropType<AvatarCropperBoundStyle>,
        default: (): AvatarCropperBoundStyle => ({
            lineWidth: 4,
            borderColor: 'rgb(245, 245, 245)',
            mask: 'rgba(0, 0, 0, 0.35)'
        })
    }
    // 其他 props 可参考注释，后续如需开放直接补充
    // rectWidth: { type: [String, Number], default: 400 },
    // rectHeight: { type: [String, Number], default: 400 },
    // destWidth: { type: [String, Number], default: 400 },
    // destHeight: { type: [String, Number], default: 400 },
    // fileType: { type: String, default: 'jpg' },
    // quality: { type: [Number, String], default: 1 }
};

export type AvatarCropperProps = ExtractPropTypes<typeof AvatarCropperProps>;
