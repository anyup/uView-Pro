<template>
    <view>
        <view class="u-steps" :class="customClass" :style="$u.toStyle(directionStyle, customStyle)">
            <slot>
                <u-step
                    :name="item.name"
                    :desc="item.desc"
                    :icon="item.icon"
                    v-for="(item, index) in list"
                    :key="index"
                ></u-step>
            </slot>
            <!-- <view
                class="u-steps__item"
                :class="['u-steps__item--' + direction]"
                v-for="(item, index) in list"
                :key="index"
            >
                <view class="u-steps__item__num" v-if="mode == 'number'" :style="numberStyle(index)">
                    <text v-if="currentIndex < index" :style="textStyle(index)">
                        {{ index + 1 }}
                    </text>
                    <u-icon v-else size="22" color="#ffffff" :name="icon"></u-icon>
                </view>
                <view class="u-steps__item__dot" v-if="mode == 'dot'" :style="dotStyle(index)"></view>
                <text class="u-line-1" :style="textStyle(index)" :class="['u-steps__item__text--' + direction]">
                    {{ item.name }}
                </text>
                <view
                    class="u-steps__item__line"
                    :class="['u-steps__item__line--' + mode]"
                    v-if="index < list.length - 1"
                >
                    <u-line :direction="direction" length="100%" :hair-line="false" :color="unActiveColor"></u-line>
                </view>
            </view> -->
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-steps',
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
import { computed, getCurrentInstance } from 'vue';
import { StepsProps } from './types';
import { $u, useParent } from '../..';

/**
 * steps 步骤条
 * @description 该组件一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景。
 * @tutorial https://uviewpro.cn/zh/components/steps.html
 * @property {String} mode 设置模式（默认dot）
 * @property {Array<{name: string}>} list 数轴条数据，数组。具体见上方示例
 * @property {String} type type主题（默认primary）
 * @property {String} direction row-横向，column-竖向（默认row）
 * @property {Number|String} current 设置当前处于第几步
 * @property {String} activeColor 已完成步骤的激活颜色，如设置，type值会失效
 * @property {String} unActiveColor 未激活的颜色，用于表示未完成步骤的颜色（默认#606266）
 * @property {String} icon 自定义图标
 * @example <u-steps :list="numList" active-color="#fa3534"></u-steps>
 */

const props = defineProps(StepsProps);

const { children } = useParent('u-steps');
// 计算方向样式
const directionStyle = computed(() => ({ flexDirection: props.direction as 'row' | 'column' }));

defineExpose({
    props,
    childLen: () => children.length
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-steps {
    @include vue-flex;
}
</style>
