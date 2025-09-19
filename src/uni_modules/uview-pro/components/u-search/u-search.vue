<template>
    <view
        class="u-search"
        @tap="clickHandler"
        :style="{
            margin: margin
        }"
    >
        <view
            class="u-content"
            :style="{
                backgroundColor: bgColor,
                borderRadius: shape == 'round' ? '100rpx' : '10rpx',
                border: borderStyle,
                height: height + 'rpx'
            }"
        >
            <view class="u-icon-wrap">
                <u-icon class="u-clear-icon" :size="30" :name="searchIcon" :color="searchIconColor ? searchIconColor : color"></u-icon>
            </view>
            <input
                confirm-type="search"
                @blur="blur"
                :value="modelValue"
                @confirm="search"
                @input="inputChange"
                :disabled="disabled"
                @focus="getFocus"
                :focus="focus"
                :maxlength="maxlength"
                placeholder-class="u-placeholder-class"
                :placeholder="placeholder"
                :placeholder-style="`color: ${placeholderColor}`"
                class="u-input"
                type="text"
                :style="[
                    {
                        textAlign: inputAlign,
                        color: color,
                        backgroundColor: bgColor
                    },
                    inputStyle
                ]"
            />
            <view class="u-close-wrap" v-if="keyword && clearabled && focused" @tap="clear">
                <u-icon class="u-clear-icon" name="close-circle-fill" size="34" color="#c0c4cc"></u-icon>
            </view>
        </view>
        <view :style="[actionStyle]" class="u-action" :class="[showActionBtn || show ? 'u-action-active' : '']" @tap.stop.prevent="custom">{{ actionText }}</view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { SearchProps } from './types';

defineOptions({ name: 'u-search' });

/**
 * search 搜索框
 * @description 搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用。
 * @tutorial https://uviewpro.cn/zh/components/search.html
 * @property {String} shape 搜索框形状，round-圆形，square-方形（默认round）
 * @property {String} bg-color 搜索框背景颜色（默认#f2f2f2）
 * @property {String} border-color 边框颜色，配置了颜色，才会有边框
 * @property {String} placeholder 占位文字内容（默认“请输入关键字”）
 * @property {Boolean} clearabled 是否启用清除控件（默认true）
 * @property {Boolean} focus 是否自动获得焦点（默认false）
 * @property {Boolean} show-action 是否显示右侧控件（默认true）
 * @property {String} action-text 右侧控件文字（默认“搜索”）
 * @property {Object} action-style 右侧控件的样式，对象形式
 * @property {String} input-align 输入框内容水平对齐方式（默认left）
 * @property {Object} input-style 自定义输入框样式，对象形式
 * @property {Boolean} disabled 是否启用输入框（默认false）
 * @property {String} search-icon-color 搜索图标的颜色，默认同输入框字体颜色
 * @property {String} color 输入框字体颜色（默认#606266）
 * @property {String} placeholder-color placeholder的颜色（默认#909399）
 * @property {String} search-icon 输入框左边的图标，可以为uView图标名称或图片路径
 * @property {String} margin 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30rpx"
 * @property {Boolean} animation 是否开启动画，见上方说明（默认false）
 * @property {String} value 输入框初始值
 * @property {String | Number} maxlength 输入框最大能输入的长度，-1为不限制长度
 * @property {Boolean} input-style input输入框的样式，可以定义文字颜色，大小等，对象形式
 * @property {String | Number} height 输入框高度，单位rpx（默认64）
 * @event {Function} change 输入框内容发生变化时触发
 * @event {Function} search 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发
 * @event {Function} custom 用户点击右侧控件时触发
 * @event {Function} clear 用户点击清除按钮时触发
 * @example <u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
 */

const props = defineProps(SearchProps);

const emit = defineEmits(['update:modelValue', 'change', 'search', 'custom', 'clear', 'focus', 'blur', 'click']);

// 绑定输入框的值
const keyword = ref(props.modelValue);
// 是否显示右边的清除图标
const showClear = ref(false);
// 控制右侧动画展开
const show = ref(false);
// 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
const focused = ref(props.focus);

// 监听v-model和props.value变化
watch(
    () => props.modelValue,
    nVal => {
        keyword.value = nVal;
    }
);
watch(keyword, nVal => {
    emit('update:modelValue', nVal);
    emit('change', nVal);
});

/**
 * 是否显示右侧action按钮
 */
const showActionBtn = computed(() => {
    if (!props.animation && props.showAction) return true;
    else return false;
});
/**
 * 边框样式
 */
const borderStyle = computed(() => {
    if (props.borderColor) return `1px solid ${props.borderColor}`;
    else return 'none';
});

/**
 * 监听input事件获取输入框内容的变化
 */
function inputChange(e: any) {
    keyword.value = e.detail.value;
}
/**
 * 清空输入
 * 也可以作为用户通过ref形式调用清空输入框内容
 */
function clear() {
    keyword.value = '';
    // 延后发出事件，避免在父组件监听clear事件时，value为更新前的值(不为空)
    nextTick(() => {
        emit('clear');
    });
}
/**
 * 确定搜索
 */
function search(e: any) {
    emit('search', e.detail.value);
    try {
        // #ifdef H5 || MP
        uni.hideKeyboard();
        // #endif
    } catch (e) {}
}
/**
 * 点击右边自定义按钮的事件
 */
function custom() {
    emit('custom', keyword.value);
    try {
        // #ifdef H5 || MP
        uni.hideKeyboard();
        // #endif
    } catch (e) {}
}
/**
 * 获取焦点
 */
function getFocus() {
    focused.value = true;
    // 开启右侧搜索按钮展开的动画效果
    if (props.animation && props.showAction) show.value = true;
    emit('focus', keyword.value);
}
/**
 * 失去焦点
 */
function blur() {
    // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
    // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
    setTimeout(() => {
        focused.value = false;
    }, 100);
    show.value = false;
    emit('blur', keyword.value);
}
/**
 * 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
 */
function clickHandler() {
    if (props.disabled) emit('click');
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-search {
    @include vue-flex;
    align-items: center;
    flex: 1;
}

.u-content {
    @include vue-flex;
    align-items: center;
    padding: 0 18rpx;
    flex: 1;
}

.u-clear-icon {
    @include vue-flex;
    align-items: center;
}

.u-input {
    flex: 1;
    font-size: 28rpx;
    line-height: 1;
    margin: 0 10rpx;
    color: $u-tips-color;
}

.u-close-wrap {
    width: 40rpx;
    height: 100%;
    @include vue-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.u-placeholder-class {
    color: $u-tips-color;
}

.u-action {
    font-size: 28rpx;
    color: $u-main-color;
    width: 0;
    overflow: hidden;
    transition: all 0.3s;
    white-space: nowrap;
    text-align: center;
}

.u-action-active {
    width: 80rpx;
    margin-left: 10rpx;
}
</style>
