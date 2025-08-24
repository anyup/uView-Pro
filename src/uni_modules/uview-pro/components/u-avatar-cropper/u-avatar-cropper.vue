<template>
    <view class="content">
        <view class="cropper-wrapper" :style="{ height: cropperOpt.height + 'px' }">
            <canvas
                class="cropper"
                :disable-scroll="true"
                @touchstart="touchStart"
                @touchmove="touchMove"
                @touchend="touchEnd"
                :style="{ width: cropperOpt.width, height: cropperOpt.height, backgroundColor: 'rgba(0, 0, 0, 0.8)' }"
                canvas-id="cropper"
                id="cropper"
            ></canvas>
            <canvas
                class="cropper"
                :disable-scroll="true"
                :style="{
                    position: 'fixed',
                    top: `-${cropperOpt.width * cropperOpt.pixelRatio}px`,
                    left: `-${cropperOpt.height * cropperOpt.pixelRatio}px`,
                    width: `${cropperOpt.width * cropperOpt.pixelRatio}px`,
                    height: `${cropperOpt.height * cropperOpt.pixelRatio}`
                }"
                canvas-id="targetId"
                id="targetId"
            ></canvas>
        </view>
        <view class="cropper-buttons safe-area-padding" :style="{ height: bottomNavHeight + 'px' }">
            <!-- #ifdef H5 -->
            <view class="upload" @tap="uploadTap">选择图片</view>
            <!-- #endif -->
            <!-- #ifndef H5 -->
            <view class="upload" @tap="uploadTap">重新选择</view>
            <!-- #endif -->
            <view class="getCropperImage" @tap="() => getCropperImage(false)">确定</view>
        </view>
    </view>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, reactive, onMounted } from 'vue';
import { $u } from '../..';
// 兼容 UMD/ESM 导入 weCropper.js
import WeCropper from './weCropper';
import { AvatarCropperProps } from './types';

defineOptions({ name: 'u-avatar-cropper' });

/**
 * 裁剪矩形框的样式，其中可包含的属性为lineWidth-边框宽度(单位rpx)，color: 边框颜色，
 * mask-遮罩颜色，一般设置为一个rgba的透明度，如"rgba(0, 0, 0, 0.35)"
 */
const props = defineProps(AvatarCropperProps);

/**
 * 组合式API变量声明
 * 保留所有说明注释
 */
const bottomNavHeight = ref(50); // 底部导航的高度
const originWidth = ref(200);
const width = ref(0);
const height = ref(0);
const src = ref(''); // 选择的图片路径，用于在点击确定时，判断是否选择了图片
const destWidth = ref(200); // 输出图片宽度，单位px
const rectWidth = ref(200); // 裁剪框宽度，单位px
const fileType = ref('jpg'); // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可

// cropperOpt 需响应式，且类型安全
const cropperOpt = reactive({
    id: 'cropper',
    targetId: 'targetCropper',
    pixelRatio: 1,
    width: 0,
    height: 0,
    scale: 2.5,
    zoom: 8,
    cut: {
        x: 0,
        y: 0,
        width: originWidth.value,
        height: originWidth.value
    },
    boundStyle: {
        lineWidth: 0,
        mask: '',
        color: ''
    }
});

let cropper: any = null; // WeCropper 实例，类型 any，建议后续补充类型声明

/**
 * 组件挂载时初始化 cropper
 * 保留所有说明注释
 */
onMounted(() => {
    // 获取系统信息
    const rectInfo = uni.getSystemInfoSync();
    width.value = rectInfo.windowWidth;
    height.value = rectInfo.windowHeight - bottomNavHeight.value;
    cropperOpt.width = width.value;
    cropperOpt.height = height.value;
    cropperOpt.pixelRatio = rectInfo.pixelRatio;

    // 初始化裁剪框
    cropperOpt.cut = {
        x: (width.value - originWidth.value) / 2,
        y: (height.value - originWidth.value) / 2,
        width: originWidth.value,
        height: originWidth.value
    };
    cropperOpt.boundStyle = {
        lineWidth: uni.upx2px(props.boundStyle.lineWidth),
        mask: props.boundStyle.mask,
        color: props.boundStyle.borderColor
    };

    // 设置导航栏样式，以免用户在page.json中没有设置为黑色背景
    uni.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#000000'
    });

    // 初始化 cropper 实例
    cropper = new WeCropper(cropperOpt)
        .on('ready', (ctx: any) => {
            // wecropper is ready for work!
        })
        .on('beforeImageLoad', (ctx: any) => {
            // before picture loaded, i can do something
        })
        .on('imageLoad', (ctx: any) => {
            // picture loaded
        })
        .on('beforeDraw', (ctx: any, instance: any) => {
            // before canvas draw,i can do something
        });

    // 选择图片
    uni.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res: UniApp.ChooseImageSuccessCallbackResult) => {
            src.value = res.tempFilePaths[0];
            //  获取裁剪图片资源后，给data添加src属性及其值
            cropper.pushOrign(src.value);
        }
    });
});

/**
 * 触摸开始事件
 * @param e 事件对象
 */
function touchStart(e: any) {
    cropper && cropper.touchStart(e);
}

/**
 * 触摸移动事件
 * @param e 事件对象
 */
function touchMove(e: any) {
    cropper && cropper.touchMove(e);
}

/**
 * 触摸结束事件
 * @param e 事件对象
 */
function touchEnd(e: any) {
    cropper && cropper.touchEnd(e);
}

/**
 * 获取裁剪后的图片
 * @param isPre 是否预览
 */
function getCropperImage(isPre = false) {
    if (!src.value) return $u.toast('请先选择图片再裁剪');

    const cropper_opt = {
        destHeight: Number(destWidth.value), // uni.canvasToTempFilePath要求这些参数为数值
        destWidth: Number(destWidth.value),
        fileType: fileType.value
    };
    cropper.getCropperImage(cropper_opt, (path: string, err: any) => {
        if (err) {
            uni.showModal({
                title: '温馨提示',
                content: err.message
            });
        } else {
            if (isPre) {
                uni.previewImage({
                    current: '', // 当前显示图片的 http 链接
                    urls: [path] // 需要预览的图片 http 链接列表
                });
            } else {
                uni.$emit('uAvatarCropper', path);
                $u.route({
                    type: 'back'
                });
            }
        }
    });
}

/**
 * 重新选择图片
 */
function uploadTap() {
    uni.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res: UniApp.ChooseImageSuccessCallbackResult) => {
            src.value = res.tempFilePaths[0];
            //  获取裁剪图片资源后，给data添加src属性及其值
            cropper.pushOrign(src.value);
        }
    });
}
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.content {
    background: rgba(255, 255, 255, 1);
}

.cropper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
}

.cropper-buttons {
    background-color: #000000;
    color: #eee;
}

.cropper-wrapper {
    position: relative;
    @include vue-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #000;
}

.cropper-buttons {
    width: 100vw;
    @include vue-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 28rpx;
}

.cropper-buttons .upload,
.cropper-buttons .getCropperImage {
    width: 50%;
    text-align: center;
}

.cropper-buttons .upload {
    text-align: left;
    padding-left: 50rpx;
}

.cropper-buttons .getCropperImage {
    text-align: right;
    padding-right: 50rpx;
}
</style>
