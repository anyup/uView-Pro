// /src/uni_modules/uview-pro/types/uni-app.d.ts
// 扩展全局 HTMLAttributes 以支持 uni-app/小程序自定义属性
import 'vue';

declare module 'vue' {
    export interface GlobalComponents {
        // UniApp core/native tags
        view: any;
        'scroll-view': any;
        swiper: any;
        'swiper-item': any;
        image: any;
        'rich-text': any;
        canvas: any;
        block: any;

        // Basic HTML shims often used by uni-app compiler
        text: any;
    }
    interface HTMLAttributes {
        // 支持小程序/uni-app 特有属性
        'hover-class'?: string;
        'hover-stop-propagation'?: boolean;
        'hover-start-time'?: number;
        'hover-stay-time'?: number;
        animation?: string;
        'data-*'?: any;
        catchtap?: (e: any) => void;
        catchlongpress?: (e: any) => void;
        catchtouchstart?: (e: any) => void;
        catchtouchmove?: (e: any) => void;
        catchtouchend?: (e: any) => void;
        catchtouchcancel?: (e: any) => void;
        // 其他常用 uni-app 事件和属性可按需补充
        src?: string;
    }
}

// 兼容 JSX/TSX 场景
declare global {
    namespace JSX {
        interface IntrinsicAttributes {
            'hover-class'?: string;
            'hover-stop-propagation'?: boolean;
            'hover-start-time'?: number;
            'hover-stay-time'?: number;
            animation?: string;
            'data-*'?: any;
            catchtap?: (e: any) => void;
            catchlongpress?: (e: any) => void;
            catchtouchstart?: (e: any) => void;
            catchtouchmove?: (e: any) => void;
            catchtouchend?: (e: any) => void;
            catchtouchcancel?: (e: any) => void;
            src?: string;
        }
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}

export {};
