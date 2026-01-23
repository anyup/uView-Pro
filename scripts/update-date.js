#!/usr/bin/env node

/**
 * 更新发布日期脚本
 * 用于在package.json中添加或更新发布日期字段
 * 使用方法:
 *   node scripts/update-date.js [package.json路径]
 * 如果不指定路径，默认更新当前目录的package.json
 */

const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
const packageJsonPath = args[0] || path.join(process.cwd(), 'package.json');

// 获取当前日期 (YYYY-MM-DD格式)
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 检查文件是否存在
if (!fs.existsSync(packageJsonPath)) {
    console.error(`❌ 文件不存在: ${packageJsonPath}`);
    process.exit(1);
}

try {
    // 读取package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // 获取当前日期
    const currentDate = getCurrentDate();

    // 添加或更新编译日期
    packageJson.buildDate = currentDate;

    // 写回文件，保持格式化
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

    console.log(`✅ 编译日期已更新: ${currentDate}`);
    console.log(`📄 文件: ${packageJsonPath}`);
} catch (error) {
    console.error('❌ 更新发布日期失败:', error.message);
    process.exit(1);
}
