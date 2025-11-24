<template>
    <demo-page title="Steps 步骤条" desc="用于展示步骤流程，支持不同模式和方向设置。" :apis="'steps'">
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <view class="title"> list传入 </view>
                        <u-steps
                            :direction="direction"
                            :current="current"
                            :list="steps"
                            :mode="mode"
                            :icon="icon"
                        ></u-steps>
                        <view class="title"> slot </view>
                        <u-steps :direction="direction" :current="current" :mode="mode" :icon="icon">
                            <u-step name="预约">
                                <template #desc>
                                    <text v-show="current < 0">自定义描述</text>
                                    <text v-show="current >= 0" class="custom-desc">自定义描述</text>
                                </template>
                            </u-step>
                            <u-step desc="10:30">
                                <template #name>
                                    <text v-show="current < 1">名额确认</text>
                                    <text v-show="current >= 1" class="custom-name">名额不足</text>
                                </template>
                            </u-step>
                            <u-step desc="11:00">
                                <template #name>
                                    <text v-show="current < 2">预约成功</text>
                                    <text v-show="current >= 2" class="custom-error-name">预约失败</text>
                                </template>
                                <template #icon>
                                    <u-icon size="32" color="red" name="close"></u-icon>
                                </template>
                            </u-step>
                        </u-steps>
                    </view>
                </view>
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom"> 参数配置 </view>
                    <view class="u-config-item">
                        <view class="u-item-title">模式</view>
                        <u-subsection :list="['number', 'dot']" @change="modeChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">方向</view>
                        <u-subsection :list="['横向', '竖向']" @change="directionChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">自定义图标</view>
                        <u-subsection :list="['否', '是']" @change="iconChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">当前步值</view>
                        <u-subsection
                            :current="1"
                            :list="['0', '1', '2', '3', '4']"
                            @change="stepChange"
                        ></u-subsection>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { StepDirection, StepMode } from '@/uni_modules/uview-pro/types/global';

const steps = computed(() => {
    if (direction.value === 'row') {
        return [
            {
                name: '下单',
                desc: '10:30'
            },
            {
                name: '出库',
                desc: '11:00'
            },
            {
                name: '运输',
                desc: '14:00'
            },
            {
                name: '签收',
                desc: '18:30'
            }
        ];
    } else {
        return [
            {
                name: '下单',
                desc: '10:30'
            },
            {
                name: '出库',
                desc: '这是一段超长描述这是一段超长描述这是一段超长描述这是一段超长描述这是一段超长描述这是一段超长描述这是一段超长描述这是一段超长描述这是一段超长描述这是一段超长描述'
            },
            {
                name: '运输',
                desc: '14:00'
            },
            {
                name: '签收',
                desc: '18:30'
            }
        ];
    }
});

const current = ref(0);
const icon = ref('checkmark');
const mode = ref<StepMode>('number');
const direction = ref<StepDirection>('row');

function modeChange(index: number) {
    mode.value = index === 0 ? 'number' : 'dot';
}

function stepChange(index: number) {
    current.value = [-1, 0, 1, 2, 3][index];
}

function iconChange(index: number) {
    icon.value = index === 0 ? 'checkmark' : 'map-fill';
}

function directionChange(index: number) {
    direction.value = index === 0 ? 'row' : 'column';
}
</script>

<style lang="scss" scoped>
.wrap {
    padding: 24rpx;
}

.box {
    margin: 50rpx 0;
}

.title {
    margin: 20rpx 0;
    font-size: 30rpx;
    position: relative;
    line-height: 1;
    padding-left: 22rpx;
    text-align: left;

    &:before {
        width: 4px;
        height: 15px;
        border-radius: 100rpx;
        background-color: $u-content-color;
        content: '';
        position: absolute;
        left: 6rpx;
        top: -1px;
    }
}

.custom-name {
    color: $u-type-warning;
}

.custom-error-name {
    color: $u-type-error;
}

.custom-desc {
    color: $u-type-error;
    font-size: 18rpx;
}
</style>
