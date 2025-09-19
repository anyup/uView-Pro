<template>
    <view class="u-waterfall">
        <view id="u-left-column" class="u-column">
            <slot name="left" :leftList="leftList"></slot>
        </view>
        <view id="u-right-column" class="u-column">
            <slot name="right" :rightList="rightList"></slot>
        </view>
    </view>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { WaterfallProps } from './types';

defineOptions({ name: 'u-waterfall' });

/**
 * waterfall 瀑布流
 * @description 这是一个瀑布流形式的组件，内容分为左右两列，结合uView的懒加载组件效果更佳。相较于某些只是奇偶数左右分别，或者没有利用vue作用域插槽的做法，uView的瀑布流实现了真正的 组件化，搭配LazyLoad 懒加载和loadMore 加载更多组件，让您开箱即用，眼前一亮。
 * @tutorial https://uviewpro.cn/zh/components/waterfall.html
 * @property {Array} flow-list 用于渲染的数据
 * @property {String | Number} add-time 单条数据添加到队列的时间间隔，单位ms，见上方注意事项说明（默认200）
 * @example <u-waterfall :flowList="flowList"></u-waterfall>
 */

const emit = defineEmits(['update:modelValue']);

const props = defineProps(WaterfallProps);

const leftList = ref<any[]>([]);
const rightList = ref<any[]>([]);
const tempList = ref<any[]>([]);
const instance = getCurrentInstance();

/**
 * 破坏 flowList 变量的引用，否则 watch 的结果新旧值是一样的
 */
const copyFlowList = computed(() => cloneData(props.modelValue));

watch(copyFlowList, (nVal, oVal) => {
    // 取差值，即这一次数组变化新增的部分
    const startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
    // 拼接上原有数据
    tempList.value = tempList.value.concat(cloneData(nVal.slice(startIndex)));
    splitData();
});

onMounted(() => {
    tempList.value = cloneData(copyFlowList.value);
    splitData();
});

/**
 * 复制而不是引用对象和数组
 */
function cloneData(data: any) {
    return JSON.parse(JSON.stringify(data));
}

/**
 * 异步分配数据到左右列
 */
async function splitData() {
    if (!tempList.value.length) return;
    const leftRect = await $u.getRect('#u-left-column', instance);
    const rightRect = await $u.getRect('#u-right-column', instance);
    // 如果左边小于或等于右边，就添加到左边，否则添加到右边
    const item = tempList.value[0];
    // 解决多次快速上拉后，可能数据会乱的问题，因为经过上面的两个await节点查询阻塞一定时间，加上后面的定时器干扰
    // 数组可能变成[]，导致此item值可能为undefined
    if (!item) return;
    if (leftRect.height < rightRect.height) {
        leftList.value.push(item);
    } else if (leftRect.height > rightRect.height) {
        rightList.value.push(item);
    } else {
        // 这里是为了保证第一和第二张添加时，左右都能有内容
        // 因为添加第一张，实际队列的高度可能还是0，这时需要根据队列元素长度判断下一个该放哪边
        if (leftList.value.length <= rightList.value.length) {
            leftList.value.push(item);
        } else {
            rightList.value.push(item);
        }
    }
    // 移除临时列表的第一项
    tempList.value.splice(0, 1);
    // 如果临时数组还有数据，继续循环
    if (tempList.value.length) {
        setTimeout(() => {
            splitData();
        }, Number(props.addTime));
    }
}

/**
 * 清空数据列表
 */
function clear() {
    leftList.value = [];
    rightList.value = [];
    // 同时清除父组件列表中的数据
    emit('update:modelValue', []);
    tempList.value = [];
}

/**
 * 清除某一条指定的数据，根据 id 实现
 */
function remove(id: string | number) {
    let index = leftList.value.findIndex(val => val[props.idKey] == id);
    if (index !== -1) {
        // 如果index不等于-1，说明已经找到了要找的id，根据index索引删除这一条数据
        leftList.value.splice(index, 1);
    } else {
        // 同理于上方面的方法
        index = rightList.value.findIndex(val => val[props.idKey] == id);
        if (index !== -1) rightList.value.splice(index, 1);
    }
    // 同时清除父组件的数据中的对应id的条目
    index = props.modelValue.findIndex((val: any) => val[props.idKey] == id);
    if (index !== -1) emit('update:modelValue', props.modelValue.splice(index, 1));
}

/**
 * 修改某条数据的某个属性
 */
function modify(id: string | number, key: string, value: any) {
    let index = leftList.value.findIndex(val => val[props.idKey] == id);
    if (index !== -1) {
        // 如果index不等于-1，说明已经找到了要找的id，修改对应key的值
        leftList.value[index][key] = value;
    } else {
        // 同理于上方面的方法
        index = rightList.value.findIndex(val => val[props.idKey] == id);
        if (index !== -1) rightList.value[index][key] = value;
    }
    // 修改父组件的数据中的对应id的条目
    index = props.modelValue.findIndex((val: any) => val[props.idKey] == id);
    if (index !== -1) {
        // 首先复制一份value的数据
        const data = cloneData(props.modelValue);
        // 修改对应索引的key属性的值为value
        data[index][key] = value;
        // 修改父组件通过v-model绑定的变量的值
        emit('update:modelValue', data);
    }
}
defineExpose({
    clear,
    remove,
    modify
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-waterfall {
    @include vue-flex;
    flex-direction: row;
    align-items: flex-start;
}

.u-column {
    @include vue-flex;
    flex: 1;
    flex-direction: column;
    height: auto;
}

.u-image {
    width: 100%;
}
</style>
