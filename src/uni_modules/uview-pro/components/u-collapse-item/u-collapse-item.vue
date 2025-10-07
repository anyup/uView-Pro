<template>
    <view class="u-collapse-item" :style="`${$u.toStyle(itemStyle)}${$u.toStyle(customStyle)}`" :class="customClass">
        <view
            :hover-stay-time="200"
            class="u-collapse-head"
            @tap.stop="headClick"
            :hover-class="hoverClass"
            :style="headStyle"
        >
            <template v-if="!slots['title-all']">
                <view v-if="!slots['title']" class="u-collapse-title u-line-1" :style="titleStyle">
                    {{ title }}
                </view>
                <slot v-else name="title" />
                <view class="u-icon-wrap">
                    <u-icon v-if="showArrow" :color="arrowColor" :name="isShow ? 'arrow-up' : 'arrow-down'" />
                </view>
            </template>
            <slot v-else name="title-all" />
        </view>

        <view class="u-collapse-body" :style="{ height: isShow ? height : '0' }">
            <view class="u-collapse-content" :id="elId" :style="bodyStyle">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-collapse-item',
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
import { ref, watch, onMounted, useSlots, getCurrentInstance, nextTick, computed } from 'vue';
import { $u, useChildren, useParentEvents } from '../..';
import { CollapseItemProps } from './types';

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
const height = ref('0');
const headStyle = ref<Record<string, any>>({});
const bodyStyle = ref<Record<string, any>>({});
const itemStyle = ref<Record<string, any>>({});
const arrowColor = ref('');
const hoverClass = ref('');

// 使用通信库的子组件Hook
const { childId, parentExposed } = useChildren('u-collapse-item', 'u-collapse');

// 计算属性
const showArrow = computed(() => {
    return parentExposed.value?.props ? parentExposed.value.props.arrow : true;
});

const titleStyle = computed(() => {
    let style = { textAlign: props.align ? props.align : 'left' };

    if (isShow.value && props.activeStyle && !showArrow.value) {
        style = $u.deepMerge(style, props.activeStyle);
    }
    return $u.toStyle(style);
});

// 获取唯一标识符
const itemName = computed(() => {
    // 优先级：name > index > childId
    if (props.name !== undefined && props.name !== '') {
        return props.name;
    } else if (props.index !== undefined && props.index !== '') {
        return props.index;
    } else {
        return childId;
    }
});

/**
 * 设置显示状态
 */
function setShowState(show: boolean) {
    if (isShow.value !== show) {
        isShow.value = show;

        // 如果展开，需要重新计算高度
        if (show) {
            nextTick(() => {
                queryRect();
            });
        }

        // 本地触发change事件
        emit('change', {
            index: props.index,
            name: itemName.value,
            show: isShow.value
        });
    }
}

/**
 * 异步获取内容，或者动态修改了内容时，需要重新初始化
 */
function init() {
    if (parentExposed.value?.props) {
        headStyle.value = parentExposed.value.props.headStyle || {};
        bodyStyle.value = parentExposed.value.props.bodyStyle || {};
        arrowColor.value = parentExposed.value.props.arrowColor || '#909399';
        hoverClass.value = parentExposed.value.props.hoverClass || 'u-hover-class';
        itemStyle.value = parentExposed.value.props.itemStyle || {};
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

    // 通知父组件状态变化
    if (parentExposed.value?.onChange) {
        parentExposed.value.onChange(itemName.value);
    }
}

/**
 * 查询内容高度
 */
function queryRect() {
    $u.getRect('#' + elId.value, instance)
        .then((res: any) => {
            if (res && res.height) {
                height.value = res.height + 'px';
            }
            // #ifdef MP-TOUTIAO
            if (isShow.value) {
                height.value = 'auto';
            }
            // #endif
        })
        .catch((err: any) => {
            console.warn('queryRect error:', err);
            height.value = 'auto';
        });
}

// 使用自动取消监听注册父组件事件
useParentEvents(childId, {
    openSingle: (data: any) => {
        // 只有目标项展开，其他都关闭
        const shouldShow = data.targetName === itemName.value;
        setShowState(shouldShow);
    },
    closeAll: () => {
        setShowState(false);
    },
    setMultiple: (data: any) => {
        const shouldShow = data.targetNames.includes(itemName.value);
        setShowState(shouldShow);
    },
    toggleSingle: (data: any) => {
        // 只有目标项才切换状态
        if (data.targetName === itemName.value) {
            setShowState(!isShow.value);
        }
    }
});

onMounted(() => {
    // 关键修复：根据 open 属性设置初始状态
    setShowState(props.open);
    // 初始化
    init();
});

// 监听 open 属性变化
watch(
    () => props.open,
    newVal => {
        setShowState(newVal);
    }
);

// 监听父组件exposed的变化
watch(
    parentExposed,
    newExposed => {
        if (newExposed) {
            init();
        }
    },
    { deep: true, immediate: true }
);

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
    itemName: itemName.value,
    queryRect,
    setShowState
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
