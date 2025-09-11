<template>
    <view>
        <view class="wrap">
            <view class="u-tabs-box">
                <u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
            </view>
            <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
                <!-- 待付款 -->
                <swiper-item class="swiper-item">
                    <scroll-view scroll-y style="height: 100%; width: 100%" @scrolltolower="reachBottom">
                        <view class="page-box">
                            <view class="order" v-for="(res, index) in orderList[0]" :key="res.id">
                                <view class="top">
                                    <view class="left">
                                        <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
                                        <view class="store">{{ res.store }}</view>
                                        <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
                                    </view>
                                    <view class="right">{{ res.deal }}</view>
                                </view>
                                <view class="item" v-for="(item, idx) in res.goodsList" :key="idx">
                                    <view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
                                    <view class="content">
                                        <view class="title u-line-2">{{ item.title }}</view>
                                        <view class="type">{{ item.type }}</view>
                                        <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
                                    </view>
                                    <view class="right">
                                        <view class="price">
                                            ￥{{ priceInt(item.price) }}
                                            <text class="decimal">.{{ priceDecimal(item.price) }}</text>
                                        </view>
                                        <view class="number">x{{ item.number }}</view>
                                    </view>
                                </view>
                                <view class="total">
                                    共{{ totalNum(res.goodsList) }}件商品 合计:
                                    <text class="total-price">
                                        ￥{{ priceInt(totalPrice(res.goodsList)) }}.
                                        <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
                                    </text>
                                </view>
                                <view class="bottom">
                                    <view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
                                    <view class="logistics btn">查看物流</view>
                                    <view class="exchange btn">卖了换钱</view>
                                    <view class="evaluate btn">评价</view>
                                </view>
                            </view>
                            <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
                        </view>
                    </scroll-view>
                </swiper-item>
                <!-- 待发货 -->
                <swiper-item class="swiper-item">
                    <scroll-view scroll-y style="height: 100%; width: 100%" @scrolltolower="reachBottom">
                        <view class="page-box">
                            <view class="order" v-for="(res, index) in orderList[1]" :key="res.id">
                                <view class="top">
                                    <view class="left">
                                        <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
                                        <view class="store">{{ res.store }}</view>
                                        <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
                                    </view>
                                    <view class="right">{{ res.deal }}</view>
                                </view>
                                <view class="item" v-for="(item, idx) in res.goodsList" :key="idx">
                                    <view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
                                    <view class="content">
                                        <view class="title u-line-2">{{ item.title }}</view>
                                        <view class="type">{{ item.type }}</view>
                                        <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
                                    </view>
                                    <view class="right">
                                        <view class="price">
                                            ￥{{ priceInt(item.price) }}
                                            <text class="decimal">.{{ priceDecimal(item.price) }}</text>
                                        </view>
                                        <view class="number">x{{ item.number }}</view>
                                    </view>
                                </view>
                                <view class="total">
                                    共{{ totalNum(res.goodsList) }}件商品 合计:
                                    <text class="total-price">
                                        ￥{{ priceInt(totalPrice(res.goodsList)) }}.
                                        <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
                                    </text>
                                </view>
                                <view class="bottom">
                                    <view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
                                    <view class="logistics btn">查看物流</view>
                                    <view class="exchange btn">卖了换钱</view>
                                    <view class="evaluate btn">评价</view>
                                </view>
                            </view>
                            <u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
                        </view>
                    </scroll-view>
                </swiper-item>
                <!-- 待收货（无数据） -->
                <swiper-item class="swiper-item">
                    <scroll-view scroll-y style="height: 100%; width: 100%">
                        <view class="page-box">
                            <view>
                                <view class="centre">
                                    <image src="https://ik.imagekit.io/anyup/uview-pro/template/taobao-order.png" mode=""></image>
                                    <view class="explain">
                                        您还没有相关的订单
                                        <view class="tips">可以去看看有那些想买的</view>
                                    </view>
                                    <view class="btn">随便逛逛</view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </swiper-item>
                <!-- 待评价 -->
                <swiper-item class="swiper-item">
                    <scroll-view scroll-y style="height: 100%; width: 100%" @scrolltolower="reachBottom">
                        <view class="page-box">
                            <view class="order" v-for="(res, index) in orderList[3]" :key="res.id">
                                <view class="top">
                                    <view class="left">
                                        <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
                                        <view class="store">{{ res.store }}</view>
                                        <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
                                    </view>
                                    <view class="right">{{ res.deal }}</view>
                                </view>
                                <view class="item" v-for="(item, idx) in res.goodsList" :key="idx">
                                    <view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
                                    <view class="content">
                                        <view class="title u-line-2">{{ item.title }}</view>
                                        <view class="type">{{ item.type }}</view>
                                        <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
                                    </view>
                                    <view class="right">
                                        <view class="price">
                                            ￥{{ priceInt(item.price) }}
                                            <text class="decimal">.{{ priceDecimal(item.price) }}</text>
                                        </view>
                                        <view class="number">x{{ item.number }}</view>
                                    </view>
                                </view>
                                <view class="total">
                                    共{{ totalNum(res.goodsList) }}件商品 合计:
                                    <text class="total-price">
                                        ￥{{ priceInt(totalPrice(res.goodsList)) }}.
                                        <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
                                    </text>
                                </view>
                                <view class="bottom">
                                    <view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
                                    <view class="logistics btn">查看物流</view>
                                    <view class="exchange btn">卖了换钱</view>
                                    <view class="evaluate btn">评价</view>
                                </view>
                            </view>
                            <u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
                        </view>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

// 商品信息类型
interface GoodsItem {
    goodsUrl: string;
    title: string;
    type: string;
    deliveryTime: string;
    price: string; // 价格字符串，带小数
    number: number;
}
// 订单信息类型
interface OrderItem {
    id: string | number;
    store: string;
    deal: string;
    goodsList: GoodsItem[];
}
// tab 列表项类型
interface TabItem {
    name: string;
    count?: number;
}

// 订单列表，四个 tab，每个 tab 一个数组
const orderList = ref<OrderItem[][]>([[], [], [], []]);
// 用于模拟生成订单的原始数据
const dataList = ref<OrderItem[]>([
    {
        id: 1,
        store: '夏日流星限定贩卖',
        deal: '交易成功',
        goodsList: [
            {
                goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
                title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
                type: '灰色;M',
                deliveryTime: '付款后30天内发货',
                price: '348.58',
                number: 2
            },
            {
                goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
                title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
                type: '45cm;S',
                deliveryTime: '付款后30天内发货',
                price: '135.00',
                number: 1
            }
        ]
    },
    {
        id: 2,
        store: '江南皮革厂',
        deal: '交易失败',
        goodsList: [
            {
                goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
                title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
                type: '粉色;M',
                deliveryTime: '付款后7天内发货',
                price: '128.05',
                number: 1
            }
        ]
    },
    {
        id: 3,
        store: '三星旗舰店',
        deal: '交易失败',
        goodsList: [
            {
                goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
                title: '三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机',
                type: '4K，广色域',
                deliveryTime: '保质5年',
                price: '1998',
                number: 3
            },
            {
                goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
                title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
                type: '容量大，速冻',
                deliveryTime: '保质5年',
                price: '2354',
                number: 1
            }
        ]
    },
    {
        id: 4,
        store: '三星旗舰店',
        deal: '交易失败',
        goodsList: [
            {
                goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
                title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
                type: '4K，广色域',
                deliveryTime: '珍藏10年好酒',
                price: '1543',
                number: 3
            },
            {
                goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
                title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
                type: '一打',
                deliveryTime: '口感好',
                price: '120',
                number: 1
            }
        ]
    },
    {
        id: 5,
        store: '三星旗舰店',
        deal: '交易成功',
        goodsList: [
            {
                goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
                title: '企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108',
                type: '识别效率高',
                deliveryTime: '使用方便',
                price: '451',
                number: 9
            }
        ]
    }
]);

// tab 列表
const list = ref<TabItem[]>([{ name: '待付款' }, { name: '待发货' }, { name: '待收货' }, { name: '待评价', count: 12 }]);

// 当前 tab 索引
const current = ref<number>(0);
// swiper 当前索引
const swiperCurrent = ref<number>(0);
// tab 高度（如需动态计算可用）
const tabsHeight = ref<number>(0);
// swiper 滑动距离
const dx = ref<number>(0);
// 各 tab 加载状态
const loadStatus = ref<string[]>(['loadmore', 'loadmore', 'loadmore', 'loadmore']);

// 获取当前实例（用于 $refs）
const { proxy } = getCurrentInstance() as any;

// 页面加载时初始化部分 tab 的订单数据
onMounted(() => {
    uni.showModal({
        title: '提示',
        content: '该页面仅为布局演示功能，非电商类小程序，不具备实际功能',
        success: res => {}
    });
    getOrderList(0);
    getOrderList(1);
    getOrderList(3);
});

/**
 * 获取订单列表，模拟数据填充
 * @param idx tab 索引
 */
function getOrderList(idx: number) {
    for (let i = 0; i < 5; i++) {
        const index = $u.random(0, dataList.value.length - 1);
        // 深拷贝数据，生成唯一 id
        const data = JSON.parse(JSON.stringify(dataList.value[index])) as OrderItem;
        data.id = $u.guid();
        orderList.value[idx].push(data);
    }
    loadStatus.value.splice(current.value, 1, 'loadmore');
}

/**
 * 价格整数部分
 * @param val 价格字符串
 */
function priceInt(val: string): string {
    if (val !== String(parseInt(val))) return val.split('.')[0];
    else return val;
}
/**
 * 价格小数部分
 * @param val 价格字符串
 */
function priceDecimal(val: string): string {
    if (val !== String(parseInt(val))) return val.slice(-2);
    else return '00';
}
/**
 * 计算商品总价
 * @param items 商品数组
 */
function totalPrice(items: GoodsItem[]): string {
    let price = 0;
    items.forEach(val => {
        price += parseFloat(val.price);
    });
    return price.toFixed(2);
}
/**
 * 计算商品总件数
 * @param items 商品数组
 */
function totalNum(items: GoodsItem[]): number {
    let num = 0;
    items.forEach(val => {
        num += val.number;
    });
    return num;
}
/**
 * tab 切换事件
 * @param index 新 tab 索引
 */
function change(index: number) {
    swiperCurrent.value = index;
    getOrderList(index);
}
/**
 * swiper 滑动事件
 * @param param 事件对象，包含 dx
 */
function transition({ detail: { dx: dxVal } }: { detail: { dx: number } }) {
    proxy?.$refs.tabs.setDx(dxVal);
}
/**
 * swiper 动画结束事件
 * @param param 事件对象，包含 current
 */
function animationfinish({ detail: { current: cur } }: { detail: { current: number } }) {
    proxy?.$refs.tabs.setFinishCurrent(cur);
    swiperCurrent.value = cur;
    current.value = cur;
}
/**
 * 滚动到底部加载更多
 */
function reachBottom() {
    // 待收货 tab（2）无数据，不加载
    if (current.value !== 2) {
        loadStatus.value.splice(current.value, 1, 'loading');
        setTimeout(() => {
            getOrderList(current.value);
        }, 1200);
    }
}
</script>

<style>
/* #ifndef H5 */
page {
    height: 100%;
    background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.order {
    width: 710rpx;
    background-color: #ffffff;
    margin: 20rpx auto;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 20rpx;
    font-size: 28rpx;
    .top {
        display: flex;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            .store {
                margin: 0 10rpx;
                font-size: 32rpx;
                font-weight: bold;
            }
        }
        .right {
            color: $u-type-warning-dark;
        }
    }
    .item {
        display: flex;
        margin: 20rpx 0 0;
        .left {
            margin-right: 20rpx;
            image {
                width: 200rpx;
                height: 200rpx;
                border-radius: 10rpx;
            }
        }
        .content {
            .title {
                font-size: 28rpx;
                line-height: 50rpx;
            }
            .type {
                margin: 10rpx 0;
                font-size: 24rpx;
                color: $u-tips-color;
            }
            .delivery-time {
                color: #e5d001;
                font-size: 24rpx;
            }
        }
        .right {
            margin-left: 10rpx;
            padding-top: 20rpx;
            text-align: right;
            .decimal {
                font-size: 24rpx;
                margin-top: 4rpx;
            }
            .number {
                color: $u-tips-color;
                font-size: 24rpx;
            }
        }
    }
    .total {
        margin-top: 20rpx;
        text-align: right;
        font-size: 24rpx;
        .total-price {
            font-size: 32rpx;
        }
    }
    .bottom {
        display: flex;
        margin-top: 40rpx;
        padding: 0 10rpx;
        justify-content: space-between;
        align-items: center;
        .btn {
            line-height: 52rpx;
            width: 160rpx;
            border-radius: 26rpx;
            border: 2rpx solid $u-border-color;
            font-size: 26rpx;
            text-align: center;
            color: $u-type-info-dark;
        }
        .evaluate {
            color: $u-type-warning-dark;
            border-color: $u-type-warning-dark;
        }
    }
}
.centre {
    text-align: center;
    margin: 200rpx auto;
    font-size: 32rpx;
    image {
        width: 164rpx;
        height: 164rpx;
        border-radius: 50%;
        margin-bottom: 20rpx;
    }
    .tips {
        font-size: 24rpx;
        color: #999999;
        margin-top: 20rpx;
    }
    .btn {
        margin: 80rpx auto;
        width: 200rpx;
        border-radius: 32rpx;
        line-height: 64rpx;
        color: #ffffff;
        font-size: 26rpx;
        background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
    }
}
.wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--window-top));
    width: 100%;
}
.swiper-box {
    flex: 1;
}
.swiper-item {
    height: 100%;
}
</style>
