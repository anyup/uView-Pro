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
                            :disabled="disabled"
                            :readonly="readonly"
                            @click="handleClick"
                        />
                        <u-field
                            v-model="code"
                            label="验证码"
                            placeholder="请填写验证码"
                            :required="required"
                            :icon="icon2"
                            :disabled="disabled"
                            :readonly="readonly"
                            @click="handleClick"
                        >
                            <template #right>
                                <u-button v-if="showBtn" size="mini" type="success">发送验证码</u-button>
                            </template>
                        </u-field>
                    </view>
                </view>
                <view class="u-demo-wrap">
                    <view class="u-demo-title">禁用与只读对比</view>
                    <view class="u-demo-area">
                        <u-field
                            v-model="disabledValue"
                            label="禁用状态"
                            placeholder="禁用状态下无法输入和点击"
                            disabled
                        />
                        <u-gap />
                        <u-field
                            v-model="readonlyValue"
                            label="只读状态"
                            placeholder="只读状态下可点击但无法输入"
                            readonly
                            @click="onReadonlyClick"
                        />
                    </view>
                </view>
                <view class="u-demo-wrap">
                    <view class="u-demo-title">多行文本域</view>
                    <view class="u-demo-area">
                        <u-field
                            v-model="textareaValue"
                            label="备注"
                            placeholder="请输入备注信息"
                            type="textarea"
                            :auto-height="true"
                        />
                    </view>
                </view>
                <view class="u-demo-wrap">
                    <view class="u-demo-title">Label位置</view>
                    <view class="u-demo-area">
                        <u-field
                            v-model="topLabelValue"
                            label="顶部Label"
                            placeholder="labelPosition为top"
                            label-position="top"
                        />
                        <u-gap />
                        <u-field
                            v-model="leftLabelValue"
                            label="左侧Label"
                            placeholder="labelPosition为left（默认）"
                            label-position="left"
                        />
                    </view>
                </view>
                <view class="u-demo-wrap">
                    <view class="u-demo-title">密码输入</view>
                    <view class="u-demo-area">
                        <u-field
                            v-model="passwordValue"
                            label="密码"
                            placeholder="请输入密码"
                            type="password"
                            :password="true"
                        />
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
                        <view class="u-item-title">是否禁用</view>
                        <u-subsection current="1" :list="['是', '否']" @change="disabledChange" />
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">是否只读</view>
                        <u-subsection current="1" :list="['是', '否']" @change="readonlyChange" />
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
const disabled = ref(false);
const readonly = ref(false);

// 禁用与只读示例
const disabledValue = ref('禁用状态的值');
const readonlyValue = ref('只读状态的值');

// 多行文本域示例
const textareaValue = ref('');

// Label位置示例
const topLabelValue = ref('');
const leftLabelValue = ref('');

// 密码输入示例
const passwordValue = ref('');

function handleClick() {
    console.log('点击了输入框');
}

function onReadonlyClick() {
    uni.showToast({
        title: '点击了只读输入框',
        icon: 'none'
    });
}

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

function disabledChange(index: number) {
    disabled.value = index === 0;
}

function readonlyChange(index: number) {
    readonly.value = index === 0;
}

function textareaChange(index: number) {
    type.value = index === 0 ? 'textarea' : 'text';
}
</script>
