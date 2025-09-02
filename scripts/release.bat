@echo off
setlocal enabledelayedexpansion

REM 发布脚本 (批处理版本)
REM 使用方法: scripts\release.bat [patch|minor|major]

if "%~1"=="" (
    echo 请指定版本类型: patch, minor, 或 major
    echo 使用方法: scripts\release.bat [patch^|minor^|major]
    exit /b 1
)

set VERSION_TYPE=%~1

REM 验证版本类型
if not "%VERSION_TYPE%"=="patch" if not "%VERSION_TYPE%"=="minor" if not "%VERSION_TYPE%"=="major" (
    echo 错误: 版本类型必须是 patch, minor, 或 major
    exit /b 1
)

echo 开始发布 %VERSION_TYPE% 版本...

REM 检查是否有未提交的更改
git status --porcelain >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 有未提交的更改，请先提交或暂存
    git status --porcelain
    exit /b 1
)

REM 检查当前分支
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="main" if not "%CURRENT_BRANCH%"=="master" (
    echo 警告: 当前分支是 %CURRENT_BRANCH%，建议在 main 或 master 分支上发布
    set /p CONTINUE="是否继续? (y/N): "
    if /i not "!CONTINUE!"=="y" exit /b 1
)

REM 更新版本号
echo 更新版本号...
call npm version %VERSION_TYPE% --no-git-tag-version

REM 获取新版本号
for /f "tokens=*" %%i in ('node -p "require('./package.json').version"') do set NEW_VERSION=%%i
echo 新版本: %NEW_VERSION%

REM 同时更新uview-pro模块的版本号
echo 更新uview-pro模块版本号...
set UVEW_PRO_PACKAGE_PATH=src\uni_modules\uview-pro\package.json
if exist "%UVEW_PRO_PACKAGE_PATH%" (
    node -e "const pkg = require('./%UVEW_PRO_PACKAGE_PATH%'); pkg.version = '%NEW_VERSION%'; require('fs').writeFileSync('./%UVEW_PRO_PACKAGE_PATH%', JSON.stringify(pkg, null, 4) + '\n');"
    echo ✅ uview-pro模块版本已更新为: %NEW_VERSION%
) else (
    echo ⚠️  未找到uview-pro模块的package.json文件
)

REM 生成 changelog
echo 生成 changelog...
call npm run changelog

REM 提交更改
echo 提交更改...
git add package.json src/uni_modules/uview-pro/package.json CHANGELOG.md
git commit -m "chore(release): bump version to %NEW_VERSION%

- Update package.json version
- Update uview-pro module version
- Generate changelog for %NEW_VERSION%"

REM 创建标签
echo 创建标签 v%NEW_VERSION%...
git tag -a "v%NEW_VERSION%" -m "Release version %NEW_VERSION%"

REM 推送更改和标签
echo 推送更改和标签...
git push origin HEAD
git push origin "v%NEW_VERSION%"

echo ✅ 版本 %NEW_VERSION% 发布成功!
echo 📝 Changelog 已更新
echo 🏷️  标签 v%NEW_VERSION% 已创建并推送
echo.
echo 下一步:
echo 1. 在 GitHub/GitLab 上创建 Release
echo 2. 将 CHANGELOG.md 中的内容复制到 Release 描述中
echo 3. 上传构建产物 (如果需要)
