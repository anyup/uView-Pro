<template>
    <view class="u-tabs" :style="{ background: bgColor }">
        <!-- $u.getRect()对组件根节点无效，因为写了.in(this)，故这里获取内层接点尺寸 -->
        <view>
            <scroll-view scroll-x class="u-scroll-view" :scroll-left="scrollLeft" scroll-with-animation>
                <view class="u-scroll-box" :id="id" :class="{ 'u-tabs-scroll-flex': !isScroll }">
                    <view class="u-tab-item u-line-1" :id="'u-tab-item-' + index" v-for="(item, index) in list" :key="index" @tap="clickTab(index)" :style="tabItemStyle(index)">
                        <u-badge :count="item[count] || item['count'] || 0" :offset="offset" size="mini"></u-badge>
                        {{ item[name] || item['name'] }}
                    </view>
                    <view v-if="showBar" class="u-tab-bar" :style="tabBarStyle"></view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { TabsProps } from './types';

defineOptions({ name: 'u-tabs' });

/**
 * tabs 标签
 * @description 该组件，是一个tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动。 该组件的一个特点是配置为滚动模式时，激活的tab会自动移动到组件的中间位置。
 * @tutorial https://uviewpro.cn/zh/components/tabs.html
 * @property {Boolean} is-scroll tabs是否可以左右拖动（默认true）
 * @property {Array} list 标签数组，元素为对象，如[{name: '推荐'}]
 * @property {String|Number} current 指定哪个tab为激活状态（默认0）
 * @property {String|Number} height 导航栏的高度，单位rpx（默认80）
 * @property {String|Number} font-size tab文字大小，单位rpx（默认30）
 * @property {String|Number} duration 滑块移动一次所需的时间，单位秒（默认0.5）
 * @property {String} active-color 滑块和激活tab文字的颜色（默认#2979ff）
 * @property {String} inactive-color tabs文字颜色（默认#303133）
 * @property {String|Number} bar-width 滑块宽度，单位rpx（默认40）
 * @property {Object} active-item-style 活动tabs item的样式，对象形式
 * @property {Object} bar-style 底部滑块的样式，对象形式
 * @property {Boolean} show-bar 是否显示底部的滑块（默认true）
 * @property {String|Number} bar-height 滑块高度，单位rpx（默认6）
 * @property {String|Number} item-width 标签的宽度（默认auto）
 * @property {String|Number} gutter 单个tab标签的左右内边距之和，单位rpx（默认40）
 * @property {String} bg-color tabs导航栏的背景颜色（默认#ffffff）
 * @property {String} name 组件内部读取的list参数中的属性名（tab名称），见官网说明（默认name）
 * @property {String} count 组件内部读取的list参数中的属性名（badge徽标数），同name属性的使用，见官网说明（默认count）
 * @property {Array} offset 设置badge徽标数的位置偏移，格式为 [x, y]，也即设置的为top和right的值，单位rpx（默认[5, 20]）
 * @property {Boolean} bold 激活选项的字体是否加粗（默认true）
 * @event {Function} change 点击标签时触发
 * @example <u-tabs ref="tabs" :list="list" :is-scroll="false"></u-tabs>
 */

// props 定义
const props = defineProps(TabsProps);

/**
 * emits 定义
 */
const emit = defineEmits(['change']);
const instance = getCurrentInstance();
// 滚动scroll-view的左边滚动距离
const scrollLeft = ref(0);
// 存放对tab菜单查询后的节点信息
const tabQueryInfo = ref<any[]>([]);
// 屏幕宽度，单位为px
const componentWidth = ref(0);
// 移动bar需要通过translateX()移动的距离
const scrollBarLeft = ref(0);
// 父元素(tabs组件)到屏幕左边的距离
const parentLeft = ref(0);
// id值
const id = ref($u.guid());
// 当前活动tab索引
const currentIndex = ref(props.current);
// 滑块第一次移动时(页面刚生成时)，无需动画，否则给人怪异的感觉
const barFirstTimeMove = ref(true);

// 监听list变化，重置索引并重新布局
// 监听tab的变化，重新计算tab菜单的布局信息，因为实际使用中菜单可能是通过
// 后台获取的（如新闻app顶部的菜单），获取返回需要一定时间，所以list变化时，重新获取布局信息
watch(
    () => props.list,
    (n, o) => {
        // list变动时，重制内部索引，否则可能导致超出数组边界的情况
        if (n.length !== o.length) currentIndex.value = 0;
        // 用$nextTick等待视图更新完毕后再计算tab的局部信息，否则可能因为tab还没生成就获取，就会有问题
        nextTick(() => {
            init();
        });
    }
);

// 监听current变化，自动滚动
watch(
    () => props.current,
    nVal => {
        // 视图更新后再执行移动操作
        nextTick(() => {
            currentIndex.value = nVal;
            scrollByIndex();
        });
    },
    { immediate: true }
);

// 移动bar的样式
const tabBarStyle = computed(() => {
    const style: Record<string, any> = {
        width: props.barWidth + 'rpx',
        transform: `translate(${scrollBarLeft.value}px, -100%)`,
        // 滑块在页面渲染后第一次滑动时，无需动画效果
        'transition-duration': `${barFirstTimeMove.value ? 0 : props.duration}s`,
        'background-color': props.activeColor,
        height: props.barHeight + 'rpx',
        opacity: barFirstTimeMove.value ? 0 : 1,
        // 设置一个很大的值，它会自动取能用的最大值，不用高度的一半，是因为高度可能是单数，会有小数出现
        'border-radius': `${Number(props.barHeight) / 2}px`
    };
    Object.assign(style, props.barStyle);
    return style;
});

// tab的样式
function tabItemStyle(index: number) {
    let style: Record<string, any> = {
        height: props.height + 'rpx',
        'line-height': props.height + 'rpx',
        'font-size': props.fontSize + 'rpx',
        'transition-duration': `${props.duration}s`,
        padding: props.isScroll ? `0 ${props.gutter}rpx` : '',
        flex: props.isScroll ? 'auto' : '1',
        width: $u.addUnit(props.itemWidth)
    };
    // 字体加粗
    if (index == Number(currentIndex.value) && props.bold) style.fontWeight = 'bold';
    if (index == Number(currentIndex.value)) {
        style.color = props.activeColor;
        // 给选中的tab item添加外部自定义的样式
        style = Object.assign(style, props.activeItemStyle);
    } else {
        style.color = props.inactiveColor;
    }
    return style;
}

/**
 * 初始化tab布局信息
 */
async function init() {
    // 获取tabs组件的尺寸信息
    const tabRect = await $u.getRect('#' + id.value, instance);
    // tabs组件距离屏幕左边的宽度
    parentLeft.value = tabRect.left;
    // tabs组件的宽度
    componentWidth.value = tabRect.width;
    getTabRect();
}

/**
 * 点击某一个tab菜单
 */
function clickTab(index: number) {
    // 点击当前活动tab，不触发事件
    if (index == currentIndex.value) return;
    // 发送事件给父组件
    emit('change', index);
}

/**
 * 查询tab的布局信息
 */
function getTabRect() {
    // 创建节点查询
    const query = uni.createSelectorQuery().in(instance?.proxy);
    // 历遍所有tab，这里是执行了查询，最终使用exec()会一次性返回查询的数组结果
    for (let i = 0; i < props.list.length; i++) {
        // 只要size和rect两个参数
        query.select(`#u-tab-item-${i}`).fields({ size: true, rect: true }, () => {});
    }
    // 执行查询，一次性获取多个结果
    query.exec((res: any[]) => {
        tabQueryInfo.value = res;
        // 初始化滚动条和移动bar的位置
        scrollByIndex();
    });
}

/**
 * 滚动scroll-view，让活动的tab处于屏幕的中间位置
 */
function scrollByIndex() {
    // 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
    const tabInfo = tabQueryInfo.value[Number(currentIndex.value)];
    if (!tabInfo) return;
    // 活动tab的宽度
    const tabWidth = tabInfo.width;
    // 活动item的左边到tabs组件左边的距离，用item的left减去tabs的left
    const offsetLeft = tabInfo.left - parentLeft.value;
    // 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
    const scrollL = offsetLeft - (componentWidth.value - tabWidth) / 2;
    scrollLeft.value = scrollL < 0 ? 0 : scrollL;
    // 当前活动item的中点点到左边的距离减去滑块宽度的一半，即可得到滑块所需的移动距离
    const left = tabInfo.left + tabInfo.width / 2 - parentLeft.value;
    // 计算当前活跃item到组件左边的距离
    scrollBarLeft.value = left - uni.upx2px(Number(props.barWidth)) / 2;
    // 第一次移动滑块的时候，barFirstTimeMove为true，放到延时中将其设置false
    // 延时是因为scrollBarLeft作用于computed计算时，需要一个过程需，否则导致出错
    if (barFirstTimeMove.value) {
        setTimeout(() => {
            barFirstTimeMove.value = false;
        }, 100);
    }
}

onMounted(() => {
    init();
});

defineExpose({ init, clickTab, scrollByIndex });
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

view,
scroll-view {
    box-sizing: border-box;
}

/* #ifndef APP-NVUE */
::-webkit-scrollbar,
::-webkit-scrollbar,
::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
}
/* #endif */

.u-scroll-box {
    position: relative;
    /* #ifdef MP-TOUTIAO */
    white-space: nowrap;
    /* #endif */
}

/* #ifdef H5 */
// 通过样式穿透，隐藏H5下，scroll-view下的滚动条
scroll-view ::v-deep ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
}
/* #endif */

.u-scroll-view {
    width: 100%;
    white-space: nowrap;
    position: relative;
}

.u-tab-item {
    position: relative;
    /* #ifndef APP-NVUE */
    display: inline-block;
    /* #endif */
    text-align: center;
    transition-property: background-color, color;
}

.u-tab-bar {
    position: absolute;
    bottom: 0;
}

.u-tabs-scroll-flex {
    @include vue-flex;
    justify-content: space-between;
}
</style>
