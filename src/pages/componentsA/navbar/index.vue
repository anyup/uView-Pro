<template>
    <view>
        <u-navbar
            title-color="#fff"
            back-icon-color="#ffffff"
            :is-fixed="isFixed"
            :is-back="isBack"
            :background="background"
            :back-text-style="{ color: '#fff' }"
            :title="title"
            :back-icon-name="backIconName"
            :back-text="backText"
            :custom-back="customBack"
        >
            <view class="slot-wrap" v-if="useSlot">
                <view class="search-wrap" v-if="search">
                    <!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
                    <u-search v-model="keyword" :show-action="showAction" height="56" :action-style="{ color: '#fff' }"></u-search>
                </view>
                <view class="navbar-right" v-if="rightSlot">
                    <view class="message-box right-item">
                        <u-icon name="chat" size="38"></u-icon>
                        <u-badge count="18" size="mini" :offset="[-15, -15]"></u-badge>
                    </view>
                    <view class="dot-box right-item">
                        <u-icon name="calendar-fill" size="38"></u-icon>
                        <u-badge size="mini" :is-dot="true" :offset="[-6, -6]"></u-badge>
                    </view>
                </view>
                <view class="map-wrap" v-if="custom">
                    <u-icon name="map" color="#ffffff" size="24"></u-icon>
                    <text class="map-wrap-text">轻舟已过万重山</text>
                    <u-icon name="arrow-down-fill" color="#ffffff" size="22"></u-icon>
                </view>
            </view>
            <template #right v-if="rightSlot">
                <view class="navbar-right">
                    <view class="message-box right-item">
                        <u-icon name="chat" size="38"></u-icon>
                        <u-badge count="18" size="mini" :offset="[-15, -15]"></u-badge>
                    </view>
                    <view class="dot-box right-item">
                        <u-icon name="calendar-fill" size="38"></u-icon>
                        <u-badge size="mini" :is-dot="true" :offset="[-6, -6]"></u-badge>
                    </view>
                </view>
            </template>
        </u-navbar>
        <view class="u-demo">
            <view class="u-demo-wrap">
                <view class="u-demo-title">演示效果</view>
                <view class="u-demo-area">
                    <u-toast ref="uToast"></u-toast>
                    <view class="u-no-demo-here">查看顶部导航栏效果</view>
                </view>
            </view>
            <view class="u-config-wrap">
                <view class="u-config-title u-border-bottom"> 参数配置 </view>
                <view class="u-config-item">
                    <view class="u-item-title">标题长度</view>
                    <u-subsection :list="['短', '中', '长']" @change="titleChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">隐藏左侧返回区域</view>
                    <u-subsection current="1" :list="['是', '否']" @change="backChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">自定义左侧内容</view>
                    <u-subsection current="1" :list="['是', '否']" @change="leftChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">自定义右侧内容</view>
                    <u-subsection :current="slotRightCurrent" :list="['是', '否']" @change="rightChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">传入整体slot</view>
                    <u-subsection :list="['无', '搜索框', '搜索+按钮', '搜索+图标']" @change="searchChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">完全自定义传入内容</view>
                    <u-subsection current="1" :list="['是', '否']" @change="customChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">背景色</view>
                    <u-subsection :list="['渐变', '#39CCCC', '#B471CC', '#001f3f']" @change="bgColorChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">自定义返回事件</view>
                    <u-subsection current="1" :list="['是', '否']" @change="customBackChange"></u-subsection>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const title = ref<string | null>('新闻');
const backText = ref<string>('返回');
const backIconName = ref<string>('nav-back');
const right = ref<boolean>(false);
const showAction = ref<boolean>(false);
const rightSlot = ref<boolean>(false);
const useSlot = ref<boolean>(false);
const background = ref<Record<string, string>>({
    'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
});
const isBack = ref<boolean>(true);
const search = ref<boolean>(false);
const custom = ref<boolean>(false);
const isFixed = ref<boolean>(true);
const keyword = ref<string>('');

// #ifdef MP
rightSlot.value = false;
// #endif
// #ifndef MP
rightSlot.value = true;
// #endif

const customBack = ref<(() => void) | null>(null);
const uToast = ref<any>(null);

const slotRightCurrent = computed(() => {
    return rightSlot.value ? 0 : 1;
});

function customBackChange(index: number): void {
    if (index == 0) {
        customBack.value = () => {
            uToast.value.show({
                title: '自定义返回逻辑',
                type: 'success'
            });
        };
    } else {
        customBack.value = null;
    }
}

function titleChange(index: number): void {
    useSlot.value = false;
    title.value = index == 0 ? '新闻' : index == 1 ? '新闻列表' : '雨打梨花深闭门，忘了青春，误了青春';
}

function leftChange(index: number): void {
    if (index == 0) {
        backText.value = '';
        backIconName.value = 'arrow-leftward';
    } else {
        backText.value = '返回';
        backIconName.value = 'arrow-left';
    }
}

function searchChange(index: number): void {
    title.value = null;
    useSlot.value = true;
    search.value = false;
    custom.value = false;
    if (index == 0) {
        title.value = '新闻';
        useSlot.value = false;
        rightSlot.value = false;
    } else if (index == 1) {
        showAction.value = false;
        useSlot.value = true;
        rightSlot.value = false;
        search.value = true;
        rightSlot.value = false;
    } else if (index == 2) {
        useSlot.value = true;
        showAction.value = true;
        rightSlot.value = false;
        search.value = true;
        rightSlot.value = false;
    } else {
        useSlot.value = true;
        search.value = true;
        showAction.value = false;
        rightSlot.value = true;
        rightSlot.value = false;
    }
}

function backChange(index: number): void {
    isBack.value = !!index;
}

function bgColorChange(index: number): void {
    background.value = {};
    if (index == 0) {
        background.value = {
            'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
        };
    } else {
        const color = index == 1 ? '#39CCCC' : index == 2 ? '#B471CC' : '#001f3f';
        background.value = {
            background: color
        };
    }
}

function rightChange(index: number): void {
    if (index == 0) {
        rightSlot.value = true;
        useSlot.value = false;
    } else {
        rightSlot.value = false;
    }
}

function customChange(index: number): void {
    search.value = false;
    rightSlot.value = false;
    if (index == 0) {
        custom.value = true;
        title.value = null;
        isBack.value = false;
        useSlot.value = true;
    } else {
        useSlot.value = false;
        title.value = '新闻';
        isBack.value = true;
    }
}
</script>

<style lang="scss" scoped>
.u-demo {
    //height: 200vh;
    height: calc(100% - 44px);
    height: calc(100% - 44px - constant(safe-area-inset-top));
    height: calc(100% - 44px - env(safe-area-inset-top));
}

.wrap {
    padding: 24rpx;
}

.navbar-right {
    margin-right: 24rpx;
    display: flex;
}

.search-wrap {
    margin: 0 20rpx;
    flex: 1;
}

.right-item {
    margin: 0 12rpx;
    position: relative;
    color: #ffffff;
    display: flex;
}

.message-box {
}

.slot-wrap {
    display: flex;
    align-items: center;
    flex: 1;
}

.map-wrap {
    display: flex;
    align-items: center;
    padding: 4px 6px;
    background-color: rgba(240, 240, 240, 0.35);
    color: #fff;
    font-size: 22rpx;
    border-radius: 100rpx;
    margin-left: 30rpx;
}

.map-wrap-text {
    padding: 0 6rpx;
}
</style>
