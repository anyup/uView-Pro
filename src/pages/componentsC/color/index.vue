<template>
    <demo-page
        title="Color 色彩"
        desc="uView经过大量调试和研究，得出一套专有的调色板，在各个组件内部，使用统一的配色，为您的产品带来统一又鲜明的视觉效果。"
        apis="color"
        :custom-style="{ backgroundImage: 'none' }"
    >
        <view class="wrap">
            <!-- 按分组渲染色彩 -->
            <template v-for="section in colorSections" :key="section.id">
                <view class="section">
                    <view class="section-title">{{ section.label }}</view>
                    <view v-if="section.description" class="section-desc">{{ section.description }}</view>

                    <!-- 组内颜色组 -->
                    <view v-for="group in section.groups" :key="group.id" class="item">
                        <view class="title">{{ group.label }}</view>
                        <view class="color-box">
                            <!-- 遍历每个颜色 key -->
                            <view
                                v-for="colorKey in group.keys"
                                :key="colorKey"
                                class="color-item"
                                :class="isLightColor(colorKey) ? 'dark-text' : ''"
                                :style="{ background: $u.getColor(colorKey) }"
                            >
                                <view class="color-title u-line-1">{{ labelMap[colorKey] }}</view>
                                <view class="color-value">{{ $u.getColor(colorKey) }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </template>
        </view>
    </demo-page>
</template>

<script lang="ts" setup>
import { $u } from 'uview-pro';
import type { ColorType } from '@/uni_modules/uview-pro/types/global';

interface ColorGroupConfig {
    id: string;
    label: string;
    keys: ColorType[];
}

interface ColorSectionConfig {
    id: string;
    label: string;
    description?: string;
    groups: ColorGroupConfig[];
}

const colorSections: ColorSectionConfig[] = [
    {
        id: 'brand',
        label: '品牌与状态',
        description: '主题主色与成功/警告/错误/信息色阶梯',
        groups: [
            { id: 'theme', label: '主题色', keys: ['primary', 'primaryDark', 'primaryDisabled', 'primaryLight'] },
            { id: 'error', label: '错误色', keys: ['error', 'errorDark', 'errorDisabled', 'errorLight'] },
            { id: 'warning', label: '警告色', keys: ['warning', 'warningDark', 'warningDisabled', 'warningLight'] },
            { id: 'info', label: '信息色', keys: ['info', 'infoDark', 'infoDisabled', 'infoLight'] },
            { id: 'success', label: '成功色', keys: ['success', 'successDark', 'successDisabled', 'successLight'] }
        ]
    },
    {
        id: 'content',
        label: '文本与描边',
        description: '文字、提示与描边需要清晰的层级关系',
        groups: [
            {
                id: 'text',
                label: '文字阶梯',
                keys: ['whiteColor', 'mainColor', 'contentColor', 'tipsColor', 'lightColor', 'blackColor']
            },
            { id: 'border', label: '描边与分割', keys: ['borderColor', 'dividerColor'] }
        ]
    },
    {
        id: 'surface',
        label: '背景与表面',
        description: '背景、卡片、深浅灰背景根据明暗形成阶梯',
        groups: [{ id: 'bg', label: '背景阶梯', keys: ['bgWhite', 'bgColor', 'bgGrayLight', 'bgGrayDark', 'bgBlack'] }]
    },
    {
        id: 'decor',
        label: '遮罩与阴影',
        groups: [{ id: 'mask', label: '遮罩/阴影', keys: ['maskColor', 'shadowColor'] }]
    }
];

// key -> friendly label 映射
const labelMap: Record<string, string> = {
    primary: '主题色',
    primaryDark: '主题(深)',
    primaryDisabled: '主题(禁用)',
    primaryLight: '主题(淡)',
    success: '成功色',
    successDark: '成功色(深)',
    successDisabled: '成功(禁用)',
    successLight: '成功(淡)',
    error: '错误色',
    errorDark: '错误(深)',
    errorDisabled: '错误(禁用)',
    errorLight: '错误(淡)',
    warning: '警告色',
    warningDark: '警告(深)',
    warningDisabled: '警告(禁用)',
    warningLight: '警告(淡)',
    info: '信息色',
    infoDark: '信息(深)',
    infoDisabled: '信息(禁用)',
    infoLight: '信息(淡)',
    mainColor: '主要文字',
    contentColor: '常规文字',
    tipsColor: '提示文字',
    lightColor: '占位/弱色',
    borderColor: '边框颜色',
    dividerColor: '分割线',
    bgColor: '背景色',
    bgWhite: '纯白背景',
    bgGrayLight: '浅灰背景',
    bgGrayDark: '深灰背景',
    bgBlack: '黑色背景',
    whiteColor: '纯白色值',
    blackColor: '纯黑色值',
    maskColor: '遮罩颜色',
    shadowColor: '阴影颜色'
};

function isLightColor(key: string): boolean {
    // 简单判断白色或浅色背景
    const lights = ['white', 'black', 'main', 'light', 'bg'];
    return lights.some(light => key.toLowerCase().includes(light));
}
</script>

<style lang="scss" scoped>
.wrap {
    padding: 18rpx;
}

.section {
    margin-bottom: 60rpx;

    &:last-child {
        margin-bottom: 0;
    }

    .section-title {
        font-size: 36rpx;
        font-weight: 600;
        color: $u-main-color;
        margin-bottom: 12rpx;
        line-height: 1;
    }

    .section-desc {
        font-size: 26rpx;
        color: $u-tips-color;
        margin-bottom: 30rpx;
        line-height: 1.5;
    }
}

.item {
    margin: 30rpx 0;

    .title {
        font-size: 30rpx;
        position: relative;
        line-height: 1;
        padding-left: 22rpx;
        color: $u-main-color;
        margin-bottom: 16rpx;

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

    .color-box {
        display: flex;
        align-items: center;
        color: #fff;
        text-align: center;
        margin-top: 20rpx;
        flex-wrap: wrap;

        .color-item {
            display: flex;
            flex: 0 0 calc(25% - 16rpx);
            margin: 8rpx;
            flex-direction: column;
            border-radius: 6rpx;
            padding: 12rpx 0;
            justify-content: center;
            min-height: 120rpx;
            transition: transform 0.2s ease;
            border: 1px solid $u-border-color;

            &.dark-text {
                color: $u-tips-color;
            }

            &:hover {
                transform: translateY(-4rpx);
                box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
            }
        }

        .color-title {
            font-size: 28rpx;
            font-weight: 500;
            margin-bottom: 8rpx;
        }

        .color-value {
            font-size: 24rpx;
            opacity: 0.9;
        }
    }
}
</style>
