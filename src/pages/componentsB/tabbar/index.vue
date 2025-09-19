<template>
    <view>
        <view class="u-demo">
            <view class="u-config-wrap">
                <view class="u-config-title u-border-bottom"> 参数配置 </view>
                <view class="u-config-item">
                    <view class="u-item-title">状态</view>
                    <u-subsection :list="['显示', '隐藏']" @change="showChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">凸起按钮</view>
                    <u-subsection :list="['显示', '隐藏']" @change="minButtonChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">背景色</view>
                    <u-subsection :list="['#ffffff', '#1f1f1d']" @change="bgColorChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">顶部边框</view>
                    <u-subsection :list="['显示', '隐藏']" @change="borderTopChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">提示角标</view>
                    <u-subsection :list="['显示', '隐藏']" @change="badgeChange"></u-subsection>
                </view>
            </view>
        </view>
        <u-tabbar
            v-model="current"
            :show="show"
            :bg-color="bgColor"
            :border-top="borderTop"
            :list="list"
            :mid-button="midButton"
            :inactive-color="inactiveColor"
            :activeColor="activeColor"
        ></u-tabbar>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const current = ref(0);
const show = ref(true);
const bgColor = ref('#ffffff');
const borderTop = ref(true);
const list = ref([
    {
        iconPath: 'home',
        selectedIconPath: 'home-fill',
        text: '首页',
        count: 2,
        isDot: true,
        customIcon: false
    },
    {
        iconPath: 'photo',
        selectedIconPath: 'photo-fill',
        text: '放映厅',
        customIcon: false
    },
    {
        iconPath: '/static/uview/example/min_button.png',
        selectedIconPath: '/static/uview/example/min_button_select.png',
        text: '发布',
        midButton: true,
        customIcon: false
    },
    {
        iconPath: 'play-right',
        selectedIconPath: 'play-right-fill',
        text: '直播',
        customIcon: false
    },
    {
        iconPath: 'account',
        selectedIconPath: 'account-fill',
        text: '我的',
        count: 23,
        isDot: false,
        customIcon: false
    }
]);
const midButton = ref(true);
const inactiveColor = ref('#909399');
const activeColor = ref('#5098FF');

function beforeSwitch(index: number): boolean {
    return true;
}

function showChange(index: number) {
    show.value = !index;
}

function bgColorChange(index: number) {
    if (index === 0) {
        activeColor.value = '#5098FF';
        inactiveColor.value = '#909399';
    }
    if (index === 1) {
        activeColor.value = '#D0D0D0';
        inactiveColor.value = '#5A5A5A';
    }
    bgColor.value = ['#ffffff', '#1f1f1d'][index];
}

function borderTopChange(index: number) {
    borderTop.value = !index;
}

function badgeChange(index: number) {
    if (index === 1) {
        list.value[0].count = 0;
        list.value[4].count = 0;
    } else {
        list.value[0].count = 2;
        list.value[4].count = 23;
    }
}

function minButtonChange(index: number) {
    midButton.value = !index;
}
</script>

<style scoped lang="scss">
.u-demo-area {
    margin: 0 -40rpx;
}
</style>
