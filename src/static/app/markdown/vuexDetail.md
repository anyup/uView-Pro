## uView简化Vuex写法的基本原理

`vuex`传统写法简单，但是也很繁琐：

1. 我们需要在`vuex`中定义`state`和`mutations`
2. 我们需要在每个用到`vuex`变量的地方，都引入`mapState`，同时还要解构到`computed`中去
3. 修改`vuex`变量的时候，还需要通过`commit`提交
4. 由于`vuex`变量是保存在运行内存中的，刷新浏览器`vuex`变量会消失，还需要通过其他手段实现变量的存续

- 针对上面的第1点，我们写了一个统一的`mutations`，用于更新所有的`state`变量，这样可以免去每个变量都要写一个对应的`mutations`步骤，同时在
这个统一的`mutations`中，根据配置判断是否在变量更新的时候，把它存进本地`Local Storage`，这样H5刷新或者APP下次启动，就会自动把这些变量赋值给
`state`

具体实现如下(当然，这可能不是最优的写法)

```js
// 根目录的/store/index.js

$uStore(state, payload) {
	// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
	let nameArr = payload.name.split('.');
	let saveKey = '';
	let len = nameArr.length;
	if(nameArr.length >= 2) {
		let obj = state[nameArr[0]];
		for(let i = 1; i < len - 1; i ++) {
			obj = obj[nameArr[i]];
		}
		obj[nameArr[len - 1]] = payload.value;
		saveKey = nameArr[0];
	} else {
		// 单层级变量，在state就是一个普通变量的情况
		state[payload.name] = payload.value;
		saveKey = payload.name;
	}
	saveLifeData(saveKey, state[saveKey])
}
```

- 针对上面第二点，我们通过`Vue.mixin`全局混入的形式，可以很好的解决。`mixin`会把内容注入到每一个页面，所以我们在其中写了`mapState`到`computed`，
每个页面自然地就获得了从`vuex`的`state`中注入的全局变量，这里我们需要在uni-app目根目录新建一个`store`文件夹(如果没有的话)，
在其中新建一个`$u.mixin.js`文件，这个文件无需您手动引入和`Vue.mixin`处理，uView会自动处理，只为让您少写两行代码。

```js
// $u.mixin.js的部分实现

import { mapState } from 'vuex'
import store from "@/store"

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let $uStoreKey = [];
try{
	$uStoreKey = store.state ? Object.keys(store.state) : [];
}catch(e){}

module.exports = {
	computed: {
		// 将vuex的state中的所有变量，解构到全局混入的mixin中
		...mapState($uStoreKey)
	}
}
```


- 针对上面的第3点，因为我们通过统一的`mutations`的去更新`state`，自然就需要一个统一方法去触发`mutations`，用以替代原来的`commit`方法，
具体是将此方法顺带写入到`$u.mixin.js`，并挂载到`this.$u`中，命名为`vuex`，见如下：

```js
module.exports = {
	created() {
		// 将vuex方法挂在到$u中
		// 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => uni.$u.vuex('user.name', '史诗')
		// 如果要修改vuex的state的version变量为1.0.1 => uni.$u.vuex('version', '1.0.1')
		uni.$u.vuex = (name, value) => {
			this.$store.commit('$uStore', {
				name,value
			})
		}
	}
}
```

当我们要修改某一个`state`值的时候，就用`uni.$u.vuex('name', value)`的形式，通过其他办法，也可以实现`this.name = value`的简写，但是这种方式
不支持对象的修改，同时也会造成其他的问题，这里不做过多讨论。

- 针对第4点，其实已经在第1点中解决了。

上面的做法，只是抛砖引玉的做了一个思路的解析，如果您有更好的思路，也可以和我们分享。

说明：确保您是新项目的情况下，或者您对这个实现方法很清楚，才使用这个方法。