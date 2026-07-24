#!/usr/bin/env node

/**
 * 编译 Vite 插件 TypeScript 源码为 ESM (.mjs) 和 CJS (.cjs)
 *
 * 当 uview-pro 通过 npm 安装时，Node.js ESM 无法直接加载 .ts 文件，
 * 因此需要将 plugins/root/ 下的 .ts 文件编译为 .mjs 和 .cjs 文件，
 * 统一输出到 plugins/root/dist/ 目录，并通过 package.json 的 exports 字段映射。
 *
 * 使用方法:
 *   node scripts/build-plugins.js
 */

'use strict';

var fs = require('fs');
var path = require('path');

var projectRoot = path.resolve(__dirname, '..');

/**
 * 兼容 pnpm / npm / yarn 的 node_modules 结构，查找 esbuild
 */
function findEsbuild() {
    try {
        return require('esbuild');
    } catch (e) {
        /* ignore */
    }

    var pnpmDir = path.join(projectRoot, 'node_modules', '.pnpm');
    if (fs.existsSync(pnpmDir)) {
        var entries = fs.readdirSync(pnpmDir);
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].indexOf('esbuild@') === 0) {
                try {
                    return require(path.join(pnpmDir, entries[i], 'node_modules', 'esbuild'));
                } catch (e) {
                    /* ignore */
                }
            }
        }
    }

    try {
        return require(path.join(projectRoot, 'node_modules', 'esbuild'));
    } catch (e) {
        /* ignore */
    }

    throw new Error(
        'Cannot find esbuild. Please install esbuild as a devDependency:\n' +
            '  npm install esbuild --save-dev\n' +
            '  # or\n' +
            '  pnpm add esbuild -D'
    );
}

/**
 * 递归查找目录下所有 .ts 文件（排除 .d.ts）
 */
function findTsFiles(dir) {
    var entries = fs.readdirSync(dir, { withFileTypes: true });
    var files = [];
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(findTsFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
            files.push(fullPath);
        }
    }
    return files;
}

/**
 * 修正 .mjs 文件中的 import/export 路径，补全 .mjs 扩展名
 */
function fixEsmImports(distDir) {
    var distFiles = fs.readdirSync(distDir).filter(function (f) {
        return f.endsWith('.mjs');
    });
    for (var i = 0; i < distFiles.length; i++) {
        var filePath = path.join(distDir, distFiles[i]);
        var content = fs.readFileSync(filePath, 'utf8');
        var lines = content.split('\n');
        var changed = false;
        for (var j = 0; j < lines.length; j++) {
            var line = lines[j];
            lines[j] = line.replace(
                /^(\s*(?:import|export)\b[^'"]*?\bfrom\s+|import\s+)['"]\.\/([^'"\/\.]+)['"]/g,
                function (match, prefix, name) {
                    changed = true;
                    return prefix + '"./' + name + '.mjs"';
                }
            );
        }
        if (changed) {
            fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        }
    }
}

/**
 * 修正 .cjs 文件中的 require 路径，补全 .cjs 扩展名
 */
function fixCjsRequires(distDir) {
    var distFiles = fs.readdirSync(distDir).filter(function (f) {
        return f.endsWith('.cjs');
    });
    for (var i = 0; i < distFiles.length; i++) {
        var filePath = path.join(distDir, distFiles[i]);
        var content = fs.readFileSync(filePath, 'utf8');
        var changed = false;
        content = content.replace(/require\(['"]\.\/([^'"\/\.]+)['"]\)/g, function (match, name) {
            changed = true;
            return 'require("./' + name + '.cjs")';
        });
        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

var esbuild = findEsbuild();
var pluginsDir = path.resolve(projectRoot, 'src', 'uni_modules', 'uview-pro', 'plugins');
var rootSrcDir = path.join(pluginsDir, 'root');
var rootDistDir = path.join(rootSrcDir, 'dist');

// 1. 清理旧的编译产物
console.log('Cleaning old build artifacts...');

if (fs.existsSync(rootDistDir)) {
    fs.rmSync(rootDistDir, { recursive: true, force: true });
}

// 2. 编译 plugins/root/*.ts -> plugins/root/dist/*.mjs (ESM)
var entryPoints = findTsFiles(rootSrcDir);

if (entryPoints.length === 0) {
    console.log('No TypeScript plugin files found to compile.');
    process.exit(0);
}

console.log('\nFound ' + entryPoints.length + ' TypeScript plugin files to compile:');
for (var k = 0; k < entryPoints.length; k++) {
    console.log('  - ' + path.relative(rootSrcDir, entryPoints[k]));
}

console.log('\nCompiling ESM to root/dist/...');

esbuild
    .build({
        entryPoints: entryPoints,
        outdir: rootDistDir,
        outExtension: { '.js': '.mjs' },
        format: 'esm',
        platform: 'node',
        target: 'node16',
        logLevel: 'info',
        packages: 'external',
        keepNames: false
    })
    .then(function () {
        fixEsmImports(rootDistDir);

        console.log('\nCompiling CJS to root/dist/...');
        return esbuild.build({
            entryPoints: entryPoints,
            outdir: rootDistDir,
            outExtension: { '.js': '.cjs' },
            format: 'cjs',
            platform: 'node',
            target: 'node16',
            logLevel: 'info',
            packages: 'external',
            keepNames: false
        });
    })
    .then(function () {
        fixCjsRequires(rootDistDir);

        // 生成 plugins/index.mjs (ESM 入口)
        var indexMjsPath = path.join(pluginsDir, 'index.mjs');
        fs.writeFileSync(indexMjsPath, 'export * from "./root/dist/index.mjs";\n', 'utf8');
        console.log('\nGenerated: ' + path.relative(pluginsDir, indexMjsPath));

        // 生成 plugins/index.cjs (CJS 入口)
        var indexCjsPath = path.join(pluginsDir, 'index.cjs');
        fs.writeFileSync(indexCjsPath, 'module.exports = require("./root/dist/index.cjs");\n', 'utf8');
        console.log('Generated: ' + path.relative(pluginsDir, indexCjsPath));

        console.log('\nCompilation complete!');
    })
    .catch(function (err) {
        console.error('Compilation failed:', err.message);
        process.exit(1);
    });
