# 发布脚本使用说明

本项目提供了多个版本的发布脚本，以确保在不同操作系统上都能正常运行。

## 脚本文件说明

- `release.sh` - Bash 脚本 (适用于 Linux/macOS)
- `release.ps1` - PowerShell 脚本 (适用于 Windows)
- `release.bat` - 批处理脚本 (适用于 Windows)
- `release.js` - Node.js 脚本 (适用于所有平台，推荐使用)

## 使用方法

### 1. 推荐方式 (跨平台)

使用 Node.js 脚本，在所有平台上都能运行：

```bash
# 发布补丁版本
npm run release:patch

# 发布次要版本
npm run release:minor

# 发布主要版本
npm run release:major
```

或者直接使用：

```bash
node scripts/release.js patch
node scripts/release.js minor
node scripts/release.js major
```

### 2. Windows PowerShell 方式

```powershell
# 发布补丁版本
npm run release:patch:win

# 发布次要版本
npm run release:minor:win

# 发布主要版本
npm run release:major:win
```

或者直接使用：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/release.ps1 patch
```

### 3. Windows 批处理方式

```cmd
# 发布补丁版本
npm run release:patch:bat

# 发布次要版本
npm run release:minor:bat

# 发布主要版本
npm run release:major:bat
```

或者直接使用：

```cmd
scripts\release.bat patch
```

### 4. Linux/macOS 方式

```bash
# 发布补丁版本
npm run release:patch

# 发布次要版本
npm run release:minor

# 发布主要版本
npm run release:major
```

或者直接使用：

```bash
./scripts/release.sh patch
```

## 版本类型说明

- `patch` - 补丁版本 (修复 bug，如 1.0.0 → 1.0.1)
- `minor` - 次要版本 (新功能，如 1.0.0 → 1.1.0)
- `major` - 主要版本 (破坏性更新，如 1.0.0 → 2.0.0)

## 脚本功能

所有脚本都会执行以下操作：

1. ✅ 检查 Git 状态 (确保没有未提交的更改)
2. ✅ 检查当前分支 (建议在 main/master 分支上发布)
3. ✅ 更新根目录 package.json 中的版本号
4. ✅ 更新 uview-pro 模块 package.json 中的版本号
5. ✅ 生成 CHANGELOG.md
6. ✅ 提交所有更改
7. ✅ 创建 Git 标签
8. ✅ 推送到远程仓库

## 注意事项

- 确保已安装 Node.js 和 npm
- 确保 Git 已配置并可以推送到远程仓库
- 确保有足够的权限执行脚本
- 在 Windows 上使用 PowerShell 时，可能需要调整执行策略

## 故障排除

### Windows PowerShell 执行策略问题

如果遇到执行策略错误，可以运行：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 权限问题

确保脚本文件有执行权限：

```bash
chmod +x scripts/release.sh
```

### Git 配置问题

确保 Git 已正确配置：

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 发布平台令牌（GitHub / Gitee）

发布脚本支持在推送标签后自动创建 Release，并将当前版本的 changelog 作为 Release 描述。需要为对应平台配置令牌（Token）：

### GitHub Token

1. 创建 Token：
    - GitHub → Settings → Developer settings → Personal access tokens
    - 任选其一：
        - classic：勾选 `repo`（至少包含 repo:status、repo_deployment、public_repo）
        - fine-grained：选择当前仓库，权限建议：`Contents: Read and write`、`Metadata: Read-only`
2. 设置环境变量（Windows PowerShell）：
    - 仅当前会话：

    ```powershell
    $env:GITHUB_TOKEN = "你的token"
    ```

    - 永久生效（新开终端生效）：

    ```powershell
    setx GITHUB_TOKEN "你的token"
    ```

    - 亦可使用 `GH_TOKEN`：

    ```powershell
    $env:GH_TOKEN = "你的token"; setx GH_TOKEN "你的token"
    ```

### Gitee Token

1. 创建 Token：
    - Gitee → 头像 → 设置 → 私人令牌（或 安全设置 → 私人令牌）
    - 新建令牌，授予仓库相关权限（至少包含发布 Release 所需权限）
2. 设置环境变量（Windows PowerShell）：
    - 仅当前会话：

    ```powershell
    $env:GITEE_TOKEN = "你的token"
    ```

    - 永久生效（新开终端生效）：

    ```powershell
    setx GITEE_TOKEN "你的token"
    ```

### 验证

重新打开 PowerShell，执行：

```powershell
echo $env:GITHUB_TOKEN
echo $env:GH_TOKEN
echo $env:GITEE_TOKEN
```

能看到值即已生效。随后正常执行：

```bash
pnpm release:patch | pnpm release:minor | pnpm release:major
```

脚本会自动识别远程仓库：

- GitHub 仓库使用 `GITHUB_TOKEN`/`GH_TOKEN` 创建 Release
- Gitee 仓库使用 `GITEE_TOKEN` 创建 Release
