// uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */

/**
 * 组件库 z-index 配置项类型定义
 */
export interface ZIndexConfig {
    toast: number;
    noNetwork: number;
    /** popup包含popup，actionsheet，keyboard，picker的值 */
    popup: number;
    mask: number;
    navbar: number;
    topTips: number;
    sticky: number;
    indexListSticky: number;
}

const zIndex: ZIndexConfig = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
};

export default zIndex;
