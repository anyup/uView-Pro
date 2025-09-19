<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-no-demo-here"> 源字符串：{{ `"${string}"` }} </view>
                <view class="u-demo-result-line">
                    {{ `"${result}"` }}
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">模式选择</view>
                <u-subsection :list="['左空格', '全部空格', '两边空格', '右空格']" @change="modeChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';

type TrimPosition = 'left' | 'all' | 'both' | 'right';

const string = ref('  我用十年  青春，赴你  最后之约  ');
const result = ref('');
const pos = ref<TrimPosition>('left');

// 可能在 paramsChange 中使用的变量
const min = ref<number>(0);
const max = ref<number>(5);

/**
 * 获取处理结果
 */
function getResult() {
    result.value = $u.trim(string.value, pos.value);
}

/**
 * 参数变更事件
 * @param index 选择的索引
 */
function paramsChange(index: number) {
    if (index === 0) {
        min.value = 0;
        max.value = 5;
    } else {
        min.value = 541;
        max.value = 8164;
    }
    getResult();
}

/**
 * 模式变更事件
 * @param index 选择的索引
 */
function modeChange(index: number) {
    pos.value = index === 0 ? 'left' : index === 1 ? 'all' : index === 2 ? 'both' : 'right';
    getResult();
}

onLoad(() => {
    getResult();
});
</script>
