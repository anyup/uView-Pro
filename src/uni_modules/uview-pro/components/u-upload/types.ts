import type { ExtractPropTypes, PropType } from 'vue';
import type { ImgMode, UploadSizeType, UploadSourceType, UploadAcceptType, UploadFileItem } from '../../types/global';

/**
 * UploadProps upload props 类型定义
 * @description 文件上传组件，支持多种自定义参数
 */
export const UploadProps = {
    /** 自定义根节点样式 */
    customStyle: {
        type: [String, Object] as PropType<string | Record<string, any>>,
        default: () => ({})
    },
    /** 自定义根节点样式类 */
    customClass: {
        type: String as unknown as PropType<string>,
        default: ''
    },
    /** 选择器宽度，单位rpx */
    width: { type: [Number, String] as PropType<number | string>, default: 200 },
    /** 选择器高度，单位rpx */
    height: { type: [Number, String] as PropType<number | string>, default: 200 },
    /** 最大上传数量 */
    maxCount: { type: [Number, String] as PropType<number | string>, default: 52 },
    /** 是否可删除 */
    deletable: { type: Boolean, default: true },
    /**
     * 上传组件的展示模式
     * @description grid-网格模式(默认), list-列表模式
     * @default 'grid'
     */
    mode: { type: String as PropType<'grid' | 'list'>, default: 'grid' },
    /** 是否显示上传列表 */
    showUploadList: { type: Boolean, default: true },
    /** 是否显示上传进度 */
    showProgress: { type: Boolean, default: true },
    /** 删除按钮背景色 */
    delBgColor: { type: String, default: 'var(--u-type-error)' },
    /** 删除按钮图标 */
    delIcon: { type: String, default: 'close' },
    /** 删除按钮颜色 */
    delColor: { type: String, default: 'var(--u-white-color)' },
    /** 图片裁剪模式 */
    imageMode: { type: String as PropType<ImgMode>, default: 'aspectFill' },
    /** 是否自定义上传按钮 */
    customBtn: { type: Boolean, default: false },
    /** 上传按钮文字 */
    uploadText: { type: String, default: '' },
    /** 上传地址 */
    action: { type: String, default: '' },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 索引值，在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件 */
    index: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 请求头对象 */
    header: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** formData对象 */
    formData: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 文件字段名 */
    name: { type: String, default: 'file' },
    /** 压缩/原图，微信小程序有效 */
    sizeType: { type: Array as PropType<UploadSizeType[]>, default: () => ['original', 'compressed'] },
    /** 来源，相册/相机 */
    sourceType: { type: Array as PropType<UploadSourceType[]>, default: () => ['album', 'camera'] },
    /** 是否可预览大图 */
    previewFullImage: { type: Boolean, default: true },
    /** 是否可预览文件 */
    previewFile: { type: Boolean, default: true },
    /** 是否支持多选 */
    multiple: { type: Boolean, default: true },
    /** 单个文件最大大小，单位B(byte)，默认不限制 */
    maxSize: { type: [Number, String] as PropType<number | string>, default: Number.MAX_VALUE },
    /**
     * 文件列表（v-model 双向绑定）
     * @description 推荐使用 v-model 替代 :file-list
     */
    modelValue: { type: Array as PropType<UploadFileItem[]>, default: () => [] },
    /**
     * 文件列表（初始值，向后兼容）
     * @deprecated 请使用 v-model
     */
    fileList: { type: Array as PropType<UploadFileItem[]>, default: () => [] },
    /** 限制文件类型 */
    /** 允许上传的文件后缀 */
    /** 支付宝小程序真机选择图片的后缀为"image" */
    /** https://opendocs.alipay.com/mini/api/media-image */
    limitType: { type: Array as PropType<string[]>, default: () => [] },
    /** 是否自动上传 */
    autoUpload: { type: Boolean, default: true },
    /** 是否显示提示 */
    showTips: { type: Boolean, default: true },
    /** 是否显示确认弹窗 */
    showConfirm: { type: Boolean, default: true },
    /** 上传前钩子，返回true或Promise */
    beforeUpload: {
        type: Function as unknown as PropType<
            ((index: number, files: UploadFileItem[]) => boolean | Promise<any>) | null
        >,
        default: null
    },
    /** 删除前钩子，返回true或Promise */
    beforeRemove: {
        type: Function as unknown as PropType<
            ((index: number, files: UploadFileItem[]) => boolean | Promise<any>) | null
        >,
        default: null
    },
    /** 如果上传后的返回值为json字符串，是否转为json格式 */
    toJson: { type: Boolean, default: true },
    /**
     * 接受上传的文件类型
     * @description image-图片(默认), video-视频, file-文件, media-媒体(图片+视频), all-所有文件
     * @default 'image'
     */
    accept: { type: String as PropType<UploadAcceptType>, default: 'image' },
    /**
     * 是否显示文件名
     * @default true
     */
    showFileName: { type: Boolean, default: true },
    /**
     * 是否显示文件大小
     * @default false
     */
    showFileSize: { type: Boolean, default: false },
    /**
     * 文件类型图标映射配置
     * @description 用于自定义不同文件类型的图标
     */
    fileIconMap: {
        type: Object as PropType<Record<string, { name: string; color?: string }>>,
        default: () => ({})
    },
    /**
     * 选择视频时是否压缩
     * @default true
     */
    compressed: { type: Boolean, default: true },
    /**
     * 选择视频时拍摄最长时长，单位秒
     * @default 60
     */
    maxDuration: { type: Number, default: 60 },
    /**
     * 选择视频时，是前置还是后置摄像头
     * @default 'back'
     */
    camera: { type: String as PropType<'front' | 'back'>, default: 'back' },
    /**
     * 选择文件时的扩展名过滤
     * @description 仅在 accept='file' 或 accept='all' 时有效
     */
    extension: { type: Array as PropType<string[]>, default: () => [] },
    /**
     * 图片/图标展示形状
     * @description 可选值：square-方形(默认), circle-圆形。在 grid 模式下作用于图片和添加按钮，在 list 模式下作用于图标
     * @default 'square'
     */
    imageShape: { type: String as PropType<'square' | 'circle'>, default: 'square' },
    /**
     * 是否使用自定义选择文件
     * @description 设置为 true 时，点击选择文件会触发 on-choose 事件，不会调用默认的文件选择 API，用户可自行处理文件选择逻辑，然后通过 addFiles 方法将文件添加到列表
     * @default false
     */
    customChoose: { type: Boolean, default: false }
};

export type UploadProps = ExtractPropTypes<typeof UploadProps>;

// 重新导出全局类型，方便从组件入口导入
export type { UploadAcceptType, UploadFileItem } from '../../types/global';
