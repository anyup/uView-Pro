<template>
    <view class="u-rate" :id="elId" @touchmove.stop.prevent="touchMove">
        <view class="u-star-wrap" v-for="(item, index) in count" :key="index" :class="[elClass]">
            <u-icon
                :name="String(activeIndex > index ? elActiveIcon : inactiveIcon)"
                @click="click(index + 1, $event)"
                :color="String(activeIndex > index ? elActiveColor : inactiveColor)"
                :custom-style="{
                    fontSize: size + 'rpx',
                    padding: `0 ${Number(gutter) / 2 + 'rpx'}`
                }"
                :custom-prefix="customPrefix"
                :show-decimal-icon="showDecimalIcon(index)"
                :percent="decimal"
                :inactive-color="inactiveColor"
            ></u-icon>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { RateProps } from './types';

defineOptions({
    name: 'u-rate'
});

/**
 * rate 评分
 * @description 该组件一般用于满意度调查，星型评分的场景
 * @tutorial https://uviewpro.cn/zh/components/rate.html
 * @property {String|Number} count 最多可选的星星数量（默认5）
 * @property {String|Number} current 默认选中的星星数量（默认0）
 * @property {Boolean} disabled 是否禁止用户操作（默认false）
 * @property {String|Number} size 星星的大小，单位rpx（默认32）
 * @property {String} inactive-color 未选中星星的颜色（默认#b2b2b2）
 * @property {String} active-color 选中的星星颜色（默认#FA3534）
 * @property {String} active-icon 选中时的图标名，只能为uView的内置图标（默认star-fill）
 * @property {String} inactive-icon 未选中时的图标名，只能为uView的内置图标（默认star）
 * @property {String|Number} gutter 星星之间的距离（默认10）
 * @property {String|Number} min-count 最少选中星星的个数（默认0）
 * @property {Boolean} allow-half 是否允许半星选择（默认false）
 * @event {Function} change 选中的星星发生变化时触发
 * @example <u-rate :count="count" :current="2"></u-rate>
 */
const props = defineProps(RateProps);

const emit = defineEmits(['update:modelValue', 'change']);
const instance = getCurrentInstance();
// 生成唯一id，防止页面多个评分组件冲突
const elId = ref($u.guid());
const elClass = ref($u.guid());
const starBoxLeft = ref(0); // 评分盒子左边到屏幕左边的距离
const starWidth = ref(0); // 每个星星的宽度
const starWidthArr = ref<number[]>([]); //每个星星最右边到组件盒子最左边的距离
// 当前激活的星星的index，如果存在value，优先使用value，因为它可以双向绑定(1.4.5新增)
const activeIndex = ref(Number(props.modelValue) !== -1 ? Number(props.modelValue) : Number(props.current));

// 监听props变化，保持activeIndex同步
watch(
    () => props.current,
    val => {
        activeIndex.value = Number(val);
    }
);
watch(
    () => props.modelValue,
    val => {
        activeIndex.value = Number(val);
    }
);

/**
 * 计算当前星星的显示小数部分（半星）
 */
const decimal = computed((): number => {
    if (props.disabled) {
        // 只在允许半星时才返回小数部分，否则始终为0
        if (props.allowHalf) {
            // 计算当前激活星星的小数部分（如3.5星，返回50）
            const val = Number(activeIndex.value);
            return (val - Math.floor(val)) * 100;
        }
        return 0;
    } else if (props.allowHalf) {
        // 允许半星时，返回50，否则0
        return 50;
    }
    return 0;
});
/**
 * 计算当前激活的图标
 */
const elActiveIcon = computed(() => {
    const len = props.icons.length;
    // 此处规则类似于下方的elActiveColor参数，都是根据一定的规则，显示不同的图标
    // 结果可能如此：icons参数传递了3个图标，当选中两个时，用第一个图标，4个时，用第二个图标
    // 第三个时，用第三个图标作为激活的图标
    if (len && len <= Number(props.count)) {
        const step = Math.round(Number(activeIndex.value) / Math.round(Number(props.count) / len));
        if (step < 1) return props.icons[0];
        if (step > len) return props.icons[len - 1];
        return props.icons[step - 1];
    }
    return props.activeIcon;
});
/**
 * 计算当前激活的颜色
 */
const elActiveColor = computed(() => {
    const len = props.colors.length;
    // 如果有设置colors参数(此参数用于将图标分段，比如一共5颗星，colors传3个颜色值，那么根据一定的规则，2颗星可能为第一个颜色
    // 4颗星为第二个颜色值，5颗星为第三个颜色值)
    if (len && len <= Number(props.count)) {
        const step = Math.round(Number(activeIndex.value) / Math.round(Number(props.count) / len));
        if (step < 1) return props.colors[0];
        if (step > len) return props.colors[len - 1];
        return props.colors[step - 1];
    }
    return props.activeColor;
});

/**
 * 获取评分组件盒子的布局信息
 */
function getElRectById() {
    // uView封装的获取节点的方法，详见文档
    $u.getRect('#' + elId.value, instance).then((res: any) => {
        starBoxLeft.value = res.left;
    });
}
/**
 * 获取单个星星的尺寸
 */
function getElRectByClass() {
    // uView封装的获取节点的方法，详见文档
    $u.getRect('.' + elClass.value, instance).then((res: any) => {
        starWidth.value = res.width;
        // 把每个星星右边到组件盒子左边的距离放入数组中
        for (let i = 0; i < Number(props.count); i++) {
            starWidthArr.value[i] = (i + 1) * starWidth.value;
        }
    });
}
/**
 * 手指滑动评分
 */
function touchMove(e: any) {
    if (props.disabled) {
        return;
    }
    if (!e.changedTouches[0]) {
        return;
    }
    const movePageX = e.changedTouches[0].pageX;
    // 滑动点相对于评分盒子左边的距离
    const distance = movePageX - starBoxLeft.value;
    // 如果滑动到了评分盒子的左边界，就设置为0星
    if (distance <= 0) {
        activeIndex.value = 0;
    }
    // 滑动的距离，相当于多少颗星星
    let index = Math.ceil(distance / starWidth.value);
    activeIndex.value = index > Number(props.count) ? Number(props.count) : index;
    // 对最少颗星星的限制
    if (activeIndex.value < Number(props.minCount)) activeIndex.value = Number(props.minCount);
    emitEvent();
}
/**
 * 通过点击，直接选中
 */
function click(index: number, e: any) {
    if (props.disabled) {
        return;
    }
    // 半星选择，尚未实现
    if (props.allowHalf) {
        // 预留半星实现
    }
    // 对第一个星星特殊处理，只有一个的时候，点击可以取消，否则无法作0星评价
    if (index == 1) {
        if (activeIndex.value == 1) {
            activeIndex.value = 0;
        } else {
            activeIndex.value = 1;
        }
    } else {
        activeIndex.value = index;
    }
    // 对最少颗星星的限制
    if (activeIndex.value < Number(props.minCount)) activeIndex.value = Number(props.minCount);
    emitEvent();
}
/**
 * 发出事件
 */
function emitEvent() {
    // 发出change事件
    emit('change', activeIndex.value);
    // 同时修改双向绑定的value的值
    if (Number(props.modelValue) !== -1) {
        emit('update:modelValue', activeIndex.value);
    }
}
/**
 * 是否显示半星图标
 */
function showDecimalIcon(index: number) {
    return props.disabled && parseInt(String(activeIndex.value)) === index;
}

onMounted(() => {
    getElRectById();
    getElRectByClass();
});
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-rate {
    display: -webkit-inline-flex;
    display: inline-flex;
    align-items: center;
    margin: 0;
    padding: 0;
}

.u-icon {
    box-sizing: border-box;
}
</style>
