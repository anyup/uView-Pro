// @ts-nocheck
/**
 * we-cropper 类型声明文件
 * 适用于 Vue3 + TypeScript 项目中 weCropper.js 的类型提示
 */

export interface WeCropperOptions {
    id?: string;
    targetId?: string;
    pixelRatio?: number;
    width?: number;
    height?: number;
    scale?: number;
    zoom?: number;
    cut?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    };
    boundStyle?: {
        lineWidth?: number;
        borderColor?: string;
        mask?: string;
        color?: string;
    };
    [key: string]: any;
}

export type WeCropperEvent = (ctx: any, instance?: any) => void;

export interface WeCropperInstance {
    pushOrign(src: string): Promise<void>;
    pushOrigin(src: string): Promise<void>;
    removeImage(): Promise<void>;
    getCropperBase64(done?: (base64: string) => void): void;
    getCropperImage(opt: any, fn: (path: string, err: any) => void): void;
    update(): void;
    touchStart(e: any): void;
    touchMove(e: any): void;
    touchEnd(e: any): void;
    on(event: 'ready' | 'beforeImageLoad' | 'imageLoad' | 'beforeDraw', fn: WeCropperEvent): WeCropperInstance;
    // 其它动态方法
    [key: string]: any;
}

// WeCropper 类型声明文件
declare class WeCropper {
    constructor(params: any);

    // 事件方法
    on(event: string, callback: (ctx?: any) => void): WeCropper;

    // 其他方法
    pushOrign(src: string): void;
    getCropperImage(callback?: (tempFilePath: string) => void): void;

    // 属性
    [key: string]: any;
}

export default WeCropper;
