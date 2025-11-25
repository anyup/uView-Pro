<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { useTheme } from 'uview-pro';

const { darkMode } = useTheme();

onShow(() => {
    console.log('App Show');
});
</script>

<template>
    <u-config-provider :dark-mode="darkMode">
        <KuRootView />
    </u-config-provider>
</template>

<style lang="scss"></style>
