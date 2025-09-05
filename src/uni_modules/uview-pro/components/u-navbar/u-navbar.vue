<template>
	<view class="u-navbar-wrap">
		<view class="u-navbar" :style="navbarStyle"
			:class="{ 'u-navbar-fixed': props.isFixed, 'u-border-bottom': props.borderBottom }">
			<view v-if="showStatusBar" class="u-status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="u-navbar-inner" :style="navbarInnerStyle">
				<view class="u-navbar-left u-line-1" :style="navLeftStyle">
					<slot name="left">
						<view class="u-back-wrap" v-if="showBack" @tap="goBack">
							<view class="u-icon-wrap">
								<slot name="left-icon">
									<u-icon :name="props.backIconName" :color="props.backIconColor"
										:size="props.backIconSize"></u-icon>
								</slot>
							</view>
							<view class="u-icon-wrap u-back-text u-line-1" v-if="props.backText"
								:style="props.backTextStyle">{{ props.backText }} </view>
						</view>
					</slot>
				</view>
				<view class="u-navbar-content">
					<view class="u-navbar-content-p">
						<view class="u-navbar-content-c">
							<view class="u-navbar-content-box">
								<view class="u-navbar-content-title" v-if="showTitle">
									<view class="u-title u-line-1" :style="{
										color: props.titleColor,
										fontSize: props.titleSize + 'rpx',
										fontWeight: props.titleBold ? 'bold' : 'normal'
									}">
										{{ props.title }}
									</view>
								</view>
								<slot></slot>
							</view>
						</view>
					</view>
				</view>
				<view class="u-navbar-right">
					<slot name="right"></slot>
				</view>
			</view>
		</view>
		<!-- 解决fixed定位后导航栏塌陷的问题 -->
		<view class="u-navbar-placeholder" v-if="props.isFixed && !props.immersive"
			:style="{ width: '100%', height: placeholderHeight }"></view>
	</view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type CSSProperties, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { NavbarProps } from './types';

defineOptions({ name: 'u-navbar' });

/**
 * navbar 自定义导航栏
 * @description 此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uniapp自带的导航栏。
 * @tutorial https://uview-pro.netlify.app/components/navbar.html
 * @property {String|Number} height 导航栏高度(不包括状态栏高度在内，内部自动加上)，注意这里的单位是px（默认44）
 * @property {String} back-icon-color 左边返回图标的颜色（默认#606266）
 * @property {String} back-icon-name 左边返回图标的名称，只能为uView自带的图标（默认arrow-left）
 * @property {String|Number} back-icon-size 左边返回图标的大小，单位rpx（默认30）
 * @property {String} back-text 返回图标右边的辅助提示文字
 * @property {Object} back-text-style 返回图标右边的辅助提示文字的样式，对象形式（默认{ color: '#606266' }）
 * @property {String} title 导航栏标题，如设置为空字符，将会隐藏标题占位区域
 * @property {String|Number} title-width 导航栏标题的最大宽度，内容超出会以省略号隐藏，单位rpx（默认250）
 * @property {String} title-color 标题的颜色（默认#606266）
 * @property {String|Number} title-size 导航栏标题字体大小，单位rpx（默认32）
 * @property {Function} custom-back 自定义返回逻辑方法
 * @property {String|Number} z-index 固定在顶部时的z-index值（默认980）
 * @property {Boolean} is-back 是否显示导航栏左边返回图标和辅助文字（默认true）
 * @property {Object} background 导航栏背景设置，见官网说明（默认{ background: '#ffffff' }）
 * @property {Boolean} is-fixed 导航栏是否固定在顶部（默认true）
 * @property {Boolean} immersive 沉浸式，允许fixed定位后导航栏塌陷，仅fixed定位下生效（默认false）
 * @property {Boolean} border-bottom 导航栏底部是否显示下边框，如定义了较深的背景颜色，可取消此值（默认true）
 * @property {Boolean} status-bar 是否显示状态栏
 * @example <u-navbar back-text="返回" title="剑未配妥，出门已是江湖"></u-navbar>
 */
const props = defineProps(NavbarProps);
const instance = getCurrentInstance();
// 获取系统状态栏的高度
const systemInfo = ref(uni.getSystemInfoSync());
const menuButtonInfo = ref<UniNamespace.GetMenuButtonBoundingClientRectRes>({
	width: 0,
	height: 0,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0
});

const navBarRightWidth = ref(0);
const navBarLeftWidth = ref(0);

// 胶囊的空间
let navBarCapsuleSpace = 0;

/**
 * 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠
 * TODO  (支付宝小程序非本API，尚未兼容)
 */
// #ifdef MP
if(uni.getMenuButtonBoundingClientRect){
	menuButtonInfo.value = uni.getMenuButtonBoundingClientRect();
	navBarCapsuleSpace = systemInfo.value.screenWidth - menuButtonInfo.value.right + menuButtonInfo.value.width;
}
// #endif

/**
 * 两侧的宽度
 */
const navbarInnerSpace = computed(() => Math.max(navBarRightWidth.value, navBarLeftWidth.value, navBarCapsuleSpace));

/**
 * 屏幕是否为横屏
 */
const isLandscape = computed(() => systemInfo.value.screenWidth > systemInfo.value.screenHeight);
/**
 * 状态栏高度
 * 有些机型即便隐藏了也是会有值的
 */
const statusBarHeight = computed(() => systemInfo.value.statusBarHeight);
/**
 * 状态栏显示与否与状态栏有无高度不是对应关系
 */
const showStatusBar = computed(() => {
	// #ifdef MP
	return props.statusBar && !isLandscape.value;
	// #endif
	// #ifndef MP
	return props.statusBar;
	// #endif
});
/**
 * 一个有值的状态栏高度
 */
const portraitStatusBarHeight = ref(0);
if (systemInfo.value.statusBarHeight > 0) {
	portraitStatusBarHeight.value = systemInfo.value.statusBarHeight;
}

// 导航栏内部盒子的样式
const navbarInnerStyle = computed(() => {
	let style: Record<string, any> = {};
	// 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
	style.height = String(navbarHeight.value) + 'px';
	// 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
	// #ifdef MP
	style.paddingRight = $u.addUnit(navbarInnerSpace.value, 'px');
	// #endif
	return style;
});

// 整个导航栏的样式
const navbarStyle = computed(() => {
	let style: Record<string, any> = {};
	style.zIndex = props.zIndex ? props.zIndex : $u.zIndex.navbar;
	// 合并用户传递的背景色对象
	Object.assign(style, props.background);
	return style;
});

/**
 * 导航栏左边的样式
 */
const navLeftStyle = computed(() => {
	let style: CSSProperties = {};
	if (props.isBack || showTitle.value) {
		style.minWidth = $u.addUnit(navbarInnerSpace.value, 'px');
	}
	return style;
});

function getPageInfo() {
	const pages = getCurrentPages();
	return pages.length === 1;
}

const showBack = computed(() => {
	// TODO 如果是没有自定义返回逻辑的，则自动根据页面栈判断显示
	if (props.isBack && typeof props.customBack !== 'function') {
		return !getPageInfo();
	}
	return props.isBack;
});

const showTitle = computed(() => {
	// const slots = useSlots();
	// FIXME return !slots.default && !$u.test.isEmpty(props.title)
	return !$u.test.isEmpty(props.title);
});
// 导航中间的标题的样式
// const titleStyle = computed(() => {
// 	let style: Record<string, any> = {};
// 	// #ifndef MP
// 	style.left = (systemInfo.value.windowWidth - uni.upx2px(Number(props.titleWidth))) / 2 + 'px';
// 	style.right = (systemInfo.value.windowWidth - uni.upx2px(Number(props.titleWidth))) / 2 + 'px';
// 	// #endif
// 	// #ifdef MP
// 	// 此处是为了让标题显示区域即使在小程序有右侧胶囊的情况下也能处于屏幕的中间，是通过绝对定位实现的
// 	let rightButtonWidth = systemInfo.value.windowWidth - menuButtonInfo.value.left;
// 	style.left = (systemInfo.value.windowWidth - uni.upx2px(Number(props.titleWidth))) / 2 + 'px';
// 	style.right = rightButtonWidth - (systemInfo.value.windowWidth - uni.upx2px(Number(props.titleWidth))) / 2 + rightButtonWidth + 'px';
// 	// #endif
// 	style.width = uni.upx2px(Number(props.titleWidth)) + 'px';
// 	return style;
// });

// 转换字符数值为真正的数值
const navbarHeight = computed(() => {
	let h = 44;
	// #ifdef MP
	// 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
	// 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
	// return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2; //导航高度
	h = systemInfo.value.platform == 'ios' ? 44 : 48;
	// #endif
	// #ifdef MP-WEIXIN
	// TODO BODGE 大多数情况下让微信小程序美观度更佳 menuButtonInfo.value在冷启动小程序时状态栏是否展示就确定,值不会随着态栏是否展示变化
	//  menuButtonInfo.value.top 值可能包含状态栏的高度也可能不包含
	if (!isLandscape.value && menuButtonInfo.value.top > portraitStatusBarHeight.value) {
		let paddingTB = Math.max(0, menuButtonInfo.value.top - portraitStatusBarHeight.value);
		const bh = menuButtonInfo.value.height + 2 * paddingTB;
		// 异常，top值包含真实状态栏高度，但此时状态栏隐藏了
		// 高度比胶囊高度多得多或者比胶囊少，比较离谱了,不采用
		if (bh >= menuButtonInfo.value.height && bh < 2 * menuButtonInfo.value.height) {
			h = bh;
		}
	}
	// #endif
	return props.height ? props.height : h;
});
/**
 * 占位符高度
 */
const placeholderHeight = computed(() => {
	let h = Number(navbarHeight.value);
	if (showStatusBar.value) {
		h = h + Number(statusBarHeight.value);
	}
	return $u.addUnit(h, 'px');
});

/**
 * 返回按钮点击事件
 * 如果自定义了点击返回按钮的函数，则执行，否则执行返回逻辑
 */
function goBack() {
	if (typeof props.customBack === 'function') {
		// 在微信，支付宝等环境(H5正常)，会导致父组件定义的customBack()函数体中的this变成子组件的this
		// 通过bind()方法，绑定父组件的this，让this.customBack()的this为父组件的上下文
		// props.customBack.bind($u.$parent.call(getCurrentInstance()?.proxy))();
		props.customBack();
	} else {
		uni.navigateBack();
	}
}

/**
 * 获取左右元素的宽度
 */
function getElRect() {
	$u.getRect('.u-navbar-left', instance).then(res => {
		navBarLeftWidth.value = res.width;
	});
	$u.getRect('.u-navbar-right', instance).then(res => {
		console.log('res', res);
		navBarRightWidth.value = res.width;
	});
}

function windowResizeCallback(res: UniNamespace.WindowResizeResult) {
	uni.getSystemInfo({
		success: function (res) {
			systemInfo.value = res;
			if (systemInfo.value.statusBarHeight > 0) {
				portraitStatusBarHeight.value = systemInfo.value.statusBarHeight;
			}
		}
	});
	setTimeout(() => {
		menuButtonInfo.value = uni.getMenuButtonBoundingClientRect();
		getElRect();
	}, 10);
}

// #ifdef MP-WEIXIN
function onMenuButtonBoundingClientRectWeightChangeCallback(res) {
	menuButtonInfo.value = res;
	navBarCapsuleSpace = systemInfo.value.screenWidth - menuButtonInfo.value.right + menuButtonInfo.value.width;
}
// #endif

onMounted(() => {
	getElRect();
	uni.onWindowResize(windowResizeCallback);
	// #ifdef MP-WEIXIN
	if (wx.onMenuButtonBoundingClientRectWeightChange) {
		wx.onMenuButtonBoundingClientRectWeightChange(onMenuButtonBoundingClientRectWeightChangeCallback);
	}
	// #endif
});
onUnmounted(() => {
	uni.offWindowResize(windowResizeCallback);
	// #ifdef MP-WEIXIN
	if (wx.offMenuButtonBoundingClientRectWeightChange) {
		wx.offMenuButtonBoundingClientRectWeightChange(onMenuButtonBoundingClientRectWeightChangeCallback);
	}
	// #endif
});
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-navbar {
	width: 100%;
}

.u-navbar-fixed {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 991;
}

.u-status-bar {
	width: 100%;
}

.u-navbar-inner {
	width: 100%;
	@include vue-flex;
	justify-content: space-between;
	position: relative;
	align-items: center;
}

.u-navbar-left,
.u-navbar-right {
	flex: none;
}

.u-navbar-content {
	height: 100%;
	position: relative;
	flex: 1 1 0;
	@include vue-flex;
	align-items: center;
}

.u-navbar-content-c {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

.u-navbar-content-p,
.u-navbar-content-box {
	position: relative;
	width: 100%;
	height: 100%;
}

.u-navbar-content-box {
	@include vue-flex;
	align-items: center;
}

.u-back-wrap {
	@include vue-flex;
	align-items: center;
	flex: 1;
	flex-grow: 0;
	padding: 14rpx 14rpx 14rpx 24rpx;
}

.u-back-text {
	padding-left: 4rpx;
	font-size: 30rpx;
}

.u-navbar-content-title {
	width: 100%;
	height: 100%;
	@include vue-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.u-title {
	font-size: 32rpx;
}
</style>
