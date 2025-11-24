<template>
    <demo-page
        title="Select 选择器"
        desc="用于单列、多列独立、多列联动等多种选择场景，支持灵活数据结构和交互。"
        :apis="'select'"
    >
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <u-select
                            @click="show = true"
                            :default-value="defaultValue"
                            :mode="mode"
                            v-model="show"
                            :list="list"
                            @confirm="confirm"
                            @cancel="cancel"
                        ></u-select>
                        <view class="u-demo-result-line">select值：{{ result }}</view>
                    </view>
                </view>
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom">参数配置</view>
                    <view class="u-config-item">
                        <view class="u-item-title">状态</view>
                        <u-subsection :current="current" :list="['打开', '收起']" @change="statusChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">模式</view>
                        <u-subsection :list="['单列', '多列独立', '多列联动']" @change="modeChange"></u-subsection>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import type { SelectMode } from '@/uni_modules/uview-pro/types/global';

const show = ref(false);
const result = ref('尚未选择');
const defaultValue = ref([3]);
const mode = ref<SelectMode>('single-column');
const list = ref([]);
const list1 = [
    {
        value: '江',
        label: '江'
    },
    {
        value: '湖',
        label: '湖'
    },
    {
        value: '夜',
        label: '夜'
    },
    {
        value: '雨',
        label: '雨'
    },
    {
        value: '十',
        label: '十'
    },
    {
        value: '年',
        label: '年'
    },
    {
        value: '灯',
        label: '灯'
    }
];
const list2 = [
    [
        {
            value: '昔',
            label: '昔'
        },
        {
            value: '去',
            label: '去'
        },
        {
            value: '雪',
            label: '雪'
        },
        {
            value: '如',
            label: '如'
        },
        {
            value: '花',
            label: '花'
        }
    ],
    [
        {
            value: '今',
            label: '今'
        }
    ]
];
const list3 = [
    {
        label: '中国',
        value: '1',
        children: [
            {
                label: '山东',
                value: '11',
                children: [
                    {
                        label: '青岛',
                        value: '111'
                    },
                    {
                        label: '济南',
                        value: '112'
                    },
                    {
                        label: '烟台',
                        value: '113'
                    }
                ]
            },
            {
                label: '广东',
                value: '12',
                children: [
                    {
                        label: '深圳',
                        value: '121'
                    },
                    {
                        label: '惠州',
                        value: '122'
                    },
                    {
                        label: '清远',
                        value: '123'
                    }
                ]
            }
        ]
    },
    {
        label: '美国',
        value: '2',
        children: [
            {
                label: '纽约',
                value: '21',
                children: [
                    {
                        label: '布朗克斯区',
                        value: '211'
                    },
                    {
                        label: '布鲁克林区',
                        value: '212'
                    },
                    {
                        label: '曼哈顿',
                        value: '213'
                    },
                    {
                        label: '皇后区',
                        value: '214'
                    },
                    {
                        label: '斯塔滕岛',
                        value: '215'
                    }
                ]
            }
        ]
    }
];

onLoad(() => {
    list.value = list1;
});

const current = computed(() => {
    return show.value ? 0 : 1;
});

function statusChange(index: number) {
    show.value = !index;
}

function modeChange(index: number) {
    let type: SelectMode[] = ['single-column', 'mutil-column', 'mutil-column-auto'];
    mode.value = type[index];
    list.value = index == 0 ? list1 : index == 1 ? list2 : list3;
    show.value = true;
}

function confirm(e) {
    result.value = '';
    e.map((val, index) => {
        result.value += result.value == '' ? val.label : '-' + val.label;
    });
}

function cancel(e) {
    console.log(e);
}
</script>

<style scoped lang="scss">
.badge-button {
    padding: 4rpx 6rpx;
    background-color: $u-type-error;
    color: #fff;
    border-radius: 10rpx;
    font-size: 22rpx;
    line-height: 1;
}
</style>
