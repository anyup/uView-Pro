<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToastRef"></u-toast>
                <view class="u-no-demo-here" style="text-align: left"> 根据当前时间，返回类似"刚刚，5分钟前，8小时前，3天前"等字样 </view>
                <view class="u-demo-result-line">
                    {{ result }}
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">时间</view>
                <u-subsection :list="timeArr1" @change="timeArr1Change"></u-subsection>
                <u-gap></u-gap>
                <u-subsection style="margin-top: 40rpx" :list="timeArr2" @change="timeArr2Change"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';

const uToastRef = ref();

// 微信小程序无法动态修改u-subsection的list参数，导致onLoad中赋值timeArr1，timeArr2无效，故在初始化时直接赋值
const nowTime = Number(+new Date());
const threeDayAgo = nowTime - 2 * 86400000;

// 初始化时间数组
const arr1: string[] = [0, 0].map(() => {
    return $u.timeFormat($u.random(threeDayAgo, nowTime), 'yyyy/mm/dd hh:MM:ss');
});

const arr2: string[] = [0, 0].map(() => {
    return $u.timeFormat($u.random(threeDayAgo, nowTime), 'yyyy/mm/dd hh:MM:ss');
});

const timeArr1 = ref(arr1);
const timeArr2 = ref(arr2);
const result = ref<string | null>(null);

/**
 * 第一个时间数组变更事件
 * @param index 选择的索引
 */
function timeArr1Change(index: number) {
    result.value = $u.timeFrom(new Date(timeArr1.value[index]).getTime());
}

/**
 * 第二个时间数组变更事件
 * @param index 选择的索引
 */
function timeArr2Change(index: number) {
    result.value = $u.timeFrom(new Date(timeArr2.value[index]).getTime());
}

onLoad(() => {
    timeArr1Change(0);
});
</script>
