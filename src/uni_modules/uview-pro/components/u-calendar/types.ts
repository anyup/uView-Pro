import { type ExtractPropTypes, type PropType } from 'vue';
import type { CalendarMode, ThemeType } from '../../types/global';

/**
 * calendar 日历类型定义
 * @description 供 u-calendar 组件 props 使用
 */
export const CalendarProps = {
    /** 是否开启底部安全区适配 */
    safeAreaInsetBottom: { type: Boolean, default: false },
    /** 是否允许通过点击遮罩关闭Picker */
    maskCloseAble: { type: Boolean, default: true },
    /** 通过双向绑定控制组件的弹出与收起 */
    modelValue: { type: Boolean, default: false },
    /** 弹出的z-index值 */
    zIndex: { type: [String, Number], default: 0 },
    /** 是否允许切换年份 */
    changeYear: { type: Boolean, default: true },
    /** 是否允许切换月份 */
    changeMonth: { type: Boolean, default: true },
    /** date-单个日期选择，range-开始日期+结束日期选择 */
    mode: { type: String as PropType<CalendarMode>, default: 'date' },
    /** 可切换的最大年份 */
    maxYear: { type: [Number, String], default: 2050 },
    /** 可切换的最小年份 */
    minYear: { type: [Number, String], default: 1950 },
    /** 最小可选日期(不在范围内日期禁用不可选) */
    minDate: { type: [Number, String], default: '1950-01-01' },
    /** 最大可选日期，默认最大值为今天，之后的日期不可选 */
    maxDate: { type: [Number, String], default: '' },
    /** 弹窗顶部左右两边的圆角值 */
    borderRadius: { type: [String, Number], default: 20 },
    /** 月份切换按钮箭头颜色 */
    monthArrowColor: { type: String, default: '#606266' },
    /** 年份切换按钮箭头颜色 */
    yearArrowColor: { type: String, default: '#909399' },
    /** 默认日期字体颜色 */
    color: { type: String, default: '#303133' },
    /** 选中|起始结束日期背景色 */
    activeBgColor: { type: String, default: '#2979ff' },
    /** 选中|起始结束日期字体颜色 */
    activeColor: { type: String, default: '#ffffff' },
    /** 范围内日期背景色 */
    rangeBgColor: { type: String, default: 'rgba(41,121,255,0.13)' },
    /** 范围内日期字体颜色 */
    rangeColor: { type: String, default: '#2979ff' },
    /** mode=range时生效，起始日期自定义文案 */
    startText: { type: String, default: '开始' },
    /** mode=range时生效，结束日期自定义文案 */
    endText: { type: String, default: '结束' },
    /** 按钮样式类型 */
    btnType: { type: String as PropType<ThemeType>, default: 'primary' },
    /** 当前选中日期带选中效果 */
    isActiveCurrent: { type: Boolean, default: true },
    /** 切换年月是否触发事件 mode=date时生效 */
    isChange: { type: Boolean, default: false },
    /** 是否显示右上角的关闭图标 */
    closeable: { type: Boolean, default: true },
    /** 顶部的提示文字 */
    toolTip: { type: String, default: '选择日期' }
};

export type CalendarProps = ExtractPropTypes<typeof CalendarProps>;
