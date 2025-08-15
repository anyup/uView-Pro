<template>
    <u-index-list :scrollTop="scrollTop" :index-list="indexListRef">
        <view v-for="(item, idx) in list" :key="idx">
            <u-index-anchor :index="item.letter" />
            <view class="list-cell u-border-bottom" v-for="(item1, idx1) in item.data" :key="idx1">
                {{ item1.name }}
            </view>
        </view>
    </u-index-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import indexListDataRaw from '@/common/index.list';
import { onPageScroll } from '@dcloudio/uni-app';

// 单个数据项类型声明
interface ListItemData {
    name: string;
    [key: string]: any;
}
// 单个字母分组类型声明
interface IndexListItem {
    letter: string;
    data: ListItemData[];
}

// 全部分组数据
const list = ref<IndexListItem[]>((indexListDataRaw as any).list);
// 字母索引数组
const indexListArr: string[] = (indexListDataRaw as any).list.map((val: IndexListItem) => val.letter);
const indexListRef = ref<string[]>(indexListArr);
// 当前滚动位置
const scrollTop = ref<number>(0);

/**
 * 页面滚动事件，更新 scrollTop
 * @param e 页面滚动事件对象
 */

onPageScroll((e: { scrollTop: number }) => {
    scrollTop.value = e.scrollTop;
});
</script>

<style lang="scss" scoped>
.list-cell {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 24rpx;
    overflow: hidden;
    color: $u-content-color;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}
</style>
