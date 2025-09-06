# 使用 pnpm 管理依赖

本项目为 pnpm 依赖管理。

## 常用命令

- 安装依赖：
    ```bash
    pnpm install
    ```
- 启动开发：

    ```bash
    # 运行h5
    pnpm dev:h5

    # 运行微信小程序
    pnpm dev:mp-weixin

    # 运行安卓APP
    pnpm dev:app-android
    ```

- 构建生产包：

    ```bash
    # 运行h5
    pnpm build:h5

    # 运行微信小程序
    pnpm build:mp-weixin

    # 运行安卓APP
    pnpm build:app-android
    ```

- 添加依赖：
    ```bash
    pnpm add <包名>
    ```
- 删除依赖：
    ```bash
    pnpm remove <包名>
    ```

## 说明

- 已自动生成 `pnpm-lock.yaml`，请勿手动修改。
- 如遇 node_modules 兼容问题，可先删除 node_modules 和 pnpm-lock.yaml 后重新 `pnpm install`。
- 推荐全员统一使用 pnpm，避免包管理混乱。
