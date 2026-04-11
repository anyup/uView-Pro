import type { ExtractPropTypes, PropType } from 'vue';
import type { CalendarChangeDate, CalendarChangeRange, CalendarMode, ThemeType } from '../../types/global';
import { getColor, useLocale } from '../../';

const { t } = useLocale();

/**
 * calendar 日历类型定义
 * @description 供 u-calendar 组件 props 使用
 */
export const CalendarProps = {
    /** 自定义根节点样式 */
    customStyle: {
        type: [String, Object] as PropType<string | Record<string, any>>,
        default: () => ({})
    },
    /** 自定义根节点样式类 */
    customClass: {
        type: String as unknown as PropType<string>,
        default: ''
    },
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
    monthArrowColor: { type: String, default: 'var(--u-content-color)' },
    /** 年份切换按钮箭头颜色 */
    yearArrowColor: { type: String, default: 'var(--u-tips-color)' },
    /** 默认日期字体颜色 */
    color: { type: String, default: 'var(--u-main-color)' },
    /** 选中|起始结束日期背景色 */
    activeBgColor: { type: String, default: () => getColor('primary') },
    /** 选中|起始结束日期字体颜色 */
    activeColor: { type: String, default: 'var(--u-white-color)' },
    /** 范围内日期背景色 */
    rangeBgColor: { type: String, default: 'var(--u-type-primary-light)' },
    /** 范围内日期字体颜色 */
    rangeColor: { type: String, default: () => getColor('primary') },
    /** mode=range时生效，起始日期自定义文案 */
    startText: { type: String, default: () => t('uCalendar.startText') },
    /** mode=range时生效，结束日期自定义文案 */
    endText: { type: String, default: () => t('uCalendar.endText') },
    /** 按钮样式类型 */
    btnType: { type: String as PropType<ThemeType>, default: 'primary' },
    /** 当前选中日期带选中效果 */
    isActiveCurrent: { type: Boolean, default: true },
    /** 初始化时是否默认选中今天，优先级低于 defaultDate/startDate/endDate */
    defaultSelectToday: { type: Boolean, default: true },
    /** 切换年月是否触发事件 mode=date时生效 */
    isChange: { type: Boolean, default: false },
    /** 是否显示右上角的关闭图标 */
    closeable: { type: Boolean, default: true },
    /** 顶部的提示文字 */
    toolTip: { type: String, default: () => t('uCalendar.toolTip') },
    /** 是否显示农历 */
    showLunar: { type: Boolean, default: false },
    /** 是否在页面中显示 */
    isPage: { type: Boolean, default: false },
    /** 默认选中的日期，mode=date时生效，格式：2024-01-01 */
    defaultDate: { type: String, default: '' },
    /** 默认选中的开始日期，mode=range时生效，格式：2024-01-01 */
    startDate: { type: String, default: '' },
    /** 默认选中的结束日期，mode=range时生效，格式：2024-01-01 */
    endDate: { type: String, default: '' },
    /** 是否只读，只读模式下禁止点击选择日期 */
    readonly: { type: Boolean, default: false },
    /** 已打卡日期列表，格式：['2024-01-01', '2024-01-02'] */
    checkedDates: { type: Array as PropType<string[]>, default: () => [] },
    /** 打卡日期背景色 */
    checkedBgColor: { type: String, default: 'var(--u-type-warning)' },
    /** 打卡日期字体颜色 */
    checkedColor: { type: String, default: 'var(--u-white-color)' },
    /** 今日是否已打卡 */
    todayChecked: { type: Boolean, default: false },
    /** 今日已打卡背景色 */
    todayCheckedBgColor: { type: String, default: 'var(--u-type-success)' },
    /** 未打卡日期背景色 */
    uncheckedBgColor: { type: String, default: 'var(--u-light-color)' },
    /** 未打卡日期字体颜色 */
    uncheckedColor: { type: String, default: 'var(--u-white-color)' },
    /** 是否启用打卡签到模式（未打卡日期显示灰色） */
    checkinMode: { type: Boolean, default: false },
    /** 节假日列表，格式：['2024-01-01', '2024-01-02'] */
    holidays: { type: Array as PropType<string[]>, default: () => [] },
    /** 节假日文字颜色 */
    holidayColor: { type: String, default: 'var(--u-type-error)' },
    /** 加班日列表，格式：['2024-01-06', '2024-01-07'] */
    workdays: { type: Array as PropType<string[]>, default: () => [] },
    /** 加班日文字颜色 */
    workdayColor: { type: String, default: 'var(--u-type-primary)' },
    /** 节日配置，格式：{ '2024-04-04': '清明节', '2024-04-01': '愚人节' } */
    festivals: { type: Object as PropType<Record<string, string>>, default: () => ({}) },
    /** 节日文字颜色 */
    festivalColor: { type: String, default: 'var(--u-type-primary)' },
    /** 是否显示内置节日（中国传统节日） */
    showFestival: { type: Boolean, default: false },
    /** 是否启用自定义日期内容插槽（微信小程序需要显式声明） */
    useDateSlot: { type: Boolean, default: false }
};

export type CalendarProps = ExtractPropTypes<typeof CalendarProps>;

export type CalendarEmits = {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'input', value: boolean): void;
    (e: 'change', value: CalendarChangeDate | CalendarChangeRange): void;
};
