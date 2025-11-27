<script setup lang="ts">
import { onLaunch, onShow, onHide, onThemeChange } from '@dcloudio/uni-app';
onLaunch(() => {
    console.log('App Launch');
});
onShow(() => {
    console.log('App Show');
});
onHide(() => {
    console.log('App Hide');
});
onThemeChange(res => {
    console.log('[App.vue] system theme changed', res);
});
</script>
<style lang="scss">
@import '@/uni_modules/uview-pro/index.scss';
@import '@/common/iconfont.css';
@import '@/common/demo.scss';
</style>
