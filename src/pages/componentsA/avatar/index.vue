<template>
    <demo-page
        title="Avatar 头像"
        desc="用于展示用户头像、等级、性别等信息，支持多种形态和自定义内容。"
        :apis="'avatar'"
    >
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <u-avatar
                            :mode="mode"
                            :size="size"
                            :src="src"
                            :text="text"
                            :showLevel="showLevel"
                            :showSex="showSex"
                            :sexIcon="sexIcon"
                            :bgColor="bgColor"
                        ></u-avatar>
                    </view>
                </view>
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom"> 参数配置 </view>
                    <view class="u-config-item">
                        <view class="u-item-title">是否默认头像</view>
                        <u-subsection current="1" :list="['是', '否']" @change="defaultAvatarChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">模式选择</view>
                        <u-subsection :list="['圆形', '圆角方形']" @change="modeChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">性别选择</view>
                        <u-subsection :list="['男', '女', '不显示']" @change="sexChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">等级</view>
                        <u-subsection :list="['显示', '不显示']" @change="levelChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">自定义内容</view>
                        <u-subsection current="0" :list="['图片', '文字']" @change="styleChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">尺寸</view>
                        <u-subsection
                            current="1"
                            :list="['large', 'default', 'mini', '160']"
                            @change="sizeChange"
                        ></u-subsection>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Sex, Shape } from '@/uni_modules/uview-pro/types/global';

const mode = ref<Shape>('circle');
const src = ref('/static/logo.png');
const text = ref('');
const size = ref('90');
const showLevel = ref(true);
const showSex = ref(true);
const sexIcon = ref<Sex>('man');
const bgColor = ref('var(--u-bg-color)');

function defaultAvatarChange(index: number) {
    if (index === 0) {
        src.value = '';
    } else {
        src.value = '/static/logo.png';
    }
}

function modeChange(index: number) {
    mode.value = index === 0 ? 'circle' : 'square';
}
function styleChange(index: number) {
    if (index === 0) {
        text.value = '';
        src.value = '/static/logo.png';
    } else {
        text.value = '无头像';
    }
}

function sizeChange(index: number) {
    size.value = index === 0 ? 'large' : index === 1 ? 'default' : index === 2 ? 'mini' : '160';
}

function sexChange(index: number) {
    showSex.value = true;
    if (index === 0) sexIcon.value = 'man';
    if (index === 1) sexIcon.value = 'woman';
    if (index === 2) showSex.value = false;
}

function levelChange(index: number) {
    showLevel.value = !index;
}
</script>
