<template>
    <demo-page hide-tabs :nav-title="templateTitle" :nav-back="true">
        <view class="template-detail">
            <!-- 模板预览区域 -->
            <view class="preview-section">
                <view class="preview-header">
                    <view class="preview-title">
                        <text class="title-text">{{ templateTitle }}</text>
                        <u-tag
                            v-if="isHot"
                            text="热门"
                            type="error"
                            size="mini"
                            custom-style="margin-left: 12rpx"
                        ></u-tag>
                        <u-tag
                            v-if="isNew"
                            text="新品"
                            type="success"
                            size="mini"
                            custom-style="margin-left: 12rpx"
                        ></u-tag>
                    </view>
                    <view class="preview-desc">{{ templateDesc }}</view>
                </view>

                <view class="preview-content">
                    <u-image :src="previewImage" mode="widthFix" width="100%" :lazy-load="true" :fade="true"></u-image>
                </view>
            </view>

            <!-- 操作按钮组 -->
            <view class="action-section">
                <u-button type="primary" @click="handlePreview" icon="eye" shape="circle"> 预览模板 </u-button>
                <u-button v-if="codeLink" type="success" @click="handleDownload" icon="download" shape="circle" plain>
                    下载代码
                </u-button>
                <u-button type="warning" @click="handleShare" icon="share" shape="circle" plain> 分享模板 </u-button>
            </view>

            <!-- 模板信息 -->
            <u-card title="模板信息" :border="false">
                <template #body>
                    <view class="info-list">
                        <view class="info-item">
                            <view class="info-label">模板类型</view>
                            <view class="info-value">{{ templateType }}</view>
                        </view>
                        <view class="info-item">
                            <view class="info-label">下载次数</view>
                            <view class="info-value">{{ downloadCount }}</view>
                        </view>
                        <view class="info-item">
                            <view class="info-label">评分</view>
                            <view class="info-value">
                                <u-rate
                                    :current="rating"
                                    :size="32"
                                    disabled
                                    active-color="#ffa502"
                                    allow-half
                                ></u-rate>
                                <text style="margin-left: 12rpx">{{ rating }}</text>
                            </view>
                        </view>
                        <view class="info-item">
                            <view class="info-label">更新时间</view>
                            <view class="info-value">{{ updateTime }}</view>
                        </view>
                    </view>
                </template>
            </u-card>

            <!-- 使用说明 -->
            <u-card title="使用说明" :border="false">
                <template #body>
                    <view class="usage-content">
                        <view class="usage-item">
                            <u-icon name="checkmark-circle" size="32" color="var(--u-type-success)"></u-icon>
                            <text>点击"预览模板"按钮查看模板效果</text>
                        </view>
                        <view v-if="codeLink" class="usage-item">
                            <u-icon name="checkmark-circle" size="32" color="var(--u-type-success)"></u-icon>
                            <text>点击"下载代码"获取模板源代码</text>
                        </view>
                        <view class="usage-item">
                            <u-icon name="checkmark-circle" size="32" color="var(--u-type-success)"></u-icon>
                            <text>点击"分享模板"将模板分享给他人</text>
                        </view>
                    </view>
                </template>
            </u-card>

            <!-- 相关模板推荐 -->
            <u-card title="相关推荐" :border="false" v-if="relatedTemplates.length > 0">
                <template #body>
                    <view class="related-list">
                        <view
                            v-for="item in relatedTemplates"
                            :key="item.path"
                            class="related-item"
                            @click="openRelatedTemplate(item.path)"
                        >
                            <u-image
                                :src="getPreviewImage(item)"
                                mode="aspectFit"
                                width="120"
                                height="120"
                                radius="8"
                            ></u-image>
                            <view class="related-info">
                                <view class="related-title">{{ item.title }}</view>
                                <view class="related-desc">{{ item.desc }}</view>
                            </view>
                        </view>
                    </view>
                </template>
            </u-card>

            <u-action-sheet v-model="show" :safe-area-inset-bottom="true">
                <u-action-sheet-item text="复制分享链接" @click="copyShareLink()" />
                <u-action-sheet-item padding="0">
                    <u-text
                        text="分享给朋友"
                        size="32"
                        openType="share"
                        :block="true"
                        line-height="50px"
                        align="center"
                    ></u-text>
                </u-action-sheet-item>
            </u-action-sheet>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';
import templateConfig from '@/pages/example/template.config';

const templatePath = ref('');
const templateTitle = ref('');
const templateDesc = ref('');
const previewImage = ref('');
const isHot = ref(false);
const isNew = ref(true);
const downloadCount = ref(0);
const rating = ref(4.5);
const updateTime = ref('2024-01-01');
const relatedTemplates = ref<any[]>([]);
const codeLink = ref('');
const shareLink = ref('');
const show = ref(false);

// 模板类型
const templateType = computed(() => {
    if (templatePath.value.includes('mallMenu') || templatePath.value.includes('order')) {
        return '页面模板';
    }
    return '部件模板';
});

// 获取预览图
function getPreviewImage(tpl: any) {
    if (tpl.previewImage) {
        return tpl.previewImage;
    }
    const iconName = tpl.icon || 'template';
    // #ifdef APP
    return `/static/app/template/${iconName}.png`;
    // #endif
    return `https://ik.imagekit.io/anyup/uview-pro/template/${iconName}.png`;
}

// 预览模板
function handlePreview() {
    if (!templatePath.value) {
        $u.toast('模板路径无效', 'error');
        return;
    }
    uni.navigateTo({
        url: templatePath.value
    });
}

// 复制代码链接
function copyCodeLink() {
    if (!codeLink.value) return;
    uni.setClipboardData({
        data: codeLink.value,
        success: () => {
            $u.toast('代码链接已复制', 'success');
            // 记录下载次数
            downloadCount.value += 1;
            saveDownloadCount();
        }
    });
}

// 复制分享链接
function copyShareLink() {
    if (!shareLink.value) return;
    uni.setClipboardData({
        data: shareLink.value,
        success: () => {
            $u.toast('分享链接已复制', 'success');
        }
    });
}

// 打开相关模板
function openRelatedTemplate(path: string) {
    uni.navigateTo({
        url: path.indexOf('/page') == 0 ? path : '/pages/template/' + path + '/index'
    });
}

// 保存下载次数
function saveDownloadCount() {
    try {
        const key = `template-download-${templatePath.value}`;
        uni.setStorageSync(key, downloadCount.value);
    } catch (error) {
        console.warn('saveDownloadCount error', error);
    }
}

// 加载下载次数
function loadDownloadCount() {
    try {
        const key = `template-download-${templatePath.value}`;
        const count = uni.getStorageSync(key);
        if (count) {
            downloadCount.value = count;
        }
    } catch (error) {
        console.warn('loadDownloadCount error', error);
    }
}

// 加载相关模板
function loadRelatedTemplates() {
    try {
        const allTemplates: any[] = [];
        templateConfig.forEach((group: any) => {
            (group.list || []).forEach((tpl: any) => {
                allTemplates.push(tpl);
            });
        });

        // 排除当前模板，随机选择3个
        const filtered = allTemplates.filter(tpl => {
            const tplPath = tpl.path.indexOf('/page') == 0 ? tpl.path : '/pages/template/' + tpl.path + '/index';
            return tplPath !== templatePath.value;
        });

        // 随机选择
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        relatedTemplates.value = shuffled.slice(0, 3);
    } catch (error) {
        console.warn('loadRelatedTemplates error', error);
    }
}

onLoad((options: any) => {
    if (options.path) {
        templatePath.value = decodeURIComponent(options.path);
    }
    if (options.title) {
        templateTitle.value = decodeURIComponent(options.title);
    }
    if (options.desc) {
        templateDesc.value = decodeURIComponent(options.desc);
    }

    // 从配置中查找模板信息
    let templateInfo: any = null;
    templateConfig.forEach((group: any) => {
        (group.list || []).forEach((tpl: any) => {
            const tplPath = tpl.path.indexOf('/page') == 0 ? tpl.path : '/pages/template/' + tpl.path + '/index';
            if (tplPath === templatePath.value) {
                templateInfo = tpl;
            }
        });
    });

    // 设置预览与链接
    if (templateInfo) {
        previewImage.value = getPreviewImage(templateInfo);
        if (templateInfo.isHot) isHot.value = true;
        if (templateInfo.isNew) isNew.value = true;
        if (templateInfo.downloadCount) downloadCount.value = templateInfo.downloadCount;
        if (templateInfo.rating) rating.value = templateInfo.rating;
        if (templateInfo.codeLink) codeLink.value = templateInfo.codeLink;
        if (templateInfo.shareLink) shareLink.value = templateInfo.shareLink;
    } else {
        const slug = templatePath.value.split('/').pop() || 'template';
        previewImage.value = getPreviewImage({ icon: slug });
    }

    // 加载数据
    loadDownloadCount();
    loadRelatedTemplates();

    // 设置更新时间
    updateTime.value = new Date().toLocaleDateString('zh-CN');
});

function handleDownload() {
    uni.showActionSheet({
        itemList: ['复制下载链接'],
        success: res => {
            copyCodeLink();
        }
    });
}

function handleShare() {
    show.value = true;
    // uni.showActionSheet({
    //     itemList: ['复制分享链接'],
    //     success: res => {
    //         copyShareLink();
    //     }
    // });
}
</script>

<style lang="scss" scoped>
.template-detail {
    padding: 24rpx;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.02) 0%, transparent 100%);
}

.preview-section {
    margin-bottom: 24rpx;
    background: var(--u-bg-color);
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 24rpx rgba(41, 121, 255, 0.1);
}

.preview-header {
    padding: 24rpx;
    border-bottom: 1rpx solid var(--u-border-color);
}

.preview-title {
    display: flex;
    align-items: center;
    margin-bottom: 12rpx;
}

.title-text {
    font-size: 36rpx;
    font-weight: 600;
    color: var(--u-main-color);
}

.preview-desc {
    font-size: 26rpx;
    color: var(--u-content-color);
    line-height: 1.6;
}

.preview-content {
    padding: 20rpx;
    background: $u-bg-color;
}

.action-section {
    display: flex;
    gap: 20rpx;
    margin-bottom: 24rpx;
}

.info-list {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16rpx 0;
    border-bottom: 1rpx solid var(--u-border-color);

    &:last-child {
        border-bottom: none;
    }
}

.info-label {
    font-size: 28rpx;
    color: var(--u-content-color);
}

.info-value {
    font-size: 28rpx;
    color: var(--u-main-color);
    font-weight: 500;
    display: flex;
    align-items: center;
}

.usage-content {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.usage-item {
    display: flex;
    align-items: center;
    gap: 16rpx;
    font-size: 26rpx;
    color: var(--u-content-color);
    line-height: 1.6;
}

.related-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.related-item {
    display: flex;
    gap: 20rpx;
    padding: 16rpx;
    background: rgba(41, 121, 255, 0.05);
    border-radius: 12rpx;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.98);
        background: rgba(41, 121, 255, 0.1);
    }
}

.related-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.related-title {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--u-main-color);
    margin-bottom: 8rpx;
}

.related-desc {
    font-size: 24rpx;
    color: var(--u-content-color);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
}
</style>
