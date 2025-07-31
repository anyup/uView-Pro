// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
    // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
    String.prototype.padStart = function (this: string, maxLength: number, fillString: string = ' '): string {
        if (Object.prototype.toString.call(fillString) !== '[object String]') throw new TypeError('fillString must be String');
        let str = this;
        if (str.length >= maxLength) return String(str);
        let fillLength = maxLength - str.length,
            times = Math.ceil(fillLength / fillString.length);
        while ((times >>= 1)) {
            fillString += fillString;
            if (times === 1) {
                fillString += fillString;
            }
        }
        return fillString.slice(0, fillLength) + str;
    };
}

/**
 * 时间格式化
 * @param dateTime 时间戳、Date对象或null，默认当前时间
 * @param fmt 格式化字符串，默认 'yyyy-mm-dd'
 * @returns 格式化后的时间字符串
 */
function timeFormat(dateTime: number | string | Date | null = null, fmt: string = 'yyyy-mm-dd'): string {
    // 如果为null,则格式化当前时间
    if (!dateTime) dateTime = Number(new Date());
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (typeof dateTime === 'number' || typeof dateTime === 'string') {
        if (dateTime.toString().length == 10) dateTime = Number(dateTime) * 1000;
    }
    const date = new Date(dateTime);
    let ret: RegExpExecArray | null;
    const opt: Record<string, string> = {
        'y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'h+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
        }
    }
    return fmt;
}

export default timeFormat;
