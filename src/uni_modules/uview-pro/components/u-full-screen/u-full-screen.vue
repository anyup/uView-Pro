<template>
    <u-modal
        v-model="show"
        :class="customClass"
        :style="$u.toStyle(customStyle)"
        :show-cancel-button="true"
        :confirm-text="t('uFullScreen.upgrade')"
        :title="title || t('uFullScreen.title')"
        @cancel="cancel"
        @confirm="confirm"
    >
        <view class="u-update-content">
            <rich-text :nodes="content"></rich-text>
        </view>
    </u-modal>
</template>

<script lang="ts">
export default {
    name: 'u-full-screen',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { FullScreenProps } from './types';
import { ref, onMounted } from 'vue';
import { $u, useLocale } from '../../';

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

const { t } = useLocale();

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
    background-color: var(--u-type-success);
}

.u-update-content {
    font-size: 26rpx;
    color: $u-content-color;
    line-height: 1.7;
    padding: 30rpx;
}
</style>
