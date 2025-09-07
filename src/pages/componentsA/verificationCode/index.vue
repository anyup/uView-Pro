<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToastRef"></u-toast>
                <u-verification-code
                    :keep-running="true"
                    :seconds="seconds"
                    @end="end"
                    @start="start"
                    ref="uCodeRef"
                    @change="codeChange"
                    :startText="startText"
                    :changeText="changeText"
                    :endText="endText"
                ></u-verification-code>
                <u-button @click="getCode">{{ tips }}</u-button>
                <u-button :custom-style="{ marginTop: '30rpx' }" @tap="reset" style="margin-top: 30rpx">重置</u-button>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">倒计时间</view>
                <u-subsection :current="0" :list="['60s', '10s', '5s']" @change="secondsChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义提示语</view>
                <u-subsection :current="1" :list="['是', '否']" @change="textChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tips = ref('');
const seconds = ref(60);
const startText = ref('获取验证码');
const changeText = ref('X秒重新获取');
const endText = ref('重新获取');

const uToastRef = ref(null);
const uCodeRef = ref(null);

function codeChange(text: string) {
    tips.value = text;
}

function getCode() {
    if (uCodeRef.value.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
            title: '正在获取验证码'
        });
        setTimeout(() => {
            uni.hideLoading();
            // 这里此提示会被this.start()方法中的提示覆盖
            uToastRef.value.show({
                title: '验证码已发送',
                type: 'success'
            });
            // 通知验证码组件内部开始倒计时
            uCodeRef.value.start();
        });
    } else {
        uToastRef.value.show({
            title: '倒计时结束后再发送',
            type: 'error'
        });
    }
}

function secondsChange(index: number) {
    seconds.value = index == 0 ? 60 : index == 1 ? 10 : 5;
}

function textChange(index: number) {
    console.log(index, 'index');
    if (index === 0) {
        startText.value = '点一下获取';
        changeText.value = '重新获取Xs';
        endText.value = '再次获取';
    } else {
        startText.value = '获取验证码';
        changeText.value = 'X秒重新获取';
        endText.value = '重新获取';
    }
}

function start() {
    uToastRef.value.show({
        title: '倒计时开始',
        type: 'success'
    });
}

function end() {
    uToastRef.value.show({
        title: '倒计时结束',
        type: 'success'
    });
}

function reset() {
    uCodeRef.value.reset();
}
</script>
