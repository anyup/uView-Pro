#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const packageDir = path.join(root, 'src', 'uni_modules', 'uview-pro');
const nodeModulesPath = path.join(root, 'node_modules', 'uview-pro');

function log(...args) {
    console.log('[test-npm-cleanup]', ...args);
}

// 删除 node_modules/uview-pro（若存在）
try {
    if (fs.existsSync(nodeModulesPath)) {
        fs.rmSync(nodeModulesPath, { recursive: true, force: true });
        log('Removed', nodeModulesPath);
    } else {
        log('No npm node_modules/uview-pro found.');
    }
} catch (e) {
    console.error('Error removing node_modules/uview-pro:', e);
}

// 删除打包产物 *.tgz
try {
    if (fs.existsSync(packageDir)) {
        const files = fs.readdirSync(packageDir);
        files.forEach(f => {
            if (/^uview-pro-.*\\.tgz$/.test(f)) {
                const p = path.join(packageDir, f);
                try {
                    fs.unlinkSync(p);
                    log('Removed', p);
                } catch (e) {}
            }
        });
    }
} catch (e) {
    // ignore
}

log('Cleanup finished. Note: vite.config.ts/pages.json/src/main.ts 的修改需要手动恢复或使用 git checkout。');
