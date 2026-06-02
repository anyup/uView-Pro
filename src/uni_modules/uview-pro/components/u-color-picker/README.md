# ColorPicker 颜色选择器

该组件用于颜色选择，包含弹窗模式（`u-color-picker`）和内联面板模式（`u-color-select-panel`）两个组件，支持单色、渐变色、透明度调节、历史记录、预设颜色、吸管取色等功能，可根据场景灵活使用。

## 平台差异说明

| App | H5 | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| √ | √ | √ | √ | √ | √ | √ |

> 注意：吸管取色（EyeDropper）功能仅在支持 `EyeDropper API` 的浏览器环境（如 Chrome Desktop）中可用，小程序和移动端 H5 环境暂不支持。

## 基本使用

### 弹窗模式

使用 `u-color-picker` 组件，通过 `v-model:show` 控制弹窗显隐，`v-model` 双向绑定颜色值。

```html
<template>
    <view>
        <u-button @click="showPicker = true">打开颜色选择器</u-button>
        <view :style="{ background: color, width: '100px', height: '100px' }"></view>

        <u-color-picker
            :show="showPicker"
            v-model="color"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        ></u-color-picker>
    </view>
</template>

<script setup>
import { ref } from 'vue';

const showPicker = ref(false);
const color = ref('#2979ff');

const onConfirm = (e) => {
    console.log('选择的颜色：', e);
    showPicker.value = false;
};
</script>
```

### 内联模式

使用 `u-color-select-panel` 组件直接嵌入页面，无需弹窗。

```html
<template>
    <view class="page">
        <u-color-select-panel
            v-model="color"
            @change="onChange"
        ></u-color-select-panel>
    </view>
</template>

<script setup>
import { ref } from 'vue';

const color = ref('#2979ff');

const onChange = (e) => {
    console.log('实时颜色变化：', e);
};
</script>
```

### 自定义样式

通过 `customStyle` 和 `customClass` 可自定义组件根节点的样式。

```html
<template>
    <u-color-picker
        v-model="color"
        :show="show"
        :customStyle="{ borderRadius: '24rpx' }"
        customClass="my-custom-picker"
    ></u-color-picker>
</template>
```

## API

### u-color-picker Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| :-- | :-- | :-- | :-- | :-- |
| v-model | 绑定的颜色值 | String | `#000000` | - |
| show | 是否显示弹窗 | Boolean | `false` | - |
| mode | 显示模式 | String | `popup` | `popup`, `inline` |
| title | 弹窗标题 | String | `选择颜色` | - |
| confirmText | 确认按钮文字 | String | `确定` | - |
| cancelText | 取消按钮文字 | String | `取消` | - |
| shape | 触发器形状 | String | `square` | `square`, `circle` |
| size | 触发器大小 | String \| Number | `60rpx` | - |
| zIndex | 弹窗层级 | String \| Number | `10075` | - |
| colorMode | 颜色模式 | String | `both` | `solid`, `gradient`, `both` |
| showAlpha | 是否显示透明度调节 | Boolean | `true` | `true`, `false` |
| showEyeDropper | 是否显示吸管工具 | Boolean | `true` | `true`, `false` |
| showHistory | 是否显示最近使用颜色 | Boolean | `true` | `true`, `false` |
| showPresets | 是否显示预设颜色 | Boolean | `true` | `true`, `false` |
| presets | 预设颜色列表 | Array | `[...]` | - |
| format | 颜色格式 | String | `HEX` | `HEX`, `RGB` |
| disabled | 是否禁用 | Boolean | `false` | - |
| customStyle | 自定义根节点样式 | Object \| String | `{}` | - |
| customClass | 自定义根节点样式类 | String | `''` | - |

### u-color-picker Events

| 事件名 | 说明 | 回调参数 |
| :-- | :-- | :-- |
| confirm | 点击确定按钮触发 | `color: string` |
| cancel | 点击取消或关闭弹窗触发 | - |
| change | 颜色改变时实时触发 | `color: string` |
| color-update | 颜色每次更新时触发 | `color: string` |
| update:modelValue | 颜色值变化时触发（v-model） | `color: string` |
| update:show | 弹窗显隐状态变化时触发 | `show: boolean` |

### u-color-select-panel Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| :-- | :-- | :-- | :-- | :-- |
| v-model | 绑定的颜色值 | String | `#000000` | - |
| colorMode | 颜色模式 | String | `both` | `solid`, `gradient`, `both` |
| showAlpha | 是否显示透明度调节 | Boolean | `true` | `true`, `false` |
| showEyeDropper | 是否显示吸管工具 | Boolean | `true` | `true`, `false` |
| showHistory | 是否显示最近使用颜色 | Boolean | `true` | `true`, `false` |
| showPresets | 是否显示预设颜色 | Boolean | `true` | `true`, `false` |
| presets | 预设颜色列表 | Array | `[...]` | - |
| format | 颜色格式 | String | `HEX` | `HEX`, `RGB` |
| disabled | 是否禁用 | Boolean | `false` | - |
| customStyle | 自定义根节点样式 | Object \| String | `{}` | - |
| customClass | 自定义根节点样式类 | String | `''` | - |

### u-color-select-panel Events

| 事件名 | 说明 | 回调参数 |
| :-- | :-- | :-- |
| change | 颜色改变时实时触发 | `color: string` |
| color-update | 颜色每次更新时触发 | `color: string` |
| update:modelValue | 颜色值变化时触发（v-model） | `color: string` |

### u-color-select-panel Methods

可通过 `ref` 调用组件内部方法。

| 方法名 | 说明 | 参数 | 返回值 |
| :-- | :-- | :-- | :-- |
| setColor | 主动设置颜色 | `color: string` | - |
| getColor | 获取当前颜色对象详细信息 | - | `ColorObject` |
| saveRecentColor | 保存指定颜色到历史记录 | `color: string` | - |

#### ColorObject 类型定义

```typescript
interface ColorObject {
    hex: string;          // 十六进制颜色值，如 #ff0000ff
    rgb: {                // RGB 对象
        r: number;
        g: number;
        b: number;
    };
    hsl: {                // HSL 对象
        h: number;
        s: number;
        l: number;
    };
    hsv: {                // HSV 对象
        h: number;
        s: number;
        v: number;
    };
    alpha: number;        // 透明度 0-1
    source: string;       // 来源格式 'hex' | 'rgb' | 'hsl'
}
```

## 功能特性详解

### 1. 渐变色支持

当 `colorMode` 设置为 `gradient` 或 `both` 时，组件支持 CSS 线性渐变（linear-gradient）。

- 面板顶部会出现渐变控制条，可添加/选择颜色断点（Stop）
- 点击断点可选中，选中的断点会放大高亮显示
- 拖动断点可调整其在渐变中的位置
- 选中断点后，下方选色区域将控制该断点的颜色
- v-model 的值在渐变模式下为 `linear-gradient(90deg, #fff 0%, #000 100%)` 格式

### 2. 颜色格式切换

点击输入框左侧的格式标签可以切换颜色显示格式。

- HEX：支持 6 位（`#RRGGBB`）和 8 位（`#RRGGBBAA`）格式
- RGB：显示为 `rgba(r, g, b, a)` 格式

### 3. 吸管工具 (EyeDropper)

在支持 `EyeDropper API` 的 H5 环境（桌面端 Chrome/Edge），点击吸管图标可以吸取屏幕上任意位置的颜色。移动端 H5 或小程序环境暂不支持此 API，吸管按钮会自动隐藏。

### 4. 历史记录

组件会自动保存最近使用的 10 个颜色到本地存储，方便快速复用。可通过 `showHistory` 控制是否显示历史记录区域，通过 `saveRecentColor` 方法手动保存颜色。

### 5. 预设颜色

支持通过 `presets` 属性自定义预设颜色列表，组件内置了 15 种常用颜色作为默认值。可通过 `showPresets` 控制是否显示预设颜色区域。

### 6. 暗黑模式适配

组件内置了对暗黑模式的支持，会自动感知当前应用的主题设置并切换相应的背景色和文字颜色。无需额外配置。
