<template>
    <demo-page
        title="useModal 示例"
        desc="Modal 函数式调用 hooks，基于事件机制实现。支持应用级和页面级调用，可自定义标题、内容、按钮、回调等。"
        :apis="'useModal'"
    >
        <u-modal page="agreement">
            <view class="u-p-40" style="line-height: 60rpx">
                <view>1. 本服务条款是您与本公司之间就使用我们的服务达成的协议。</view>
                <view>2. 使用我们的服务即表示您同意本条款。</view>
                <view>3. 我们保留在必要时修改条款的权利。</view>
                <u-checkbox v-model="isAgree" label="我已阅读并同意本服务条款"></u-checkbox>
            </view>
        </u-modal>
        <view class="u-page">
            <!-- 基础调用 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">基础调用</text>
                <view class="u-demo-block__content">
                    <u-button text="基础弹窗" type="primary" @click="handleBasic"></u-button>
                </view>
            </view>

            <!-- 带标题和内容 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">带标题和内容</text>
                <view class="u-demo-block__content">
                    <u-button text="提示弹窗" type="primary" @click="handleWithTitle"></u-button>
                </view>
            </view>

            <!-- 确认弹窗 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">确认弹窗</text>
                <view class="u-demo-block__content">
                    <u-button text="删除确认" type="error" @click="handleConfirm"></u-button>
                    <u-button text="自定义按钮" type="primary" @click="handleCustomButtons"></u-button>
                </view>
            </view>

            <!-- 异步操作 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">异步操作</text>
                <view class="u-demo-block__content">
                    <u-button text="异步提交" type="primary" @click="handleAsync"></u-button>
                </view>
            </view>

            <!-- 内容类型 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">内容类型</text>
                <view class="u-demo-block__content">
                    <u-button text="富文本内容" type="primary" @click="handleRichContent"></u-button>
                    <u-button text="长内容" type="primary" @click="handleLongContent"></u-button>
                </view>
            </view>

            <!-- 圆角和样式 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">圆角和样式</text>
                <view class="u-demo-block__content">
                    <u-button text="大圆角" type="primary" @click="handleBorderRadius"></u-button>
                </view>
            </view>

            <!-- 事件回调 -->
            <view class="u-demo-block">
                <text class="u-demo-block__title">事件回调</text>
                <view class="u-demo-block__content">
                    <u-button text="回调示例" type="primary" @click="handleCallbacks"></u-button>
                </view>
            </view>

            <!-- 显示结果 -->
            <view class="u-demo-block" v-if="result">
                <text class="u-demo-block__title">操作结果</text>
                <view class="u-demo-block__content">
                    <u-text :text="result" type="success"></u-text>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast, useModal } from 'uview-pro';

// 操作结果
const result = ref('');

// 应用级 Modal
const modal = useModal();
const pageModal = useModal({ page: 'agreement' });
// 用于显示操作结果
const toast = useToast();
// 是否同意
const isAgree = ref(false);
// 基础调用
const handleBasic = () => {
    modal.show('这是一条简单的消息提示');
};

// 带标题和内容
const handleWithTitle = () => {
    modal.show({
        title: '操作提示',
        content: '确定要执行此操作吗？此操作不可撤销，请谨慎操作。',
        confirmText: '我知道了',
        showCancelButton: false
    });
};

// 确认弹窗
const handleConfirm = () => {
    modal.confirm({
        title: '确认删除',
        content: '确定要删除这条数据吗？删除后无法恢复。',
        confirmColor: '#fa3534',
        onConfirm: () => {
            result.value = '已删除数据';
            toast.success('删除成功');
        },
        onCancel: () => {
            result.value = '已取消删除';
            toast.info('已取消删除');
        }
    });
};

// 自定义按钮
const handleCustomButtons = () => {
    modal.confirm({
        title: '自定义操作',
        content: '请选择以下操作之一',
        confirmText: '同意',
        cancelText: '拒绝',
        confirmColor: '#19c964',
        cancelColor: '#ff9900',
        onConfirm: () => {
            result.value = '您选择了同意';
            toast.success('您选择了同意');
        },
        onCancel: () => {
            result.value = '您选择了拒绝';
            toast.warning('您选择了拒绝');
        }
    });
};

// 异步操作
const handleAsync = () => {
    modal.confirm({
        title: '提交确认',
        content: '确定要提交表单吗？',
        confirmText: '提交',
        asyncClose: true,
        onConfirm: async () => {
            // 模拟异步操作
            await new Promise(resolve => setTimeout(resolve, 2000));
            modal.close();
            result.value = '提交成功';
            toast.success('提交成功');
        },
        onCancel: () => {
            modal.clearLoading();
            result.value = '已取消提交';
            toast.info('已取消提交');
        }
    });
};

// 富文本内容
const handleRichContent = () => {
    isAgree.value = false;
    pageModal.show({
        title: '使用条款',
        confirmText: '同意并继续',
        showCancelButton: false,
        asyncClose: true,
        onConfirm: () => {
            pageModal.clearLoading();
            if (isAgree.value) {
                pageModal.close();
            } else {
                toast.warning('请先阅读并同意本服务条款');
            }
        }
    });
};

// 长内容
const handleLongContent = () => {
    modal.show({
        title: '隐私政策摘要',
        content: `我们非常重视您的隐私保护。本隐私政策说明了我们如何收集、使用、存储和保护您的个人信息。
            1. 信息收集：我们收集您提供的个人信息，包括但不限于姓名、联系方式等。
            2. 信息使用：您的信息将用于提供和改进我们的服务。
            3. 信息保护：我们采用行业领先的加密技术保护您的数据安全。
            4. 信息共享：未经您的同意，我们不会向第三方出售您的个人信息。
        `,
        confirmText: '知道了',
        contentStyle: 'text-align: left;',
        showCancelButton: false
    });
};

// 大圆角
const handleBorderRadius = () => {
    modal.show({
        title: '自定义样式',
        content: '这是一个使用大圆角样式的弹窗示例',
        borderRadius: 60,
        confirmText: '确定',
        showCancelButton: false
    });
};

// 事件回调
const handleCallbacks = () => {
    modal.confirm({
        title: '回调测试',
        content: '点击按钮查看回调效果',
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => {
            console.log('确认按钮被点击');
            result.value = '确认回调已触发';
            toast.show('确认回调已触发');
        },
        onCancel: () => {
            console.log('取消按钮被点击');
            result.value = '取消回调已触发';
            toast.show('取消回调已触发');
        }
    });
};
</script>

<style lang="scss" scoped>
.u-page {
    padding-bottom: 20px;
}

.u-demo-block__content {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
    text-align: left;
}
</style>
