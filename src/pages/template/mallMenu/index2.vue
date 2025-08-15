<template>
    <view class="u-wrap">
        <view class="u-search-box">
            <view class="u-search-inner">
                <u-icon name="search" color="#909399" :size="28"></u-icon>
                <text class="u-search-text">搜索</text>
            </view>
        </view>
        <view class="u-menu-wrap">
            <scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop" :scroll-into-view="itemId">
                <view v-for="(item, index) in tabbar" :key="index" class="u-tab-item" :class="[current == index ? 'u-tab-item-active' : '']" @tap.stop="swichMenu(index)">
                    <text class="u-line-1">{{ item.name }}</text>
                </view>
            </scroll-view>
            <scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box" @scroll="rightScroll">
                <view class="page-view">
                    <view class="class-item" :id="'item' + index" v-for="(item, index) in tabbar" :key="index">
                        <view class="item-title">
                            <text>{{ item.name }}</text>
                        </view>
                        <view class="item-container">
                            <view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
                                <image class="item-menu-image" :src="item1.icon" mode=""></image>
                                <view class="item-menu-name">{{ item1.name }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>
<script setup lang="ts">
import { ref, nextTick, onMounted, getCurrentInstance } from 'vue';
import classifyDataRaw from '@/common/classify.data';

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

// 左侧菜单滚动条位置
const scrollTop = ref<number>(0);
// 记录上次右侧滚动条位置
const oldScrollTop = ref<number>(0);
// 当前选中菜单下标
const current = ref<number>(0);
// 左侧菜单整体高度
const menuHeight = ref<number>(0);
// 单个菜单项高度
const menuItemHeight = ref<number>(0);
// 右侧scroll-view用于滚动的id
const itemId = ref<string>('');
// 菜单数据
const tabbar = ref<TabItem[]>(classifyData);
// 右侧每个item到顶部的距离
const menuItemPos = ref<number[]>([]);
// 右侧每个item的top数组
const arr = ref<number[]>([]);
// 右侧scroll-view的滚动条高度
const scrollRightTop = ref<number>(0);
// 节流定时器
const timer = ref<ReturnType<typeof setTimeout> | null>(null);

const instance = getCurrentInstance();

onMounted(() => {
    getMenuItemTop();
});

/**
 * 点击左侧菜单切换
 */
async function swichMenu(index: number) {
    if (arr.value.length === 0) {
        await getMenuItemTop();
    }
    if (index === current.value) return;
    scrollRightTop.value = oldScrollTop.value;
    await nextTick();
    scrollRightTop.value = arr.value[index];
    current.value = index;
    leftMenuStatus(index);
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

/**
 * 设置左侧菜单的滚动状态
 */
async function leftMenuStatus(index: number) {
    current.value = index;
    if (menuHeight.value === 0 || menuItemHeight.value === 0) {
        await getElRect('menu-scroll-view', 'menuHeight');
        await getElRect('u-tab-item', 'menuItemHeight');
    }
    scrollTop.value = index * menuItemHeight.value + menuItemHeight.value / 2 - menuHeight.value / 2;
}

/**
 * 获取右侧每个item到顶部的距离（严格 TS 类型）
 */
function getMenuItemTop(): Promise<void> {
    return new Promise<void>(resolve => {
        const selectorQuery = uni.createSelectorQuery().in(instance?.proxy!);
        selectorQuery
            .selectAll('.class-item')
            .boundingClientRect((rects: any) => {
                // rects 可能为 NodeInfo[] 或 NodeInfo | null
                if (!rects || !Array.isArray(rects) || !rects.length) {
                    setTimeout(() => {
                        getMenuItemTop();
                    }, 10);
                    return;
                }
                arr.value = [];
                rects.forEach((rect: any, i: number) => {
                    arr.value.push(rect.top - rects[0].top);
                });
                resolve();
            })
            .exec();
    });
}

/**
 * 右侧菜单滚动事件
 */
async function rightScroll(e: { detail: { scrollTop: number } }) {
    oldScrollTop.value = e.detail.scrollTop;
    if (arr.value.length === 0) {
        await getMenuItemTop();
    }
    if (timer.value) return;
    if (!menuHeight.value) {
        await getElRect('menu-scroll-view', 'menuHeight');
    }
    timer.value = setTimeout(() => {
        timer.value = null;
        const scrollHeight = e.detail.scrollTop + menuHeight.value / 2;
        for (let i = 0; i < arr.value.length; i++) {
            const height1 = arr.value[i];
            const height2 = arr.value[i + 1];
            if (!height2 || (scrollHeight >= height1 && scrollHeight < height2)) {
                leftMenuStatus(i);
                return;
            }
        }
    }, 10);
}
</script>

<style lang="scss" scoped>
.u-wrap {
    height: calc(100vh);
    /* #ifdef H5 */
    height: calc(100vh - var(--window-top));
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

.u-search-inner {
    background-color: rgb(234, 234, 234);
    border-radius: 100rpx;
    display: flex;
    align-items: center;
    padding: 10rpx 16rpx;
}

.u-search-text {
    font-size: 26rpx;
    color: $u-tips-color;
    margin-left: 10rpx;
}

.u-tab-view {
    width: 200rpx;
    height: 100%;
}

.u-tab-item {
    height: 110rpx;
    background: #f6f6f6;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    color: #444;
    font-weight: 400;
    line-height: 1;
}

.u-tab-item-active {
    position: relative;
    color: #000;
    font-size: 30rpx;
    font-weight: 600;
    background: #fff;
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
    background-color: rgb(250, 250, 250);
}

.page-view {
    padding: 16rpx;
}

.class-item {
    margin-bottom: 30rpx;
    background-color: #fff;
    padding: 16rpx;
    border-radius: 8rpx;
}

.class-item:last-child {
    min-height: 100vh;
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

.item-menu-image {
    width: 120rpx;
    height: 120rpx;
}
</style>
