<template>
    <demo-page
        title="Textarea 多行文本"
        desc="用于多行文本输入，支持字数统计、自动增高、禁用等功能。"
        :apis="'Textarea'"
    >
        <template #default>
            <view class="u-page">
                <view class="u-demo-block">
                    <text class="u-demo-block__title">基础使用</text>
                    <view class="u-demo-block__content">
                        <u-textarea v-model="value1" placeholder="请输入内容"></u-textarea>
                    </view>
                </view>
                <view class="u-demo-block">
                    <text class="u-demo-block__title">字数统计</text>
                    <view class="u-demo-block__content">
                        <u-textarea v-model="value2" placeholder="请输入内容" count></u-textarea>
                    </view>
                </view>
                <view class="u-demo-block">
                    <text class="u-demo-block__title">自动增高</text>
                    <view class="u-demo-block__content">
                        <u-textarea v-model="value3" placeholder="请输入内容" count autoHeight></u-textarea>
                    </view>
                </view>
                <view class="u-demo-block">
                    <text class="u-demo-block__title">禁用状态</text>
                    <view class="u-demo-block__content">
                        <u-textarea v-model="value4" placeholder="文本域已被禁用" disabled count></u-textarea>
                    </view>
                </view>
                <view class="u-demo-block">
                    <text class="u-demo-block__title">下划线模式</text>
                    <view class="u-demo-block__content">
                        <u-textarea v-model="value5" placeholder="请输入内容" border="bottom"></u-textarea>
                    </view>
                </view>
                <view class="u-demo-block">
                    <text class="u-demo-block__title">无边框</text>
                    <view class="u-demo-block__content">
                        <u-textarea v-model="value5" placeholder="请输入内容" border="none"></u-textarea>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 页面示例中的 v-model 数据
const value1 = ref<string>('');
const value2 = ref<string>('统计字数');
const value3 = ref<string>('');
const value4 = ref<string>('');
const value5 = ref<string>('');

// 保留原示例中的 formatter 方法（若需传入组件，可通过 ref/prop 传递）
function formatter(value: string) {
    return value.replace(/[^0-9]/gi, '');
}
</script>

<style lang="scss"></style>
