<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-no-demo-here">
                    源对象1为："{info: {name: 'mary'}}"
                    <view> </view>
                    源对象2为："{info: {age: '22'}}"
                </view>
                <view class="u-demo-result-line">
                    {{ reslutValue }}
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">模式</view>
                <u-subsection :list="['浅拷贝', '深拷贝']" @change="modeChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';

type InfoType = {
    name?: string;
    age?: string;
};

type ObjType = {
    info: InfoType;
};

const obj1 = ref<ObjType>({
    info: {
        name: 'mary'
    }
});

const obj2 = ref<ObjType>({
    info: {
        age: '22'
    }
});

const obj3 = ref<ObjType>({
    info: {
        name: 'mary'
    }
});

const result = ref<ObjType | string>('');

const reslutValue = computed(() => {
    return result.value ? JSON.stringify(result.value) : '';
});

onLoad(() => {
    result.value = Object.assign(obj1.value, obj2.value);
    obj1.value = $u.deepClone(obj3.value);
});

function modeChange(index: number) {
    if (index === 0) {
        result.value = Object.assign(obj1.value, obj2.value);
        // 重新修改obj1为原来的值
        obj1.value = $u.deepClone(obj3.value);
    } else {
        result.value = $u.deepMerge(obj1.value, obj2.value);
    }
}
</script>
