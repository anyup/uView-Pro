<template>
    <view class="wrap">
        <page-nav :desc="desc" title="nav.components"></page-nav>
        <view class="list-wrap">
            <u-collapse :item-style="itemStyle" event-type="close" :arrow="true" :accordion="true">
                <u-collapse-item :index="index" v-for="(item, index) in list" :key="index">
                    <template #title>
                        <view class="group-title">
                            <image style="width: 30rpx" :src="getIcon(item.icon)" mode="widthFix"></image>
                            <text>{{ getGroupTitle(item) }}（{{ item.list.length }}）</text>
                        </view>
                    </template>
                    <view class="nav-list">
                        <navigator
                            hover-class="none"
                            :url="item1.path"
                            class="nav-li"
                            :style="{ backgroundColor: navColors[item1.path] }"
                            navigateTo
                            v-for="(item1, index1) in item.list"
                            :key="index1"
                        >
                            <view>
                                <view class="nav-title" style="color: #fff">{{ getFieldTitle(item1) }}</view>
                                <view class="nav-name" style="color: #fff">Go ></view>
                                <!-- <image style="width: 30rpx" :src="getIcon(item1.icon)" mode="widthFix"></image> -->
                            </view>
                        </navigator>
                    </view>
                </u-collapse-item>
            </u-collapse>
        </view>
        <u-gap height="70"></u-gap>
        <!-- <u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar> -->
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import rawList from './components.config';

/**
 * 生成随机浅色背景
 */
function getRandomColor() {
    const colors = ['#39b54a', '#f39c12', '#3498db', '#e74c3c', '#9b59b6', '#16a085', '#e67e22', '#2ecc71', '#1abc9c', '#34495e'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 组件数据
const itemStyle = {
    border: '1px solid rgb(230, 230, 230)',
    marginTop: '20px',
    padding: '15rpx 20rpx',
    borderRadius: '8px'
};
const navColors = ref<Record<string, string>>({}); // 存储每个item的随机背景色
const list = ref<any[]>(Array.isArray(rawList) ? rawList : []); // 明确类型 any[]

// 国际化
const { t, locale } = useI18n();

// 获取图标地址
const getIcon = (path: string) => {
    return 'https://ik.imagekit.io/anyup/uview-pro/example/' + path + '.png';
};

// 组件描述
const desc = computed(() => t('components.desc'));

// 设置导航栏标题
onMounted(() => {
    uni.setNavigationBarTitle({
        title: t('nav.components')
    });
    // 为每个item分配随机背景色
    list.value.forEach((group: any) => {
        group.list.forEach((item: any) => {
            navColors.value[item.path] = getRandomColor();
        });
    });
});

/**
 * 路由跳转
 */
function openPage(path: string) {
    // 兼容所有平台的跳转
    uni.navigateTo({ url: path });
}

/**
 * 获取分组标题（中英文）
 */
function getGroupTitle(item: any) {
    return locale.value === 'zh-Hans' ? item.groupName : item.groupName_en;
}

/**
 * 获取字段标题（中英文）
 */
function getFieldTitle(item: any) {
    return locale.value === 'zh-Hans' ? item.title : item.title_en;
}

// 导出给模板使用
</script>

<style lang="scss" scoped>
.u-cell-icon {
    width: 36rpx;
    height: 36rpx;
    margin-right: 8rpx;
}

.list-wrap {
    padding: 0 30rpx;
}

.group-title {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    height: 50rpx;
    image {
        margin-right: 20rpx;
    }
}

.nav-list {
    display: flex;
    flex-wrap: wrap;
    gap: 40rpx;
    justify-content: space-between;
    margin-bottom: 40rpx;
}

.nav-li {
    box-sizing: border-box;
    padding: 20rpx 30rpx;
    border-radius: 8px;
    width: calc(50% - 22rpx);
    min-width: 160rpx;
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;
    background-image: url(https://ik.imagekit.io/anyup/uview-pro/common/bg-item.png);
    transition: background 0.3s;
    /* #ifdef APP-PLUS */
    margin-bottom: 40rpx;
    /* #endif */
}

.nav-li::after {
    content: '';
    position: absolute;
    z-index: -1;
    background-color: inherit;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: -10%;
    border-radius: 10rpx;
    opacity: 0.2;
    transform: scale(0.9, 0.9);
}

.nav-li.cur {
    color: #fff;
    background: rgb(94, 185, 94);
    box-shadow: 4rpx 4rpx 6rpx rgba(94, 185, 94, 0.4);
}

.nav-title {
    font-size: 26rpx;
    font-weight: 400;
    height: 80rpx;
    max-height: 80rpx;
}

.nav-title::first-letter {
    font-size: 30rpx;
    margin-right: 4rpx;
}

.nav-name {
    font-size: 24rpx;
    text-transform: Capitalize;
    position: relative;
}

.nav-name::before {
    content: '';
    position: absolute;
    display: block;
    width: 40rpx;
    height: 6rpx;
    background: #fff;
    bottom: 0;
    right: 0;
    opacity: 0.5;
}

.nav-name::after {
    content: '';
    position: absolute;
    display: block;
    width: 100rpx;
    height: 1px;
    background: #fff;
    bottom: 0;
    right: 40rpx;
    opacity: 0.3;
}

.nav-name::first-letter {
    font-weight: bold;
    font-size: 30rpx;
    margin-right: 1px;
}

.nav-li image {
    position: absolute;
    right: 10rpx;
    top: 10rpx;
    font-size: 52rpx;
    width: 60rpx;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
}
</style>
