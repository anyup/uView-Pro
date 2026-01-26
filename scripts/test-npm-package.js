#!/usr/bin/env node
/**
 * 简化版自动化脚本（用于 test:local）
 * 功能：
 *  1) 打包 src/uni_modules/uview-pro（pnpm 优先，fallback npm）
 *  2) 使用 pnpm/add 或 npm 安装生成的 tgz 到项目（不修改源码，不创建备份）
 *  3) 修改 vite.config.ts 注释掉本地 alias（根据你的要求）
 *  4) 修改 src/pages.json 的 easycom 映射为 "uview-pro/..."
 *
 * 注意：本脚本不会启动 dev，也不会创建 bak 或自动恢复，所有改动请你自行恢复或使用 cleanup 脚本。
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const packageDir = path.join(root, 'src', 'uni_modules', 'uview-pro');
const viteConfigPath = path.join(root, 'vite.config.ts');
const pagesJsonPath = path.join(root, 'src', 'pages.json');
const mainTsPath = path.join(root, 'src', 'main.ts');

function log(...args) {
    console.log('[test-npm-package]', ...args);
}

// 简化处理：不使用包管理器 add/tgz 安装，直接拷贝源码到 node_modules/uview-pro
function copyDirSync(src, dest) {
    if (!fs.existsSync(src)) throw new Error('源目录不存在: ' + src);
    // 删除目标如果存在
    if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirSync(srcPath, destPath);
        } else if (entry.isFile()) {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function installByCopy() {
    const nodeModulesTarget = path.join(root, 'node_modules', 'uview-pro');
    try {
        log('将源码拷贝到', nodeModulesTarget, '用于本地测试（不会修改 package.json 或 lockfile）');
        copyDirSync(packageDir, nodeModulesTarget);
        log('拷贝完成。');
    } catch (e) {
        console.error('拷贝安装失败：', e);
        process.exit(1);
    }
}

function modifyViteConfig() {
    try {
        if (!fs.existsSync(viteConfigPath)) {
            log('vite.config.ts 未找到，跳过修改');
            return;
        }
        let content = fs.readFileSync(viteConfigPath, 'utf8');
        const lines = content.split(/\r?\n/);
        let changed = false;
        const newLines = lines.map(ln => {
            const trimmed = ln.trim();
            // 如果行已经被注释，跳过
            if (trimmed.startsWith('//')) return ln;
            // 如果包含 alias 指向 src/uni_modules/uview-pro 的字符串，将其注释
            if (ln.includes('src/uni_modules/uview-pro')) {
                changed = true;
                return `// ${ln}`;
            }
            return ln;
        });
        if (changed) {
            fs.writeFileSync(viteConfigPath, newLines.join('\n'), 'utf8');
            log('已修改 vite.config.ts（注释包含 uview-pro alias 的行）。');
        } else {
            log('vite.config.ts 中未找到需注释的 uview-pro alias 行，跳过。');
        }
    } catch (e) {
        console.error('修改 vite.config.ts 失败：', e);
    }
}

function modifyPagesJson() {
    try {
        if (!fs.existsSync(pagesJsonPath)) {
            log('src/pages.json 未找到，跳过修改');
            return;
        }
        let content = fs.readFileSync(pagesJsonPath, 'utf8');
        // 将 easycom 的映射从 "@/uni_modules/uview-pro/..." 改为 "uview-pro/..."
        content = content.replace(
            /"@\/uni_modules\/uview-pro\/components\/u-\$1\/u-\$1\.vue"/g,
            `"uview-pro/components/u-$1/u-$1.vue"`
        );
        // 也尝试不带 quotes 的老格式
        content = content.replace(
            /@\/uni_modules\/uview-pro\/components\/u-\$1\/u-\$1\.vue/g,
            `uview-pro/components/u-$1/u-$1.vue`
        );
        fs.writeFileSync(pagesJsonPath, content, 'utf8');
        log('已修改 src/pages.json（easycom 映射改为 uview-pro）。');
    } catch (e) {
        console.error('修改 src/pages.json 失败：', e);
    }
}

function ensureMainImport() {
    try {
        if (!fs.existsSync(mainTsPath)) {
            log('src/main.ts 未找到，跳过 import 替换');
            return;
        }
        let content = fs.readFileSync(mainTsPath, 'utf8');
        if (content.indexOf("from 'uview-pro'") === -1 && content.indexOf('from "uview-pro"') === -1) {
            // 替换 "@/uni_modules/uview-pro" 为 "uview-pro"
            content = content.replace(/from\s+['"]@\/uni_modules\/uview-pro['"]/g, `from 'uview-pro'`);
            fs.writeFileSync(mainTsPath, content, 'utf8');
            log("已替换 src/main.ts 的导入为 from 'uview-pro'。");
        } else {
            log("src/main.ts 已使用 from 'uview-pro'，无需修改。");
        }
    } catch (e) {
        console.error('处理 src/main.ts 失败：', e);
    }
}

function main() {
    log('开始执行 test-npm 步骤（不会启动 dev，且不会创建 bak/自动恢复）。');
    // 1. 直接把 src/uni_modules/uview-pro 拷贝到 node_modules/uview-pro（不改 package.json / lockfile）
    installByCopy();
    // 3. 修改 vite.config.ts 注释 alias
    modifyViteConfig();
    // 4. 修改 pages.json 替换 easycom 映射
    modifyPagesJson();
    // 5. 确保 main.ts 导入使用 'uview-pro'
    ensureMainImport();

    log(
        '全部步骤完成。请手动运行 dev（例如：pnpm run dev 或 npm run dev），并在测试完成后手动清理或使用 npm run test:npm:cleanup。'
    );
}

main();
