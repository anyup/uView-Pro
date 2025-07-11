// 全局挂载引入http相关请求拦截插件
import http from './libs/request/index';
// post类型对象参数转为get类型url参数
import queryParams from './libs/function/queryParams';
// 路由封装
import route from './libs/function/route';
// 时间格式化
import timeFormat from './libs/function/timeFormat';
// 时间戳格式化,返回多久之前
import timeFrom from './libs/function/timeFrom';
// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import colorGradient from './libs/function/colorGradient';
// 生成全局唯一guid字符串
import guid from './libs/function/guid';
// 主题相关颜色,info|success|warning|primary|default|error,此颜色已在uview.scss中定义,但是为js中也能使用,故也定义一份
import color from './libs/function/color';
// 根据type获取图标名称
import type2icon from './libs/function/type2icon';
// 打乱数组的顺序
import randomArray from './libs/function/randomArray';
// 对象和数组的深度克隆
import deepClone from './libs/function/deepClone';
// 对象深度拷贝
import deepMerge from './libs/function/deepMerge';
// 添加单位
import addUnit from './libs/function/addUnit';
// 规则检验
import test from './libs/function/test';
// 随机数
import random from './libs/function/random';
// 去除空格
import trim from './libs/function/trim';
// toast提示，对uni.showToast的封装
import toast from './libs/function/toast';
// 获取父组件参数
import getParent from './libs/function/getParent';
// 获取整个父组件
import $parent from './libs/function/$parent';
// 获取sys()和os()工具方法
// 获取设备信息，挂载到$u的sys()(system的缩写)属性中，
// 同时把安卓和ios平台的名称"ios"和"android"挂到$u.os()中，方便取用
import { sys, os } from './libs/function/sys';
// 防抖方法
import debounce from './libs/function/debounce';
// 节流方法
import throttle from './libs/function/throttle';

// 配置信息
import config from './libs/config/config';
// 各个需要fixed的地方的z-index配置文件
import zIndex from './libs/config/zIndex';
import { dispatch, broadcast, parent } from './libs/util/emitter';
import { mitt } from './libs/util/mitt';
import { RequestOptions } from './libs/request/index';

declare const uni: {
    [key: string]: any;
    $u?: typeof $u;
    createSelectorQuery: () => any;
    hideLoading: () => void;
    showLoading: (options: any) => void;
    request: (options: RequestOptions) => any;
};

/**
 * $u 工具库类型声明
 */
export interface UViewUtils {
    queryParams: typeof queryParams;
    route: typeof route;
    timeFormat: typeof timeFormat;
    date: typeof timeFormat;
    timeFrom: typeof timeFrom;
    colorGradient: typeof colorGradient.colorGradient;
    colorToRgba: typeof colorGradient.colorToRgba;
    guid: typeof guid;
    color: typeof color;
    sys: typeof sys;
    os: typeof os;
    type2icon: typeof type2icon;
    randomArray: typeof randomArray;
    dispatch: typeof dispatch;
    broadcast: typeof broadcast;
    get: typeof http.get;
    post: typeof http.post;
    put: typeof http.put;
    delete: typeof http.delete;
    hexToRgb: typeof colorGradient.hexToRgb;
    rgbToHex: typeof colorGradient.rgbToHex;
    test: typeof test;
    random: typeof random;
    deepClone: typeof deepClone;
    deepMerge: typeof deepMerge;
    getParent: typeof getParent;
    $parent: typeof $parent;
    parent: typeof parent;
    addUnit: typeof addUnit;
    trim: typeof trim;
    type: string[];
    http: typeof http;
    toast: typeof toast;
    config: typeof config;
    zIndex: typeof zIndex;
    debounce: typeof debounce;
    throttle: typeof throttle;
    mitt: ReturnType<typeof mitt>;
    getRect: (instance: any | null | undefined, selector: any, all?: boolean) => Promise<any>;
}

export const $u: UViewUtils = {
    queryParams: queryParams,
    route: route,
    timeFormat: timeFormat,
    date: timeFormat, // 另名date
    timeFrom,
    colorGradient: colorGradient.colorGradient,
    colorToRgba: colorGradient.colorToRgba,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    dispatch,
    broadcast,
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    hexToRgb: colorGradient.hexToRgb,
    rgbToHex: colorGradient.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    parent,
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
    getRect: function (instance: any | null | undefined, selector: any, all: boolean = false): Promise<any> {
        return new Promise(resolve => {
            uni.createSelectorQuery()
                .in(instance?.proxy)
                [all ? 'selectAll' : 'select'](selector)
                .boundingClientRect((rect: any) => {
                    if (all && Array.isArray(rect) && rect.length) {
                        resolve(rect);
                    }
                    if (!all && rect) {
                        resolve(rect);
                    }
                })
                .exec();
        });
    }
};

// $u挂载到uni对象上

const install = (): void => {
    uni.$u = $u;
};

export default {
    install
};
