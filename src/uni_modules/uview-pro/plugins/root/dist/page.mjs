import { parseSFC, findNode } from "./utils.mjs";
async function transformPage(code) {
  const sfc = await parseSFC(code);
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
    const pageMetaNode = findNode(sfc, "PageMeta");
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
export {
  transformPage
};
