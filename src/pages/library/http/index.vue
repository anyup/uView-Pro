<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="no-mode-here"> 请求结果为： </view>
                <view class="u-demo-result-line">
                    {{ JSON.stringify(result) }}
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">请求方式</view>
                <u-subsection :list="['get']"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">请求 Loading</view>
                <u-subsection :list="['隐藏', '显示']" @change="changeLoading"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">请求错误时显示 Toast</view>
                <u-subsection :list="['隐藏', '显示']" @change="changeToast"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

interface Result {
    code: number;
    msg: string;
    data: any;
}

// 请求结果
const result = ref<any>({});
const loading = ref(false);
const toast = ref(false);

// get请求
function doGet(url = '/api/demo.json') {
    $u.http.get(url, {},
        { meta: { loading: loading.value, toast: toast.value } }
    ).then((res: Result) => {
        if (res.code === 200) {
            setTimeout(() => {
                $u.toast('请求成功', 'success');
            }, 1000);
        }
        result.value = res;
    });
}

// 切换请求方式
function changeLoading(index: number) {
    loading.value = index === 1;
    doGet()
}

function changeToast(index: number) {
    toast.value = index === 1;
    doGet(toast.value ? '/api/demo1.json' : '/api/demo.json');
}

onMounted(() => {
    doGet();
});
</script>

<style lang="scss" scoped></style>
