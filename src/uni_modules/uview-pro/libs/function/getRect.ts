/**
 * 获取元素的位置信息
 * @param {any} selector 选择器
 * @param {boolean} all 是否获取所有匹配元素
 * @returns {Promise<any>} 返回一个 Promise，解析为元素的位置信息
 */

import { getCurrentInstance } from 'vue';

export default function (selector: any, _instance: any = null, all: boolean = false): Promise<any> {
    const instance = _instance || getCurrentInstance();
    return new Promise(resolve => {
        uni.createSelectorQuery()
            .in(instance?.proxy)
            [all ? 'selectAll' : 'select'](selector)
            .boundingClientRect((rect: any) => {
                if (all && Array.isArray(rect) && rect.length) {
                    resolve(rect);
                }
                if (!all && rect) {
                    resolve(rect);
                }
            })
            .exec();
    });
}
