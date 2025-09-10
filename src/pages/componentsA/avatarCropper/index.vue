<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToast"></u-toast>
                <view class="u-avatar-wrap">
                    <image @tap="preAvatar" class="u-avatar-demo" v-if="avatar" :src="avatar" mode="aspectFill"></image>
                </view>
                <u-button @click="chooseAvatar">选择图片</u-button>
            </view>
        </view>
        <!-- <view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				参数配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">生成图片质量</view>
				<u-subsection :current="1" :list="['0.3', '0.7', '1']" @change="qualityChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">自定义参数</view>
				<u-subsection :current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
			</view>
		</view> -->
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

const avatar = ref('https://ik.imagekit.io/anyup/uview-pro/common/logo.png');

const chooseAvatar = () => {
    $u.route({
        url: '/uni_modules/uview-pro/components/u-avatar-cropper/u-avatar-cropper',
        params: {
            // 输出图片宽度，高等于宽，单位px
            destWidth: 300,
            // 裁剪框宽度，高等于宽，单位px
            rectWidth: 200,
            // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
            fileType: 'jpg'
        }
    });
};

function preAvatar(path) {
    // @ts-ignore
    wx.previewImage({
        current: '', // 当前显示图片的 http 链接
        urls: [path] // 需要预览的图片 http 链接列表
    });
}

uni.$on('uAvatarCropper', path => {
    avatar.value = path;
    // 可以在此上传到服务端
    // uni.uploadFile({
    // 	url: 'http://192.168.100.17/index.php/index/index/upload',
    // 	filePath: path,
    // 	name: 'file',
    // 	complete: (res) => {
    // 		console.log(res);
    // 	}
    // });
});
</script>

<style lang="scss" scoped>
.wrap {
    padding: 24rpx;
}

.u-avatar-wrap {
    overflow: hidden;
    margin-bottom: 20rpx;
}

.u-avatar-demo {
    width: 150rpx;
    height: 150rpx;
    border-radius: 100rpx;
}
</style>
