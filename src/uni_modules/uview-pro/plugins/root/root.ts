/**
 * 创建一个最小的 sourcemap，用于满足 Vite/Rollup 的 sourcemap 要求。
 *
 * 这是一个空映射的 sourcemap（mappings 为空字符串），不提供精确的源码映射，
 * 但可以避免 "Sourcemap is likely to be incorrect" 警告。
 * 调试器会回退到显示转换后的代码，不影响功能。
 *
 * 纯 JS 实现，无需第三方依赖。
 */
function createEmptySourcemap() {
    return {
        version: 3 as const,
        sources: [] as string[],
        names: [] as string[],
        mappings: ''
    };
}

/**
 * 向 main.ts 注入 App.root.vue 的导入和全局注册
 *
 * 流程：
 * 1. 在文件顶部插入 `import GlobalRootView from "./App.root.vue"`
 * 2. 在 createSSRApp 之后插入 `app.component("global-root-view", GlobalRootView)`
 *
 * 注：GlobalRootView 仅为 main.ts 中的局部变量名，
 *     实际组件就是 App.root.vue，页面通过 <global-root-view> 标签使用。
 */
export function registerRootApp(code: string, fileName: string = 'App.root') {
    const importCode = `import GlobalRootView from "./${fileName}.vue";`;
    const vueUseComponentCode = `app.component("global-root-view", GlobalRootView);`;

    let newCode = importCode + '\n' + code;

    // 在 createSSRApp 赋值语句之后插入组件注册代码
    const ssrAppMatch = newCode.match(/(const\s+app\s*=\s*createSSRApp\([^)]+\);)/);
    if (ssrAppMatch) {
        newCode = newCode.replace(/(const\s+app\s*=\s*createSSRApp\([^)]+\);)/, `$1\n    ${vueUseComponentCode}`);
    } else {
        // 兜底：在 return { 之前插入
        newCode = newCode.replace(/(createApp[\s\S]*?)(return\s*\{)/, `$1${vueUseComponentCode}\n    $2`);
    }

    return { code: newCode, map: createEmptySourcemap() };
}

/**
 * App.root.vue 模板中已使用 <slot /> 作为子内容插槽，
 * 无需替换，直接透传。
 */
export function rebuildRootApp(code: string) {
    return { code, map: createEmptySourcemap() };
}
