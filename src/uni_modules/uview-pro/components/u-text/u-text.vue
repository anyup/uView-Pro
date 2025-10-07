<template>
    <view
        v-if="props.show"
        class="u-text"
        :class="[
            props.bold ? 'u-text--bold' : '',
            props.block ? 'u-text--block' : 'u-text--inline',
            props.lines ? 'u-text--ellipsis' : '',
            `u-text--align-${props.align}`,
            customClass
        ]"
        :style="textStyle"
        @click="onClick"
    >
        <!-- prefixIcon -->
        <view class="u-text__icon u-text__prefix-icon" v-if="props.prefixIcon">
            <u-icon :name="props.prefixIcon" :custom-style="$u.toStyle(props.iconStyle)"></u-icon>
        </view>
        <!-- 价格模式 -->
        <text
            v-if="props.mode === 'price'"
            :class="['u-text__price', props.type && `u-text__value--${props.type}`]"
            :style="textValueStyle"
        >
            ￥{{ displayValue }}
        </text>
        <!-- link 模式 -->
        <u-link v-else-if="props.mode === 'link'" :href="props.href" underLine>{{ displayValue }}</u-link>
        <template v-else-if="props.openType && isMp">
            <button
                class="u-reset-button u-text__value"
                :class="props.type && `u-text__value--${props.type}`"
                :style="textValueStyle"
                :openType="props.openType"
                @getuserinfo="onGetUserInfo"
                @contact="onContact"
                @getphonenumber="onGetPhoneNumber"
                @error="onError"
                @launchapp="onLaunchApp"
                @opensetting="onOpenSetting"
                :lang="props.lang"
                :session-from="props.sessionFrom"
                :send-message-title="props.sendMessageTitle"
                :send-message-path="props.sendMessagePath"
                :send-message-img="props.sendMessageImg"
                :show-message-card="props.showMessageCard"
                :app-parameter="props.appParameter"
            >
                {{ displayValue }}
            </button>
        </template>
        <!-- 默认模式 -->
        <text
            v-else
            class="u-text__value"
            :style="textValueStyle"
            :class="[props.type && `u-text__value--${props.type}`, props.lines ? `u-line-${props.lines}` : '']"
        >
            {{ displayValue }}
        </text>
        <!-- 后缀图标 -->
        <view class="u-text__icon u-text__suffix-icon" v-if="props.suffixIcon">
            <u-icon :name="props.suffixIcon" :custom-style="$u.toStyle(props.iconStyle)"></u-icon>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-text',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { TextProps } from './types';
import { $u } from '../../';

/**
 * Text 文本
 * @description 此组件集成了文本类在项目中的常用功能，包括状态，拨打电话，格式化日期，*替换，超链接...等功能。 您大可不必在使用特殊文本时自己定义，text组件几乎涵盖您能使用的大部分场景。
 * @tutorial https://uviewpro.cn/zh/components/text.html
 * @property {String} 					type		主题颜色
 * @property {Boolean} 					show		是否显示（默认 true ）
 * @property {String | Number}			text		显示的值
 * @property {String}					prefixIcon	前置图标
 * @property {String} 					suffixIcon	后置图标
 * @property {String} 					mode		文本处理的匹配模式 text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
 * @property {String} 					href		mode=link下，配置的链接
 * @property {String | Function} 		format		格式化规则
 * @property {Boolean} 					call		mode=phone时，点击文本是否拨打电话（默认 false ）
 * @property {String} 					openType	小程序的打开方式
 * @property {Boolean} 					bold		是否粗体，默认normal（默认 false ）
 * @property {Boolean} 					block		是否块状（默认 false ）
 * @property {String | Number} 			lines		文本显示的行数，如果设置，超出此行数，将会显示省略号
 * @property {String} 					color		文本颜色（默认 '#303133' ）
 * @property {String | Number} 			size		字体大小（默认 15 ）
 * @property {Object | String} 			iconStyle	图标的样式 （默认 {fontSize: '15px'} ）
 * @property {String} 					decoration	文字装饰，下划线，中划线等，可选值 none|underline|line-through（默认 'none' ）
 * @property {Object | String | Number}	margin		外边距，对象、字符串，数值形式均可（默认 0 ）
 * @property {String | Number} 			lineHeight	文本行高
 * @property {String} 					align		文本对齐方式，可选值left|center|right（默认 'left' ）
 * @property {String} 					wordWrap	文字换行，可选值break-word|normal|anywhere（默认 'normal' ）
 * @event {Function} click  点击触发事件
 * @example <u-text text="我用十年青春,赴你最后之约"></u-text>
 */

const props = defineProps(TextProps);
const emit = defineEmits(['click', 'getuserinfo', 'contact', 'getphonenumber', 'error', 'launchapp', 'opensetting']);

// 是否小程序环境
const isMp = computed(() => {
    let mp = false;
    // #ifdef MP
    mp = true;
    // #endif
    return mp;
});

const isNvue = computed(() => {
    let nvue = false;
    // #ifdef APP-NVUE
    nvue = true;
    // #endif
    return nvue;
});

// 处理显示的值（参考原value.js逻辑，简化实现）
const displayValue = computed(() => {
    const { format, text, href, mode } = props;
    let val = text;
    if (typeof format === 'function') {
        val = format(val);
    } else if (typeof format === 'string' && format) {
        // 可扩展字符串格式化
    }
    switch (mode) {
        case 'price':
            if (!/^\d+(\.\d+)?$/.test(String(val))) return val;
            // 如果format非正则，非函数，则使用默认的金额格式化方法进行操作
            val = $u.formatPrice(val, 2);
            break;
        case 'phone':
            // 判断是否合法的手机号
            if (format === 'encrypt') {
                // 如果format为encrypt，则将手机号进行星号加密处理
                val = String(val).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            }
            break;
        case 'name':
            // 判断是否合法的字符串
            if (!$u.test.string(val)) return val;
            if (format === 'encrypt') {
                // 如果format为encrypt，则将姓名进行星号加密处理
                return $u.formatName(val);
            }
            break;
        case 'date':
            // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的格式化处理
            if ($u.test.string(format) && !$u.test.empty(format)) {
                // 如果format非正则，非函数，则使用默认的时间格式化方法进行操作
                return $u.timeFormat(val, format);
            }
            // 如果没有设置format，则设置为默认的时间格式化形式
            return $u.timeFormat(val, 'yyyy-mm-dd');
        case 'link':
            if (!$u.test.url(href)) return val;
            break;
    }
    return val;
});

/**
 * 获取文本样式
 */
const textStyle = computed(() => {
    const style: Record<string, any> = {
        margin: typeof props.margin === 'number' ? `${props.margin}px` : props.margin,
        justifyContent: props.align === 'left' ? 'flex-start' : props.align === 'center' ? 'center' : 'flex-end'
    };
    return $u.toStyle(style);
});

/**
 * 获取文本值样式
 */
const textValueStyle = computed(() => {
    const style: Record<string, any> = {
        textDecoration: props.decoration,
        fontWeight: props.bold ? 'bold' : 'normal',
        wordWrap: props.wordWrap,
        fontSize: $u.addUnit(props.size),
        lineHeight: props.lineHeight
            ? typeof props.lineHeight === 'number'
                ? `${props.lineHeight}px`
                : props.lineHeight
            : undefined
    };
    if (props.lines) {
        style['display'] = '-webkit-box';
        style['-webkit-box-orient'] = 'vertical';
    }
    if (!props.type) style.color = props.color;
    if (isNvue.value && props.lines) style.lines = props.lines;
    if (props.lineHeight) style.lineHeight = $u.addUnit(props.lineHeight);

    // 合并 textStyle，优先对象，其次字符串
    if ($u.test.object(props.textStyle)) {
        // 只合并对象类型，防止类型错误
        return $u.toStyle($u.deepMerge(style, props.textStyle as Record<string, any>));
    }
    if ($u.test.string(props.textStyle)) {
        return `${$u.toStyle(style)}${props.textStyle}`;
    }
    return $u.toStyle(style);
});

/**
 * 点击事件
 */
function onClick() {
    // 如果为手机号模式，拨打电话
    if (props.call && props.mode === 'phone') {
        uni.makePhoneCall({
            phoneNumber: String(props.text)
        });
    }
    emit('click');
}
function onGetUserInfo(event) {
    emit('getuserinfo', event.detail);
}
function onContact(event) {
    emit('contact', event.detail);
}
function onGetPhoneNumber(event) {
    emit('getphonenumber', event.detail);
}
function onError(event) {
    emit('error', event.detail);
}
function onLaunchApp(event) {
    emit('launchapp', event.detail);
}
function onOpenSetting(event) {
    emit('opensetting', event.detail);
}
</script>
<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-text {
    @include vue-flex;
    align-items: center;
    flex-wrap: nowrap;
    flex: 1;
    word-break: break-all;

    &--bold {
        font-weight: bold;
    }

    &--inline {
        display: inline-flex;
    }

    &--inline &__value {
        display: inline-flex;
    }

    &--inline &__icon {
        display: inline-flex;
    }

    &--block {
        display: flex;
        /* #ifndef APP-NVUE */
        width: 100%;
        /* #endif */
    }

    &--block &__value {
        display: flex;
    }

    &__price {
        font-size: 14px;
        color: $u-content-color;
    }

    &__value {
        font-size: 14px;
        @include vue-flex;
        color: $u-content-color;
        flex-wrap: wrap;
        text-overflow: ellipsis;
        align-items: center;

        &--primary {
            color: $u-type-primary;
        }

        &--warning {
            color: $u-type-warning;
        }

        &--success {
            color: $u-type-success;
        }

        &--info {
            color: $u-type-info;
        }

        &--error {
            color: $u-type-error;
        }

        &--main {
            color: $u-main-color;
        }

        &--content {
            color: $u-content-color;
        }

        &--tips {
            color: $u-tips-color;
        }

        &--light {
            color: $u-light-color;
        }
    }
}
</style>
