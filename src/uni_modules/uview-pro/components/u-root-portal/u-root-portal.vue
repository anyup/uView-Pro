<template>
    <!-- #ifdef H5 -->
    <teleport to="body">
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
        <!-- #ifndef MP-DINGTALK -->
        <root-portal>
            <!-- #endif -->
            <!-- #endif -->
            <slot />
            <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
            <!-- #ifndef MP-DINGTALK -->
        </root-portal>
        <!-- #endif -->
        <!-- #endif -->
        <!-- #ifdef H5 -->
    </teleport>
    <!-- #endif -->
</template>
<script>
export default {
    name: 'u-root-portal',
    options: {
        virtualHost: true,
        addGlobalClass: true,
        styleIsolation: 'shared'
    }
};
</script>
<script lang="ts" setup></script>

<!-- #ifdef APP-PLUS -->
<script module="render" lang="renderjs">
export default {
  mounted() {
    if (this.$ownerInstance.$el) {
      (document.querySelector('uni-app') || document.body).appendChild(this.$ownerInstance.$el)
    }
  },
  beforeDestroy() {
    if (this.$ownerInstance.$el) {
      (document.querySelector('uni-app') || document.body).removeChild(this.$ownerInstance.$el)
    }
  }
}
</script>
<!-- #endif -->
