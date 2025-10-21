import validation from './test';

/**
 * 添加单位，支持以下场景：
 * 1. 单值：如果有rpx、%、px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
 * 2. 多值（空格分隔）：分别处理每个值，如 "10 20" => "10rpx 20rpx"
 *
 * @example
 * ```ts
 * addUnit(10) => "10rpx"
 * addUnit('10px') => "10px"
 * addUnit('auto') => "auto"
 * addUnit('10 20') => "10rpx 20rpx"
 * addUnit('10rpx 20') => "10rpx 20rpx"
 * ```
 *
 * @param value 输入值，可以为字符串或数字，默认'auto'。支持空格分隔的多值（用于 padding、margin 等）
 * @param unit 单位，默认'rpx'
 * @returns 添加单位后的字符串
 */
export default function addUnit(value: string | number = 'auto', unit: string = 'rpx'): string {
    // 若传入 number 类型，转为 string
    const strValue = String(value);

    // 如果是空值，直接返回
    if (!strValue) return '';

    // auto 直接返回
    if (strValue === 'auto') return strValue;

    // 检查是否包含空格（多值场景）
    if (strValue.includes(' ')) {
        // 分割每个值并单独处理
        return strValue
            .split(' ')
            .map(s => {
                // 如果当前值已有单位或为 auto，直接返回
                if (s === 'auto' || /^-?\d*\.?\d+(%|px|rpx|em|rem|vh|vw)$/.test(s)) return s;
                // 数字类型的值添加单位
                return validation.number(s) ? `${s}${unit}` : s;
            })
            .join(' ');
    }

    // 单值场景：如果已有单位或为 auto，直接返回
    if (/^-?\d*\.?\d+(%|px|rpx|em|rem|vh|vw)$/.test(strValue)) return strValue;

    // 用 uView 内置验证规则判断是否为数值，是则加上单位
    return validation.number(strValue) ? `${strValue}${unit}` : strValue;
}
