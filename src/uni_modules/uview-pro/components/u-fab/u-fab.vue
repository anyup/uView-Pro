<template>
    <view
        class="u-fab"
        :style="fabStyle"
        @touchstart="handleTouchstart"
        @touchmove.stop.prevent="handleTouchmove"
        @touchend="handleTouchend"
    >
        <view class="u-fab-trigger" id="trigger">
            <slot name="trigger">
                <u-button
                    custom-class="u-fab-trigger-btn"
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
import { $u } from 'uview-pro';

const props = defineProps(FabProps);
const emit = defineEmits(['trigger']);

const sysInfo = $u.sys();
const effectiveWindowHeight = ref(0);

const position = reactive({
    top: 0,
    left: 0
});

const dragging = ref(false);

const fabStyle = computed(() => {
    return {
        top: `${position.top}px`,
        left: `${position.left || props.gap}px`,
        transition: dragging.value ? 'none' : 'all 0.3s ease'
    };
});

const start = reactive({
    x: 0,
    y: 0
});

const btnInfo = ref();

function handleTouchstart(e: TouchEvent) {
    if (props.disabled || !props.draggable) return;

    const touches = e.touches[0];
    start.x = touches.clientX;
    start.y = touches.clientY;
    dragging.value = true;
}

const minLeft = ref(0);
const maxLeft = ref(0);
const minTop = ref(0);
const maxTop = ref(0);
const expansion = ref(false);
const direction = ref(props.direction);

watch(
    () => [props.direction, props.gap],
    () => {
        if (expansion.value) direction.value = calcDirection();
    }
);

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

function handleTouchend() {
    if (props.disabled || !props.draggable) return;

    dragging.value = false;

    const middle = sysInfo.windowWidth / 2;
    const buttonCenter = position.left + btnInfo.value.width / 2;

    // 自动吸边，按钮中心位置大于视口的一半时，自动依附在右边，不然就是左边
    position.left = buttonCenter > middle ? sysInfo.windowWidth - btnInfo.value.width - props.gap : props.gap;

    if (expansion.value) direction.value = calcDirection();
}

const slots = useSlots();

function handleBtnClick() {
    if (slots?.default) {
        expansion.value = !expansion.value;
        if (expansion.value) direction.value = calcDirection();
    } else {
        emit('trigger');
    }
}

const actionsStyle = computed(() => {
    const config = directionConfig[direction.value];

    return {
        [config.opposite]: '100%',
        [config.sizeKey]: '100%',
        [config.positionKey]: 0,
        flexDirection: config.flexBase
    };
});

const actions = ref();

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
        const bottom = effectiveWindowHeight.value - (position.top + btnInfo.value.height + props.gap);
        if (bottom < actionsHeight) dir = 'top';
    } else if (dir === 'left') {
        // 按钮左侧剩余空间: 有效窗口宽度 - 边距
        if (position.left - props.gap < actionsWidth) dir = 'right';
    } else if (dir === 'right') {
        // 按钮右侧剩余空间: 有效窗口宽度 - (按钮左侧 + 按钮宽 + 边距)
        const right = sysInfo.windowWidth - (position.left + btnInfo.value.width + props.gap);
        if (right < actionsWidth) dir = 'left';
    }

    return dir;
}

function initFab() {
    position.top = effectiveWindowHeight.value - btnInfo.value.height - props.gap;
    position.left = sysInfo.windowWidth - btnInfo.value.width - props.gap;

    minLeft.value = props.gap;
    minTop.value = props.gap + sysInfo.windowTop;
    maxLeft.value = position.left;
    maxTop.value = position.top;
}

watch(
    () => props.gap,
    () => initFab()
);

const instance = getCurrentInstance();

onMounted(async () => {
    btnInfo.value = await $u.getRect('#trigger', instance);
    actions.value = await $u.getRect('#actions', instance);

    effectiveWindowHeight.value = sysInfo.windowHeight;
    // #ifdef H5
    effectiveWindowHeight.value = sysInfo.windowTop + sysInfo.windowHeight;
    // #endif
    initFab();
});
</script>

<style scoped lang="scss">
.u-fab {
    position: fixed;
    z-index: v-bind(zIndex);

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
        transition: all 0.3s cubic-bezier(0.3, 0, 0.2, 1);

        &.u-fab-actions__show {
            visibility: visible;
            opacity: 1;
        }
    }
}
</style>
