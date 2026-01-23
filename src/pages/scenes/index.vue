<template>
    <demo-page hide-tabs nav-title="实用场景" :nav-back="true">
        <view class="scenes-container">
            <page-nav desc="体验完整的业务场景，感受组件在实际应用中的使用" title="实用场景" :index="0"></page-nav>

            <!-- 场景卡片列表 -->
            <view class="scenes-grid">
                <view class="scene-card" v-for="scene in scenes" :key="scene.path" @click="openScene(scene.path)">
                    <view class="scene-icon" :style="{ background: scene.bgColor }">
                        <u-icon :name="scene.icon" size="60" :color="scene.iconColor"></u-icon>
                    </view>
                    <view class="scene-info">
                        <view class="scene-title">{{ scene.title }}</view>
                        <view class="scene-desc">{{ scene.desc }}</view>
                    </view>
                    <view class="scene-arrow">›</view>
                </view>
            </view>

            <!-- 提示信息 -->
            <view class="tips-section">
                <u-alert-tips
                    title="这些场景展示了组件在实际业务中的应用，帮助您更好地理解组件的使用方式"
                    type="primary"
                    :show-icon="true"
                ></u-alert-tips>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
const scenes = [
    {
        title: '待办事项',
        desc: '任务管理，提高工作效率',
        icon: 'list',
        iconColor: '#fff',
        bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        path: '/pages/scenes/todo/index'
    },
    {
        title: '我的笔记',
        desc: '记录想法，随时查看',
        icon: 'file-text',
        iconColor: '#fff',
        bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        path: '/pages/scenes/notes/index'
    },
    {
        title: '数据统计',
        desc: '使用数据一目了然',
        icon: 'tags',
        iconColor: '#fff',
        bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        path: '/pages/scenes/dashboard/index'
    },
    {
        title: '我的收藏',
        desc: '收藏喜欢的组件',
        icon: 'star',
        iconColor: '#fff',
        bgColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        path: '/pages/scenes/favorites/index'
    }
];

function openScene(path: string) {
    uni.navigateTo({ url: path });
}
</script>

<style lang="scss" scoped>
.scenes-container {
    padding: 24rpx;
    min-height: 100vh;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.02) 0%, transparent 100%);
}

.scenes-grid {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    margin-top: 24rpx;
}

.scene-card {
    display: flex;
    align-items: center;
    padding: 32rpx;
    background: var(--u-bg-color);
    border-radius: 20rpx;
    box-shadow: 0 8rpx 24rpx rgba(41, 121, 255, 0.1);
    gap: 24rpx;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.98);
    }
}

.scene-icon {
    width: 120rpx;
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24rpx;
    flex-shrink: 0;
}

.scene-info {
    flex: 1;
    min-width: 0;
}

.scene-title {
    font-size: 32rpx;
    font-weight: 600;
    color: var(--u-main-color);
    margin-bottom: 12rpx;
}

.scene-desc {
    font-size: 24rpx;
    color: var(--u-content-color);
    line-height: 1.5;
}

.scene-arrow {
    font-size: 48rpx;
    color: var(--u-type-primary);
    flex-shrink: 0;
}

.tips-section {
    margin-top: 40rpx;
}
</style>
