import { resolve, join } from "node:path";
import process from "node:process";
import { watch, readFileSync } from "node:fs";
import { normalizePath } from "vite";
import { registerRootApp, rebuildRootApp } from "./root.mjs";
import { transformPage } from "./page.mjs";
import { loadPagesJson, normalizePlatformPath, debounce } from "./utils.mjs";
function normalizeId(id) {
  return normalizePath(id).replace(/^[A-Z]:/, (match) => match.toLowerCase());
}
function UniRoot(options) {
  options = {
    rootFileName: "App.root",
    ...options
  };
  const rootPath = process.env.UNI_INPUT_DIR || join(process.cwd(), "src");
  const appRootPath = resolve(rootPath, `${options.rootFileName}.vue`);
  const pagesPath = resolve(rootPath, "pages.json");
  let pagesJson = loadPagesJson(pagesPath, rootPath);
  let watcher = null;
  let hasPlatformPlugin = false;
  const normalizedAppRoot = normalizeId(appRootPath);
  return {
    name: "vite-plugin-uni-root",
    enforce: "pre",
    // 在其他插件之前执行，确保页面模板先被包裹
    configResolved({ plugins }) {
      hasPlatformPlugin = plugins.some((v) => v.name === "vite-plugin-uni-platform");
    },
    configureServer(server) {
      const reload = debounce(() => {
        try {
          pagesJson = loadPagesJson(pagesPath, rootPath);
          server.ws.send({ type: "full-reload" });
        } catch (e) {
          console.error("[vite-plugin-uni-root] pages.json reload failed:", e);
        }
      }, 100);
      watcher = watch(pagesPath, (eventType) => {
        if (eventType === "change")
          reload();
      });
    },
    load(id) {
      const normalizedId = normalizeId(id);
      if (normalizedId === normalizedAppRoot) {
        const code = readFileSync(appRootPath, "utf-8");
        return rebuildRootApp(code).code;
      }
    },
    async transform(code, id) {
      const normalizedId = normalizeId(id);
      const normalizedRootPath = normalizeId(rootPath);
      if (normalizedId === `${normalizedRootPath}/main.ts` || normalizedId === `${normalizedRootPath}/main.js`) {
        return registerRootApp(code, options.rootFileName);
      }
      if (normalizedId === normalizedAppRoot) {
        return rebuildRootApp(code);
      }
      const pageId = hasPlatformPlugin ? normalizePlatformPath(normalizedId) : normalizedId;
      const isPage = pagesJson.some((p) => pageId === p || pageId.startsWith(`${p}?`));
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
var root_default = UniRoot;
export {
  UniRoot,
  root_default as default
};
