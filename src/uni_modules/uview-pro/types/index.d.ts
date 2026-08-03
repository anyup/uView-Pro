/// <reference path="./components.d.ts" />
/// <reference path="./uni-app.d.ts" />

export * from './global';
export * from '../libs';

declare global {
    interface Uni {
        $u: typeof import('../libs').$u;
    }
}

declare module 'uview-pro' {
    export function install(app: any, options?: import('./global').UViewProOptions): void;
}
