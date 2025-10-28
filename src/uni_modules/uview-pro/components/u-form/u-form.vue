<template>
    <view class="u-form" :class="customClass" :style="$u.toStyle(customStyle)">
        <slot />
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-form',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { FormProps } from './types';
import { computed, ref } from 'vue';
import { $u, useParent } from '../..';

/**
 * form 表单
 * @description 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。
 * @tutorial https://uviewpro.cn/zh/components/form.html
 * @property {Object} model 表单数据对象
 * @property {Boolean} border-bottom 是否显示表单域的下划线边框
 * @property {String} label-position 表单域提示文字的位置，left-左侧，top-上方
 * @property {String Number} label-width 提示文字的宽度，单位rpx（默认90）
 * @property {Object} label-style label的样式，对象形式
 * @property {String} label-align label的对齐方式
 * @property {Object} rules 通过ref设置，见官网说明
 * @property {Array} error-type 错误的提示方式，数组形式，见上方说明(默认['message'])
 * @example <u-form :model="form" ref="uForm"></u-form>
 */

const props = defineProps(FormProps);

useParent('u-form');

interface ErrorItem {
    prop: string;
    message: string;
}

// 存储当前form下的所有u-form-item的实例
const fields = ref<any[]>([]);

// 校验规则
const rules = ref<Record<string, any>>(props.rules);

/**
 * 设置校验规则
 * @param newRules 校验规则对象
 */
function setRules(newRules: Record<string, any>) {
    rules.value = newRules;
}

/**
 * 清空所有u-form-item组件的内容，本质上是调用了u-form-item组件中的resetField()方法
 */
function resetFields() {
    fields.value.forEach((field: any) => {
        field.resetField && field.resetField();
    });
}

/**
 * 校验全部数据
 * @param callback 校验回调
 * @returns Promise<boolean>
 */
function validate(callback?: (valid: boolean, errorArr: ErrorItem[]) => void): Promise<boolean> {
    return new Promise(resolve => {
        // 对所有的u-form-item进行校验
        let valid = true; // 默认通过
        let count = 0; // 用于标记是否检查完毕
        let errorArr: ErrorItem[] = []; // 存放错误信息
        if (fields.value.length === 0) {
            resolve(true);
            if (typeof callback === 'function') callback(true, []);
            return;
        }
        // 调用每一个u-form-item实例的validation的校验方法
        fields.value.forEach((field: any) => {
            // 如果任意一个u-form-item校验不通过，就意味着整个表单不通过
            field.validation &&
                field.validation('', (error: any) => {
                    if (error) {
                        valid = false;
                        errorArr.push({ prop: field.prop, message: error });
                    }
                    // 当历遍了所有的u-form-item时，调用promise的then方法
                    if (++count === fields.value.length) {
                        resolve(valid); // 进入promise的then方法
                        // 判断是否设置了toast的提示方式，只提示最前面的表单域的第一个错误信息
                        if (
                            props.errorType.indexOf('none') === -1 &&
                            props.errorType.indexOf('toast') >= 0 &&
                            errorArr.length > 0
                        ) {
                            errorArr[0].message && $u.toast(errorArr[0].message);
                        }
                        // 调用回调方法
                        if (typeof callback === 'function') callback(valid, errorArr);
                    }
                });
        });
    });
}

defineExpose({
    setRules,
    resetFields,
    validate,
    addField(field: any) {
        if (!fields.value.includes(field)) fields.value.push(field);
    },
    removeField(field: any) {
        fields.value = fields.value.filter(f => f !== field);
    },
    fields,
    rules,
    props,
    model: computed(() => props.model)
});
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';
</style>
