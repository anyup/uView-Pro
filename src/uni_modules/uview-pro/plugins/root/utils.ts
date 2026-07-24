import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { normalizePath } from 'vite';

/**
 * Parse Vue SFC file, return descriptor
 */
export async function parseSFC(code: string) {
    try {
        const { parse } = await import('vue/compiler-sfc');
        return parse(code, { pad: 'space' }).descriptor;
    } catch {
        throw new Error('[vite-plugin-uni-root] Vue version must be 3.2.13 or higher.');
    }
}

/**
 * Strip JSON comments (single-line and multi-line)
 */
export function stripJsonComments(str: string): string {
    return str.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
}

/**
 * Convert pages.json path to absolute file path
 */
export function formatPagePath(root: string, path: string) {
    return normalizePath(`${join(root, path)}.vue`).replace(/^[A-Z]:/, match => match.toLowerCase());
}

/**
 * Load pages.json and resolve all page paths (main + subPackages)
 */
export function loadPagesJson(path: string, rootPath: string): string[] {
    const raw = readFileSync(path, 'utf-8');
    const { pages = [], subPackages = [] } = JSON.parse(stripJsonComments(raw));

    return [
        ...pages.map((page: any) => formatPagePath(rootPath, page.path)),
        ...subPackages
            .map(({ pages: subPages = [], root = '' }: any) => {
                return subPages.map((page: any) => formatPagePath(join(rootPath, root), page.path));
            })
            .flat()
    ];
}

/**
 * camelCase to kebab-case: PageMeta -> page-meta
 */
export function toKebabCase(str: string) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[_\s]+/g, '-')
        .toLowerCase();
}

/**
 * kebab-case to PascalCase: page-meta -> PageMeta
 */
export function toPascalCase(str: string) {
    return str.replace(/(^\w|-+\w)/g, match => match.toUpperCase().replace(/-/g, ''));
}

interface TagNode {
    loc: {
        source: string;
        start: { offset: number };
        end: { offset: number };
    };
}

/**
 * Find a tag node in SFC template AST by tag name
 * Supports both kebab-case and PascalCase
 */
export function findNode(sfc: any, rawTagName: string): TagNode | undefined {
    const templateSource = sfc.template?.content;
    if (!templateSource) return;

    let tagName = '';
    if (templateSource.includes(`<${toKebabCase(rawTagName)}`)) {
        tagName = toKebabCase(rawTagName);
    } else if (templateSource.includes(`<${toPascalCase(rawTagName)}`)) {
        tagName = toPascalCase(rawTagName);
    }

    if (!tagName) return;

    const nodeAst = sfc.template?.ast;
    if (!nodeAst) return;

    // Recursively traverse AST to find the target node
    const traverse = (nodes: any): TagNode | undefined => {
        for (const node of nodes) {
            if (node.type === 1) {
                if (node.tag === tagName) return node;
                if (node.children?.length) {
                    const found = traverse(node.children);
                    if (found) return found;
                }
            }
        }
        return undefined;
    };

    return traverse(nodeAst.children);
}

/**
 * Normalize platform-specific page paths (.mp-weixin.vue -> .vue)
 */
export function normalizePlatformPath(id: string) {
    const platform = process.env.UNI_PLATFORM;
    if (!platform) return id;

    const regex = new RegExp(`\\.${platform}\\.vue$`);
    if (regex.test(id)) {
        return id.replace(`.${platform}.`, '.');
    }
    return id;
}

/**
 * Debounce utility
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
