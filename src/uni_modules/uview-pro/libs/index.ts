// post类型对象参数转为get类型url参数
import queryParams from './function/queryParams';
// 路由封装
import route from './function/route';
// 时间格式化
import timeFormat from './function/timeFormat';
// 时间戳格式化,返回多久之前
import timeFrom from './function/timeFrom';
// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import colorGradients from './function/colorGradient';
// 生成全局唯一guid字符串
import guid from './function/guid';
// 主题相关颜色,info|success|warning|primary|default|error,此颜色已在uview.scss中定义,但是为js中也能使用,故也定义一份
import color from './function/color';
// 根据type获取图标名称
import type2icon from './function/type2icon';
// 打乱数组的顺序
import randomArray from './function/randomArray';
// 对象和数组的深度克隆
import deepClone from './function/deepClone';
// 对象深度拷贝
import deepMerge from './function/deepMerge';
// 添加单位
import addUnit from './function/addUnit';
// 规则检验
import test from './function/test';
// 随机数
import random from './function/random';
// 去除空格
import trim from './function/trim';
// toast提示，对uni.showToast的封装
import toast from './function/toast';
// 获取父组件参数
import getParent from './function/getParent';
// 获取整个父组件
import $parent from './function/$parent';
// 获取sys()和os()工具方法
// 获取设备信息，挂载到$u的sys()(system的缩写)属性中，
// 同时把安卓和ios平台的名称"ios"和"android"挂到$u.os()中，方便取用
import { sys, os } from './function/sys';
// 防抖方法
import debounce from './function/debounce';
// 节流方法
import throttle from './function/throttle';
// 获取元素的位置信息
import getRect from './function/getRect';
// 剪贴板
import { clipboard } from './function/clipboard';
// 配置信息
import config from './config/config';
// 各个需要fixed的地方的z-index配置文件
import zIndex from './config/zIndex';
import { mitt } from './util/mitt';
// http相关
import httpPlugin, {
    Request,
    http,
    type RequestOptions,
    type RequestConfig,
    type RequestInterceptor,
    type RequestMeta
} from './request/index';

/**
 * @description 数字格式化
 * @param number 要格式化的数字
 * @param decimals 保留几位小数
 * @param decimalPoint 小数点符号
 * @param thousandsSeparator 千分位符号
 * @returns 格式化后的数字
 */
export function formatPrice(
    number: number | string,
    decimals: number = 0,
    decimalPoint: string = '.',
    thousandsSeparator: string = ','
): string {
    // 辅助函数：四舍五入到指定小数位
    function round(num: number, precision: number): string {
        const factor = Math.pow(10, precision);
        return (Math.round(num * factor) / factor).toFixed(precision);
    }

    let numStr = String(number).replace(/[^0-9+\-Ee.]/g, '');
    const n = !isFinite(+numStr) ? 0 : +numStr;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = thousandsSeparator ?? ',';
    const dec = decimalPoint ?? '.';
    let s: string[] = [];

    s = (prec ? round(n, prec) : Math.round(n).toString()).split('.');
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, `$1${sep}$2`);
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += '0'.repeat(prec - s[1].length);
    }
    return s.join(dec);
}

// 默认的姓名脱敏规则
export function formatName(name: string): string {
    if (name.length === 2) {
        return name.charAt(0) + '*';
    } else if (name.length > 2) {
        const masked = '*'.repeat(name.length - 2);
        return name.charAt(0) + masked + name.charAt(name.length - 1);
    } else {
        return name;
    }
}

/**
 * @description 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {object | string} customStyle 需要转换的目标
 * @param {String} target 转换的目的，object-转为对象，string-转为字符串
 * @returns {object|string}
 */
export function addStyle(
    customStyle: Record<string, string> | string,
    target: 'object' | 'string' = 'object'
): Record<string, string> | string {
    // 字符串转字符串，对象转对象情形，直接返回
    if (
        test.empty(customStyle) ||
        (typeof customStyle === 'object' && target === 'object') ||
        (target === 'string' && typeof customStyle === 'string')
    ) {
        return customStyle;
    }
    // 字符串转对象
    if (target === 'object') {
        // 去除字符串样式中的两端空格
        const trimmedStyle = trim(customStyle as string);
        const styleArray = trimmedStyle.split(';');
        const style: Record<string, string> = {};
        for (let i = 0; i < styleArray.length; i++) {
            if (styleArray[i]) {
                const item = styleArray[i].split(':');
                if (item.length === 2) {
                    style[trim(item[0])] = trim(item[1]);
                }
            }
        }
        return style;
    }
    // 对象转字符串
    let string = '';
    for (const i in customStyle as Record<string, string>) {
        if (Object.prototype.hasOwnProperty.call(customStyle, i)) {
            const key = i.replace(/([A-Z])/g, '-$1').toLowerCase();
            string += `${key}:${(customStyle as Record<string, string>)[i]};`;
        }
    }
    return trim(string);
}

/**
 * 将外部传入的样式格式化为可读的 CSS 样式。
 * @param {object | object[]} styles 外部传入的样式对象或数组
 * @returns {string} 格式化后的 CSS 样式字符串
 */
export function toStyle(...styles: Array<Record<string, any> | string | null | undefined>): string {
    // 支持多参数：每个参数可以是 object 或 string，后面的参数优先级更高，会覆盖同名样式
    // 如果传入单个数组（兼容旧调用），解构展开
    if (styles.length === 1 && Array.isArray(styles[0])) {
        styles = (styles[0] as any[]).slice();
    }

    // 用于合并样式的 Map，key 使用 kebab-case
    const map = new Map<string, any>();

    const processString = (str: string) => {
        if (!str) return;
        // 移除可能的末尾分号，再按分号分割
        const parts = str.split(';');
        for (let part of parts) {
            part = part.trim();
            if (!part) continue;
            const idx = part.indexOf(':');
            if (idx === -1) continue;
            const key = trim(part.slice(0, idx));
            const val = trim(part.slice(idx + 1));
            if (key === '' || val === '') continue;
            const k = kebabCase(key);
            map.set(k, val);
        }
    };

    const processObject = (obj: Record<string, any>) => {
        if (!obj) return;
        Object.keys(obj).forEach(key => {
            const val = obj[key];
            if (val == null || val === '') return;
            const k = kebabCase(key);
            map.set(k, val);
        });
    };

    for (const item of styles) {
        if (item == null || item === '') continue;
        if (test.string(item)) {
            processString(item as string);
        } else if (test.array(item)) {
            // 若传入数组作为参数，递归处理数组元素
            (item as any[]).forEach(el => {
                if (test.string(el)) processString(el as string);
                else if (test.object(el)) processObject(el as Record<string, any>);
            });
        } else if (test.object(item)) {
            processObject(item as Record<string, any>);
        }
    }

    if (map.size === 0) return '';

    // 按插入顺序构造样式字符串，值转成字符串
    const result = Array.from(map.entries())
        .map(([k, v]) => `${k}:${String(v)}`)
        .join(';');

    return result ? (result.endsWith(';') ? result : result + ';') : '';
}

/**
 * 将驼峰命名转换为短横线命名。
 * @param {string} word 待转换的词条
 * @returns {string} 转换后的结果
 */
export function kebabCase(word: string): string {
    // 使用正则表达式匹配所有大写字母，并在前面加上短横线，然后转换为小写
    const newWord: string = word
        .replace(/[A-Z]/g, function (match) {
            return '-' + match;
        })
        .toLowerCase();

    return newWord;
}

export {
    queryParams,
    route,
    timeFormat,
    timeFrom,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    deepClone,
    deepMerge,
    addUnit,
    test,
    random,
    trim,
    toast,
    debounce,
    throttle,
    getRect,
    getParent,
    $parent,
    clipboard,
    config,
    zIndex,
    mitt
};

export const $u = {
    queryParams: queryParams,
    route: route,
    timeFormat: timeFormat,
    date: timeFormat, // 另名date
    timeFrom,
    colorGradient: colorGradients.colorGradient,
    colorToRgba: colorGradients.colorToRgba,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    hexToRgb: colorGradients.hexToRgb,
    rgbToHex: colorGradients.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    clipboard,
    addUnit,
    trim,
    type: ['primary', 'success', 'error', 'warning', 'info'],
    http,
    toast,
    config, // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle,
    mitt: mitt(),
    getRect,
    formatPrice,
    formatName,
    addStyle,
    toStyle,
    kebabCase
};

// 颜色相关方法单独导出
export const { colorGradient, colorToRgba, hexToRgb, rgbToHex } = colorGradients;
// http相关导出
export {
    Request,
    httpPlugin,
    http,
    type RequestOptions,
    type RequestConfig,
    type RequestInterceptor,
    type RequestMeta
};

export * from './hooks';

export * from './util/logger';
