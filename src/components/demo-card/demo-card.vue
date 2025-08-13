<template>
    <view class="card-list">
        <view
            hover-class="none"
            :url="item.path"
            class="card-item"
            :style="{ backgroundColor: navColors[item.path] }"
            v-for="(item, index) in list"
            :key="index"
            @click="navigateTo(item.path)"
        >
            <demo-animation name="slide-bottom" :delay="1">
                <view class="card-item-title" style="color: #fff">{{ getFieldTitle(item) }}</view>
                <view class="card-item-name" style="color: #fff">Go ></view>
                <!-- <image style="width: 30rpx" :src="getIcon(item.icon)" mode="widthFix"></image> -->
            </demo-animation>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    list: {
        type: Array as () => any[],
        default: () => {
            return [];
        }
    },
    openPage: {
        type: Function,
        default: undefined
    }
});

const emit = defineEmits(['item-click']);

// 国际化
const { t, locale } = useI18n();

// 存储每个item的随机背景色
const navColors = ref<Record<string, string>>({});
/**
 * 生成随机浅色背景
 */
function getRandomColor() {
    const colors = ['#39b54a', '#f39c12', '#3498db', '#e74c3c', '#9b59b6', '#16a085', '#e67e22', '#2ecc71', '#1abc9c', '#34495e'];
    return colors[Math.floor(Math.random() * colors.length)];
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

/**
 * 路由跳转
 */
function navigateTo(path: string) {
    if (props.openPage) {
        props.openPage(path);
        return;
    }
    uni.navigateTo({ url: path });
}

onMounted(() => {
    // 为每个item分配随机背景色
    props.list.forEach((item: any) => {
        navColors.value[item.path] = getRandomColor();
    });
});
</script>

<style lang="scss" scoped>
.card-list {
    display: flex;
    flex-wrap: wrap;
    gap: 40rpx;
    justify-content: space-between;
    margin-bottom: 40rpx;
}

.card-item {
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

.card-item::after {
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

.card-item.cur {
    color: #fff;
    background: rgb(94, 185, 94);
    box-shadow: 4rpx 4rpx 6rpx rgba(94, 185, 94, 0.4);
}

.card-item-title {
    font-size: 26rpx;
    font-weight: 400;
    height: 80rpx;
    max-height: 80rpx;
}

.card-item-title::first-letter {
    font-size: 30rpx;
    margin-right: 4rpx;
}

.card-item-name {
    font-size: 24rpx;
    text-transform: Capitalize;
    position: relative;
}

.card-item-name::before {
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

.card-item-name::after {
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

.card-item-name::first-letter {
    font-weight: bold;
    font-size: 30rpx;
    margin-right: 1px;
}

.card-item image {
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
