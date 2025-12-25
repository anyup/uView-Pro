<template>
    <view
        class="u-fab"
        :style="$u.toStyle(fabStyle, customStyle)"
        :class="[customClass]"
        @touchstart="handleTouchstart"
        @touchmove.stop.prevent="handleTouchmove"
        @touchend="handleTouchend"
    >
        <view class="u-fab-trigger" id="trigger">
            <slot name="trigger">
                <u-button
                    custom-class="u-fab-trigger-btn"
                    custom-style="width:112rpx;height:112rpx;border-radius:112rpx;"
                    :type="type"
                    :disabled="disabled"
                    :throttle-time="0"
                    @click="handleBtnClick"
                >
                    <u-icon :name="expansion ? 'close' : 'plus'" size="36rpx"></u-icon>
                </u-button>
            </slot>
        </view>
        <view class="u-fab-actions" id="actions" :class="{ 'u-fab-actions__show': expansion }" :style="actionsStyle">
            <slot></slot>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-fab',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { directionConfig, FabProps } from './types.ts';
import { computed, getCurrentInstance, onMounted, reactive, ref, useSlots, watch } from 'vue';
import { $u } from '../../';

const props = defineProps(FabProps);
const emit = defineEmits(['trigger']);

const slots = useSlots();
const instance = getCurrentInstance();
const windowInfo = $u.getWindowInfo();
const dragging = ref(true);
const minLeft = ref(0);
const maxLeft = ref(0);
const minTop = ref(0);
const maxTop = ref(0);
const expansion = ref(false);
const direction = ref(props.direction);
const effectiveWindowHeight = ref(windowInfo.windowHeight);
// #ifdef H5
effectiveWindowHeight.value = windowInfo.windowTop + windowInfo.windowHeight;
// #endif
const position = reactive({
    top: 0,
    left: 0
});
const actions = ref();
const btnInfo = ref({
    width: 56,
    height: 56
});
const start = reactive({
    x: 0,
    y: 0
});

// 计算悬浮按钮样式
const fabStyle = computed(() => {
    const style: Record<string, any> = {
        transition: dragging.value ? 'none' : 'all 0.3s ease',
        zIndex: props.zIndex,
        left: `${position.left}px`,
        top: `${position.top}px`
    };
    return style;
});

// 动画样式
const actionsStyle = computed(() => {
    const config = directionConfig[direction.value];
    const base: Record<string, any> = {
        [config.opposite]: '100%',
        [config.sizeKey]: '100%',
        [config.positionKey]: 0,
        flexDirection: config.flexBase,
        transition: 'all 0.28s cubic-bezier(0.3, 0, 0.2, 1)'
    };

    // 展开/收缩动画：根据方向设置初始偏移
    const offset = 12; // rpx/px 相对轻微偏移，视觉更顺滑
    if (expansion.value) {
        base.transform = 'translate3d(0,0,0) scale(1)';
        base.opacity = 1;
    } else {
        // 隐藏时做一个方向上的微位移并缩放以优化动画感
        if (direction.value === 'top') base.transform = `translate3d(0, ${offset}px, 0) scale(0.96)`;
        else if (direction.value === 'bottom') base.transform = `translate3d(0, -${offset}px, 0) scale(0.96)`;
        else if (direction.value === 'left') base.transform = `translate3d(${offset}px, 0, 0) scale(0.96)`;
        else base.transform = `translate3d(-${offset}px, 0, 0) scale(0.96)`;
        base.opacity = 0;
    }

    return base;
});

watch(
    () => [props.position, props.gap],
    () => {
        initPosition();
    }
);

watch(
    () => props.direction,
    () => {
        if (expansion.value) direction.value = calcDirection();
    }
);

// helper：支持 gap 为 number 或对象形式
function getGap(side: 'top' | 'left' | 'right' | 'bottom') {
    const g = props.gap as any;
    if (typeof g === 'number') return g;
    if (g && typeof g === 'object' && g[side] !== undefined) return Number(g[side]);
    return 0;
}

// 拖动开始事件
function handleTouchstart(e: TouchEvent) {
    if (props.disabled || !props.draggable) return;

    const touches = e.touches[0];
    start.x = touches.clientX;
    start.y = touches.clientY;
    dragging.value = true;
}

// 拖动移动事件
function handleTouchmove(e: TouchEvent) {
    if (props.disabled || !props.draggable) return;

    const touches = e.touches[0];
    const deltaX = touches.clientX - start.x;
    const deltaY = touches.clientY - start.y;

    position.left += deltaX;
    position.top += deltaY;

    start.x = touches.clientX;
    start.y = touches.clientY;

    // 设置边界，防止拖出边界
    position.left = Math.max(minLeft.value, Math.min(maxLeft.value, position.left));
    position.top = Math.max(minTop.value, Math.min(maxTop.value, position.top));
}

// 拖动结束事件
function handleTouchend() {
    if (props.disabled || !props.draggable) return;

    dragging.value = false;

    // 如果 autoStick 为 false，则释放后不进行自动吸边，仅做边界限制
    if (props.autoStick === false) {
        position.left = Math.max(minLeft.value, Math.min(maxLeft.value, position.left));
        position.top = Math.max(minTop.value, Math.min(maxTop.value, position.top));
        return;
    }

    const middle = windowInfo.windowWidth / 2;
    const buttonCenter = position.left + btnInfo.value.width / 2;

    // 自动吸边，按钮中心位置大于视口的一半时，自动依附在右边，不然就是左边
    position.left =
        buttonCenter > middle ? windowInfo.windowWidth - btnInfo.value.width - getGap('right') : getGap('left');

    if (expansion.value) direction.value = calcDirection();
}

// 按钮点击事件
function handleBtnClick() {
    if (slots?.default) {
        expansion.value = !expansion.value;
        if (expansion.value) direction.value = calcDirection();
    } else {
        emit('trigger');
    }
}

// 计算方向
function calcDirection() {
    if (!actions.value) return props.direction;

    let dir = props.direction;

    const actionsHeight = actions.value?.height || 0;
    const actionsWidth = actions.value?.width || 0;

    // 菜单展开时，如果位置不够，则反转方向
    if (dir === 'top') {
        // 按钮上方剩余空间: 按钮顶部 - 顶部边距
        if (position.top - minTop.value < actionsHeight) dir = 'bottom';
    } else if (dir === 'bottom') {
        // 按钮下方剩余空间: 有效窗口高度 - (按钮顶部 + 按钮高 + 边距)
        const bottom = effectiveWindowHeight.value - (position.top + btnInfo.value.height + getGap('bottom'));
        if (bottom < actionsHeight) dir = 'top';
    } else if (dir === 'left') {
        // 按钮左侧剩余空间: 有效窗口宽度 - 边距
        if (position.left - getGap('left') < actionsWidth) dir = 'right';
    } else if (dir === 'right') {
        // 按钮右侧剩余空间: 有效窗口宽度 - (按钮左侧 + 按钮宽 + 边距)
        const right = windowInfo.windowWidth - (position.left + btnInfo.value.width + getGap('right'));
        if (right < actionsWidth) dir = 'left';
    }

    return dir;
}

// 初始化位置
function initPosition() {
    // 根据 props.position 计算初始 left/top
    const pos = props.position || 'right-bottom';
    const winW = windowInfo.windowWidth;
    const winH = effectiveWindowHeight.value;

    switch (pos) {
        case 'left-top':
            position.left = getGap('left');
            position.top = getGap('top') + windowInfo.windowTop;
            break;
        case 'right-top':
            position.left = winW - btnInfo.value.width - getGap('right');
            position.top = getGap('top') + windowInfo.windowTop;
            break;
        case 'left-bottom':
            position.left = getGap('left');
            position.top = winH - btnInfo.value.height - getGap('bottom');
            break;
        case 'right-bottom':
            position.left = winW - btnInfo.value.width - getGap('right');
            position.top = winH - btnInfo.value.height - getGap('bottom');
            break;
        case 'left-center':
            position.left = getGap('left');
            position.top = Math.round((winH - btnInfo.value.height) / 2);
            break;
        case 'right-center':
            position.left = winW - btnInfo.value.width - getGap('right');
            position.top = Math.round((winH - btnInfo.value.height) / 2);
            break;
        case 'top-center':
            position.left = Math.round((winW - btnInfo.value.width) / 2);
            position.top = getGap('top') + windowInfo.windowTop;
            break;
        case 'bottom-center':
            position.left = Math.round((winW - btnInfo.value.width) / 2);
            position.top = winH - btnInfo.value.height - getGap('bottom');
            break;
        default:
            position.left = winW - btnInfo.value.width - getGap('right');
            position.top = winH - btnInfo.value.height - getGap('bottom');
            break;
    }
}

onMounted(async () => {
    btnInfo.value = await $u.getRect('#trigger', instance);
    actions.value = await $u.getRect('#actions', instance);

    initPosition();

    minLeft.value = getGap('left');
    minTop.value = getGap('top') + windowInfo.windowTop;
    maxLeft.value = windowInfo.windowWidth - btnInfo.value.width - getGap('right');
    maxTop.value = effectiveWindowHeight.value - btnInfo.value.height - getGap('bottom');
});

defineExpose({
    toggle: handleBtnClick
});
</script>

<style scoped lang="scss">
.u-fab {
    position: fixed;

    .u-fab-trigger {
        :deep(.u-fab-trigger-btn) {
            width: 112rpx;
            height: 112rpx;
            border-radius: 112rpx;

            &::after {
                border-radius: 112rpx;
            }
        }
    }

    .u-fab-actions {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        opacity: 0;
        transform-origin: center;
        will-change: transform, opacity;
        transition: all 0.28s cubic-bezier(0.3, 0, 0.2, 1);

        &.u-fab-actions__show {
            visibility: visible;
            opacity: 1;
        }
    }
}
</style>
