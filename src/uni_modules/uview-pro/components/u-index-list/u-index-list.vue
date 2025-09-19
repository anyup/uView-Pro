<template>
    <!-- 支付宝小程序使用$u.getRect()获取组件的根元素尺寸，所以在外面套一个"壳" -->
    <view>
        <view class="u-index-bar">
            <slot />
            <view
                v-if="showSidebar"
                class="u-index-bar__sidebar"
                @touchstart.stop.prevent="onTouchMove"
                @touchmove.stop.prevent="onTouchMove"
                @touchend.stop.prevent="onTouchStop"
                @touchcancel.stop.prevent="onTouchStop"
            >
                <view
                    v-for="(item, index) in indexList"
                    :key="index"
                    class="u-index-bar__index"
                    :style="{ zIndex: Number(zIndex) + 1, color: activeAnchorIndex === index ? activeColor : '' }"
                    :data-index="index"
                >
                    {{ item }}
                </view>
            </view>
            <view
                class="u-indexed-list-alert"
                v-if="touchmove && indexList[touchmoveIndex]"
                :style="{
                    zIndex: alertZIndex
                }"
            >
                <text>{{ indexList[touchmoveIndex] }}</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
// 索引列表生成函数
function getIndexList() {
    const indexList: string[] = [];
    const charCodeOfA = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
        indexList.push(String.fromCharCode(charCodeOfA + i));
    }
    return indexList;
}
</script>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { IndexListProps } from './types';

defineOptions({
    name: 'u-index-list'
});

/**
 * indexList 索引列表
 * @description 通过折叠面板收纳内容区域,搭配<u-index-anchor>使用
 * @tutorial https://uviewpro.cn/zh/components/indexList.html#indexanchor-props
 * @property {Number|String} scroll-top 当前滚动高度，自定义组件无法获得滚动条事件，所以依赖接入方传入
 * @property {Array} index-list 索引字符列表，数组（默认A-Z）
 * @property {Number|String} z-index 锚点吸顶时的层级（默认965）
 * @property {Boolean} sticky 是否开启锚点自动吸顶（默认true）
 * @property {Number|String} offset-top 锚点自动吸顶时与顶部的距离（默认0）
 * @property {String} highlight-color 锚点和右边索引字符高亮颜色（默认#2979ff）
 * @event {Function} select 选中右边索引字符时触发
 * @example <u-index-list :scrollTop="scrollTop"></u-index-list>
 */
const props = defineProps(IndexListProps);
const emit = defineEmits(['select']);
const instance = getCurrentInstance();

// 索引列表生成函数
function getIndexList() {
    const indexList: string[] = [];
    const charCodeOfA = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
        indexList.push(String.fromCharCode(charCodeOfA + i));
    }
    return indexList;
}

// 变量定义
const activeAnchorIndex = ref(0);
const showSidebar = ref(true);
const touchmove = ref(false);
const touchmoveIndex = ref(0);
// 孩子锚点组件
const children = reactive<any[]>([]);
const sidebar = reactive<{ height: number; top: number }>({ height: 0, top: 0 });
const scrollToAnchorIndex = ref<number | null>(null);
const timer = ref<any>(null);
const top = ref(0);
const height = ref(0);
const stickyOffsetTop = ref(0);

// 计算属性
// 弹出toast的z-index值
const alertZIndex = computed(() => $u.zIndex.toast).value;
// indexList 响应式
const indexList = computed(() => props.indexList ?? getIndexList()).value;
const zIndex = computed(() => props.zIndex).value;
const activeColor = computed(() => props.activeColor).value;

// 只能在created生命周期定义children，如果在data定义，会因为循环引用而报错
children.length = 0;

// 兼容 H5/非H5 stickyOffsetTop
onMounted(() => {
    const offsetTopNum = typeof props.offsetTop === 'string' ? Number(props.offsetTop) : props.offsetTop;
    // #ifdef H5
    stickyOffsetTop.value = offsetTopNum ? uni.upx2px(offsetTopNum) : 44;
    // #endif
    // #ifndef H5
    stickyOffsetTop.value = offsetTopNum ? uni.upx2px(offsetTopNum) : 0;
    // #endif
});

// 监听 scrollTop
watch(
    () => props.scrollTop,
    () => {
        updateData();
    }
);

function updateData() {
    if (timer.value) clearTimeout(timer.value);
    timer.value = setTimeout(() => {
        showSidebar.value = !!children.length;
        setRect().then(() => {
            onScroll();
        });
    }, 0);
}

/**
 * 获取各区域尺寸
 */
function setRect() {
    return Promise.all([setAnchorsRect(), setListRect(), setSiderbarRect()]);
}

/**
 * 获取锚点尺寸
 */
function setAnchorsRect() {
    return Promise.all(
        children.map((anchor, index) => {
            $u.getRect('.u-index-anchor-wrapper', anchor).then((rect: any) => {
                Object.assign(anchor, {
                    height: rect.height,
                    top: rect.top
                });
            });
        })
    );
}

/**
 * 获取列表尺寸
 */
function setListRect() {
    return $u.getRect('.u-index-bar', instance).then((rect: any) => {
        height.value = rect.height;
        top.value = rect.top + Number(props.scrollTop);
    });
}

/**
 * 获取侧边栏尺寸
 */
function setSiderbarRect() {
    return $u.getRect('.u-index-bar__sidebar', instance).then((rect: any) => {
        sidebar.height = rect.height;
        sidebar.top = rect.top;
    });
}

/**
 * 获取当前激活锚点索引
 */
function getActiveAnchorIndex() {
    const sticky = props.sticky;
    for (let i = children.length - 1; i >= 0; i--) {
        const preAnchorHeight = i > 0 ? children[i - 1].height : 0;
        const reachTop = sticky ? preAnchorHeight : 0;
        if (reachTop >= children[i].top) {
            return i;
        }
    }
    return -1;
}

/**
 * 滚动时处理锚点吸顶和样式
 */
function onScroll() {
    if (!children.length) return;
    const sticky = props.sticky;
    const scrollTopNum = Number(props.scrollTop);
    const active = getActiveAnchorIndex();
    activeAnchorIndex.value = active;
    if (sticky) {
        let isActiveAnchorSticky = false;
        if (active !== -1) {
            isActiveAnchorSticky = children[active].top <= 0;
        }
        children.forEach((item, index) => {
            if (index === active) {
                let wrapperStyle: any = '';
                let anchorStyle: any = {
                    color: `${activeColor}`
                };
                if (isActiveAnchorSticky) {
                    wrapperStyle = { height: `${children[index].height}px` };
                    anchorStyle = {
                        position: 'fixed',
                        top: `${stickyOffsetTop.value}px`,
                        zIndex: `${zIndex ? zIndex : $u.zIndex.indexListSticky}`,
                        color: `${activeColor}`
                    };
                }
                item.active = active;
                item.wrapperStyle = wrapperStyle;
                item.anchorStyle = anchorStyle;
            } else if (index === active - 1) {
                const currentAnchor = children[index];
                const currentOffsetTop = currentAnchor.top;
                const targetOffsetTop = index === children.length - 1 ? top.value : children[index + 1].top;
                const parentOffsetHeight = targetOffsetTop - currentOffsetTop;
                const translateY = parentOffsetHeight - currentAnchor.height;
                const anchorStyle = {
                    position: 'relative',
                    transform: `translate3d(0, ${translateY}px, 0)`,
                    zIndex: `${zIndex ? zIndex : $u.zIndex.indexListSticky}`,
                    color: `${activeColor}`
                };
                item.active = active;
                item.anchorStyle = anchorStyle;
            } else {
                item.active = false;
                item.anchorStyle = '';
                item.wrapperStyle = '';
            }
            item.exposed.active = item.active;
            item.exposed.anchorStyle = item.anchorStyle;
            item.exposed.wrapperStyle = item.wrapperStyle;
        });
    }
}

/**
 * 侧边栏触摸移动
 */
function onTouchMove(event: TouchEvent) {
    touchmove.value = true;
    const sidebarLength = children.length;
    const touch = event.touches[0];
    const itemHeight = sidebar.height / sidebarLength;
    let clientY = touch.clientY;
    let index = Math.floor((clientY - sidebar.top) / itemHeight);
    if (index < 0) {
        index = 0;
    } else if (index > sidebarLength - 1) {
        index = sidebarLength - 1;
    }
    touchmoveIndex.value = index;
    scrollToAnchor(index);
}

/**
 * 侧边栏触摸结束
 */
function onTouchStop() {
    touchmove.value = false;
    scrollToAnchorIndex.value = null;
}

/**
 * 滚动到指定锚点
 */
function scrollToAnchor(index: number) {
    if (scrollToAnchorIndex.value === index) {
        return;
    }
    scrollToAnchorIndex.value = index;
    const anchor = children.find(item => item.props.index === indexList[index]);
    if (anchor) {
        emit('select', anchor.props.index);
        uni.pageScrollTo({
            duration: 0,
            scrollTop: anchor.top + Number(props.scrollTop)
        });
    }
}

defineExpose({
    updateData,
    setRect,
    onScroll,
    children
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-index-bar {
    position: relative;
}

.u-index-bar__sidebar {
    position: fixed;
    top: 50%;
    right: 0;
    @include vue-flex;
    flex-direction: column;
    text-align: center;
    transform: translateY(-50%);
    user-select: none;
    z-index: 99;
}

.u-index-bar__index {
    font-weight: 500;
    padding: 8rpx 18rpx;
    font-size: 22rpx;
    line-height: 1;
}

.u-indexed-list-alert {
    position: fixed;
    width: 120rpx;
    height: 120rpx;
    right: 90rpx;
    top: 50%;
    margin-top: -60rpx;
    border-radius: 24rpx;
    font-size: 50rpx;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.65);
    @include vue-flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    z-index: 9999999;
}

.u-indexed-list-alert text {
    line-height: 50rpx;
}
</style>
