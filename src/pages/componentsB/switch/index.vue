<template>
    <demo-page title="Switch 开关" desc="用于开关切换，支持自定义颜色、大小和异步操作。" :apis="'switch'">
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <u-switch
                            v-model="modelValue"
                            :loading="loading"
                            :size="size"
                            @change="change"
                            :active-color="activeColor"
                            :disabled="disabled"
                            :activeValue="activeValue"
                            :inactiveValue="inactiveValue"
                        ></u-switch>
                        <view>当前开关状态: {{ isChecked }}</view>
                        <view>当前v-model: {{ modelValue }}</view>
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
                        <u-subsection
                            :list="['primary', 'error', 'warning', 'success']"
                            @change="colorChange"
                        ></u-subsection>
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
    </demo-page>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

type IModelValue = 1 | 100;

const activeValue = ref<IModelValue>(100);
const inactiveValue = ref<IModelValue>(1);
const modelValue = ref<IModelValue>(1);
const isChecked = computed<boolean>(() => modelValue.value === activeValue.value);
const activeColor = ref($u.color.primary);
const size = ref<number | string>(50);
const loading = ref(false);
const disabled = ref(false);

function modelChange(index: number) {
    // 两个!!可以把0变成false，1变成true
    modelValueChange(!!index);
}

function modelValueChange(value: boolean) {
    modelValue.value = value ? activeValue.value : inactiveValue.value;
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
    if (isChecked.value && index === 1) {
        $u.toast('请先关闭选择器');
        return;
    }
    if (!isChecked.value && index === 0) {
        $u.toast('请先打开选择器');
        return;
    }
    const str = index === 0 ? '是否要关闭？' : '是否要打开？';
    loading.value = true;
    const oldStatus = isChecked.value;
    modelValueChange(true);
    uni.showModal({
        title: '提示',
        content: str,
        complete: (res: { confirm: boolean }) => {
            loading.value = false;
            if (res.confirm) {
                modelValueChange(!oldStatus);
            } else {
                modelValueChange(!!oldStatus);
            }
        }
    });
}

function change(value: any) {
    // console.log(value);
}
</script>
