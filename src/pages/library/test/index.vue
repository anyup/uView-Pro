<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToastRef"></u-toast>
                <view class="u-no-demo-here" style="text-align: left"> 这里仅对部分验证规则进行演示，目前总的验证规则有如下： </view>
                <u-table style="margin-top: 20rpx">
                    <u-tr>
                        <u-td>邮箱号</u-td>
                        <u-td>手机号</u-td>
                        <u-td>URL</u-td>
                        <u-td>普通日期</u-td>
                    </u-tr>
                    <u-tr>
                        <u-td>十进制数</u-td>
                        <u-td>身份证号</u-td>
                        <u-td>车牌号</u-td>
                        <u-td>金额</u-td>
                    </u-tr>
                    <u-tr>
                        <u-td>汉字</u-td>
                        <u-td>字母</u-td>
                        <u-td>字母|数字</u-td>
                        <u-td>包含值</u-td>
                    </u-tr>
                    <u-tr>
                        <u-td>数值范围</u-td>
                        <u-td>长度范围</u-td>
                        <u-td width="50%"></u-td>
                    </u-tr>
                </u-table>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">邮箱</view>
                <u-subsection :list="email" @change="emailChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">手机号</view>
                <u-subsection :list="mobile" @change="mobileChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">中文</view>
                <u-subsection :list="chinese" @change="chineseChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">整数</view>
                <u-subsection :list="digits" @change="digitsChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

const uToastRef = ref();

const email = ref(['google@gmail.com', 'google艾特gmail.com']);
const mobile = ref(['13478561273', '0778-3423082']);
const chinese = ref(['天青色等烟雨', 'Beat it']);
const digits = ref(['283', '下雨的声音']);

/**
 * 显示提示信息
 * @param type 验证结果
 */
function toast(type: boolean): void {
    uToastRef.value.show({
        type: type ? 'success' : 'error',
        title: type ? '验证通过' : '验证失败'
    });
}

/**
 * 邮箱验证
 * @param index 选择的索引
 */
function emailChange(index: number): void {
    toast($u.test.email(email.value[index]));
}

/**
 * 手机号验证
 * @param index 选择的索引
 */
function mobileChange(index: number): void {
    toast($u.test.mobile(mobile.value[index]));
}

/**
 * 中文验证
 * @param index 选择的索引
 */
function chineseChange(index: number): void {
    toast($u.test.chinese(chinese.value[index]));
}

/**
 * 整数验证
 * @param index 选择的索引
 */
function digitsChange(index: number): void {
    toast($u.test.digits(digits.value[index]));
}
</script>

<style lang="scss" scoped>
.u-demo {
}
</style>
