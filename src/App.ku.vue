<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app';
import { useTheme, useLocale } from 'uview-pro';
import { computed } from 'vue';

const { darkMode, themes, currentTheme } = useTheme();
const { currentLocale, locales } = useLocale();

const currentThemeName = computed(() => currentTheme.value?.name);
const currentLocaleName = computed(() => currentLocale.value?.name);

onLoad(() => {
    console.log('darkMode->', darkMode.value);
    console.log('theme->', currentThemeName.value);
    console.log('locale->', currentLocaleName.value);
});

onShow(() => {});
</script>

<template>
    <u-config-provider
        :dark-mode="darkMode"
        :themes="themes"
        :current-theme="currentThemeName"
        :current-locale="currentLocaleName"
    >
        <KuRootView />
    </u-config-provider>
</template>

<style lang="scss"></style>
