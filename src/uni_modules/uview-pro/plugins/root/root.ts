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

    return { code: newCode };
}

/**
 * App.root.vue 模板中已使用 <slot /> 作为子内容插槽，
 * 无需替换，直接透传。
 */
export function rebuildRootApp(code: string) {
    return { code };
}
