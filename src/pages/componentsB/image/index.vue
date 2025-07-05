<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area u-flex u-row-center">
        <u-image :shape="shape" ref="uImage" :width="width" :height="height" :src="src" mode="aspectFill">
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
import { ref } from 'vue'

// 定义响应式数据
const src = ref('https://cdn.uviewui.com/uview/example/fade.jpg')
const width = ref('200')
const height = ref('200')
const loadingSlot = ref(false)
const statusCurrent = ref(0)
const errorSlot = ref(false)
const shape = ref('square')

// 定义方法
const statusChange = (index: number) => {
  //   if (index == 0) {
  //     src.value = 'http://img5.imgtn.bdimg.com/it/u=2438062088,2808868405&fm=26&gp=0.jpg'
  //     // 确保 uImage 已正确初始化
  //     if (uImage.value) {
  //       // @ts-ignore
  //       uImage.value.loading = false
  //       // @ts-ignore
  //       uImage.value.isError = false
  //     }
  //   } else if (index == 1) {
  //     // 确保 uImage 已正确初始化
  //     if (uImage.value) {
  //       // @ts-ignore
  //       uImage.value.loading = true
  //     }
  //   } else {
  //     // 确保 uImage 已正确初始化
  //     if (uImage.value) {
  //       // @ts-ignore
  //       uImage.value.loading = false
  //       // @ts-ignore
  //       uImage.value.isError = true
  //     }
  //   }
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

// 获取 uImage 组件实例
// const uImage = ref<any>(null)
</script>

<style scoped lang="scss">
.u-demo-area {
}
</style>
