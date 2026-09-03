import { readFileSync } from "node:fs";
import { join } from "node:path";
import { normalizePath } from "vite";
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
  return normalizePath(`${join(root, path)}.vue`).replace(/^[A-Z]:/, (match) => match.toLowerCase());
}
function loadPagesJson(path, rootPath) {
  const raw = readFileSync(path, "utf-8");
  const { pages = [], subPackages = [] } = JSON.parse(stripJsonComments(raw));
  return [
    ...pages.map((page) => formatPagePath(rootPath, page.path)),
    ...subPackages.map(({ pages: subPages = [], root = "" }) => {
      return subPages.map((page) => formatPagePath(join(rootPath, root), page.path));
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
export {
  debounce,
  findNode,
  formatPagePath,
  loadPagesJson,
  normalizePlatformPath,
  parseSFC,
  stripJsonComments,
  toKebabCase,
  toPascalCase
};
