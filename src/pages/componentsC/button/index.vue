<template>
    <demo-page
        title="Button 按钮"
        desc="该组件内部实现以uni-app`button`组件为基础，进行二次封装，有更多的主题颜色，有可选的按钮点击水波纹效果"
        :apis="'button'"
    >
        <view class="u-demo">
            <view class="u-demo-wrap">
                <view class="u-demo-title">演示效果</view>
                <view class="u-demo-area">
                    <u-button
                        @click="btnClick"
                        data-name="3333"
                        :loading="loading"
                        :plain="plain"
                        :shape="shape"
                        :size="size"
                        :ripple="ripple"
                        :hairLine="hairLine"
                        :type="type"
                        :disabled="disabled"
                        :custom-style="buttonCustomStyle"
                    >
                        山川异域，风月同天
                    </u-button>
                </view>
            </view>
            <view class="u-config-wrap">
                <view class="u-config-title u-border-bottom"> 参数配置 </view>
                <view class="u-config-item">
                    <view class="u-item-title">主题选择</view>
                    <u-subsection
                        :list="['default', 'primary', 'error', 'warning', 'success']"
                        @change="typeChange"
                    ></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">尺寸大小</view>
                    <u-subsection :list="['默认', '中等', '迷你']" @change="sizeChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">形状</view>
                    <u-subsection :list="['直角', '圆角']" @change="shapeChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">镂空</view>
                    <u-subsection :current="1" :list="['是', '否']" @change="plainChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">水波纹(感觉哪里有问题？点击顶部的按钮试试)</view>
                    <u-subsection :current="1" :list="['是', '否']" @change="rippleChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">细边框</view>
                    <u-subsection :list="['是', '否']" @change="hairLineChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">加载中</view>
                    <u-subsection :current="1" :list="['是', '否']" @change="loadingChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">禁用</view>
                    <u-subsection current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">自定义样式</view>
                    <u-subsection current="1" :list="['是', '否']" @change="customStyleChange"></u-subsection>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script lang="ts" setup>
import type { ButtonSize, ButtonType, Shape } from '@/uni_modules/uview-pro/types/global';
import { computed, ref } from 'vue';

// 主题选择
const type = ref<ButtonType>('default');
// 尺寸大小
const size = ref<ButtonSize>('default');
// 形状
const shape = ref<Shape>('square');
// 镂空
const plain = ref<boolean>(false);
// 水波纹
const ripple = ref<boolean>(false);
// 细边框
const hairLine = ref<boolean>(true);
// 加载中
const loading = ref<boolean>(false);
// 禁用
const disabled = ref<boolean>(false);
// 自定义样式
const customStyle = ref<boolean>(false);
// 主题选择切换
const typeChange = (e: number) => {
    switch (e) {
        case 0:
            type.value = 'default';
            break;
        case 1:
            type.value = 'primary';
            break;
        case 2:
            type.value = 'error';
            break;
        case 3:
            type.value = 'warning';
            break;
        case 4:
            type.value = 'success';
            break;
    }
};

// 自定义样式
const buttonCustomStyle = computed(() => {
    if (!customStyle.value) {
        return {};
    }
    return disabled.value
        ? {
              backgroundColor: '#999 !important',
              color: '#f1f1f1 !important'
          }
        : {
              backgroundColor: '#000',
              color: '#fff'
          };
});

// 尺寸大小切换
const sizeChange = (e: number) => {
    switch (e) {
        case 0:
            size.value = 'default';
            break;
        case 1:
            size.value = 'medium';
            break;
        case 2:
            size.value = 'mini';
            break;
    }
};

// 形状切换
const shapeChange = (e: number) => {
    shape.value = e === 0 ? 'square' : 'circle';
};

// 镂空切换
const plainChange = (e: number) => {
    plain.value = e === 0;
};

// 水波纹切换
const rippleChange = (e: number) => {
    ripple.value = e === 0;
};

// 细边框切换
const hairLineChange = (e: number) => {
    hairLine.value = e === 0;
};

// 加载中切换
const loadingChange = (index: number) => {
    loading.value = index === 0;
};

// 禁用切换
const disabledChange = (e: number) => {
    disabled.value = e === 0;
};

// 自定义样式切换
const customStyleChange = (e: number) => {
    customStyle.value = e === 0;
};

// 按钮点击事件
const btnClick = () => {
    uni.showToast({
        title: '按钮被点击',
        icon: 'none'
    });
};
</script>

<style lang="scss" scoped>
.box {
    padding: 30rpx;
}

.box :deep(button) {
    margin-bottom: 40rpx;
}
</style>
