<template>
    <demo-page title="FullScreen 压窗屏" desc="用于APP端模态弹窗遮盖全屏，支持压窗效果，适合特殊场景。" :apis="apis">
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <view class="u-no-demo-here">
                            通过压窗屏打开的模态框，可以遮盖顶部原生的导航栏和底部tabbar栏。
                            注意：压窗屏只对APP有效，其他端无效。
                        </view>
                    </view>
                </view>
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom"> 参数配置 </view>
                    <view class="u-config-item">
                        <view class="u-item-title">状态</view>
                        <u-subsection :current="current" :list="['打开', '关闭']" @change="openModal" />
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<!--<script>-->
<!--import { $u } from '@/uni_modules/uview-pro';-->
<!--	export default {-->
<!--		data() {-->
<!--			return {-->
<!--				current: 1-->
<!--			}-->
<!--		},-->
<!--		onShow() {-->
<!--			this.$nextTick(() => {-->
<!--				this.current = 1;-->
<!--			})-->
<!--		},-->
<!--		methods: {-->
<!--			openModal(index) {-->
<!--				// 可以传递参数-->
<!--				if(index == 0) {-->
<!--					$u.route("/uni_modules/uview-pro/components/u-full-screen/u-full-screen?id=1");-->
<!--				}-->
<!--			}-->
<!--		}-->
<!--	}-->
<!--</script>-->

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';
import { apis } from './config';

const current = ref(1);

onShow(() => {
    current.value = 1;
});

function openModal(index: number) {
    // 可以传递参数
    if (index === 0) {
        $u.route('/uni_modules/uview-pro/components/u-full-screen/u-full-screen?id=1');
    }
}
</script>

<style lang="scss" scoped>
.u-demo {
}
</style>
