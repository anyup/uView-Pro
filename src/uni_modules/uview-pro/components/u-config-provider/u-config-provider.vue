<template>
    <view :class="['u-config-provider', `u-theme-${darkMode}`, customClass]" :style="mergedThemeStyle">
        <slot />
    </view>
</template>

<script lang="ts">
/**
 * u-config-provider
 *
 * 说明（简要）：
 * - 初始化场景（推荐在应用入口执行）：使用 `useTheme().initTheme(themes)` 进行一次性初始化与全局设置（例如在 `main.ts` 或 `App.vue` 中）。
 * - 组件/页面场景（推荐）：使用 `useTheme()` 组合式函数在组件内部读取响应式 `currentTheme`、`themes`、`darkMode` 并通过 `setTheme()` 和 `setDarkMode()` 切换主题/模式。
 *
 * 该组件的行为：
 * - 如果在挂载时传入 `themes`，会调用 `configProvider.init(themes)`
 * - 如果传入 `currentTheme`，会优先设置当前主题
 * - 如果传入 `darkMode`，会设置当前的暗黑模式状态，同时在 document 上添加 `u-theme-dark` 或 `u-theme-light` 类名
 *
 * 详尽说明请参考：`docs/config-provider-usage.md`
 */
export default {
    name: 'u-config-provider',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>

<script lang="ts" setup>
import { computed, watch, onMounted } from 'vue';
import { ConfigProviderProps } from './types';
import { $u, configProvider } from '../../libs';
import { useTheme } from '../../libs/hooks/useTheme';

const props = defineProps(ConfigProviderProps);

const emit = defineEmits<{
    'theme-change': [themeName: string];
    'mode-change': [mode: 'light' | 'dark'];
}>();

// 计算当前的主题模式（亮色/暗黑）
const darkMode = computed(() => (configProvider.isInDarkMode() ? 'dark' : 'light'));

const bootstrapTheme = () => {
    // 如果已经初始化过主题，不再重复初始化，只更新 props 相关配置
    const existingThemes = configProvider.getThemes();
    if (existingThemes.length > 0) {
        // 已初始化，只更新当前主题和暗黑模式
        if (props.currentTheme) {
            configProvider.setTheme(props.currentTheme as string);
        }
        if (props.darkMode) {
            configProvider.setDarkMode(props.darkMode);
        }
        return;
    }

    // 未初始化，进行初始化
    if (props.themes && props.themes.length) {
        configProvider.init(props.themes, props.currentTheme as any);
    } else {
        // 使用 useTheme 的 initTheme，它会处理默认主题
        const { initTheme } = useTheme();
        initTheme(undefined, props.currentTheme as any);
    }

    if (props.currentTheme) {
        configProvider.setTheme(props.currentTheme as string);
    }
    if (props.darkMode) {
        configProvider.setDarkMode(props.darkMode);
    }
};

// 当传入自定义 themes 时，初始化全局 configProvider（覆盖已有）
onMounted(() => {
    bootstrapTheme();
});

// 监听外部 props 变化（如果上层修改 prop）
watch(
    () => props.themes,
    val => {
        if (val && val.length) {
            configProvider.init(val, props.currentTheme as any);
        }
    },
    { deep: true }
);

watch(
    () => props.currentTheme,
    val => {
        if (val) {
            configProvider.setTheme(val);
        }
    }
);

watch(
    () => props.darkMode,
    val => {
        if (val && val !== configProvider.getDarkMode()) {
            configProvider.setDarkMode(val);
            emit('mode-change', darkMode.value);
        }
    }
);

// 监听全局主题变更并触发事件
watch(
    () => configProvider.currentThemeRef.value,
    (val, oldVal) => {
        if (val && val.name !== (oldVal as any)?.name) {
            emit('theme-change', val.name);
        }
    },
    { immediate: true }
);

// 监听暗黑模式变更并触发事件
watch(
    () => configProvider.darkModeRef.value,
    () => {
        emit('mode-change', darkMode.value);
    }
);

// 计算合并样式（作为局部 fallback），configProvider 已经会把变量注入到 document 上
const mergedThemeStyle = computed(() => {
    return $u.toStyle(configProvider.cssVarsRef.value, props.customStyle);
});
</script>

<style lang="scss" scoped></style>
