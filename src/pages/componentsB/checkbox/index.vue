<template>
    <demo-page title="Checkbox 复选框" desc="用于选择一个或者多个选项。" :apis="'checkbox'">
        <view class="u-demo">
            <view class="u-demo-wrap">
                <view class="u-demo-title">演示效果</view>
                <view class="u-demo-area">
                    <view>
                        <u-checkbox-group
                            v-model="checkboxValues"
                            :size="size"
                            :width="width"
                            :wrap="wrap"
                            :max="max"
                            :activeColor="activeColor"
                            @change="checkboxGroupChange"
                        >
                            <u-checkbox
                                v-for="(item, index) in list"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                                :shape="shape"
                                :disabled="item.disabled"
                                @change="checkboxChange"
                            >
                            </u-checkbox>
                        </u-checkbox-group>
                    </view>
                    <view class="u-demo-result-line">
                        {{ checkboxValues.length ? `选中了"${checkboxValues.join(',')}"` : '请选择' }}
                    </view>
                </view>
            </view>
            <view class="u-config-wrap">
                <view class="u-config-title u-border-bottom"> 参数配置 </view>
                <view class="u-config-item">
                    <view class="u-item-title">批量操作</view>
                    <u-subsection :list="['全不选', '全选']" @change="checkedAllChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">形状</view>
                    <u-subsection :list="['方形', '圆形']" @change="shapeChange"></u-subsection>
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
                    <view class="u-item-title">默认选中第一个</view>
                    <u-subsection current="1" :list="['是', '否']" @change="defaultChooseChange"></u-subsection>
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
                    <view class="u-item-title">最大选择数量</view>
                    <u-subsection current="2" :list="['1', '2', '3']" @change="maxChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">禁用第一个</view>
                    <u-subsection current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Shape } from '@/uni_modules/uview-pro/types/global';
import { $u } from '@/uni_modules/uview-pro';

const checkboxValues = ref(['荔枝']);

const list = ref([
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
const shape = ref<Shape>('square');
const max = ref(3);
const activeColor = ref('primary');
const size = ref(34);
const wrap = ref(false);
const width = ref('auto');

function shapeChange(index: number) {
    shape.value = index === 0 ? 'square' : 'circle';
}

function sizeChange(index: number) {
    size.value = index === 0 ? 30 : index === 1 ? 40 : 50;
}

// 全选/全不选
function checkedAllChange(index: number) {
    checkboxValues.value = index === 1 ? list.value.map(item => item.value) : [];
}

function defaultChooseChange(index: number) {
    checkboxValues.value = index === 0 ? ['荔枝'] : [];
}

function maxChange(index: number) {
    max.value = index + 1;
}

function disabledChange(index: number) {
    list.value[0].disabled = index === 0;
}

function activeColorChange(index: number) {
    console.log(index, index);
    // 如果用户尚未勾选任何checkbox，切换颜色时，默认选中第一个让用户看到效果，因为勾选了才有效果
    if (!checkboxValues.value.length) checkboxValues.value = ['荔枝'];
    let theme =
        index === 0 ? 'primary' : index === 1 ? 'error' : index === 2 ? 'warning' : index === 3 ? 'success' : 'info';
    activeColor.value = $u.color[theme];
}

function checkboxChange(e) {
    console.log('checkboxChange', e);
}

function checkboxGroupChange(e) {
    console.log('checkboxGroupChange', e);
}

function widthChange(index: number) {
    width.value = index === 0 ? '50%' : '';
}

function wrapChange(index: number) {
    wrap.value = !index;
}
</script>
