# Contributors 配置使用说明

## 📋 配置文件

`scripts/contributors-map.json` 用于配置贡献者信息。

## 🎯 配置项说明

### 1. nameToGithub（映射配置）

将作者名映射到 GitHub 用户名。

```json
{
    "nameToGithub": {
        "前端梦工厂": "anyup",
        "John Doe": "johndoe"
    }
}
```

**使用场景**：

- 自动推断的 GitHub 用户名不正确
- 作者名与 GitHub 用户名不一致
- 需要指定特定的 GitHub 用户名

### 2. ignore（忽略配置）

忽略某些贡献者，不显示他们的头像。

```json
{
    "ignore": ["bot", "dependabot", "某些用户"]
}
```

**使用场景**：

- 机器人账号（如 dependabot）
- 头像不显示的用户
- 不想显示的贡献者

## 📝 完整配置示例

```json
{
    "nameToGithub": {
        "前端梦工厂": "anyup",
        "John Doe": "johndoe",
        "李四": "lisi"
    },
    "ignore": ["bot", "dependabot", "某些用户"],
    "note": "此文件用于将作者名映射到 GitHub 用户名。如果自动推断的用户名头像不显示，可以在此配置。ignore 数组中的作者名将不会显示头像。"
}
```

## 🔧 使用方法

### 添加映射

编辑 `scripts/contributors-map.json`，在 `nameToGithub` 中添加映射：

```json
{
    "nameToGithub": {
        "作者名": "github用户名"
    }
}
```

### 忽略贡献者

编辑 `scripts/contributors-map.json`，在 `ignore` 数组中添加要忽略的作者名：

```json
{
    "ignore": ["要忽略的作者名"]
}
```

## 🚀 重新生成 Changelog

修改配置后，需要重新生成 changelog：

```bash
# 生成所有版本
pnpm changelog:all

# 生成当前版本
pnpm changelog:current:no-unreleased
```

## 📊 优先级说明

1. **ignore 配置**：最高优先级，如果在 ignore 列表中，直接跳过
2. **nameToGithub 映射**：如果配置了映射，使用映射的 GitHub 用户名
3. **自动推断**：将作者名转换为小写并移除空格作为 GitHub 用户名

## ❓ 常见问题

### Q: 如何查看贡献者列表？

A: 运行以下命令查看所有贡献者：

```bash
git log --format="%an" | sort -u
```

### Q: 如何忽略机器人账号？

A: 在 `ignore` 数组中添加机器人名称：

```json
{
    "ignore": ["dependabot[bot]", "renovate[bot]"]
}
```

### Q: 如何为中文作者名配置映射？

A: 直接在 `nameToGithub` 中配置：

```json
{
    "nameToGithub": {
        "前端梦工厂": "anyup",
        "张三": "zhangsan"
    }
}
```

## 📚 相关文件

- `scripts/contributors-map.json` - 配置文件
- `scripts/generate-changelog.js` - 生成脚本
- `CHANGELOG.md` - 生成的变更日志
