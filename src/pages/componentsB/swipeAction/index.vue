<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-swipe-action
                    bg-color="rgb(250, 250, 250)"
                    @open="open"
                    :disabled="disabled"
                    :index="index"
                    v-for="(item, index) in list"
                    :key="item.id"
                    :show="item.show"
                    @click="click"
                    :btn-width="btnWidth"
                    @close="close"
                    :options="options"
                    @content-click="contentClick"
                >
                    <view class="item u-border-bottom">
                        <image mode="aspectFill" :src="item.images" />
                        <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
                        <view class="title-wrap">
                            <text class="title u-line-2">{{ item.title }}</text>
                        </view>
                    </view>
                </u-swipe-action>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom">参数配置</view>
            <view class="u-config-item">
                <view class="u-item-title">状态(操作第一个)</view>
                <u-subsection :current="1" :list="['打开', '关闭']" @change="showChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">禁止滑动</view>
                <u-subsection :current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, nextTick } from 'vue';
import { $u } from '@/uni_modules/uview-pro';
defineOptions({ name: 'SwipeActionDemo' });

/**
 * 演示 swipeAction 组件的使用
 * 包含参数配置、事件处理等
 */

interface ListItem {
    id: number;
    title: string;
    images: string;
    show: boolean;
}

const list1 = ref<ListItem[]>([
    {
        id: 1,
        title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
        images: 'https://ik.imagekit.io/anyup/uview-pro/common/logo.png',
        show: false
    },
    {
        id: 2,
        title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
        images: 'https://ik.imagekit.io/anyup/uview-pro/common/logo.png',
        show: false
    },
    {
        id: 3,
        title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
        images: 'https://ik.imagekit.io/anyup/uview-pro/common/logo.png',
        show: false
    }
]);

const list = ref<ListItem[]>([]);
const disabled = ref(false);
const btnWidth = ref<number>(180);
const show = ref(false);
const options = ref([
    {
        text: '收藏',
        style: {
            backgroundColor: '#007aff'
        }
    },
    {
        text: '删除',
        style: {
            backgroundColor: '#dd524d'
        }
    }
]);

// 页面加载时初始化数据
onLoad(() => {
    nextTick(() => {
        list.value = list1.value.map(item => ({ ...item }));
    });
});

/**
 * 禁止滑动切换
 */
function disabledChange(index: number) {
    disabled.value = index === 0;
}

/**
 * 状态切换（操作第一个）
 */
function showChange(index: number) {
    if (index === 0) {
        list.value.forEach((val, ids) => {
            val.show = ids === 0;
        });
    } else {
        if (list.value[0]) list.value[0].show = false;
    }
}

/**
 * 按钮点击事件
 */
function click(index: number, index1: number) {
    if (index1 === 1) {
        list.value.splice(index, 1);
        $u.toast(`删除了第${index + 1}个cell`);
    } else {
        if (list.value[index]) list.value[index].show = false;
        $u.toast('收藏成功');
    }
}

/**
 * 打开事件
 */
function open(index: number) {
    list.value[index].show = false;
    list.value.forEach((val, idx) => {
        val.show = idx === index;
    });
}

/**
 * 关闭事件
 */
function close(index: number) {
    if (list.value[index]) list.value[index].show = false;
}

/**
 * 内容点击事件
 */
function contentClick(index: number) {
    // 可扩展内容点击逻辑
}
</script>

<style lang="scss" scoped>
.item {
    display: flex;
    padding: 20rpx;
}

image {
    width: 120rpx;
    flex: 0 0 120rpx;
    height: 120rpx;
    margin-right: 20rpx;
    border-radius: 12rpx;
}

.title {
    text-align: left;
    font-size: 28rpx;
    color: $u-content-color;
    margin-top: 20rpx;
}
</style>
