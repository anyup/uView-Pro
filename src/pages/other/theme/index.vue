<script setup lang="ts">
import type { DarkMode } from 'uview-pro/types/global';
import { useTheme, $u } from 'uview-pro';
import { ref, computed, onMounted } from 'vue';

// ========== useTheme Hook 使用示例 ==========
const {
    currentTheme, // 当前主题（响应式）
    themes, // 所有主题列表（响应式）
    darkMode, // 当前暗黑模式设置（响应式）
    cssVars, // CSS 变量映射（含主题里 css / darkCss 声明的自定义变量）
    setTheme, // 切换主题
    getDarkMode, // 获取暗黑模式设置
    setDarkMode, // 设置暗黑模式
    isInDarkMode, // 检查是否处于暗黑模式
    toggleDarkMode, // 切换暗黑模式
    getAvailableThemes, // 获取所有主题
    initTheme // 初始化主题系统
} = useTheme();

// 本地状态
const showThemePanel = ref(false);
const showDarkModePanel = ref(false);

// uview-pro.theme.ts 的 css / darkCss 中声明的自定义变量（JS 侧读取 + 可视化预览）
const customVarItems = [
    { key: '--u-brand-accent', label: '品牌强调色', type: 'color' },
    { key: '--u-brand-accent-rgb', label: '强调色 RGB 通道', type: 'rgb' },
    { key: '--u-brand-gradient', label: '品牌渐变', type: 'gradient' },
    { key: '--u-app-card-radius', label: '卡片圆角', type: 'radius' },
    { key: '--app-banner-height', label: 'Banner 高度', type: 'height' }
];

// 演示同一组 rgb 变量在不同透明度下的效果
const alphaSteps = [0.15, 0.35, 0.6, 1];

// 使用示例代码（逐行渲染，避免长文本被随意折行）
const sampleCodeLines = [
    '// 初始化主题',
    'const { initTheme, setTheme, setDarkMode, isInDarkMode } = useTheme()',
    "initTheme(themes, 'green')",
    '',
    '// 切换主题',
    "setTheme('green')",
    '',
    '// 管理暗黑模式',
    "setDarkMode('dark') // 强制暗黑",
    "setDarkMode('light') // 强制亮色",
    "setDarkMode('auto') // 跟随系统",
    '',
    '// 检查状态',
    'if (isInDarkMode()) {',
    "    console.log('当前处于暗黑模式')",
    '}'
];

// 计算属性
const darkModeLabel = computed(() => {
    const mode = darkMode.value;
    if (mode === 'auto') return '自动（跟随系统）';
    if (mode === 'dark') return '暗黑模式';
    return '亮色模式';
});

const isDarkModeActive = computed(() => isInDarkMode());

// 初始化示例主题（如果还未初始化）
onMounted(() => {
    if (!getAvailableThemes().length) {
        initTheme(
            [
                {
                    name: 'green',
                    label: '绿色',
                    description: '自然绿色主题',
                    color: {
                        primary: '#19be6b'
                    }
                },
                {
                    name: 'purple',
                    label: '紫色',
                    description: '优雅紫色主题',
                    color: {
                        primary: '#9c27b0'
                    }
                }
            ],
            'blue'
        );
    }
});

// 事件处理
const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
    // showThemePanel.value = false;
};

const handleDarkModeChange = (mode: DarkMode) => {
    setDarkMode(mode);
    // showDarkModePanel.value = false;
};
</script>

<template>
    <demo-page nav-title="主题管理" hideTabs>
        <view class="theme-selector-example">
            <!-- 标题 -->
            <view class="header">
                <text class="title">主题管理</text>
                <text class="subtitle">useTheme() Hook 完整演示</text>
            </view>

            <!-- 当前主题信息展示 -->
            <view class="info-card">
                <view class="info-row">
                    <text class="label">当前主题：</text>
                    <text class="value">{{ currentTheme?.label || currentTheme?.name || '未初始化' }}</text>
                </view>
                <view class="info-row">
                    <text class="label">暗黑模式：</text>
                    <text class="value">{{ darkModeLabel }}</text>
                </view>
                <view class="info-row">
                    <text class="label">实际模式：</text>
                    <text class="value" :style="{ color: isDarkModeActive ? '#666' : '#333' }">
                        {{ isDarkModeActive ? '暗黑模式' : '亮色模式' }}
                    </text>
                </view>
                <view class="info-row">
                    <text class="label">可用主题数：</text>
                    <text class="value">{{ themes.length }}</text>
                </view>
            </view>

            <!-- 主题切换面板 -->
            <view class="panel">
                <view class="panel-header" @click="showThemePanel = !showThemePanel">
                    <text class="panel-title">主题选择</text>
                    <text class="toggle-icon">{{ showThemePanel ? '▼' : '▶' }}</text>
                </view>
                <view v-if="showThemePanel" class="panel-content">
                    <view class="theme-grid">
                        <view
                            v-for="theme in themes"
                            :key="theme.name"
                            class="theme-item"
                            :class="{ active: currentTheme?.name === theme.name }"
                            @click="handleThemeChange(theme.name)"
                        >
                            <view
                                class="theme-color"
                                :style="{
                                    backgroundColor: theme.color.primary
                                }"
                            ></view>
                            <text class="theme-name">{{ theme.label || theme.name }}</text>
                            <text class="theme-desc">{{ theme.description || theme.name }}</text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 暗黑模式面板 -->
            <view class="panel">
                <view class="panel-header" @click="showDarkModePanel = !showDarkModePanel">
                    <text class="panel-title">暗黑模式</text>
                    <text class="toggle-icon">{{ showDarkModePanel ? '▼' : '▶' }}</text>
                </view>
                <view v-if="showDarkModePanel" class="panel-content">
                    <view class="dark-mode-grid">
                        <view
                            class="mode-item"
                            :class="{ active: darkMode === 'auto' }"
                            @click="handleDarkModeChange('auto')"
                        >
                            <text class="mode-icon">🔄</text>
                            <text class="mode-name">自动</text>
                            <text class="mode-desc">跟随系统设置</text>
                        </view>
                        <view
                            class="mode-item"
                            :class="{ active: darkMode === 'light' }"
                            @click="handleDarkModeChange('light')"
                        >
                            <text class="mode-icon">☀️</text>
                            <text class="mode-name">亮色</text>
                            <text class="mode-desc">强制亮色模式</text>
                        </view>
                        <view
                            class="mode-item"
                            :class="{ active: darkMode === 'dark' }"
                            @click="handleDarkModeChange('dark')"
                        >
                            <text class="mode-icon">🌙</text>
                            <text class="mode-name">暗黑</text>
                            <text class="mode-desc">强制暗黑模式</text>
                        </view>
                    </view>
                    <view class="action-buttons">
                        <button class="quick-toggle" @click="toggleDarkMode">快速切换暗黑模式</button>
                    </view>
                </view>
            </view>

            <!-- 使用示例 -->
            <view class="example-section">
                <text class="section-title">使用示例代码</text>
                <view class="code-block">
                    <view class="code-text">
                        <text v-for="(line, index) in sampleCodeLines" :key="index" class="code-line">{{
                            line || ' '
                        }}</text>
                    </view>
                </view>
            </view>

            <!-- 颜色演示 -->
            <view class="color-demo">
                <text class="section-title">主题颜色演示</text>
                <view class="color-grid">
                    <view class="color-item">
                        <view class="color-box" :style="{ backgroundColor: $u.getColor('primary') }">
                            {{ $u.getColor('primary') }}
                        </view>
                        <text>primary</text>
                    </view>
                    <view class="color-item">
                        <view class="color-box" :style="{ backgroundColor: $u.getColor('success') }">
                            {{ $u.getColor('success') }}
                        </view>
                        <text>success</text>
                    </view>
                    <view class="color-item">
                        <view class="color-box" :style="{ backgroundColor: $u.getColor('error') }">
                            {{ $u.getColor('error') }}
                        </view>
                        <text>error</text>
                    </view>
                    <view class="color-item">
                        <view class="color-box" :style="{ backgroundColor: $u.getColor('warning') }">
                            {{ $u.getColor('warning') }}
                        </view>
                        <text>warning</text>
                    </view>
                </view>
            </view>

            <!-- 自定义全局变量演示（css / darkCss） -->
            <view class="css-var-demo">
                <text class="section-title">自定义全局变量</text>
                <text class="section-desc">
                    在 uview-pro.theme.ts 的 css / darkCss 中声明，切换主题或暗黑模式时自动更新； 暗黑下未在 darkCss
                    声明的变量会沿用 css 的值（此例只覆盖了圆角与高度）。官方蓝默认项的 color 留空， 色板与
                    --u-background 等基线变量自动继承
                </text>

                <!-- 把 cssVars 绑定到子树，小程序 / App 端也能取到自定义变量 -->
                <view class="css-var-scope" :style="cssVars">
                    <!-- 渐变 + 圆角 -->
                    <view class="css-var-card">
                        <text class="css-var-card__title">品牌渐变</text>
                        <text class="css-var-card__desc">
                            background: var(--u-brand-gradient) · border-radius: var(--u-app-card-radius)
                        </text>
                    </view>

                    <!-- 同一个 hex 变量 + -rgb 变量拼透明度 -->
                    <view class="css-var-alpha">
                        <view
                            v-for="alpha in alphaSteps"
                            :key="alpha"
                            class="css-var-alpha__item"
                            :style="{
                                backgroundColor: `rgba(${cssVars['--u-brand-accent-rgb']}, ${alpha})`
                            }"
                        ></view>
                    </view>
                    <text class="css-var-alpha__hint"> rgba(var(--u-brand-accent-rgb), 0.15 / 0.35 / 0.6 / 1) </text>

                    <!-- 高度 -->
                    <view class="css-var-banner">height: var(--app-banner-height)</view>
                </view>

                <!-- JS 读取：useTheme().cssVars，每一行都带可视化预览 -->
                <view class="css-var-list">
                    <view class="css-var-row" v-for="item in customVarItems" :key="item.key">
                        <view class="css-var-preview">
                            <view
                                v-if="item.type === 'color'"
                                class="css-var-preview__fill"
                                :style="{ backgroundColor: cssVars[item.key] }"
                            ></view>
                            <view v-else-if="item.type === 'rgb'" class="css-var-preview__alpha">
                                <view
                                    v-for="alpha in alphaSteps"
                                    :key="alpha"
                                    class="css-var-preview__alpha-item"
                                    :style="{
                                        backgroundColor: `rgba(${cssVars[item.key]}, ${alpha})`
                                    }"
                                ></view>
                            </view>
                            <view
                                v-else-if="item.type === 'gradient'"
                                class="css-var-preview__fill"
                                :style="{ background: cssVars[item.key] }"
                            ></view>
                            <view
                                v-else-if="item.type === 'radius'"
                                class="css-var-preview__radius"
                                :style="{
                                    borderRadius: cssVars[item.key],
                                    backgroundColor: cssVars['--u-brand-accent']
                                }"
                            ></view>
                            <view
                                v-else
                                class="css-var-preview__height"
                                :style="{ height: `calc(${cssVars[item.key]} / 4)` }"
                            ></view>
                        </view>
                        <view class="css-var-meta">
                            <view class="css-var-key-row">
                                <text class="css-var-key">{{ item.key }}</text>
                                <text class="css-var-label">{{ item.label }}</text>
                            </view>
                            <text class="css-var-value">{{ cssVars[item.key] || '未定义' }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<style lang="scss" scoped>
.theme-selector-example {
    padding: 20px;
    background: $u-bg-color;
    color: $u-main-color;
    min-height: 100vh;
}

.header {
    margin-bottom: 30px;
    text-align: center;
}

.title {
    font-size: 28px;
    font-weight: bold;
    color: $u-type-primary;
    display: block;
    margin-bottom: 8px;
}

.subtitle {
    font-size: 14px;
    color: $u-content-color;
}

.info-card {
    background: rgba(var(--u-type-primary-rgb), 0.05);
    border: 1px solid rgba(var(--u-type-primary-rgb), 0.2);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    &:last-child {
        margin-bottom: 0;
    }
}

.label {
    font-weight: 600;
    color: $u-type-primary;
}

.value {
    color: $u-main-color;
    font-weight: 500;
}

.panel {
    background: $u-bg-color;
    border: 1px solid rgba(var(--u-border-color-rgb), 0.6);
    border-radius: 8px;
    margin-bottom: 16px;
    overflow: hidden;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: rgba(var(--u-border-color-rgb), 0.2);
    cursor: pointer;
    user-select: none;

    &:active {
        background: rgba(var(--u-border-color-rgb), 0.35);
    }
}

.panel-title {
    font-weight: 600;
    font-size: 16px;
    color: $u-main-color;
}

.toggle-icon {
    color: $u-tips-color;
    font-size: 12px;
}

.panel-content {
    padding: 16px;
    border-top: 1px solid $u-border-color;
}

.theme-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.theme-item {
    text-align: center;
    padding: 12px;
    border: 2px solid rgba(var(--u-border-color-rgb), 0.8);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.95);
    }

    &.active {
        border-color: $u-type-primary;
        background: rgba(var(--u-type-primary-rgb), 0.08);
    }
}

.theme-color {
    width: 40px;
    height: 40px;
    margin: 0 auto 8px;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.theme-name {
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
    color: $u-main-color;
}

.theme-desc {
    display: block;
    font-size: 12px;
    color: $u-tips-color;
}

.dark-mode-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
}

.mode-item {
    text-align: center;
    padding: 16px 12px;
    border: 2px solid rgba(var(--u-border-color-rgb), 0.8);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.95);
    }

    &.active {
        border-color: $u-type-primary;
        background: rgba(var(--u-type-primary-rgb), 0.08);
    }
}

.mode-icon {
    display: block;
    font-size: 32px;
    margin-bottom: 8px;
}

.mode-name {
    display: block;
    font-weight: 600;
    color: $u-main-color;
    margin-bottom: 4px;
}

.mode-desc {
    display: block;
    font-size: 12px;
    color: $u-tips-color;
}

.action-buttons {
    display: flex;
    gap: 12px;
}

.quick-toggle {
    flex: 1;
    padding: 12px;
    background: $u-type-primary;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
        opacity: 0.8;
    }
}

.example-section {
    margin: 24px 0;
}

.section-title {
    font-size: 16px;
    font-weight: 600;
    color: $u-type-primary;
    margin-bottom: 12px;
    display: block;
}

.code-block {
    background: rgba(var(--u-border-color-rgb), 0.2);
    border: 1px solid rgba(var(--u-border-color-rgb), 0.6);
    border-radius: 6px;
    padding: 12px;
    overflow-x: auto;
}

.code-text {
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: $u-main-color;
    line-height: 1.6;
}

.code-line {
    display: block;
    white-space: pre-wrap;
    word-break: break-word;
}

.color-demo {
    margin-bottom: 30px;
}

.color-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 12px;
}

.color-item {
    text-align: center;
}

.color-box {
    width: 100%;
    height: 60px;
    border-radius: 6px;
    margin-bottom: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #ffffff;
}

.color-item text {
    font-size: 12px;
    color: $u-tips-color;
}

.css-var-demo {
    margin-bottom: 30px;
}

.section-desc {
    display: block;
    font-size: 12px;
    color: $u-tips-color;
    margin-bottom: 12px;
}

.css-var-scope {
    padding: 12px;
    border-radius: 8px;
    background: rgba(var(--u-border-color-rgb), 0.15);
}

.css-var-card {
    padding: 16px;
    border-radius: var(--u-app-card-radius, 8px);
    background: var(--u-brand-gradient);
    color: #ffffff;
}

.css-var-card__title {
    display: block;
    font-size: 16px;
    font-weight: 600;
}

.css-var-card__desc {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    opacity: 0.85;
}

.css-var-alpha {
    display: flex;
    gap: 6px;
    margin-top: 12px;
}

.css-var-alpha__item {
    flex: 1;
    height: 34px;
    border-radius: 6px;
    border: 1px solid rgba(var(--u-border-color-rgb), 0.4);
}

.css-var-alpha__hint {
    display: block;
    margin-top: 6px;
    font-size: 11px;
    color: $u-tips-color;
}

.css-var-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--app-banner-height, 60px);
    margin-top: 12px;
    border: 1px dashed rgba(var(--u-brand-accent-rgb), 0.5);
    border-radius: 6px;
    font-size: 12px;
    color: $u-content-color;
}

.css-var-list {
    margin-top: 12px;
    border: 1px solid rgba(var(--u-border-color-rgb), 0.6);
    border-radius: 8px;
    overflow: hidden;
}

.css-var-row {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    font-size: 12px;
    border-bottom: 1px solid rgba(var(--u-border-color-rgb), 0.4);

    &:last-child {
        border-bottom: none;
    }
}

.css-var-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 56px;
    height: 34px;
    margin-right: 12px;
}

.css-var-preview__fill {
    width: 44px;
    height: 26px;
    border-radius: 6px;
    border: 1px solid rgba(var(--u-border-color-rgb), 0.5);
}

.css-var-preview__alpha {
    display: flex;
    gap: 2px;
}

.css-var-preview__alpha-item {
    box-sizing: border-box;
    width: 10px;
    height: 26px;
    border-radius: 3px;
    border: 1px solid rgba(var(--u-border-color-rgb), 0.35);
}

.css-var-preview__radius {
    width: 44px;
    height: 26px;
}

.css-var-preview__height {
    width: 14px;
    background: var(--u-brand-accent);
    border-radius: 3px;
}

.css-var-meta {
    flex: 1;
    min-width: 0;
}

.css-var-key-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.css-var-key {
    font-family: 'Courier New', monospace;
    color: $u-main-color;
}

.css-var-label {
    margin-left: 8px;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 11px;
    color: $u-tips-color;
    background: rgba(var(--u-border-color-rgb), 0.25);
}

.css-var-value {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    color: $u-tips-color;
    word-break: break-all;
}
</style>
