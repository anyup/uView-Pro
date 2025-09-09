import type { ExtractPropTypes, PropType } from 'vue';
import type { PickerMode, PickerParams } from '../../types/global';

const defaultParams: PickerParams = {
    year: true,
    month: true,
    day: true,
    hour: false,
    minute: false,
    second: false,
    province: true,
    city: true,
    area: true,
    timestamp: true
};
/**
 * PickerProps 选择器 props 类型定义
 * @description 支持时间、地区、单列、多列等多种模式
 */
export const PickerProps = {
    /** picker中需要显示的参数 */
    params: {
        type: Object as PropType<PickerParams>,
        default: () => defaultParams
    },
    /** 当mode=selector或者mode=multiSelector时，提供的数组 */
    range: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    /** 当mode=selector或者mode=multiSelector时，提供的默认选中的下标 */
    defaultSelector: {
        type: Array as PropType<any[]>,
        default: () => [0]
    },
    /** 当 range 是一个 Array<Object> 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容 */
    rangeKey: {
        type: String,
        default: ''
    },
    /** 模式选择，region-地区类型，time-时间类型，selector-单列模式，multiSelector-多列模式 */
    mode: {
        type: String as PropType<PickerMode>,
        default: 'time'
    },
    /** 年份开始时间 */
    startYear: {
        type: [String, Number] as PropType<number | string>,
        default: 1950
    },
    /** 年份结束时间 */
    endYear: {
        type: [String, Number] as PropType<number | string>,
        default: 2050
    },
    /** "取消"按钮的颜色 */
    cancelColor: {
        type: String,
        default: '#606266'
    },
    /** "确定"按钮的颜色 */
    confirmColor: {
        type: String,
        default: '#2979ff'
    },
    /** 默认显示的时间，2025-07-02 || 2025-07-02 13:01:00 || 2025/07/02 */
    defaultTime: {
        type: String,
        default: ''
    },
    /** 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"] */
    defaultRegion: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    /** 时间模式时，是否显示后面的年月日中文提示 */
    showTimeTag: {
        type: Boolean,
        default: true
    },
    /** 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"] */
    areaCode: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    /** 是否开启底部安全区适配 */
    safeAreaInsetBottom: {
        type: Boolean,
        default: false
    },
    /** 是否允许通过点击遮罩关闭Picker */
    maskCloseAble: {
        type: Boolean,
        default: true
    },
    /** 通过双向绑定控制组件的弹出与收起 */
    modelValue: {
        type: [Boolean, String, Number, Array, Object] as PropType<any>,
        default: false
    },
    /** 弹出的z-index值 */
    zIndex: {
        type: [String, Number] as PropType<number | string>,
        default: 0
    },
    /** 顶部标题 */
    title: {
        type: String,
        default: ''
    },
    /** 取消按钮的文字 */
    cancelText: {
        type: String,
        default: '取消'
    },
    /** 确认按钮的文字 */
    confirmText: {
        type: String,
        default: '确认'
    }
};

export type PickerProps = ExtractPropTypes<typeof PickerProps>;
