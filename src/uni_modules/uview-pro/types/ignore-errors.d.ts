// 忽略 uview-pro 组件库内部的 TypeScript 错误
// 这些错误不影响组件的正常使用和类型提示

// 忽略 WeCropper 相关的类型错误
declare module 'weCropper' {
    export class WeCropper {
        constructor(params: any);
        [key: string]: any;
    }
}

// 忽略 base64 模块的类型错误
declare module 'base64' {
    export function encode(data: any): string;
    export function decode(data: string): any;
}

// 忽略其他内部模块的类型错误
declare module 'uview-pro/components/*' {
    const component: any;
    export default component;
}

// 忽略工具函数的类型错误
declare module 'uview-pro/libs/function/*' {
    const func: any;
    export default func;
}

export {};
