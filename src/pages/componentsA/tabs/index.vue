<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToast"></u-toast>
                <u-tabs
                    v-if="control"
                    bg-color="#fafafa"
                    :bold="bold"
                    :active-color="activeColor"
                    :list="list"
                    @change="change"
                    :current="current"
                    :is-scroll="isScroll"
                    :offset="offset"
                ></u-tabs>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">模式选择</view>
                <u-subsection :current="sectionCurrent" :list="['滚动', '非滚动']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">标签个数(非滚动模式)</view>
                <u-subsection :list="['2', '3', '4']" @change="countChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">活动选项字颜色</view>
                <u-subsection mode="button" :list="['primary', 'success', 'error', 'warning']" @change="colorChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">字体加粗</view>
                <u-subsection mode="button" :list="['是', '否']" @change="boldChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { $u } from '@/uni_modules/uview-pro';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const list = ref([]);
const data = ref([
    { name: '关注', count: 100 },
    { name: '推荐', count: 7 },
    { name: '电影' },
    { name: '电视剧' },
    { name: '小视频' },
    { name: '游戏' },
    { name: '校园' },
    { name: '影视' },
    { name: '音乐' }
]);
const current = ref(0);
const sectionCurrent = ref(0);
const isScroll = ref(true);
const tabCountIndex = ref(0);
const activeColor = ref($u.color['primary']);
const bold = ref(true);
const control = ref(true);
const offset = ref<[number, number]>([5, -5]);

onLoad(() => {
    list.value = data.value;
});

function countChange(index: number) {
    switch (index) {
        case 0:
            list.value = [];
            list.value.push(data.value[0]);
            list.value.push(data.value[1]);
            offset.value = [5, 60];
            break;
        case 1:
            list.value = [];
            list.value.push(data.value[0]);
            list.value.push(data.value[1]);
            list.value.push(data.value[2]);
            offset.value = [5, 20];
            break;
        case 2:
            list.value = [];
            list.value.push(data.value[0]);
            list.value.push(data.value[1]);
            list.value.push(data.value[2]);
            list.value.push(data.value[3]);
            offset.value = [5, 5];
            break;
    }
    tabCountIndex.value = index;
    isScroll.value = false;
}

function change(index: number) {
    current.value = index;
}

function modeChange(index: number) {
    control.value = false;
    current.value = 0;
    switch (index) {
        case 0:
            isScroll.value = true;
            list.value = data.value;
            offset.value = [5, -5];
            break;
        case 1:
            isScroll.value = false;
            countChange(tabCountIndex.value);
            break;
    }
    control.value = true;
}

function colorChange(index: number) {
    let color = 'primary';
    switch (index) {
        case 0:
            color = 'primary';
            break;
        case 1:
            color = 'success';
            break;
        case 2:
            color = 'error';
            break;
        case 3:
            color = 'warning';
            break;
    }
    activeColor.value = $u.color[color];
}

function boldChange(index: number) {
    switch (index) {
        case 0:
            bold.value = true;
            break;
        case 1:
            bold.value = false;
            break;
    }
}
</script>
