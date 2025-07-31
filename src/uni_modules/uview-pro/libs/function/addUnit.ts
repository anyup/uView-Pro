import validation from './test';

/**
 * 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
 * @param value 输入值，可以为字符串或数字，默认'auto'
 * @param unit 单位，默认'rpx'
 * @returns 添加单位后的字符串
 */
export default function addUnit(value: string | number = 'auto', unit: string = 'rpx'): string {
    const strValue = String(value);
    // 用uView内置验证规则中的number判断是否为数值
    return validation.number(strValue) ? `${strValue}${unit}` : strValue;
}
