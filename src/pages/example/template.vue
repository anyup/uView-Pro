<template>
    <view>
        <page-nav :desc="desc" title="nav.template"></page-nav>
        <view class="u-p-30">
            <view :index="index" v-for="(item, index) in list" :key="index">
                <view class="u-m-b-20">
                    <u-section :title="getGroupTitle(item)" color="#16a085" :right="false"></u-section>
                </view>
                <demo-card :list="item.list" :openPage="openPage"></demo-card>
            </view>
        </view>
        <u-gap height="70"></u-gap>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import rawList from './template.config';
import { onShareAppMessage } from '@dcloudio/uni-app';

const list = ref<any[]>(Array.isArray(rawList) ? rawList : []);

// 国际化
const { t, locale } = useI18n();

// 组件描述
const desc = computed(() => t('template.desc'));

function openPage(path: string) {
    uni.navigateTo({
        url: path.indexOf('/page') == 0 ? path : '/pages/template/' + path + '/index'
    });
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
        title: 'uView Pro - 模版示例',
        path: '/pages/example/template'
    };
});

// 设置导航栏标题
onMounted(() => {
    uni.setNavigationBarTitle({
        title: t('nav.template')
    });
});
</script>

<style lang="scss" scoped>
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
