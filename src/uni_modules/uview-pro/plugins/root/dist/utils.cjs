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
var utils_exports = {};
__export(utils_exports, {
  debounce: () => debounce,
  findNode: () => findNode,
  formatPagePath: () => formatPagePath,
  loadPagesJson: () => loadPagesJson,
  normalizePlatformPath: () => normalizePlatformPath,
  parseSFC: () => parseSFC,
  stripJsonComments: () => stripJsonComments,
  toKebabCase: () => toKebabCase,
  toPascalCase: () => toPascalCase
});
module.exports = __toCommonJS(utils_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
var import_vite = require("vite");
async function parseSFC(code) {
  try {
    const { parse } = await import("vue/compiler-sfc");
    return parse(code, { pad: "space" }).descriptor;
  } catch {
    return null;
  }
}
function stripJsonComments(str) {
  return str.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
}
function formatPagePath(root, path) {
  return (0, import_vite.normalizePath)(`${(0, import_node_path.join)(root, path)}.vue`).replace(/^[A-Z]:/, (match) => match.toLowerCase());
}
function loadPagesJson(path, rootPath) {
  const raw = (0, import_node_fs.readFileSync)(path, "utf-8");
  const { pages = [], subPackages = [] } = JSON.parse(stripJsonComments(raw));
  return [
    ...pages.map((page) => formatPagePath(rootPath, page.path)),
    ...subPackages.map(({ pages: subPages = [], root = "" }) => {
      return subPages.map((page) => formatPagePath((0, import_node_path.join)(rootPath, root), page.path));
    }).flat()
  ];
}
function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").toLowerCase();
}
function toPascalCase(str) {
  return str.replace(/(^\w|-+\w)/g, (match) => match.toUpperCase().replace(/-/g, ""));
}
function findNode(sfc, rawTagName) {
  var _a, _b;
  const templateSource = (_a = sfc.template) == null ? void 0 : _a.content;
  if (!templateSource)
    return;
  let tagName = "";
  if (templateSource.includes(`<${toKebabCase(rawTagName)}`)) {
    tagName = toKebabCase(rawTagName);
  } else if (templateSource.includes(`<${toPascalCase(rawTagName)}`)) {
    tagName = toPascalCase(rawTagName);
  }
  if (!tagName)
    return;
  const nodeAst = (_b = sfc.template) == null ? void 0 : _b.ast;
  if (!nodeAst)
    return;
  const traverse = (nodes) => {
    var _a2;
    for (const node of nodes) {
      if (node.type === 1) {
        if (node.tag === tagName)
          return node;
        if ((_a2 = node.children) == null ? void 0 : _a2.length) {
          const found = traverse(node.children);
          if (found)
            return found;
        }
      }
    }
    return void 0;
  };
  return traverse(nodeAst.children);
}
function normalizePlatformPath(id) {
  const platform = process.env.UNI_PLATFORM;
  if (!platform)
    return id;
  const regex = new RegExp(`\\.${platform}\\.vue$`);
  if (regex.test(id)) {
    return id.replace(`.${platform}.`, ".");
  }
  return id;
}
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer)
      clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  debounce,
  findNode,
  formatPagePath,
  loadPagesJson,
  normalizePlatformPath,
  parseSFC,
  stripJsonComments,
  toKebabCase,
  toPascalCase
});
