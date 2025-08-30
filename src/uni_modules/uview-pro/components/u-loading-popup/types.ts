import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-loading-popup 组件 props 类型定义
 */
export const LoadingPopupProps = {
  /** 是否显示加载弹窗 */
  modelValue: { type: Boolean, default: false },
  /** 加载提示文本 */
  text: { type: String, default: '' },
  /** 方向，可选 'vertical' | 'horizontal' */
  direction: { type: String as PropType<'vertical' | 'horizontal'>, default: 'vertical' },
  /** 自动关闭的持续时间(ms)，0为不自动关闭 */
  duration: { type: Number, default: 0 },
  /** 允许点击遮罩关闭的最短时间(ms) */
  cancelTime: { type: Number, default: 10000 }
};

export type LoadingPopupProps = ExtractPropTypes<typeof LoadingPopupProps>;
