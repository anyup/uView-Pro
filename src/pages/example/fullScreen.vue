<template>
    <u-full-screen :content="content"> </u-full-screen>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const content = ref<string>(`
  1. 修复badge组件的size参数无效问题<br>
  2. 新增Modal模态框组件<br>
  3. 新增压窗屏组件，可以在APP上以弹窗的形式遮盖导航栏和底部tabbar<br>
  4. 修复键盘组件在微信小程序上遮罩无效的问题
`);
</script>
