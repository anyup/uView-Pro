<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-demo-result-line">{{ input ? input : 'Picker值' }}</view>
                <u-picker
                    :mode="mode"
                    :defaultTime="defaultTime"
                    v-model="show"
                    :defaultRegion="defaultRegion"
                    :params="params"
                    end-year="2030"
                    @confirm="confirm"
                    :defaultSelector="defaultSelector"
                    :range="range"
                    :range-key="rangKey"
                    @columnchange="columnchange"
                ></u-picker>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom">参数配置</view>
            <view class="u-config-item">
                <view class="u-item-title">Picker开关</view>
                <u-subsection :current="status" :list="['显示', '隐藏']" @change="statusChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">模式选择</view>
                <u-subsection :list="['单列', '多列', '时间', '地区']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">默认时间</view>
                <u-subsection :list="['2019-12-11 20:15:35', '2020-02-05 13:09:42']" @change="defaultTimeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">显示时分秒</view>
                <u-subsection :list="['显示', '隐藏']" @change="minSecChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">默认地区</view>
                <u-subsection :list="['广东-深圳-宝安', '海南-三亚-海棠']" @change="defaultRegionChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { PickerMode } from '@/uni_modules/uview-pro/types/global';

const show = ref(false);
const input = ref<string | string[]>('');
const range = ref<string[] | string[][]>(['一', '片', '冰', '心', '在', '玉', '壶']);
const rangKey = ref('name');
const mode = ref<PickerMode>('selector');
const defaultTime = ref('2019-12-11 20:15:35');
const defaultSelector = ref([0]);
const defaultRegion = ref(['广东省', '深圳市', '宝安区']);
const params = ref({
    year: true,
    month: true,
    day: true,
    hour: true,
    minute: true,
    second: true,
    province: true,
    city: true,
    area: true,
    timestamp: true
});

const status = computed(() => (show.value === true ? 0 : 1));

function statusChange(index: number) {
    show.value = index === 0;
}

function modeChange(index: number) {
    mode.value = ['selector', 'multiSelector', 'time', 'region'][index] as PickerMode;
    if (mode.value == 'selector') {
        range.value = ['一', '片', '冰', '心', '在', '玉', '壶'];
        defaultSelector.value = [0];
    }
    if (mode.value == 'multiSelector') {
        range.value = [
            ['亚洲', '欧洲'],
            ['中国', '日本'],
            ['北京', '上海', '广州']
        ];
        defaultSelector.value = [0, 0, 0];
    }
    show.value = true;
}

function defaultTimeChange(index: number) {
    defaultTime.value = index == 0 ? '2019-12-11 20:15:35' : '2020-02-05 13:09:42';
    mode.value = 'time';
    show.value = true;
}

function defaultRegionChange(index: number) {
    defaultRegion.value = index == 0 ? ['广东省', '深圳市', '宝安区'] : ['海南省', '三亚市', '海棠区'];
    mode.value = 'region';
    show.value = true;
}

function minSecChange(index: number) {
    if (index === 0) {
        params.value.hour = true;
        params.value.minute = true;
        params.value.second = true;
    }
    if (index === 1) {
        params.value.hour = false;
        params.value.minute = false;
        params.value.second = false;
    }
    mode.value = 'time';
    show.value = true;
}

function confirm(e) {
    input.value = '';
    if (mode.value == 'time') {
        if (params.value.year) input.value += e.year;
        if (params.value.month) input.value += '-' + e.month;
        if (params.value.day) input.value += '-' + e.day;
        if (params.value.hour) input.value += ' ' + e.hour;
        if (params.value.minute) input.value += ':' + e.minute;
        if (params.value.second) input.value += ':' + e.second;
    } else if (mode.value == 'region') {
        input.value = e.province.label + '-' + e.city.label + '-' + e.area.label;
    } else if (mode.value == 'selector') {
        input.value = range.value[e[0]];
    } else if (mode.value == 'multiSelector') {
        input.value = range.value[0][e[0]] + '-' + range.value[1][e[1]] + '-' + range.value[2][e[2]];
    }
}

function columnchange(e) {
    let column = e.column,
        index = e.index;
    defaultSelector.value[column] = index;
    switch (column) {
        case 0:
            switch (index) {
                case 0:
                    range.value[1] = ['中国', '日本'];
                    range.value[2] = ['北京', '上海', '广州'];
                    break;
                case 1:
                    range.value[1] = ['英国', '法国'];
                    range.value[2] = ['伦敦', '曼彻斯特'];
                    break;
            }
            defaultSelector.value.splice(1, 1, 0);
            defaultSelector.value.splice(2, 1, 0);
            break;
        case 1: //拖动第2列
            switch (
                defaultSelector.value[0] //判断第一列是什么
            ) {
                case 0:
                    switch (defaultSelector.value[1]) {
                        case 0:
                            range.value[2] = ['北京', '上海', '广州'];
                            break;
                        case 1:
                            range.value[2] = ['东京', '北海道'];
                            break;
                    }
                    break;
                case 1:
                    switch (defaultSelector.value[1]) {
                        case 0:
                            range.value[2] = ['伦敦', '曼彻斯特'];
                            break;
                        case 1:
                            range.value[2] = ['巴黎', '马赛'];
                            break;
                    }
                    break;
            }
            defaultSelector.value.splice(2, 1, 0);
            break;
    }
}
</script>

<style lang="scss" scoped>
.input {
    border: 1px solid $u-light-color;
    border-radius: 4px;
    margin-bottom: 20px;
    height: 30px;
    font-size: 26rpx;
    flex: 1;
}

.input-wrap {
    display: flex;
}
</style>
