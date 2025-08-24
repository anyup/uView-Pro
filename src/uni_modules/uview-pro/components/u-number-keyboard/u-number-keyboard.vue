<template>
    <view class="u-keyboard" @touchmove.stop.prevent="() => {}">
        <view class="u-keyboard-grids">
            <view
                class="u-keyboard-grids-item"
                :class="[btnBgGray(index) ? 'u-bg-gray' : '', index <= 2 ? 'u-border-top' : '', index < 9 ? 'u-border-bottom' : '', (index + 1) % 3 != 0 ? 'u-border-right' : '']"
                :style="[itemStyle(index)]"
                v-for="(item, index) in numList"
                :key="index"
                :hover-class="hoverClass(index)"
                :hover-stay-time="100"
                @tap="keyboardClick(item)"
            >
                <view class="u-keyboard-grids-btn">{{ item }}</view>
            </view>
            <view class="u-keyboard-grids-item u-bg-gray" hover-class="u-hover-class" :hover-stay-time="100" @touchstart.stop="backspaceClick" @touchend="clearTimer">
                <view class="u-keyboard-back u-keyboard-grids-btn">
                    <u-icon name="backspace" :size="38" :bold="true"></u-icon>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { $u } from '../..';
import { NumberKeyboardProps } from './types';

defineOptions({
    name: 'u-number-keyboard'
});

/**
 * u-number-keyboard 数字/身份证键盘
 * @description 支持数字、身份证、带小数点等多种模式，支持乱序，支持长按退格。
 * @property {String} mode 键盘的类型，number-数字键盘，card-身份证键盘
 * @property {Boolean} dotEnabled 是否显示"."按键，只在mode=number时有效（默认true）
 * @property {Boolean} random 是否打乱键盘按键的顺序（默认false）
 * @event {Function} change 按键被点击
 * @event {Function} backspace 退格键被点击
 */
const props = defineProps(NumberKeyboardProps);

const emit = defineEmits(['change', 'backspace']);

const backspace = 'backspace'; // 退格键内容
const dot = '.'; // 点
const cardX = 'X'; // 身份证的X符号
let timer: ReturnType<typeof setInterval> | null = null;

/**
 * 键盘需要显示的内容
 */
const numList = computed(() => {
    if (!props.dotEnabled && props.mode == 'number') {
        if (!props.random) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        } else {
            return $u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
        }
    } else if (props.dotEnabled && props.mode == 'number') {
        if (!props.random) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, dot, 0];
        } else {
            return $u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, dot, 0]);
        }
    } else if (props.mode == 'card') {
        if (!props.random) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, cardX, 0];
        } else {
            return $u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, cardX, 0]);
        }
    }
    // 默认返回数字键盘
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
});

/**
 * 按键的样式，在非乱序&&数字键盘&&不显示点按钮时，index为9时，按键占位两个空间
 */
const itemStyle = (index: number) => {
    let style: Record<string, string> = {};
    if (props.mode == 'number' && !props.dotEnabled && index == 9) style.flex = '0 0 66.6666666666%';
    return style;
};

/**
 * 是否让按键显示灰色，只在非乱序&&数字键盘&&且允许点按键的时候
 */
const btnBgGray = (index: number) => {
    if (!props.random && index == 9 && (props.mode != 'number' || (props.mode == 'number' && props.dotEnabled))) return true;
    else return false;
};

/**
 * 按键 hover class
 */
const hoverClass = (index: number) => {
    if (!props.random && index == 9 && ((props.mode == 'number' && props.dotEnabled) || props.mode == 'card')) return 'u-hover-class';
    else return 'u-keyboard-hover';
};

/**
 * 点击退格键
 */
function backspaceClick() {
    emit('backspace');
    if (timer) clearInterval(timer); //再次清空定时器，防止重复注册定时器
    timer = setInterval(() => {
        emit('backspace');
    }, 250);
}

function clearTimer() {
    if (timer) clearInterval(timer);
    timer = null;
}

/**
 * 获取键盘显示的内容
 */
function keyboardClick(val: string | number) {
    // 允许键盘显示点模式和触发非点按键时，将内容转为数字类型
    if (props.dotEnabled && val != dot && val != cardX) val = Number(val);
    emit('change', val);
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-keyboard {
    position: relative;
    z-index: 1003;
}

.u-keyboard-grids {
    @include vue-flex;
    flex-wrap: wrap;
}

.u-keyboard-grids-item {
    flex: 0 0 33.3333333333%;
    text-align: center;
    font-size: 50rpx;
    color: #333;
    @include vue-flex;
    align-items: center;
    justify-content: center;
    height: 110rpx;
    font-weight: 500;
}

.u-bg-gray {
    background-color: $u-border-color;
}

.u-keyboard-back {
    font-size: 36rpx;
}

.u-keyboard-hover {
    background-color: #e7e6eb;
}
</style>
