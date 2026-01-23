<template>
    <demo-page hide-tabs show-wx-tips nav-title="新增地址">
        <view class="wrap">
            <view class="top">
                <view class="item">
                    <view class="left">收货人</view>
                    <input v-model="form.name" type="text" placeholder-class="line" placeholder="请填写收货人姓名" />
                </view>
                <view class="item">
                    <view class="left">手机号码</view>
                    <input v-model="form.phone" type="text" placeholder-class="line" placeholder="请填写收货人手机号" />
                </view>
                <view class="item" @click="showRegionPicker">
                    <view class="left">所在地区</view>
                    <u-input
                        type="select"
                        v-model="form.region"
                        readonly
                        placeholder="省市区县、乡镇等"
                        @click="showRegionPicker"
                    ></u-input>
                </view>
                <view class="item address">
                    <view class="left">详细地址</view>
                    <textarea v-model="form.detail" type="text" placeholder-class="line" placeholder="街道、楼牌等" />
                </view>
                <!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
            </view>
            <view class="bottom">
                <view class="tag">
                    <view class="left">标签</view>
                    <view class="right">
                        <text
                            v-for="tag in tagOptions"
                            :key="tag"
                            class="tags"
                            :class="{ active: form.tags.includes(tag) }"
                            @click="toggleTag(tag)"
                        >
                            {{ tag }}
                        </text>
                        <view class="tags plus" @click="startAddTag"><u-icon size="22" name="plus"></u-icon></view>
                    </view>
                </view>
                <view v-if="editingTag" class="tag-input">
                    <input
                        v-model="newTag"
                        type="text"
                        placeholder-class="line"
                        placeholder="请输入标签名称"
                        confirm-type="done"
                        @confirm="addTag"
                    />
                    <view class="tag-input-actions">
                        <u-button size="mini" type="primary" @click="addTag">添加</u-button>
                        <u-button size="mini" type="info" plain @click="cancelAddTag">取消</u-button>
                    </view>
                </view>
                <view class="default">
                    <view class="left">
                        <view class="set">设置默认地址</view>
                        <view class="tips">提醒：每次下单会默认推荐该地址</view>
                    </view>
                    <view class="right">
                        <switch color="var(--u-type-primary)" :checked="form.isDefault" @change="setDefault" />
                    </view>
                </view>
            </view>
            <view class="option">
                <u-button type="primary" shape="circle" @click="submit">提交</u-button>
            </view>
            <u-picker mode="region" ref="uPicker" v-model="show" @confirm="confirm" />
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';

const STORAGE_KEY = 'uview-address-list';

const tagOptions = ref<string[]>(['家', '公司', '学校']);
const form = ref({
    id: '',
    name: '',
    phone: '',
    region: '',
    detail: '',
    isDefault: false,
    tags: [] as string[]
});

// 地区选择器显示状态
const show = ref(false);

// 当前是否展示新增标签输入框
const editingTag = ref(false);
const newTag = ref('');

function syncTagOptions(extraTags: string[] = []) {
    extraTags.forEach(tag => {
        const value = tag.trim();
        if (value && !tagOptions.value.includes(value)) {
            tagOptions.value.push(value);
        }
    });
}

function loadAddress(id: string) {
    try {
        const list = uni.getStorageSync(STORAGE_KEY) || [];
        const target = Array.isArray(list) ? list.find((item: any) => item.id === id) : null;
        if (target) {
            form.value = {
                id: target.id,
                name: target.name,
                phone: target.phone,
                region: target.region,
                detail: target.detail,
                isDefault: !!target.isDefault,
                tags: target.tags || []
            };
            syncTagOptions(form.value.tags);
        }
    } catch (error) {
        console.warn('loadAddress error', error);
    }
}

function setDefault() {
    form.value.isDefault = !form.value.isDefault;
}

function showRegionPicker() {
    show.value = true;
}
function confirm(e: any) {
    form.value.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
}

function toggleTag(tag: string) {
    const exists = form.value.tags.includes(tag);
    // 单选：选中则取消，未选中则仅保留当前标签
    form.value.tags = exists ? [] : [tag];
}

function startAddTag() {
    editingTag.value = true;
    newTag.value = '';
}

function cancelAddTag() {
    editingTag.value = false;
    newTag.value = '';
}

function addTag() {
    const value = newTag.value.trim();
    if (!value) {
        $u.toast('请输入标签名称');
        return;
    }
    if (tagOptions.value.includes(value)) {
        form.value.tags = form.value.tags.includes(value) ? [] : [value];
        editingTag.value = false;
        newTag.value = '';
        return;
    }
    tagOptions.value.push(value);
    // 新增即选中（单选）
    form.value.tags = [value];
    editingTag.value = false;
    newTag.value = '';
}

function validate() {
    if (!form.value.name.trim()) {
        $u.toast('请填写收货人姓名');
        return false;
    }
    if (!form.value.phone.trim()) {
        $u.toast('请填写手机号');
        return false;
    }
    if (!$u.test.mobile(form.value.phone)) {
        $u.toast('手机号格式不正确');
        return false;
    }
    if (!form.value.region.trim()) {
        $u.toast('请选择地区');
        return false;
    }
    if (!form.value.detail.trim()) {
        $u.toast('请填写详细地址');
        return false;
    }
    return true;
}

function submit() {
    if (!validate()) return;
    try {
        const list = (uni.getStorageSync(STORAGE_KEY) || []) as any[];
        let result = Array.isArray(list) ? [...list] : [];
        if (form.value.isDefault) {
            result = result.map(item => ({ ...item, isDefault: false }));
        }
        if (form.value.id) {
            const idx = result.findIndex(item => item.id === form.value.id);
            if (idx !== -1) {
                result[idx] = { ...result[idx], ...form.value };
            }
        } else {
            const newItem = { ...form.value, id: Date.now().toString() };
            result.unshift(newItem);
        }
        uni.setStorageSync(STORAGE_KEY, result);
        $u.toast('保存成功', 'success');
        setTimeout(() => uni.navigateBack(), 300);
    } catch (error) {
        console.warn('save address error', error);
        $u.toast('保存失败', 'error');
    }
}

onLoad((options: any) => {
    if (options && options.id) {
        loadAddress(options.id);
    }
});
</script>

<style lang="scss" scoped>
::v-deep .line {
    color: $u-light-color;
    font-size: 28rpx;
}
.wrap {
    .top {
        background-color: $u-bg-white;
        border-top: solid 2rpx $u-border-color;
        padding: 22rpx;
        .item {
            display: flex;
            font-size: 32rpx;
            min-height: 100rpx;
            align-items: center;
            border-bottom: solid 2rpx $u-border-color;
            .left {
                width: 180rpx;
            }
            input {
                text-align: left;
            }
        }

        .address {
            padding: 20rpx 0;
            textarea {
                // width: 100%;
                height: 150rpx;
                background-color: $u-bg-color;
                line-height: 60rpx;
                margin: 40rpx auto;
                padding: 20rpx;
            }
        }
        .site-clipboard {
            padding-right: 40rpx;
            textarea {
                // width: 100%;
                height: 150rpx;
                background-color: $u-bg-color;
                line-height: 60rpx;
                margin: 40rpx auto;
                padding: 20rpx;
            }
            .clipboard {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 26rpx;
                color: $u-tips-color;
                height: 80rpx;
                .icon {
                    margin-top: 6rpx;
                    margin-left: 10rpx;
                }
            }
        }
    }
    .bottom {
        margin-top: 20rpx;
        padding: 40rpx;
        padding-right: 0;
        background-color: $u-bg-white;
        font-size: 28rpx;
        .tag {
            display: flex;
            .left {
                width: 160rpx;
            }
            .right {
                display: flex;
                flex-wrap: wrap;
                .tags {
                    width: 140rpx;
                    padding: 16rpx 8rpx;
                    border: solid 2rpx $u-border-color;
                    text-align: center;
                    border-radius: 50rpx;
                    margin: 0 10rpx 20rpx;
                    display: flex;
                    font-size: 28rpx;
                    align-items: center;
                    justify-content: center;
                    color: $u-content-color;
                    line-height: 1;
                    &.active {
                        border-color: $u-type-primary;
                        color: $u-type-primary;
                        background-color: rgba($u-type-primary, 0.08);
                    }
                }
            }
        }
        .tag-input {
            margin: 20rpx 10rpx 0;
            padding: 20rpx;
            border: solid 2rpx $u-border-color;
            border-radius: 12rpx;
            background-color: $u-bg-color;
            input {
                background: $u-bg-white;
                padding: 16rpx 20rpx;
                border-radius: 8rpx;
            }
            .tag-input-actions {
                display: flex;
                margin-top: 20rpx;
                .u-button {
                    margin-right: 16rpx;
                }
            }
        }
        .default {
            margin-top: 50rpx;
            display: flex;
            justify-content: space-between;
            border-bottom: solid 2rpx $u-border-color;
            line-height: 64rpx;
            .tips {
                font-size: 24rpx;
            }
        }
    }
    .option {
        background-color: $u-bg-white;
        padding: 40rpx;
        padding-bottom: 120rpx;
    }
}
</style>
