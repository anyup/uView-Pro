<template>
    <demo-page
        title="Transition 过渡动画"
        desc="统一的过渡与进出场动效封装，支持多种预设、模式以及自定义时长/曲线/延迟。"
        :apis="'transition'"
        experience-key="component-transition"
    >
        <view class="u-demo">
            <view class="u-demo-wrap">
                <view class="u-demo-title">交互演示</view>
                <view class="u-demo-area">
                    <view class="transition-preview u-border">
                        <view class="preview-header">
                            <view class="preset-pill">{{ presetLabels[presetIndex] }}</view>
                            <u-button size="mini" type="primary" :throttle-time="0" @click="toggleShow">
                                {{ show ? '隐藏内容' : '显示内容' }}
                            </u-button>
                        </view>
                        <u-transition
                            custom-class="transition-preview__transition"
                            :show="show"
                            :name="activePreset"
                            :mode="activeMode"
                            :duration="previewDuration"
                            :delay="delay"
                            :timing-function="timingFunction"
                            :appear="appear"
                            :custom-style="customStyle"
                            @before-enter="handleEvent('before-enter')"
                            @enter="handleEvent('enter')"
                            @after-enter="handleEvent('after-enter')"
                            @before-leave="handleEvent('before-leave')"
                            @leave="handleEvent('leave')"
                            @after-leave="handleEvent('after-leave')"
                        >
                            <view class="preview-card">
                                <view class="preview-card__title">{{ presetLabels[presetIndex] }}</view>
                                <view class="preview-card__desc">
                                    模式：{{ modeLabels[modeIndex] }} · 延迟 {{ delay }}ms · 时长 {{ enterDuration }} /
                                    {{ leaveDuration }}ms
                                </view>
                                <view class="preview-card__badge">{{ timingLabels[timingIndex] }}</view>
                            </view>
                        </u-transition>
                        <view class="preview-meta">
                            <view>appear：{{ appear ? '启用' : '关闭' }}</view>
                            <view>timing：{{ timingFunction }}</view>
                        </view>
                    </view>
                    <view class="transition-gallery u-border">
                        <view class="gallery-header">
                            预设集合
                            <text class="gallery-subtitle">点击重播以查看不同预设的进出场表现</text>
                        </view>
                        <view class="gallery-grid">
                            <view class="gallery-item" v-for="preset in presets" :key="preset">
                                <view class="gallery-item__head">
                                    <text>{{ presetMap[preset] }}</text>
                                    <u-button
                                        size="mini"
                                        type="primary"
                                        plain
                                        :throttle-time="0"
                                        @click="triggerGallery(preset)"
                                    >
                                        重播
                                    </u-button>
                                </view>
                                <u-transition
                                    :show="galleryVisible[preset]"
                                    :name="preset"
                                    :duration="galleryDuration"
                                    appear
                                >
                                    <view class="gallery-chip">
                                        <text>{{ preset }}</text>
                                    </view>
                                </u-transition>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="u-config-wrap">
                <view class="u-config-title u-border-bottom"> 参数配置 </view>
                <view class="u-config-item">
                    <view class="u-item-title">预设动画</view>
                    <u-subsection
                        :current="presetIndex"
                        :list="presetLabels"
                        @change="handlePresetChange"
                    ></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">模式</view>
                    <u-subsection :current="modeIndex" :list="modeLabels" @change="handleModeChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">首次渲染执行 appear</view>
                    <u-switch v-model="appear"></u-switch>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">延迟 (ms)</view>
                    <u-number-box v-model="delay" :step="50" :min="0" :max="1500"></u-number-box>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">进入时长 (ms)</view>
                    <u-number-box v-model="enterDuration" :step="50" :min="100" :max="2000"></u-number-box>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">离开时长 (ms)</view>
                    <u-number-box v-model="leaveDuration" :step="50" :min="100" :max="2000"></u-number-box>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">曲线</view>
                    <u-subsection
                        :current="timingIndex"
                        :list="timingLabels"
                        @change="handleTimingChange"
                    ></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">自定义样式</view>
                    <u-switch v-model="useCustomStyle"></u-switch>
                </view>
                <view class="u-config-item" v-if="useCustomStyle">
                    <view class="u-item-title">主题色</view>
                    <u-subsection
                        :current="accentIndex"
                        :list="accentPalette.map(item => item.label)"
                        @change="handleAccentChange"
                    ></u-subsection>
                </view>
            </view>
        </view>
        <view class="u-demo-wrap event-section">
            <view class="u-demo-title">事件日志</view>
            <view class="event-log u-border">
                <view v-if="!eventLogs.length" class="event-log__empty">触发动画以查看事件回调</view>
                <view v-for="(log, index) in eventLogs" :key="index" class="event-log__item">
                    {{ log }}
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { completeMission, useExperience } from '@/common/useExperience';
import type { TransitionPreset } from '@/uni_modules/uview-pro/types/global';

const presets: TransitionPreset[] = [
    'fade',
    'slide-up',
    'slide-down',
    'slide-left',
    'slide-right',
    'zoom-in',
    'zoom-out'
];
const presetMap: Record<TransitionPreset, string> = {
    fade: 'Fade 淡入',
    'slide-up': 'Slide Up 上滑',
    'slide-down': 'Slide Down 下滑',
    'slide-left': 'Slide Left 左滑',
    'slide-right': 'Slide Right 右滑',
    'zoom-in': 'Zoom In 放大',
    'zoom-out': 'Zoom Out 缩小'
};
const presetLabels = presets.map(preset => presetMap[preset]);

const modeLabels = ['默认', 'out-in', 'in-out'];
const modeValues: Array<'' | 'out-in' | 'in-out'> = ['', 'out-in', 'in-out'];

const timingOptions = [
    { label: '标准', value: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
    { label: '线性', value: 'linear' },
    { label: 'ease-in-out', value: 'ease-in-out' },
    { label: '回弹', value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }
];
const timingLabels = timingOptions.map(item => item.label);

const accentPalette = [
    { label: '亮蓝', background: '#edf4ff', color: '#165dff' },
    { label: '果绿', background: '#f1ffef', color: '#51c41a' },
    { label: '橙色', background: '#fff7e6', color: '#f77234' }
];

const presetIndex = ref(0);
const modeIndex = ref(0);
const timingIndex = ref(0);
const accentIndex = ref(0);

const show = ref(true);
const appear = ref(false);
const delay = ref(0);
const enterDuration = ref(320);
const leaveDuration = ref(280);
const useCustomStyle = ref(false);

const galleryVisible = ref<Record<TransitionPreset, boolean>>(
    presets.reduce(
        (acc, preset) => {
            acc[preset] = true;
            return acc;
        },
        {} as Record<TransitionPreset, boolean>
    )
);

const eventLogs = ref<string[]>([]);

const { completeTask, recordAction } = useExperience('component-transition');

const activePreset = computed(() => presets[presetIndex.value]);
const activeMode = computed(() => modeValues[modeIndex.value]);
const timingFunction = computed(() => timingOptions[timingIndex.value].value);
const durationPayload = computed(() => {
    if (enterDuration.value === leaveDuration.value) {
        return enterDuration.value;
    }
    return {
        enter: enterDuration.value,
        leave: leaveDuration.value
    };
});
const previewDuration = computed(() => durationPayload.value as any);
const galleryDuration = { enter: 240, leave: 200 } as any;

const customStyle = computed(() => {
    if (!useCustomStyle.value) {
        return '';
    }
    const palette = accentPalette[accentIndex.value];
    return {
        background: palette.background,
        color: palette.color,
        borderColor: palette.color
    };
});

const handlePresetChange = (index: number) => {
    presetIndex.value = index;
    completeTask('preset');
    recordAction(`切换预设：${presetLabels[index]}`);
    replayPreview();
};

const handleModeChange = (index: number) => {
    modeIndex.value = index;
    completeTask('mode');
    recordAction(`切换模式：${modeLabels[index]}`);
    replayPreview();
};

const handleTimingChange = (index: number) => {
    timingIndex.value = index;
    completeTask('timing');
    recordAction(`切换曲线：${timingLabels[index]}`);
};

const handleAccentChange = (index: number) => {
    accentIndex.value = index;
    completeTask('style');
    recordAction(`切换主题色：${accentPalette[index].label}`);
};

const toggleShow = () => {
    show.value = !show.value;
    completeTask('toggle');
    recordAction(`切换显示：${show.value ? '显示' : '隐藏'}`);
    completeMission('transition');
};

const replayPreview = () => {
    show.value = false;
    // 小延迟重新触发 enter，让过渡立即可见
    setTimeout(() => {
        show.value = true;
    }, 20);
};

const triggerGallery = (preset: TransitionPreset) => {
    galleryVisible.value = {
        ...galleryVisible.value,
        [preset]: false
    };
    setTimeout(() => {
        galleryVisible.value = {
            ...galleryVisible.value,
            [preset]: true
        };
    }, 20);
    recordAction(`重播预设：${presetMap[preset]}`);
};

const handleEvent = (eventName: string) => {
    const time = new Date().toLocaleTimeString();
    eventLogs.value = [`${time} · ${eventName}`, ...eventLogs.value].slice(0, 6);
};

watch(appear, value => {
    recordAction(`设置 appear：${value ? '开启' : '关闭'}`);
});

watch(delay, value => {
    recordAction(`修改延迟：${value}ms`);
});

watch([enterDuration, leaveDuration], ([enter, leave]) => {
    recordAction(`修改时长：enter ${enter} / leave ${leave} ms`);
});

watch(useCustomStyle, value => {
    recordAction(`自定义样式：${value ? '启用' : '关闭'}`);
});
</script>

<style lang="scss" scoped>
.transition-preview,
.transition-gallery,
.event-log {
    border-radius: 16rpx;
    padding: 24rpx;
    background: $u-bg-white;
}

.preview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
}

.preset-pill {
    padding: 8rpx 16rpx;
    border-radius: 999rpx;
    background: $u-bg-color;
    font-size: 26rpx;
    color: $u-content-color;
}

.transition-preview__transition {
    width: 100%;
}

.preview-card {
    width: 100%;
    border-radius: 12rpx;
    border: 1px solid $u-border-color;
    padding: 32rpx;
    background: $u-bg-white;
}

.preview-card__title {
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 12rpx;
}

.preview-card__desc {
    font-size: 26rpx;
    color: $u-content-color;
    margin-bottom: 16rpx;
}

.preview-card__badge {
    display: inline-flex;
    align-items: center;
    padding: 4rpx 12rpx;
    border-radius: 999rpx;
    font-size: 24rpx;
    background: rgba(22, 93, 255, 0.08);
    color: $u-type-primary;
}

.preview-meta {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    color: $u-tips-color;
    margin-top: 20rpx;
}

.transition-gallery {
    margin-top: 32rpx;
}

.gallery-header {
    font-size: 30rpx;
    font-weight: 600;
    margin-bottom: 20rpx;
    display: flex;
    flex-direction: column;
}

.gallery-subtitle {
    font-size: 24rpx;
    color: $u-tips-color;
    margin-top: 4rpx;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220rpx, 1fr));
    gap: 20rpx;
}

.gallery-item {
    padding: 16rpx;
    border-radius: 12rpx;
    border: 1px dashed $u-border-color;
}

.gallery-item__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26rpx;
    color: $u-content-color;
    margin-bottom: 12rpx;
}

.gallery-chip {
    padding: 24rpx 30rpx;
    text-align: center;
    border-radius: 12rpx;
    background: $u-bg-color;
    color: $u-type-primary;
    font-weight: 500;
    font-size: 28rpx;
}

.event-section {
    margin-top: 32rpx;
}

.event-log__empty {
    text-align: center;
    color: $u-tips-color;
    padding: 32rpx 0;
}

.event-log__item {
    font-size: 26rpx;
    color: $u-main-color;
    padding: 8rpx 0;
    border-bottom: 1px solid $u-border-color;
}

.event-log__item:last-child {
    border-bottom: none;
}
</style>
