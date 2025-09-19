<template>
    <view class="u-char-box">
        <view class="u-char-flex">
            <input :disabled="props.disabledKeyboard" :value="valueModel" type="number" :focus="props.focus" :maxlength="props.maxlength" class="u-input" @input="getVal" />
            <view v-for="(item, index) in loopCharArr" :key="index">
                <view
                    :class="[
                        props.breathe && charArrLength === index ? 'u-breathe' : '',
                        'u-char-item',
                        charArrLength === index && props.mode == 'box' ? 'u-box-active' : '',
                        props.mode === 'box' ? 'u-box' : ''
                    ]"
                    :style="{
                        fontWeight: props.bold ? 'bold' : 'normal',
                        fontSize: props.fontSize + 'rpx',
                        width: props.width + 'rpx',
                        height: props.width + 'rpx',
                        color: props.inactiveColor,
                        borderColor: charArrLength === index && props.mode == 'box' ? props.activeColor : props.inactiveColor
                    }"
                >
                    <view
                        class="u-placeholder-line"
                        :style="{
                            display: charArrLength === index ? 'block' : 'none',
                            height: Number(props.width) * 0.5 + 'rpx'
                        }"
                        v-if="props.mode !== 'middleLine'"
                    ></view>
                    <view
                        v-if="props.mode === 'middleLine' && charArrLength <= index"
                        :class="[props.breathe && charArrLength === index ? 'u-breathe' : '', charArrLength === index ? 'u-middle-line-active' : '']"
                        class="u-middle-line"
                        :style="{
                            height: props.bold ? '4px' : '2px',
                            background: charArrLength === index ? props.activeColor : props.inactiveColor
                        }"
                    ></view>
                    <view
                        v-if="props.mode === 'bottomLine'"
                        :class="[props.breathe && charArrLength === index ? 'u-breathe' : '', charArrLength === index ? 'u-bottom-line-active' : '']"
                        class="u-bottom-line"
                        :style="{
                            height: props.bold ? '4px' : '2px',
                            background: charArrLength === index ? props.activeColor : props.inactiveColor
                        }"
                    ></view>
                    <block v-if="!props.dotFill"> {{ charArr[index] ? charArr[index] : '' }}</block>
                    <block v-else>
                        <text class="u-dot">{{ charArr[index] ? '●' : '' }}</text>
                    </block>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { MessageInputProps } from './types';

defineOptions({ name: 'u-message-input' });

/**
 * messageInput 验证码输入框
 * @description 该组件一般用于验证用户短信验证码的场景，也可以结合uView的键盘组件使用
 * @tutorial https://uviewpro.cn/zh/components/messageInput.html
 * @property {String|Number} maxlength 输入字符个数（默认4）
 * @property {Boolean} dot-fill 是否用圆点填充（默认false）
 * @property {String} mode 模式选择，见上方"基本使用"说明（默认box）
 * @property {String|Number} value 预置值
 * @property {Boolean} breathe 是否开启呼吸效果，见上方说明（默认true）
 * @property {Boolean} focus 是否自动获取焦点（默认false）
 * @property {Boolean} bold 字体和输入横线是否加粗（默认true）
 * @property {String|Number} font-size 字体大小，单位rpx（默认60）
 * @property {String} active-color 当前激活输入框的样式（默认#2979ff）
 * @property {String} inactive-color 非激活输入框的样式，文字颜色同此值（默认#606266）
 * @property {String|Number} width 输入框宽度，单位rpx，高等于宽（默认80）
 * @property {Boolean} disabled-keyboard 禁止点击输入框唤起系统键盘（默认false）
 * @event {Function} change 输入内容发生改变时触发，具体见官网说明
 * @event {Function} finish 输入字符个数达maxlength值时触发，见官网说明
 * @example <u-message-input mode="bottomLine"></u-message-input>
 */
const props = defineProps(MessageInputProps);

const emit = defineEmits(['change', 'finish']);

// 输入框实际值
const valueModel = ref('');

// 监听 value 变化，自动同步 valueModel，超出部分截掉
watch(
    () => props.value,
    val => {
        // 转为字符串
        const strVal = String(val);
        // 超出部分截掉
        valueModel.value = strVal.substring(0, Number(props.maxlength));
    },
    { immediate: true }
);

// 用于显示字符
const charArr = computed(() => valueModel.value.split(''));
const charArrLength = computed(() => charArr.value.length);
// 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
const loopCharArr = computed(() => new Array(Number(props.maxlength)));

/**
 * 输入事件处理
 * @param e input事件对象
 */
function getVal(e: { detail: { value: string } }) {
    const { value } = e.detail;
    valueModel.value = value;
    // 判断长度是否超出了maxlength值，理论上不会发生，因为input组件设置了maxlength属性值
    if (String(value).length > Number(props.maxlength)) return;
    // 未达到maxlength之前，发送change事件，达到后发送finish事件
    emit('change', value);
    if (String(value).length === Number(props.maxlength)) {
        emit('finish', value);
    }
}
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

@keyframes breathe {
    0% {
        opacity: 0.3;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.3;
    }
}

.u-char-box {
    text-align: center;
}

.u-char-flex {
    @include vue-flex;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
}

.u-input {
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    text-align: left;
    z-index: 9;
    opacity: 0;
    background: none;
}

.u-char-item {
    position: relative;
    width: 90rpx;
    height: 90rpx;
    margin: 10rpx 10rpx;
    font-size: 60rpx;
    font-weight: bold;
    color: $u-main-color;
    line-height: 90rpx;
    @include vue-flex;
    justify-content: center;
    align-items: center;
}

.u-middle-line {
    border: none;
}

.u-box {
    box-sizing: border-box;
    border: 2rpx solid #cccccc;
    border-radius: 6rpx;
}

.u-box-active {
    overflow: hidden;
    animation-timing-function: ease-in-out;
    animation-duration: 1500ms;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    border: 2rpx solid $u-type-primary;
}

.u-middle-line-active {
    background: $u-type-primary;
}

.u-breathe {
    animation: breathe 2s infinite ease;
}

.u-placeholder-line {
    /* #ifndef APP-NVUE */
    display: none;
    /* #endif */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2rpx;
    height: 40rpx;
    background: #333333;
    animation: twinkling 1.5s infinite ease;
}

.u-animation-breathe {
    animation-name: breathe;
}

.u-dot {
    font-size: 34rpx;
    line-height: 34rpx;
}

.u-middle-line {
    height: 4px;
    background: #000000;
    width: 80%;
    position: absolute;
    border-radius: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.u-bottom-line-active {
    background: $u-type-primary;
}

.u-bottom-line {
    height: 4px;
    background: #000000;
    width: 80%;
    position: absolute;
    border-radius: 2px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
}
</style>
