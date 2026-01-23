import { ref, computed } from 'vue';

interface ComponentStat {
    key: string;
    xp: number;
    visits: number;
    interactions: number;
    tasksCompleted: number;
    lastAction?: string;
    lastUpdated?: number;
}

interface ExperienceLog {
    message: string;
    timestamp: number;
}

interface AtlasNode {
    id: string;
    title: string;
    tip: string;
    threshold: number;
}

interface PersistedState {
    xp: number;
    totalInteractions: number;
    componentStats: Record<string, ComponentStat>;
    logs: ExperienceLog[];
}

const STORAGE_KEY = 'uview-experience-center';

const atlas: AtlasNode[] = [
    { id: 'start', title: '起步探索', tip: '完成任意组件的首次交互', threshold: 0 },
    { id: 'interact', title: '交互达人', tip: '累计体验值达到 200 点', threshold: 200 },
    { id: 'scene', title: '场景高手', tip: '累计体验值达到 500 点', threshold: 500 },
    { id: 'mentor', title: '体验导师', tip: '累计体验值达到 1000 点', threshold: 1000 },
    { id: 'master', title: '体验大师', tip: '累计体验值达到 2000 点', threshold: 2000 },
    { id: 'legend', title: '体验传说', tip: '累计体验值达到 5000 点', threshold: 5000 }
];

const xp = ref(0);
const totalInteractions = ref(0);
const componentStats = ref<Record<string, ComponentStat>>({});
const logs = ref<ExperienceLog[]>([]);
const lastGain = ref<{ amount: number; source: string; componentKey: string; timestamp: number } | null>(null);
let initialized = false;

function loadState() {
    if (initialized) return;
    initialized = true;
    try {
        if (typeof uni === 'undefined') return;
        const cache = uni.getStorageSync(STORAGE_KEY);
        if (cache) {
            const parsed = cache as PersistedState;
            xp.value = parsed.xp || 0;
            totalInteractions.value = parsed.totalInteractions || 0;
            componentStats.value = parsed.componentStats || {};
            logs.value = parsed.logs || [];
        }
    } catch (error) {
        console.warn('useExperienceCenter loadState error', error);
    }
}

function persistState() {
    try {
        if (typeof uni === 'undefined') return;
        const payload: PersistedState = {
            xp: xp.value,
            totalInteractions: totalInteractions.value,
            componentStats: componentStats.value,
            logs: logs.value
        };
        uni.setStorageSync(STORAGE_KEY, payload);
    } catch (error) {
        console.warn('useExperienceCenter persistState error', error);
    }
}

function ensureRegistered(key: string) {
    if (!componentStats.value[key]) {
        componentStats.value = {
            ...componentStats.value,
            [key]: {
                key,
                xp: 0,
                visits: 0,
                interactions: 0,
                tasksCompleted: 0
            }
        };
    }
}

export function useExperienceCenter() {
    loadState();

    const levelInfo = computed(() => {
        let current = atlas[0];
        for (const node of atlas) {
            if (xp.value >= node.threshold) {
                current = node;
            } else {
                break;
            }
        }
        return current;
    });

    const nextLevel = computed(() => {
        const currentIndex = atlas.findIndex(node => node.id === levelInfo.value.id);
        return atlas[currentIndex + 1] || null;
    });

    const levelProgress = computed(() => {
        const next = nextLevel.value;
        if (!next) {
            return 100;
        }
        const currentThreshold = levelInfo.value.threshold;
        const span = next.threshold - currentThreshold;
        if (span <= 0) return 100;
        return Math.min(100, Math.round(((xp.value - currentThreshold) / span) * 100));
    });

    const mapSteps = computed(() => {
        return atlas.map((node, index) => {
            const reached = xp.value >= node.threshold;
            const next = atlas[index + 1];
            let status: 'finish' | 'process' | 'wait' = 'wait';
            if (reached && (!next || xp.value >= next.threshold)) {
                status = 'finish';
            } else if (reached) {
                status = 'process';
            }
            return {
                ...node,
                status,
                percent:
                    status === 'process' && next
                        ? Math.min(
                              100,
                              Math.round(((xp.value - node.threshold) / (next.threshold - node.threshold)) * 100)
                          )
                        : status === 'finish'
                          ? 100
                          : 0
            };
        });
    });

    const recentLogs = computed(() => logs.value.slice(0, 6));

    const componentSummary = computed(() => {
        const keys = Object.keys(componentStats.value);
        const stats = keys.map(key => componentStats.value[key]);
        const tasksCompleted = stats.reduce((sum, item) => sum + item.tasksCompleted, 0);
        const totalXP = stats.reduce((sum, item) => sum + item.xp, 0);
        const mostActive = stats.sort((a, b) => b.xp - a.xp)[0];
        return {
            components: keys.length,
            tasksCompleted,
            totalXP,
            mostActive
        };
    });

    const registerComponent = (key: string) => {
        if (!key) return;
        ensureRegistered(key);
        componentStats.value[key] = {
            ...componentStats.value[key],
            visits: componentStats.value[key].visits + 1,
            lastUpdated: Date.now()
        };
        persistState();
    };

    const gainExperience = (
        componentKey: string,
        amount = 4,
        source = '交互体验',
        payload?: { type?: 'task' | 'interaction' }
    ) => {
        if (!componentKey || amount <= 0) return;
        ensureRegistered(componentKey);
        xp.value += amount;
        totalInteractions.value += 1;
        const stat = componentStats.value[componentKey];
        stat.xp += amount;
        stat.interactions += 1;
        if (payload?.type === 'task') {
            stat.tasksCompleted += 1;
        }
        stat.lastAction = source;
        stat.lastUpdated = Date.now();
        componentStats.value = {
            ...componentStats.value,
            [componentKey]: { ...stat }
        };
        const timestamp = Date.now();
        logs.value = [{ message: `${source} +${amount}XP`, timestamp }, ...logs.value].slice(0, 12);
        lastGain.value = { amount, source, componentKey, timestamp };
        persistState();
    };

    return {
        xp,
        totalInteractions,
        levelInfo,
        nextLevel,
        levelProgress,
        mapSteps,
        recentLogs,
        componentSummary,
        componentStats,
        lastGain,
        registerComponent,
        gainExperience
    };
}
