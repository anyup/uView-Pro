/// <reference path="./components.d.ts" />
/// <reference path="./uni-app.d.ts" />

import { $u } from '../libs';

// uview-pro 模块类型声明
declare module 'uview-pro' {
    // 导出安装函数
    export function install(): void;
}

// 全局类型扩展
declare global {
    interface Uni {
        $u: typeof $u;
    }
}

export {};
