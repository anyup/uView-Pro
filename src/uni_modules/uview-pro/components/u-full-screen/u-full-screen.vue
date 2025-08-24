<template>
    <u-modal v-model="show" :show-cancel-button="true" confirm-text="升级" title="发现新版本" @cancel="cancel" @confirm="confirm">
        <view class="u-update-content">
            <rich-text :nodes="content"></rich-text>
        </view>
    </u-modal>
</template>

<script setup lang="ts">
import { FullScreenProps } from './types';
import { ref, onMounted } from 'vue';

defineOptions({ name: 'u-full-screen' });

/**
 * 压窗屏升级弹窗组件
 * @description 用于APP弹窗遮盖导航栏和底部tabbar，提示新版本升级内容
 * @property {boolean} show 是否显示弹窗
 * @property {string} content 升级内容，支持富文本
 */
defineProps(FullScreenProps);

/**
 * 是否显示弹窗
 */
const show = ref(false);
/**
 * 升级内容，支持富文本
 */
const content = ref<string>(`
  1. 修复badge组件的size参数无效问题<br>
  2. 新增Modal模态框组件<br>
  3. 新增压窗屏组件，可以在APP上以弹窗的形式遮盖导航栏和底部tabbar<br>
  4. 修复键盘组件在微信小程序上遮罩无效的问题
`);

/**
 * 页面加载完成后自动显示弹窗
 */
onMounted(() => {
    show.value = true;
});

/**
 * 取消按钮点击事件
 * @description 关闭弹窗并返回上一页
 */
function cancel() {
    closeModal();
}

/**
 * 升级按钮点击事件
 * @description 关闭弹窗并返回上一页
 */
function confirm() {
    closeModal();
}

/**
 * 关闭弹窗方法
 * @description 返回上一页
 */
function closeModal() {
    uni.navigateBack();
}
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-full-content {
    background-color: #00c777;
}

.u-update-content {
    font-size: 26rpx;
    color: $u-content-color;
    line-height: 1.7;
    padding: 30rpx;
}
</style>
