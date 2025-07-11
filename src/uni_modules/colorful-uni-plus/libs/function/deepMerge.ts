import deepClone from './deepClone';

/**
 * JS对象深度合并
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
function deepMerge<T extends object, S extends object>(target: T = {} as T, source: S = {} as S): T & S {
    target = deepClone(target);
    if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) return target as T & S;
    const merged: any = Array.isArray(target) ? target.slice() : Object.assign({}, target);
    for (const prop in source) {
        if (!Object.prototype.hasOwnProperty.call(source, prop)) continue;
        const sourceValue = (source as any)[prop];
        const targetValue = merged[prop];
        if (sourceValue instanceof Date) {
            merged[prop] = new Date(sourceValue);
        } else if (sourceValue instanceof RegExp) {
            merged[prop] = new RegExp(sourceValue);
        } else if (sourceValue instanceof Map) {
            merged[prop] = new Map(sourceValue);
        } else if (sourceValue instanceof Set) {
            merged[prop] = new Set(sourceValue);
        } else if (typeof sourceValue === 'object' && sourceValue !== null) {
            merged[prop] = deepMerge(targetValue, sourceValue);
        } else {
            merged[prop] = sourceValue;
        }
    }
    return merged as T & S;
}

export default deepMerge;
