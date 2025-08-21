/**
 * 求两个颜色之间的渐变值
 * @param startColor 开始的颜色
 * @param endColor 结束的颜色
 * @param step 颜色等分的份额
 * @returns 渐变色数组
 */
function colorGradient(startColor: string = 'rgb(0, 0, 0)', endColor: string = 'rgb(255, 255, 255)', step: number = 10): string[] {
    const startRGB = hexToRgb(startColor, false) as [number, number, number]; // 转换为rgb数组模式
    const [startR, startG, startB] = startRGB;
    const endRGB = hexToRgb(endColor, false) as [number, number, number];
    const [endR, endG, endB] = endRGB;

    const sR = (endR - startR) / step; // 总差值
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr: string[] = [];
    for (let i = 0; i < step; i++) {
        // 计算每一步的hex值
        const hex = rgbToHex(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`);
        colorArr.push(hex as string);
    }
    return colorArr;
}

/**
 * 将hex表示方式转换为rgb表示方式(返回rgb数组或字符串)
 * @param sColor hex或rgb字符串
 * @param str 是否返回字符串
 * @returns rgb数组或字符串
 */
function hexToRgb(sColor: string, str: boolean = true): [number, number, number] | string {
    const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        // 处理六位的颜色值
        const sColorChange: [number, number, number] = [parseInt('0x' + sColor.slice(1, 3)), parseInt('0x' + sColor.slice(3, 5)), parseInt('0x' + sColor.slice(5, 7))];
        if (!str) {
            return sColorChange;
        } else {
            return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
        }
    } else if (/^(rgb|RGB)/.test(sColor)) {
        const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
        return arr.map(val => Number(val)) as [number, number, number];
    } else {
        return sColor;
    }
}

/**
 * rgb转hex
 * @param rgb rgb字符串或hex字符串
 * @returns hex字符串
 */
function rgbToHex(rgb: string): string | undefined {
    const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if (/^(rgb|RGB)/.test(rgb)) {
        const aColor = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
        let strHex = '#';
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            hex = hex.length == 1 ? '0' + hex : hex; // 保证每个rgb的值为2位
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = rgb;
        }
        return strHex;
    } else if (reg.test(rgb)) {
        const aNum = rgb.replace(/#/, '').split('');
        if (aNum.length === 6) {
            return rgb;
        } else if (aNum.length === 3) {
            let numHex = '#';
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += aNum[i] + aNum[i];
            }
            return numHex;
        }
    } else {
        return rgb;
    }
    // 默认返回原始值
    return rgb;
}

/**
 * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
 * @param color 十六进制色值或rgb字符串
 * @param alpha 透明度
 * @returns rgba字符串
 */
function colorToRgba(color: string, alpha: number = 0.3): string {
    color = rgbToHex(color) as string; // 确保是hex格式
    const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    let sColor = color.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        const sColorChange: [number, number, number] = [parseInt('0x' + sColor.slice(1, 3)), parseInt('0x' + sColor.slice(3, 5)), parseInt('0x' + sColor.slice(5, 7))];
        return `rgba(${sColorChange.join(',')},${alpha})`;
    } else {
        return sColor;
    }
}

export default {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
};
