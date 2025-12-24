# route 路由跳转

<demo-model url="/pages/library/route/index"></demo-model>


### route(Object)

此为一个路由跳转方法，内部是对uni多个路由跳转api的封装，更方便使用

Object参数说明：

| 参数名      |     类型       |      默认值      |   是否必填      |  说明   |
|-------------  |---------------- |---------------|------------------ |-------- |
| type | String  | navigateTo | false | `navigateTo`或`to`对应`uni.navigateTo`，`redirect`或`redirectTo`对应`uni.redirectTo`，`switchTab`或`tab`对应`uni.switchTab`，`reLaunch`对应`uni.reLaunch`，`navigateBack`或`back`对应`uni.navigateBack`|
| url | String  | -	 | false | `type`为`navigateTo`，`redirectTo`，`switchTab`，`reLaunch`时为必填 |
| delta | Number | 1  | false | `type`为`navigateBack`时用到，表示返回的页面数 |
| params | Object | -  | false | 传递的对象形式的参数，如`{name: 'lisa', age: 18}` |
| animationType | String | pop-in  | false | 只在APP生效，详见[窗口动画](https://uniapp.dcloud.io/api/router?id=animation) |
| animationDuration | Number | 300  | false | 动画持续时间，单位ms |


<br>

```js
import { ref, onMounted } from 'vue';

const route = ref(null);

onMounted(() => {
  setTimeout(() => {
    uni.$u.route({
      url: 'pages/components/empty/index',
      params: {
        name: 'lisa'
      }
    });
  }, 2000);
});
```


## 简写

注：为了方便简写和调用，可以直接传递一个`url`地址替代`Object`，它只能执行`uni.navigateTo`类型的地址，**不支持跳转到Tabbar页面**，
如果有参数需要携带，以对象形式写到方法的第二个参数中。

```js
// 无参数
uni.$u.route('/pages/components/empty/index');


// 带参数
uni.$u.route('/pages/components/empty/index', {
	name: 'lisa',
	age: 20
});
```


<style scoped>
h4[id=route-object] + p + p + table thead tr th:nth-child(5){
	width: 40%;
}

h4[id=route-object] + p + p + table thead tr th:nth-child(2){
	width: 12%;
}

</style>