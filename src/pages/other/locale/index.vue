<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useLocale } from 'uview-pro';
import { useI18n } from 'vue-i18n';

// ========== useLocale Hook 使用示例 ==========
const { currentLocale, locales, t: uT, initLocales, setLocale, getLocales } = useLocale();

// vue-i18n
const { t, locale } = useI18n();

// 本地状态
const showInitPanel = ref(false);

const currentLocaleName = computed(() => currentLocale.value?.name || '未初始化');
const vueLocale = computed(() => locale.value || '');

function mapVueToUView(vueLoc: string) {
    if (!vueLoc) return 'zh-CN';
    if (vueLoc.startsWith('zh')) return 'zh-CN';
    return 'en-US';
}

function switchLang(vueLoc: string) {
    // 切换 vue-i18n
    locale.value = vueLoc;
    try {
        if (typeof uni !== 'undefined' && typeof uni.setLocale === 'function') {
            uni.setLocale(vueLoc);
        }
    } catch (e) {
        // ignore
    }
    // 同步 uView-Pro
    const mapped = mapVueToUView(vueLoc);
    setLocale(mapped);
}

// 初始化示例：如果没有 locale，则注入自定义 en-US 覆盖示例
onMounted(() => {
    if (!getLocales().length) {
        initLocales(undefined, undefined);
    }
});

function demoAddFrench() {
    const fr = {
        name: 'fr-FR',
        empty: { search: 'Aucun résultat de recherche' },
        common: { intro: 'Bonjour depuis vue-i18n' }
    };
    initLocales([fr]);
    setLocale('fr-FR');
}
</script>

<template>
    <demo-page nav-title="国际化示例" hideTabs>
        <view class="locale-page">
            <view class="header">
                <text class="title">国际化（i18n）与组件库同步</text>
                <text class="subtitle">演示如何同时切换 vue-i18n 与 uView-Pro 的语言包</text>
            </view>

            <view class="info-card">
                <view class="info-row">
                    <text class="label">vue-i18n 文案：</text>
                    <text class="value">{{ t('common.intro') }}</text>
                </view>
                <view class="info-row">
                    <text class="label">uView-pro 文案(empty.search)：</text>
                    <text class="value">{{ uT('empty.search') }}</text>
                </view>
                <view class="info-row">
                    <text class="label">vue-i18n 当前 locale：</text>
                    <text class="value">{{ vueLocale }}</text>
                </view>
                <view class="info-row">
                    <text class="label">uView-pro 当前 locale：</text>
                    <text class="value">{{ currentLocaleName }}</text>
                </view>
            </view>
            <view class="panel">
                <view class="panel-header">
                    <text class="panel-title">以Empty组件为例，点击切换查看效果</text>
                </view>
                <view class="panel-content">
                    <u-empty mode="search"></u-empty>
                </view>
            </view>
            <view class="panel">
                <view class="panel-header">
                    <text class="panel-title">切换示例</text>
                </view>
                <view class="panel-content">
                    <view class="button-row">
                        <button @click="switchLang('zh-Hans')">切换到中文</button>
                        <button @click="switchLang('en')">Switch to English</button>
                        <button @click="demoAddFrench">Add French (fr-FR)</button>
                    </view>
                </view>
            </view>

            <view class="example-section">
                <text class="section-title">示例代码</text>
                <view class="code-block">
                    <text class="code-text">
                        // 在main.ts中初始化uView-Pro，添加新语言并设置为默认语言 \napp.use(uViewPro, { \n locale: { \n
                        locales: [frFR], // 添加法语语言包 \n defaultLocale: 'fr-FR' // 设置默认语言为法语 \n } \n})
                        \n\n// 在页面中切换语言 \nimport { useI18n } from 'vue-i18n'; \nimport { useLocale } from
                        'uview-pro'; \nconst { locale } = useI18n(); \nconst { setLocale } = useLocale(); \n// 切换
                        vue-i18n 并同步到 uView-Pro \nlocale.value = 'en' \nsetLocale('en-US')
                    </text>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<style lang="scss" scoped>
.locale-page {
    padding: 18px;
    background: $u-bg-white;
    color: $u-main-color;
    min-height: 100vh;
    box-sizing: border-box;
}
.header {
    margin: 8px 0 18px;
    text-align: center;
}
.title {
    font-size: 20px;
    font-weight: 700;
    color: $u-type-primary;
    display: block;
    margin-bottom: 6px;
}
.subtitle {
    font-size: 13px;
    color: $u-content-color;
}
.info-card {
    background: rgba(var(--u-border-color-rgb), 0.04);
    border: 1px solid rgba(var(--u-border-color-rgb), 0.08);
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 18px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}
.info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 6px;
    border-bottom: 1px dashed rgba(var(--u-border-color-rgb), 0.06);
}
.info-row:last-child {
    border-bottom: none;
}
.label {
    color: $u-type-primary;
    flex: 0 0 55%;
    font-weight: 600;
}
.value {
    color: $u-main-color;
    flex: 1 1 40%;
    text-align: right;
}
.panel {
    margin-bottom: 18px;
}
.button-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
.button-row button {
    min-width: 110px;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(var(--u-border-color-rgb), 0.12);
    background: white;
    color: $u-main-color;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
}
.button-row button:hover {
    opacity: 0.95;
}
.example-section {
    margin-top: 16px;
}
.code-block {
    background: rgba(var(--u-border-color-rgb), 0.12);
    border: 1px solid rgba(var(--u-border-color-rgb), 0.6);
    border-radius: 8px;
    padding: 12px;
}
.code-text {
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: $u-main-color;
    white-space: pre-wrap;
    word-break: break-word;
}
</style>
