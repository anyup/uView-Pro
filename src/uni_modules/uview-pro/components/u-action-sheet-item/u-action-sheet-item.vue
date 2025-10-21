<template>
    <view
        class="u-action-sheet-item u-line-1"
        :class="[!isLast ? 'u-border-bottom' : '', disabled ? 'u-action-sheet-item--disabled' : '', customClass]"
        :style="$u.toStyle(itemStyle, customStyle)"
        @click="handleClick"
        @touchmove.stop.prevent
        hover-class="u-hover-class"
        :hover-stay-time="150"
    >
        <slot>
            <text>{{ text }}</text>
            <text class="u-action-sheet-item__subtext u-line-1" v-if="subText">{{ subText }}</text>
        </slot>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-action-sheet-item',
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
import { computed } from 'vue';
import { ActionSheetItemProps } from './types';
import { $u, useChildren } from '../../libs';

const props = defineProps(ActionSheetItemProps);
const emit = defineEmits(['click']);

const { parent, parentExposed, childIndex, emitToParent } = useChildren('u-action-sheet-item', 'u-action-sheet');

const isLast = computed(() => {
    return (childIndex?.value ?? 0) + 1 >= (parent?.value?.getChildren()?.length ?? 0);
});

const itemStyle = computed(() => {
    const style: Record<string, string> = {};
    style.color = props.color || parentExposed?.value?.props?.color;
    style.fontSize = $u.addUnit(props.fontSize || parentExposed?.value?.props?.fontSize);
    style.padding = $u.addUnit(props.padding);
    if (props.disabled) style.color = '#c0c4cc';
    return style;
});

function handleClick() {
    if (props.disabled) return;
    emit('click', childIndex?.value || 0);
    if (!props.asyncClose && !parentExposed?.value?.props?.asyncClose) {
        emitToParent('itemClick', childIndex?.value || 0);
    }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-action-sheet-item {
    @include vue-flex;
    line-height: 1;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    padding: 34rpx 0;
    flex-direction: column;
}

.u-action-sheet-item--disabled {
    color: $u-light-color;
}

.u-action-sheet-item__subtext {
    font-size: 24rpx;
    color: $u-tips-color;
    margin-top: 20rpx;
}
</style>
