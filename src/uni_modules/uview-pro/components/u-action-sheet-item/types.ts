import { type ExtractPropTypes, type PropType } from 'vue';
import { baseProps } from '../common/props';
import { $u } from '../../';

/**
 * actionSheet 操作菜单
 * @description 本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。本组件功能类似于uni的uni.showActionSheetAPI，配置更加灵活，所有平台都表现一致。
 */
export const ActionSheetItemProps = {
    ...baseProps,
    /** 标题 */
    text: { type: String, default: '' },
    /** 描述 */
    subText: { type: String, default: '' },
    /** 边距 */
    padding: { type: [Number, String] as PropType<number | string>, default: '34rpx 0' },
    /** 字体颜色 */
    color: { type: String, default: $u.color.mainColor },
    /** 字体大小 */
    fontSize: { type: [String, Number], default: '32rpx' },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 是否异步关闭 */
    asyncClose: { type: Boolean, default: false }
};

export type ActionSheetItemProps = ExtractPropTypes<typeof ActionSheetItemProps>;
