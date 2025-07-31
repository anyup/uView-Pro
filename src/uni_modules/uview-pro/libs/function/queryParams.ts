/**
 * 对象转url参数
 * @param data 对象参数
 * @param isPrefix 是否自动加上"?"，默认true
 * @param arrayFormat 数组参数格式，indices/brackets/repeat/comma，默认brackets
 * @returns url参数字符串
 */
function queryParams(data: Record<string, any> = {}, isPrefix: boolean = true, arrayFormat: 'indices' | 'brackets' | 'repeat' | 'comma' = 'brackets'): string {
    const prefix = isPrefix ? '?' : '';
    const _result: string[] = [];
    if (!['indices', 'brackets', 'repeat', 'comma'].includes(arrayFormat)) arrayFormat = 'brackets';
    for (const key in data) {
        const value = data[key];
        // 去掉为空的参数
        if (['', undefined, null].includes(value)) {
            continue;
        }
        // 如果值为数组，另行处理
        if (Array.isArray(value)) {
            // e.g. {ids: [1, 2, 3]}
            switch (arrayFormat) {
                case 'indices':
                    // 结果: ids[0]=1&ids[1]=2&ids[2]=3
                    for (let i = 0; i < value.length; i++) {
                        _result.push(`${key}[${i}]=${value[i]}`);
                    }
                    break;
                case 'brackets':
                    // 结果: ids[]=1&ids[]=2&ids[]=3
                    value.forEach((_value: any) => {
                        _result.push(`${key}[]=${_value}`);
                    });
                    break;
                case 'repeat':
                    // 结果: ids=1&ids=2&ids=3
                    value.forEach((_value: any) => {
                        _result.push(`${key}=${_value}`);
                    });
                    break;
                case 'comma':
                    // 结果: ids=1,2,3
                    let commaStr = '';
                    value.forEach((_value: any) => {
                        commaStr += (commaStr ? ',' : '') + _value;
                    });
                    _result.push(`${key}=${commaStr}`);
                    break;
                default:
                    value.forEach((_value: any) => {
                        _result.push(`${key}[]=${_value}`);
                    });
            }
        } else {
            _result.push(`${key}=${value}`);
        }
    }
    return _result.length ? prefix + _result.join('&') : '';
}

export default queryParams;
