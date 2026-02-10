<template>
    <demo-page
        title="useToast 示例"
        desc="Toast 函数式调用 hooks，基于事件机制实现。支持应用级和页面级调用，可自定义主题、图标、加载状态等。"
        :apis="'useToast'"
    >
        <view class="u-page">
            <!-- 基础调用 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">基础调用</text>
                <view class="u-demo-block__content">
                    <u-button text="纯文本" type="primary" @click="handleBasic"></u-button>
                </view>
            </view>

            <!-- 主题类型 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">主题类型</text>
                <view class="u-demo-block__content">
                    <u-button text="成功" type="success" @click="handleSuccess"></u-button>
                    <u-button text="错误" type="error" @click="handleError"></u-button>
                    <u-button text="警告" type="warning" @click="handleWarning"></u-button>
                    <u-button text="信息" type="info" @click="handleInfo"></u-button>
                </view>
            </view>

            <!-- 加载状态 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">加载状态</text>
                <view class="u-demo-block__content">
                    <u-button text="成功" type="success" @click="handleLoading('success')"></u-button>
                    <u-button text="错误" type="error" @click="handleLoading('error')"></u-button>
                    <u-button text="警告" type="warning" @click="handleLoading('warning')"></u-button>
                    <u-button text="信息" type="info" @click="handleLoading('info')"></u-button>
                </view>
            </view>

            <!-- 位置自定义 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">位置自定义</text>
                <view class="u-demo-block__content">
                    <u-button text="顶部显示" type="primary" @click="handleTop"></u-button>
                    <u-button text="中间显示" type="primary" @click="handleCenter"></u-button>
                    <u-button text="底部显示" type="primary" @click="handleBottom"></u-button>
                </view>
            </view>

            <!-- 参数配置 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">参数配置</text>
                <view class="u-demo-block__content">
                    <u-button text="长时显示(5秒)" type="primary" @click="handleLongDuration"></u-button>
                    <u-button text="不自动关闭" type="primary" @click="handleNoAutoClose"></u-button>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { useToast } from 'uview-pro';
import type { ThemeType } from 'uview-pro/types/global';

// 应用级 Toast（默认）
const toast = useToast();

// 基础调用
const handleBasic = () => {
    toast.show('这是一条提示信息');
};

// 主题类型
const handleSuccess = () => {
    toast.success('操作成功');
};

const handleError = () => {
    toast.error('操作失败，请重试');
};

const handleWarning = () => {
    toast.warning('请注意，这将删除数据');
};

const handleInfo = () => {
    toast.info('系统正在维护中');
};

// 加载状态
const handleLoading = (type: ThemeType) => {
    toast.loading({
        title: '正在提交...',
        duration: 3000,
        type: type
    });
};

// 位置自定义
const handleTop = () => {
    toast.show({
        title: '顶部显示',
        position: 'top',
        duration: 2000
    });
};

const handleCenter = () => {
    toast.show({
        title: '中间显示',
        position: 'center',
        duration: 2000
    });
};

const handleBottom = () => {
    toast.show({
        title: '底部显示',
        position: 'bottom',
        duration: 2000
    });
};

// 参数配置
const handleLongDuration = () => {
    toast.show({
        title: '这是一条长时显示的消息',
        duration: 5000
    });
};

const handleNoAutoClose = () => {
    toast.show({
        title: '需要手动关闭',
        duration: 0
    });
    // 可在适当时机调用 toast.close() 关闭
};
</script>

<style lang="scss">
.u-page {
    padding-bottom: 20px;
}

.u-demo-block__content {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
}
</style>
