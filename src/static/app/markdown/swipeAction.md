## SwipeAction 滑动操作 <to-api/>

<demo-model url="/pages/componentsB/swipeAction/index"></demo-model>

该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作。

::: warning 注意
如果把该组件通过 v-for 用于左滑删除的列表，请保证循环的`:key`是一个唯一值，可以用数据的 id 或者 title 替代。
不能是数组循环的 index，否则删除的时候，可能会出现数据错乱
:::

### 平台差异说明

| App | H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ 小程序 |
| :-: | :-: | :--------: | :----------: | :--------: | :--------: | :-------: |
|  √  |  √  |     √      |      √       |     √      |     √      |     √     |

### 基本使用

- 通过 slot 传入内部内容即可，可以将`v-for`的"index"索引值传递给`index`参数，用于点击时，在回调方法中对某一个数据进行操作(点击回调时第一个参数会返回此索引值)
- 内部的按钮通过`options`参数配置，此参数为一个数组，元素为对象，可以配置按钮的文字，背景颜色(建议只配置此两个参数即可)，**请勿配置宽高等属性**。

说明：有时候，我们在打开一个 swipeAction 的同时，需要自动关闭其他的 swipeAction，这时需要通过`open`事件实现，见如下：

```html
<template>
  <view>
    <u-swipe-action
      :show="item.show"
      :index="index"
      v-for="(item, index) in list"
      :key="item.id"
      @click="click"
      @open="open"
      :options="options"
    >
      <view class="item u-border-bottom">
        <image mode="aspectFill" :src="item.images" />
        <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
        <view class="title-wrap">
          <text class="title u-line-2">{{ item.title }}</text>
        </view>
      </view>
    </u-swipe-action>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {
            id: 1,
            title:
              "长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来",
            images: "https://ik.imagekit.io/anyup/uview-pro/common/logo.png",
            show: false,
          },
          {
            id: 2,
            title:
              "新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来",
            images: "https://ik.imagekit.io/anyup/uview-pro/common/logo.png",
            show: false,
          },
          {
            id: 3,
            title: "登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇",
            images: "https://ik.imagekit.io/anyup/uview-pro/common/logo.png",
            show: false,
          },
        ],
        disabled: false,
        btnWidth: 180,
        show: false,
        options: [
          {
            text: "收藏",
            style: {
              backgroundColor: "#007aff",
            },
          },
          {
            text: "删除",
            style: {
              backgroundColor: "#dd524d",
            },
          },
        ],
      };
    },
    methods: {
      click(index, index1) {
        if (index1 == 1) {
          this.list.splice(index, 1);
          uni.$u.toast(`删除了第${index}个cell`);
        } else {
          this.list[index].show = false;
          uni.$u.toast(`收藏成功`);
        }
      },
      // 如果打开一个的时候，不需要关闭其他，则无需实现本方法
      open(index) {
        // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
        // 原本为'false'，再次设置为'false'会无效
        this.list[index].show = true;
        this.list.map((val, idx) => {
          if (index != idx) this.list[idx].show = false;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .item {
    display: flex;
    padding: 20rpx;
  }

  image {
    width: 120rpx;
    flex: 0 0 120rpx;
    height: 120rpx;
    margin-right: 20rpx;
    border-radius: 12rpx;
  }

  .title {
    text-align: left;
    font-size: 28rpx;
    color: $u-content-color;
    margin-top: 20rpx;
  }
</style>
```

### 修改按钮样式

- 通过`options`参数配置按钮的数量和样式，见上方说明
- 通过`btn-width`设置按钮的宽度，单位 rpx

```html
<u-swipe-action btn-width="180" :options="options"> ... </u-swipe-action>
```

### 点击事件

`click`点击事件回调中，有两个参数，第一个参数为通过 Props 传入的`index`参数，第二个参数为滑动按钮的索引，即`options`数组的索引，
用于标识第几个按钮被点击。

### API

### Props

| 参数          | 说明                                                                      | 类型             | 默认值  | 可选值 |
| ------------- | ------------------------------------------------------------------------- | ---------------- | ------- | ------ |
| bg-color      | 整个组件背景颜色                                                          | String           | #ffffff | -      |
| index         | 标识符，点击时候用于区分点击了哪一个，用`v-for`循环时的 index 即可        | String \| Number | -       | -      |
| btn-width     | 按钮宽度，单位 rpx                                                        | String \| Number | 180     | -      |
| disabled      | 是否禁止某个 swipeAction 滑动                                             | Boolean          | false   | true   |
| vibrate-short | 是否使手机发生短促震动，目前只在 iOS 的微信小程序和微信小程序开发工具有效 | Boolean          | false   | true   |
| show          | 打开或者关闭某个组件                                                      | Boolean          | false   | true   |
| options       | 按钮组的配置参数，数组形式，见上方说明                                    | Array            | [ ]     | -      |

### Event

| 事件名        | 说明               | 回调参数                                |
| :------------ | :----------------- | :-------------------------------------- |
| click         | 点击组件时触发     | (index1, index)，见上方"点击事件"的说明 |
| close         | 组件触发关闭状态时 | index: 通过 props 传递的`index`         |
| open          | 组件触发打开状态时 | index: 通过 props 传递的`index`         |
| content-click | 点击内容时触发     | index: 通过 props 传递的`index`         |
