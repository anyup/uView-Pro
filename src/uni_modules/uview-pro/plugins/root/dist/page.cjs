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
var page_exports = {};
__export(page_exports, {
  transformPage: () => transformPage
});
module.exports = __toCommonJS(page_exports);
var import_utils = require("./utils.cjs");
async function transformPage(code) {
  const sfc = await (0, import_utils.parseSFC)(code);
  const openMatch = code.match(/<template\b[^>]*>/);
  if (!openMatch)
    return null;
  const closeTagStart = code.lastIndexOf("</template>");
  if (closeTagStart === -1)
    return null;
  const openTagEnd = openMatch.index + openMatch[0].length;
  const content = code.slice(openTagEnd, closeTagStart);
  let pageMetaSource = "";
  let newContent = content;
  if (sfc == null ? void 0 : sfc.template) {
    const pageMetaNode = (0, import_utils.findNode)(sfc, "PageMeta");
    if (pageMetaNode) {
      pageMetaSource = pageMetaNode.loc.source;
      const metaStart = pageMetaNode.loc.start.offset;
      const metaEnd = pageMetaNode.loc.end.offset;
      const metaStartInContent = metaStart - openTagEnd;
      const metaEndInContent = metaEnd - openTagEnd;
      newContent = content.slice(0, metaStartInContent) + content.slice(metaEndInContent);
    }
  } else {
    const pageMetaMatch = content.match(/<page-meta\b[^>]*>[\s\S]*?<\/page-meta>/);
    if (pageMetaMatch) {
      pageMetaSource = pageMetaMatch[0];
      newContent = content.replace(pageMetaMatch[0], "");
    } else {
      const selfClosingMatch = content.match(/<page-meta\b[^>]*\/>/);
      if (selfClosingMatch) {
        pageMetaSource = selfClosingMatch[0];
        newContent = content.replace(selfClosingMatch[0], "");
      }
    }
  }
  const wrappedContent = `
${pageMetaSource}
<global-root-view>${newContent}</global-root-view>
`;
  return {
    code: code.slice(0, openTagEnd) + wrappedContent + code.slice(closeTagStart),
    map: {
      version: 3,
      sources: [],
      names: [],
      mappings: ""
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  transformPage
});
