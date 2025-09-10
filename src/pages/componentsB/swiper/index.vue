<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToast"></u-toast>
                <u-swiper
                    @change="change"
                    :height="250"
                    :list="list"
                    :title="title"
                    :effect3d="effect3d"
                    :indicator-pos="indicatorPos"
                    :mode="mode"
                    :interval="3000"
                    @click="click"
                ></u-swiper>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">指示器模式</view>
                <u-subsection :list="['round', 'rect', 'number', 'none']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">标题</view>
                <u-subsection current="1" :list="['显示', '隐藏']" @change="titleChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">指示器位置</view>
                <u-subsection current="3" :list="['上左', '上右', '下左', '下中', '下右']" @change="indicatorPosChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">3D效果</view>
                <u-subsection current="1" :list="['开启', '关闭']" @change="effect3dChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { SwiperIndicatorPosition, SwiperMode } from '@/uni_modules/uview-pro/types/global';
import { img1, img2, img3 } from './image';

const uToastRef = ref(null);

const list = ref([
    {
        image: img1,
        title: '昨夜星辰昨夜风，画楼西畔桂堂东'
    },
    {
        image: img2,
        title: '身无彩凤双飞翼，心有灵犀一点通'
    },
    {
        image: img3,
        title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
    }
]);

const title = ref(false);
const mode = ref<SwiperMode>('round');
const indicatorPos = ref<SwiperIndicatorPosition>('bottomCenter');
const effect3d = ref(false);

function titleChange(index: number) {
    title.value = index === 0 ? true : false;
}

function modeChange(index: number) {
    mode.value = index === 0 ? 'round' : index === 1 ? 'rect' : index === 2 ? 'number' : 'none';
}

function indicatorPosChange(index: number) {
    indicatorPos.value = index === 0 ? 'topLeft' : index === 1 ? 'topRight' : index === 2 ? 'bottomLeft' : index === 3 ? 'bottomCenter' : 'bottomRight';
}

function effect3dChange(index: number) {
    effect3d.value = index === 0 ? true : false;
}

function click(index: number) {
    uToastRef.value?.show({
        title: `点击了第${index + 1}张图片`,
        type: 'success'
    });
}

function change(index: number) {
    // console.log(index);
}
</script>

<style lang="scss" scoped>
.item {
    margin: 30rpx 0;
}
</style>
