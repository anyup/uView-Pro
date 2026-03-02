<template>
    <demo-page title="Table 表格" desc="用于展示表格数据，支持自定义对齐方式和边框颜色。" :apis="'table'">
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <u-toast ref="uToastRef"></u-toast>
                        <u-table :align="align" :borderColor="borderColor">
                            <u-tr class="u-tr">
                                <u-th class="u-th">姓名</u-th>
                                <u-th class="u-th">年龄</u-th>
                                <u-th class="u-th">性别</u-th>
                                <u-th class="u-th">其他描述</u-th>
                            </u-tr>
                            <u-tr class="u-tr">
                                <u-td class="u-td">吕布</u-td>
                                <u-td class="u-td">22</u-td>
                                <u-td class="u-td">男</u-td>
                                <u-td class="u-td">我是吕布，地表最强</u-td>
                            </u-tr>
                            <u-tr class="u-tr">
                                <u-td class="u-td">项羽</u-td>
                                <u-td class="u-td">28</u-td>
                                <u-td class="u-td">男</u-td>
                                <u-td class="u-td">楚霸王</u-td>
                            </u-tr>
                            <u-tr class="u-tr">
                                <u-td class="u-td">木兰</u-td>
                                <u-td class="u-td">24</u-td>
                                <u-td class="u-td">女</u-td>
                                <u-td class="u-td">花木兰替父从军</u-td>
                            </u-tr>
                        </u-table>
                    </view>
                </view>
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom"> 参数配置 </view>
                    <view class="u-config-item">
                        <view class="u-item-title">边框颜色</view>
                        <u-subsection :list="['gray', 'primary', 'warning']" @change="borderColorChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">对齐方式</view>
                        <u-subsection current="1" :list="['左', '中', '右']" @change="alignChange"></u-subsection>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';
import type { TextAlign } from '@/uni_modules/uview-pro/types/global';

const mode = ref(false);
const borderColor = ref('#e4e7ed');
const align = ref<TextAlign>('center');
const uToastRef = ref(null);

function modeChange(index: number): void {
    // #ifdef MP-WEIXIN
    return $u.toast('微信小程序暂不支持单元格合并');
    // #endif
    mode.value = index === 0;
    // 注意：原代码中有 this.key++，但在data中没有定义key属性
    // 如果需要key属性，请添加 const key = ref<number>(0);
}

function borderColorChange(index: number) {
    borderColor.value = index === 0 ? '#e4e7ed' : index === 1 ? $u.color.primary : '#ff9900';
}

function alignChange(index: number) {
    align.value = index === 0 ? 'left' : index === 1 ? 'center' : 'right';
}
</script>

<style lang="scss" scoped>
.wrap {
    padding: 24rpx;
}
</style>
