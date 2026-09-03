var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var root_exports = {};
__export(root_exports, {
  UniRoot: () => UniRoot,
  default: () => root_default
});
module.exports = __toCommonJS(root_exports);
var import_node_path = require("node:path");
var import_node_process = __toESM(require("node:process"));
var import_node_fs = require("node:fs");
var import_vite = require("vite");
var import_root = require("./root.cjs");
var import_page = require("./page.cjs");
var import_utils = require("./utils.cjs");
function normalizeId(id) {
  return (0, import_vite.normalizePath)(id).replace(/^[A-Z]:/, (match) => match.toLowerCase());
}
function UniRoot(options) {
  options = {
    rootFileName: "App.root",
    ...options
  };
  const rootPath = import_node_process.default.env.UNI_INPUT_DIR || (0, import_node_path.join)(import_node_process.default.cwd(), "src");
  const appRootPath = (0, import_node_path.resolve)(rootPath, `${options.rootFileName}.vue`);
  const pagesPath = (0, import_node_path.resolve)(rootPath, "pages.json");
  let pagesJson = (0, import_utils.loadPagesJson)(pagesPath, rootPath);
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
      const reload = (0, import_utils.debounce)(() => {
        try {
          pagesJson = (0, import_utils.loadPagesJson)(pagesPath, rootPath);
          server.ws.send({ type: "full-reload" });
        } catch (e) {
          console.error("[vite-plugin-uni-root] pages.json reload failed:", e);
        }
      }, 100);
      watcher = (0, import_node_fs.watch)(pagesPath, (eventType) => {
        if (eventType === "change")
          reload();
      });
    },
    load(id) {
      const normalizedId = normalizeId(id);
      if (normalizedId === normalizedAppRoot) {
        const code = (0, import_node_fs.readFileSync)(appRootPath, "utf-8");
        return (0, import_root.rebuildRootApp)(code).code;
      }
    },
    async transform(code, id) {
      const normalizedId = normalizeId(id);
      const normalizedRootPath = normalizeId(rootPath);
      if (normalizedId === `${normalizedRootPath}/main.ts` || normalizedId === `${normalizedRootPath}/main.js`) {
        return (0, import_root.registerRootApp)(code, options.rootFileName);
      }
      if (normalizedId === normalizedAppRoot) {
        return (0, import_root.rebuildRootApp)(code);
      }
      const pageId = hasPlatformPlugin ? (0, import_utils.normalizePlatformPath)(normalizedId) : normalizedId;
      const isPage = pagesJson.some((p) => pageId === p || pageId.startsWith(`${p}?`));
      if (isPage) {
        return (0, import_page.transformPage)(code);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UniRoot
});
