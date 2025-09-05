import type { CSSProperties } from 'vue';
import trim from './trim';
import test from './test';

function isValidValue(value: any): boolean {
    if (test.isEmpty(value)) return false;
    if (typeof value === 'string') {
        const trimmed = trim(value).toLowerCase();
        return trimmed !== 'null' && trimmed !== 'undefined' && trimmed !== '';
    }
    return true;
}

/**
 * 将 CSS 字符串解析为对象
 */
function cssStrToObj(str: string): object {
    const result = {};
    if (!isValidValue(str)) return result;
    const styleStr = trim(String(str));
    if (!isValidValue(styleStr)) return result;
    const declarations = styleStr.split(';');
    declarations.forEach(decl => {
        const [prop, ...values] = decl.split(':').map(s => s.trim());
        const value = values.join(':');
        if (prop && value) {
            const camelProp = prop.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
            result[camelProp] = value;
        }
    });
    return result;
}

/**
 * 将 CSS 对象转换为 CSS 字符串
 */
function cssObjToStr(obj: object): string {
    if (!isValidValue(obj) || typeof obj !== 'object') return '';
    return (
        Object.entries(obj)
            .map(([key, value]) => {
                if (!isValidValue(value)) return '';
                // 驼峰转短横线
                const kebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                return `${kebab}: ${value}`;
            })
            .filter(Boolean)
            .join('; ') + ';'
    );
}

/**
 * 合并多个 CSS 输入（对象或字符串），返回一个 CSS 对象
 */
export function mergeStyles(...args: (object | string)[]): CSSProperties {
    const result = {};
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!isValidValue(arg)) return;
        if (typeof arg === 'string') {
            Object.assign(result, cssStrToObj(arg));
        } else if (test.object(arg)) {
            const cleanedObj = {};
            Object.keys(arg).forEach(key => {
                const value = arg[key];
                if (isValidValue(value)) {
                    // 有效
                    cleanedObj[key] = value;
                }
            });
            Object.assign(result, cleanedObj);
        }
    }
    return result;
}

/**
 * 合并为 CSS 字符串
 */
export function mergeCssStrings(...args: (object | string)[]): string {
    const obj = mergeStyles(...args);
    return cssObjToStr(obj);
}
