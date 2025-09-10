<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-cell-group title="读万卷书">
                    <u-cell-item
                        center
                        :is-link="true"
                        :label="label"
                        value="铁马冰河入梦来"
                        index="index"
                        @click="click"
                        :hover-class="hoverClass"
                        :arrow="arrow"
                        :title="title"
                        :icon="icon"
                    >
                        <template v-if="rightSlot === 'badge'" #right-icon>
                            <u-badge :absolute="false" count="105"></u-badge>
                        </template>
                        <template v-if="rightSlot === 'switch'" #right-icon>
                            <u-switch v-model="checked"></u-switch>
                        </template>
                    </u-cell-item>
                    <u-cell-item :border-bottom="false" title="铁马冰河入梦来" value="行万里路" :arrow="false">
                        <template #icon>
                            <u-icon size="34" name="calendar" style="margin-right: 5px"></u-icon>
                        </template>
                        <template #right-icon>
                            <u-icon size="34" name="calendar"></u-icon>
                        </template>
                        <template #value>
                            <u-field></u-field>
                        </template>
                    </u-cell-item>
                </u-cell-group>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">更换图标</view>
                <u-subsection :list="['是', '否']" @change="iconChange"></u-subsection>
            </view>
            <!-- 小程序无法动态切换slot -->
            <!-- #ifndef MP -->
            <view class="u-config-item">
                <view class="u-item-title">自定义右侧内容</view>
                <u-subsection :list="['文字', 'Switch组件', 'Badge组件']" @change="rightSlotChange"></u-subsection>
            </view>
            <!-- #endif -->
            <view class="u-config-item">
                <view class="u-item-title">描述信息</view>
                <u-subsection current="1" :list="['是', '否']" @change="labelChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">更换标题</view>
                <u-subsection :list="['是', '否']" @change="titleChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">右侧箭头</view>
                <u-subsection :list="['是', '否']" @change="arrowChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const icon = ref('setting');
const arrow = ref(true);
const label = ref('');
const title = ref('青山一道同云雨');
const rightSlot = ref('');
const checked = ref(false);

const hoverClass = computed<string>(() => {
    // 如果右侧是switch步进器组件的话，去掉cell的点击反馈，因为这个时候点击的反馈应该在switch上
    return rightSlot.value === 'switch' ? 'none' : 'u-cell-hover';
});

// 方法
function iconChange(index: number) {
    icon.value = index === 0 ? 'setting' : 'file-text';
}

function arrowChange(index: number) {
    arrow.value = index === 0 ? true : false;
}

function labelChange(index: number) {
    label.value = index === 0 ? '岂曰无衣，与子同裳' : '';
}

function titleChange(index: number) {
    title.value = index === 0 ? '青山一道同云雨' : '明月何曾是两乡';
}

function rightSlotChange(index: number) {
    rightSlot.value = index === 0 ? 'text' : index === 1 ? 'switch' : 'badge';
    if (index === 0) arrow.value = true;
    else arrow.value = false;
}

function click(index: any) {
    // console.log(index);
}
</script>

<style lang="scss" scoped>
.gab {
    background-color: rgb(245, 245, 245);
    height: 20rpx;
}

.wrap {
    height: 100vh;
    background-color: rgb(241, 241, 241);
}

.box {
    padding: 30rpx 00rpx;
    font-size: 28rpx;
    color: $u-type-info;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
