<template>
    <view class="wrap">
        <page-nav :desc="desc" title="nav.components"></page-nav>
        <view class="list-wrap">
            <u-collapse :item-style="itemStyle" event-type="close" :arrow="true" :accordion="true">
                <u-collapse-item :index="index" v-for="(item, index) in list" :key="index" :open="true">
                    <template #title>
                        <view class="group-title">
                            <!-- <image style="width: 30rpx" :src="getIcon(item.icon)" mode="widthFix"></image> -->
                            <text>{{ getGroupTitle(item) }}（{{ item.list.length }}）</text>
                        </view>
                    </template>
                    <demo-card :list="item.list" />
                </u-collapse-item>
            </u-collapse>
        </view>
        <u-gap height="70"></u-gap>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import rawList from './components.config';
import { onShareAppMessage } from '@dcloudio/uni-app';

// 组件数据
const itemStyle = {
    border: '1px solid rgb(230, 230, 230)',
    marginTop: '20px',
    padding: '15rpx 20rpx',
    borderRadius: '8px'
};
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
 * 分享
 */
onShareAppMessage(res => {
    return {
        title: 'uView Pro - 组件示例',
        path: '/pages/example/components'
    };
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
