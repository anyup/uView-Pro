// 此版本发布于2023-03-27
/**
 * 组件库配置项类型定义
 */
export interface ColorfulUniPlusConfig {
    /** 版本号 */
    v: string;
    /** 版本号（冗余字段） */
    version: string;
    /** 主题名称列表 */
    type: string[];
}

const version: string = '1.8.8';

const config: ColorfulUniPlusConfig = {
    v: version,
    version: version,
    // 主题名称
    type: ['primary', 'success', 'info', 'error', 'warning']
};

export default config;
