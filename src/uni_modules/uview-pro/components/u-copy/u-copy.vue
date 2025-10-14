<template>
    <view
        :class="customClass"
        :style="
            $u.toStyle(
                {
                    display: 'inline-block'
                },
                customStyle
            )
        "
        @click="handleCopy"
    >
        <slot>
            <text>点击复制</text>
        </slot>
    </view>
</template>
<script lang="ts">
export default {
    name: 'u-copy',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>
<script setup lang="ts">
import { CopyProps } from './types';
import { $u } from '../../';

/**
 * Copy 复制文本到剪贴板
 *
 * @property {String} content 需要复制的文本内容
 * @property {Boolean} toast 是否弹出提示，默认弹出提示。设置剪贴板内容后，小程序平台会自动弹出轻提示，微信小程序在成功回调success里设置toast可覆盖自带的轻提示
 */
const props = defineProps(CopyProps);

const emits = defineEmits<{
    (e: 'success', result: string): void;
    (e: 'fail', err: string): void;
    (e: 'complete', result: string): void;
}>();

function handleCopy() {
    $u.clipboard(props.content, {
        showToast: props.toast,
        success: function (result) {
            // #ifdef MP
            uni.showToast({
                title: '复制成功',
                icon: 'none'
            });
            // #endif
            emits('success', result);
        },
        fail: function (err) {
            emits('fail', err);
        },
        complete: function (result) {
            emits('complete', result);
        }
    });
}
</script>
