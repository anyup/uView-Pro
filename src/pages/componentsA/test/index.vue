<template>
    <u-form :model="form" ref="uForm">
        <u-form-item label="姓名">
            <u-input v-model="form.name" />
        </u-form-item>
        <u-form-item label="简介">
            <u-input v-model="form.intro" />
        </u-form-item>
        <u-form-item label="性别">
            <u-input v-model="form.sex" type="select" />
        </u-form-item>
        <u-form-item label="水果">
            <u-checkbox-group>
                <u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">
                    {{ item.name }}
                </u-checkbox>
            </u-checkbox-group>
        </u-form-item>
        <u-form-item label="味道">
            <u-radio-group v-model="radio">
                <u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
                    {{ item.name }}
                </u-radio>
            </u-radio-group>
        </u-form-item>
        <u-form-item label="开关">
            <template #right>
                <u-switch v-model="switchVal"></u-switch>
            </template>
        </u-form-item>
    </u-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
    name: '',
    intro: '',
    sex: ''
});

const checkboxList = ref([
    {
        name: '苹果',
        checked: false,
        disabled: false
    },
    {
        name: '雪梨',
        checked: false,
        disabled: false
    },
    {
        name: '柠檬',
        checked: false,
        disabled: false
    }
]);

const radioList = ref([
    {
        name: '鲜甜',
        disabled: false
    },
    {
        name: '麻辣',
        disabled: false
    }
]);

const radio = ref('');
const switchVal = ref(false);
</script>
