/**
 * 去除字符串空格
 * @param str 输入字符串
 * @param pos 去除位置，'both' | 'left' | 'right' | 'all'，默认'both'
 * @returns 去除空格后的字符串
 */
function trim(str: string, pos: 'both' | 'left' | 'right' | 'all' = 'both'): string {
    if (pos === 'both') {
        return str.replace(/^\s+|\s+$/g, '');
    } else if (pos === 'left') {
        return str.replace(/^\s*/, '');
    } else if (pos === 'right') {
        return str.replace(/(\s*$)/g, '');
    } else if (pos === 'all') {
        return str.replace(/\s+/g, '');
    } else {
        return str;
    }
}

export default trim;
