#!/usr/bin/env node

/*
  Ensure non-empty CSS assets in dist to avoid hosts stripping zero-byte files
  Usage: runs automatically via npm postbuild
*/

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(process.cwd(), 'dist');

function walk(dir, handler) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, handler);
        else handler(full);
    }
}

function ensureCssNotEmpty(filePath) {
    try {
        const stat = fs.statSync(filePath);
        if (stat.size === 0) {
            fs.writeFileSync(filePath, '/* keep: prevent hosting from stripping empty CSS; referenced by JS chunk */\n', 'utf8');
            // eslint-disable-next-line no-console
            console.log(`fixed empty css: ${path.relative(process.cwd(), filePath)}`);
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`skip css check: ${filePath}`, e?.message);
    }
}

function run() {
    if (!fs.existsSync(DIST_DIR)) return;
    walk(DIST_DIR, full => {
        if (full.endsWith('.css')) ensureCssNotEmpty(full);
    });
}

run();
