import type { ExtractPropTypes, PropType } from 'vue';

/**
 * VerificationCodeProps 验证码输入框 props 类型定义
 * @description 验证码输入倒计时组件
 */
export const VerificationCodeProps = {
    /** 倒计时时长，单位秒 */
    seconds: { type: [String, Number] as PropType<string | number>, default: 60 },
    /** 开始时按钮文字 */
    startText: { type: String, default: '获取验证码' },
    /** 倒计时进行中按钮文字，X为剩余秒数 */
    changeText: { type: String, default: 'X秒重新获取' },
    /** 结束时按钮文字 */
    endText: { type: String, default: '重新获取' },
    /** 是否保持倒计时不中断（如页面切换） */
    keepRunning: { type: Boolean, default: false },
    /** 唯一标识key，用于区分多个验证码组件 */
    uniqueKey: { type: String, default: '' }
};

export type VerificationCodeProps = ExtractPropTypes<typeof VerificationCodeProps>;
