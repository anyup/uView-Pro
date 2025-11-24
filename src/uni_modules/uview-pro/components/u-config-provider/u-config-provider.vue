<template>
    <view :class="['u-config-provider', `u-theme-${themeMode}`, customClass]" :style="mergedThemeStyle">
        <slot />
    </view>
</template>

<script lang="ts">
/**
 * u-config-provider
 *
 * 说明（简要）：
 * - 初始化场景（推荐在应用入口执行）：使用 `configProvider` 进行一次性初始化与全局设置（例如在 `main.ts` 或插件 `install` 中）。
 * - 组件/页面场景（推荐）：使用 `useTheme()` 组合式函数在组件内部读取响应式 `currentTheme`、`themes` 并通过 `setTheme()` 切换主题。
 *
 * 该组件的行为：如果在挂载时传入 `themes`，会调用 `configProvider.init(themes)`；如果传入 `currentTheme`，会优先设置当前主题。
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
import { computed, ref, watch, onMounted } from 'vue';
import { ConfigProviderProps } from './types';
import { $u, configProvider } from '../../libs';

const props = defineProps(ConfigProviderProps);

const emit = defineEmits<{
    'theme-change': [themeName: string];
    'mode-change': [mode: 'light' | 'dark'];
}>();

// 主题模式，优先使用 props，其次由外部通过 configProvider 管理
const themeMode = ref<'light' | 'dark'>(props.themeMode || 'light');

// 当传入自定义 themes 时，初始化全局 configProvider（覆盖已有）
onMounted(() => {
    if (props.themes && props.themes.length) {
        configProvider.init(props.themes, props.currentTheme as any);
    }
    // 如果传入了 currentTheme，优先设置
    if (props.currentTheme) {
        try {
            configProvider.setTheme(props.currentTheme as string);
        } catch (e) {
            // noop
        }
    }
});

// 监听外部 props 变化（如果上层修改 prop）
watch(
    () => props.themeMode,
    val => {
        if (val) themeMode.value = val;
        emit('mode-change', themeMode.value);
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

// 计算合并样式（作为局部 fallback），configProvider 已经会把变量注入到 document 上
const mergedThemeStyle = computed(() => {
    const style: Record<string, string> = {};
    const theme = configProvider.currentThemeRef.value;
    if (!theme) return $u.toStyle(style, props.customStyle);

    const cssMap = (theme as any).css || (theme as any).color || {};
    Object.entries(cssMap).forEach(([key, value]) => {
        const cssVarName = String(key).startsWith('--') ? String(key) : `--u-type-${$u.kebabCase(String(key))}`;
        style[cssVarName] = String(value);

        // 生成 rgb 变量备用
        if (typeof value === 'string' && value.startsWith('#')) {
            const hex = value.replace('#', '');
            if (/^[0-9a-fA-F]{6}$/.test(hex)) {
                const r = parseInt(hex.slice(0, 2), 16);
                const g = parseInt(hex.slice(2, 4), 16);
                const b = parseInt(hex.slice(4, 6), 16);
                style[`${cssVarName}-rgb`] = `${r}, ${g}, ${b}`;
            }
        }
    });

    return $u.toStyle(style, props.customStyle);
});
</script>

<style lang="scss" scoped></style>
