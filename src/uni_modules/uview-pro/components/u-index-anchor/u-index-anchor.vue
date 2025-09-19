<template>
    <!-- 支付宝小程序使用$u.getRect()获取组件的根元素尺寸，所以在外面套一个"壳" -->
    <view>
        <view class="u-index-anchor-wrapper" :id="$u.guid()" :style="wrapperStyle">
            <view class="u-index-anchor" :class="[active ? 'u-index-anchor--active' : '']" :style="customAnchorStyle">
                <slot v-if="useSlot" />
                <template v-else>
                    <text>{{ index }}</text>
                </template>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { IndexAnchorProps } from './types';
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import { $u } from '../..';

defineOptions({
    name: 'u-index-anchor'
});

/**
 * indexAnchor 索引列表锚点
 * @description 通过折叠面板收纳内容区域,搭配<u-index-anchor>使用
 * @tutorial https://uviewpro.cn/zh/components/indexList.html#indexanchor-props
 * @property {Boolean} use-slot 是否使用自定义内容的插槽（默认false）
 * @property {String|Number} index 索引字符，如果定义了use-slot，此参数自动失效
 * @property {Object} customStyle 自定义样式，对象形式，如"{color: 'red'}"
 * @event {Function} default 锚点位置显示内容，默认为索引字符
 * @example <u-index-anchor :index="item" />
 */

const props = defineProps(IndexAnchorProps);

// 响应式变量
const active = ref(false);
const wrapperStyle = ref<Record<string, any>>({});
const anchorStyle = ref<Record<string, any>>({});
let parent: any = null;

// 计算属性：合并 anchorStyle 和 customStyle
const customAnchorStyle = computed(() => {
    return Object.assign({}, anchorStyle.value, props.customStyle);
});

const instance = getCurrentInstance();

// 挂载时查找父组件并注册
onMounted(() => {
    parent = $u.$parent('u-index-list', instance);
    if (parent) {
        parent.exposed?.children.push(instance);
        parent.exposed?.updateData();
    }
});
defineExpose({
    active,
    wrapperStyle,
    anchorStyle,
    props
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-index-anchor {
    box-sizing: border-box;
    padding: 14rpx 24rpx;
    color: #606266;
    width: 100%;
    font-weight: 500;
    font-size: 28rpx;
    line-height: 1.2;
    background-color: rgb(245, 245, 245);
}

.u-index-anchor--active {
    right: 0;
    left: 0;
    color: #2979ff;
    background-color: #fff;
}
</style>
