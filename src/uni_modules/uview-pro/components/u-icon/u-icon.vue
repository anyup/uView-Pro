<template>
    <view :style="[customStyle]" class="u-icon" @tap="onClick" :class="['u-icon--' + labelPos]">
        <image class="u-icon__img" v-if="isImg" :src="name" :mode="imgMode" :style="[imgStyle]" />
        <text v-else class="u-icon__icon" :class="customClass" :style="[iconStyle]" :hover-class="hoverClass" @touchstart="onTouchstart">
            <text v-if="showDecimalIcon" :style="[decimalIconStyle]" :class="decimalIconClass" :hover-class="hoverClass" class="u-icon__decimal"></text>
        </text>
        <text v-if="label !== ''" class="u-icon__label" :style="labelStyle">
            {{ label }}
        </text>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { $u } from '../..';
import { IconProps } from './types';

defineOptions({
    name: 'u-icon'
});

/**
 * icon 图标
 * @description 基于字体的图标集，包含了大多数常见场景的图标。
 * @tutorial https://uviewpro.cn/zh/components/icon.html
 * @property {String} name 图标名称，见示例图标集
 * @property {String} color 图标颜色（默认inherit）
 * @property {String | Number} size 图标字体大小，单位rpx（默认32）
 * @property {String | Number} label-size label字体大小，单位rpx（默认28）
 * @property {String} label 图标右侧的label文字（默认28）
 * @property {String} label-pos label文字相对于图标的位置，只能right或bottom（默认right）
 * @property {String} label-color label字体颜色（默认#606266）
 * @property {Object} custom-style icon的样式，对象形式
 * @property {String} custom-prefix 自定义字体图标库时，需要写上此值
 * @property {String | Number} margin-left label在右侧时与图标的距离，单位rpx（默认6）
 * @property {String | Number} margin-top label在下方时与图标的距离，单位rpx（默认6）
 * @property {String | Number} margin-bottom label在上方时与图标的距离，单位rpx（默认6）
 * @property {String | Number} margin-right label在左侧时与图标的距离，单位rpx（默认6）
 * @property {String | Number} space label与图标的距离，单位rpx，权重高于 margin
 * @property {String} index 一个用于区分多个图标的值，点击图标时通过click事件传出
 * @property {String} hover-class 图标按下去的样式类，用法同uni的view组件的hover-class参数，详情见官网
 * @property {String} width 显示图片小图标时的宽度
 * @property {String} height 显示图片小图标时的高度
 * @property {String | Number} top 图标在垂直方向上的定位
 * @property {Boolean} show-decimal-icon 是否为DecimalIcon
 * @property {String} inactive-color 背景颜色，可接受主题色，仅Decimal时有效
 * @property {String | Number} percent 显示的百分比，仅Decimal时有效
 * @event {Function} click 点击图标时触发
 * @event {Function} touchstart 图标触摸时触发
 * @example <u-icon name="photo" color="#2979ff" size="28"></u-icon>
 */

const emit = defineEmits<{
    (e: 'click', index: string | number): void;
    (e: 'touchstart', index: string | number): void;
}>();

const props = defineProps(IconProps);

/**
 * 计算图标的类名集合
 * @returns {string[]}
 */
const customClass = computed(() => {
    let classes: string[] | string = [];
    classes.push(props.customPrefix + '-' + props.name);
    // uView的自定义图标类名为u-iconfont
    if (props.customPrefix === 'uicon') {
        classes.push('u-iconfont');
    } else {
        classes.push(props.customPrefix);
    }
    // 主题色，通过类配置
    if (props.showDecimalIcon && props.inactiveColor && $u.config.type.includes(props.inactiveColor)) {
        classes.push('u-icon__icon--' + props.inactiveColor);
    } else if (props.color && $u.config.type.includes(props.color)) {
        classes.push('u-icon__icon--' + props.color);
    }
    // 阿里，头条，百度小程序通过数组绑定类名时，无法直接使用[a, b, c]的形式，否则无法识别
    // 故需将其拆成一个字符串的形式，通过空格隔开各个类名
    // #ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
    classes = (classes as string[]).join(' ');
    // #endif
    return classes;
});

/**
 * 计算图标的样式
 * @returns {CSSProperties}
 */
const iconStyle = computed(() => {
    const style: Record<string, any> = {
        fontSize: props.size === 'inherit' ? 'inherit' : $u.addUnit(props.size),
        fontWeight: props.bold ? 'bold' : 'normal',
        // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
        top: $u.addUnit(props.top)
    };
    // 非主题色值时，才当作颜色值
    if (props.showDecimalIcon && props.inactiveColor && !$u.config.type.includes(props.inactiveColor)) {
        style.color = props.inactiveColor;
    } else if (props.color && !$u.config.type.includes(props.color)) {
        style.color = props.color;
    }
    return style;
});

/**
 * 判断传入的name属性是否为图片路径
 * @returns {boolean}
 */
const isImg = computed(() => {
    return props.name.indexOf('/') !== -1;
});

/**
 * 计算图片图标的样式
 * @returns {any}
 */
const imgStyle = computed(() => {
    // 如果设置width和height属性，则优先使用，否则使用size属性
    const style: any = {
        width: props.width ? $u.addUnit(props.width) : $u.addUnit(props.size),
        height: props.height ? $u.addUnit(props.height) : $u.addUnit(props.size)
    };
    return style;
});

/**
 * 计算小数图标的样式，仅DecimalIcon时有效
 * @returns {CSSProperties}
 */
const decimalIconStyle = computed(() => {
    const style: any = {
        fontSize: props.size === 'inherit' ? 'inherit' : $u.addUnit(props.size),
        fontWeight: props.bold ? 'bold' : 'normal',
        // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
        top: $u.addUnit(props.top),
        width: props.percent + '%'
    };
    // 非主题色值时，才当作颜色值
    if (props.color && !$u.config.type.includes(props.color)) {
        style.color = props.color;
    }
    return style;
});

/**
 * 计算小数图标的类名，仅DecimalIcon时有效
 * @returns {string | string[]}
 */
const decimalIconClass = computed(() => {
    let classes: string[] | string = [];
    classes.push(props.customPrefix + '-' + props.name);
    // uView的自定义图标类名为u-iconfont
    if (props.customPrefix === 'uicon') {
        classes.push('u-iconfont');
    } else {
        classes.push(props.customPrefix);
    }
    if (props.color && $u.config.type.includes(props.color)) {
        classes.push('u-icon__icon--' + props.color);
    } else {
        classes.push('u-icon__icon--primary');
    }
    // 阿里，头条，百度小程序通过数组绑定类名时，无法直接使用[a, b, c]的形式，否则无法识别
    // 故需将其拆成一个字符串的形式，通过空格隔开各个类名
    // #ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
    classes = (classes as string[]).join(' ');
    // #endif
    return classes;
});

/**
 * 计算label的样式
 * @returns {any}
 */
const labelStyle = computed(() => {
    return {
        color: props.labelColor,
        fontSize: $u.addUnit(props.labelSize),
        marginLeft: props.labelPos === 'right' ? $u.addUnit(props.space || props.marginLeft) : 0,
        marginTop: props.labelPos === 'bottom' ? $u.addUnit(props.space || props.marginTop) : 0,
        marginRight: props.labelPos === 'left' ? $u.addUnit(props.space || props.marginRight) : 0,
        marginBottom: props.labelPos === 'top' ? $u.addUnit(props.space || props.marginBottom) : 0
    };
});

/**
 * 点击图标时触发
 * @emits click(index)
 */
function onClick() {
    emit('click', props.index);
}

/**
 * 图标触摸时触发
 * @emits touchstart(index)
 */
function onTouchstart() {
    emit('touchstart', props.index);
}
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';
@import '../../iconfont.css';

.u-icon {
    display: inline-flex;
    align-items: center;

    &--left {
        flex-direction: row-reverse;
        align-items: center;
    }

    &--right {
        flex-direction: row;
        align-items: center;
    }

    &--top {
        flex-direction: column-reverse;
        justify-content: center;
    }

    &--bottom {
        flex-direction: column;
        justify-content: center;
    }

    &__icon {
        position: relative;

        &--primary {
            color: $u-type-primary;
        }

        &--success {
            color: $u-type-success;
        }

        &--error {
            color: $u-type-error;
        }

        &--warning {
            color: $u-type-warning;
        }

        &--info {
            color: $u-type-info;
        }
    }

    &__decimal {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        overflow: hidden;
    }

    &__img {
        height: auto;
        will-change: transform;
    }

    &__label {
        line-height: 1;
    }
}
</style>
