<template>
    <view
        v-if="props.show"
        class="u-tabbar"
        :class="customClass"
        :style="$u.toStyle(customStyle)"
        @touchmove.stop.prevent="() => {}"
    >
        <view
            class="u-tabbar__content safe-area-inset-bottom"
            :style="{ height: $u.addUnit(props.height), backgroundColor: props.bgColor, zIndex: uZIndex }"
            :class="{ 'u-border-top': props.borderTop }"
        >
            <view
                class="u-tabbar__content__item"
                v-for="(item, index) in props.list"
                :key="index"
                :class="{ 'u-tabbar__content__circle': props.midButton && item.midButton }"
                @tap.stop="clickHandler(index)"
                :style="{ backgroundColor: props.bgColor }"
            >
                <view
                    class="u-tabbar__content__item__container"
                    :class="{ 'u-tabbar__content__circle__container': props.midButton && item.midButton }"
                    :style="containerStyle(index)"
                >
                    <view
                        v-if="item.iconPath || item.selectedIconPath"
                        :class="[
                            props.midButton && item.midButton
                                ? 'u-tabbar__content__circle__icon'
                                : 'u-tabbar__content__item__icon'
                        ]"
                    >
                        <u-icon
                            :size="getIconSize(index)"
                            :name="elIconPath(index)"
                            img-mode="scaleToFill"
                            :color="elColor(index)"
                            :custom-prefix="getCustomPrefix(index)"
                        ></u-icon>
                        <u-badge
                            :count="item.count"
                            :is-dot="item.isDot"
                            v-if="item.count || item.isDot"
                            :offset="[
                                getBadgeOffsetTop(item.count || 0, item.isDot || false),
                                getOffsetRight(item.count || 0, item.isDot || false)
                            ]"
                        ></u-badge>
                    </view>
                    <!-- #ifdef APP-PLUS -->
                    <u-gap :height="gap"></u-gap>
                    <!-- #endif -->
                    <view
                        v-if="item.text"
                        class="u-tabbar__content__item__text"
                        :class="{
                            'u-tabbar__content__item__text--center':
                                item.text && !(item.iconPath || item.selectedIconPath)
                        }"
                    >
                        <text
                            class="u-line-1"
                            :style="{ color: elColor(index), fontSize: $u.addUnit(getTextSize(index)) }"
                        >
                            {{ item.text }}
                        </text>
                    </view>
                </view>
            </view>
            <view
                v-if="props.midButton"
                class="u-tabbar__content__circle__border"
                :class="{ 'u-border': props.borderTop }"
                :style="{ backgroundColor: props.bgColor, left: midButtonLeft }"
            ></view>
        </view>
        <!-- 这里加上一个48rpx的高度,是为了增高有凸起按钮时的防塌陷高度(也即按钮凸出来部分的高度) -->
        <!-- calc 计算0时单位不一致会计算失败，这里+1px -->
        <view
            class="u-fixed-placeholder safe-area-inset-bottom"
            :style="{ height: `calc(${$u.addUnit(props.height)} + ${props.midButton ? '60rpx' : '1px'})` }"
        ></view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-tabbar',
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
import { ref, computed, onMounted } from 'vue';
import { $u } from '../..';
import { TabbarProps } from './types';

/**
 * u-tabbar 底部导航栏
 * @property {Boolean} show 显示与否
 * @property {String|Number} value 通过v-model绑定current值
 * @property {String} bgColor 整个tabbar的背景颜色
 * @property {String|Number} height tabbar的高度，默认50px，单位任意，如果为数值，则为rpx单位
 * @property {String|Number} iconSize 非凸起图标的大小，单位任意，数值默认rpx
 * @property {String|Number} midButtonSize 凸起的图标的大小，单位任意，数值默认rpx
 * @property {String} activeColor 激活时的演示，包括字体图标，提示文字等的演示
 * @property {String} inactiveColor 未激活时的颜色
 * @property {Boolean} midButton 是否显示中部的凸起按钮
 * @property {Array} list 配置参数
 * @property {Function} beforeSwitch 切换前的回调
 * @property {Boolean} borderTop 是否显示顶部的横线
 * @property {Boolean} hideTabBar 是否隐藏原生tabbar
 * @property {String|Number} gap icon和text的间距，单位任意，数值默认rpx
 */

const props = defineProps(TabbarProps);

const emit = defineEmits<{ (e: 'change', index: number): void; (e: 'update:modelValue', index: number): void }>();

// 计算z-index值
const uZIndex = computed(() => props?.zIndex ?? $u.zIndex.tabbar);

// 由于安卓太菜了，通过css居中凸起按钮的外层元素有误差，故通过js计算将其居中
const midButtonLeft = ref('50%');
const pageUrl = ref(''); // 当前页面URL

onMounted(() => {
    // 是否隐藏原生tabbar
    // 注意：如果当前页面不是tabbar页面，浏览器控制台会报错：{errMsg: 'hideTabBar:fail not TabBar page'}
    if (props.hideTabBar) uni.hideTabBar();
    // 获取引入了u-tabbar页面的路由地址，该地址没有路径前面的"/"
    const pages = getCurrentPages();
    // 页面栈中的最后一个即为项为当前页面，route属性为页面路径
    pageUrl.value = pages[pages.length - 1].route as string;
    if (props.midButton) getMidButtonLeft();
});

/**
 * 计算当前item的icon路径
 */
const elIconPath = computed<(index: number) => string | undefined>(() => {
    return (index: number) => {
        // 历遍u-tabbar的每一项item时，判断是否传入了pagePath参数，如果传入了
        // 和data中的pageUrl参数对比，如果相等，即可判断当前的item对应当前的tabbar页面，设置高亮图标
        // 采用这个方法，可以无需使用v-model绑定的value值
        const pagePath = props.list[index]?.pagePath;
        // 如果定义了pagePath属性，意味着使用系统自带tabbar方案，否则使用一个页面用几个组件模拟tabbar页面的方案
        // 这两个方案对处理tabbar item的激活与否方式不一样
        if (pagePath) {
            if (pagePath === pageUrl.value || pagePath === '/' + pageUrl.value) {
                return props.list[index].selectedIconPath;
            } else {
                return props.list[index].iconPath;
            }
        } else {
            // 普通方案中，索引等于v-model值时，即为激活项
            return index == props.modelValue ? props.list[index].selectedIconPath : props.list[index].iconPath;
        }
    };
});

/**
 * 计算当前item的颜色
 */
const elColor = computed<(index: number) => string>(() => {
    return (index: number) => {
        // 判断方法同理于elIconPath
        const pagePath = props.list[index]?.pagePath;
        if (pagePath) {
            if (pagePath === pageUrl.value || pagePath === '/' + pageUrl.value) return props.activeColor;
            else return props.inactiveColor;
        } else {
            return index == props.modelValue ? props.activeColor : props.inactiveColor;
        }
    };
});

/**
 * 计算当前item的custom-prefix
 * customIcon为boolean时：true为"custom-icon"，false为"uicon"
 * customIcon为string时：直接使用该值
 * customIcon为空时：默认"uicon"
 */
function getCustomPrefix(index: number): string {
    const customIcon = props.list[index]?.customIcon;

    // 如果为空（undefined/null），返回默认值
    if (customIcon === undefined || customIcon === null || customIcon === '') {
        return 'uicon';
    }

    // 如果是字符串类型，直接返回
    if (typeof customIcon === 'string') {
        return customIcon;
    }

    // 如果是boolean类型
    if (typeof customIcon === 'boolean') {
        return customIcon ? 'custom-icon' : 'uicon';
    }

    // 默认返回uicon
    return 'uicon';
}

/**
 * 点击tabbar item
 */
async function clickHandler(index: number) {
    if (props.beforeSwitch && typeof props.beforeSwitch === 'function') {
        // 执行回调，同时传入索引当作参数
        let beforeSwitchResult = props.beforeSwitch(index);
        // 判断是否返回了promise
        if (
            typeof beforeSwitchResult === 'object' &&
            beforeSwitchResult !== null &&
            typeof beforeSwitchResult.then === 'function'
        ) {
            await beforeSwitchResult
                .then(() => {
                    // promise返回成功，
                    switchTab(index);
                })
                .catch(() => {});
        } else if (beforeSwitchResult === true) {
            // 如果返回true
            switchTab(index);
        }
    } else {
        switchTab(index);
    }
}

/**
 * 切换tab
 */
function switchTab(index: number) {
    // 发出事件和修改v-model绑定的值
    emit('change', index);
    // 如果有配置pagePath属性，使用uni.switchTab进行跳转
    if (props.list[index]?.pagePath) {
        uni.switchTab({ url: props.list[index].pagePath as string });
    } else {
        // 如果配置了papgePath属性，将不会双向绑定v-model传入的value值
        // 因为这个模式下，不再需要v-model绑定的value值了，而是通过getCurrentPages()适配
        emit('update:modelValue', index);
    }
}

/**
 * 计算角标的right值
 */
function getOffsetRight(count: number, isDot: boolean): number {
    // 点类型，count大于9(两位数)，分别设置不同的right值，避免位置太挤
    if (isDot) {
        return -20;
    } else if (count > 9) {
        return -40;
    } else {
        return -30;
    }
}

/**
 * 计算角标的top值，在垂直布局下调整位置
 */
function getBadgeOffsetTop(count: number, isDot: boolean): number {
    // 在垂直布局下，角标相对于icon的top偏移需要调整
    // 由于icon现在在flex容器中，需要更小的top偏移
    return -2;
}

/**
 * 获取单项icon尺寸（单项优先级高于props）
 */
function getIconSize(index: number) {
    const item = props.list[index] || {};
    if (props.midButton && item.midButton) {
        return props.midButtonSize;
    }
    if (item.iconSize !== undefined && item.iconSize !== null && item.iconSize !== '') {
        return item.iconSize;
    }
    return props.iconSize;
}

/**
 * 获取单项text尺寸（单项优先级高于props）
 */
function getTextSize(index: number) {
    const item = props.list[index] || {};
    if (item.textSize !== undefined && item.textSize !== null && item.textSize !== '') {
        return item.textSize;
    }
    return props.textSize;
}

/**
 * 获取凸起按钮外层元素的left值，让其水平居中
 */
function getMidButtonLeft() {
    const windowWidth = $u.sys().windowWidth;
    // 由于安卓中css计算left: 50%的结果不准确，故用js计算
    midButtonLeft.value = windowWidth / 2 + 'px';
}

/**
 * 图标和文字间距
 */
function containerStyle(index: number) {
    const style: Record<string, any> = {};
    const item = props.list[index] || {};
    // #ifndef APP-PLUS
    if (item.gap !== undefined && item.gap !== null && item.gap !== '') {
        style.gap = $u.addUnit(item.gap);
    } else {
        style.gap = $u.addUnit(props.gap);
    }
    // #endif
    // 如果是中间凸起按钮，为容器增加上内边距，避免文字被绝对定位的图标遮挡
    if (props.midButton && item.midButton) {
        const iconSizeRaw = getIconSize(index);
        const numericSize = parseFloat(String(iconSizeRaw)) || parseFloat(String(props.midButtonSize as any)) || 100;
        // paddingTop: 半个图标高度 + 10rpx 的缓冲间距
        style.paddingTop = $u.addUnit(numericSize / 2 + 8);
        style.boxSizing = 'border-box';
    }
    return $u.toStyle(style);
}
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';
.u-fixed-placeholder {
    /* #ifndef APP-NVUE */
    box-sizing: content-box;
    /* #endif */
    height: 50px;
}
.u-tabbar {
    &__content {
        @include vue-flex;
        align-items: center;
        position: relative;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 998;
        /* #ifndef APP-NVUE */
        box-sizing: content-box;
        /* #endif */
        &__circle__border {
            border-radius: 100%;
            width: 130rpx;
            height: 130rpx;
            top: -58rpx;
            position: absolute;
            z-index: 4;
            background-color: var(--u-bg-white);
            // 由于安卓的无能，导致只有3个tabbar item时，此css计算方式有误差
            // 故使用js计算的形式来定位，此处不注释，是因为js计算有延后，避免出现位置闪动
            left: 50%;
            transform: translateX(-50%);
            &:after {
                border-radius: 100px;
            }
        }
        &__item {
            flex: 1;
            justify-content: center;
            height: 100%;
            padding: 12rpx 0;
            @include vue-flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            &__container {
                @include vue-flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
                position: relative;
            }
            &__icon {
                position: relative;
                @include vue-flex;
                align-items: center;
                justify-content: center;
            }
            &__text {
                color: $u-content-color;
                font-size: 26rpx;
                line-height: 28rpx;
                text-align: center;
                width: 100%;
            }
        }
        &__circle {
            position: relative;
            @include vue-flex;
            flex-direction: column;
            justify-content: space-between;
            z-index: 10;
            /* #ifndef APP-NVUE */
            height: calc(100% - 1px);
            /* #endif */
            &__container {
                @include vue-flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
                position: relative;
                box-sizing: border-box;
            }
            &__icon {
                width: 100rpx;
                height: 100rpx;
                border-radius: 100%;
                @include vue-flex;
                justify-content: center;
                align-items: center;
                background-color: var(--u-bg-white);
                /* 将凸起图标上移，与顶部边框线对齐 */
                position: absolute;
                top: -55rpx;
                left: 50%;
                z-index: 6;
                transform: translateX(-50%);
            }
        }
    }
}
</style>
