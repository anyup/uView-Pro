<template>
    <demo-page title="Pagination 分页" desc="用于展示分页控件，支持多种配置方式。" :apis="'pagination'">
        <template #default>
            <view class="u-demo pagination-demo">
                <view class="u-config-wrap">
                    <view class="u-config-item">
                        <view class="u-item-title">默认</view>
                        <u-pagination v-model="current" :total="21"></u-pagination>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">使用图标</view>
                        <u-pagination v-model="current1" :total="35" show-icon></u-pagination>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">自定义图标（仅支持内置图标）</view>
                        <u-pagination
                            v-model="current2"
                            :total="49"
                            show-icon
                            prev-icon="arrow-left-double"
                            next-icon="arrow-right-double"
                        ></u-pagination>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">触发 change 事件</view>
                        <u-pagination v-model="current3" :total="50" @change="handleChange"></u-pagination>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';
import type { PaginationChangePayload } from '@/uni_modules/uview-pro/types/global';

const current = ref(1);
const current1 = ref(2);
const current2 = ref(1);
const current3 = ref(1);

// 触发 change 事件
function handleChange(val: PaginationChangePayload) {
    $u.toast(`触发器被点击：${val.type}`);
}
</script>
