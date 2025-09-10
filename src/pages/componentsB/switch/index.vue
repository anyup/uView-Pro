<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-switch
                    v-model="checked"
                    :loading="loading"
                    :size="size"
                    @change="change"
                    :active-color="activeColor"
                    :disabled="disabled"
                    :activeValue="100"
                    :inactiveValue="1"
                ></u-switch>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">状态</view>
                <u-subsection :list="['关闭', '打开']" @change="modelChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">颜色</view>
                <u-subsection :list="['primary', 'error', 'warning', 'success']" @change="colorChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">尺寸(单位rpx)</view>
                <u-subsection current="1" :list="['40', '60', '80']" @change="sizeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">加载中</view>
                <u-subsection :list="['否', '是']" @change="loadingChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">禁用</view>
                <u-subsection current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">异步控制</view>
                <u-subsection :list="['关闭', '打开']" @change="asyncChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

const checked = ref(false);
const activeColor = ref('#2979ff');
const size = ref<number | string>(50);
const loading = ref(false);
const disabled = ref(false);

function modelChange(index: number) {
    // 两个!!可以把0变成false，1变成true
    checked.value = !!index;
}

function colorChange(index: number) {
    const color = index === 0 ? 'primary' : index === 1 ? 'error' : index === 2 ? 'warning' : 'success';
    activeColor.value = $u.color[color];
}

function sizeChange(index: number) {
    size.value = index === 0 ? '40' : index === 1 ? '60' : '80';
}

function loadingChange(index: number) {
    loading.value = !!index;
}

function disabledChange(index: number) {
    disabled.value = index === 0 ? true : false;
}

function asyncChange(index: number) {
    if (checked.value && index === 1) {
        $u.toast('请先关闭选择器');
        return;
    }
    if (!checked.value && index === 0) {
        $u.toast('请先打开选择器');
        return;
    }
    const str = index === 0 ? '是否要关闭？' : '是否要打开？';
    loading.value = true;
    const oldStatus = checked.value;
    checked.value = true;
    uni.showModal({
        title: '提示',
        content: str,
        complete: (res: { confirm: boolean }) => {
            loading.value = false;
            if (res.confirm) {
                if (oldStatus) checked.value = false;
                else checked.value = true;
            } else {
                if (!oldStatus) checked.value = false;
                else checked.value = true;
            }
        }
    });
}

function change(value: any) {
    // console.log(value);
}
</script>
