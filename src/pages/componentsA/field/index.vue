<template>
    <demo-page
        title="Field 输入框"
        desc="用于表单、登录、注册等场景的多样化输入，支持多种类型、校验和自定义内容。"
        :apis="'field'"
    >
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <u-field
                            v-model="mobile"
                            label="手机号"
                            :error-message="errorMessage"
                            placeholder="请填写手机号"
                            :required="required"
                            :icon="icon1"
                            :type="type"
                        />
                        <u-field
                            v-model="code"
                            label="验证码"
                            placeholder="请填写验证码"
                            :required="required"
                            :icon="icon2"
                        >
                            <template #right>
                                <u-button v-if="showBtn" size="mini" type="success">发送验证码</u-button>
                            </template>
                        </u-field>
                    </view>
                </view>
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom"> 参数配置 </view>
                    <view class="u-config-item">
                        <view class="u-item-title">右侧按钮</view>
                        <u-subsection current="1" :list="['是', '否']" @change="showBtnChange" />
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">显示错误信息</view>
                        <u-subsection current="1" :list="['是', '否']" @change="errorMessageChange" />
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">是否必填</view>
                        <u-subsection current="1" :list="['是', '否']" @change="requiredChange" />
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">显示左图标和右箭头</view>
                        <u-subsection current="1" :list="['是', '否']" @change="customChange" />
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">第一个输入框为textarea类型</view>
                        <u-subsection current="1" :list="['是', '否']" @change="textareaChange" />
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { InputType } from '@/uni_modules/uview-pro/types/global';

const mobile = ref('');
const code = ref('');
const errorMessage = ref('');
const required = ref(false);
const arrow = ref(false);
const showBtn = ref(false);
const icon1 = ref('');
const icon2 = ref('');
const type = ref<InputType>('text');

function showBtnChange(index: number) {
    showBtn.value = index === 0;
}

function errorMessageChange(index: number) {
    errorMessage.value = index === 0 ? '手机号有误' : '';
}

function requiredChange(index: number) {
    required.value = index === 0;
}

function customChange(index: number) {
    if (index === 0) {
        icon1.value = 'map';
        icon2.value = 'photo';
        arrow.value = true;
    } else {
        icon1.value = '';
        icon2.value = '';
        arrow.value = false;
    }
}

function textareaChange(index: number) {
    type.value = index === 0 ? 'textarea' : 'text';
}
</script>
