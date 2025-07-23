// 判断arr是否为一个数组，返回一个bool值
function isArray(arr: any): arr is any[] {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 * 深度克隆
 * @param obj 需要克隆的对象
 * @param cache 用于处理循环引用的 WeakMap
 * @returns 克隆后的对象
 */
function deepClone<T>(obj: T, cache: WeakMap<any, any> = new WeakMap()): T {
    if (obj === null || typeof obj !== 'object') return obj;
    if (cache.has(obj)) return cache.get(obj);
    let clone: any;
    if (obj instanceof Date) {
        clone = new Date(obj.getTime());
    } else if (obj instanceof RegExp) {
        clone = new RegExp(obj);
    } else if (obj instanceof Map) {
        clone = new Map(Array.from(obj, ([key, value]) => [key, deepClone(value, cache)]));
    } else if (obj instanceof Set) {
        clone = new Set(Array.from(obj, value => deepClone(value, cache)));
    } else if (Array.isArray(obj)) {
        clone = obj.map(value => deepClone(value, cache));
    } else if (Object.prototype.toString.call(obj) === '[object Object]') {
        clone = Object.create(Object.getPrototypeOf(obj));
        cache.set(obj, clone);
        for (const [key, value] of Object.entries(obj)) {
            clone[key] = deepClone(value, cache);
        }
    } else {
        clone = Object.assign({}, obj);
    }
    cache.set(obj, clone);
    return clone;
}

export default deepClone;
