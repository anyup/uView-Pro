<template>
    <view class="u-keyboard" @touchmove.stop.prevent="() => {}">
        <view class="u-keyboard-grids">
            <view>
                <view class="u-keyboard-grids-item" v-for="(group, i) in abc ? EngKeyBoardList : areaList" :key="i">
                    <view :hover-stay-time="100" @tap="carInputClick(i, j)" hover-class="u-carinput-hover" class="u-keyboard-grids-btn" v-for="(item, j) in group" :key="j">
                        {{ item }}
                    </view>
                </view>
                <view @touchstart="backspaceClick" @touchend="clearTimer" :hover-stay-time="100" class="u-keyboard-back" hover-class="u-hover-class">
                    <u-icon :size="38" name="backspace" :bold="true"></u-icon>
                </view>
                <view :hover-stay-time="100" class="u-keyboard-change" hover-class="u-carinput-hover" @tap="changeCarInputMode">
                    <text class="zh" :class="[!abc ? 'active' : 'inactive']">中</text>
                    /
                    <text class="en" :class="[abc ? 'active' : 'inactive']">英</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { $u } from '../..';
import { CarKeyboardProps } from './types';

defineOptions({
    name: 'u-car-keyboard'
});

/**
 * u-car-keyboard 车牌号键盘
 * @description 车牌号输入专用键盘，支持省份简称和字母数字切换，支持按键顺序打乱。
 * @property {Boolean} random 是否打乱键盘按键的顺序（默认false）
 * @event {Function} change 按键被点击
 * @event {Function} backspace 退格键被点击
 */

const props = defineProps(CarKeyboardProps);
const emit = defineEmits(['change', 'backspace']);

// 车牌输入时，abc=true为输入车牌号码，abc=false为输入省份中文简称
const abc = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

const areaList = computed(() => {
    let data = [
        '京',
        '沪',
        '粤',
        '津',
        '冀',
        '豫',
        '云',
        '辽',
        '黑',
        '湘',
        '皖',
        '鲁',
        '苏',
        '浙',
        '赣',
        '鄂',
        '桂',
        '甘',
        '晋',
        '陕',
        '蒙',
        '吉',
        '闽',
        '贵',
        '渝',
        '川',
        '青',
        '琼',
        '宁',
        '挂',
        '藏',
        '港',
        '澳',
        '新',
        '使',
        '学'
    ];
    let tmp: string[][] = [];
    // 打乱顺序
    if (props.random) {
        data = $u.randomArray(data);
    }
    tmp[0] = data.slice(0, 10);
    tmp[1] = data.slice(10, 20);
    tmp[2] = data.slice(20, 30);
    tmp[3] = data.slice(30, 36);
    return tmp;
});

const EngKeyBoardList = computed(() => {
    let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    let tmp: (string | number)[][] = [];
    if (props.random) {
        data = $u.randomArray(data);
    }
    tmp[0] = data.slice(0, 10);
    tmp[1] = data.slice(10, 20);
    tmp[2] = data.slice(20, 30);
    tmp[3] = data.slice(30, 36);
    return tmp;
});

/**
 * 点击键盘按钮
 */
function carInputClick(i: number, j: number) {
    let value = '';
    // 不同模式，获取不同数组的值
    if (abc.value) value = String(EngKeyBoardList.value[i][j]);
    else value = String(areaList.value[i][j]);
    emit('change', value);
}

/**
 * 修改汽车牌键盘的输入模式，中文|英文
 */
function changeCarInputMode() {
    abc.value = !abc.value;
}

/**
 * 点击退格键
 */
function backspaceClick() {
    emit('backspace');
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        emit('backspace');
    }, 250);
}

function clearTimer() {
    if (timer) clearInterval(timer);
    timer = null;
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-keyboard-grids {
    background: rgb(215, 215, 217);
    padding: 24rpx 0;
    position: relative;
}

.u-keyboard-grids-item {
    @include vue-flex;
    align-items: center;
    justify-content: center;
}

.u-keyboard-grids-btn {
    text-decoration: none;
    width: 62rpx;
    flex: 0 0 64rpx;
    height: 80rpx;
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    font-size: 36rpx;
    text-align: center;
    line-height: 80rpx;
    background-color: #fff;
    margin: 8rpx 5rpx;
    border-radius: 8rpx;
    box-shadow: 0 2rpx 0rpx #888992;
    font-weight: 500;
    justify-content: center;
}

.u-carinput-hover {
    background-color: rgb(185, 188, 195) !important;
}

.u-keyboard-back {
    position: absolute;
    width: 96rpx;
    right: 22rpx;
    bottom: 32rpx;
    height: 80rpx;
    background-color: rgb(185, 188, 195);
    @include vue-flex;
    align-items: center;
    border-radius: 8rpx;
    justify-content: center;
    box-shadow: 0 2rpx 0rpx #888992;
}

.u-keyboard-change {
    font-size: 24rpx;
    box-shadow: 0 2rpx 0rpx #888992;
    position: absolute;
    width: 96rpx;
    left: 22rpx;
    line-height: 1;
    bottom: 32rpx;
    height: 80rpx;
    background-color: #ffffff;
    @include vue-flex;
    align-items: center;
    border-radius: 8rpx;
    justify-content: center;
}

.u-keyboard-change .inactive.zh {
    transform: scale(0.85) translateY(-10rpx);
}

.u-keyboard-change .inactive.en {
    transform: scale(0.85) translateY(10rpx);
}

.u-keyboard-change .active {
    color: rgb(237, 112, 64);
    font-size: 30rpx;
}

.u-keyboard-change .zh {
    transform: translateY(-10rpx);
}

.u-keyboard-change .en {
    transform: translateY(10rpx);
}
</style>
