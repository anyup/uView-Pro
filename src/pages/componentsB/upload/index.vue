<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToast"></u-toast>
                <view class="pre-box" v-if="!showUploadList">
                    <view class="pre-item" v-for="(item, index) in lists" :key="index">
                        <image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
                        <view class="u-delete-icon" @tap.stop="deleteItem(index)">
                            <u-icon name="close" size="20" color="#ffffff"></u-icon>
                        </view>
                        <u-line-progress
                            v-if="(item.progress ?? 0) > 0 && !item.error"
                            :show-percent="false"
                            height="16"
                            class="u-progress"
                            :percent="item.progress ?? 0"
                        ></u-line-progress>
                    </view>
                </view>
                <u-upload
                    ref="uUploadRef"
                    :before-remove="beforeRemove"
                    :custom-btn="customBtn"
                    :show-upload-list="showUploadList"
                    :action="action"
                    :auto-upload="autoUpload"
                    :file-list="fileList"
                    :show-progress="showProgress"
                    :deletable="deletable"
                    :max-count="maxCount"
                    @on-choose-fail="onChooseFail"
                    @on-choose-complete="onChooseComplete"
                    @on-error="onError"
                    @on-change="onChange"
                    @on-success="onSuccess"
                    @on-list-change="onListChange"
                    @on-uploaded="onUploaded"
                    @on-progress="onProgress"
                    @on-remove="onRemove"
                    @on-preview="onPreview"
                >
                    <template v-if="customBtn" #addBtn>
                        <view class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
                            <u-icon name="photo" size="60" color="#2979ff"></u-icon>
                        </view>
                    </template>
                </u-upload>
                <u-button :custom-style="{ marginTop: '20rpx' }" @click="upload">上传</u-button>
                <u-button :custom-style="{ marginTop: '40rpx' }" @click="clear">清空列表</u-button>
                <!-- <u-button :custom-style="{ marginTop: '40rpx' }" @click="reUpload">重新上传</u-button> -->
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">上传方式</view>
                <u-subsection current="1" :list="['自动上传', '手动上传']" @change="autoUploadChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义控件(进度条和删除按钮)</view>
                <u-subsection :list="['显示', '隐藏']" @change="controlChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">最大上传数量</view>
                <u-subsection current="1" :list="['1', '2', '4']" @change="maxCountChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义样式(预览区域和上传按钮)</view>
                <u-subsection current="1" :list="['是', '否']" @change="customStyleChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 上传文件项类型
interface UploadFileItem {
    url: string;
    error?: boolean;
    progress?: number;
    [key: string]: any;
}
const uUploadRef = ref();
// u-upload 组件 fileList 类型
// const fileList = ref<UploadFileItem[]>([]);
const fileList = ref<UploadFileItem[]>([
    {
        url: 'https://ik.imagekit.io/anyup/uview-pro/common/logo.png',
        error: false,
        progress: 100
    }
]);
// 组件内部的文件列表
const lists = ref<UploadFileItem[]>([]);
// 上传接口地址
const action = ref<string>('http://127.0.0.1:7001/upload');
// 是否显示上传列表
const showUploadList = ref<boolean>(true);
// 是否自定义上传按钮
const customBtn = ref<boolean>(false);
// 是否自动上传
const autoUpload = ref<boolean>(false);
// 是否显示进度条
const showProgress = ref<boolean>(true);
// 是否可删除
const deletable = ref<boolean>(true);
// 是否自定义样式
const customStyle = ref<boolean>(false);
// 最大上传数量
const maxCount = ref<number>(2);

/**
 * 重新上传（如需）
 */
function reUpload() {
    uUploadRef.value.reUpload();
}
/**
 * 清空上传列表
 */
function clear() {
    uUploadRef.value.clear();
}
/**
 * 上传方式切换
 */
function autoUploadChange(index: number) {
    autoUpload.value = index === 0;
}
/**
 * 控件显示切换
 */
function controlChange(index: number) {
    if (index === 0) {
        showProgress.value = true;
        deletable.value = true;
    } else {
        showProgress.value = false;
        deletable.value = false;
    }
}
/**
 * 最大上传数量切换
 */
function maxCountChange(index: number) {
    maxCount.value = index === 0 ? 1 : index === 1 ? 2 : 4;
}
/**
 * 自定义样式切换
 */
function customStyleChange(index: number) {
    if (index === 0) {
        showUploadList.value = false;
        customBtn.value = true;
    } else {
        showUploadList.value = true;
        customBtn.value = false;
    }
}
/**
 * 手动上传
 */
function upload() {
    uUploadRef.value.upload();
}
/**
 * 删除预览图片
 */
function deleteItem(index: number) {
    uUploadRef.value.remove(index);
}
/**
 * 图片大小超出最大允许大小
 */
function onOversize(file: UploadFileItem, lists: UploadFileItem[]) {
    // console.log('onOversize', file, lists);
}
/**
 * 全屏预览图片时触发
 */
function onPreview(url: string, lists: UploadFileItem[]) {
    console.log('onPreview', url, lists);
}
/**
 * 移除图片时触发
 */
function onRemove(index: number, lists: UploadFileItem[]) {
    console.log('onRemove', index, lists);
}
/**
 * 图片上传失败时触发
 */
function onError(res: any, index: number, lists: UploadFileItem[]) {
    console.log('onError', res, index, lists);
}
/**
 * 图片上传成功时触发
 */
function onSuccess(data: any, index: number, lists: UploadFileItem[]) {
    console.log('onSuccess', data, index, lists);
}
/**
 * 图片上传后，无论成功或者失败都会触发
 */
function onChange(res: any, index: number, lists: UploadFileItem[]) {
    console.log('onChange', res, index, lists);
}
/**
 * 图片上传过程中的进度变化过程触发
 */
function onProgress(res: any, index: number, lists: UploadFileItem[]) {
    console.log('onProgress', res, index, lists);
}
/**
 * 所有图片上传完毕触发
 */
function onUploaded(listsArg: UploadFileItem[]) {
    console.log('onUploaded', listsArg);
}
/**
 * 文件列表发生变化时触发
 */
function onListChange(listsArg: UploadFileItem[]) {
    console.log('onListChange', listsArg);
    lists.value = listsArg;
}
/**
 * 移除图片前的钩子，返回false将被阻止图片删除
 */
function beforeRemove(index: number, lists: UploadFileItem[]): boolean {
    console.log('beforeRemove', index, lists);
    return true;
}
/**
 * 选择图片失败时触发
 */
function onChooseFail(e: any) {
    console.log('onChooseFail', e);
}
/**
 * 选择图片完成时触发
 */
function onChooseComplete(listsArg: UploadFileItem[], index: number) {
    console.log('onChooseComplete', listsArg, index);
}
</script>

<style lang="scss">
.u-demo-wrap {
    background-color: #ffffff;
    padding: 40rpx 8rpx;
    margin-left: -14rpx;
    margin-right: -14rpx;
}

.u-add-wrap {
    flex-direction: column;
    color: $u-content-color;
    font-size: 28rpx;
}

::v-deep .slot-btn {
    width: 329rpx;
    height: 140rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(244, 245, 246);
    border-radius: 10rpx;
}

.slot-btn__hover {
    background-color: rgb(235, 236, 238);
}

.pre-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}

.pre-item {
    flex: 0 0 48.5%;
    border-radius: 10rpx;
    height: 140rpx;
    overflow: hidden;
    position: relative;
    margin-bottom: 20rpx;
}

.u-progress {
    position: absolute;
    bottom: 10rpx;
    left: 8rpx;
    right: 8rpx;
    z-index: 9;
    width: auto;
}

.pre-item-image {
    width: 100%;
    height: 140rpx;
}

.u-delete-icon {
    position: absolute;
    top: 10rpx;
    right: 10rpx;
    z-index: 10;
    background-color: $u-type-error;
    border-radius: 100rpx;
    width: 44rpx;
    height: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
