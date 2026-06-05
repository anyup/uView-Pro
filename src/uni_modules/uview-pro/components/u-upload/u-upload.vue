<template>
    <view
        v-if="!disabled"
        class="u-upload"
        :class="[customClass, { 'u-upload--list': props.mode === 'list' }]"
        :style="$u.toStyle(customStyle)"
    >
        <!-- 列表模式 -->
        <template v-if="props.mode === 'list'">
            <view v-if="showUploadList" class="u-upload-list">
                <view
                    v-for="(item, index) in lists"
                    class="u-upload-list__item"
                    :key="index"
                    :class="{ 'u-upload-list__item--error': item.error }"
                >
                    <!-- 左侧：图片缩略图或文件图标 -->
                    <view class="u-upload-list__left" @tap.stop="handlePreview(item, index)">
                        <!-- 图片类型：显示缩略图 -->
                        <template v-if="isImageFile(item)">
                            <image
                                class="u-upload-list__thumb"
                                :class="{ 'u-upload-list__thumb--circle': props.imageShape === 'circle' }"
                                :src="item.url || item.path"
                                :mode="imageMode"
                            />
                        </template>
                        <!-- 非图片类型：显示文件图标 -->
                        <template v-else>
                            <view
                                class="u-upload-list__icon"
                                :class="{ 'u-upload-list__icon--circle': props.imageShape === 'circle' }"
                                :style="{ background: getFileIcon(item).bgColor }"
                            >
                                <u-icon :name="getFileIcon(item).name" size="32" color="var(--u-white-color)"></u-icon>
                            </view>
                        </template>
                    </view>

                    <!-- 中间：文件名和大小 -->
                    <view class="u-upload-list__center" @tap.stop="handlePreview(item, index)">
                        <text
                            v-if="showFileName && item.name"
                            class="u-upload-list__name"
                            :class="{ 'u-upload-list__name--error': item.error }"
                        >
                            {{ getFileName(item) }}
                        </text>
                        <text v-if="showFileSize && item.size" class="u-upload-list__size">
                            {{ formatFileSize(item.size) }}
                        </text>
                        <!-- 进度条 -->
                        <view
                            v-if="
                                showProgress &&
                                item.progress !== undefined &&
                                item.progress > 0 &&
                                item.progress < 100 &&
                                !item.error
                            "
                            class="u-upload-list__progress"
                        >
                            <u-line-progress
                                height="4"
                                :show-percent="false"
                                :percent="item.progress"
                            ></u-line-progress>
                        </view>
                        <view
                            v-if="item.error"
                            class="u-upload-list__retry"
                            hover-class="u-upload-list__retry--hover"
                            hover-stay-time="150"
                            @tap.stop="retry(index)"
                        >
                            <u-icon name="reload" size="24" color="var(--u-type-error)"></u-icon>
                            <text class="u-upload-list__retry-text">{{ t('uUpload.retry') }}</text>
                        </view>
                    </view>

                    <!-- 右侧：删除按钮 -->
                    <view
                        v-if="deletable"
                        class="u-upload-list__right"
                        @tap.stop="deleteItem(index)"
                        :style="{
                            backgroundColor: delBgColor
                        }"
                    >
                        <u-icon :name="delIcon" size="20" :color="delColor"></u-icon>
                    </view>
                </view>
            </view>

            <!-- 列表模式：自定义文件列表插槽 -->
            <slot name="file" :file="lists"></slot>

            <!-- 列表模式：添加按钮 -->
            <view v-if="Number(maxCount) > lists.length" class="u-upload-list__add" @tap="selectFile">
                <slot name="addBtn"></slot>
                <view
                    v-if="!customBtn"
                    class="u-upload-list__add-btn"
                    hover-class="u-upload-list__add-btn--hover"
                    hover-stay-time="150"
                >
                    <u-icon name="plus" size="32" :color="$u.color.primary"></u-icon>
                    <text class="u-upload-list__add-text">{{ uploadBtnText }}</text>
                </view>
            </view>
        </template>

        <!-- 网格模式（默认） -->
        <template v-else>
            <template v-if="showUploadList">
                <view
                    v-for="(item, index) in lists"
                    class="u-upload-grid__item u-upload-grid__preview"
                    :class="{ 'u-upload-grid__item--circle': props.imageShape === 'circle' }"
                    :key="index"
                    :style="{
                        width: $u.addUnit(width),
                        height: $u.addUnit(height)
                    }"
                >
                    <view
                        v-if="deletable"
                        class="u-upload-grid__delete"
                        @tap.stop="deleteItem(index)"
                        :style="{
                            backgroundColor: delBgColor
                        }"
                    >
                        <u-icon :name="delIcon" size="20" :color="delColor"></u-icon>
                    </view>
                    <view class="u-upload-grid__progress">
                        <u-line-progress
                            v-if="
                                showProgress &&
                                item.progress !== undefined &&
                                item.progress > 0 &&
                                item.progress !== 100 &&
                                !item.error
                            "
                            :show-percent="false"
                            height="16"
                            :percent="item.progress"
                        ></u-line-progress>
                    </view>
                    <view @tap.stop="retry(index)" v-if="item.error" class="u-upload-grid__error">{{
                        t('uUpload.retry')
                    }}</view>

                    <!-- 图片类型预览 -->
                    <template v-if="isImageFile(item)">
                        <image
                            class="u-upload-grid__image"
                            :class="{ 'u-upload-grid__image--circle': props.imageShape === 'circle' }"
                            :src="item.url || item.path"
                            :mode="imageMode"
                            @tap.stop="handlePreview(item, index)"
                        ></image>
                    </template>

                    <!-- 视频类型预览 -->
                    <template v-else-if="isVideoFile(item)">
                        <view class="u-upload-grid__file" @tap.stop="doPreviewFile(item, index)">
                            <view class="u-upload-grid__file-icon" :style="{ background: getFileIcon(item).bgColor }">
                                <u-icon :name="getFileIcon(item).name" size="48" color="var(--u-white-color)"></u-icon>
                            </view>
                            <view class="u-upload-grid__file-info" v-if="showFileName || showFileSize">
                                <text
                                    v-if="showFileName && item.name"
                                    class="u-upload-grid__file-name"
                                    :style="{ color: item.error ? 'var(--u-type-error)' : 'var(--u-content-color)' }"
                                >
                                    {{ getFileName(item) }}
                                </text>
                                <text v-if="showFileSize && item.size" class="u-upload-grid__file-size">{{
                                    formatFileSize(item.size)
                                }}</text>
                            </view>
                        </view>
                    </template>

                    <!-- 其他文件类型预览 -->
                    <template v-else>
                        <view class="u-upload-grid__file" @tap.stop="doPreviewFile(item, index)">
                            <view class="u-upload-grid__file-icon" :style="{ background: getFileIcon(item).bgColor }">
                                <u-icon :name="getFileIcon(item).name" size="48" color="var(--u-white-color)"></u-icon>
                            </view>
                            <view class="u-upload-grid__file-info" v-if="showFileName || showFileSize">
                                <text
                                    v-if="showFileName && item.name"
                                    class="u-upload-grid__file-name"
                                    :style="{ color: item.error ? 'var(--u-type-error)' : 'var(--u-content-color)' }"
                                >
                                    {{ getFileName(item) }}
                                </text>
                                <text v-if="showFileSize && item.size" class="u-upload-grid__file-size">
                                    {{ formatFileSize(item.size) }}
                                </text>
                            </view>
                        </view>
                    </template>
                </view>
            </template>
            <slot name="file" :file="lists"></slot>
            <view style="display: inline-block" @tap="selectFile" v-if="Number(maxCount) > lists.length">
                <slot name="addBtn"></slot>
                <view
                    v-if="!customBtn"
                    class="u-upload-grid__item u-upload-grid__add"
                    hover-class="u-upload-grid__add--hover"
                    hover-stay-time="150"
                    :class="{ 'u-upload-grid__item--circle': props.imageShape === 'circle' }"
                    :style="{
                        width: $u.addUnit(width),
                        height: $u.addUnit(height)
                    }"
                >
                    <u-icon name="plus" class="u-upload-grid__add-icon" size="40"></u-icon>
                    <view class="u-upload-grid__add-text">{{ uploadBtnText }}</view>
                </view>
            </view>
        </template>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-upload',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { $u, useLocale } from '../..';
import { UploadProps } from './types';
import type { UploadFileItem } from '../../types/global';

/**
 * upload 文件上传
 * @description 该组件用于上传文件场景，支持图片、视频、文档等多种类型，支持网格和列表两种展示模式
 * @tutorial https://uviewpro.cn/zh/components/upload.html
 *
 * @property {String} action 服务器上传地址
 * @property {String} accept 接受上传的文件类型，可选值：image|video|file|media|all，默认image
 * @property {String} mode 上传组件的展示模式，可选值：grid|list，默认grid
 * @property {String Number} max-count 最大选择文件的数量（默认52）
 * @property {String Number} max-size 选择单个文件的最大大小，单位B(byte)，默认不限制（默认Number.MAX_VALUE）
 * @property {Boolean} multiple 是否开启文件多选（默认true）
 * @property {Boolean} disabled 是否禁用组件（默认false）
 * @property {Boolean} auto-upload 选择完文件是否自动上传（默认true）
 * @property {Boolean} deletable 是否显示删除文件的按钮（默认true）
 * @property {Boolean} show-confirm 删除文件前是否显示确认弹窗（默认true）
 * @property {Boolean} show-tips 特殊情况下是否自动提示toast（默认true）
 * @property {Boolean} show-progress 是否显示上传进度条（默认true）
 * @property {Boolean} show-upload-list 是否显示组件内部的文件预览列表（默认true）
 * @property {Boolean} show-file-name 是否显示文件名（默认true）
 * @property {Boolean} show-file-size 是否显示文件大小（默认false）
 * @property {Boolean} preview-full-image 是否可以通过uni.previewImage预览已选择的图片（默认true）
 * @property {Boolean} preview-file 是否可预览文件（非图片类型）（默认true）
 * @property {Boolean} custom-btn 是否自定义选择文件的按钮，设置为true可使用addBtn插槽（默认false）
 * @property {String} upload-text 选择文件按钮的提示文字（默认根据accept自动显示）
 * @property {String} image-mode 预览图片的显示模式，可选值为uni的image的mode属性值（默认aspectFill）
 * @property {String} del-icon 右上角删除图标名称，只能为uView内置图标（默认'close'）
 * @property {String} del-bg-color 右上角删除按钮的背景颜色（默认'var(--u-type-error)'）
 * @property {String} del-color 右上角删除按钮图标的颜色（默认'var(--u-white-color)'）
 * @property {String | Number} index 在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件
 * @property {Object} header 上传携带的请求头信息，对象形式
 * @property {Object} form-data 上传额外携带的参数
 * @property {String} name 上传文件的字段名，供后端获取使用（默认'file'）
 * @property {Array<String>} size-type original 原图，compressed 压缩图，默认二者都有（默认['original', 'compressed']）
 * @property {Array<String>} source-type 选择文件的来源，album-从相册选图，camera-使用相机，默认二者都有（默认['album', 'camera']）
 * @property {Array<String>} limit-type 限制允许上传的文件后缀，如['png', 'jpg']。优先级高于accept内置的格式限制
 * @property {Array<String>} extension 选择文件时的扩展名过滤，仅在H5和微信小程序accept='file'时有效，如['.pdf', '.docx']
 * @property {Object} file-icon-map 文件类型图标映射配置，用于自定义不同文件类型的图标和颜色
 * @property {Boolean} compressed 选择视频时是否压缩（默认true）
 * @property {Number} max-duration 选择视频时拍摄最长时长，单位秒（默认60）
 * @property {String} camera 选择视频时摄像头方向，可选值：front|back（默认'back'）
 * @property {String} image-shape 图片/图标展示形状，可选值：square|circle（默认'square'），在grid模式下作用于图片和添加按钮，在list模式下作用于图标
 * @property {Array<Object>} file-list 默认显示的文件列表，数组元素为对象，必须提供url属性
 * @property {Function} before-upload 上传前钩子，返回false或Promise.reject则跳过当前文件上传
 * @property {Function} before-remove 删除前钩子，返回false或Promise.reject则阻止删除
 * @property {Boolean} to-json 如果上传后的返回值为json字符串，是否自动转为json格式（默认true）
 * @property {Boolean} custom-choose 是否使用自定义文件选择，开启后点击选择文件会触发 on-choose 事件而不调用默认选择API（默认false）
 *
 * @event {Function} on-oversize 文件大小超出max-size限制时触发
 * @event {Function} on-exceed 文件数量超出max-count限制时触发
 * @event {Function} on-choose-complete 每次选择文件后触发，返回当前文件列表
 * @event {Function} on-choose-fail 文件选择失败时触发
 * @event {Function} on-uploaded 所有文件上传完毕时触发
 * @event {Function} on-success 单个文件上传成功时触发
 * @event {Function} on-error 单个文件上传失败时触发
 * @event {Function} on-change 单个文件上传状态改变时触发（无论成功或失败）
 * @event {Function} on-progress 文件上传过程中的进度变化时触发
 * @event {Function} on-remove 移除文件时触发
 * @event {Function} on-preview 预览文件时触发
 * @event {Function} on-list-change 文件列表发生变化时触发
 * @event {Function} on-choose 启用 custom-choose 时触发，参数为 { accept, maxCount, fileList, index }，用户可自定义文件选择逻辑
 *
 * @example <u-upload :action="action" :file-list="fileList" accept="image"></u-upload>
 * @example <u-upload :action="action" accept="file" mode="list" :show-file-name="true"></u-upload>
 */

const props = defineProps(UploadProps);

const { t } = useLocale();

const emit = defineEmits([
    'on-list-change',
    'on-oversize',
    'on-exceed',
    'on-choose',
    'on-choose-complete',
    'on-choose-fail',
    'on-uploaded',
    'on-success',
    'on-error',
    'on-change',
    'on-progress',
    'on-remove',
    'on-preview',
    'update:modelValue'
]);

const lists = ref<UploadFileItem[]>([]);
const uploading = ref(false);

// 默认文件图标映射
const defaultFileIconMap: Record<string, { name: string; bgColor: string }> = {
    image: { name: 'photo', bgColor: 'var(--u-type-primary)' },
    video: { name: 'play-circle', bgColor: 'var(--u-type-error)' },
    pdf: { name: 'file-text', bgColor: 'var(--u-type-error)' },
    word: { name: 'file-text', bgColor: 'var(--u-type-primary)' },
    excel: { name: 'file-text', bgColor: 'var(--u-type-success)' },
    ppt: { name: 'file-text', bgColor: 'var(--u-type-warning)' },
    zip: { name: 'folder', bgColor: 'var(--u-tips-color)' },
    audio: { name: 'volume-up', bgColor: 'var(--u-type-info)' },
    file: { name: 'file-text', bgColor: 'var(--u-tips-color)' }
};

// 文件扩展名到类型的映射
const extTypeMap: Record<string, string> = {
    // 图片
    png: 'image',
    jpg: 'image',
    jpeg: 'image',
    gif: 'image',
    bmp: 'image',
    webp: 'image',
    svg: 'image',
    // 视频
    mp4: 'video',
    avi: 'video',
    mov: 'video',
    wmv: 'video',
    flv: 'video',
    mkv: 'video',
    rmvb: 'video',
    '3gp': 'video',
    m3u8: 'video',
    // PDF
    pdf: 'pdf',
    // Word
    doc: 'word',
    docx: 'word',
    // Excel
    xls: 'excel',
    xlsx: 'excel',
    csv: 'excel',
    // PPT
    ppt: 'ppt',
    pptx: 'ppt',
    // 压缩包
    zip: 'zip',
    rar: 'zip',
    '7z': 'zip',
    tar: 'zip',
    gz: 'zip',
    // 音频
    mp3: 'audio',
    wav: 'audio',
    wma: 'audio',
    ogg: 'audio',
    aac: 'audio',
    flac: 'audio'
};

/**
 * 根据 accept 类型获取上传按钮文字
 */
const uploadBtnText = computed(() => {
    // 如果用户自定义了 uploadText，优先使用
    if (props.uploadText) {
        return props.uploadText;
    }
    // 根据 accept 类型返回对应的国际化文本
    switch (props.accept) {
        case 'image':
            return t('uUpload.uploadImage');
        case 'video':
            return t('uUpload.uploadVideo');
        case 'file':
            return t('uUpload.uploadFile');
        case 'media':
            return t('uUpload.uploadMedia');
        case 'all':
        default:
            return t('uUpload.uploadFile');
    }
});

/**
 * 同步外部列表到内部 lists
 * @param val 外部传入的文件列表
 * @param isModelValue 是否来自 modelValue
 */
function syncToInternal(val: UploadFileItem[], isModelValue: boolean = false) {
    // 只有当不是由内部变化触发时才同步（避免循环更新）
    const externalList = isModelValue ? props.modelValue : props.fileList;
    const externalSet = new Set(externalList.map((item: UploadFileItem) => item.url || item.path).filter(Boolean));
    const internalSet = new Set(lists.value.map(item => item.url || item.path).filter(Boolean));

    // 检查是否需要同步（简单比较长度和关键属性）
    const needSync =
        externalList.length !== lists.value.length ||
        !externalList.every(
            (item: UploadFileItem) => externalSet.has(item.url || item.path) && internalSet.has(item.url || item.path)
        );

    if (!needSync) return;

    // 清空并重新填充（保持数据一致性）
    lists.value = val.map((value: UploadFileItem) => {
        const fileType = value.fileType || detectFileType(value);
        return {
            ...value,
            url: value.url,
            path: value.path,
            name: value.name || getFileNameFromPath(value.url || value.path || ''),
            size: value.size || 0,
            fileType,
            error: value.error || false,
            progress: value.progress ?? 100
        };
    });
}

// 监听 modelValue 变化，自动同步内部 lists（v-model 模式，优先级更高）
watch(
    () => props.modelValue,
    val => {
        if (val && val.length > 0) {
            syncToInternal(val, true);
        }
    },
    { immediate: true, deep: true }
);

// 监听 fileList 变化，自动同步内部 lists（向后兼容模式，仅在 modelValue 为空时生效）
watch(
    () => props.fileList,
    val => {
        // 如果 modelValue 有值，优先使用 modelValue，忽略 fileList
        if (props.modelValue && props.modelValue.length > 0) return;
        syncToInternal(val, false);
    },
    { immediate: true, deep: true }
);

// 监听 lists 变化，自动触发事件
watch(
    lists,
    n => {
        // 触发 v-model 更新
        emit('update:modelValue', n);
        // 触发 on-list-change 事件（向后兼容）
        emit('on-list-change', n, props.index);
    },
    { deep: true }
);

/**
 * 从路径中获取文件名
 */
function getFileNameFromPath(path: string): string {
    if (!path) return '';
    const arr = path.split('/');
    return arr[arr.length - 1] || '';
}

/**
 * 根据扩展名检测文件类型
 */
function getFileTypeByExt(ext: string): 'image' | 'video' | 'file' {
    const lowerExt = ext.toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'].includes(lowerExt)) {
        return 'image';
    }
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'rmvb', '3gp', 'm3u8'].includes(lowerExt)) {
        return 'video';
    }
    return 'file';
}

/**
 * 检测文件类型
 */
function detectFileType(file: UploadFileItem): 'image' | 'video' | 'file' {
    return getFileTypeByExt(getFileExt(file));
}

/**
 * 获取文件扩展名
 */
function getFileExt(file: UploadFileItem): string {
    const path = file.url || file.path || file.name || '';
    if (!path) return '';
    const reg = /\.([^.]+)$/;
    const match = path.match(reg);
    return match ? match[1].toLowerCase() : '';
}

/**
 * 判断是否为图片文件
 */
function isImageFile(file: UploadFileItem): boolean {
    if (file.fileType) return file.fileType === 'image';
    const ext = getFileExt(file);
    return ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg', 'image'].includes(ext);
}

/**
 * 判断是否为视频文件
 */
function isVideoFile(file: UploadFileItem): boolean {
    if (file.fileType) return file.fileType === 'video';
    const ext = getFileExt(file);
    return ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'rmvb', '3gp', 'm3u8'].includes(ext);
}

/**
 * 获取文件图标配置
 */
function getFileIcon(file: UploadFileItem): { name: string; bgColor: string } {
    const ext = getFileExt(file);
    const type = extTypeMap[ext] || 'file';

    // 优先使用用户自定义配置
    if (props.fileIconMap && props.fileIconMap[type]) {
        const customIcon = props.fileIconMap[type];
        return {
            name: customIcon.name,
            bgColor: customIcon.color || defaultFileIconMap[type]?.bgColor || 'var(--u-tips-color)'
        };
    }

    return defaultFileIconMap[type] || defaultFileIconMap.file;
}

/**
 * 获取文件名（处理过长的情况）
 */
function getFileName(file: UploadFileItem): string {
    const name = file.name || getFileNameFromPath(file.url || file.path || '');
    if (!name) return '未知文件';
    // 如果文件名过长，截断显示
    if (name.length > 15) {
        const ext = getFileExt(file);
        return name.substring(0, 12) + '...' + (ext ? '.' + ext : '');
    }
    return name;
}

/**
 * 格式化文件大小（简化版，避免 Math.log 计算）
 */
function formatFileSize(size: number): string {
    if (size === 0) return '0 B';

    const KB = 1024;
    const MB = KB * 1024;
    const GB = MB * 1024;

    if (size < KB) {
        return size + ' B';
    } else if (size < MB) {
        return (size / KB).toFixed(2) + ' KB';
    } else if (size < GB) {
        return (size / MB).toFixed(2) + ' MB';
    } else {
        return (size / GB).toFixed(2) + ' GB';
    }
}

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
 * 选择文件
 */
function selectFile() {
    if (props.disabled) return;

    // 如果启用了自定义选择，触发 on-choose 事件，由用户自行处理文件选择
    if (props.customChoose) {
        emit('on-choose', {
            accept: props.accept,
            maxCount: props.maxCount,
            fileList: lists.value,
            index: props.index
        });
        return;
    }

    // 根据 accept 类型选择不同的文件选择方式
    switch (props.accept) {
        case 'image':
            chooseImage();
            break;
        case 'video':
            chooseVideo();
            break;
        case 'media':
            chooseMedia();
            break;
        case 'file':
        case 'all':
            chooseFile();
            break;
        default:
            chooseImage();
    }
}

/**
 * 选择图片
 */
function chooseImage() {
    const newMaxCount = Number(props.maxCount) - lists.value.length;

    uni.chooseImage({
        count: props.multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1,
        sourceType: props.sourceType,
        sizeType: props.sizeType as string[],
        success: (res: any) => {
            handleFilesSelected(res.tempFiles, 'image');
        },
        fail: (error: any) => {
            emit('on-choose-fail', error);
        }
    });
}

/**
 * 选择视频
 */
function chooseVideo() {
    uni.chooseVideo({
        sourceType: props.sourceType,
        compressed: props.compressed,
        maxDuration: props.maxDuration,
        camera: props.camera as 'front' | 'back',
        success: (res: any) => {
            const file = {
                path: res.tempFilePath,
                name: res.name || getFileNameFromPath(res.tempFilePath),
                size: res.size || 0,
                width: res.width,
                height: res.height,
                duration: res.duration
            };
            handleFilesSelected([file], 'video');
        },
        fail: (error: any) => {
            emit('on-choose-fail', error);
        }
    });
}

/**
 * 选择媒体文件（图片+视频）
 */
function chooseMedia() {
    // #ifdef MP-WEIXIN || MP-TOUTIAO || APP
    const newMaxCount = Number(props.maxCount) - lists.value.length;
    uni.chooseMedia({
        count: props.multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1,
        mediaType: ['image', 'video'],
        sourceType: props.sourceType,
        maxDuration: props.maxDuration,
        camera: props.camera as 'front' | 'back',
        success: (res: any) => {
            const files = res.tempFiles.map((file: any) => ({
                path: file.tempFilePath,
                name: file.name || getFileNameFromPath(file.tempFilePath),
                size: file.size || 0,
                thumb: file.thumbTempFilePath,
                duration: file.duration,
                width: file.width,
                height: file.height
            }));
            handleFilesSelected(files, 'media');
        },
        fail: (error: any) => {
            emit('on-choose-fail', error);
        }
    });
    // #endif

    // #ifndef MP-WEIXIN || MP-TOUTIAO || APP
    // 非支持平台回退到选择图片
    chooseImage();
    // #endif
}

/**
 * 选择文件
 */
function chooseFile() {
    // #ifdef H5 || MP-WEIXIN
    const newMaxCount = Number(props.maxCount) - lists.value.length;

    // #ifdef H5
    // H5 使用 chooseFile
    if (typeof uni.chooseFile === 'function') {
        uni.chooseFile({
            count: props.multiple ? (newMaxCount > 100 ? 100 : newMaxCount) : 1,
            type: 'all',
            extension: props.extension.length > 0 ? props.extension : undefined,
            success: (res: any) => {
                handleFilesSelected(res.tempFiles, 'file');
            },
            fail: (error: any) => {
                emit('on-choose-fail', error);
            }
        });
    }
    // #endif

    // #ifdef MP-WEIXIN
    // 微信小程序使用 chooseMessageFile
    if (typeof uni.chooseMessageFile === 'function') {
        uni.chooseMessageFile({
            count: props.multiple ? (newMaxCount > 100 ? 100 : newMaxCount) : 1,
            type: 'all',
            extension: props.extension.length > 0 ? props.extension : undefined,
            success: (res: any) => {
                const files = res.tempFiles.map((file: any) => ({
                    path: file.path,
                    name: file.name,
                    size: file.size,
                    type: file.type
                }));
                handleFilesSelected(files, 'file');
            },
            fail: (error: any) => {
                emit('on-choose-fail', error);
            }
        });
    }
    // #endif
    // #endif

    // #ifndef H5 || MP-WEIXIN
    // 其他平台暂不支持文件选择，提示用户
    showToast(t('uUpload.fileNotSupported') || '当前平台暂不支持文件选择');
    // #endif
}

/**
 * 处理选中的文件
 * @param files 文件数组
 * @param sourceType 文件来源类型
 */
function handleFilesSelected(files: any[], sourceType: 'image' | 'video' | 'media' | 'file') {
    let listOldLength = lists.value.length;

    files.forEach((val: any, index: number) => {
        // 检查文件后缀是否允许
        if (!checkFileExt(val)) return;

        // 如果是非多选，index大于等于1或者超出最大限制数量时，不处理
        if (!props.multiple && index >= 1) return;

        if (val.size > Number(props.maxSize)) {
            emit('on-oversize', val, lists.value, props.index);
            showToast(t('uUpload.overSize'));
        } else {
            if (Number(props.maxCount) <= lists.value.length) {
                emit('on-exceed', val, lists.value, props.index);
                showToast(t('uUpload.overMaxCount'));
                return;
            }

            // 根据 accept 和 sourceType 确定 fileType
            let fileType: 'image' | 'video' | 'file';
            if (props.accept === 'image') {
                fileType = 'image';
            } else if (props.accept === 'video') {
                fileType = 'video';
            } else if (props.accept === 'file') {
                fileType = 'file';
            } else {
                // media 或 all 时，根据 sourceType 或路径检测
                if (sourceType === 'image' || sourceType === 'video') {
                    fileType = sourceType;
                } else {
                    fileType = detectFileTypeFromPath(val.path || val.name || '');
                }
            }

            lists.value.push({
                url: val.path,
                path: val.path,
                name: val.name || getFileNameFromPath(val.path || ''),
                size: val.size || 0,
                progress: 0,
                error: false,
                file: val,
                fileType,
                thumb: val.thumb || '',
                width: val.width,
                height: val.height,
                duration: val.duration,
                type: val.type
            });
        }
    });

    // 每次文件选择完，抛出一个事件，并将当前内部选择的文件数组抛出去
    emit('on-choose-complete', lists.value, props.index);
    // 使用 props.autoUpload 是否立即上传
    if (props.autoUpload) uploadFile(listOldLength);
}

/**
 * 添加文件到列表（供外部调用，配合 custom-choose 使用）
 * @param files 文件数组，格式为 { path: string, name?: string, size?: number, fileType?: 'image'|'video'|'file', ... }
 */
function addFiles(files: any[]) {
    if (!files || !Array.isArray(files) || files.length === 0) return;
    handleFilesSelected(files, props.accept as 'image' | 'video' | 'media' | 'file');
}

/**
 * 从路径中获取文件扩展名
 */
function getExtFromPath(path: string): string {
    if (!path) return '';
    return path.split('.').pop() || '';
}

/**
 * 根据路径检测文件类型
 */
function detectFileTypeFromPath(path: string): 'image' | 'video' | 'file' {
    return getFileTypeByExt(getExtFromPath(path));
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
 * 对失败的文件重新上传
 */
function retry(index: number) {
    lists.value[index].progress = 0;
    lists.value[index].error = false;
    lists.value[index].response = null;
    if (props.showTips) {
        uni.showLoading({ title: t('uUpload.reUpload') });
    }
    uploadFile(index);
}

/**
 * 上传文件
 */
async function uploadFile(index = 0): Promise<void> {
    if (props.disabled) return;
    if (uploading.value) return;

    // 全部上传完成
    if (index >= lists.value.length) {
        emit('on-uploaded', lists.value, props.index);
        return;
    }

    // 检查是否是已上传或者正在上传中
    if (lists.value[index].progress === 100) {
        if (props.autoUpload === false) uploadFile(index + 1);
        return;
    }

    // 执行before-upload钩子
    if (props.beforeUpload && typeof props.beforeUpload === 'function') {
        let beforeResponse = props.beforeUpload(index, lists.value);
        if (
            typeof beforeResponse === 'object' &&
            beforeResponse !== null &&
            typeof (beforeResponse as Promise<any>).then === 'function'
        ) {
            await (beforeResponse as Promise<any>)
                .then(() => {
                    // promise返回成功，不进行动作，继续上传
                })
                .catch(() => {
                    // 进入catch回调的话，继续下一个
                    return uploadFile(index + 1);
                });
        } else if (beforeResponse === false) {
            return uploadFile(index + 1);
        }
    }

    // 检查上传地址
    if (!props.action) {
        showToast(t('uUpload.noAction'), true);
        return;
    }

    lists.value[index].error = false;
    uploading.value = true;

    // 创建上传对象
    const uploadTask = uni.uploadFile({
        url: props.action,
        filePath: lists.value[index].url || lists.value[index].path || '',
        name: props.name,
        formData: props.formData,
        header: props.header,
        // #ifdef MP-ALIPAY
        fileType: isImageFile(lists.value[index]) ? 'image' : 'video',
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
            // 上传完成后清除任务引用
            lists.value[index].uploadTask = undefined;
            uni.hideLoading();
            uploading.value = false;
            uploadFile(index + 1);
            emit('on-change', res, index, lists.value, props.index);
        }
    });

    // 保存上传任务引用，用于后续取消上传
    lists.value[index].uploadTask = uploadTask as unknown as UniApp.UploadTask;

    uploadTask.onProgressUpdate((res: any) => {
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
    showToast(t('uUpload.uploadFailed'));
}

/**
 * 删除一个文件
 */
function deleteItem(index: number) {
    // 如果需要确认弹窗，显示 uni.showModal
    if (props.showConfirm) {
        uni.showModal({
            title: t('uUpload.modalTitle'),
            content: t('uUpload.deleteConfirm'),
            cancelText: t('uUpload.modalCancelText'),
            confirmText: t('uUpload.modalConfirmText'),
            success: async (res: any) => {
                if (res.confirm) {
                    await executeBeforeRemove(index);
                }
            }
        });
    } else {
        // 不需要确认弹窗，直接执行删除
        executeBeforeRemove(index);
    }
}

/**
 * 执行删除前的钩子并删除文件
 */
async function executeBeforeRemove(index: number) {
    // 执行before-remove钩子
    if (props.beforeRemove && typeof props.beforeRemove === 'function') {
        let beforeResponse = props.beforeRemove(index, lists.value);
        if (
            typeof beforeResponse === 'object' &&
            beforeResponse !== null &&
            typeof (beforeResponse as Promise<any>).then === 'function'
        ) {
            await (beforeResponse as Promise<any>)
                .then(() => {
                    handlerDeleteItem(index);
                })
                .catch(() => {
                    showToast(t('uUpload.terminatedRemove'));
                });
        } else if (beforeResponse === false) {
            showToast(t('uUpload.terminatedRemove'));
        } else {
            handlerDeleteItem(index);
        }
    } else {
        handlerDeleteItem(index);
    }
}

/**
 * 执行移除文件的动作
 */
function handlerDeleteItem(index: number) {
    // 如果文件正在上传中，终止上传任务
    const item = lists.value[index];
    if (item && item.progress !== undefined && item.progress < 100 && item.progress > 0) {
        typeof item.uploadTask != 'undefined' && item.uploadTask?.abort?.();
    }
    lists.value.splice(index, 1);
    emit('on-remove', index, lists.value, props.index);
    showToast(t('uUpload.removeSuccess'));
}

/**
 * 用户通过ref手动的形式，移除一个文件
 */
function remove(index: number) {
    // 判断索引的合法范围
    if (index >= 0 && index < lists.value.length) {
        lists.value.splice(index, 1);
    }
}

/**
 * 预览/打开文件
 */
function doPreviewFile(item: string | UploadFileItem, index: number) {
    // 处理字符串类型的文件
    if (typeof item === 'string') {
        item = { url: item };
    }
    // 图片文件预览
    if (isImageFile(item)) {
        doPreviewImage(item.url || item.path || '', index);
        return;
    }
    // 视频文件不支持预览
    if (isVideoFile(item)) {
        return;
    }
    // 尝试打开文档
    openDocument(item);
}

/**
 * 预览图片
 */
function doPreviewImage(url: string, index: number) {
    // 获取所有图片的url
    const images = lists.value.filter(item => isImageFile(item)).map(item => item.url || item.path || '');
    uni.previewImage({
        urls: images,
        current: url,
        success: () => {
            console.log('预览图片成功');
        },
        fail: () => {
            showToast(t('uUpload.previewFailed'));
        }
    });
}

/**
 * 打开文档
 */
function openDocument(item: UploadFileItem) {
    // #ifdef H5
    // H5 环境直接在新标签页打开
    if (item.url) {
        window.open(item.url, '_blank');
    }
    // #endif

    // #ifndef H5
    // 其他环境尝试使用 uni.openDocument
    if (item.path || item.url) {
        uni.openDocument({
            filePath: item.path || item.url || '',
            showMenu: true,
            success: () => {
                console.log('打开文档成功');
            },
            fail: err => {
                console.error('打开文档失败', err);
                showToast(t('uUpload.openFailed') || '无法打开此文件');
            }
        });
    }
    // #endif
}

/**
 * 统一处理预览
 */
function handlePreview(item: UploadFileItem, index: number) {
    emit('on-preview', item.url || item.path, lists.value, props.index);
    // 判断是否允许预览
    if (!props.previewFile) return;
    // 图片文件预览
    if (isImageFile(item) && props.previewFullImage) {
        doPreviewImage(item.url || item.path || '', index);
        return;
    }
    // 文件预览
    doPreviewFile(item, index);
}

/**
 * 从文件名或路径中提取扩展名（简化版，避免正则表达式）
 */
function extractExt(file: { name?: string; path?: string }): string {
    let source: string;
    // #ifdef H5
    source = file.name || file.path || '';
    // #endif
    // #ifndef H5
    source = file.path || file.name || '';
    // #endif

    if (!source) return '';
    const lastDotIndex = source.lastIndexOf('.');
    return lastDotIndex > -1 ? source.slice(lastDotIndex + 1).toLowerCase() : '';
}

/**
 * 判断文件后缀是否允许
 */
function checkFileExt(file: { name?: string; path?: string }): boolean {
    const fileExt = extractExt(file);

    // 根据 accept 类型确定允许的后缀
    let allowedExts: string[] = [];
    if (props.limitType && props.limitType.length > 0) {
        allowedExts = props.limitType;
    } else if (props.accept === 'image') {
        allowedExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'image'];
    } else if (props.accept === 'video') {
        allowedExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'rmvb', '3gp', 'm3u8'];
    } else if (props.accept === 'file') {
        // file 类型使用用户设置的 extension 或允许所有文件
        allowedExts = props.extension.length > 0 ? (props.extension as string[]) : [];
    } else if (props.accept === 'media') {
        // media 类型，合并图片和视频格式
        allowedExts = [
            'png',
            'jpg',
            'jpeg',
            'gif',
            'webp',
            'bmp',
            'svg',
            'mp4',
            'avi',
            'mov',
            'wmv',
            'flv',
            'mkv',
            'rmvb',
            '3gp',
            'm3u8'
        ];
    } else {
        // all 类型，允许所有文件
        return true;
    }

    // 如果没有限制类型（空数组），允许所有
    if (allowedExts.length === 0) return true;

    // 使用数组的some方法，只要符合allowedExts中的一个，就返回true
    const isValid = allowedExts.some(ext => ext.toLowerCase() === fileExt);

    if (!isValid) showToast(t('uUpload.notAllowedExt', { ext: fileExt || '未知' }));
    return isValid;
}

defineExpose({
    lists,
    clear,
    reUpload,
    selectFile,
    upload,
    retry,
    remove,
    previewImage: doPreviewImage,
    previewFile: doPreviewFile,
    addFiles
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-upload {
    @include vue-flex;
    flex-wrap: wrap;
    align-items: center;
}

// ==================== Grid 模式样式 ====================
.u-upload-grid__item {
    width: 200rpx;
    height: 200rpx;
    overflow: hidden;
    margin: 10rpx;
    background: var(--u-bg-gray-light);
    position: relative;
    border-radius: 10rpx;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    align-items: center;
    justify-content: center;
}

.u-upload-grid__preview {
    border: 1px solid var(--u-border-color);
}

.u-upload-grid__add {
    flex-direction: column;
    color: $u-content-color;
    font-size: 26rpx;
}

.u-upload-grid__add-text {
    margin-top: 20rpx;
    line-height: 40rpx;
}

.u-upload-grid__add--hover {
    background-color: var(--u-bg-gray-light);
}

.u-upload-grid__image {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 10rpx;
}

.u-upload-grid__image--circle {
    border-radius: 50%;
}

.u-upload-grid__item--circle {
    border-radius: 50%;
}

.u-upload-grid__item--circle .u-upload-grid__delete {
    top: 20rpx;
    right: 30rpx;
    width: 36rpx;
    height: 36rpx;
}

.u-upload-grid__item--circle .u-upload-grid__progress {
    bottom: 16rpx;
    left: 16rpx;
    right: 16rpx;
}

.u-upload-grid__delete {
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

.u-upload-grid__progress {
    position: absolute;
    bottom: 10rpx;
    left: 8rpx;
    right: 8rpx;
    z-index: 9;
    width: auto;
}

.u-upload-grid__error {
    color: var(--u-white-color);
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

// Grid 模式：文件预览样式
.u-upload-grid__file {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16rpx;
    box-sizing: border-box;
    position: relative;
}

.u-upload-grid__file-icon {
    width: 80rpx;
    height: 80rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12rpx;
}

.u-upload-grid__file-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: -20rpx;
    opacity: 0.9;
}

.u-upload-grid__file-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.u-upload-grid__file-name {
    font-size: 22rpx;
    line-height: 1.4;
    text-align: center;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.u-upload-grid__file-size {
    font-size: 20rpx;
    color: var(--u-tips-color);
    margin-top: 4rpx;
}

// ==================== 列表模式样式 ====================
.u-upload--list {
    flex-direction: column;
    align-items: stretch;
}

// 列表模式容器
.u-upload-list {
    display: flex;
    flex-direction: column;
    width: 100%;
}

// 列表项
.u-upload-list__item {
    display: flex;
    align-items: center;
    padding: 20rpx;
    background: var(--u-bg-white);
    border-radius: 12rpx;
    margin-bottom: 16rpx;
    border: 1rpx solid var(--u-border-color);
    position: relative;
}

.u-upload-list__item--error {
    border-color: var(--u-type-error);
    position: relative;
}

.u-upload-list__item--error::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--u-type-error);
    opacity: 0.05;
    border-radius: inherit;
    pointer-events: none;
}

.u-upload-list__item:last-child {
    margin-bottom: 0;
}

// 左侧：缩略图/图标
.u-upload-list__left {
    flex-shrink: 0;
    margin-right: 20rpx;
}

.u-upload-list__thumb {
    width: 80rpx;
    height: 80rpx;
    border-radius: 8rpx;
    background: var(--u-bg-gray-light);
}

.u-upload-list__thumb--circle {
    border-radius: 50%;
}

.u-upload-list__icon {
    width: 80rpx;
    height: 80rpx;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.u-upload-list__icon--circle {
    border-radius: 50%;
}

// 中间：文件名信息
.u-upload-list__center {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
}

.u-upload-list__name {
    font-size: 28rpx;
    color: var(--u-content-color);
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
}

.u-upload-list__name--error {
    color: var(--u-type-error);
}

.u-upload-list__size {
    font-size: 24rpx;
    color: var(--u-tips-color);
    margin-top: 8rpx;
    text-align: left;
}

.u-upload-list__progress {
    margin-top: 12rpx;
    width: 100%;
}

// 重试按钮
.u-upload-list__retry {
    display: flex;
    align-items: center;
    margin-top: 8rpx;
    padding: 8rpx 16rpx;
    border-radius: 8rpx;
    align-self: flex-start;
    position: relative;
}

.u-upload-list__retry::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--u-type-error);
    opacity: 0.1;
    border-radius: inherit;
    pointer-events: none;
}

.u-upload-list__retry--hover::before {
    opacity: 0.2;
}

.u-upload-list__retry-text {
    font-size: 24rpx;
    color: var(--u-type-error);
    margin-left: 8rpx;
}

// 右侧：删除按钮
.u-upload-list__right {
    flex-shrink: 0;
    margin-left: 20rpx;
    background-color: $u-type-error;
    border-radius: 100rpx;
    width: 44rpx;
    height: 44rpx;
    @include vue-flex;
    align-items: center;
    justify-content: center;
}

// 列表模式添加按钮
.u-upload-list__add {
    margin-top: 16rpx;
}

.u-upload-list__add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24rpx;
    background: var(--u-bg-white);
    border: 2rpx dashed var(--u-border-color);
    border-radius: 12rpx;
    transition: all 0.3s;
}

.u-upload-list__add-btn--hover {
    background: var(--u-bg-gray-light);
    border-color: var(--u-type-primary);
}

.u-upload-list__add-text {
    margin-left: 16rpx;
    font-size: 28rpx;
    color: var(--u-type-primary);
}
</style>
