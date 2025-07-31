/**
 * 生成指定范围的随机整数
 * @param min 最小值（包含）
 * @param max 最大值（包含）
 * @returns 随机整数
 */
function random(min: number, max: number): number {
    if (min >= 0 && max > 0 && max >= min) {
        const gab = max - min + 1;
        return Math.floor(Math.random() * gab + min);
    } else {
        return 0;
    }
}

export default random;
