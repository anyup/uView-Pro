# Windows 下 Release 脚本无法运行问题解决方案

## 问题描述

在 Windows 系统下，`npm run release:patch` 等命令无法正常运行，而在 Mac/Linux 下可以正常运行。

## 问题原因

1. **脚本文件格式问题**：原始的 `release.sh` 是 bash 脚本，使用了 Unix/Linux 的换行符（LF）
2. **执行权限问题**：Windows PowerShell 无法直接执行 bash 脚本
3. **路径分隔符问题**：脚本中使用了 Unix 风格的路径分隔符

## 解决方案

### 1. 创建跨平台 Node.js 脚本

创建了 `scripts/release.js` 文件，使用 Node.js 编写，确保在所有平台上都能运行。

### 2. 创建 Windows 专用脚本

-   `scripts/release.ps1` - PowerShell 脚本
-   `scripts/release.bat` - 批处理脚本

### 3. 更新 package.json 脚本命令

```json
{
    "scripts": {
        "release:patch": "node scripts/release.js patch",
        "release:minor": "node scripts/release.js minor",
        "release:major": "node scripts/release.js major",
        "release:patch:win": "powershell -ExecutionPolicy Bypass -File scripts/release.ps1 patch",
        "release:minor:win": "powershell -ExecutionPolicy Bypass -File scripts/release.ps1 minor",
        "release:major:win": "powershell -ExecutionPolicy Bypass -File scripts/release.ps1 major",
        "release:patch:bat": "scripts\\release.bat patch",
        "release:minor:bat": "scripts\\release.bat minor",
        "release:major:bat": "scripts\\release.bat major"
    }
}
```

## 使用方法

### 推荐方式 (跨平台)

```bash
# 发布补丁版本
npm run release:patch

# 发布次要版本
npm run release:minor

# 发布主要版本
npm run release:major
```

### Windows 专用方式

```powershell
# PowerShell方式
npm run release:patch:win

# 批处理方式
npm run release:patch:bat
```

## 脚本功能

所有脚本都会执行以下操作：

1. ✅ 检查 Git 状态
2. ✅ 检查当前分支
3. ✅ 更新根目录 package.json 版本号
4. ✅ 更新 uview-pro 模块 package.json 版本号
5. ✅ 生成 CHANGELOG
6. ✅ 提交更改
7. ✅ 创建 Git 标签
8. ✅ 推送到远程仓库

## 文件结构

```
scripts/
├── release.sh          # 原始bash脚本 (Linux/macOS)
├── release.js          # Node.js脚本 (跨平台，推荐)
├── release.ps1         # PowerShell脚本 (Windows)
├── release.bat         # 批处理脚本 (Windows)
└── README.md           # 详细使用说明
```

## 测试结果

✅ Node.js 脚本在 Windows 下正常运行  
✅ npm 脚本命令在 Windows 下正常工作  
✅ 保持了与原始 bash 脚本相同的功能

## 注意事项

-   确保已安装 Node.js 和 npm
-   在 Windows 上使用 PowerShell 时，可能需要调整执行策略
-   所有脚本都会检查 Git 状态和分支，确保发布流程的安全性

## 总结

通过创建跨平台的 Node.js 脚本和 Windows 专用的 PowerShell/批处理脚本，成功解决了 Windows 下 release 脚本无法运行的问题。现在可以在所有平台上使用相同的发布流程，提高了开发效率。

## 版本号同步功能

✅ **新增功能**：发布脚本现在会自动同步两个package.json文件的版本号：
- 根目录的 `package.json`
- uview-pro模块的 `src/uni_modules/uview-pro/package.json`

这确保了项目版本号的一致性，避免了版本号不同步的问题。
