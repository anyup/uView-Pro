<template>
    <view class="u-demo fab-demo">
        <!-- 示例：自定义触发器 -->
        <u-fab
            v-if="trigger"
            ref="uFabRef"
            :type="type"
            :disabled="disabled"
            :draggable="draggable"
            :autoStick="autoStick"
            :direction="direction"
            :position="position"
            :gap="gap"
        >
            <template #trigger>
                <u-button type="success" shape="circle" @click="handleShare" :disabled="disabled">
                    <u-icon name="share" size="30" margin-right="20px"></u-icon>
                    分享给朋友
                </u-button>
            </template>
        </u-fab>
        <!-- 示例：默认触发器有子项 -->
        <u-fab
            v-else-if="child"
            ref="uFabRef"
            :type="type"
            :disabled="disabled"
            :draggable="draggable"
            :autoStick="autoStick"
            :direction="direction"
            :position="position"
            :gap="gap"
        >
            <u-button shape="circle" size="mini" type="primary" custom-class="custom-button" @click="handleBtnClick">
                <u-icon name="thumb-up" size="40"></u-icon>
            </u-button>
            <u-button shape="circle" size="mini" type="warning" custom-class="custom-button" @click="handleBtnClick">
                <u-icon name="heart" size="40"></u-icon>
            </u-button>
            <u-button shape="circle" size="mini" type="error" custom-class="custom-button" @click="handleBtnClick">
                <u-icon name="kefu-ermai" size="40"></u-icon>
            </u-button>
            <u-button shape="circle" size="mini" type="success" custom-class="custom-button" @click="handleShare">
                <u-icon name="zhuanfa" size="40"></u-icon>
            </u-button>
        </u-fab>
        <!-- 示例：默认触发器无子项 -->
        <u-fab
            v-else
            ref="uFabRef"
            :type="type"
            :disabled="disabled"
            :draggable="draggable"
            :autoStick="autoStick"
            :direction="direction"
            :position="position"
            :gap="gap"
            @trigger="handleTrigger"
        ></u-fab>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">主题选择</view>
                <u-subsection
                    :list="['primary', 'info', 'error', 'warning', 'success']"
                    @change="typeChange"
                ></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">禁用</view>
                <u-subsection current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">可以拖动</view>
                <u-subsection current="1" :list="['是', '否']" @change="draggableChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">位置</view>
                <u-subsection
                    current="0"
                    :list="['右下', '右上', '左下', '左上']"
                    @change="positionChange"
                ></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">子项弹出方向</view>
                <u-subsection current="0" :list="['上', '下', '左', '右']" @change="directionChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title"> 间距 </view>
                <u-number-box v-model="gap" :step="2" :min="0" :max="40"></u-number-box>
            </view>
            <view class="u-config-item" v-if="!trigger">
                <view class="u-item-title">切换展开</view>
                <u-button type="primary" size="medium" @click="handleToggle" :throttle-time="0">切换</u-button>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">拖动自动吸边</view>
                <u-switch v-model="autoStick"></u-switch>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">存在子项</view>
                <u-switch v-model="child"></u-switch>
            </view>

            <view class="u-config-item">
                <view class="u-item-title">自定义触发器</view>
                <u-switch v-model="trigger"></u-switch>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { FabDirection, FabPosition, ThemeType } from '@/uni_modules/uview-pro/types/global';
import { $u } from '@/uni_modules/uview-pro';

const uFabRef = ref<any>(null);
// 主题选择
const type = ref<ThemeType>('primary');
const disabled = ref(false);
const draggable = ref(true);
const direction = ref<FabDirection>('top');
const position = ref<FabPosition>('right-bottom');
// gap 现在支持四边配置
const gap = ref(16);
const trigger = ref(false);
const child = ref(true);
const autoStick = ref(true);

// 主题选择切换
function typeChange(e: number) {
    switch (e) {
        case 0:
            type.value = 'primary';
            break;
        case 1:
            type.value = 'info';
            break;
        case 2:
            type.value = 'error';
            break;
        case 3:
            type.value = 'warning';
            break;
        case 4:
            type.value = 'success';
            break;
    }
}

// 禁用状态切换
function disabledChange(index: number) {
    disabled.value = index === 0 ? true : false;
}

// 可拖动切换
function draggableChange(index: number) {
    draggable.value = index === 0 ? true : false;
}

// 弹出位置切换
function positionChange(index: number) {
    switch (index) {
        case 0:
            position.value = 'right-bottom';
            break;
        case 1:
            position.value = 'right-top';
            break;
        case 2:
            position.value = 'left-bottom';
            break;
        case 3:
            position.value = 'left-top';
            break;
    }
}

// 弹出方向切换
function directionChange(index: number) {
    switch (index) {
        case 0:
            direction.value = 'top';
            break;
        case 1:
            direction.value = 'bottom';
            break;
        case 2:
            direction.value = 'left';
            break;
        case 3:
            direction.value = 'right';
            break;
    }
}
// 切换展开收起
function handleToggle() {
    if (uFabRef.value) {
        uFabRef.value.toggle();
    }
}

// 子项按钮点击事件
function handleBtnClick() {
    $u.toast('按钮被点击');
    handleToggle();
}

// 按钮点击事件
const handleShare = () => {
    $u.toast('点击了分享按钮');
    // #ifdef H5
    window.open('https://github.com/anyup/uView-Pro');
    // #endif
};
// 触发器点击事件
function handleTrigger() {
    $u.toast('触发器被点击');
}
</script>

<style lang="scss" scoped>
.fab-demo {
    :deep(.custom-button) {
        min-width: auto !important;
        box-sizing: border-box;
        width: 40px !important;
        height: 40px !important;
        border-radius: 20px !important;
        margin: 8rpx;
    }
}
</style>
