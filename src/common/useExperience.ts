import { ref, computed, type Ref } from 'vue';
// @ts-ignore
import config from './demo-experience.config.json';
import { useExperienceCenter } from './useExperienceCenter';

export interface ExperienceTaskConfig {
    key: string;
    title: string;
    desc: string;
}

export interface ExperiencePageConfig {
    tasks?: ExperienceTaskConfig[];
}

export interface ExperienceTask extends ExperienceTaskConfig {
    done: boolean;
}

export interface Mission {
    id: string;
    title: string;
    desc: string;
    reward: number;
    componentKey: string;
    hint: string;
}

export const missionPool: Mission[] = [
    {
        id: 'image-shape',
        title: '体验图片组件形态',
        desc: '前往 Image 示例，切换一次圆形和方形展示，并完成一次状态切换。',
        reward: 25,
        componentKey: 'Image 图片',
        hint: 'Image 组件 - 任务体验'
    },
    {
        id: 'theme',
        title: '探索主题切换',
        desc: '在首页主题切换区体验至少 2 套不同主题，感受配色变化。',
        reward: 20,
        componentKey: 'Theme 主题',
        hint: '组件首页 - 主题按钮'
    },
    {
        id: 'slider-move',
        title: '体验滑块组件',
        desc: '前往 Slider 示例，拖动滑块并查看数值变化，完成一次完整交互。',
        reward: 30,
        componentKey: 'Slider 滑块',
        hint: 'Slider 组件 - 互动反馈'
    },
    {
        id: 'transition',
        title: '预览过渡动画',
        desc: '前往 Transition 示例，切换不同的动画效果，体验至少 3 种过渡动画。',
        reward: 35,
        componentKey: 'Transition 过渡',
        hint: 'Transition 组件 - 组件演示'
    },
    {
        id: 'button',
        title: '点击按钮组件',
        desc: '前往 Button 示例，点击不同主题按钮，并查看反馈效果，完成一次点击交互。',
        reward: 15,
        componentKey: 'Button 按钮',
        hint: 'Button 组件 - 组件演示'
    },
    {
        id: 'cell',
        title: '使用单元格导航',
        desc: '前往 Cell 示例，点击任意单元格进行导航，体验列表交互。',
        reward: 20,
        componentKey: 'Cell 单元格',
        hint: 'Cell 组件 - 组件演示'
    },
    {
        id: 'rate',
        title: '体验评分组件',
        desc: '前往 Rate 示例，进行评分操作，体验至少 3 次评分变化。',
        reward: 25,
        componentKey: 'Rate 评分',
        hint: 'Rate 组件 - 互动反馈'
    },
    {
        id: 'popup',
        title: '打开弹出层',
        desc: '前往 Popup 示例，打开至少 2 个不同方向的弹出层，体验弹出效果。',
        reward: 30,
        componentKey: 'Popup 弹出层',
        hint: 'Popup 组件 - 组件演示'
    },
    {
        id: 'form',
        title: '提交表单数据',
        desc: '前往 Form 示例，填写表单并提交，完成一次表单交互。',
        reward: 40,
        componentKey: 'Form 表单',
        hint: 'Form 组件 - 组件演示'
    },
    {
        id: 'tabs',
        title: '切换标签页',
        desc: '前往 Tabs 示例，切换至少 3 个不同的标签页，体验标签切换。',
        reward: 20,
        componentKey: 'Tabs 标签页',
        hint: 'Tabs 组件 - 组件演示'
    },
    {
        id: 'template',
        title: '浏览模板场景',
        desc: '打开模板示例页，浏览任意一个模板详情，了解组件组合用法。',
        reward: 25,
        componentKey: 'Template 模板',
        hint: '模板示例 - 场景浏览'
    },
    {
        id: 'tools',
        title: '浏览工具场景',
        desc: '在体验地图页面查看自己的等级和统计数据，了解体验进度。',
        reward: 15,
        componentKey: 'Tools 工具',
        hint: '工具示例 - 场景浏览'
    }
];

interface ExperienceState {
    tasks: Ref<ExperienceTask[]>;
    logs: Ref<string[]>;
}

type ExperienceConfigMap = Record<string, ExperiencePageConfig>;

const experienceConfig = config as ExperienceConfigMap;
const stateMap: Record<string, ExperienceState> = {};

function createInitialTasks(pageKey: string): ExperienceTask[] {
    const pageConfig = experienceConfig[pageKey];
    const tasks = pageConfig?.tasks || [];
    return tasks.map(task => ({
        ...task,
        done: false
    }));
}

function getStorageKeys(pageKey: string) {
    const base = `uview-demo-experience-${pageKey}`;
    return {
        task: `${base}-tasks`,
        log: `${base}-logs`
    };
}

function restoreState(pageKey: string): ExperienceState {
    const tasks = ref<ExperienceTask[]>(createInitialTasks(pageKey));
    const logs = ref<string[]>([]);

    try {
        if (typeof uni !== 'undefined') {
            const keys = getStorageKeys(pageKey);
            const taskCache = uni.getStorageSync(keys.task);
            const logCache = uni.getStorageSync(keys.log);
            if (Array.isArray(taskCache) && taskCache.length) {
                tasks.value = taskCache as ExperienceTask[];
            }
            if (Array.isArray(logCache)) {
                logs.value = logCache as string[];
            }
        }
    } catch (error) {
        console.warn('restoreState error', error);
    }

    return { tasks, logs };
}

function persistState(pageKey: string, state: ExperienceState) {
    try {
        if (typeof uni === 'undefined') return;
        const keys = getStorageKeys(pageKey);
        uni.setStorageSync(keys.task, state.tasks.value);
        uni.setStorageSync(keys.log, state.logs.value);
    } catch (error) {
        console.warn('persistState error', error);
    }
}

export function useExperience(pageKey: string) {
    if (!stateMap[pageKey]) {
        stateMap[pageKey] = restoreState(pageKey);
    }
    const state = stateMap[pageKey];
    const center = useExperienceCenter();
    center.registerComponent(pageKey);

    const taskProgress = computed(() => {
        if (!state.tasks.value.length) return 0;
        const finished = state.tasks.value.filter(task => task.done).length;
        return Math.round((finished / state.tasks.value.length) * 100);
    });

    const completeTask = (key: string, xpBonus = 12) => {
        const task = state.tasks.value.find(item => item.key === key);
        if (task && !task.done) {
            task.done = true;
            persistState(pageKey, state);
            center.gainExperience(pageKey, xpBonus, `完成任务 · ${task.title}`, { type: 'task' });
        }
    };

    const toggleTask = (index: number, value: boolean) => {
        if (!state.tasks.value[index]) return;
        state.tasks.value[index].done = value;
        persistState(pageKey, state);
    };

    const recordAction = (message: string, xpBonus = 4) => {
        const date = new Date();
        const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        state.logs.value.unshift(`${time} · ${message}`);
        state.logs.value = state.logs.value.slice(0, 6);
        persistState(pageKey, state);
        if (typeof uni !== 'undefined' && typeof uni.vibrateShort === 'function') {
            uni.vibrateShort();
        }
        center.gainExperience(pageKey, xpBonus, message, { type: 'interaction' });
    };

    const resetExperience = () => {
        state.tasks.value = createInitialTasks(pageKey);
        state.logs.value = [];
        persistState(pageKey, state);
    };

    return {
        tasks: state.tasks,
        logs: state.logs,
        taskProgress,
        completeTask,
        toggleTask,
        recordAction,
        resetExperience
    };
}

// 任务领取状态管理
const MISSION_STORAGE_KEY = 'uview-experience-assigned-missions';
const COMPLETED_MISSIONS_KEY = 'uview-experience-completed-missions';
const assignedMissionIds = ref<string[]>([]);
const completedMissionIds = ref<string[]>([]); // 已完成但未领取积分的任务

// 加载已领取的任务
function loadAssignedMissions() {
    try {
        if (typeof uni === 'undefined') return;
        const cache = uni.getStorageSync(MISSION_STORAGE_KEY);
        if (Array.isArray(cache)) {
            assignedMissionIds.value = cache;
        }
    } catch (error) {
        console.warn('loadAssignedMissions error', error);
    }
}

// 保存已领取的任务
function saveAssignedMissions() {
    try {
        if (typeof uni === 'undefined') return;
        uni.setStorageSync(MISSION_STORAGE_KEY, assignedMissionIds.value);
    } catch (error) {
        console.warn('saveAssignedMissions error', error);
    }
}

// 加载已完成的任务
function loadCompletedMissions() {
    try {
        if (typeof uni === 'undefined') return;
        const cache = uni.getStorageSync(COMPLETED_MISSIONS_KEY);
        if (Array.isArray(cache)) {
            completedMissionIds.value = cache;
        }
    } catch (error) {
        console.warn('loadCompletedMissions error', error);
    }
}

// 保存已完成的任务
function saveCompletedMissions() {
    try {
        if (typeof uni === 'undefined') return;
        uni.setStorageSync(COMPLETED_MISSIONS_KEY, completedMissionIds.value);
    } catch (error) {
        console.warn('saveCompletedMissions error', error);
    }
}

// 初始化时加载
loadAssignedMissions();
loadCompletedMissions();

/**
 * 取消任务（从已领取列表中移除）
 * @param missionId 任务ID
 * @returns 是否成功取消任务
 */
export function unassignMission(missionId: string): boolean {
    if (!assignedMissionIds.value.includes(missionId)) {
        return false;
    }

    assignedMissionIds.value = assignedMissionIds.value.filter(id => id !== missionId);
    saveAssignedMissions();
    return true;
}

/**
 * 领取任务
 * @param missionId 任务ID
 * @param force 是否强制领取（如果任务已领取，先取消再领取）
 * @returns 是否成功领取任务
 */
export function assignMission(missionId: string, force = false): boolean {
    const mission = missionPool.find(m => m.id === missionId);
    if (!mission) {
        console.warn(`Mission not found: ${missionId}`);
        return false;
    }

    // 如果任务已经领取且不强制，返回 false
    if (assignedMissionIds.value.includes(missionId) && !force) {
        return false;
    }

    // 如果强制领取且任务已存在，先移除
    if (force && assignedMissionIds.value.includes(missionId)) {
        assignedMissionIds.value = assignedMissionIds.value.filter(id => id !== missionId);
    }

    // 添加任务到已领取列表
    assignedMissionIds.value.push(missionId);
    saveAssignedMissions();
    return true;
}

/**
 * 完成任务（通过任务ID）- 只标记为完成，不直接给积分
 * @param missionId 任务ID
 * @returns 是否成功完成任务
 */
export function completeMission(missionId: string): boolean {
    const mission = missionPool.find(m => m.id === missionId);
    if (!mission) {
        console.warn(`Mission not found: ${missionId}`);
        return false;
    }

    // 检查任务是否已领取
    if (!assignedMissionIds.value.includes(missionId)) {
        console.warn(`Mission not assigned: ${missionId}`);
        return false;
    }

    // 如果任务已经完成，不再重复完成
    if (completedMissionIds.value.includes(missionId)) {
        return false;
    }

    // 标记任务为已完成（但未领取积分）
    completedMissionIds.value.push(missionId);
    saveCompletedMissions();

    if (typeof uni !== 'undefined') {
        uni.showToast({ title: '任务已完成，请前往体验地图领取积分', icon: 'success', duration: 2000 });
    }

    return true;
}

/**
 * 领取任务积分（在体验地图中调用）
 * @param missionId 任务ID
 * @returns 是否成功领取积分
 */
export function claimMissionReward(missionId: string): boolean {
    const mission = missionPool.find(m => m.id === missionId);
    if (!mission) {
        console.warn(`Mission not found: ${missionId}`);
        return false;
    }

    // 检查任务是否已完成
    if (!completedMissionIds.value.includes(missionId)) {
        console.warn(`Mission not completed: ${missionId}`);
        if (typeof uni !== 'undefined') {
            uni.showToast({ title: '任务尚未完成', icon: 'none' });
        }
        return false;
    }

    // 发放积分
    const center = useExperienceCenter();
    center.gainExperience(mission.componentKey, mission.reward, `体验任务 · ${mission.title}`, { type: 'task' });

    if (typeof uni !== 'undefined') {
        uni.showToast({ title: `领取积分 +${mission.reward}XP`, icon: 'success' });
    }

    // 从已完成列表中移除（已领取积分）
    completedMissionIds.value = completedMissionIds.value.filter(id => id !== missionId);
    saveCompletedMissions();

    // 从已领取列表中移除
    assignedMissionIds.value = assignedMissionIds.value.filter(id => id !== missionId);
    saveAssignedMissions();

    return true;
}

/**
 * 获取已领取的任务ID列表
 */
export function getAssignedMissionIds(): string[] {
    return [...assignedMissionIds.value];
}

/**
 * 获取已完成但未领取积分的任务ID列表
 */
export function getCompletedMissionIds(): string[] {
    return [...completedMissionIds.value];
}

/**
 * 检查任务是否已领取
 */
export function isMissionAssigned(missionId: string): boolean {
    return assignedMissionIds.value.includes(missionId);
}

/**
 * 检查任务是否已完成（但未领取积分）
 */
export function isMissionCompleted(missionId: string): boolean {
    return completedMissionIds.value.includes(missionId);
}
