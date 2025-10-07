<template>
    <view class="u-collapse" :style="$u.toStyle(customStyle)" :class="customClass">
        <slot />
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-collapse',
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
import { nextTick, onMounted, ref } from 'vue';
import { CollapseProps } from './types';
import { $u, useParent } from '../../';

/**
 * collapse 手风琴
 * @description 通过折叠面板收纳内容区域
 * @tutorial https://uviewpro.cn/zh/components/collapse.html
 * @property {Boolean} accordion 是否手风琴模式（默认true）
 * @property {Boolean} arrow 是否显示标题右侧的箭头（默认true）
 * @property {String} arrow-color 标题右侧箭头的颜色（默认#909399）
 * @property {Object} head-style 标题自定义样式，对象形式
 * @property {Object} body-style 主体自定义样式，对象形式
 * @property {String} hover-class 样式类名，按下时有效（默认u-hover-class）
 * @event {Function} change 当前激活面板展开时触发(如果是手风琴模式，参数activeNames类型为String，否则为Array)
 * @example <u-collapse></u-collapse>
 */
const props = defineProps(CollapseProps);
const emit = defineEmits(['change']);

// 使用通信库的父组件Hook
const { children, broadcast, getChildrenExposed } = useParent('u-collapse');

// 当前激活的面板 - 只在手风琴模式下使用
const activeName = ref<string | number>('');

onMounted(() => {
    nextTick(() => {
        // 初始化：收集所有open为true的项
        setTimeout(() => {
            initializeActiveName();
        }, 100);
    });
});

/**
 * 初始化activeName - 找到第一个open为true的项
 */
function initializeActiveName() {
    if (props.accordion) {
        // 手风琴模式下，取第一个open为true的项作为初始激活项
        const childrenExposed = getChildrenExposed();
        const openChild = childrenExposed.find(child => child.exposed.isShow === true);
        if (openChild) {
            activeName.value = openChild.exposed.itemName || '';
        }
    }
}

/**
 * collapse item被点击，由collapse item调用父组件方法
 */
function onChange(name: string | number) {
    if (props.accordion) {
        // 手风琴模式
        const childrenExposed = getChildrenExposed();
        const targetChild = childrenExposed.find(child => child.exposed.itemName === name);
        if (targetChild?.exposed.isShow.value === true) {
            // 目标项当前是展开状态，点击后要关闭它
            activeName.value = '';
            broadcast('closeAll', {});
        } else {
            // 目标项当前是关闭状态，点击后要展开它并关闭其他
            activeName.value = name;
            broadcast('openSingle', { targetName: name });
        }
    } else {
        // 非手风琴模式 - 只通知目标项切换状态
        broadcast('toggleSingle', { targetName: name });
    }

    // 收集当前所有展开的项
    let currentActiveNames: (string | number)[] = [];
    if (props.accordion) {
        currentActiveNames = activeName.value ? [activeName.value] : [];
    } else {
        // 对于非手风琴模式，我们不知道所有项的状态，所以这里不处理
        currentActiveNames = [];
    }

    emit('change', props.accordion ? activeName.value || '' : currentActiveNames);
}

/**
 * 设置激活的面板
 */
function setActiveNames(names: string | number | (string | number)[]) {
    if (props.accordion) {
        // 手风琴模式
        const name = Array.isArray(names) ? names[0] : names;
        activeName.value = name || '';
        if (name) {
            broadcast('openSingle', { targetName: name });
        } else {
            broadcast('closeAll', {});
        }
    } else {
        // 非手风琴模式
        const namesArray = Array.isArray(names) ? names : [names];
        broadcast('setMultiple', { targetNames: namesArray });
    }
}

/**
 * 打开所有面板
 */
function openAll() {
    if (props.accordion) {
        console.warn('手风琴模式下不能打开所有面板');
        return;
    }
    const childrenExposed = getChildrenExposed();
    const allNames = childrenExposed.map(child => child.exposed.itemName).filter(Boolean);
    broadcast('setMultiple', { targetNames: allNames });
}

/**
 * 关闭所有面板
 */
function closeAll() {
    broadcast('closeAll', {});
    if (props.accordion) {
        activeName.value = '';
    }
}

/**
 * 重新初始化，用于动态内容变化
 */
function init() {
    const childrenExposed = getChildrenExposed();
    childrenExposed.forEach(child => {
        if (child.exposed.init) {
            child.exposed.init();
        }
    });

    // 重新初始化activeName
    setTimeout(() => {
        initializeActiveName();
    }, 150);
}

// 使用defineExpose暴露给外部
defineExpose({
    // props
    props,

    // 状态
    activeName,

    // 方法
    onChange,
    setActiveNames,
    openAll,
    closeAll,
    init,

    // 计算属性
    childrenCount: () => children.length
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';
</style>
