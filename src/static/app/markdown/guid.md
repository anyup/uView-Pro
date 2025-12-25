# guid 全局唯一标识符

<demo-model url="/pages/library/guid/index"></demo-model>


## 唯一标识符

### guid(length = 32, firstU = true, radix = 62)

该函数可以生产一个全局唯一、随机的guid，默认首字母为`u`，可以用于当做元素的id或者class名等需要唯一，随机字符串的地方，因为id或者class不能以数字开头。

- `length` <Number | null\> guid的长度，默认为`32`，如果取值`null`，则按`rfc4122标准`生成对应格式的随机数
- `firstU` <Boolean\> 首字母是否为"u"，如果首字母为数字情况下，不能用作元素的`id`或者`class`，默认为`true`
- `radix` <Number\> 生成的基数，默认为`62`，用于生成随机数字符串为"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"，
如果取2，那么返回的结果就是前两位0和1(可以理解为二进制)的随机结果，如果为7，返回的字符串就是0-7(理解为八进制)之间，
10为十进制，以此类推。

**说明**：这个方法三个参数都有默认的值，所以您调用的时候，可以无需传递任何参数也是可以的，并且**建议您这样做**。

```html
<template>
	<view :id="$u.guid()" :class="elClass">
		
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { $u } from 'uview-pro';

const elClass = ref('');

onMounted(() => {
  elClass.value = $u.guid(20);
});
</script>
```