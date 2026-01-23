<template>
    <demo-page hide-tabs title="待办事项" desc="记录你的任务，完成它们，并保持组织。" :nav-back="true">
        <view class="todo-container">
            <!-- 统计卡片 -->
            <view class="stats-card">
                <view class="stat-item">
                    <view class="stat-value">{{ totalCount }}</view>
                    <view class="stat-label">全部</view>
                </view>
                <view class="stat-item">
                    <view class="stat-value">{{ pendingCount }}</view>
                    <view class="stat-label">待完成</view>
                </view>
                <view class="stat-item">
                    <view class="stat-value">{{ completedCount }}</view>
                    <view class="stat-label">已完成</view>
                </view>
            </view>

            <!-- 添加任务 -->
            <view class="add-section">
                <u-search
                    v-model="newTaskText"
                    placeholder="添加新的待办事项..."
                    :show-action="true"
                    search-icon="order"
                    action-text="添加"
                    @custom="addTask"
                    @search="addTask"
                    shape="round"
                ></u-search>
            </view>

            <!-- 筛选标签 -->
            <view class="filter-section">
                <u-subsection
                    :list="filterOptions"
                    :current="currentFilter"
                    @change="changeFilter"
                    active-color="var(--u-type-primary)"
                ></u-subsection>
            </view>

            <!-- 任务列表 -->
            <view class="task-list">
                <view v-if="filteredTasks.length === 0" class="empty-state">
                    <u-empty mode="data" text="暂无待办事项" :show-empty="true"></u-empty>
                </view>

                <view v-for="task in filteredTasks" :key="task.id" class="task-item">
                    <view class="task-content" @click="toggleTask(task.id)">
                        <u-checkbox
                            v-model="task.completed"
                            @change="toggleTask(task.id)"
                            shape="circle"
                            active-color="var(--u-type-primary)"
                        ></u-checkbox>
                        <view class="task-text" :class="{ completed: task.completed }">
                            <text>{{ task.text }}</text>
                            <view v-if="task.completed" class="completed-line"></view>
                        </view>
                    </view>
                    <view class="task-actions">
                        <u-icon
                            name="trash"
                            size="40"
                            color="var(--u-type-error)"
                            @click="deleteTask(task.id)"
                        ></u-icon>
                    </view>
                </view>
            </view>

            <!-- 底部操作栏 -->
            <view v-if="completedCount > 0" class="bottom-actions">
                <u-button type="error" size="mini" plain @click="clearCompleted">清除已完成</u-button>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

interface TodoTask {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
}

const STORAGE_KEY = 'uview-todo-list';

const tasks = ref<TodoTask[]>([]);
const newTaskText = ref('');
const currentFilter = ref(0);
const filterOptions = ['全部', '待完成', '已完成'];

// 统计数据
const totalCount = computed(() => tasks.value.length);
const pendingCount = computed(() => tasks.value.filter(t => !t.completed).length);
const completedCount = computed(() => tasks.value.filter(t => t.completed).length);

// 筛选后的任务列表
const filteredTasks = computed(() => {
    if (currentFilter.value === 0) {
        return tasks.value.sort((a, b) => b.createdAt - a.createdAt);
    } else if (currentFilter.value === 1) {
        return tasks.value.filter(t => !t.completed).sort((a, b) => b.createdAt - a.createdAt);
    } else {
        return tasks.value.filter(t => t.completed).sort((a, b) => b.createdAt - a.createdAt);
    }
});

// 加载任务
function loadTasks() {
    try {
        const stored = uni.getStorageSync(STORAGE_KEY);
        if (stored && Array.isArray(stored)) {
            tasks.value = stored;
        }
    } catch (error) {
        console.warn('loadTasks error', error);
    }
}

// 保存任务
function saveTasks() {
    try {
        uni.setStorageSync(STORAGE_KEY, tasks.value);
    } catch (error) {
        console.warn('saveTasks error', error);
    }
}

// 添加任务
function addTask() {
    const text = newTaskText.value.trim();
    if (!text) {
        $u.toast('请输入待办事项', 'warning');
        return;
    }

    const newTask: TodoTask = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        text,
        completed: false,
        createdAt: Date.now()
    };

    tasks.value.unshift(newTask);
    saveTasks();
    newTaskText.value = '';
    $u.toast('添加成功', 'success');
}

// 切换任务状态
function toggleTask(id: string) {
    const task = tasks.value.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
    }
}

// 删除任务
function deleteTask(id: string) {
    uni.showModal({
        title: '确认删除',
        content: '确定要删除这个待办事项吗？',
        success: res => {
            if (res.confirm) {
                tasks.value = tasks.value.filter(t => t.id !== id);
                saveTasks();
                $u.toast('删除成功', 'success');
            }
        }
    });
}

// 清除已完成
function clearCompleted() {
    uni.showModal({
        title: '确认清除',
        content: `确定要清除 ${completedCount.value} 个已完成的任务吗？`,
        success: res => {
            if (res.confirm) {
                tasks.value = tasks.value.filter(t => !t.completed);
                saveTasks();
                $u.toast('清除成功', 'success');
            }
        }
    });
}

// 切换筛选
function changeFilter(index: number) {
    currentFilter.value = index;
}

onMounted(() => {
    loadTasks();
});
</script>

<style lang="scss" scoped>
.todo-container {
    padding: 24rpx;
    min-height: 100vh;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.02) 0%, transparent 100%);
}

.stats-card {
    display: flex;
    gap: 20rpx;
    margin-bottom: 30rpx;
    padding: 30rpx;
    background: linear-gradient(135deg, rgba(41, 121, 255, 0.1), rgba(25, 190, 107, 0.1));
    border-radius: 20rpx;
    box-shadow: 0 8rpx 24rpx rgba(41, 121, 255, 0.1);

    .stat-item {
        flex: 1;
        text-align: center;

        .stat-value {
            font-size: 48rpx;
            font-weight: 700;
            color: var(--u-type-primary);
            margin-bottom: 8rpx;
        }

        .stat-label {
            font-size: 24rpx;
            color: var(--u-content-color);
        }
    }
}

.add-section {
    margin-bottom: 24rpx;
}

.filter-section {
    margin-bottom: 24rpx;
}

.task-list {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}

.task-item {
    display: flex;
    align-items: center;
    padding: 24rpx;
    background: var(--u-bg-color);
    border-radius: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.98);
    }
}

.task-content {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 20rpx;
}

.task-text {
    flex: 1;
    font-size: 28rpx;
    color: var(--u-main-color);
    position: relative;

    &.completed {
        color: var(--u-tips-color);
    }

    .completed-line {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2rpx;
        background: var(--u-tips-color);
        transform: translateY(-50%);
    }
}

.task-actions {
    padding: 8rpx;
}

.empty-state {
    padding: 100rpx 0;
}

.bottom-actions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24rpx;
    background: var(--u-bg-color);
    border-top: 1rpx solid var(--u-border-color);
    box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.05);
}
</style>
