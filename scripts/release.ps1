# 发布脚本 (PowerShell版本)
# 使用方法: .\scripts\release.ps1 [patch|minor|major]

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("patch", "minor", "major")]
    [string]$VersionType
)

# 设置错误处理
$ErrorActionPreference = "Stop"

Write-Host "开始发布 $VersionType 版本..." -ForegroundColor Green

# 检查是否有未提交的更改
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "错误: 有未提交的更改，请先提交或暂存" -ForegroundColor Red
    Write-Host $gitStatus
    exit 1
}

# 检查当前分支
$currentBranch = git branch --show-current
if ($currentBranch -ne "main" -and $currentBranch -ne "master") {
    Write-Host "警告: 当前分支是 $currentBranch，建议在 main 或 master 分支上发布" -ForegroundColor Yellow
    $continue = Read-Host "是否继续? (y/N)"
    if ($continue -notmatch "^[Yy]$") {
        exit 1
    }
}

# 更新版本号
Write-Host "更新版本号..." -ForegroundColor Cyan
npm version $VersionType --no-git-tag-version

# 获取新版本号
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$newVersion = $packageJson.version
Write-Host "新版本: $newVersion" -ForegroundColor Green

# 同时更新uview-pro模块的版本号
Write-Host "更新uview-pro模块版本号..." -ForegroundColor Cyan
$uviewProPackagePath = "src\uni_modules\uview-pro\package.json"
if (Test-Path $uviewProPackagePath) {
    $uviewProPackage = Get-Content $uviewProPackagePath | ConvertFrom-Json
    $uviewProPackage.version = $newVersion
    $uviewProPackage | ConvertTo-Json -Depth 10 | Set-Content $uviewProPackagePath
    Write-Host "✅ uview-pro模块版本已更新为: $newVersion" -ForegroundColor Green
} else {
    Write-Host "⚠️  未找到uview-pro模块的package.json文件" -ForegroundColor Yellow
}

# 生成 changelog
Write-Host "生成 changelog..." -ForegroundColor Cyan
npm run changelog

# 提交更改
Write-Host "提交更改..." -ForegroundColor Cyan
git add package.json src/uni_modules/uview-pro/package.json CHANGELOG.md
git commit -m "chore(release): bump version to $newVersion

- Update package.json version
- Update uview-pro module version
- Generate changelog for $newVersion"

# 创建标签
Write-Host "创建标签 v$newVersion..." -ForegroundColor Cyan
git tag -a "v$newVersion" -m "Release version $newVersion"

# 推送更改和标签
Write-Host "推送更改和标签..." -ForegroundColor Cyan
git push origin HEAD
git push origin "v$newVersion"

Write-Host "✅ 版本 $newVersion 发布成功!" -ForegroundColor Green
Write-Host "📝 Changelog 已更新" -ForegroundColor Green
Write-Host "🏷️  标签 v$newVersion 已创建并推送" -ForegroundColor Green
Write-Host ""
Write-Host "下一步:" -ForegroundColor Yellow
Write-Host "1. 在 GitHub/GitLab 上创建 Release" -ForegroundColor White
Write-Host "2. 将 CHANGELOG.md 中的内容复制到 Release 描述中" -ForegroundColor White
Write-Host "3. 上传构建产物 (如果需要)" -ForegroundColor White
