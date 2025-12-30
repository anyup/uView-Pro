import { reactive } from 'vue';
import { lightPalette } from './theme-tokens';
import type { ThemeColor } from '../../types/global';

// 使用 reactive 包装颜色对象，使其在运行时可被响应式读取与更新
// 这个对象会被 configProvider 在主题切换时更新
export const color = reactive<ThemeColor>({ ...lightPalette });

export default color;
