<template>
    <view class="u-tabs" :style="{ zIndex: zIndex, background: bgColor }">
        <scroll-view scroll-x class="u-scroll-view" :scroll-left="scrollLeft" scroll-with-animation :style="{ zIndex: Number(zIndex) + 1 }">
            <view class="u-tabs-scroll-box" :class="{ 'u-tabs-scroll-flex': !isScroll }">
                <view class="u-tabs-item" :style="tabItemStyle(index)" v-for="(item, index) in getTabs" :key="index" :class="[preId + index]" @tap="emitTabChange(index)">
                    <u-badge :count="item[count] || item['count'] || 0" :offset="offset" size="mini"></u-badge>
                    {{ item[name] || item['name'] }}
                </view>
                <view v-if="showBar" class="u-scroll-bar" :style="tabBarStyle"></view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, getCurrentInstance } from 'vue';
import colorGradient from '../../libs/function/colorGradient';
import { TabsSwiperProps } from './types';

defineOptions({ name: 'u-tabs-swiper' });

/**
 * tabsSwiper 全屏选项卡
 * @description 该组件内部实现主要依托于uniapp的scroll-view和swiper组件，主要特色是切换过程中，tabsSwiper文字的颜色可以渐变，底部滑块可以 跟随式滑动，活动tab滚动居中等。应用场景可以用于需要左右切换页面，比如商城的订单中心(待收货-待付款-待评价-已退货)等应用场景。
 * @tutorial https://uviewpro.cn/zh/components/tabsSwiper.html
 * @property {Boolean} is-scroll tabs是否可以左右拖动（默认true）
 * @property {Array} list 标签数组，元素为对象，如[{name: '推荐'}]
 * @property {String|Number} current 指定哪个tab为激活状态（默认0）
 * @property {String|Number} height 导航栏的高度，单位rpx（默认80）
 * @property {String|Number} font-size tab文字大小，单位rpx（默认30）
 * @property {String|Number} swiper-width tabs组件外部swiper的宽度，默认为屏幕宽度，单位rpx（默认750）
 * @property {String} active-color 滑块和激活tab文字的颜色（默认#2979ff）
 * @property {String} inactive-color tabs文字颜色（默认#303133）
 * @property {String|Number} bar-width 滑块宽度，单位rpx（默认40）
 * @property {String|Number} bar-height 滑块高度，单位rpx（默认6）
 * @property {Object} bar-style 底部滑块的样式，对象形式
 * @property {Object} active-item-style 活动tabs item的样式，对象形式
 * @property {Boolean} show-bar 是否显示底部的滑块（默认true）
 * @property {String|Number} gutter 单个tab标签的左右内边距之和，单位rpx（默认40）
 * @property {String} bg-color tabs导航栏的背景颜色（默认#ffffff）
 * @property {String} name 组件内部读取的list参数中的属性名，见官网说明（默认name）
 * @property {String} count 组件内部读取的list参数中的属性名（badge徽标数），同name属性的使用，见官网说明（默认count）
 * @property {Array} offset 设置badge徽标数的位置偏移，格式为 [x, y]，也即设置的为top和right的值，单位rpx（默认[5, 20]）
 * @property {Boolean} bold 激活选项的字体是否加粗（默认true）
 * @event {Function} change 点击标签时触发
 * @example <u-tabs-swiper ref="tabs" :list="list" :is-scroll="false"></u-tabs-swiper>
 */

// props 定义
const props = defineProps(TabsSwiperProps);

const color = colorGradient;
const { windowWidth } = uni.getSystemInfoSync();
const preId = 'UEl_';

// emits 定义
const emit = defineEmits(['change']);
const instance = getCurrentInstance();
// 滚动scroll-view的左边滚动距离
const scrollLeft = ref(0);
// 存放对tab菜单查询后的节点信息
const tabQueryInfo = ref<any[]>([]);
// 屏幕宽度，单位为px
const componentsWidth = ref(0);
// 滑块需要通过translateX()移动的距离
const line3Dx = ref(0);
const line3AddDx = ref(0);
const animationFinishCurrent = ref(Number(props.current));
// 两个颜色之间的渐变等分
const colorStep = ref(100);
const colorGradientArr = ref<string[]>([]);
const tabsInfo = ref<any[]>([]);
const sW = ref(uni.upx2px(Number(props.swiperWidth)));

// 计算当前活跃tab索引
const getCurrent = computed(() => {
    const current = Number(props.current);
    // 判断是否超出边界
    if (current > getTabs.value.length - 1) return getTabs.value.length - 1;
    if (current < 0) return 0;
    return current;
});

// 获取tabs数组
const getTabs = computed(() => props.list);

// 滑块需要移动的距离
const scrollBarLeft = computed(() => Number(line3Dx.value) + Number(line3AddDx.value));

// 滑块宽度转为px单位
const barWidthPx = computed(() => uni.upx2px(Number(props.barWidth)));

// tab的样式
function tabItemStyle(index: number) {
    let style: Record<string, any> = {
        height: props.height + 'rpx',
        lineHeight: props.height + 'rpx',
        padding: `0 ${Number(props.gutter) / 2}rpx`,
        color: tabsInfo.value.length > 0 ? (tabsInfo.value[index] ? tabsInfo.value[index].color : props.activeColor) : props.inactiveColor,
        fontSize: props.fontSize + 'rpx',
        zIndex: Number(props.zIndex) + 2,
        fontWeight: index == getCurrent.value && props.bold ? 'bold' : 'normal'
    };
    if (index == getCurrent.value) {
        // 给选中的tab item添加外部自定义的样式
        style = Object.assign(style, props.activeItemStyle);
    }
    return style;
}

// 底部滑块的样式
const tabBarStyle = computed(() => {
    let style: Record<string, any> = {
        width: barWidthPx.value + 'px',
        height: props.barHeight + 'rpx',
        borderRadius: '100px',
        backgroundColor: props.activeColor,
        left: scrollBarLeft.value + 'px'
    };
    return Object.assign(style, props.barStyle);
});

// 颜色渐变过程数组
function updateColorGradientArr() {
    colorGradientArr.value = color.colorGradient(props.inactiveColor, props.activeColor, colorStep.value);
}

// tabsInfo 计算
async function getTabsInfo() {
    return new Promise<void>(resolve => {
        const view = uni.createSelectorQuery().in(instance?.proxy);
        for (let i = 0; i < props.list.length; i++) {
            view.select('.' + preId + i).boundingClientRect();
        }
        view.exec((res: any[]) => {
            const arr: any[] = [];
            for (let i = 0; i < res.length; i++) {
                // 给每个tab添加其文字颜色属性
                res[i].color = props.inactiveColor;
                // 当前tab直接赋予activeColor
                if (i == getCurrent.value) res[i].color = props.activeColor;
                arr.push(res[i]);
            }
            tabsInfo.value = arr;
            resolve();
        });
    });
}

// 当swiper滑动结束，计算滑块最终要停留的位置
function countLine3Dx() {
    const tab = tabsInfo.value[animationFinishCurrent.value];
    // 让滑块中心点和当前tab中心重合
    if (tab) line3Dx.value = tab.left + tab.width / 2 - barWidthPx.value / 2 - tabsInfo.value[0].left;
}

// swiper宽度由rpx转为px单位
function countPx() {
    // swiper宽度由rpx转为px单位，因为dx等，都是px单位
    sW.value = uni.upx2px(Number(props.swiperWidth));
}

// 触发change事件
function emitTabChange(index: number) {
    emit('change', index);
}

// 滚动居中
function setScrollViewToCenter() {
    const tab = tabsInfo.value[animationFinishCurrent.value];
    if (tab) {
        const tabCenter = tab.left + tab.width / 2;
        let fatherWidth;
        if (props.autoCenterMode === 'window') fatherWidth = windowWidth;
        else fatherWidth = componentsWidth.value;
        scrollLeft.value = tabCenter - fatherWidth / 2;
    }
}

// 查询tab组件宽度
function getQuery(cb?: (data: any) => void) {
    try {
        const view = uni.createSelectorQuery().in(instance?.proxy).select('.u-tabs');
        view.fields({ size: true }, (data: any) => {
            if (data) {
                componentsWidth.value = data.width;
                if (cb) cb(data);
            } else {
                getQuery(cb);
            }
        }).exec();
    } catch (e) {
        componentsWidth.value = windowWidth;
    }
}

// 颜色渐变tab滑动
function setDx(dx: number) {
    let nextTabIndex = dx > 0 ? animationFinishCurrent.value + 1 : animationFinishCurrent.value - 1;
    // 判断索引是否超出边界
    nextTabIndex = nextTabIndex <= 0 ? 0 : nextTabIndex;
    nextTabIndex = nextTabIndex >= props.list.length ? props.list.length - 1 : nextTabIndex;
    const tab = tabsInfo.value[nextTabIndex];
    // 当前tab中心点x轴坐标
    const nowTab = tabsInfo.value[animationFinishCurrent.value];
    const nowTabX = nowTab.left + nowTab.width / 2;
    // 下一个tab
    const nextTabX = tab.left + tab.width / 2;
    // 两个tab之间的距离，因为下一个tab可能在当前tab的左边或者右边，取绝对值即可
    const distanceX = Math.abs(nextTabX - nowTabX);
    line3AddDx.value = (dx / sW.value) * distanceX;
    setTabColor(animationFinishCurrent.value, nextTabIndex, dx);
}

// 设置tab的颜色
function setTabColor(nowTabIndex: number, nextTabIndex: number, dx: number) {
    let colorIndex = Math.abs(Math.ceil((dx / sW.value) * 100));
    const colorLength = colorGradientArr.value.length;
    // 处理超出索引边界的情况
    colorIndex = colorIndex >= colorLength ? colorLength - 1 : colorIndex <= 0 ? 0 : colorIndex;
    // 设置下一个tab的颜色
    tabsInfo.value[nextTabIndex].color = colorGradientArr.value[colorIndex];
    // 设置当前tab的颜色
    tabsInfo.value[nowTabIndex].color = colorGradientArr.value[colorLength - 1 - colorIndex];
}

// swiper结束滑动
function setFinishCurrent(current: number) {
    // 如果滑动的索引不一致，修改tab颜色变化，因为可能会有直接点击tab的情况
    tabsInfo.value = tabsInfo.value.map((val, index) => {
        val.color = current == index ? props.activeColor : props.inactiveColor;
        return val;
    });
    line3AddDx.value = 0;
    animationFinishCurrent.value = current;
    countLine3Dx();
}

// 监听current变化
watch(
    () => props.current,
    n => {
        setFinishCurrent(Number(n));
    }
);

// 监听list变化
watch(
    () => props.list,
    () => {
        nextTick(() => {
            init();
        });
    }
);

// 初始化
async function init() {
    countPx();
    await getTabsInfo();
    countLine3Dx();
    getQuery(() => {
        setScrollViewToCenter();
    });
    updateColorGradientArr();
}

onMounted(() => {
    init();
});

defineExpose({ init, emit, setDx, setFinishCurrent, setTabColor, setScrollViewToCenter });
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

view,
scroll-view {
    box-sizing: border-box;
}

.u-tabs {
    width: 100%;
    transition-property: background-color, color;
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

.u-tabs-scroll-box {
    position: relative;
}

.u-tabs-scroll-flex {
    @include vue-flex;
    justify-content: space-between;
}

.u-tabs-scroll-flex .u-tabs-item {
    flex: 1;
}

.u-tabs-item {
    position: relative;
    display: inline-block;
    text-align: center;
    transition-property: background-color, color, font-weight;
}

.content {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.boxStyle {
    pointer-events: none;
    position: absolute;
    transition-property: all;
}

.boxStyle2 {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    transition-property: all;
    transform: translateY(-100%);
}

.itemBackgroundBox {
    pointer-events: none;
    position: absolute;
    top: 0;
    transition-property: left, background-color;
    @include vue-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.itemBackground {
    height: 100%;
    width: 100%;
    transition-property: all;
}

.u-scroll-bar {
    position: absolute;
    bottom: 4rpx;
}
</style>
