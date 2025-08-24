import type { ExtractPropTypes, PropType } from 'vue';
import type { ButtonFormType, ButtonOpenType, ButtonScope, ButtonSize, ButtonType, Shape } from '../../types/global';

/**
 * button 按钮类型定义
 * @description 供 u-button 组件 props 使用
 */

export const ButtonProps = {
    /** 是否细边框 */
    hairLine: { type: Boolean, default: true },
    /** 按钮的预置样式，default，primary，error，warning，success */
    type: { type: String as PropType<ButtonType>, default: 'default' },
    /** 按钮尺寸，default，medium，mini */
    size: { type: String as PropType<ButtonSize>, default: 'default' },
    /** 按钮形状，circle（两边为半圆），square（带圆角） */
    shape: { type: String as PropType<Shape>, default: 'square' },
    /** 按钮是否镂空 */
    plain: { type: Boolean, default: false },
    /** 是否禁止状态 */
    disabled: { type: Boolean, default: false },
    /** 是否加载中 */
    loading: { type: Boolean, default: false },
    /** 支付宝小程序，当 open-type 为 getAuthorize 时有效 */
    scope: { type: String as PropType<ButtonScope>, default: '' },
    /** 开放能力，具体请看uniapp稳定关于button组件部分说明 */
    openType: { type: String as PropType<ButtonOpenType>, default: '' },
    /** 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件 */
    formType: { type: String as PropType<ButtonFormType>, default: '' },
    /** 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 */
    appParameter: { type: String, default: '' },
    /** 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效 */
    hoverStopPropagation: { type: Boolean, default: false },
    /** 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效 */
    lang: { type: String, default: 'en' },
    /** 会话来源，open-type="contact"时有效。只微信小程序有效 */
    sessionFrom: { type: String, default: '' },
    /** 会话内消息卡片标题，open-type="contact"时有效 */
    sendMessageTitle: { type: String, default: '' },
    /** 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 */
    sendMessagePath: { type: String, default: '' },
    /** 会话内消息卡片图片，open-type="contact"时有效 */
    sendMessageImg: { type: String, default: '' },
    /** 是否显示会话内消息卡片，open-type="contact"时有效 */
    showMessageCard: { type: Boolean, default: false },
    /** 手指按（触摸）按钮时按钮时的背景颜色 */
    hoverBgColor: { type: String, default: '' },
    /** 水波纹的背景颜色 */
    rippleBgColor: { type: String, default: '' },
    /** 是否开启水波纹效果 */
    ripple: { type: Boolean, default: false },
    /** 按下的类名 */
    hoverClass: { type: String, default: '' },
    /** 自定义样式，对象形式 */
    customStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取 */
    dataName: { type: String, default: '' },
    /** 节流，一定时间内只能触发一次 */
    throttleTime: { type: [String, Number], default: 1000 },
    /** 按住后多久出现点击态，单位毫秒 */
    hoverStartTime: { type: [String, Number], default: 20 },
    /** 手指松开后点击态保留时间，单位毫秒 */
    hoverStayTime: { type: [String, Number], default: 150 }
};

export type ButtonProps = ExtractPropTypes<typeof ButtonProps>;
