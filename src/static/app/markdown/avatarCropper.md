## AvatarCropper 头像裁剪 <to-api/>

<demo-model url="/pages/componentsA/avatarCropper/index"></demo-model>

该组件一般的图片裁剪需求场景，尤其适合于头像裁剪方面。

### 平台差异说明

| App | H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ 小程序 |
| :-: | :-: | :--------: | :----------: | :--------: | :--------: | :-------: |
|  √  |  √  |     √      |      √       |     √      |     √      |     √     |

### 基本使用

组件使用流程：

1. 打开头像裁剪页面，同时传递配置基本参数(已默认配置好最优参数)
2. 选取图片，调整图片合适位置和大小，确定裁剪并返回此裁剪结果
3. 在原始页面监听`uAvatarCropper`事件，获得裁剪结果

```html
<template>
  <view class="wrap">
    <view class="u-avatar-wrap">
      <image class="u-avatar-demo" :src="avatar" mode="aspectFill"></image>
    </view>
    <u-button @tap="chooseAvatar">进入裁剪页</u-button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        avatar: "https://ik.imagekit.io/anyup/uview-pro/common/logo.png",
      };
    },
    created() {
      // 监听从裁剪页发布的事件，获得裁剪结果
      uni.$on("uAvatarCropper", (path) => {
        this.avatar = path;
        // 可以在此上传到服务端
        uni.uploadFile({
          url: "http://www.example.com/upload",
          filePath: path,
          name: "file",
          complete: (res) => {
            console.log(res);
          },
        });
      });
    },
    methods: {
      chooseAvatar() {
        // 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
        uni.$u.route({
          // 关于此路径，请见下方"注意事项"
          url: "/uview-pro/components/u-avatar-cropper/u-avatar-cropper",
          // 内部已设置以下默认参数值，可不传这些参数
          params: {
            // 输出图片宽度，高等于宽，单位px
            destWidth: 300,
            // 裁剪框宽度，高等于宽，单位px
            rectWidth: 200,
            // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
            fileType: "jpg",
          },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wrap {
    padding: 40rpx;
  }

  .u-avatar-wrap {
    margin-top: 80rpx;
    overflow: hidden;
    margin-bottom: 80rpx;
    text-align: center;
  }

  .u-avatar-demo {
    width: 150rpx;
    height: 150rpx;
    border-radius: 100rpx;
  }
</style>
```

### 注意事项

根据`下载`方式和`NPM`方式引入 uView 的不同，需要进行不同的处理，下载方式可以引用`uview-pro`中的某个文件当做页面文件，但是`NPM`方式，不能引入
`node_modules`文件夹中的`uview-pro`包的某个文件当做页面路径，故下方对两个方式分别说明：

#### 1. 下载引入 uView 方式

- 裁剪页面内置在 uView 中，由于打开页面，需要先在`pages.json`声明页面，故请把以下内容复制到项目根目录的`pages.json`中的`pages`数组中：

```js
{
	"path": "uview-pro/components/u-avatar-cropper/u-avatar-cropper",
	"style": {
		"navigationBarTitleText": "头像裁剪",
		"navigationBarBackgroundColor": "#000000"
	}
}
```

#### 1. NPM 引入 uView 方式

您需要去`node_modules`文件中，按路径`/node_modules/uview-pro/components/u-avatar-cropper/u-avatar-cropper.vue`找到此文件，将其内容复制出来，
放到`/pages`文件夹中的某个文件中，再按上面下载方式引入的一样的操作，去声明和引用页面即可。

- 裁剪后的结果，通过`uni.$on`监听`uAvatarCropper`事件，由于 uni-app 限制，H5 端裁剪的结果为`base64`格式，其他端为`blod`二进制形式，
  如果后端对接收格式有要求，请自行处理

### API

以下参数，需要通过 URL 的 get 参数传参到裁剪页，非 props。uView 很多组件传递值的单位为`rpx`，注意这里的`dest-width`和`rect-width`单位为`px`

### URL 参数

| 参数       | 说明                                                           | 类型             | 默认值 | 可选值 |
| ---------- | -------------------------------------------------------------- | ---------------- | ------ | ------ |
| dest-width | 输出图片宽度，高等于宽，单位**px**                             | String \| Number | 200    | -      |
| rect-width | 裁剪框宽度，高等于宽，单位**px**                               | String \| Number | 200    | -      |
| file-type  | 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可 | String           | jpg    | png    |

### Event

| 事件名         | 说明                                | 回调参数             |
| :------------- | :---------------------------------- | :------------------- |
| uAvatarCropper | 裁剪结束后的事件，通过`uni.$on`监听 | path: 裁剪的图片数据 |
