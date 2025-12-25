# 介绍

<demo-model url="/pages/example/js"></demo-model>


此函数方法，为 `uView Pro` 框架提供的一部分功能，它的实现，需要通过 `function` 调用，而不是组件的形式。 
工具库中的所有方法，均挂载在`$u`对象下，调用方法如下：
- 如果是在 `script` 中，需要通过`uni.$u.xxx`形式调用，如调用去除空格的`trim`方法：

```js
console.log(uni.$u.trim(' abc '));	// 去除两端空格
```

或导入 `$u` 工具函数库，调用方法如下：

```js
import { $u } from 'uview-pro'

console.log($u.trim(' abc '));	// 去除两端空格
```

<br>

- 如果是在元素中，也需要导入，如：

```html
<template>
	<view>
		去除所有空格：{{$u.trim(str, 'all')}}
	</view>
</template>

<script setup lang="ts">
	import { $u } from 'uview-pro'
</script>
```