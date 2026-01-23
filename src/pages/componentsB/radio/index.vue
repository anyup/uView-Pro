<template>
    <demo-page title="Radio 单选框" desc="用于单项选择，支持自定义颜色、大小、禁用等功能。" :apis="'radio'">
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <view>
                            <u-radio-group
                                v-model="value"
                                :shape="shape"
                                :size="size"
                                :width="width"
                                :wrap="wrap"
                                @change="radioGroupChange"
                                :activeColor="activeColor"
                            >
                                <u-radio
                                    @change="radioChange"
                                    v-for="(item, index) in list"
                                    :disabled="item.disabled"
                                    :key="index"
                                    :value="item.value"
                                    :label="item.label"
                                />
                            </u-radio-group>
                        </view>
                        <view class="u-demo-result-line">
                            {{ value ? `选中了"${value}"` : '请选择' }}
                        </view>
                    </view>
                </view>
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom"> 参数配置 </view>
                    <view class="u-config-item">
                        <view class="u-item-title">形状</view>
                        <u-subsection current="1" :list="['方形', '圆形']" @change="shapeChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">整体大小(单位rpx)</view>
                        <u-subsection current="1" :list="['30', '40', '50']" @change="sizeChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">激活颜色</view>
                        <u-subsection
                            :list="['primary', 'error', 'warning', 'success', 'info']"
                            @change="activeColorChange"
                        ></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">每个占一行</view>
                        <u-subsection current="1" :list="['是', '否']" @change="wrapChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">每个宽度50%</view>
                        <u-subsection current="1" :list="['是', '否']" @change="widthChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">默认选中第一个</view>
                        <u-subsection current="1" :list="['是', '否']" @change="defaultChooseChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">禁用第一个</view>
                        <u-subsection current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script setup lang="ts">
import { $u } from '@/uni_modules/uview-pro';
import type { Shape } from '@/uni_modules/uview-pro/types/global';
import { reactive, ref } from 'vue';

const list = reactive([
    {
        label: '荔枝',
        value: '荔枝',
        disabled: false
    },
    {
        label: '香蕉',
        value: '香蕉',
        disabled: false
    },
    {
        label: '橙子',
        value: '橙子',
        disabled: false
    },
    {
        label: '草莓',
        value: '草莓',
        disabled: false
    }
]);
const shape = ref<Shape>('circle');
const value = ref('荔枝');
const activeColor = ref($u.color.primary);
const size = ref(34);
const wrap = ref(false);
const width = ref('auto');

function shapeChange(index: number) {
    shape.value = index == 0 ? 'square' : 'circle';
}

function sizeChange(index: number) {
    size.value = index == 0 ? 30 : index == 1 ? 40 : 50;
}

function defaultChooseChange(index: number) {
    value.value = list[0].value;
}

function activeColorChange(index: number) {
    let theme =
        index == 0 ? 'primary' : index == 1 ? 'error' : index == 2 ? 'warning' : index == 3 ? 'success' : 'info';
    activeColor.value = $u.color[theme];
}

function disabledChange(index: number) {
    list[0].disabled = index === 0;
}

function radioChange(e) {
    console.log('radioChange', e);
}

function radioGroupChange(e) {
    console.log('radioGroupChange', e);
}

function widthChange(index: number) {
    width.value = index == 0 ? '50%' : '';
}

function wrapChange(index: number) {
    wrap.value = !index;
}
</script>
