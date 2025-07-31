<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area u-flex u-row-center">
        <u-image :shape="shape" ref="uImageRef" :width="width" :height="height" :src="src" mode="aspectFill">
          <u-loading size="44" mode="flower" slot="loading" v-if="loadingSlot"></u-loading>
          <view v-if="errorSlot" slot="error" style="font-size: 24rpx">加载失败</view>
        </u-image>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom">参数配置</view>
      <view class="u-config-item">
        <view class="u-item-title">状态</view>
        <u-subsection
          :current="statusCurrent"
          :list="['加载成功', '加载中', '加载失败']"
          @change="statusChange"
        ></u-subsection>
      </view>
      <!-- 微信小程序中，无法动态切换slot，所以隐藏此部分的演示 -->
      <!-- #ifndef MP-WEIXIN -->
      <view class="u-config-item">
        <view class="u-item-title">加载中状态</view>
        <u-subsection :list="['默认', '自定义']" @change="loadingChange"></u-subsection>
      </view>
      <!-- #endif -->
      <view class="u-config-item">
        <view class="u-item-title">加载失败状态</view>
        <u-subsection :list="['默认', '自定义']" @change="errorChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">形状</view>
        <u-subsection :list="['方形', '圆形']" @change="shapeChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { type ImageInstance } from '@/uni_modules/uview-pro/components/u-image/types'
import { ref } from 'vue'

// 定义响应式数据
const src = ref('https://v1.uviewui.com/common/logo.png')
const width = ref('200')
const height = ref('200')
const loadingSlot = ref(false)
const statusCurrent = ref(0)
const errorSlot = ref(false)
const shape = ref('square')
// 获取 uImage 组件实例
const uImageRef = ref<ImageInstance>()

// 定义方法
const statusChange = (index: number) => {
  if (index == 0) {
    uImageRef.value?.changeStatus('normal')
  } else if (index == 1) {
    uImageRef.value?.changeStatus('loading')
  } else {
    uImageRef.value?.changeStatus('error')
  }
}

const loadingChange = (index: number) => {
  statusCurrent.value = 1
  statusChange(1)
  if (index == 0) {
    loadingSlot.value = false
  } else {
    loadingSlot.value = true
  }
}

const errorChange = (index: number) => {
  statusCurrent.value = 2
  statusChange(2)
  if (index == 0) {
    errorSlot.value = false
  } else {
    errorSlot.value = true
  }
}

const shapeChange = (index: number) => {
  shape.value = index == 0 ? 'square' : 'circle'
}

</script>

<style scoped lang="scss">
.u-demo-area {
}
</style>
