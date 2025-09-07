import { type ComponentPublicInstance, type ExtractPropTypes } from 'vue';

// 定义组件 Props
export const Props = {};

// 将 Props 转换为类型
export type Props = ExtractPropTypes<typeof Props>;

// 暴露的组件实例方法和属性
export type Expose = {};
// 导出组件实例类型
export type Instance = ComponentPublicInstance<Props, Expose>;
