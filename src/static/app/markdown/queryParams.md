# queryParams 对象转URL参数

<demo-model url="/pages/library/queryParams/index"></demo-model>


该方法，可以将一个对象形式参数转换成`get`传参所需参数形式，如把`{name: 'lisa', age: 20}`转换成`?name=lisa&age=20`  
用途：可以用于`uni.navigateTo`接口传参等场景，无需自己手动拼接`URL`参数

### queryParams(data, isPrefix = true, arrayFormat = 'brackets')


- `data` <Object\> 对象值，如`{name: 'lisa', age: 20}`  
- `isPrefix` <Boolean\> 是否在返回的字符串前加上"?"，默认为`true`
- `arrayFormat` <Boolean\> 属性为数组的情况下的处理办法，默认为`brackets`，见后面说明

```js
import { ref, onMounted } from 'vue';

const queryParams = ref({
  name: 'lisa',
  age: 20
});

onMounted(() => {
  console.log(uni.$u.queryParams(queryParams.value));
  // 结果为：?name=lisa&age=20
});
```


### arrayFormat参数说明
 
如果您传入的`data`对象内部某些属性值为数组的情况下，您可能需要留意这个参数的配置：   
该参数可选值有4个：`indices`，`brackets`，`repeat`，`comma`，具体效果请见下方的演示说明

```js
import { ref, onMounted } from 'vue';

const queryParams = ref({
  name: '冷月夜',
  fruits: ['apple', 'banana', 'orange']
});

onMounted(() => {
  console.log(uni.$u.queryParams(queryParams.value, true, 'indices'));
  // 结果为：?name=冷月夜&fruits[0]=apple&fruits[1]=banana&fruits[2]=orange
  
  console.log(uni.$u.queryParams(queryParams.value, true, 'brackets'));
  // 结果为：?name=冷月夜&fruits[]=apple&fruits[]=banana&fruits[]=orange
  
  console.log(uni.$u.queryParams(queryParams.value, true, 'repeat'));
  // 结果为：?name=冷月夜&fruits=apple&fruits=banana&fruits=orange
  
  console.log(uni.$u.queryParams(queryParams.value, true, 'comma'));
  // 结果为：?name=冷月夜&fruits=apple,banana,orange
});
```