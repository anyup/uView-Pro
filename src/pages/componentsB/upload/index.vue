<template>
    <demo-page
        title="Upload 上传"
        desc="用于文件上传，支持图片、视频、文档等多种文件类型，支持多个文件、进度显示和自定义样式。"
        :apis="'upload'"
    >
        <template #default>
            <view class="u-demo">
                <!-- 基础用法 - 图片上传（网格模式） -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">基础用法 - 图片上传</view>
                    <view class="u-demo-area">
                        <u-upload
                            ref="imageUploadRef"
                            v-model="imageList"
                            accept="image"
                            :action="action"
                            :max-count="6"
                        />
                    </view>
                </view>

                <!-- 文件上传 - 列表模式 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">文件上传 - 列表模式</view>
                    <view class="u-demo-area">
                        <u-upload
                            ref="fileUploadRef"
                            v-model="fileList"
                            accept="file"
                            mode="list"
                            :action="action"
                            :max-count="5"
                            :show-file-name="true"
                            :show-file-size="true"
                        />
                    </view>
                </view>

                <!-- 手动上传示例 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">手动上传（点击按钮开始上传）</view>
                    <view class="u-demo-area">
                        <u-upload
                            ref="manualUploadRef"
                            v-model="manualList"
                            accept="image"
                            :action="action"
                            :auto-upload="false"
                            :max-count="3"
                            @on-choose-complete="onManualChooseComplete"
                        />
                        <view class="u-btn-group">
                            <u-button
                                :custom-style="{ marginTop: '20rpx' }"
                                type="primary"
                                :disabled="manualList.length === 0"
                                @click="startManualUpload"
                            >
                                开始上传
                            </u-button>
                            <u-button
                                :custom-style="{ marginTop: '20rpx', marginLeft: '20rpx' }"
                                @click="clearManualList"
                            >
                                清空列表
                            </u-button>
                        </view>
                    </view>
                </view>

                <!-- 视频上传 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">视频上传</view>
                    <view class="u-demo-area">
                        <u-upload
                            ref="videoUploadRef"
                            v-model="videoList"
                            accept="video"
                            :action="action"
                            :max-count="2"
                            :max-duration="60"
                            :show-file-name="true"
                        />
                    </view>
                </view>

                <!-- 自定义上传按钮 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">自定义上传按钮</view>
                    <view class="u-demo-area">
                        <u-upload
                            ref="customUploadRef"
                            v-model="customList"
                            accept="image"
                            :action="action"
                            :custom-btn="true"
                            :max-count="3"
                        >
                            <template #addBtn>
                                <view
                                    class="custom-upload-btn"
                                    hover-class="custom-upload-btn__hover"
                                    hover-stay-time="150"
                                >
                                    <u-icon name="photo" size="48" color="#2979ff"></u-icon>
                                    <text class="custom-upload-text">点击上传图片</text>
                                </view>
                            </template>
                        </u-upload>
                    </view>
                </view>

                <!-- 自定义文件列表展示 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">自定义文件列表（使用 file 插槽）</view>
                    <view class="u-demo-area">
                        <u-upload
                            ref="customFileListRef"
                            v-model="customFileList"
                            accept="file"
                            mode="list"
                            :action="action"
                            :show-upload-list="false"
                            :custom-btn="true"
                            :max-count="5"
                        >
                            <template #file="{ file }">
                                <view class="custom-file-list">
                                    <view v-for="(item, index) in file" :key="index" class="custom-file-item">
                                        <u-icon
                                            :name="isImageFile(item) ? 'photo' : 'file-text'"
                                            size="40"
                                            color="var(--u-type-primary)"
                                        />
                                        <view class="custom-file-info">
                                            <text class="custom-file-name">{{ item.name || '未命名文件' }}</text>
                                            <text v-if="item.size" class="custom-file-size">
                                                {{ formatSize(item.size) }}
                                            </text>
                                        </view>
                                        <view
                                            v-if="item.progress < 100 && item.progress > 0"
                                            class="custom-file-progress"
                                        >
                                            <u-line-progress :percent="item.progress" height="8" />
                                        </view>
                                        <view class="custom-file-status">
                                            <u-icon
                                                v-if="item.progress === 100"
                                                :name="item.error ? 'close-circle' : 'checkmark-circle'"
                                                size="34"
                                                :color="item.error ? 'var(--u-type-error)' : 'var(--u-type-success)'"
                                            />
                                            <text v-else class="custom-file-progress-text">
                                                {{ Math.floor(item.progress || 0) }}%
                                            </text>
                                        </view>
                                        <view class="custom-file-delete" @click="removeCustomFile(index)">
                                            <u-icon name="close" size="24" color="var(--u-tips-color)" />
                                        </view>
                                    </view>
                                </view>
                            </template>
                            <template #addBtn>
                                <view class="custom-file-add-btn">
                                    <u-icon name="plus" size="32" color="var(--u-type-primary)" />
                                    <text class="custom-file-add-text">添加文件</text>
                                </view>
                            </template>
                        </u-upload>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from '@/uni_modules/uview-pro';
import type { UploadFileItem } from '@/uni_modules/uview-pro/types/global';

const toast = useToast();

// 上传地址（实际使用请替换为真实地址，演示使用模拟上传）
const action = ref<string>('https://example.com/upload');

// 各上传组件引用
const imageUploadRef = ref();
const fileUploadRef = ref();
const manualUploadRef = ref();
const videoUploadRef = ref();
const customUploadRef = ref();
const customFileListRef = ref();

// 文件列表
const imageList = ref<UploadFileItem[]>([
    {
        url: 'https://ik.imagekit.io/anyup/uview-pro/common/logo-new.png',
        name: 'logo.png',
        size: 1024 * 50,
        error: false,
        progress: 100
    }
]);

const fileList = ref<UploadFileItem[]>([
    {
        url: 'https://example.com/document.pdf',
        name: '示例文档.pdf',
        size: 1024 * 1024 * 2.5,
        error: false,
        progress: 100
    }
]);

const manualList = ref<UploadFileItem[]>([]);
const videoList = ref<UploadFileItem[]>([]);
const customList = ref<UploadFileItem[]>([]);
const customFileList = ref<UploadFileItem[]>([
    {
        url: 'https://example.com/report.pdf',
        name: '年度报告.pdf',
        size: 1024 * 1024 * 3.2,
        error: false,
        progress: 100
    },
    {
        url: 'https://example.com/contract.docx',
        name: '合同文档.docx',
        size: 1024 * 450,
        error: false,
        progress: 100
    }
]);

// 模拟上传函数
function mockUpload(uploadRef: any, listRef: UploadFileItem[]) {
    const lists = uploadRef?.lists as UploadFileItem[];
    if (!lists || lists.length === 0) return;

    lists.forEach((item: UploadFileItem, index: number) => {
        // 只处理未上传或上传失败的文件
        if (item.progress === 100 && !item.error) return;

        const shouldSuccess = Math.random() > 0.1; // 90%成功率
        const totalTime = 2000 + Math.random() * 2000; // 2-4秒
        const interval = 100;
        const step = 100 / (totalTime / interval);

        let progress = item.progress || 0;
        const timer = setInterval(() => {
            progress += step;
            if (progress >= 100) {
                progress = 100;
                clearInterval(timer);

                lists[index].progress = 100;
                if (shouldSuccess) {
                    lists[index].error = false;
                    lists[index].response = { code: 200, message: 'success', url: lists[index].url };
                    toast.success('上传成功');
                } else {
                    lists[index].error = true;
                    toast.error('上传失败');
                }
            } else {
                lists[index].progress = Math.floor(progress);
            }
        }, interval);
    });
}

// 手动上传
function startManualUpload() {
    mockUpload(manualUploadRef.value, manualList.value);
}

// 清空手动上传列表
function clearManualList() {
    manualUploadRef.value?.clear();
    toast.success('已清空');
}

// 手动选择完成回调
function onManualChooseComplete() {
    toast.success('选择完成，点击"开始上传"按钮上传');
}

// 判断是否为图片文件
function isImageFile(item: UploadFileItem): boolean {
    const ext = item.name?.split('.').pop()?.toLowerCase() || '';
    return ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].includes(ext);
}

// 格式化文件大小
function formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 删除自定义文件列表中的文件
function removeCustomFile(index: number) {
    customFileListRef.value?.remove(index);
}
</script>

<style lang="scss">
.u-demo-wrap {
    background-color: var(--u-bg-white);
    padding: 40rpx 8rpx;
    margin-left: -14rpx;
    margin-right: -14rpx;
    margin-bottom: 20rpx;
}

.u-demo-title {
    font-size: 28rpx;
    font-weight: bold;
    color: var(--u-main-color);
    margin-bottom: 20rpx;
}

.u-demo-area {
    padding: 10rpx 0;
}

.u-btn-group {
    display: flex;
    flex-wrap: wrap;
}

// 自定义上传按钮样式
.custom-upload-btn {
    width: 200rpx;
    height: 200rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--u-bg-gray-light);
    border-radius: 10rpx;
    border: 2rpx dashed var(--u-border-color);
}

.custom-upload-btn__hover {
    background-color: var(--u-bg-gray-light);
    opacity: 0.8;
}

.custom-upload-text {
    margin-top: 16rpx;
    font-size: 24rpx;
    color: var(--u-tips-color);
}

// 自定义文件列表样式
.custom-file-list {
    width: 100%;
    margin-bottom: 20rpx;
}

.custom-file-item {
    display: flex;
    align-items: center;
    padding: 24rpx;
    background: var(--u-bg-white);
    border-radius: 12rpx;
    margin-bottom: 16rpx;
    border: 1rpx solid var(--u-border-color);
}

.custom-file-item:last-child {
    margin-bottom: 0;
}

.custom-file-info {
    flex: 1;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.custom-file-name {
    font-size: 28rpx;
    color: var(--u-main-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.custom-file-size {
    font-size: 24rpx;
    color: var(--u-tips-color);
    margin-top: 8rpx;
}

.custom-file-progress {
    width: 120rpx;
    margin-left: 20rpx;
}

.custom-file-progress-text {
    font-size: 24rpx;
    color: var(--u-primary-color);
}

.custom-file-status {
    margin-left: 20rpx;
    min-width: 48rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-file-delete {
    display: flex;
    align-items: center;
    margin-left: 20rpx;
    padding: 8rpx;
}

.custom-file-add-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: var(--u-bg-white);
}

.custom-file-add-text {
    margin-left: 16rpx;
    font-size: 28rpx;
    color: var(--u-tips-color);
}
</style>
