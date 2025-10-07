<template>
    <view class="u-page">
        <view class="u-demo-block">
            <text class="u-demo-block__title">基础功能</text>
            <view class="u-demo-block__content">
                <view class="u-page__text-item">
                    <u-text text="我用十年青春,赴你最后之约"></u-text>
                </view>
            </view>
        </view>
        <view class="u-demo-block">
            <text class="u-demo-block__title">设置主题</text>
            <view class="u-demo-block__content">
                <view class="u-page__text-item">
                    <u-text text="主色" type="primary"></u-text>
                </view>
                <view class="u-page__text-item">
                    <u-text type="error" text="错误"></u-text>
                </view>
                <view class="u-page__text-item">
                    <u-text type="success" text="成功"></u-text>
                </view>
                <view class="u-page__text-item">
                    <u-text type="warning" text="警告"></u-text>
                </view>
                <view class="u-page__text-item">
                    <u-text type="info" text="信息"></u-text>
                </view>
            </view>
        </view>
        <view class="u-demo-block">
            <text class="u-demo-block__title">拨打电话</text>
            <view class="u-demo-block__content">
                <view class="u-page__text-item">
                    <u-text mode="phone" text="15019479320"></u-text>
                </view>
            </view>
        </view>
        <view class="u-demo-block">
            <text class="u-demo-block__title">日期格式化</text>
            <view class="u-demo-block__content">
                <view class="u-page__text-item">
                    <u-text mode="date" text="1612959739"></u-text>
                </view>
            </view>
        </view>
        <view class="u-demo-block">
            <text class="u-demo-block__title">姓名脱敏</text>
            <view class="u-demo-block__content">
                <view class="u-page__text-item">
                    <u-text mode="name" text="张三三" format="encrypt"></u-text>
                </view>
            </view>
        </view>
        <view class="u-demo-block">
            <text class="u-demo-block__title">超链接</text>
            <view class="u-demo-block__content">
                <view class="u-page__text-item">
                    <u-text mode="link" text="Go to uView Pro docs" href="https://uviewpro.cn"></u-text>
                </view>
            </view>
        </view>
        <view class="u-demo-block">
            <text class="u-demo-block__title">显示金额</text>
            <view class="u-demo-block__content">
                <view class="u-page__text-item">
                    <u-text mode="price" text="728732.32"></u-text>
                </view>
            </view>
        </view>
        <view class="u-demo-block">
            <text class="u-demo-block__title">前后图标</text>
            <view class="u-demo-block__content">
                <view class="u-page__text-item" style="margin-right: 50px">
                    <u-text prefixIcon="baidu" iconStyle="font-size: 19px" text="百度一下"></u-text>
                </view>
                <view class="u-page__text-item">
                    <u-text
                        suffixIcon="arrow-rightward"
                        iconStyle="font-size: 18px"
                        text="查看更多"
                        align="right"
                        block
                    ></u-text>
                </view>
            </view>
        </view>
        <view class="u-demo-block">
            <text class="u-demo-block__title">超出隐藏</text>
            <view class="u-demo-block__content">
                <u-text
                    :lines="2"
                    text="uView Pro 是在 uView 1.8.8 官方组件库基础上，采用 Vue3 全新语法彻底重构的 uni-app 生态框架。不同于市面上的其他 uView 框架等兼容 Vue3 的方案，uView Pro 并非简单兼容，而是对每一个组件和工具进行源码级重构，充分发挥 Vue3 的响应式和组合式优势，API 设计更现代，性能更优越。"
                ></u-text>
            </view>
        </view>
        <view class="u-demo-block">
            <text class="u-demo-block__title">小程序开放能力</text>
            <view class="u-demo-block__content">
                <u-text text="分享到微信" openType="share" type="success" align="left" @click="clickHandler"></u-text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    onLoad() {},
    methods: {
        clickHandler() {
            // #ifndef MP-WEIXIN
            uni.$u.toast('请在微信小程序内查看效果');
            // #endif
        }
    }
};
</script>

<style lang="scss">
.u-page__text-item {
    margin-right: 10px;
    flex: 1;
}

.u-demo-block__content {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}
</style>
