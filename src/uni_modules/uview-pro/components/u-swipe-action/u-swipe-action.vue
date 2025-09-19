<template>
    <view>
        <movable-area class="u-swipe-action" :style="{ backgroundColor: props.bgColor }">
            <movable-view
                class="u-swipe-view"
                @change="change"
                @touchend="touchend"
                @touchstart="touchstart"
                direction="horizontal"
                :disabled="props.disabled"
                :inertia="true"
                :x="moveX"
                :style="{ width: movableViewWidth ? movableViewWidth : '100%' }"
            >
                <view class="u-swipe-content" @tap.stop="contentClick">
                    <slot></slot>
                </view>
                <view class="u-swipe-del" v-if="showBtn" @tap.stop="btnClick(index)" :style="btnStyle(item.style)" v-for="(item, index) in props.options" :key="index">
                    <view class="u-btn-text">{{ item.text }}</view>
                </view>
            </movable-view>
        </movable-area>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { $u } from '../..';
import { SwipeActionProps } from './types';

defineOptions({ name: 'u-swipe-action' });

/**
 * swipeAction 左滑单元格
 * @description 该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作。
 * @tutorial https://uviewpro.cn/zh/components/swipeAction.html
 * @property {String} bg-color 整个组件背景颜色（默认#ffffff）
 * @property {Array} options 数组形式，可以配置背景颜色和文字
 * @property {String|Number} index 标识符，点击时候用于区分点击了哪一个，用v-for循环时的index即可
 * @property {String|Number} btn-width 按钮宽度，单位rpx（默认180）
 * @property {Boolean} disabled 是否禁止某个swipeAction滑动（默认false）
 * @property {Boolean} show 打开或者关闭某个组件（默认false）
 * @event {Function} click 点击组件时触发
 * @event {Function} close 组件触发关闭状态时
 * @event {Function} content-click 点击内容时触发
 * @event {Function} open 组件触发打开状态时
 * @example <u-swipe-action btn-text="收藏">...</u-swipe-action>
 */
const props = defineProps(SwipeActionProps);
const emit = defineEmits(['click', 'close', 'content-click', 'open']);

// 组件内部状态
const moveX = ref(0); // movable-view元素在x轴上需要移动的目标移动距离，用于展开或收起滑动的按钮
const scrollX = ref(0); // movable-view移动过程中产生的change事件中的x轴移动值
const status = ref(false); // 滑动的状态，表示当前是展开还是关闭按钮的状态
const movableAreaWidth = ref(0); // 滑动区域
const elId = ref($u.guid()); // id，用于通知另外组件关闭时的识别
const showBtn = ref(false); // 刚开始渲染视图时不显示右边的按钮，避免视图闪动

// 计算属性
const movableViewWidth = computed(() => {
    return movableAreaWidth.value + allBtnWidth.value + 'px';
});
const innerBtnWidth = computed(() => {
    // 保证类型安全，btnWidth 转为 number
    return uni.upx2px(Number(props.btnWidth));
});
const allBtnWidth = computed(() => {
    return uni.upx2px(Number(props.btnWidth)) * props.options.length;
});
const btnStyle = (style: Record<string, any> = {}) => {
    // 按钮样式处理
    style.width = props.btnWidth + 'rpx';
    return style;
};

// 监听 show 属性变化，控制展开/收起
watch(
    () => props.show,
    nVal => {
        if (nVal) {
            open();
        } else {
            close();
        }
    },
    { immediate: true, deep: true }
);

// 生命周期
onMounted(() => {
    getActionRect();
});

/**
 * 点击按钮
 * @param index 当前按钮索引
 */
function btnClick(index: number) {
    status.value = false;
    // this.index为点击的几个组件，index为点击某个组件的第几个按钮(options数组的索引)
    emit('click', props.index, index);
}

/**
 * movable-view元素移动事件
 */
function change(e: { detail: { x: number } }) {
    scrollX.value = e.detail.x;
}

/**
 * 关闭按钮状态
 */
function close() {
    moveX.value = 0;
    status.value = false;
}

/**
 * 打开按钮的状态
 */
function open() {
    if (props.disabled) return;
    moveX.value = -allBtnWidth.value;
    status.value = true;
}

/**
 * 用户手指离开movable-view元素，停止触摸
 */
function touchend() {
    moveX.value = scrollX.value;
    // 停止触摸时候，判断当前是展开还是关闭状态
    // 关闭状态
    // 这一步很重要，需要先给moveX一个变化的随机值，否则因为前后设置的为同一个值
    // props单向数据流的原因，导致movable-view元素不会发生变化，切记，详见文档：
    // https://uniapp.dcloud.io/use?id=%e5%b8%b8%e8%a7%81%e9%97%ae%e9%a2%98
    // https://uniapp.dcloud.net.cn/tutorial/vue-api.html#componentsolutions
    nextTick(() => {
        if (status.value == false) {
            // 关闭状态左滑，产生的x轴位移为负值，也就是说滑动的距离大于按钮的四分之一宽度，自动展开按钮
            if (scrollX.value <= -allBtnWidth.value / 4) {
                moveX.value = -allBtnWidth.value; // 按钮宽度的负值，即为展开状态movable-view元素左滑的距离
                status.value = true; // 标志当前为展开状态
                emitOpenEvent();
                // 产生震动效果
                if (props.vibrateShort) uni.vibrateShort();
            } else {
                moveX.value = 0; // 如果距离没有按钮宽度的四分之一，自动收起
                status.value = false;
                emitCloseEvent();
            }
        } else {
            // 如果在打开的状态下，右滑动的距离X轴偏移超过按钮的四分之一(负值反过来的四分之三)，自动收起按钮
            if (scrollX.value > (-allBtnWidth.value * 3) / 4) {
                moveX.value = 0;
                nextTick(() => {
                    moveX.value = 101;
                });
                status.value = false;
                emitCloseEvent();
            } else {
                moveX.value = -allBtnWidth.value;
                status.value = true;
                emitOpenEvent();
            }
        }
    });
}

/**
 * 触发 open 事件
 */
function emitOpenEvent() {
    emit('open', props.index);
}

/**
 * 触发 close 事件
 */
function emitCloseEvent() {
    emit('close', props.index);
}

/**
 * 开始触摸
 */
function touchstart() {
    // ...可扩展触摸逻辑
}

/**
 * 获取滑动区域宽度
 */
function getActionRect() {
    $u.getRect('.u-swipe-action').then((res: { width: number }) => {
        // 解决使用u-swipe-action右边会出现一条背景线的bug，增加 1 像素
        movableAreaWidth.value = res.width + 1;
        // 等视图更新完后，再显示右边的可滑动按钮，防止这些按钮会"闪一下"
        nextTick(() => {
            showBtn.value = true;
        });
    });
}

/**
 * 点击内容触发事件
 */
function contentClick() {
    // 点击内容时，如果当前为打开状态，收起组件
    if (status.value == true) {
        status.value = false;
        moveX.value = 0;
    }
    emit('content-click', props.index);
}
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-swipe-action {
    width: auto;
    height: initial;
    position: relative;
    overflow: hidden;
}

.u-swipe-view {
    @include vue-flex;
    height: initial;
    position: relative;
    /* 这一句很关键，覆盖默认的绝对定位 */
}

.u-swipe-content {
    flex: 1;
}

.u-swipe-del {
    position: relative;
    font-size: 30rpx;
    color: #ffffff;
}

.u-btn-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
