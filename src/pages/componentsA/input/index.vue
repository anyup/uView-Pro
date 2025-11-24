<template>
    <demo-page
        title="Input 输入框"
        desc="此组件为一个输入框，默认没有边框和样式，是专门为配合表单组件u-form而设计的，利用它可以快速实现表单验证，输入内容，下拉选择等功能。"
        :apis="apis"
    >
        <view class="u-demo">
            <view class="u-demo-wrap" style="background-color: #fff">
                <view class="u-demo-title">演示效果</view>
                <view class="u-demo-area">
                    <u-input
                        :custom-style="customStyle"
                        v-model="username"
                        label="用户名"
                        placeholder="请填写用户名"
                        :type="type"
                        :input-align="inputAlign"
                        :maxlength="maxlength"
                        :clearable="clearable"
                        :border="border"
                        :border-color="borderColor"
                        :focus="focus"
                    />
                    <u-gap></u-gap>
                    <u-input
                        :custom-style="customStyle"
                        v-model="password"
                        label="密码"
                        placeholder="请填写密码"
                        :type="type2"
                        :input-align="inputAlign"
                        :maxlength="maxlength"
                        :clearable="clearable"
                        :border="border"
                        :border-color="borderColor"
                    >
                    </u-input>
                </view>
            </view>
            <view class="u-config-wrap">
                <view class="u-config-title u-border-bottom">参数配置</view>
                <view class="u-config-item">
                    <view class="u-item-title">第一个输入框为textarea类型</view>
                    <u-subsection current="1" :list="['是', '否']" @change="textareaChange" />
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">输入框对齐方式</view>
                    <u-subsection current="0" :list="['左', '居中', '右']" @change="inputAlignChange" />
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">最大长度</view>
                    <u-subsection current="0" :list="['140', '20', '10']" @change="maxlengthChange" />
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">可清空</view>
                    <u-subsection current="0" :list="['是', '否']" @change="clearableChange" />
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">显示边框</view>
                    <u-subsection current="0" :list="['是', '否']" @change="borderChange" />
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">边框颜色</view>
                    <u-subsection current="0" :list="['#dcdfe6', '#ff0000', '#00ff00']" @change="borderColorChange" />
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">自动聚焦</view>
                    <u-subsection current="1" :list="['是', '否']" @change="focusChange" />
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">密码图标</view>
                    <u-subsection current="0" :list="['是', '否']" @change="passwordIconChange" />
                </view>
                <view class="u-config-item">
                    <view class="u-item-title">自定义样式</view>
                    <u-subsection current="1" :list="['有', '无']" @change="customStyleChange" />
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { InputType, InputAlign } from '@/uni_modules/uview-pro/types/global';
import { apis } from './config';

const username = ref('');
const password = ref('');
const type = ref<InputType>('text');
const type2 = ref<InputType>('password');
const inputAlign = ref<InputAlign>('left');
const maxlength = ref<number>(140);
const clearable = ref(true);
const border = ref(true);
const borderColor = ref('#dcdfe6');
const focus = ref(false);
const passwordIcon = ref(true);
const customStyle = ref<Record<string, any>>({});

function textareaChange(index: number) {
    type.value = index === 0 ? 'textarea' : 'text';
}

function inputAlignChange(index: number) {
    const aligns: InputAlign[] = ['left', 'center', 'right'];
    inputAlign.value = aligns[index];
    console.log(aligns[index]);
}
function maxlengthChange(index: number) {
    maxlength.value = [140, 20, 10][index];
}
function clearableChange(index: number) {
    clearable.value = index === 0;
}
function borderChange(index: number) {
    border.value = index === 0;
}
function borderColorChange(index: number) {
    borderColor.value = ['#dcdfe6', '#ff0000', '#00ff00'][index];
}
function focusChange(index: number) {
    focus.value = index === 0;
}
function passwordIconChange(index: number) {
    passwordIcon.value = index === 0;
    type2.value = index === 0 ? 'password' : 'text';
}
function customStyleChange(index: number) {
    customStyle.value = index === 0 ? { background: '#f5f5f5', color: '#333' } : {};
}
</script>
