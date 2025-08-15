<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-no-demo-here"> 源对象为："{info: {name: 'mary'}}" </view>
                <view class="u-demo-result-line">
                    {{ reslutValue }}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { $u } from '@/uni_modules/uview-pro';
export default {
    data() {
        return {
            obj: {
                info: {
                    name: 'mary'
                }
            },
            result: ''
        };
    },
    computed: {
        reslutValue() {
            return this.result ? JSON.stringify(this.result) : '';
        }
    },
    onLoad() {
        this.result = $u.deepClone(this.obj);
    }
};
</script>

<style lang="scss" scoped></style>
