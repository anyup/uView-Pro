<template>
    <view class="u-upload" v-if="!disabled">
        <view
            v-if="showUploadList"
            class="u-list-item u-preview-wrap"
            v-for="(item, index) in lists"
            :key="index"
            :style="{
                width: $u.addUnit(width),
                height: $u.addUnit(height)
            }"
        >
            <view
                v-if="deletable"
                class="u-delete-icon"
                @tap.stop="deleteItem(index)"
                :style="{
                    background: delBgColor
                }"
            >
                <u-icon class="u-icon" :name="delIcon" size="20" :color="delColor"></u-icon>
            </view>
            <u-line-progress
                v-if="showProgress && item.progress > 0 && item.progress != 100 && !item.error"
                :show-percent="false"
                height="16"
                class="u-progress"
                :percent="item.progress"
            ></u-line-progress>
            <view @tap.stop="retry(index)" v-if="item.error" class="u-error-btn">点击重试</view>
            <image @tap.stop="doPreviewImage(item.url || item.path, index)" class="u-preview-image" v-if="!item.isImage" :src="item.url || item.path" :mode="imageMode"></image>
        </view>
        <slot name="file" :file="lists"></slot>
        <view style="display: inline-block" @tap="selectFile" v-if="Number(maxCount) > lists.length">
            <slot name="addBtn"></slot>
            <view
                v-if="!customBtn"
                class="u-list-item u-add-wrap"
                hover-class="u-add-wrap__hover"
                hover-stay-time="150"
                :style="{
                    width: $u.addUnit(width),
                    height: $u.addUnit(height)
                }"
            >
                <u-icon name="plus" class="u-add-btn" size="40"></u-icon>
                <view class="u-add-tips">{{ uploadText }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { $u } from '../..';
import { UploadProps } from './types';

defineOptions({
    name: 'u-upload'
});

/**
 * upload 图片上传
 * @description 该组件用于上传图片场景
 * @tutorial https://uviewpro.cn/zh/components/upload.html
 * @property {String} action 服务器上传地址
 * @property {String Number} max-count 最大选择图片的数量（默认99）
 * @property {Boolean} custom-btn 如果需要自定义选择图片的按钮，设置为true（默认false）
 * @property {Boolean} show-progress 是否显示进度条（默认true）
 * @property {Boolean} disabled 是否启用(显示/移仓)组件（默认false）
 * @property {String} image-mode 预览图片等显示模式，可选值为uni的image的mode属性值（默认aspectFill）
 * @property {String} del-icon 右上角删除图标名称，只能为uView内置图标
 * @property {String} del-bg-color 右上角关闭按钮的背景颜色
 * @property {String | Number} index 在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件
 * @property {String} del-color 右上角关闭按钮图标的颜色
 * @property {Object} header 上传携带的头信息，对象形式
 * @property {Object} form-data 上传额外携带的参数
 * @property {String} name 上传文件的字段名，供后端获取使用（默认file）
 * @property {Array<String>} size-type original 原图，compressed 压缩图，默认二者都有（默认['original', 'compressed']）
 * @property {Array<String>} source-type 选择图片的来源，album-从相册选图，camera-使用相机，默认二者都有（默认['album', 'camera']）
 * @property {Boolean} preview-full-image	是否可以通过uni.previewImage预览已选择的图片（默认true）
 * @property {Boolean} multiple	是否开启图片多选，部分安卓机型不支持（默认true）
 * @property {Boolean} deletable 是否显示删除图片的按钮（默认true）
 * @property {String Number} max-size 选择单个文件的最大大小，单位B(byte)，默认不限制（默认Number.MAX_VALUE）
 * @property {Array<Object>} file-list 默认显示的图片列表，数组元素为对象，必须提供url属性
 * @property {Boolean} upload-text 选择图片按钮的提示文字（默认“选择图片”）
 * @property {Boolean} auto-upload 选择完图片是否自动上传，见上方说明（默认true）
 * @property {Boolean} show-tips 特殊情况下是否自动提示toast，见上方说明（默认true）
 * @property {Boolean} show-upload-list 是否显示组件内部的图片预览（默认true）
 * @event {Function} on-oversize 图片大小超出最大允许大小
 * @event {Function} on-preview 全屏预览图片时触发
 * @event {Function} on-remove 移除图片时触发
 * @event {Function} on-success 图片上传成功时触发
 * @event {Function} on-change 图片上传后，无论成功或者失败都会触发
 * @event {Function} on-error 图片上传失败时触发
 * @event {Function} on-progress 图片上传过程中的进度变化过程触发
 * @event {Function} on-uploaded 所有图片上传完毕触发
 * @event {Function} on-choose-complete 每次选择图片后触发，只是让外部可以得知每次选择后，内部的文件列表
 * @event {Function} on-choose-fail 文件选择失败时触发
 * @event {Function} on-list-change 文件列表发生变化时触发
 * @example <u-upload :action="action" :file-list="fileList" ></u-upload>
 */

const props = defineProps(UploadProps);

const emit = defineEmits([
    'on-list-change',
    'on-oversize',
    'on-exceed',
    'on-choose-complete',
    'on-choose-fail',
    'on-uploaded',
    'on-success',
    'on-error',
    'on-change',
    'on-progress',
    'on-remove',
    'on-preview'
]);

const lists = ref<any[]>([]);
const uploading = ref(false);

// 监听 fileList 变化，自动同步内部 lists
watch(
    () => props.fileList,
    val => {
        val.map((value: any) => {
            // 首先检查内部是否已经添加过这张图片，因为外部绑定了一个对象给fileList的话(对象引用)，进行修改外部fileList
            // 时，会触发watch，导致重新把原来的图片再次添加到this.lists
            // 数组的some方法意思是，只要数组元素有任意一个元素条件符合，就返回true，而另一个数组的every方法的意思是数组所有元素都符合条件才返回true
            let tmp = lists.value.some(val2 => val2.url == value.url);
            // 如果内部没有这个图片(tmp为false)，则添加到内部
            !tmp && lists.value.push({ url: value.url, error: false, progress: 100 });
        });
    },
    { immediate: true, deep: true }
);

// 监听 lists 变化，发出事件
watch(
    lists,
    n => {
        emit('on-list-change', n, props.index);
    },
    { deep: true }
);

/**
 * 清除列表
 */
function clear() {
    lists.value = [];
}

/**
 * 重新上传队列中上传失败的所有文件
 */
function reUpload() {
    uploadFile();
}

/**
 * 选择图片
 */
function selectFile() {
    if (props.disabled) return;
    const newMaxCount = Number(props.maxCount) - lists.value.length;
    // 设置为只选择图片的时候使用 chooseImage 来实现
    let chooseFile: Promise<any>;
    chooseFile = new Promise((resolve, reject) => {
        uni.chooseImage({
            count: props.multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1,
            sourceType: props.sourceType as string[],
            sizeType: props.sizeType as string[],
            success: resolve,
            fail: reject
        });
    });
    chooseFile
        .then((res: any) => {
            let listOldLength = lists.value.length;
            res.tempFiles.map((val: any, index: number) => {
                // 检查文件后缀是否允许，如果不在limitType内，就会返回false
                if (!checkFileExt(val)) return;
                // 如果是非多选，index大于等于1或者超出最大限制数量时，不处理
                if (!props.multiple && index >= 1) return;
                if (val.size > Number(props.maxSize)) {
                    emit('on-oversize', val, lists.value, props.index);
                    showToast('超出允许的文件大小');
                } else {
                    if (Number(props.maxCount) <= lists.value.length) {
                        emit('on-exceed', val, lists.value, props.index);
                        showToast('超出最大允许的文件个数');
                        return;
                    }
                    lists.value.push({ url: val.path, progress: 0, error: false, file: val });
                }
            });
            // 每次图片选择完，抛出一个事件，并将当前内部选择的图片数组抛出去
            emit('on-choose-complete', lists.value, props.index);
            if (props.autoUpload) uploadFile(listOldLength);
        })
        .catch((error: any) => {
            emit('on-choose-fail', error);
        });
}

/**
 * 提示用户消息
 */
function showToast(message: string, force = false) {
    if (props.showTips || force) {
        uni.showToast({ title: message, icon: 'none' });
    }
}

/**
 * 该方法供用户通过ref调用，手动上传
 */
function upload() {
    uploadFile();
}

/**
 * 对失败的图片重新上传
 */
function retry(index: number) {
    lists.value[index].progress = 0;
    lists.value[index].error = false;
    lists.value[index].response = null;
    uni.showLoading({ title: '重新上传' });
    uploadFile(index);
}

/**
 * 上传图片
 */
async function uploadFile(index = 0) {
    if (props.disabled) return;
    if (uploading.value) return;
    // 全部上传完成
    if (index >= lists.value.length) {
        emit('on-uploaded', lists.value, props.index);
        return;
    }
    // 检查是否是已上传或者正在上传中
    if (lists.value[index].progress == 100) {
        if (props.autoUpload == false) uploadFile(index + 1);
        return;
    }
    // 执行before-upload钩子
    if (props.beforeUpload && typeof props.beforeUpload === 'function') {
        // 执行回调，同时传入索引和文件列表当作参数
        // 在微信，支付宝等环境(H5正常)，会导致父组件定义的customBack()函数体中的this变成子组件的this
        // 通过bind()方法，绑定父组件的this，让this.customBack()的this为父组件的上下文
        // 因为upload组件可能会被嵌套在其他组件内，比如u-form，这时this.$parent其实为u-form的this，
        // 非页面的this，所以这里需要往上历遍，一直寻找到最顶端的$parent，这里用了this.$u.$parent.call(this)
        // 明白意思即可，无需纠结this.$u.$parent.call(this)的细节
        let beforeResponse = props.beforeUpload(index, lists.value);
        // 判断是否返回了promise
        if (typeof beforeResponse === 'object' && beforeResponse !== null && typeof (beforeResponse as Promise<any>).then === 'function') {
            await (beforeResponse as Promise<any>)
                .then(() => {
                    // promise返回成功，不进行动作，继续上传
                })
                .catch(() => {
                    // 进入catch回调的话，继续下一张
                    return uploadFile(index + 1);
                });
        } else if (beforeResponse === false) {
            // 如果返回false，继续下一张图片的上传
            return uploadFile(index + 1);
        } else {
            // 此处为返回"true"的情形，这里不写代码，就跳过此处，继续执行当前的上传逻辑
        }
    }
    // 检查上传地址
    if (!props.action) {
        showToast('请配置上传地址', true);
        return;
    }
    lists.value[index].error = false;
    uploading.value = true;
    // 创建上传对象
    const task = uni.uploadFile({
        url: props.action,
        filePath: lists.value[index].url,
        name: props.name,
        formData: props.formData,
        header: props.header,
        // #ifdef MP-ALIPAY
        fileType: 'image',
        // #endif
        success: (res: any) => {
            // 判断是否json字符串，将其转为json格式
            let data = props.toJson && $u.test.jsonString(res.data) ? JSON.parse(res.data) : res.data;
            if (![200, 201, 204].includes(res.statusCode)) {
                uploadError(index, data);
            } else {
                // 上传成功
                lists.value[index].response = data;
                lists.value[index].progress = 100;
                lists.value[index].error = false;
                emit('on-success', data, index, lists.value, props.index);
            }
        },
        fail: (e: any) => {
            uploadError(index, e);
        },
        complete: (res: any) => {
            uni.hideLoading();
            uploading.value = false;
            uploadFile(index + 1);
            emit('on-change', res, index, lists.value, props.index);
        }
    });
    task.onProgressUpdate((res: any) => {
        if (res.progress > 0) {
            lists.value[index].progress = res.progress;
            emit('on-progress', res, index, lists.value, props.index);
        }
    });
}

/**
 * 上传失败
 */
function uploadError(index: number, err: any) {
    lists.value[index].progress = 0;
    lists.value[index].error = true;
    lists.value[index].response = null;
    emit('on-error', err, index, lists.value, props.index);
    showToast('上传失败，请重试');
}

/**
 * 删除一个图片
 */
function deleteItem(index: number) {
    uni.showModal({
        title: '提示',
        content: '您确定要删除此项吗？',
        success: async (res: any) => {
            if (res.confirm) {
                // 先检查是否有定义before-remove移除前钩子
                // 执行before-remove钩子
                if (props.beforeRemove && typeof props.beforeRemove === 'function') {
                    // 此处钩子执行 原理同before-remove参数，见上方注释
                    let beforeResponse = props.beforeRemove(index, lists.value);
                    // 判断是否返回了promise
                    if (typeof beforeResponse === 'object' && beforeResponse !== null && typeof (beforeResponse as Promise<any>).then === 'function') {
                        await (beforeResponse as Promise<any>)
                            .then(() => {
                                // promise返回成功，不进行动作，继续上传
                                handlerDeleteItem(index);
                            })
                            .catch(() => {
                                // 如果进入promise的reject，终止删除操作
                                showToast('已终止移除');
                            });
                    } else if (beforeResponse === false) {
                        // 返回false，终止删除
                        showToast('已终止移除');
                    } else {
                        // 如果返回true，执行删除操作
                        handlerDeleteItem(index);
                    }
                } else {
                    // 如果不存在before-remove钩子，
                    handlerDeleteItem(index);
                }
            }
        }
    });
}

/**
 * 执行移除图片的动作
 */
function handlerDeleteItem(index: number) {
    // 如果文件正在上传中，终止上传任务，进度在0 < progress < 100则意味着正在上传
    if (lists.value[index].progress < 100 && lists.value[index].progress > 0) {
        typeof lists.value[index].uploadTask != 'undefined' && lists.value[index].uploadTask.abort();
    }
    lists.value.splice(index, 1);
    emit('on-remove', index, lists.value, props.index);
    showToast('移除成功');
}

/**
 * 用户通过ref手动的形式，移除一张图片
 */
function remove(index: number) {
    // 判断索引的合法范围
    if (index >= 0 && index < lists.value.length) {
        lists.value.splice(index, 1);
        emit('on-list-change', lists.value, props.index);
    }
}

/**
 * 预览图片
 */
function doPreviewImage(url: string, index: number) {
    // 判断是否允许预览
    if (!props.previewFullImage) return;
    // 获取所有图片的url
    const images = lists.value.map(item => item.url || item.path);
    uni.previewImage({
        urls: images,
        current: url,
        success: () => {
            emit('on-preview', url, lists.value, props.index);
        },
        fail: () => {
            uni.showToast({ title: '预览图片失败', icon: 'none' });
        }
    });
}

/**
 * 判断文件后缀是否允许
 */
function checkFileExt(file: any) {
    // 检查是否在允许的后缀中
    let noArrowExt = false;
    // 获取后缀名
    let fileExt = '';
    const reg = /.+\./;
    // 如果是H5，需要从name中判断
    // #ifdef H5
    // H5环境下从name中获取后缀
    fileExt = file.name.replace(reg, '').toLowerCase();
    // #endif

    // 非H5环境下从path中获取后缀
    // #ifndef H5
    fileExt = file.path.replace(reg, '').toLowerCase();
    // #endif
    // 使用数组的some方法，只要符合limitType中的一个，就返回true
    noArrowExt = (props.limitType as string[]).some((ext: string) => {
        // 转为小写
        return ext.toLowerCase() === fileExt;
    });
    if (!noArrowExt) showToast(`不允许选择${fileExt}格式的文件`);
    return noArrowExt;
}

defineExpose({ clear, reUpload, selectFile, upload, retry, remove, doPreviewImage, lists });
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-upload {
    @include vue-flex;
    flex-wrap: wrap;
    align-items: center;
}

.u-list-item {
    width: 200rpx;
    height: 200rpx;
    overflow: hidden;
    margin: 10rpx;
    background: rgb(244, 245, 246);
    position: relative;
    border-radius: 10rpx;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    align-items: center;
    justify-content: center;
}

.u-preview-wrap {
    border: 1px solid rgb(235, 236, 238);
}

.u-add-wrap {
    flex-direction: column;
    color: $u-content-color;
    font-size: 26rpx;
}

.u-add-tips {
    margin-top: 20rpx;
    line-height: 40rpx;
}

.u-add-wrap__hover {
    background-color: rgb(235, 236, 238);
}

.u-preview-image {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 10rpx;
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
    @include vue-flex;
    align-items: center;
    justify-content: center;
}

.u-icon {
    @include vue-flex;
    align-items: center;
    justify-content: center;
}

.u-progress {
    position: absolute;
    bottom: 10rpx;
    left: 8rpx;
    right: 8rpx;
    z-index: 9;
    width: auto;
}

.u-error-btn {
    color: #ffffff;
    background-color: $u-type-error;
    font-size: 20rpx;
    padding: 4px 0;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    line-height: 1;
}
</style>
