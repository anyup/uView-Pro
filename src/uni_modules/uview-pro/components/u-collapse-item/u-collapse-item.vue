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

/**
 * collapseItem 手风琴Item
 * @description 通过折叠面板收纳内容区域（搭配u-collapse使用）
 * @tutorial https://uviewpro.cn/zh/components/collapse.html
 * @property {String} title 面板标题
 * @property {String Number} index 主要用于事件的回调，标识那个Item被点击
 * @property {Boolean} disabled 面板是否可以打开或收起（默认false）
 * @property {Boolean} open 设置某个面板的初始状态是否打开（默认false）
 * @property {String Number} name 唯一标识符，如不设置，默认用当前collapse-item的索引值
 * @property {String} align 标题的对齐方式（默认left）
 * @property {Object} active-style 不显示箭头时，可以添加当前选择的collapse-item活动样式，对象形式
 * @event {Function} change 某个item被打开或者收起时触发
 * @example <u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">{{item.body}}</u-collapse-item>
 */
const props = defineProps(CollapseItemProps);
const emit = defineEmits(['change']);
const slots = useSlots();
const instance = getCurrentInstance();

const isShow = ref(false);
const elId = ref('');
const height = ref(0); // body内容的高度
const headStyle = ref<Record<string, any>>({}); // 头部样式，对象形式
const bodyStyle = ref<Record<string, any>>({}); // 主体部分样式
const itemStyle = ref<Record<string, any>>({}); // 每个item的整体样式
const arrowColor = ref(''); // 箭头的颜色
const hoverClass = ref(''); // 头部按下时的效果样式类
const accordion = ref(true); // 是否显示右侧箭头
const arrow = ref(true);

const parent = inject<any>('u-collapse', null);

watch(
    () => props.open,
    val => {
        isShow.value = val;
    },
    { immediate: true }
);

/**
 * 异步获取内容，或者动态修改了内容时，需要重新初始化
 */
function init() {
    if (parent) {
        // 不存在时才添加本实例
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

/**
 * 点击collapse head头部
 */
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

/**
 * 查询内容高度
 */
function queryRect() {
    // getRect为uView自带的节点查询简化方法，详见文档介绍：https://uviewpro.cn/zh/js/getRect.html
    // 组件内部一般用this.$uGetRect，对外的为this.$u.getRect，二者功能一致，名称不同
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
