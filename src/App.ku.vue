<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
    console.log('App Show');
});
</script>

<template>
    <u-config-provider>
        <KuRootView />
    </u-config-provider>
</template>

<style lang="scss"></style>
