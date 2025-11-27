<template>
    <view class="demo-page">
        <u-navbar
            v-if="!hideNav"
            :is-back="navBack"
            :title="navTitle || title"
            :background="background"
            :is-fixed="true"
            :immersive="false"
            back-icon-name="arrow-leftward"
            title-width="350"
            title-color="#ffffff"
            back-icon-color="#ffffff"
        >
            <template #left>
                <view v-if="tabbar" class="u-m-l-30">
                    <!-- #ifdef MP -->
                    <u-icon
                        custom-prefix="custom-icon"
                        name="theme-fill"
                        size="46"
                        color="#ffffff"
                        custom-style="margin-right:16px"
                        @click="$u.route('/pages/other/theme/index')"
                    ></u-icon>
                    <!-- #endif -->
                    <u-icon
                        custom-prefix="custom-icon"
                        :name="darkModeIcon"
                        size="46"
                        color="#ffffff"
                        @click="switchTheme"
                    ></u-icon>
                </view>
            </template>
            <!-- #ifndef MP -->
            <template #right>
                <view v-if="tabbar" class="u-m-r-30">
                    <u-icon
                        custom-prefix="custom-icon"
                        name="theme-fill"
                        size="46"
                        color="#ffffff"
                        @click="$u.route('/pages/other/theme/index')"
                    ></u-icon>
                </view>
            </template>
            <!-- #endif -->
        </u-navbar>
        <view v-if="title || desc" class="demo-page_header">
            <view class="demo-page_title">{{ title }}</view>
            <view class="demo-page_desc" v-if="desc">{{ desc }}</view>
        </view>
        <u-sticky>
            <u-tabs
                v-if="!tabbar && !hideTabs && tabList.length > 1"
                :list="tabList"
                :current="tabIndex"
                :is-scroll="false"
                @change="change"
            />
        </u-sticky>
        <view class="demo-page-default" v-show="tabIndex === 0">
            <slot />
        </view>
        <view class="demo-page_api" v-show="tabIndex === 1">
            <slot name="api">
                <view v-if="apiContent">
                    <!-- #ifndef MP -->
                    <zero-markdown-view
                        :themeColor="$u.getColor('primary')"
                        :markdown="apiContent"
                    ></zero-markdown-view>
                    <!-- #endif -->
                </view>
                <view v-else>暂无API文档</view>
            </slot>
        </view>
        <view class="demo-page_scene" v-show="tabIndex === 2">
            <slot name="scene">
                <view v-if="scenes && scenes.length">
                    <view v-for="(scene, i) in scenes" :key="i" class="scene-item">
                        <view class="scene-title">{{ scene.title }}</view>
                        <view class="scene-desc">{{ scene.desc }}</view>
                        <view class="scene-demo">{{ scene.demo }}</view>
                    </view>
                </view>
                <view v-else>暂无应用场景</view>
            </slot>
        </view>
        <view class="demo-page_fap" v-show="tabIndex === 3">
            <slot name="faq">
                <view v-if="faqs && faqs.length">
                    <view v-for="(faq, i) in faqs" :key="i" class="faq-item">
                        <view class="faq-q">
                            <text class="faq-q-label">Q：</text>
                            <text class="faq-q-text">{{ faq.q }}</text>
                        </view>
                        <view class="faq-a">
                            <text class="faq-a-label">A：</text>
                            <text class="faq-a-text">{{ faq.a }}</text>
                        </view>
                    </view>
                </view>
                <view v-else>暂无常见问题</view>
            </slot>
        </view>
        <view class="demo-page_task" v-show="tabIndex === 4">
            <slot name="task">
                <view v-if="tasks && tasks.length">
                    <view v-for="(task, i) in tasks" :key="i" class="task-item">
                        <view class="task-title">{{ task.title }}</view>
                        <view class="task-desc">{{ task.desc }}</view>
                    </view>
                </view>
                <view v-else>暂无体验任务</view>
            </slot>
        </view>
        <view class="demo-page_feedback">
            <u-fab
                v-if="false"
                ref="uFabRef"
                type="primary"
                direction="top"
                :draggable="true"
                :autoStick="true"
                :gap="{ right: 20, bottom: 100 }"
            >
                <template #trigger>
                    <u-button
                        custom-class="u-fab-trigger-btn"
                        custom-style="width:90rpx;height:90rpx;border-radius:90rpx;"
                        type="primary"
                        :throttle-time="0"
                        @click="handleTrigger"
                    >
                        <u-icon custom-prefix="custom-icon" :name="'message'" size="50"></u-icon>
                    </u-button>
                </template>
                <u-button
                    shape="circle"
                    size="mini"
                    type="primary"
                    custom-class="custom-button"
                    @click="handleBtnClick('github')"
                >
                    <u-icon custom-prefix="custom-icon" name="github" size="46"></u-icon>
                </u-button>

                <u-button
                    shape="circle"
                    size="mini"
                    type="error"
                    custom-class="custom-button"
                    @click="handleBtnClick('gitee')"
                >
                    <u-icon custom-prefix="custom-icon" name="gitee" size="50"></u-icon>
                </u-button>
            </u-fab>
        </view>
        <u-modal v-model="show">
            <view class="u-p-20">
                <rich-text :nodes="modalContent"></rich-text>
                <u-link :href="link" :under-line="true" :default-click="false" @click="clickHref">{{ link }}</u-link>
            </view>
        </u-modal>
        <u-divider v-if="false">
            <u-icon custom-prefix="custom-icon" name="gitee" size="46"></u-icon>
            <u-line direction="column" color="#ffffff" length="40rpx" margin="0 6px 0 5px"></u-line>
            <u-icon custom-prefix="custom-icon" name="github" size="40"></u-icon>
        </u-divider>
        <u-tabbar v-if="tabbar" v-model="current" :list="tabbarList" :active-color="$u.color.primary"></u-tabbar>
    </view>
</template>

<script setup lang="ts">
import { $u, useTheme } from 'uview-pro';
import { ref, computed, onMounted, reactive, type PropType } from 'vue';
import { getMarkdown } from '@/api';
import type { TabbarItem } from '@/uni_modules/uview-pro/types/global';
import { useI18n } from 'vue-i18n';

const { darkMode, getDarkMode, setDarkMode } = useTheme();

const props = defineProps({
    navTitle: {
        type: String,
        default: ''
    },
    navBack: {
        type: Boolean,
        default: true
    },
    hideNav: {
        type: Boolean,
        default: false
    },
    tabbar: {
        type: Boolean,
        default: false
    },
    hideTabs: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    scenes: {
        type: Array as PropType<SceneItem[]>,
        default: () => []
    },
    apis: {
        type: String as PropType<string>,
        default: ''
    },
    faqs: {
        type: Array as PropType<FaqItem[]>,
        default: () => []
    },
    tasks: {
        type: Array as PropType<TaskItem[]>,
        default: () => []
    },
    extras: {
        type: Array,
        default: () => []
    }
});

interface SceneItem {
    title: string;
    desc: string;
    demo?: any;
}
interface FaqItem {
    q: string;
    a: string;
}
interface TaskItem {
    title: string;
    desc: string;
}

const background = reactive({
    backgroundColor: 'var(--u-type-primary)',
    // 渐变色
    backgroundImage: 'linear-gradient(90deg, var(--u-type-primary-dark), var(--u-type-primary-disabled))'
});

const { t } = useI18n();

const darkModeIcon = computed(() => {
    switch (darkMode.value) {
        case 'light':
            return 'sun';
        case 'dark':
            return 'moon';
        case 'auto':
            return 'auto';
        default:
            return 'sun';
    }
});

// 定义响应式数据
const tabbarList = computed<TabbarItem[]>(() => {
    return [
        {
            text: t('nav.components'),
            iconPath: 'component',
            selectedIconPath: 'component-fill',
            pagePath: '/pages/example/components',
            customIcon: true
        },
        {
            text: t('nav.js'),
            iconPath: 'tool',
            selectedIconPath: 'tool-fill',
            pagePath: '/pages/example/js',
            customIcon: true
        },
        {
            text: t('nav.template'),
            iconPath: 'template',
            selectedIconPath: 'template-fill',
            pagePath: '/pages/example/template',
            customIcon: true
        },
        {
            text: t('nav.about'),
            iconPath: 'about',
            selectedIconPath: 'about-fill',
            pagePath: '/pages/example/about',
            customIcon: true
        }
    ];
});

const current = ref<number>(0);

const uFabRef = ref();
const show = ref(false);
const modalContent = ref('');
const link = ref('');
const slots = defineSlots();
const apiContent = ref<String>('');

const tabList = computed(() => {
    const result = [
        { name: '基础演示' },
        // #ifndef MP || H5
        { name: 'API文档', hidden: props.apis ? false : true }
        // #endif
        // { name: '应用场景', hidden: props.scenes || slots.scene ? false : true },
        // { name: '常见问题', hidden: props.faqs || slots.faq ? false : true },
        // { name: '体验任务', hidden: props.tasks || slots.task ? false : true }
    ];
    return result;
});
const tabIndex = ref(0);

const scenes = computed<SceneItem[]>(() => props.scenes ?? []);
const apis = computed<string>(() => props.apis ?? '');
const faqs = computed<FaqItem[]>(() => props.faqs ?? []);
const tasks = computed<TaskItem[]>(() => props.tasks ?? []);

function switchTheme() {
    switch (getDarkMode()) {
        case 'light':
            setDarkMode('dark');
            break;
        case 'dark':
            setDarkMode('auto');
            break;
        case 'auto':
            setDarkMode('light');
            break;
        default:
            setDarkMode('dark');
            break;
    }
}
// 定义change事件回调函数
const change = (index: number) => {
    tabIndex.value = index;
};
function handleTrigger() {
    uFabRef?.value.toggle();
}
function handleBtnClick(value: string) {
    uFabRef?.value.toggle();
    if (value === 'github') {
        modalContent.value = `欢迎去<strong>Github</strong>反馈issue`;
        link.value = 'https://github.com/anyup/uView-Pro';
    } else if (value === 'gitee') {
        modalContent.value = `欢迎去<strong>Gitee</strong>反馈issue`;
        link.value = 'https://gitee.com/anyup/uView-Pro';
    }
    show.value = true;
}

function clickHref(link: string) {
    $u.clipboard(link, { showToast: true });
}
onMounted(() => {
    // #ifndef MP || H5
    if (apis.value) {
        getMarkdown(apis.value).then((res: any) => {
            apiContent.value = res;
        });
    }
    // #endif
});
</script>

<style lang="scss" scoped>
.demo-page {
    width: 100%;
    min-height: 100vh;
    padding-bottom: 30rpx;
    overflow-y: auto;
    background-color: $u-bg-white;
    background-image: linear-gradient(
        135deg,
        rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.04) 0%,
        rgba(var(--u-type-success-rgb, 25, 190, 107), 0.04) 40%,
        rgba(var(--u-type-warning-rgb, 255, 153, 0), 0.04) 100%
    );
    -webkit-font-smoothing: antialiased;
    color: $u-main-color;
    transition: background 0.3s ease;

    &_api,
    &_scene,
    &_fap,
    &_task {
        padding: 24rpx;
    }
    &_header {
        padding: 24rpx;

        margin-bottom: 24rpx;
    }
    &_title {
        font-size: 36rpx;
        font-weight: bold;
        color: $u-type-primary;
    }
    &_desc {
        color: #888;
        font-size: 26rpx;
        margin-top: 8rpx;
    }
    &_feedback {
        text-align: center;
        :deep(.custom-button) {
            min-width: auto !important;
            box-sizing: border-box;
            width: 40px !important;
            height: 40px !important;
            border-radius: 20px !important;
            margin: 8rpx;
        }
    }
}

.scene-item,
.faq-item,
.task-item {
    margin-bottom: 24rpx;
}
.scene-title,
.task-title {
    font-weight: bold;
}
.scene-desc,
.task-desc,
.faq-q {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-weight: 500;
    color: $u-type-error;
    margin-top: 8rpx;
    margin-bottom: 2rpx;
}
.faq-q-label {
    font-weight: bold;
    margin-right: 4rpx;
}
.faq-q-text {
    color: #222;
    font-weight: normal;
}
.faq-a {
    display: flex;
    align-items: flex-start;
    font-size: 28rpx;
    color: #19be6b;
    margin-top: 2rpx;
    margin-bottom: 12rpx;
}
.faq-a-label {
    font-weight: bold;
    margin-right: 4rpx;
}
.faq-a-text {
    color: #222;
    font-weight: normal;
}
</style>
