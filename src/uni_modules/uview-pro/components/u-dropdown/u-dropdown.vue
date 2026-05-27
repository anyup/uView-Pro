<template>
    <view class="u-dropdown-wrapper">
        <view class="u-dropdown" :style="dropdownRootStyle" :class="[{ 'u-dropdown__fixed': fixed }, customClass]">
            <view
                class="u-dropdown__menu"
                :style="{ height: $u.addUnit(height) }"
                :class="{ 'u-border-bottom': borderBottom }"
            >
                <view
                    class="u-dropdown__menu__item"
                    v-for="(item, index) in menuList"
                    :key="index"
                    @tap.stop="menuClick(index)"
                >
                    <view class="u-flex">
                        <text
                            class="u-dropdown__menu__item__text"
                            :style="{
                                color: item.disabled
                                    ? 'var(--u-light-color)'
                                    : index === current || highlightIndex == index
                                      ? activeColor
                                      : inactiveColor,
                                fontSize: $u.addUnit(titleSize)
                            }"
                            >{{ item.title }}</text
                        >
                        <view
                            class="u-dropdown__menu__item__arrow"
                            :class="{
                                'u-dropdown__menu__item__arrow--rotate': index === current
                            }"
                        >
                            <u-icon
                                :custom-style="{ display: 'flex' }"
                                :name="menuIcon"
                                :size="$u.addUnit(menuIconSize)"
                                :color="
                                    index === current || highlightIndex == index ? activeColor : 'var(--u-light-color)'
                                "
                            ></u-icon>
                        </view>
                    </view>
                </view>
            </view>
            <view
                class="u-dropdown__content"
                :style="[
                    contentStyle,
                    {
                        transition: `opacity ${Number(duration) / 1000}s linear`,
                        top: $u.addUnit(height),
                        height: contentHeight + 'px'
                    }
                ]"
                @tap="maskClick"
                @touchmove.stop.prevent
            >
                <view @tap.stop.prevent class="u-dropdown__content__popup" :style="[popupStyle]">
                    <slot></slot>
                </view>
                <view class="u-dropdown__content__mask"></view>
            </view>
        </view>
        <!-- fixed定位时的占位区域，防止页面内容塌陷 -->
        <view
            v-if="fixed && !immersive"
            class="u-dropdown__placeholder"
            :style="{ height: dropdownPlaceholderHeight + 'px' }"
        ></view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-dropdown',
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
import { ref, computed, onMounted, nextTick } from 'vue';
import { $u, useParent } from '../..';
import { DropdownProps } from './types';

/**
 * dropdown 下拉菜单
 * @description 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景。
 * 支持fixed定位，自动适配状态栏和导航栏高度，并提供占位区域防止页面塌陷。
 * @tutorial https://uviewpro.cn/zh/components/dropdown.html
 * @property {String} active-color 标题和选项卡选中的颜色（默认主题色primary）
 * @property {String} inactive-color 标题和选项卡未选中的颜色（默认var(--u-content-color)）
 * @property {Boolean} close-on-click-mask 点击遮罩是否关闭菜单（默认true）
 * @property {Boolean} close-on-click-self 点击当前激活项标题是否关闭菜单（默认true）
 * @property {String | Number} duration 选项卡展开和收起的过渡时间，单位ms（默认300）
 * @property {String | Number} height 标题菜单的高度，单位任意（默认80）
 * @property {String | Number} border-radius 菜单展开内容下方的圆角值，单位任意（默认0）
 * @property {Boolean} border-bottom 标题菜单是否显示下边框（默认false）
 * @property {String | Number} title-size 标题的字体大小，单位任意，数值默认为rpx单位（默认28）
 * @property {Boolean} fixed 是否使用fixed定位固定在顶部，自动适配状态栏和导航栏高度（默认false）
 * @property {String | Number} offset-top fixed定位时，在自动计算的偏移量基础上的额外顶部偏移量，单位px（默认0）
 * @property {String | Number} navbar-height fixed定位时，状态栏+导航栏的总高度(px)。不设置则自动获取，设置任意数值(包括0)则使用指定值
 * @property {Boolean} immersive 沉浸式模式，仅在fixed下生效，开启后不生成占位区域（默认false）
 * @property {String | Number} z-index fixed定位时的z-index值（默认985）
 * @event {Function} open 下拉菜单被打开时触发
 * @event {Function} close 下拉菜单被关闭时触发
 * @example <u-dropdown :fixed="true"></u-dropdown>
 */

const props = defineProps(DropdownProps);
const emit = defineEmits(['open', 'close']);

const { children } = useParent('u-dropdown');
// 菜单列表
const menuList = ref<any[]>([]);
// 下拉菜单的状态
const active = ref(false);
// 当前激活菜单索引
// 当前是第几个菜单处于激活状态，小程序中此处不能写成false或者""，否则后续将current赋值为0，
// 无能的TX没有使用===而是使用==判断，导致程序认为前后二者没有变化，从而不会触发视图更新
const current = ref<number>(99999);
// 外层内容样式
const contentStyle = ref<any>({ zIndex: -1, opacity: 0 });
// 高亮菜单索引
const highlightIndex = ref<number>(99999);
// 下拉内容高度
const contentHeight = ref<number>(0);

// ==================== fixed定位相关 ====================
// 获取系统状态栏高度
const systemInfo = uni.getSystemInfoSync();
const statusBarHeight = ref(0);
// #ifdef APP-HARMONY || MP-WEIXIN
const windowInfo = uni.getWindowInfo();
statusBarHeight.value = windowInfo.statusBarHeight || 0;
// #endif
// #ifndef APP-HARMONY || MP-WEIXIN
statusBarHeight.value = systemInfo.statusBarHeight || 0;
// #endif

// 默认导航栏高度（与 u-navbar 保持一致）
const defaultNavbarHeight = computed(() => {
    // #ifdef APP || H5
    return 44;
    // #endif
    // #ifdef MP
    return systemInfo.platform === 'ios' ? 44 : 48;
    // #endif
});

/**
 * 计算 fixed 定位时的总偏移高度（px）
 * - 若用户通过 navbarHeight 指定了任意数值（包括0），则使用用户指定值
 * - 否则（空字符串）自动计算：状态栏高度 + 默认导航栏高度
 * - 最后加上 offsetTop 作为额外偏移
 */
const dropdownOffsetHeight = computed(() => {
    let baseHeight: number;
    if (props.navbarHeight !== '' && props.navbarHeight !== undefined && props.navbarHeight !== null) {
        // 用户手动指定了 navbar 高度（包括0），直接使用
        baseHeight = Number(props.navbarHeight);
    } else {
        // 自动计算：状态栏高度 + 默认导航栏高度
        baseHeight = statusBarHeight.value + defaultNavbarHeight.value;
    }
    // 加上用户设置的额外 offsetTop 偏移
    return baseHeight + Number(props.offsetTop);
});

/**
 * 占位区域高度 = dropdown菜单栏自身高度（px）
 * 不包含状态栏+导航栏偏移，因为页面上已有 navbar 等元素占据该空间
 */
const dropdownPlaceholderHeight = computed(() => {
    return uni.upx2px(Number(props.height));
});

/**
 * dropdown 根节点样式
 * fixed 时设置 top 和 z-index
 */
const dropdownRootStyle = computed(() => {
    const style: Record<string, any> = {};

    // 兼容头条小程序
    // #ifdef MP-TOUTIAO
    style.width = '100vw';
    // #endif

    // fixed 定位时，计算顶部偏移和 z-index
    if (props.fixed) {
        style.top = dropdownOffsetHeight.value + 'px';
        style.zIndex = props.zIndex ? Number(props.zIndex) : $u.zIndex.dropdown;
    }

    return style;
});

// 下拉出来部分的样式
const popupStyle = computed<any>(() => {
    const style: any = {};
    // 进行Y轴位移，展开状态时，恢复原位。收齐状态时，往上位移100%，进行隐藏
    style.transform = `translateY(${active.value ? 0 : '-100%'})`;
    style['transition-duration'] = Number(props.duration) / 1000 + 's';
    style.borderRadius = `0 0 ${$u.addUnit(props.borderRadius)} ${$u.addUnit(props.borderRadius)}`;
    return style;
});

// 生命周期
onMounted(() => {
    getContentHeight();
});

/**
 * 初始化所有子组件
 * 当某个子组件内容变化时，触发父组件的init，父组件再让每一个子组件重新初始化一遍
 * 以保证数据的正确性
 */
function init() {
    menuList.value = [];
    children.forEach(child => {
        // 过滤不显示的项
        const show = child?.getExposed()?.props.show !== false;
        if (!show) return;

        menuList.value.push({
            title: child?.getExposed()?.props.title ?? '',
            disabled: child?.getExposed()?.props.disabled ?? false,
            childIndex: children.indexOf(child)
        });
    });
}

/**
 * 点击菜单
 * @param index 菜单索引
 */
function menuClick(index: number) {
    // 判断是否被禁用
    if (menuList.value[index]?.disabled) return;
    // 如果点击时的索引和当前激活项索引相同，意味着点击了激活项，需要收起下拉菜单
    if (index === current.value && props.closeOnClickSelf) {
        close();
        // 等动画结束后，再移除下拉菜单中的内容，否则直接移除，也就没有下拉菜单收起的效果了
        const childIndex = menuList.value[index]?.childIndex; //避免访问到show为false的项
        setTimeout(() => {
            if (childIndex !== undefined && children[childIndex]) {
                children[childIndex]?.getExposed()?.setActive(false);
            }
        }, Number(props.duration));
        return;
    }
    open(index);
}

/**
 * 打开下拉菜单
 * @param index 菜单索引
 */
function open(index: number) {
    // 嵌套popup使用时可能获取不到正确的高度，重新计算
    if (contentHeight.value < 1) getContentHeight();
    // 重置高亮索引，否则会造成多个菜单同时高亮
    // highlightIndex.value = 9999;
    // 展开时，设置下拉内容的样式
    contentStyle.value = { zIndex: 11, display: 'block' };
    // 标记展开状态以及当前展开项的索引
    active.value = true;
    current.value = index;
    // 历遍所有的子元素，将索引匹配的项标记为激活状态，因为子元素是通过v-if控制切换的
    // 之所以不是因display: none，是因为nvue没有display这个属性
    const childIndex = menuList.value[index]?.childIndex; //避免访问到show为false的项
    children.forEach((child, idx) => {
        child?.getExposed()?.setActive(childIndex === idx ? true : false);
    });
    emit('open', current.value);
}

/**
 * 设置下拉菜单处于收起状态
 */
function close() {
    emit('close', current.value);
    // 设置为收起状态，同时current归位，设置为空字符串
    active.value = false;
    current.value = 99999;
    // 下拉内容的样式进行调整，不透明度设置为0，fixed模式下隐藏display避免遮挡页面元素
    if (props.fixed) {
        contentStyle.value = { zIndex: -1, opacity: 0, display: 'none' };
    } else {
        contentStyle.value = { zIndex: -1, opacity: 0 };
    }
}

/**
 * 点击遮罩
 */
function maskClick() {
    // 如果不允许点击遮罩，直接返回
    if (!props.closeOnClickMask) return;
    close();
}

/**
 * 外部手动设置某个菜单高亮
 * @param index 菜单索引
 */
function highlight(index?: number) {
    highlightIndex.value = index !== undefined ? index : 99999;
}

/**
 * 获取下拉菜单内容的高度
 * 这里的原理为，因为dropdown组件是相对定位的，它的下拉出来的内容，必须给定一个高度
 * 才能让遮罩占满菜单一下，直到屏幕底部的高度
 * this.$u.sys()为uView封装的获取设备信息的方法
 */
function getContentHeight() {
    const windowHeight = $u.sys().windowHeight;
    contentHeight.value = windowHeight;

    // $u.getRect('.u-dropdown__menu', instance).then((res: any) => {
    //     // 这里获取的是dropdown的尺寸，在H5上，uniapp获取尺寸是有bug的(以前提出修复过，后来又出现了此bug，目前hx2.8.11版本)
    //     // H5端bug表现为元素尺寸的top值为导航栏底部到到元素的上边沿的距离，但是元素的bottom值确是导航栏顶部到元素底部的距离
    //     // 二者是互相矛盾的，本质原因是H5端导航栏非原生，uni的开发者大意造成
    //     // 这里取菜单栏的botton值合理的，不能用res.top，否则页面会造成滚动
    //     contentHeight.value = windowHeight - res.bottom;
    // });
}

onMounted(() => {
    nextTick(() => {
        init();
    });
});

// 暴露方法
defineExpose({
    props,
    init,
    close,
    open,
    highlight,
    getContentHeight,
    children,
    menuList
});
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-dropdown-wrapper {
    width: 100%;
}

.u-dropdown {
    flex: 1;
    width: 100%;
    position: relative;

    &__fixed {
        position: fixed;
        left: 0;
        right: 0;
        background-color: #fff;
    }

    &__placeholder {
        width: 100%;
    }

    &__menu {
        @include vue-flex;
        position: relative;
        z-index: 11;
        height: 80rpx;

        &__item {
            flex: 1;
            @include vue-flex;
            justify-content: center;
            align-items: center;

            &__text {
                font-size: 28rpx;
                color: $u-content-color;
            }

            &__arrow {
                margin-left: 6rpx;
                transition: transform 0.3s;
                align-items: center;
                @include vue-flex;

                &--rotate {
                    transform: rotate(180deg);
                }
            }
        }
    }

    &__content {
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0;
        overflow: hidden;

        &__mask {
            position: absolute;
            z-index: 9;
            background: rgba(0, 0, 0, 0.3);
            width: 100%;
            left: 0;
            top: 0;
            bottom: 0;
        }

        &__popup {
            position: relative;
            z-index: 10;
            transition: all 0.3s;
            transform: translate3D(0, -100%, 0);
            overflow: hidden;
        }
    }
}
</style>
