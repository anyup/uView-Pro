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
<script lang="ts" setup>
/**
 * rootPortal 根节点传送
 * @description 该组件一般用于使整个子树从页面中脱离出来，类似于在 CSS 中使用 fixed position 的效果。主要用于制作弹窗、弹出层等。
 * @tutorial https://uviewpro.cn/zh/components/rootPortal.html
 * @example <u-root-portal><view class="modal">这是一个全局弹窗</view></u-root-portal>
 */
</script>

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
