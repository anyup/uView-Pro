/// <reference path="./components.d.ts" />
/// <reference path="./uni-app.d.ts" />

import http from '../libs/request/index';
import queryParams from '../libs/function/queryParams';
import route from '../libs/function/route';
import timeFormat from '../libs/function/timeFormat';
import timeFrom from '../libs/function/timeFrom';
import colorGradient from '../libs/function/colorGradient';
import guid from '../libs/function/guid';
import color from '../libs/function/color';
import type2icon from '../libs/function/type2icon';
import randomArray from '../libs/function/randomArray';
import deepClone from '../libs/function/deepClone';
import deepMerge from '../libs/function/deepMerge';
import addUnit from '../libs/function/addUnit';
import test from '../libs/function/test';
import random from '../libs/function/random';
import trim from '../libs/function/trim';
import toast from '../libs/function/toast';
import getParent from '../libs/function/getParent';
import $parent from '../libs/function/$parent';
import debounce from '../libs/function/debounce';
import throttle from '../libs/function/throttle';
import getRect from '../libs/function/getRect';
import { sys, os } from '../libs/function/sys';
import { parentData, parent } from '../libs/function/parent';
import config from '../libs/config/config';
import zIndex from '../libs/config/zIndex';
import { dispatch, broadcast } from '../libs/util/emitter';
import { mitt } from '../libs/util/mitt';

// uview-pro 模块类型声明
declare module 'uview-pro' {
    // 导出安装函数
    export function install(): void;

    // 导出 $u 工具类型
    export interface $Utils {
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
        parentData: typeof parentData;
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
        getRect: typeof getRect;
    }
}

// 全局类型扩展
declare global {
    interface Uni {
        $u: import('uview-pro').$Utils;
    }
}

export {};
