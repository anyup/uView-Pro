<template>
    <view class="u-dropdown-item" v-if="active" @touchmove.stop.prevent @tap.stop.prevent>
        <block v-if="!slots.default && !slots.$default">
            <scroll-view scroll-y="true" :style="{ height: $u.addUnit(height) }">
                <view class="u-dropdown-item__options">
                    <u-cell-group>
                        <u-cell-item
                            @click="cellClick(item.value)"
                            :arrow="false"
                            :title="item.label"
                            v-for="(item, index) in options"
                            :key="index"
                            :title-style="{ color: modelValue == item.value ? activeColor : inactiveColor }"
                        >
                            <u-icon v-if="modelValue == item.value" name="checkbox-mark" :color="activeColor" size="32"></u-icon>
                        </u-cell-item>
                    </u-cell-group>
                </view>
            </scroll-view>
        </block>
        <slot v-else />
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, getCurrentInstance, useSlots, watch } from 'vue';
import { $u } from '../..';
import { DropdownItemProps } from './types';

defineOptions({ name: 'u-dropdown-item' });

/**
 * dropdown-item 下拉菜单
 * @description 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景
 * @tutorial https://uviewpro.cn/zh/components/dropdown.html
 * @property {String | Number} v-model 双向绑定选项卡选择值
 * @property {String} title 菜单项标题
 * @property {Array[Object]} options 选项数据，如果传入了默认slot，此参数无效
 * @property {Boolean} disabled 是否禁用此选项卡（默认false）
 * @property {String | Number} duration 选项卡展开和收起的过渡时间，单位ms（默认300）
 * @property {String | Number} height 弹窗下拉内容的高度(内容超出将会滚动)（默认auto）
 * @example <u-dropdown-item title="标题"></u-dropdown-item>
 */

// props 定义
const props = defineProps(DropdownItemProps);

// emits 定义
const emit = defineEmits(['update:modelValue', 'change']);

// 插槽
const slots = useSlots();

// 当前项是否处于展开状态
const active = ref(false);
// 激活时左边文字和右边对勾图标的颜色
const activeColor = ref<string>('#2979ff');
// 未激活时左边文字和右边对勾图标的颜色
const inactiveColor = ref<string>('#606266');
// 父组件实例
const parent = ref<any>(null);

// 监听props变化，通知父组件重新初始化
const propsChange = computed(() => `${props.title}-${props.disabled}`);

// 监听propsChange变化，通知父组件重新init
watch(propsChange, () => {
    if (parent.value && parent.value.init) parent.value.init();
});

/**
 * 初始化本组件，注册到父组件
 */
function init() {
    // 获取父组件u-dropdown
    const instance = getCurrentInstance();
    if (!instance) return;
    const parentComp = $u.$parent('u-dropdown');
    if (parentComp && parentComp.proxy) {
        const parentProxy = parentComp.proxy as any;
        parent.value = parentComp;
        // 继承父组件的激活/未激活颜色
        activeColor.value = parentProxy.activeColor;
        inactiveColor.value = parentProxy.inactiveColor;
        // 注册到父组件children
        // 将本组件的this，放入到父组件的children数组中，让父组件可以操作本(子)组件的方法和属性
        // push进去前，显判断是否已经存在了本实例，因为在子组件内部数据变化时，会通过父组件重新初始化子组件
        const exist = parentComp?.exposed?.children.value.find((val: any) => val === instance);
        if (!exist) parentComp?.exposed?.children.value.push(instance);
        if (parentComp?.exposed?.children.value.length === 1) active.value = true;
        // 向父组件menuList注册本项
        // 父组件无法监听children的变化，故将子组件的title，传入父组件的menuList数组中
        parentComp?.exposed?.menuList.value.push({ title: props.title, disabled: props.disabled });
    }
}

/**
 * cell被点击
 * @param value 选中值
 */
function cellClick(value: string | number | any) {
    // 修改通过v-model绑定的值
    emit('update:modelValue', value);
    // 通知父组件(u-dropdown)收起菜单
    parent.value?.exposed?.close();
    // 发出事件，抛出当前勾选项的value
    emit('change', value);
}

function setActive(value: boolean) {
    active.value = value;
}

onMounted(() => {
    init();
});

defineExpose({ init, cellClick, setActive });
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';
</style>
