import type { ExtractPropTypes, PropType } from 'vue';
import type { ImgMode, UploadSizeType, UploadSourceType } from '../../types/global';

/**
 * UploadProps upload props 类型定义
 * @description 文件上传组件，支持多种自定义参数
 */
export const UploadProps = {
    /** 选择器宽度，单位rpx */
    width: { type: [Number, String] as PropType<number | string>, default: 200 },
    /** 选择器高度，单位rpx */
    height: { type: [Number, String] as PropType<number | string>, default: 200 },
    /** 最大上传数量 */
    maxCount: { type: [Number, String] as PropType<number | string>, default: 52 },
    /** 是否可删除 */
    deletable: { type: Boolean, default: true },
    /** 是否显示上传列表 */
    showUploadList: { type: Boolean, default: true },
    /** 是否显示上传进度 */
    showProgress: { type: Boolean, default: true },
    /** 删除按钮背景色 */
    delBgColor: { type: String, default: '#f56c6c' },
    /** 删除按钮图标 */
    delIcon: { type: String, default: 'close' },
    /** 删除按钮颜色 */
    delColor: { type: String, default: '#fff' },
    /** 图片裁剪模式 */
    imageMode: { type: String as PropType<ImgMode>, default: 'aspectFill' },
    /** 是否自定义上传按钮 */
    customBtn: { type: Boolean, default: false },
    /** 上传按钮文字 */
    uploadText: { type: String, default: '选择图片' },
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
    /** 是否支持多选 */
    multiple: { type: Boolean, default: true },
    /** 单个文件最大大小，单位B */
    maxSize: { type: [Number, String] as PropType<number | string>, default: Number.MAX_VALUE },
    /** 文件列表 */
    fileList: { type: Array as PropType<any[]>, default: () => [] },
    /** 限制文件类型 */
    /** 允许上传的图片后缀 */
    /** 支付宝小程序真机选择图片的后缀为"image" */
    /** https://opendocs.alipay.com/mini/api/media-image */
    limitType: { type: Array as PropType<string[]>, default: () => ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'] },
    /** 是否自动上传 */
    autoUpload: { type: Boolean, default: true },
    /** 是否显示提示 */
    showTips: { type: Boolean, default: true },
    /** 上传前钩子，返回true或Promise */
    beforeUpload: { type: Function as PropType<((index: number, files: any[]) => boolean | Promise<any>) | null>, default: null },
    /** 删除前钩子，返回true或Promise */
    beforeRemove: { type: Function as PropType<((index: number, files: any[]) => boolean | Promise<any>) | null>, default: null },
    /** 如果上传后的返回值为json字符串，是否转为json格式 */
    toJson: { type: Boolean, default: true }
};

export type UploadProps = ExtractPropTypes<typeof UploadProps>;
