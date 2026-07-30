<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app';
import { useTheme, useLocale } from 'uview-pro';
import { onMounted } from 'vue';

const { darkMode, currentTheme } = useTheme();
const { currentLocale, locales } = useLocale();

onLoad(() => {
    console.log('App.root.vue onLoad');
    console.log('darkMode->', darkMode.value);
    console.log('theme->', currentTheme.value?.name);
    console.log('locale->', currentLocale.value?.name);
    console.log('locales->', locales.value);
});

onShow(() => {
    console.log('App.root.vue onShow');
});

onMounted(() => {
    console.log('App.root.vue onMounted');
});
</script>

<template>
    <u-config-provider>
        <slot />
        <u-toast global></u-toast>
        <u-modal global></u-modal>
    </u-config-provider>
</template>

<style lang="scss"></style>
