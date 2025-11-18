<template>
    <view class="about-page">
        <view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @click="preview('weixin-person')">
            <view class="u-m-r-10">
                <u-avatar :src="getImageUrl('uview-pro')" size="140"></u-avatar>
            </view>
            <view class="u-flex-1">
                <view class="u-font-18 u-p-b-20">uView Pro</view>
                <view class="u-font-14 u-tips-color">微信号：anyupxing</view>
            </view>
            <view class="u-m-l-10 u-p-10">
                <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
            </view>
        </view>

        <view>
            <u-cell-group title="关于我">
                <u-cell-item
                    title="我是“前端梦工厂”，一名前端开发工程师，致力于分享各种前端技术最佳解决方案。关注我，让我们一起逐梦前端！"
                    :arrow="false"
                ></u-cell-item>
            </u-cell-group>
        </view>

        <view>
            <u-cell-group title="交流群">
                <u-cell-item
                    v-for="(item, index) in chatList"
                    :key="index"
                    :title="item.title"
                    :label="item.label"
                    @click="itemClick(item)"
                >
                    <template #icon>
                        <u-image
                            style="margin-right: 10rpx"
                            :src="getImageUrl(item.icon)"
                            :width="50"
                            :height="50"
                            mode="aspectFill"
                        ></u-image>
                    </template>
                </u-cell-item>
            </u-cell-group>
        </view>

        <view>
            <u-cell-group title="其他信息">
                <u-cell-item
                    v-for="(item, index) in infoList"
                    :key="index"
                    :title="item.title"
                    :label="item.label"
                    @click="itemClick(item)"
                >
                    <template #icon>
                        <u-image
                            style="margin-right: 10rpx"
                            :src="getImageUrl(item.icon)"
                            :width="50"
                            :height="50"
                            mode="aspectFill"
                        ></u-image>
                    </template>
                </u-cell-item>
            </u-cell-group>
        </view>
        <u-gap height="70"></u-gap>
        <u-toast ref="uToastRef" />
    </view>
</template>

<script setup lang="ts">
import { useTitle } from '@/common/util';
import { onShareAppMessage, onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const uToastRef = ref();
// 国际化
const { t, locale } = useI18n();
const { setTitle } = useTitle(3);
// 其他信息列表
const infoList = ref([
    {
        icon: 'uview-pro',
        title: '官网文档',
        label: 'https://uviewpro.cn',
        click: () => {
            copyLink('https://uviewpro.cn');
        }
    },
    {
        icon: 'weixin_public',
        title: '关注公众号',
        label: '致力于分享各种前端技术最佳解决方案',
        click: () => {
            preview('qr_weixin_public2');
        }
    },
    {
        icon: 'juejin',
        title: '关注掘金',
        label: '掘金优秀创作者',
        click: () => {
            copyLink('https://juejin.cn/user/4230576472589976/posts');
        }
    },
    {
        icon: 'csdn',
        title: '关注CSDN',
        label: 'CSDN博客专家',
        click: () => {
            copyLink('https://blog.csdn.net/qq_24956515?type=blog');
        }
    },
    {
        icon: 'donate',
        title: '捐赠',
        label: '每一份捐赠都是您对我的鼓励',
        click: () => {
            preview('wechat-pay');
        }
    }
]);

// 交流群列表
const chatList = ref([
    {
        icon: 'wxpublic',
        title: '微信交流群',
        label: '点击后长按二维码图片加入群聊，共同交流 uView Pro 相关问题',
        click: () => {
            // #ifdef APP-HARMONY
            preview('weixin-chat-cl');
            // #endif
            // #ifndef APP-HARMONY
            preview(`https://ik.imagekit.io/anyup/images/social/weixin-chat.png?updatedAt=${new Date().getTime()}`);
            // #endif
        }
    }
]);

// 获取图片地址
function getImageUrl(name: string, force: boolean = false) {
    let url = `https://ik.imagekit.io/anyup/images/social/${name}.png`;
    // #ifdef APP-HARMONY
    url = `/static/app/${name}.png`;
    // #endif
    // #ifdef APP-HARMONY
    if (force) {
        url = `${url}?updatedAt=${new Date().getTime()}`;
    }
    // #endif
    return url;
}

/**
 * 列表项点击事件
 */
function itemClick(item: any) {
    item.click && item.click();
}

/**
 * 图片预览
 */
function preview(url: string) {
    if (!url) return;
    if (!url.includes('http')) {
        url = getImageUrl(url, true);
    }
    uni.previewImage({
        urls: [url],
        current: url
    });
}

/**
 * 复制链接，兼容H5和小程序
 */
function copyLink(url: string) {
    // #ifdef H5
    window.open(url);
    // #endif
    // #ifndef H5
    uni.setClipboardData({
        data: url,
        success: () => {
            showToast('链接已复制，请打开浏览器粘贴访问');
        }
    });
    // #endif
}

// 显示Toast
function showToast(title: string) {
    // 通过ref调用uToast组件的show方法
    uToastRef.value?.show({
        title: title,
        type: 'success'
    });
}

/**
 * 分享
 */
onShareAppMessage(res => {
    return {
        title: 'uView Pro - 组件示例',
        path: '/pages/example/components'
    };
});

// 设置标题
onShow(() => {
    setTitle();
});
</script>

<style lang="scss" scoped>
.about-page {
    background-color: #ededed;
}

.user-box {
    background-color: #fff;
}
</style>
