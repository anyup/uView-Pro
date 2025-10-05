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
import { nextTick, onMounted, ref, watch } from 'vue';
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

// 使用父组件Hook，传入props
const { parentName, children, broadcast, getChildren, refreshChildren, expose, updateExposed } = useParent(
    'u-collapse',
    props
);

// 当前激活的面板 - 只在手风琴模式下使用
const activeName = ref<string | number>('');

onMounted(() => {
    nextTick(() => {
        refreshChildren();
        // 初始化：收集所有open为true的项
        setTimeout(() => {
            initializeActiveName();
        }, 100);
    });
});

// 监听props变化，实时更新exposed内容
watch(
    props,
    newProps => {
        updateExposed({ props: newProps });
    },
    { deep: true }
);

/**
 * 初始化activeName - 找到第一个open为true的项
 */
function initializeActiveName() {
    const openItems = children.filter(child => child.data?.isShow === true);
    if (openItems.length > 0 && props.accordion) {
        // 手风琴模式下，取第一个open为true的项作为初始激活项
        activeName.value = openItems[0].data?.name || '';
    }
}

/**
 * collapse item被点击，由collapse item调用父组件方法
 */
function onChange(name: string | number) {
    if (props.accordion) {
        // 手风琴模式 - 关键修复：使用当前子组件的状态来判断
        const targetChild = children.find(child => child.data?.name === name);
        const isTargetCurrentlyOpen = targetChild?.data?.isShow === true;
        if (isTargetCurrentlyOpen) {
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
    const allNames = children.map(child => child.data?.name).filter(Boolean);
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
    children.forEach((child: any) => {
        if (child.componentInstance && child.componentInstance.exposed && child.componentInstance.exposed.init) {
            child.componentInstance.exposed.init();
        }
    });

    // 重新初始化activeName
    setTimeout(() => {
        initializeActiveName();
    }, 150);
}

// 暴露给子组件的内容
const exposedContent = {
    // props (会在watch中自动更新)
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
    childrenCount: () => children.length,

    // 工具方法
    refreshChildren
};

// 使用defineExpose暴露给外部
defineExpose(exposedContent);

// 使用通信库的expose方法暴露给子组件
expose(exposedContent);
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';
</style>
