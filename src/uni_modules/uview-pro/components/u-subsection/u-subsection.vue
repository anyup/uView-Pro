<template>
    <view :id="instanceId" class="u-subsection" :style="subsectionStyle">
        <view
            class="u-item u-line-1"
            :style="itemStyle(index)"
            @tap="click(index)"
            :class="[noBorderRight(index), `u-item-${index}`]"
            v-for="(item, index) in listInfo"
            :key="index"
        >
            <view :style="textStyle(index)" class="u-item-text u-line-1">{{ item.name }}</view>
        </view>
        <view class="u-item-bg" :style="itemBarStyle"></view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { SubsectionProps } from './types';

defineOptions({ name: 'u-subsection' });

/**
 * subsection 分段器
 * @description 该分段器一般用于用户从几个选项中选择某一个的场景
 * @tutorial https://uviewpro.cn/zh/components/subsection.html
 * @property {Array} list 选项的数组，形式见上方"基本使用"
 * @property {String | Number} current 初始化时默认选中的选项索引值（默认0）
 * @property {String} activeColor 激活时的颜色，mode为subsection时固定为白色（默认#303133）
 * @property {String} inactiveColor 未激活时字体的颜色，mode为subsection时无效（默认#606266）
 * @property {String} mode 模式选择，见官网"模式选择"说明（默认button）
 * @property {String | Number} fontSize 字体大小，单位rpx（默认28）
 * @property {String | Number} height 组件高度，单位rpx（默认70）
 * @property {Boolean} animation 是否开启动画效果，见上方说明（默认true）
 * @property {Boolean} bold 激活选项的字体是否加粗（默认true）
 * @property {String} bgColor 组件背景颜色，mode为button时有效（默认#eeeeef）
 * @property {String} buttonColor 按钮背景颜色，mode为button时有效（默认#ffffff）
 * @property {Boolean} vibrateShort 在切换分段器的时候，是否让设备震一下（默认false）
 * @event {Function} change 分段器选项发生改变时触发
 * @example <u-subsection active-color="#ff9900"></u-subsection>
 */

interface ListItem {
    name: string;
    width?: number;
    [key: string]: any;
}

const props = defineProps(SubsectionProps);

const emit = defineEmits<{ (e: 'change', index: number): void }>();

// 组件内部状态
const listInfo = ref<ListItem[]>([]);
const itemBgStyle = ref<{ [key: string]: any }>({
    width: 0,
    left: 0,
    backgroundColor: '#ffffff',
    height: '100%',
    transition: ''
});
const currentIndex = ref(Number(props.current));
const buttonPadding = 3; // mode = button 时，组件的内边距
const borderRadius = 5; // 圆角值
const firstTimeVibrateShort = ref(true); // 组件初始化时，会触发current变化，此时不应震动
const instanceId = $u.guid(); // 组件唯一 id
const instance = getCurrentInstance();

// 监听 current 变化
watch(
    () => props.current,
    nVal => {
        currentIndex.value = Number(nVal);
        changeSectionStatus(currentIndex.value);
    },
    { immediate: true }
);

// 初始化 listInfo
function initListInfo() {
    // 将list的数据，传入listInfo数组，因为不能修改props传递的list值
    // 可以接受直接数组形式，或者数组元素为对象的形式，如：['简介', '评论'],或者[{name: '简介'}, {name: '评论'}]
    listInfo.value = props.list.map(val => {
        if (typeof val !== 'object') {
            return { width: 0, name: val };
        } else {
            return { ...val, width: 0 };
        }
    });
}

initListInfo();

onMounted(() => {
    setTimeout(() => {
        getTabsInfo();
    }, 10);
});

/**
 * 设置mode=subsection时，滑块特有的样式
 */
const noBorderRight = computed<(index: number) => string>(() => {
    return (index: number) => {
        if (props.mode !== 'subsection') return '';
        let classs = '';
        // 不显示右边的边框
        if (index < props.list.length - 1) classs += ' u-none-border-right';
        // 显示整个组件的左右边圆角
        if (index === 0) classs += ' u-item-first';
        if (index === props.list.length - 1) classs += ' u-item-last';
        return classs;
    };
});

/**
 * 文字的样式
 */
const textStyle = computed<(index: number) => Record<string, any>>(() => {
    return (index: number) => {
        const style: Record<string, any> = {};
        // 设置字体颜色
        if (props.mode === 'subsection') {
            style.color = index === currentIndex.value ? '#ffffff' : props.activeColor;
        } else {
            style.color = index === currentIndex.value ? props.activeColor : props.inactiveColor;
        }
        // 字体加粗
        if (index === currentIndex.value && props.bold) style.fontWeight = 'bold';
        // 文字大小
        style.fontSize = props.fontSize + 'rpx';
        return style;
    };
});

/**
 * 每个分段器item的样式
 */
const itemStyle = computed<(index: number) => Record<string, any>>(() => {
    return (index: number) => {
        const style: Record<string, any> = {};
        if (props.mode === 'subsection') {
            style.borderColor = props.activeColor;
            style.borderWidth = '1px';
            style.borderStyle = 'solid';
        }
        return style;
    };
});

/**
 * mode=button时，外层view的样式
 */
const subsectionStyle = computed<Record<string, any>>(() => {
    const style: Record<string, any> = {};
    style.height = uni.upx2px(Number(props.height)) + 'px';
    if (props.mode === 'button') {
        style.backgroundColor = props.bgColor;
        style.padding = `${buttonPadding}px`;
        style.borderRadius = `${borderRadius}px`;
    }
    return style;
});

/**
 * 滑块的样式
 */
const itemBarStyle = computed<Record<string, any>>(() => {
    const style: Record<string, any> = {};
    style.backgroundColor = props.activeColor;
    style.zIndex = 1;
    if (props.mode === 'button') {
        style.backgroundColor = props.buttonColor;
        style.borderRadius = `${borderRadius}px`;
        style.bottom = `${buttonPadding}px`;
        style.height = uni.upx2px(Number(props.height)) - buttonPadding * 2 + 'px';
        style.zIndex = 0;
    }
    return Object.assign({}, itemBgStyle.value, style);
});

/**
 * 改变滑块的样式
 * @param nVal 当前选中索引
 */
function changeSectionStatus(nVal: number) {
    if (props.mode === 'subsection') {
        // 根据滑块在最左边和最右边时，显示左边和右边的圆角
        if (nVal === props.list.length - 1) {
            itemBgStyle.value.borderRadius = `0 ${buttonPadding}px ${buttonPadding}px 0`;
        }
        if (nVal === 0) {
            itemBgStyle.value.borderRadius = `${buttonPadding}px 0 0 ${buttonPadding}px`;
        }
        if (nVal > 0 && nVal < props.list.length - 1) {
            itemBgStyle.value.borderRadius = '0';
        }
    }
    // 更新滑块的位置
    setTimeout(() => {
        itemBgLeft();
    }, 10);
    if (props.vibrateShort && !firstTimeVibrateShort.value) {
        // 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
        // #ifndef H5
        uni.vibrateShort();
        // #endif
    }
    // 第一次过后，设置firstTimeVibrateShort为false，让其下一次可以震动(如果允许震动的话)
    firstTimeVibrateShort.value = false;
}

/**
 * 点击分段器选项
 * @param index 当前点击索引
 */
function click(index: number) {
    // 不允许点击当前激活选项
    if (index === currentIndex.value) return;
    currentIndex.value = index;
    changeSectionStatus(index);
    emit('change', index);
}

/**
 * 获取各个tab的节点信息
 */
function getTabsInfo() {
    const view = uni.createSelectorQuery().in(instance?.proxy);
    for (let i = 0; i < props.list.length; i++) {
        view.select(`#${instanceId} .u-item-${i}`).boundingClientRect();
    }
    view.exec((res: any[]) => {
        if (!res.length) {
            setTimeout(() => {
                getTabsInfo();
                return;
            }, 10);
        }
        // 将分段器每个item的宽度，放入listInfo数组
        res.map((val, index) => {
            listInfo.value[index].width = val.width;
        });
        // 初始化滑块的宽度
        if (props.mode === 'subsection' || props.mode === 'button') {
            itemBgStyle.value.width = listInfo.value[0]?.width + 'px';
        }
        // 初始化滑块的位置
        itemBgLeft();
    });
}

/**
 * 计算滑块左侧距离
 */
function itemBgLeft() {
    // 根据是否开启动画效果
    if (props.animation) {
        itemBgStyle.value.transition = 'all 0.35s';
    } else {
        itemBgStyle.value.transition = 'all 0s';
    }
    let left = 0;
    // 计算当前活跃item到组件左边的距离
    listInfo.value.forEach((val, index) => {
        if (index < currentIndex.value) left += val.width ?? 0;
    });
    // 根据mode不同模式，计算滑块需要移动的距离
    if (props.mode === 'subsection') {
        itemBgStyle.value.left = left + 'px';
    } else if (props.mode === 'button') {
        itemBgStyle.value.left = left + buttonPadding + 'px';
    }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-subsection {
    @include vue-flex;
    align-items: center;
    overflow: hidden;
    position: relative;
}

.u-item {
    flex: 1;
    text-align: center;
    font-size: 26rpx;
    height: 100%;
    @include vue-flex;
    align-items: center;
    justify-content: center;
    color: $u-main-color;
    padding: 0 6rpx;
}

.u-item-bg {
    background-color: $u-type-primary;
    position: absolute;
    z-index: -1;
}

.u-none-border-right {
    border-right: none !important;
}

.u-item-first {
    border-top-left-radius: 8rpx;
    border-bottom-left-radius: 8rpx;
}

.u-item-last {
    border-top-right-radius: 8rpx;
    border-bottom-right-radius: 8rpx;
}

.u-item-text {
    transition: all 0.35s;
    color: $u-main-color;
    @include vue-flex;
    align-items: center;
    position: relative;
    z-index: 3;
}
</style>
