#!/usr/bin/env node

/**
 * 将 uView-Pro 源码同步到 uView-Pro-Starter 的 node_modules/uview-pro
 * 用于本地开发测试，无需 npm publish
 *
 * 特性:
 *   - 自动解析 pnpm junction/symlink，同步到真实目录
 *   - 镜像同步：先清空目标再复制，确保与源码完全一致
 *   - 支持 --watch 监听文件变化自动同步
 *   - 支持 --build 同步前先编译 Vite 插件
 *   - 支持 --target 指定自定义目标路径
 *   - 纯 Node.js 实现，无第三方依赖
 *
 * 使用方法:
 *   node scripts/sync-to-node.js            # 单次同步
 *   node scripts/sync-to-node.js --watch    # 监听变化自动同步
 *   node scripts/sync-to-node.js --build    # 先编译插件再同步
 *   node scripts/sync-to-node.js --build --watch
 *   node scripts/sync-to-node.js --target /path/to/other-project/node_modules/uview-pro
 *
 * 在 package.json 中添加:
 *   "sync": "node scripts/sync-to-node.js",
 *   "sync:watch": "node scripts/sync-to-node.js --watch"
 */

'use strict';

var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');

// ============================================================
// 配置
// ============================================================

var projectRoot = path.resolve(__dirname, '..');
var sourceDir = path.resolve(projectRoot, 'src', 'uni_modules', 'uview-pro');
var starterRoot = path.resolve(projectRoot, '..', 'uView-Pro-Starter');
var defaultDestDir = path.resolve(starterRoot, 'node_modules', 'uview-pro');

// 同步时排除的文件（npm 配置文件，不需要进入 node_modules）
var excludeNames = ['.npmignore', '.npmrc'];

// ============================================================
// 参数解析
// ============================================================

var args = process.argv.slice(2);
var watchMode = args.indexOf('--watch') !== -1 || args.indexOf('-w') !== -1;
var buildMode = args.indexOf('--build') !== -1 || args.indexOf('-b') !== -1;
var quietMode = args.indexOf('--quiet') !== -1 || args.indexOf('-q') !== -1;

var destDir = defaultDestDir;
var targetIdx = args.indexOf('--target');
if (targetIdx !== -1 && args[targetIdx + 1]) {
    destDir = path.resolve(args[targetIdx + 1]);
}

// ============================================================
// 工具函数
// ============================================================

/**
 * 解析 junction/symlink，返回真实路径
 */
function resolveRealPath(dir) {
    try {
        return fs.realpathSync(dir);
    } catch (e) {
        return dir;
    }
}

/**
 * 清空目录内容（保留目录本身）
 */
function cleanDirContents(dir) {
    var entries = fs.readdirSync(dir, { withFileTypes: true });
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var fullPath = path.join(dir, entry.name);
        fs.rmSync(fullPath, { recursive: true, force: true });
    }
}

/**
 * 递归复制目录，返回复制的文件数
 */
function copyDirRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    var entries = fs.readdirSync(src, { withFileTypes: true });
    var fileCount = 0;

    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var name = entry.name;

        // 跳过排除文件
        if (excludeNames.indexOf(name) !== -1) continue;

        var srcPath = path.join(src, name);
        var destPath = path.join(dest, name);

        if (entry.isDirectory()) {
            fileCount += copyDirRecursive(srcPath, destPath);
        } else if (entry.isFile()) {
            fs.copyFileSync(srcPath, destPath);
            fileCount++;
        }
    }

    return fileCount;
}

/**
 * 统计源码文件数（用于对比）
 */
function countSourceFiles(dir) {
    var count = 0;
    var entries = fs.readdirSync(dir, { withFileTypes: true });
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (excludeNames.indexOf(entry.name) !== -1) continue;
        var fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            count += countSourceFiles(fullPath);
        } else if (entry.isFile()) {
            count++;
        }
    }
    return count;
}

/**
 * 格式化时间戳
 */
function timestamp() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    return h + ':' + m + ':' + s;
}

// ============================================================
// 核心同步逻辑
// ============================================================

function sync() {
    var startTime = Date.now();

    // 1. 检查源码目录
    if (!fs.existsSync(sourceDir)) {
        console.error('[error] Source directory not found: ' + sourceDir);
        process.exit(1);
    }

    // 2. 检查目标目录
    if (!fs.existsSync(destDir)) {
        console.error('[error] Destination not found: ' + destDir);
        console.error('');
        console.error('Please install uview-pro in the target project first:');
        console.error('  cd ' + path.dirname(path.dirname(destDir)) + ' && pnpm install');
        process.exit(1);
    }

    // 3. 解析 pnpm junction 到真实路径
    var realDest = resolveRealPath(destDir);
    var isSymlink = realDest !== destDir;

    // 4. 编译插件（可选）
    if (buildMode) {
        if (!quietMode) console.log('[build] Compiling Vite plugins...');
        try {
            childProcess.execSync('node scripts/build-plugins.js', {
                cwd: projectRoot,
                stdio: quietMode ? 'ignore' : 'inherit'
            });
        } catch (e) {
            console.error('[error] Plugin build failed: ' + e.message);
            process.exit(1);
        }
    }

    // 5. 统计源码文件数
    var sourceFileCount = countSourceFiles(sourceDir);

    // 6. 清空目标目录
    if (!quietMode) {
        console.log('[clean] Clearing destination...');
    }
    cleanDirContents(realDest);

    // 7. 复制源码到目标
    if (!quietMode) {
        console.log('[sync] Copying files...');
    }
    var copiedCount = copyDirRecursive(sourceDir, realDest);

    // 8. 输出结果
    var elapsed = Date.now() - startTime;
    var prefix = quietMode ? '[' + timestamp() + '] ' : '';

    console.log('');
    console.log(prefix + '========================================');
    console.log(prefix + '  Sync complete');
    console.log(prefix + '========================================');
    console.log(prefix + '  Files:   ' + copiedCount + ' / ' + sourceFileCount + ' copied');
    console.log(prefix + '  Time:    ' + elapsed + 'ms');
    console.log(prefix + '  Source:  ' + path.relative(projectRoot, sourceDir));
    if (isSymlink) {
        console.log(prefix + '  Target:  ' + path.relative(projectRoot, realDest));
        console.log(prefix + '           (resolved from pnpm junction)');
    } else {
        console.log(prefix + '  Target:  ' + path.relative(projectRoot, realDest));
    }
    console.log(prefix + '  Mode:    ' + (watchMode ? 'watch' : 'once'));
    console.log('');

    if (copiedCount !== sourceFileCount) {
        console.warn('[warn] File count mismatch! Expected ' + sourceFileCount + ', got ' + copiedCount);
    }
}

// ============================================================
// 监听模式
// ============================================================

function startWatch() {
    console.log('[watch] Watching for changes in:');
    console.log('        ' + path.relative(projectRoot, sourceDir));
    console.log('        (Ctrl+C to stop)');
    console.log('');

    var debounceTimer = null;
    var DEBOUNCE_MS = 300;

    // Windows/macOS 支持 recursive，Linux 不支持
    try {
        fs.watch(sourceDir, { recursive: true }, function (event, filename) {
            if (!filename) return;

            // 跳过排除文件
            var basename = path.basename(filename);
            if (excludeNames.indexOf(basename) !== -1) return;

            // 跳过 plugins/root/dist/ 目录的变更（编译产物）
            if (filename.indexOf('plugins' + path.sep + 'root' + path.sep + 'dist') !== -1) return;

            // 防抖
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function () {
                console.log('[watch] Change detected: ' + filename);
                try {
                    sync();
                } catch (e) {
                    console.error('[error] Sync failed: ' + e.message);
                }
                debounceTimer = null;
            }, DEBOUNCE_MS);
        });
    } catch (e) {
        console.error('[error] Watch mode not supported on this platform: ' + e.message);
        console.error('        Please run the script without --watch flag.');
        process.exit(1);
    }
}

// ============================================================
// 主入口
// ============================================================

sync();

if (watchMode) {
    startWatch();
}
