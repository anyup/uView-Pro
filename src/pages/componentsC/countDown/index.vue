<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToastRef"></u-toast>
                <u-count-down
                    class="count-down-demo"
                    :timestamp="timestamp"
                    :separator="separator"
                    :showBorder="showBorder"
                    :separator-color="separatorColor"
                    :showDays="showDays"
                    :fontSize="fontSize"
                    @change="change"
                    ref="uCountDownRef"
                    :border-color="borderColor"
                    :color="color"
                    @end="end"
                    bg-color="rgb(250, 250, 250)"
                ></u-count-down>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">调整时间</view>
                <u-subsection :list="['60', '86400', '983272']" @change="timestampChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">分隔符</view>
                <u-subsection :list="['英文冒号', '中文名称']" @change="separatorChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义样式</view>
                <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">显示天</view>
                <u-subsection current="1" :list="['是', '否']" @change="showDaysChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">字体大小</view>
                <u-subsection current="1" :list="['26', '30', '34']" @change="fontSizeChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

const uToastRef = ref(null);
const uCountDownRef = ref(null);

const timestamp = ref(60);
const separator = ref('colon');
const showBorder = ref(false);
const borderColor = ref('#303133');
const color = ref('#303133');
const showDays = ref(false);
const fontSize = ref(30);
const separatorColor = ref('#303133');

function timestampChange(index: number) {
    timestamp.value = index === 0 ? 60 : index === 1 ? 86400 : 983272;
}

function separatorChange(index: number) {
    separator.value = index === 0 ? 'colon' : 'zh';
}

function styleChange(index: number) {
    if (index === 0) {
        showBorder.value = true;
        borderColor.value = $u.color['primary'];
        color.value = $u.color['primary'];
        separatorColor.value = $u.color['primary'];
    } else {
        showBorder.value = false;
        borderColor.value = '#303133';
        color.value = '#303133';
        separatorColor.value = '#303133';
    }
}

function showDaysChange(index: number) {
    showDays.value = index === 0;
}

function fontSizeChange(index: number) {
    fontSize.value = index === 0 ? 26 : index === 1 ? 30 : 34;
}

function end() {
    uToastRef.value?.show({
        title: '倒计时结束',
        type: 'warning'
    });
}

function change(timestamp: number) {
    // console.log(timestamp);
}

function getSeconds(): number | undefined {
    // console.log(uCountDown.value?.seconds);
    return uCountDownRef.value?.seconds;
}
</script>

<style scoped lang="scss">
.count-down-demo {
    justify-content: center;
}
</style>
