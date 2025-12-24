# random 随机数值

<demo-model url="/pages/library/random/index"></demo-model>


## random(min, max)

该方法可以返回在"min"和"max"之间的数值，要求"min"和"max"都为数值，且"max"大于或等于"min"，否则返回0.

- `min` <Number\> 最小值，最小值可以等于该值
- `max` <Number\> 最大值，最大值可以等于该值


```js
console.log(uni.$u.random(1, 3));
```