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
// 获取父组件
import { parentData, parent } from './function/parent';
// 配置信息
import config from './config/config';
// 各个需要fixed的地方的z-index配置文件
import zIndex from './config/zIndex';
import { dispatch, broadcast } from './util/emitter';
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
export function toStyle(styles: Record<string, any> | Record<string, any>[] | string): string {
    // 如果 styles 是字符串类型
    if (test.string(styles)) {
        // 如果是字符串且不为空，确保末尾有分号
        return styles ? (styles.endsWith(';') ? styles : styles + ';') : '';
    }
    // 如果 styles 是数组类型
    if (test.array(styles)) {
        // 使用过滤函数去除空值和 null 值的元素
        // 对每个非空元素递归调用 objToStyle，然后通过分号连接
        const result = styles
            .filter(function (item) {
                return item != null && item !== '';
            })
            .map(function (item) {
                return toStyle(item);
            })
            .join(';');

        // 如果结果不为空，确保末尾有分号
        return result ? (result.endsWith(';') ? result : result + ';') : '';
    }
    // 如果 styles 是对象类型
    if (test.object(styles)) {
        // 使用 Object.keys 获取所有属性名
        // 使用过滤函数去除值为 null 或空字符串的属性
        // 对每个属性名和属性值进行格式化，通过分号连接
        const result = Object.keys(styles)
            .filter(function (key) {
                return styles[key] != null && styles[key] !== '';
            })
            .map(function (key) {
                // 使用 kebabCase 函数将属性名转换为 kebab-case 格式
                // 将属性名和属性值格式化为 CSS 样式的键值对
                return [kebabCase(key), styles[key]].join(':');
            })
            .join(';');

        // 如果结果不为空，确保末尾有分号
        return result ? (result.endsWith(';') ? result : result + ';') : '';
    }
    // 如果 styles 不是对象也不是数组，则直接返回
    return '';
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
    parent,
    parentData,
    dispatch,
    broadcast,
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
    dispatch,
    broadcast,
    hexToRgb: colorGradients.hexToRgb,
    rgbToHex: colorGradients.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    parent,
    parentData,
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
