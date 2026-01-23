import { useI18n } from 'vue-i18n';

/**
 * 生成随机背景颜色
 */
export function getRandomColor(): string {
    const colors = [
        '#39b54a', // green
        '#f39c12', // orange
        '#3498db', // blue
        '#e74c3c', // red
        '#9b59b6', // purple
        '#16a085', // teal
        '#e67e22', // carrot
        '#2ecc71', // emerald
        '#1abc9c', // turquoise
        '#34495e', // wet asphalt
        '#2980b9',
        '#8e44ad',
        '#2c3e50',
        '#c0392b',
        '#d35400',
        '#27ae60',
        '#f1c40f',
        '#7f8c8d',
        '#e84393',
        '#00b894',
        '#fdcb6e',
        '#6c5ce7',
        '#0984e3',
        '#00cec9',
        '#fab1a0',
        '#ff7675',
        '#55efc4'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
