import type { Plugin } from 'vite';
import { resolve, join } from 'node:path';
import process from 'node:process';
import { watch, readFileSync } from 'node:fs';
import { normalizePath } from 'vite';
import { registerRootApp, rebuildRootApp } from './root';
import { transformPage } from './page';
import { loadPagesJson, normalizePlatformPath, debounce } from './utils';

interface UniRootOptions {
    /** 根组件文件名（不含扩展名），默认 App.root */
    rootFileName?: string;
}

/**
 * 规范化模块 ID：统一路径分隔符，统一 Windows 盘符为小写
 */
function normalizeId(id: string) {
    return normalizePath(id).replace(/^[A-Z]:/, match => match.toLowerCase());
}

/**
 * UniApp 虚拟根组件 Vite 插件
 *
 * ## 解决的问题
 * UniApp 不支持原生的根组件包裹机制，导致无法在全局统一注入
 * u-config-provider、u-toast、u-modal 等组件。
 *
 * ## 工作原理
 * 1. 在 main.ts 中注入 App.root.vue 的导入，并注册为全局组件 global-root-view
 * 2. 在每个页面的 <template> 中包裹 <global-root-view> 标签
 * 3. App.root.vue 中的 <slot /> 渲染页面内容
 *
 * ## 支持 HMR
 * pages.json 变更时自动重载页面列表，无需手动重启
 *
 * ## 跨端兼容
 * 纯 Vite 构建时插件，在所有 UniApp 支持的平台（H5、微信小程序、支付宝小程序、
 * 头条小程序、Android App、iOS App、鸿蒙 App）均可正常工作
 */
export function UniRoot(options?: UniRootOptions): Plugin {
    options = {
        rootFileName: 'App.root',
        ...options
    };

    const rootPath = process.env.UNI_INPUT_DIR || join(process.cwd(), 'src');
    const appRootPath = resolve(rootPath, `${options.rootFileName}.vue`);
    const pagesPath = resolve(rootPath, 'pages.json');

    let pagesJson = loadPagesJson(pagesPath, rootPath);
    let watcher: ReturnType<typeof watch> | null = null;
    let hasPlatformPlugin = false;

    const normalizedAppRoot = normalizeId(appRootPath);

    return {
        name: 'vite-plugin-uni-root',
        enforce: 'pre', // 在其他插件之前执行，确保页面模板先被包裹

        configResolved({ plugins }) {
            // 检测是否有 uni-platform 插件，用于处理平台特定页面路径（如 .mp-weixin.vue）
            hasPlatformPlugin = plugins.some(v => v.name === 'vite-plugin-uni-platform');
        },

        configureServer(server) {
            // 监听 pages.json 变更，HMR 热重载页面列表
            const reload = debounce(() => {
                try {
                    pagesJson = loadPagesJson(pagesPath, rootPath);
                    server.ws.send({ type: 'full-reload' });
                } catch (e) {
                    console.error('[vite-plugin-uni-root] pages.json reload failed:', e);
                }
            }, 100);

            watcher = watch(pagesPath, eventType => {
                if (eventType === 'change') reload();
            });
        },

        load(id) {
            const normalizedId = normalizeId(id);
            // 只拦截根 SFC 请求，不拦截 Vue 子模块请求（如 ?vue&type=script）
            if (normalizedId === normalizedAppRoot) {
                const code = readFileSync(appRootPath, 'utf-8');
                return rebuildRootApp(code).code;
            }
        },

        async transform(code, id) {
            const normalizedId = normalizeId(id);
            const normalizedRootPath = normalizeId(rootPath);

            // 注入 App.root.vue 的导入，并注册为全局组件 global-root-view
            if (normalizedId === `${normalizedRootPath}/main.ts` || normalizedId === `${normalizedRootPath}/main.js`) {
                return registerRootApp(code, options.rootFileName);
            }

            // App.root.vue 兜底处理（已在 load 中处理，此处只处理根 SFC）
            if (normalizedId === normalizedAppRoot) {
                return rebuildRootApp(code);
            }

            // 页面模板包裹 <global-root-view>
            const pageId = hasPlatformPlugin ? normalizePlatformPath(normalizedId) : normalizedId;
            const isPage = pagesJson.some(p => pageId === p || pageId.startsWith(`${p}?`));
            if (isPage) {
                return transformPage(code);
            }
        },

        buildEnd() {
            if (watcher) {
                watcher.close();
                watcher = null;
            }
        }
    };
}

export default UniRoot;
export type { UniRootOptions };
