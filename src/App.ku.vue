<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { useTheme } from 'uview-pro';
import { computed } from 'vue';

const { darkMode, themes, currentTheme } = useTheme();

const themeName = computed(() => currentTheme.value?.name);

onShow(() => {
    console.log('App Show');
});
</script>

<template>
    <u-config-provider :dark-mode="darkMode" :current-theme="themeName" :themes="themes">
        <KuRootView />
    </u-config-provider>
</template>

<style lang="scss"></style>
