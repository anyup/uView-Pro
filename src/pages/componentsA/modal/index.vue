<template>
    <demo-page
        title="Modal 弹窗"
        desc="用于消息提示、操作确认等场景的模态弹窗，支持自定义内容和异步关闭。"
        :apis="apis"
    >
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <u-toast ref="uToast"></u-toast>
                        <view class="u-no-demo-here">请点击弹出弹窗查看效果</view>
                        <u-modal
                            ref="uModalRef"
                            v-model="show"
                            :show-cancel-button="true"
                            :show-title="showTitle"
                            :async-close="asyncClose"
                            @confirm="confirm"
                            :content="content"
                        >
                            <!-- #ifndef MP-WEIXIN || MP-TOUTIAO -->
                            <template #default v-if="contentSlot">
                                <view class="warp" style="margin: 30rpx">
                                    <image
                                        class="logo"
                                        src="https://ik.imagekit.io/anyup/uview-pro/common/logo-new.png"
                                        style="width: 220rpx"
                                        mode="widthFix"
                                    ></image>
                                </view>
                            </template>
                            <!-- #endif -->
                        </u-modal>
                    </view>
                </view>
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom">参数配置</view>
                    <view class="u-config-item">
                        <view class="u-item-title">状态</view>
                        <u-subsection :current="current" :list="['显示', '隐藏']" @change="showChange" />
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">是否显示标题</view>
                        <u-subsection current="0" :list="['是', '否']" @change="titleChange" />
                    </view>
                    <!-- #ifndef MP-WEIXIN -->
                    <view class="u-config-item">
                        <view class="u-item-title">自定义内容</view>
                        <u-subsection current="1" :list="['是', '否']" @change="contentChange" />
                    </view>
                    <!-- #endif -->
                    <view class="u-config-item">
                        <view class="u-item-title">异步关闭</view>
                        <u-subsection current="1" :list="['是', '否']" @change="asyncChange" />
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { apis } from './config';

const show = ref<boolean>(false);
const zoom = ref<boolean>(false);
const content = ref<string>('慈母手中线，游子身上衣');
const contentSlot = ref<boolean>(false);
const showTitle = ref<boolean>(true);
const asyncClose = ref<boolean>(false);

const current = computed(() => {
    return show.value ? 0 : 1;
});

function showChange(index: number) {
    show.value = !index;
}

function titleChange(index: number) {
    showTitle.value = !index;
    show.value = true;
}

function contentChange(index: number) {
    contentSlot.value = !index;
    show.value = true;
}

function asyncChange(index: number) {
    show.value = true;
    asyncClose.value = !index;
}

function confirm() {
    setTimeout(() => {
        show.value = false;
    }, 2000);
}
</script>

<style scoped lang="scss">
.logo {
    height: auto;
    will-change: transform;
}
</style>
