<template>
    <demo-page hide-tabs hide-ad nav-title="分类">
        <view class="u-wrap">
            <view class="u-search-box">
                <u-search
                    v-model="searchText"
                    placeholder="搜索商品"
                    shape="round"
                    @search="handleSearch"
                    @custom="handleSearch"
                ></u-search>
            </view>
            <view class="u-menu-wrap">
                <scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
                    <view
                        v-for="(item, index) in tabbar"
                        :key="index"
                        class="u-tab-item"
                        :class="[current == index ? 'u-tab-item-active' : '']"
                        :data-current="index"
                        @tap.stop="switchMenu(index)"
                    >
                        <text class="u-line-1">{{ item.name }}</text>
                    </view>
                </scroll-view>
                <block v-for="(item, index) in tabbar" :key="index">
                    <scroll-view scroll-y class="right-box" v-if="current == index">
                        <view class="page-view">
                            <view class="class-item">
                                <view class="item-title">
                                    <text>{{ item.name }}</text>
                                </view>
                                <view class="item-container">
                                    <view
                                        class="thumb-box"
                                        :class="{ 'thumb-box--match': isMatch(item1) }"
                                        v-for="(item1, index1) in item.foods"
                                        :key="index1"
                                    >
                                        <image class="item-menu-image" :src="item1.icon" mode=""></image>
                                        <view
                                            class="item-menu-name"
                                            :class="{ 'item-menu-name--match': isMatch(item1) }"
                                        >
                                            {{ item1.name }}
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </block>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue';
import classifyDataRaw from '@/common/classify.data';
import { $u } from 'uview-pro';

// 分类数据类型声明
interface FoodItem {
    icon: string;
    name: string;
}
interface TabItem {
    name: string;
    foods: FoodItem[];
}

const classifyData = classifyDataRaw as TabItem[];
const instance = getCurrentInstance();
const searchText = ref('');
// 左侧菜单数据
const tabbar = ref<TabItem[]>(classifyData);
// 左侧菜单滚动条位置
const scrollTop = ref(0);
// 当前选中菜单下标
const current = ref(0);
// 左侧菜单整体高度
const menuHeight = ref(0);
// 单个菜单项高度
const menuItemHeight = ref(0);
const keyword = computed(() => searchText.value.trim().toLowerCase());

function handleSearch() {
    if (!keyword.value) return;
    const idx = tabbar.value.findIndex(item =>
        (item.foods || []).some(food => food.name.toLowerCase().includes(keyword.value))
    );
    if (idx !== -1) {
        switchMenu(idx);
    } else {
        $u.toast('没有找到该商品');
    }
}

function isMatch(food: FoodItem) {
    if (!keyword.value) return false;
    return food.name.toLowerCase().includes(keyword.value);
}

/**
 * 点击左侧菜单切换
 */
async function switchMenu(index: number) {
    if (!tabbar.value.length) return;
    if (index === current.value) return;
    current.value = index;
    // 如果为0，意味着尚未初始化
    if (menuHeight.value === 0 || menuItemHeight.value === 0) {
        await getElRect('menu-scroll-view', 'menuHeight');
        await getElRect('u-tab-item', 'menuItemHeight');
    }
    // 将菜单活动item垂直居中
    scrollTop.value = index * menuItemHeight.value + menuItemHeight.value / 2 - menuHeight.value / 2;
}

/**
 * 获取元素高度（严格 TS 类型）
 */
function getElRect(elClass: string, dataVal: 'menuHeight' | 'menuItemHeight'): Promise<void> {
    return new Promise<void>(resolve => {
        const query = uni.createSelectorQuery().in(instance?.proxy!);
        query
            .select('.' + elClass)
            .fields({ size: true }, (res: any) => {
                // TS严格：res 可能为 NodeInfo | NodeInfo[] | null，且 height 可能为 undefined
                const height = Array.isArray(res) ? res[0]?.height : res?.height;
                if (typeof height !== 'number') {
                    setTimeout(() => {
                        getElRect(elClass, dataVal);
                    }, 10);
                    return;
                }
                if (dataVal === 'menuHeight') menuHeight.value = height;
                if (dataVal === 'menuItemHeight') menuItemHeight.value = height;
                resolve();
            })
            .exec();
    });
}
</script>

<style lang="scss" scoped>
.u-wrap {
    height: 100vh;
    /* #ifdef MP-WEIXIN */
    height: calc(100vh - var(--status-bar-height) - 70px);
    /* #endif */
    /* #ifdef H5 */
    height: calc(100vh - var(--window-top) - 44px);
    /* #endif */
    display: flex;
    flex-direction: column;
}

.u-search-box {
    padding: 18rpx 30rpx;
}

.u-menu-wrap {
    flex: 1;
    display: flex;
    overflow: hidden;
}

.u-tab-view {
    width: 200rpx;
    height: 100%;
}

.u-tab-item {
    height: 110rpx;
    background: $u-bg-color;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    color: $u-main-color;
    font-weight: 400;
    line-height: 1;
}

.u-tab-item-active {
    position: relative;
    color: $u-black-color;
    font-size: 30rpx;
    font-weight: 600;
    background-color: $u-bg-white;
}

.u-tab-item-active::before {
    content: '';
    position: absolute;
    border-left: 4px solid $u-type-primary;
    height: 32rpx;
    left: 0;
    top: 39rpx;
}

.u-tab-view {
    height: 100%;
}

.right-box {
    background-color: $u-bg-white;
}

.page-view {
    padding: 16rpx;
}

.class-item {
    margin-bottom: 30rpx;
    background-color: $u-bg-white;
    padding: 16rpx;
    border-radius: 8rpx;
}

.item-title {
    font-size: 26rpx;
    color: $u-main-color;
    font-weight: bold;
}

.item-menu-name {
    font-weight: normal;
    font-size: 24rpx;
    color: $u-main-color;
}

.item-container {
    display: flex;
    flex-wrap: wrap;
}

.thumb-box {
    width: 33.333333%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20rpx;
}

.thumb-box--match {
    border: 2rpx solid $u-type-primary;
    border-radius: 12rpx;
    padding: 8rpx;
}

.item-menu-image {
    width: 120rpx;
    height: 120rpx;
}

.item-menu-name--match {
    color: $u-type-primary;
    font-weight: 700;
}
</style>
