import { parseSFC, findNode } from './utils';

/**
 * 页面模板转换：将页面内容包裹在 <global-root-view> 中
 *
 * <global-root-view> 是 App.root.vue 注册的全局组件，
 * 其模板中包含 <slot />，页面内容通过插槽传入。
 *
 * 处理逻辑：
 * 1. 解析 SFC，定位 <template> 标签的起止位置
 * 2. 提取模板内容，查找 PageMeta 节点（如有则提取到包裹层外部）
 * 3. 将剩余内容包裹在 <global-root-view>...</global-root-view> 中
 */
export async function transformPage(code: string) {
    const sfc = await parseSFC(code);

    if (!sfc.template) return null;

    // 用正则定位 <template> 开头标签
    const openMatch = code.match(/<template\b[^>]*>/);
    if (!openMatch) return null;

    // 使用 lastIndexOf 定位最后一个 </template>，即根 <template> 的闭合标签
    // 避免匹配到模板内具名插槽 <template #slot> 的闭合标签
    const closeTagStart = code.lastIndexOf('</template>');
    if (closeTagStart === -1) return null;

    const openTagEnd = openMatch.index! + openMatch[0].length;
    const content = code.slice(openTagEnd, closeTagStart);

    // 查找 page-meta 节点（如微信小程序原生的 page-meta 组件）
    const pageMetaNode = findNode(sfc, 'PageMeta');
    let pageMetaSource = '';
    let newContent = content;

    if (pageMetaNode) {
        pageMetaSource = pageMetaNode.loc.source;
        const metaStart = pageMetaNode.loc.start.offset;
        const metaEnd = pageMetaNode.loc.end.offset;

        // pageMetaNode.loc 的 offset 是相对于整个文件的，转换为相对于 content 的位置
        const metaStartInContent = metaStart - openTagEnd;
        const metaEndInContent = metaEnd - openTagEnd;

        newContent = content.slice(0, metaStartInContent) + content.slice(metaEndInContent);
    }

    // page-meta 放在包裹层外部，内容包裹在 <global-root-view> 中
    const wrappedContent = `\n${pageMetaSource}\n<global-root-view>${newContent}</global-root-view>\n`;

    return {
        code: code.slice(0, openTagEnd) + wrappedContent + code.slice(closeTagStart)
    };
}
