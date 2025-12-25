# randomArray 数组乱序

<demo-model url="/pages/library/randomArray/index"></demo-model>


## randomArray(array)

该函数可以打乱一维数组元素的顺序，这是随机过程

- `array` <Array\> 一维数组

```js
import { ref, onMounted } from 'vue';

const array = ref([1, 2, 3, 4, 5]);

onMounted(() => {
  console.log(uni.$u.randomArray(array.value));
});
```