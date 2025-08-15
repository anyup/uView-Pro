<template>
    <view class="wrap">
        <view class="key-input">
            <view class="title">输入验证码</view>
            <view class="tips">验证码已发送至 +150****9320</view>
            <u-message-input :focus="true" :value="value" @change="change" @finish="finish" mode="bottomLine" :maxlength="maxlength"></u-message-input>
            <text :class="{ error: error }">验证码错误，请重新输入</text>
            <view class="captcha">
                <text :class="{ noCaptcha: show }" @tap="noCaptcha">收不到验证码点这里</text>
                <text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 验证码最大长度
const maxlength = 4;
// 输入的验证码
const value = ref('');
// 倒计时秒数
const second = ref(5);
// 是否显示“收不到验证码”
const show = ref(false);
// 是否显示错误提示
const error = ref(false);

/**
 * 倒计时逻辑，结束后显示“收不到验证码”
 */
onMounted(() => {
    const interval = setInterval(() => {
        second.value--;
        if (second.value <= 0) {
            show.value = true;
            if (value.value.length !== 4) {
                error.value = true;
            }
            clearInterval(interval);
        }
    }, 1000);
});

/**
 * 收不到验证码时的操作
 */
function noCaptcha() {
    uni.showActionSheet({
        itemList: ['重新获取验证码', '接听语音验证码'],
        success: function (res) {
            // 可根据选择处理
        },
        fail: function (res) {}
    });
}

/**
 * 验证码输入变化事件
 */
function change(val: string) {
    // console.log('change', val);
}

/**
 * 验证码输入完成事件
 */
function finish(val: string) {
    // console.log('finish', val);
}
</script>

<style lang="scss" scoped>
.wrap {
    padding: 80rpx;
}

.box {
    margin: 30rpx 0;
    font-size: 30rpx;
    color: 555;
}

.key-input {
    padding: 30rpx 0;
    text {
        display: none;
    }
    .error {
        display: block;
        color: red;
        font-size: 30rpx;
        margin: 20rpx 0;
    }
}

.title {
    font-size: 50rpx;
    color: #333;
}

.key-input .tips {
    font-size: 30rpx;
    color: #333;
    margin-top: 20rpx;
    margin-bottom: 60rpx;
}
.captcha {
    color: $u-type-warning;
    font-size: 30rpx;
    margin-top: 40rpx;
    .noCaptcha {
        display: block;
    }
    .regain {
        display: block;
    }
}
</style>
