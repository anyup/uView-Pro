<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view>
                    <u-checkbox-group :size="size" :width="width" :wrap="wrap" :max="max" @change="checkboxGroupChange" :activeColor="activeColor">
                        <u-checkbox
                            @change="checkboxChange"
                            v-model="item.checked"
                            v-for="(item, index) in list"
                            :key="index"
                            :name="item.name"
                            :shape="shape"
                            :disabled="item.disabled"
                            >{{ item.name }}</u-checkbox
                        >
                    </u-checkbox-group>
                </view>
                <view class="u-demo-result-line">
                    {{ result.length ? `选中了"${getResult}"` : '请选择' }}
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
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
                <u-subsection :list="['primary', 'error', 'warning', 'success', 'info']" @change="activeColorChange"></u-subsection>
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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Shape } from '@/uni_modules/uview-pro/types/global';
import { $u } from '@/uni_modules/uview-pro';

const list = ref([
    {
        name: '荔枝',
        checked: false,
        disabled: false
    },
    {
        name: '香蕉',
        checked: false,
        disabled: false
    },
    {
        name: '橙子',
        checked: false,
        disabled: false
    },
    {
        name: '草莓',
        checked: false,
        disabled: false
    }
]);
const result = ref([]);
const shape = ref<Shape>('square');
const max = ref(3);
const activeColor = ref('primary');
const size = ref(34);
const wrap = ref(false);
const width = ref('auto');

const getResult = computed(() => result.value.join(','));

function shapeChange(index: number) {
    shape.value = index === 0 ? 'square' : 'circle';
}

function sizeChange(index: number) {
    size.value = index === 0 ? 30 : index === 1 ? 40 : 50;
}

function defaultChooseChange(index: number) {
    // 特别处理对第一个选的选中的情况，涉及到提示语，选中状态等
    // 实际开发中不会存在这些情况，只是演示用
    list.value = list.value.map(item => {
        item.checked = false;
        return item;
    });
    if (index === 0) {
        list.value[0].checked = true;
        result.value = [list.value[0].name];
    } else {
        list.value[0].checked = false;
        result.value.splice(result.value.indexOf(list.value[0].name), 1);
    }
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
    if (!result.value.length) list.value[0].checked = true;
    let theme = index === 0 ? 'primary' : index === 1 ? 'error' : index === 2 ? 'warning' : index === 3 ? 'success' : 'info';
    activeColor.value = $u.color[theme];
}

function checkboxChange(e) {
    console.log(e);
}

function checkboxGroupChange(e) {
    result.value = e;
    console.log(e);
}

function widthChange(index: number) {
    width.value = index === 0 ? '50%' : '';
}

function wrapChange(index: number) {
    wrap.value = !index;
}
</script>
