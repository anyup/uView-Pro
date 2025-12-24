# colorSwitch 颜色转换

<demo-model url="/pages/library/colorSwitch/index"></demo-model>


## RGB转十六进制Hex

### rgbToHex(rgb)

该函数可以将一个RGB颜色值转换成一个Hex的十六进制颜色值

- `rgb` <String\> RGB颜色值，如`rgb(230, 231, 233)`

```js
import { ref, onMounted } from 'vue';
import { $u } from 'uview-pro';

const rgb = ref('rgb(13, 145, 20)');

onMounted(() => {
  console.log($u.rgbToHex(rgb.value));
});
```


## 十六进制Hex转RGB

### hexToRgb(hex)

该函数可以将一个Hex的十六进制颜色值转换成一个RGB颜色值

- `hex` <String\> HEx颜色值，如`#0afdce`

```js
import { ref, onMounted } from 'vue';
import { $u } from 'uview-pro';

const hex = ref('#0afdce');

onMounted(() => {
  console.log($u.hexToRgb(hex.value));
});
```


## 颜色渐变

### colorGradient(startColor, endColor, step)

该函数实现两个颜色值之间等分取值，返回一个数组，元素为十六进制形式的颜色值，数组长度为`step`值。 
例如：colorGradient('rgb(250, 250, 250)', 'rgb(252, 252, 252)', 3)，得到的结果为["#fafafa", "#fafafa", "#fbfbfb"]

- `startColor` <String\> 开始颜色值，可以是HEX或者RGB颜色值，如`#0afdce`或者`rgb(120, 130, 150)`
- `endColor` <String\> 结束颜色值，可以是HEX或者RGB颜色值，如`#0afdce`或者`rgb(120, 130, 150)`
- `step` <Number\> 均分值，把开始值和结束值平均分成多少份

```js
console.log(uni.$u.colorGradient('rgb(250,250,250)', 'rgb(252,252,252)', 3));
// 结果为：["#fafafa", "#fafafa", "#fbfbfb"]
```


## 颜色透明度

### colorToRgba(color, opacity = 0.3)

该函数可以接受一个`十六进制`或者`rgb`格式的颜色值(不能接受命名式颜色格式，比如`white`)，返回此颜色的`rgba`格式值，如下：

- `color` <String\> 颜色值，只能`hex`或者`rgba`格式
- `opacity` <Number\> 不透明度值，取值为0-1之间


```js
uni.$u.colorToRgba('#000000', 0.35);
// 结果为 rgba(0, 0, 0, 0.35)

uni.$u.colorToRgba('rgb(255, 180, 0)', 0.4);
// 结果为 rgba(255, 180, 0, 0.4)
```

