<template>
    <view class="u-collapse-item" :style="itemStyle">
        <view :hover-stay-time="200" class="u-collapse-head" @tap.stop="headClick" :hover-class="hoverClass" :style="headStyle">
            <template v-if="!slots['title-all']">
                <view v-if="!slots['title']" class="u-collapse-title u-line-1" :style="[{ textAlign: align ? align : 'left' }, isShow && activeStyle && !arrow ? activeStyle : '']">
                    {{ title }}
                </view>
                <slot v-else name="title" />
                <view class="u-icon-wrap">
                    <u-icon v-if="arrow" :color="arrowColor" :class="{ 'u-arrow-down-icon-active': isShow }" class="u-arrow-down-icon" name="arrow-down" />
                </view>
            </template>
            <slot v-else name="title-all" />
        </view>

        <view class="u-collapse-body" :style="{ height: isShow ? height + 'px' : '0' }">
            <view class="u-collapse-content" :id="elId" :style="bodyStyle">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, useSlots, getCurrentInstance, nextTick, inject } from 'vue';
import { $u } from '../..';
import { CollapseItemProps } from './types';

defineOptions({ name: 'u-collapse-item' });

const props = defineProps(CollapseItemProps);
const emit = defineEmits(['change']);
const slots = useSlots();
const instance = getCurrentInstance();

const isShow = ref(false);
const elId = ref('');
const height = ref(0);
const headStyle = ref<Record<string, any>>({});
const bodyStyle = ref<Record<string, any>>({});
const itemStyle = ref<Record<string, any>>({});
const arrowColor = ref('');
const hoverClass = ref('');
const accordion = ref(true);
const arrow = ref(true);

const parent = inject<any>('u-collapse', null);

watch(
    () => props.open,
    val => {
        isShow.value = val;
    },
    { immediate: true }
);

function init() {
    if (parent) {
        if (!parent.children.value.includes(instance?.exposed)) {
            parent.children.value.push(instance?.exposed);
        }
        headStyle.value = parent.props.headStyle;
        bodyStyle.value = parent.props.bodyStyle;
        arrowColor.value = parent.props.arrowColor;
        hoverClass.value = parent.props.hoverClass;
        arrow.value = parent.props.arrow;
        itemStyle.value = parent.props.itemStyle;
        accordion.value = parent.props.accordion;
    }
    elId.value = $u.guid();
    nextTick(() => {
        queryRect();
    });
}

function headClick() {
    if (props.disabled) return;

    if (accordion.value && parent) {
        parent.children.value.forEach((vm: any) => {
            if (vm.elId !== elId.value) {
                vm.isShow = false;
            } else {
                vm.isShow = !vm.isShow;
                emit('change', {
                    index: props.index,
                    show: vm.isShow
                });
            }
        });
    } else {
        isShow.value = !isShow.value;
        emit('change', {
            index: props.index,
            show: isShow.value
        });
    }

    if (isShow.value) parent && parent.onChange && parent.onChange(props.index);
}

function queryRect() {
    $u.getRect('#' + elId.value, instance).then((res: any) => {
        height.value = res.height;
    });
}

onMounted(() => {
    init();
});

defineExpose({
    init,
    isShow,
    elId,
    height,
    headStyle,
    bodyStyle,
    itemStyle,
    arrowColor,
    hoverClass,
    arrow
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-collapse-head {
    position: relative;
    @include vue-flex;
    justify-content: space-between;
    align-items: center;
    color: $u-main-color;
    font-size: 30rpx;
    line-height: 1;
    padding: 24rpx 0;
    text-align: left;
}

.u-collapse-title {
    flex: 1;
    overflow: hidden;
}

.u-arrow-down-icon {
    transition: all 0.3s;
    margin-right: 20rpx;
    margin-left: 14rpx;
}

.u-arrow-down-icon-active {
    transform: rotate(180deg);
    transform-origin: center center;
}

.u-collapse-body {
    overflow: hidden;
    transition: all 0.3s;
}

.u-collapse-content {
    overflow: hidden;
    font-size: 28rpx;
    color: $u-tips-color;
    text-align: left;
}
</style>
