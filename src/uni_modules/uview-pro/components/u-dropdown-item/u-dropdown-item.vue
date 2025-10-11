<template>
    <view
        v-if="active"
        class="u-dropdown-item"
        :class="customClass"
        :style="$u.toStyle(customStyle)"
        @touchmove.stop.prevent
        @tap.stop.prevent
    >
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
                            <u-icon
                                v-if="modelValue == item.value"
                                name="checkbox-mark"
                                :color="activeColor"
                                size="32"
                            ></u-icon>
                        </u-cell-item>
                    </u-cell-group>
                </view>
            </scroll-view>
        </block>
        <slot v-else />
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-dropdown-item',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { ref, computed, useSlots, watch } from 'vue';
import { $u, useChildren } from '../..';
import { DropdownItemProps } from './types';

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

const { parentExposed, emitToParent } = useChildren('u-dropdown-item', 'u-dropdown');

// 当前项是否处于展开状态
const active = ref(false);
// 激活时左边文字和右边对勾图标的颜色
const activeColor = computed(() => parentExposed.value?.activeColor || $u.color.primary);
// 未激活时左边文字和右边对勾图标的颜色
const inactiveColor = computed(() => parentExposed.value?.inactiveColor || $u.color.contentColor);

// 监听props变化，通知父组件重新初始化
const propsChange = computed(() => `${props.title}-${props.disabled}`);

// 监听propsChange变化，通知父组件重新init
watch(propsChange, () => {
    emitToParent('init');
});

/**
 * cell被点击
 * @param value 选中值
 */
function cellClick(value: string | number | any) {
    // 修改通过v-model绑定的值
    emit('update:modelValue', value);
    // 通知父组件(u-dropdown)收起菜单
    emitToParent('close');
    // 发出事件，抛出当前勾选项的value
    emit('change', value);
}

function setActive(value: boolean) {
    active.value = value;
}

defineExpose({
    cellClick,
    setActive,
    props
});
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';
</style>
