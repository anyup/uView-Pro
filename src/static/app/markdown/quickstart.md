## 快速上手

<demo-model url="/"></demo-model>

### 如何使用

通过 npm 和下载方式的配置之后，在某个页面可以直接使用组件，无需通过`import`引入组件。

```html
<template>
  <u-action-sheet :list="list" v-model="show"></u-action-sheet>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  interface ListItem {
    text: string;
    color?: string;
    fontSize?: number;
  }

  const list = ref<ListItem[]>([
    { text: "点赞", color: "blue", fontSize: 28 },
    { text: "分享" },
    { text: "评论" },
  ]);

  const show = ref(true);
</script>
```

<br>

### 关于 $u

uView Pro 将`$u`对象同时挂载到了`uni`对象上，这意味着您可以在外部的`ts`文件中，通过`uni.$u.xxx`的形式去调用 uView 提供的一些工具方法。

或则您在使用 `$u` 时，先导入再使用：

```html
<script setup lang="ts">
  import { $u } from "uview-pro";

  function func() {
    $u.toast("hello world");
  }
</script>
```

<br>

### 如何不使用 easycom 而单独引用某一个组件

某些情况下，您可能不想通过 easycom 引用组件(虽然我们极力推荐您使用 easycom)，那么您可以使用`import`这个常规的引入方式，如下：

```html
<template>
  <my-action-sheet :list="list" v-model="show"></my-action-sheet>
</template>

<script setup lang="ts">
  // 你如果自定义引入的名称，template 中使用组件名称也需要对应
  import myActionSheet from "@/uni_modules/uview-pro/components/u-action-sheet/u-action-sheet.vue";
  import { ref } from "vue";

  interface ListItem {
    text: string;
    color?: string;
    fontSize?: number;
  }

  const list = ref<ListItem[]>([
    { text: "点赞", color: "blue", fontSize: 28 },
    { text: "分享" },
    { text: "评论" },
  ]);

  const show = ref(true);
</script>
```
