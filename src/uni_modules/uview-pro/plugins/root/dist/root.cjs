var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var root_exports = {};
__export(root_exports, {
  rebuildRootApp: () => rebuildRootApp,
  registerRootApp: () => registerRootApp
});
module.exports = __toCommonJS(root_exports);
function createEmptySourcemap() {
  return {
    version: 3,
    sources: [],
    names: [],
    mappings: ""
  };
}
function registerRootApp(code, fileName = "App.root") {
  const importCode = `import GlobalRootView from "./${fileName}.vue";`;
  const vueUseComponentCode = `app.component("global-root-view", GlobalRootView);`;
  let newCode = importCode + "\n" + code;
  const ssrAppMatch = newCode.match(/(const\s+app\s*=\s*createSSRApp\([^)]+\);)/);
  if (ssrAppMatch) {
    newCode = newCode.replace(/(const\s+app\s*=\s*createSSRApp\([^)]+\);)/, `$1
    ${vueUseComponentCode}`);
  } else {
    newCode = newCode.replace(/(createApp[\s\S]*?)(return\s*\{)/, `$1${vueUseComponentCode}
    $2`);
  }
  return { code: newCode, map: createEmptySourcemap() };
}
function rebuildRootApp(code) {
  return { code, map: createEmptySourcemap() };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rebuildRootApp,
  registerRootApp
});
