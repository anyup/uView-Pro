#!/bin/bash

# 发布脚本
# 使用方法: ./scripts/release.sh [patch|minor|major]

set -e

# 检查参数
if [ $# -eq 0 ]; then
    echo "请指定版本类型: patch, minor, 或 major"
    echo "使用方法: ./scripts/release.sh [patch|minor|major]"
    exit 1
fi

VERSION_TYPE=$1

# 验证版本类型
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo "错误: 版本类型必须是 patch, minor, 或 major"
    exit 1
fi

echo "开始发布 $VERSION_TYPE 版本..."

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "错误: 有未提交的更改，请先提交或暂存"
    git status --porcelain
    exit 1
fi

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo "警告: 当前分支是 $CURRENT_BRANCH，建议在 main 或 master 分支上发布"
    read -p "是否继续? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 更新版本号
echo "更新版本号..."
npm version $VERSION_TYPE --no-git-tag-version

# 获取新版本号
NEW_VERSION=$(node -p "require('./package.json').version")
echo "新版本: $NEW_VERSION"

# 生成 changelog
echo "生成 changelog..."
npm run changelog

# 提交更改
echo "提交更改..."
git add package.json CHANGELOG.md
git commit -m "chore(release): bump version to $NEW_VERSION

- Update package.json version
- Generate changelog for $NEW_VERSION"

# 创建标签
echo "创建标签 v$NEW_VERSION..."
git tag -a "v$NEW_VERSION" -m "Release version $NEW_VERSION"

# 推送更改和标签
echo "推送更改和标签..."
git push origin HEAD
git push origin "v$NEW_VERSION"

echo "✅ 版本 $NEW_VERSION 发布成功!"
echo "📝 Changelog 已更新"
echo "🏷️  标签 v$NEW_VERSION 已创建并推送"
echo ""
echo "下一步:"
echo "1. 在 GitHub/GitLab 上创建 Release"
echo "2. 将 CHANGELOG.md 中的内容复制到 Release 描述中"
echo "3. 上传构建产物 (如果需要)" 