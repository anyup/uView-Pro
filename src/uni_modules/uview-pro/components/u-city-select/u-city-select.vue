<template>
    <u-popup
        v-model="popupValue"
        mode="bottom"
        :popup="false"
        :mask="true"
        :closeable="true"
        :safe-area-inset-bottom="true"
        close-icon-color="#ffffff"
        :z-index="uZIndex"
        :maskCloseAble="props.maskCloseAble"
        @close="close"
    >
        <u-tabs v-if="popupValue" :list="genTabsList" :is-scroll="true" :current="tabsIndex" @change="tabsChange" ref="tabs"></u-tabs>
        <view class="area-box">
            <view class="u-flex" :class="{ change: isChange }">
                <!-- 省 -->
                <view class="area-item">
                    <view class="u-padding-10 u-bg-gray" style="height: 100%">
                        <scroll-view :scroll-y="true" style="height: 100%">
                            <u-cell-group>
                                <u-cell-item v-for="(item, index) in provincesList" :title="item.label" :arrow="false" :index="index" :key="index" @click="provinceChange(index)">
                                    <template v-if="isChooseP && province === index" #right-icon>
                                        <u-icon size="34" name="checkbox-mark"></u-icon>
                                    </template>
                                </u-cell-item>
                            </u-cell-group>
                        </scroll-view>
                    </view>
                </view>
                <!-- 市 -->
                <view class="area-item">
                    <view class="u-padding-10 u-bg-gray" style="height: 100%">
                        <scroll-view :scroll-y="true" style="height: 100%">
                            <u-cell-group v-if="isChooseP">
                                <u-cell-item v-for="(item, index) in citys" :title="item.label" :arrow="false" :index="index" :key="index" @click="cityChange(index)">
                                    <template v-if="isChooseC && city === index" #right-icon>
                                        <u-icon size="34" name="checkbox-mark"></u-icon>
                                    </template>
                                </u-cell-item>
                            </u-cell-group>
                        </scroll-view>
                    </view>
                </view>
                <!-- 区 -->
                <view class="area-item">
                    <view class="u-padding-10 u-bg-gray" style="height: 100%">
                        <scroll-view :scroll-y="true" style="height: 100%">
                            <u-cell-group v-if="isChooseC">
                                <u-cell-item v-for="(item, index) in areas" :title="item.label" :arrow="false" :index="index" :key="index" @click="areaChange(index)">
                                    <template v-if="isChooseA && area === index" #right-icon>
                                        <u-icon size="34" name="checkbox-mark"></u-icon>
                                    </template>
                                </u-cell-item>
                            </u-cell-group>
                        </scroll-view>
                    </view>
                </view>
            </view>
        </view>
    </u-popup>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import provinces from '../../libs/util/province';
import citysData from '../../libs/util/city';
import areasData from '../../libs/util/area';
import { CitySelectProps } from './types';

defineOptions({
    name: 'u-city-select'
});

/**
 * u-city-select 城市选择器
 * @description 用于选择省、市、区三级行政区域，支持回显和自定义初始值。
 * @property {Boolean} modelValue 控制弹窗显示与隐藏（v-model）
 * @property {Array} defaultRegion 默认选中的省市区名称数组，如 ['广东省', '广州市', '天河区']
 * @property {Array} areaCode 默认选中的省市区编码数组，如 ['440000', '440100', '440106']
 * @property {Boolean} maskCloseAble 是否允许点击遮罩关闭弹窗（默认 true）
 * @property {String|Number} zIndex 弹窗层级（默认 0，自动适配）
 * @event update:modelValue v-model 绑定值变化时触发
 * @event city-change 选择省市区后触发，返回选中的省市区对象
 * @example <u-city-select v-model="show" :defaultRegion="['广东省','广州市','天河区']" @city-change="onChange"></u-city-select>
 */
const props = defineProps(CitySelectProps);

// emits 定义
const emit = defineEmits(['update:modelValue', 'city-change']);

// 省市区选择相关响应式数据
const cityValue = ref('');
const isChooseP = ref(false); // 是否已选省
const province = ref(0); // 省下标
const provincesList = ref(provinces);
const isChooseC = ref(false); // 是否已选市
const city = ref(0); // 市下标
const citys = ref(citysData[0]);
const isChooseA = ref(false); // 是否已选区
const area = ref(0); // 区下标
const areas = ref(areasData[0][0]);
const tabsIndex = ref(0);

// v-model 双向绑定
const popupValue = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val)
});

// 是否切换到区级
const isChange = computed(() => tabsIndex.value > 1);

// 顶部 tab 列表
const genTabsList = computed(() => {
    const tabsList = [{ name: '请选择' }];
    if (isChooseP.value) {
        tabsList[0].name = provincesList.value[province.value].label;
        tabsList[1] = { name: '请选择' };
    }
    if (isChooseC.value) {
        tabsList[1].name = citys.value[city.value].label;
        tabsList[2] = { name: '请选择' };
    }
    if (isChooseA.value) {
        tabsList[2].name = areas.value[area.value].label;
    }
    return tabsList;
});

// z-index 计算
const uZIndex = computed(() => (props.zIndex ? props.zIndex : (uni as any).$u?.zIndex?.popup || 1075));

// 初始化选中项
function init() {
    if (props.areaCode.length === 3) {
        setProvince('', props.areaCode[0]);
        setCity('', props.areaCode[1]);
        setArea('', props.areaCode[2]);
    } else if (props.defaultRegion.length === 3) {
        setProvince(props.defaultRegion[0], '');
        setCity(props.defaultRegion[1], '');
        setArea(props.defaultRegion[2], '');
    }
}

// 选中省
function setProvince(label = '', value = '') {
    provincesList.value.forEach((v, k) => {
        if (value ? v.value == value : v.label == label) {
            provinceChange(k);
        }
    });
}
// 选中市
function setCity(label = '', value = '') {
    citys.value.forEach((v, k) => {
        if (value ? v.value == value : v.label == label) {
            cityChange(k);
        }
    });
}
// 选中区
function setArea(label = '', value = '') {
    areas.value.forEach((v, k) => {
        if (value ? v.value == value : v.label == label) {
            isChooseA.value = true;
            area.value = k;
        }
    });
}

// 关闭弹窗
function close() {
    emit('update:modelValue', false);
}
// tab 切换
function tabsChange(index: number) {
    tabsIndex.value = index;
}
// 省点击
function provinceChange(index: number) {
    isChooseP.value = true;
    isChooseC.value = false;
    isChooseA.value = false;
    province.value = index;
    citys.value = citysData[index];
    tabsIndex.value = 1;
}
// 市点击
function cityChange(index: number) {
    isChooseC.value = true;
    isChooseA.value = false;
    city.value = index;
    areas.value = areasData[province.value][index];
    tabsIndex.value = 2;
}
// 区点击
function areaChange(index: number) {
    isChooseA.value = true;
    area.value = index;
    const result = {
        province: provincesList.value[province.value],
        city: citys.value[city.value],
        area: areas.value[area.value]
    };
    emit('city-change', result);
    close();
}

// 挂载时初始化
onMounted(init);
</script>

<style lang="scss">
.area-box {
    width: 100%;
    overflow: hidden;
    height: 800rpx;

    > view {
        width: 150%;
        transition: transform 0.3s ease-in-out 0s;
        transform: translateX(0);

        &.change {
            transform: translateX(-33.3333333%);
        }
    }

    .area-item {
        width: 33.3333333%;
        height: 800rpx;
    }
}
</style>
