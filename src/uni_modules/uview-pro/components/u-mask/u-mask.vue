<template>
    <view
        class="u-mask"
        hover-stop-propagation
        :style="[maskStyle, zoomStyle]"
        @tap="click"
        @touchmove.stop.prevent="() => {}"
        :class="{
            'u-mask-zoom': props.zoom,
            'u-mask-show': props.show
        }"
    >
        <slot />
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { $u } from '../..';
import { MaskProps } from './types';

defineOptions({ name: 'u-mask' });

/**
 * mask 遮罩
 * @description 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景
 * @tutorial https://uviewpro.cn/zh/components/mask.html
 * @property {Boolean} show 是否显示遮罩（默认false）
 * @property {String|Number} z-index z-index 层级（默认1070）
 * @property {Object} custom-style 自定义样式对象，见上方说明
 * @property {String|Number} duration 动画时长，单位毫秒（默认300）
 * @property {Boolean} zoom 是否使用scale对遮罩进行缩放（默认true）
 * @property {Boolean} mask-click-able 遮罩是否可点击，为false时点击不会发送click事件（默认true）
 * @event {Function} click mask-click-able为true时，点击遮罩发送此事件
 * @example <u-mask :show="show" @click="show = false"></u-mask>
 */
const props = defineProps(MaskProps);
const emit = defineEmits(['click']);

// 缩放动画样式
const zoomStyle = ref<{ transform: string }>({ transform: '' });
// scale值
const scale = 'scale(1.2, 1.2)';

// 监听遮罩显示状态，动态设置缩放动画
watch(
    () => props.show,
    n => {
        if (n && props.zoom) {
            // 当展示遮罩的时候，设置scale为1，达到缩小(原来为1.2)的效果
            zoomStyle.value.transform = 'scale(1, 1)';
        } else if (!n && props.zoom) {
            // 当隐藏遮罩的时候，设置scale为1.2，达到放大(因为显示遮罩时已重置为1)的效果
            zoomStyle.value.transform = scale;
        }
    }
);

// 遮罩样式
const maskStyle = computed(() => {
    let style: Record<string, any> = {};
    style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    if (props.show) style.zIndex = props.zIndex ? props.zIndex : $u.zIndex.mask;
    else style.zIndex = -1;
    style.transition = `all ${Number(props.duration) / 1000}s ease-in-out`;
    // 判断用户传递的对象是否为空，不为空就进行合并
    if (props.customStyle && Object.keys(props.customStyle).length) {
        style = {
            ...style,
            ...props.customStyle
        };
    }
    return style;
});

/**
 * 遮罩点击事件
 * maskClickAble为true时，点击遮罩发送click事件
 */
function click() {
    if (!props.maskClickAble) return;
    emit('click');
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: transform 0.3s;
}

.u-mask-show {
    opacity: 1;
}

.u-mask-zoom {
    transform: scale(1.2, 1.2);
}
</style>
