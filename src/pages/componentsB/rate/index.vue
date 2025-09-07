<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-rate
                    v-model="value"
                    :count="count"
                    @change="change"
                    :active-color="activeColor"
                    :inaction-color="inactiveColor"
                    :active-icon="activeIcon"
                    :inactive-icon="inactiveIcon"
                    :disabled="disabled"
                    :colors="colors"
                    :icons="icons"
                ></u-rate>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">初始值</view>
                <u-subsection :list="['1', '2', '3', '4']" @change="currentChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">镂空状态</view>
                <u-subsection current="1" :list="['是', '否']" @change="plainChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义样式</view>
                <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义图标</view>
                <u-subsection current="1" :list="['是', '否']" @change="iconChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">是否分层</view>
                <u-subsection current="1" :list="['是', '否']" @change="decimalChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">是否禁用</view>
                <u-subsection current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">星星数量</view>
                <u-subsection current="1" :list="['4', '5', '6']" @change="countChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { $u } from '@/uni_modules/uview-pro';
import { ref, computed, watch } from 'vue';

const activeColor = ref('#FA3534');
const inactiveColor = ref('#b2b2b2');
const disabled = ref(false);
const count = ref(5);
const customIcon = ref(false);
const plain = ref(false);
const value = ref(0);
const colors = ref([]);
const icons = ref([]);

watch(value, n => {
    // console.log(n);
});

const activeIcon = computed(() => {
    let icon = customIcon.value ? 'heart' : 'star';
    return plain.value ? icon : icon + '-fill';
});

const inactiveIcon = computed(() => {
    let icon = customIcon.value ? 'heart' : 'star';
    return plain.value ? icon : icon + '-fill';
});

function currentChange(index: number) {
    value.value = index === 0 ? 1 : index === 1 ? 2 : index === 2 ? 3 : 4;
}

function plainChange(index: number) {
    plain.value = !index;
}

function disabledChange(index: number) {
    disabled.value = index === 0 ? true : false;
}

function countChange(index: number) {
    count.value = index === 0 ? 4 : index == 1 ? 5 : 6;
}

function styleChange(index: number) {
    if (index == 0) {
        activeColor.value = $u.color['primary'];
        inactiveColor.value = $u.color['info'];
    } else {
        activeColor.value = '#FA3534';
        inactiveColor.value = '#b2b2b2';
    }
}

function decimalChange(index: number) {
    if (index == 0) {
        colors.value = ['#ffc454', '#ffb409', '#ff9500'];
        icons.value = ['thumb-down-fill', 'thumb-down-fill', 'thumb-up-fill', 'thumb-up-fill'];
    } else {
        colors.value = [];
        icons.value = [];
    }
}

function iconChange(index: number) {
    customIcon.value = !index;
}

function change(val: number) {
    // console.log(val);
}
</script>
