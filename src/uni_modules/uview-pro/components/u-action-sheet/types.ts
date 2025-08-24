import { type ExtractPropTypes, type PropType } from 'vue';
import type { ActionSheetItem, ActionSheetTips } from '../../types/global';

/**
 * actionSheet 操作菜单
 * @description 本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。本组件功能类似于uni的uni.showActionSheetAPI，配置更加灵活，所有平台都表现一致。
 */
export const ActionSheetProps = {
    /** 点击遮罩是否可以关闭actionsheet */
    maskCloseAble: { type: Boolean, default: true },
    /** 按钮的文字数组，可以自定义颜色和字体大小，字体单位为rpx */
    list: {
        type: Array as unknown as PropType<ActionSheetItem[]>,
        default: () => []
    },
    /** 顶部的提示文字 */
    tips: {
        type: Object as unknown as PropType<ActionSheetTips>,
        default: () => ({ text: '', color: '', fontSize: '26' })
    },
    /** 底部的取消按钮 */
    cancelBtn: { type: Boolean, default: true },
    /** 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距 */
    safeAreaInsetBottom: { type: Boolean, default: false },
    /** 通过双向绑定控制组件的弹出与收起 */
    modelValue: { type: Boolean, default: false },
    /** 弹出的顶部圆角值 */
    borderRadius: { type: [String, Number], default: 0 },
    /** 弹出的z-index值 */
    zIndex: { type: [String, Number], default: 0 },
    /** 取消按钮的文字提示 */
    cancelText: { type: String, default: '取消' }
};

export type ActionSheetProps = ExtractPropTypes<typeof ActionSheetProps>;
