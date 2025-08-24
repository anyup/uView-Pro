<template>
    <view v-if="props.show" class="u-tabbar" @touchmove.stop.prevent="() => {}">
        <view
            class="u-tabbar__content safe-area-inset-bottom"
            :style="{ height: $u.addUnit(props.height), backgroundColor: props.bgColor }"
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
                <view :class="[props.midButton && item.midButton ? 'u-tabbar__content__circle__button' : 'u-tabbar__content__item__button']">
                    <u-icon
                        :size="props.midButton && item.midButton ? props.midButtonSize : props.iconSize"
                        :name="elIconPath(index)"
                        img-mode="scaleToFill"
                        :color="elColor(index)"
                        :custom-prefix="item.customIcon ? 'custom-icon' : 'uicon'"
                    ></u-icon>
                    <u-badge :count="item.count" :is-dot="item.isDot" v-if="item.count || item.isDot" :offset="[-2, getOffsetRight(item.count, item.isDot)]"></u-badge>
                </view>
                <view class="u-tabbar__content__item__text" :style="{ color: elColor(index) }">
                    <text class="u-line-1">{{ item.text }}</text>
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
        <view class="u-fixed-placeholder safe-area-inset-bottom" :style="{ height: `calc(${$u.addUnit(props.height)} + ${props.midButton ? '48rpx' : '1px'})` }"></view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { TabbarProps } from './types';

defineOptions({ name: 'u-tabbar' });

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
 */

const props = defineProps(TabbarProps);

const emit = defineEmits<{ (e: 'change', index: number): void; (e: 'update:modelValue', index: number): void }>();

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
const elIconPath = computed<(index: number) => string>(() => {
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
 * 点击tabbar item
 */
async function clickHandler(index: number) {
    if (props.beforeSwitch && typeof props.beforeSwitch === 'function') {
        // 执行回调，同时传入索引当作参数
        let beforeSwitchResult = props.beforeSwitch(index);
        // 判断是否返回了promise
        if (typeof beforeSwitchResult === 'object' && beforeSwitchResult !== null && typeof beforeSwitchResult.then === 'function') {
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
        uni.switchTab({ url: props.list[index].pagePath });
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
 * 获取凸起按钮外层元素的left值，让其水平居中
 */
function getMidButtonLeft() {
    const windowWidth = $u.sys().windowWidth;
    // 由于安卓中css计算left: 50%的结果不准确，故用js计算
    midButtonLeft.value = windowWidth / 2 + 'px';
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
            width: 110rpx;
            height: 110rpx;
            top: -48rpx;
            position: absolute;
            z-index: 4;
            background-color: #ffffff;
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
            &__button {
                position: absolute;
                top: 14rpx;
                left: 50%;
                transform: translateX(-50%);
            }
            &__text {
                color: $u-content-color;
                font-size: 26rpx;
                line-height: 28rpx;
                position: absolute;
                bottom: 14rpx;
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                text-align: center;
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
            &__button {
                width: 90rpx;
                height: 90rpx;
                border-radius: 100%;
                @include vue-flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                background-color: #ffffff;
                top: -40rpx;
                left: 50%;
                z-index: 6;
                transform: translateX(-50%);
            }
        }
    }
}
</style>
