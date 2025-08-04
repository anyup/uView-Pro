<template>
    <view>
        <!-- <u-navbar :is-back="false" title="　" :border-bottom="false">
            <view class="u-flex u-row-right" style="width: 100%">
                <view class="camera u-flex u-row-center">
                    <u-icon name="camera-fill" color="#000000" size="48"></u-icon>
                </view>
            </view>
        </u-navbar> -->
        <view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @click="preview('https://ik.imagekit.io/anyup/images/social/weixin-person.png')">
            <view class="u-m-r-10">
                <u-avatar :src="pic" size="140"></u-avatar>
            </view>
            <view class="u-flex-1">
                <view class="u-font-18 u-p-b-20">uView Pro</view>
                <view class="u-font-14 u-tips-color">微信号：anyupxing</view>
            </view>
            <view class="u-m-l-10 u-p-10">
                <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
            </view>
        </view>

        <view class="u-m-t-20">
            <u-cell-group title="关于我">
                <u-cell-item
                    title="我是前端梦工厂，一名前端开发工程师，致力于分享各种前端技术最佳解决方案，崇尚大道至简的前端知识体系。关注我，让我们一起逐梦前端！"
                    :arrow="false"
                ></u-cell-item>
            </u-cell-group>
        </view>

        <view class="u-m-t-20">
            <u-cell-group title="交流群">
                <u-cell-item v-for="(item, index) in chatList" :key="index" :title="item.title" :label="item.label" @click="itemClick(item)">
                    <template #icon>
                        <u-image style="margin-right: 10rpx" :src="item.icon" :width="50" :height="50" mode="aspectFill"></u-image>
                    </template>
                </u-cell-item>
            </u-cell-group>
        </view>

        <view class="u-m-t-20">
            <u-cell-group title="其他信息">
                <u-cell-item v-for="(item, index) in infoList" :key="index" :title="item.title" :label="item.label" @click="itemClick(item)">
                    <template #icon>
                        <u-image style="margin-right: 10rpx" :src="item.icon" :width="50" :height="50" mode="aspectFill"></u-image>
                    </template>
                </u-cell-item>
            </u-cell-group>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            pic: 'https://ik.imagekit.io/anyup/uview-pro/common/logo.png',
            show: true,
            infoList: [
                {
                    icon: 'https://ik.imagekit.io/anyup/uview-pro/common/logo.png',
                    title: '官网文档',
                    label: 'https://uview-pro.anyup.cn/docs/',
                    click: () => {
                        this.copyLink('https://uview-pro.anyup.cn/docs/');
                    }
                },
                {
                    icon: 'https://ik.imagekit.io/anyup/images/social/wxpublic.png',
                    title: '关注公众号',
                    label: '致力于分享各种前端技术最佳解决方案',
                    click: () => {
                        this.preview('https://ik.imagekit.io/anyup/images/social/qr_wx_public.jpg');
                    }
                },
                {
                    icon: 'https://ik.imagekit.io/anyup/images/social/juejin.png',
                    title: '关注掘金',
                    label: '掘金优秀创作者',
                    click: () => {
                        this.copyLink('https://juejin.cn/user/4230576472589976/posts');
                    }
                },
                {
                    icon: 'https://ik.imagekit.io/anyup/images/social/csdn.png',
                    title: '关注CSDN',
                    label: 'CSDN博客专家',
                    click: () => {
                        this.copyLink('https://blog.csdn.net/qq_24956515?type=blog');
                    }
                },
                {
                    icon: 'https://ik.imagekit.io/anyup/images/social/donate.png',
                    title: '捐赠',
                    label: '每一份捐赠都是您对我的鼓励',
                    click: () => {
                        this.preview('https://ik.imagekit.io/anyup/images/social/weixin-pay.png');
                    }
                }
            ],
            chatList: [
                {
                    icon: 'https://ik.imagekit.io/anyup/images/social/wxpublic.png',
                    title: '微信交流群',
                    label: '点击后长按二维码图片加入群聊，共同交流 uView 相关问题',
                    click: () => {
                        this.preview('https://ik.imagekit.io/anyup/images/social/weixin-chat.png');
                    }
                }
            ]
        };
    },
    onLoad() {},
    methods: {
        itemClick(item) {
            item.click && item.click();
        },
        preview(url) {
            uni.previewImage({
                urls: [url],
                current: 0
            });
        },
        copyLink(data) {
            // #ifdef H5
            if (typeof navigator !== 'undefined' && navigator.clipboard) {
                navigator.clipboard
                    .writeText(data)
                    .then(() => {
                        uni.showToast({
                            title: '链接已复制，请到浏览器中打开',
                            icon: 'none'
                        });
                    })
                    .catch(() => {
                        uni.showToast({
                            title: '复制失败',
                            icon: 'none'
                        });
                    });
                return;
            }
            // #endif
            // #ifndef H5
            uni.setClipboardData({
                data,
                success: () => {
                    uni.showToast({
                        title: '链接已复制，请到浏览器中打开',
                        icon: 'none'
                    });
                }
            });
            // #endif
        }
    }
};
</script>

<style lang="scss">
page {
    background-color: #ededed;
}

.camera {
    width: 54px;
    height: 44px;

    &:active {
        background-color: #ededed;
    }
}
.user-box {
    background-color: #fff;
}
</style>
