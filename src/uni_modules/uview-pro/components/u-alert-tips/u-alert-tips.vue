<template>
    <view
        class="u-alert-tips"
        v-if="show"
        :class="[!show ? 'u-close-alert-tips' : '', type ? 'u-alert-tips--bg--' + type + '-light' : '', type ? 'u-alert-tips--border--' + type + '-disabled' : '']"
        :style="{
            backgroundColor: bgColor,
            borderColor: borderColor
        }"
    >
        <view class="u-icon-wrap">
            <u-icon v-if="showIcon" :name="uIconName" :size="description ? 40 : 32" class="u-icon" :color="uIconType" :custom-style="iconStyle"></u-icon>
        </view>
        <view class="u-alert-content" @tap.stop="onClick">
            <view class="u-alert-title" :style="uTitleStyle">
                {{ title }}
            </view>
            <view v-if="description" class="u-alert-desc" :style="descStyle">
                {{ description }}
            </view>
        </view>
        <view class="u-icon-wrap">
            <u-icon
                @click="onClose"
                v-if="closeAble && !closeText"
                hoverClass="u-type-error-hover-color"
                name="close"
                color="#c0c4cc"
                :size="22"
                class="u-close-icon"
                :style="{
                    top: description ? '18rpx' : '24rpx'
                }"
            ></u-icon>
        </view>
        <text
            v-if="closeAble && closeText"
            class="u-close-text"
            :style="{
                top: description ? '18rpx' : '24rpx'
            }"
            >{{ closeText }}</text
        >
    </view>
</template>

<script setup lang="ts">
import uIcon from '../u-icon/u-icon.vue';
import { computed } from 'vue';
import { $u } from '../..';
import { AlertTipsProps } from './types';

defineOptions({
    name: 'u-alert-tips'
});

/**
 * alertTips 警告提示
 * @description 警告提示，展现需要关注的信息
 * @tutorial https://uviewpro.cn/zh/components/alertTips.html
 * @property {String} title 显示的标题文字
 * @property {String} description 辅助性文字，颜色比title浅一点，字号也小一点，可选
 * @property {String} type 关闭按钮(默认为叉号icon图标)
 * @property {String} icon 图标名称
 * @property {Object} icon-style 图标的样式，对象形式
 * @property {Object} title-style 标题的样式，对象形式
 * @property {Object} desc-style 描述的样式，对象形式
 * @property {String} close-able 用文字替代关闭图标，close-able为true时有效
 * @property {Boolean} show-icon 是否显示左边的辅助图标
 * @property {Boolean} show 显示或隐藏组件
 * @event {Function} click 点击组件时触发
 * @event {Function} close 点击关闭按钮时触发
 */

const props = defineProps(AlertTipsProps);

const emit = defineEmits(['click', 'close']);

/**
 * 标题样式，合并加粗和用户自定义样式
 */
const uTitleStyle = computed(() => {
    let style: Record<string, any> = {};
    // 如果有描述文字的话，标题进行加粗
    style.fontWeight = props.description ? 500 : 'normal';
    // 将用户传入样式对象和style合并，传入的优先级比style高，同属性会被覆盖
    return $u.deepMerge(style, props.titleStyle);
});

/**
 * 图标名称，优先使用用户传入，否则根据type主题推定默认图标
 */
const uIconName = computed(() => {
    // 如果有设置icon名称就使用，否则根据type主题，推定一个默认的图标
    return props.icon ? props.icon : $u.type2icon(props.type);
});

/**
 * 图标类型，优先使用iconStyle，否则用type
 */
const uIconType = computed(() => {
    // 如果有设置图标的样式，优先使用，没有的话，则用type的样式
    return Object.keys(props.iconStyle).length ? '' : props.type;
});

/**
 * 点击内容
 */
function onClick() {
    emit('click');
}

/**
 * 点击关闭按钮
 */
function onClose() {
    emit('close');
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-alert-tips {
    @include vue-flex;
    align-items: center;
    padding: 16rpx 30rpx;
    border-radius: 8rpx;
    position: relative;
    transition: all 0.3s linear;
    border: 1px solid #fff;

    &--bg--primary-light {
        background-color: $u-type-primary-light;
    }

    &--bg--info-light {
        background-color: $u-type-info-light;
    }

    &--bg--success-light {
        background-color: $u-type-success-light;
    }

    &--bg--warning-light {
        background-color: $u-type-warning-light;
    }

    &--bg--error-light {
        background-color: $u-type-error-light;
    }

    &--border--primary-disabled {
        border-color: $u-type-primary-disabled;
    }

    &--border--success-disabled {
        border-color: $u-type-success-disabled;
    }

    &--border--error-disabled {
        border-color: $u-type-error-disabled;
    }

    &--border--warning-disabled {
        border-color: $u-type-warning-disabled;
    }

    &--border--info-disabled {
        border-color: $u-type-info-disabled;
    }
}

.u-close-alert-tips {
    opacity: 0;
    visibility: hidden;
}

.u-icon {
    margin-right: 16rpx;
}

.u-alert-title {
    font-size: 28rpx;
    color: $u-main-color;
}

.u-alert-desc {
    font-size: 26rpx;
    text-align: left;
    color: $u-content-color;
}

.u-close-icon {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
}

.u-close-hover {
    color: red;
}

.u-close-text {
    font-size: 24rpx;
    color: $u-tips-color;
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    line-height: 1;
}
</style>
