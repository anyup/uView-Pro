<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-no-demo-here">输入时间：{{ timestamp }}</view>
                <view class="u-demo-result-line">
                    {{ result }}
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">格式</view>
                <u-subsection :list="['yyyy-mm-dd', 'yyyy年-mm月-dd日']" @change="format1Change"></u-subsection>
                <view style="margin-top: 50rpx">
                    <u-subsection :list="['mm-dd', 'yyyy-mm-dd hh:MM']" @change="format2Change"></u-subsection>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';

// 响应式状态
const timestamp = ref<string>('2020-11-02T02:59:24.732Z');
const result = ref<string | null>(null);

/**
 * 根据格式获取格式化后的时间
 * @param format 时间格式
 */
function getResult(format: string) {
    result.value = $u.timeFormat(timestamp.value, format);
}

/**
 * 第一个格式选择器变更事件
 * @param index 选择的索引
 */
function format1Change(index: number) {
    const format = index === 0 ? 'yyyy-mm-dd' : 'yyyy年-mm月-dd日';
    getResult(format);
}

/**
 * 第二个格式选择器变更事件
 * @param index 选择的索引
 */
function format2Change(index: number) {
    const format = index === 0 ? 'mm-dd' : 'yyyy-mm-dd hh:MM';
    getResult(format);
}

onLoad(() => {
    // 本时间格式化方法，也支持模板中过滤器形式写法，如
    // {{1585926095536 | date('yyyy-mm-dd')}} 或者 {{1585926095536 | date}}，因为'yyyy-mm-dd'为默认的参数
    getResult('yyyy-mm-dd');
});
</script>
