<template>
    <view class="wrap">
        <page-nav :desc="desc" title="nav.components" :index="0"></page-nav>
        <view class="list-wrap">
            <u-collapse :item-style="itemStyle" event-type="close" :arrow="true" :accordion="false">
                <u-collapse-item :index="index" v-for="(item, index) in list" :key="index" :open="true">
                    <template #title>
                        <view class="group-title">
                            <!-- #ifndef MP-WEIXIN -->
                            <image style="width: 30rpx" :src="getIcon(item.icon)" mode="widthFix"></image>
                            <!-- #endif -->
                            <text>{{ getTitle('groupName', item) }}（{{ item.list.length }}）</text>
                        </view>
                    </template>
                    <demo-card :list="item.list" />
                </u-collapse-item>
            </u-collapse>
        </view>
        <u-gap height="70"></u-gap>
        <u-back-top :scroll-top="scrollTop" mode="square" />
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import rawList from './components.config';
import { onPageScroll, onShareAppMessage, onShow } from '@dcloudio/uni-app';
import { useTitle } from '@/common/util';

// 组件数据
const itemStyle = {
    border: '1px solid rgb(230, 230, 230)',
    marginTop: '20px',
    padding: '15rpx 20rpx',
    borderRadius: '8px'
};
const list = ref<any[]>(Array.isArray(rawList) ? rawList : []); // 明确类型 any[]
const scrollTop = ref(0);
// 国际化
const { t, locale } = useI18n();
const { setTitle, getTitle } = useTitle(0);

// 获取图标地址
const getIcon = (path: string) => {
    return 'https://ik.imagekit.io/anyup/uview-pro/example/' + path + '.png';
};

// 组件描述
const desc = computed(() => t('components.desc'));

/**
 * 路由跳转
 */
function openPage(path: string) {
    // 兼容所有平台的跳转
    uni.navigateTo({ url: path });
}

/**
 * 分享
 */
onShareAppMessage(res => {
    return {
        title: 'uView Pro - 组件示例',
        path: '/pages/example/components'
    };
});

// 页面滚动事件处理
onPageScroll(e => {
    scrollTop.value = e.scrollTop;
});

// 设置标题
onShow(() => {
    setTitle();
});
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
</style>
