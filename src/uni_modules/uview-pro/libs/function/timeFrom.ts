import timeFormat from './timeFormat';

/**
 * 时间戳转为多久之前
 * @param dateTime 时间戳、Date对象或null，默认当前时间
 * @param format 时间格式字符串或false，超出范围时返回指定格式，否则返回多久以前
 * @returns 格式化后的时间字符串
 */
function timeFrom(dateTime: number | string | Date | null = null, format: string | false = 'yyyy-mm-dd'): string {
    // 如果为null,则格式化当前时间
    if (!dateTime) dateTime = Number(new Date());
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (typeof dateTime === 'number' || typeof dateTime === 'string') {
        if (dateTime.toString().length == 10) dateTime = Number(dateTime) * 1000;
    }
    const timestamp = +new Date(Number(dateTime));
    const timer = (Number(new Date()) - timestamp) / 1000;
    // 如果小于5分钟,则返回"刚刚",其他以此类推
    let tips = '';
    switch (true) {
        case timer < 300:
            tips = '刚刚';
            break;
        case timer >= 300 && timer < 3600:
            tips = parseInt(String(timer / 60)) + '分钟前';
            break;
        case timer >= 3600 && timer < 86400:
            tips = parseInt(String(timer / 3600)) + '小时前';
            break;
        case timer >= 86400 && timer < 2592000:
            tips = parseInt(String(timer / 86400)) + '天前';
            break;
        default:
            // 如果format为false，则无论什么时间戳，都显示xx之前
            if (format === false) {
                if (timer >= 2592000 && timer < 365 * 86400) {
                    tips = parseInt(String(timer / (86400 * 30))) + '个月前';
                } else {
                    tips = parseInt(String(timer / (86400 * 365))) + '年前';
                }
            } else {
                tips = timeFormat(timestamp, format as string);
            }
    }
    return tips;
}

export default timeFrom;
