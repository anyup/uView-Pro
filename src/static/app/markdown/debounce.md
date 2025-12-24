# throttle & debounce节流防抖

<demo-model url="/pages/library/debounce/index"></demo-model>

### 何谓节流和防抖？

- 节流  
节流的意思是，规定时间内，只触发一次。比如我们设定500ms，在这个时间内，无论点击按钮多少次，它都只会触发一次。具体场景可以是抢购时候，由于有无数人
快速点击按钮，如果每次点击都发送请求，就会给服务器造成巨大的压力，但是我们进行节流后，就会大大减少请求的次数。

- 防抖  
防抖的意思是，在连续的操作中，无论进行了多长时间，只有某一次的操作后在指定的时间内没有再操作，这一次才被判定有效。具体场景可以搜索框输入关键字过程中实时
请求服务器匹配搜索结果，如果不进行处理，那么就是输入框内容一直变化，导致一直发送请求。如果进行防抖处理，结果就是当我们输入内容完成后，一定时间(比如500ms)没有再
输入内容，这时再触发请求。

结合以上两种情况，回到我们最实际的场景，比如防止表单提交按钮被多次触发，我们应该选择使用`节流`而不是`防抖`方案。

uView内置的按钮组件`u-button`内部已做节流处理，无需外部再做节流处理。配置`throttle-time`参数，可以设置节流的时间，详见[Button 按钮](/zh/components/button.html)

## 节流

### throttle(func, wait = 500, immediate = true)

规定时间内，只触发一次，可以通过设置`immediate`来决定触发的时机在这个时间的开始，还是结束的时候执行。

- `func` <Function\> 触发回调执行的函数
- `wait` <Number\> 时间间隔，单位ms
- `immediate` <Number\> 在开始还是结束处触发，比如设置`wait`为1000ms，如果在一秒内进行了5次操作，只触发一次，如果`immediate`为`true`，那么就会在第一次操作
触发回调，如果为`false`，就会在第5次操作触发回调。


```html
<template>
    <view class="">
		<!-- 此处用法为在模板中使用，无需写this，直接$u.throttle()即可 -->
    	<view class="throttle" @tap="$u.throttle(btnAClick, 500)">
    		露从今夜白
    	</view>
    	<view class="throttle" @tap="btnBClick">
    		月是故乡明
    	</view>
    </view>
</template>

<script setup lang="ts">
import { $u } from 'uview-pro'

function btnAClick() {
	console.log('btnClick');
},
function btnBClick() {
	$u.throttle(toNext, 500)
},
function toNext() {
	console.log('btnBClick');
}
</script>

<style lang="scss">
    .throttle {
		margin-top: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		border: 1px solid $u-type-primary;
	}
</style>
```



## 防抖

### debounce(func, wait = 500, immediate = false)

在连续的操作中，无论进行了多长时间，只有某一次的操作后在指定的时间内没有再操作，这一次才被判定有效

- `func` <Function\> 触发回调执行的函数
- `wait` <Number\> 时间间隔，单位ms
- `immediate` <Number\> 在开始还是结束处触发，如非特殊情况，一般默认为`false`即可


```html
<template>
    <view class="">
		<!-- 此处用法为在模板中使用，无需写this，直接$u.debounce()即可 -->
    	<view class="debounce" @tap="$u.debounce(btnAClick, 500)">
    		露从今夜白
    	</view>
    	<view class="debounce" @tap="btnBClick">
    		月是故乡明
    	</view>
    </view>
</template>

<script setup lang="ts">
import { $u } from 'uview-pro'

function btnAClick() {
	console.log('btnClick');
},
function btnBClick() {
	$u.debounce(toNext, 500)
},
function toNext() {
	console.log('btnBClick');
}
</script>

<style lang="scss">
    .debounce {
		margin-top: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		border: 1px solid $u-type-primary;
	}
</style>
```