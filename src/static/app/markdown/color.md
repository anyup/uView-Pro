## Color 色彩

<demo-model url="/pages/componentsC/color/index"></demo-model>


uView经过大量调试和研究，得出一套专有的调色板，在各个组件内部，使用统一的配色，为您的产品带来统一又鲜明的视觉效果。

::: danger 注意
uView为了更好编写css，使用了scss预处理器，使用uView之前，请确认您的Hbuilder X已经安装了scss预处理器，一般情况下，相信您已经安装了。如果没有安装，
请在 Hbuilder X->工具->插件安装 中找到找到"scss/sass编译"安装即可，安装完毕如果不生效，请重启Hbuilder X。
:::

### 平台差异说明

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

### 主题色

`primary`，`success`，`error`，`warning`，`info`是uView的主题色，他们给人在视觉感受上分别对应于蓝色，绿色，红色，黄色，灰色。
而他们又有对应的`disabled`、`dark`和`light`状态，分别表示对应的禁止，加深和变浅的对应颜色。举例uView的`button`组件来说：
1. 设置`type`参数为`primary`时，按钮显示蓝色。
2. 按钮被按下时，使用的是`primary`的加深颜色，也即`dark`状态。
3. 按钮设置为镂空状态(`plain`为`true`)时，背景色为`primary`的变浅颜色，也即`light`状态。
4. 按钮处于禁止状态时，使用的是`primary`的稍浅颜色，也即`disabled`状态。

### 主色

蓝色作为uView主色调，表示一种鲜明，积极的态度

<div class="color-box">
	<div class="color-item" style="background: #2979ff; color:#fff;">
		Primary<br>
		#2979ff
		<div class="color-sub">
			<div class="sub-item" style="background: #2b85e4; color:#fff;">
				Dark<br>
				#2b85e4
			</div>
			<div class="sub-item" style="background: #a0cfff; color:#606266;">
				Disabled<br>
				#a0cfff
			</div>
			<div class="sub-item" style="background: #ecf5ff; color:#606266;">
				Light<br>
				#ecf5ff
			</div>
		</div>
	</div>
</div>

我们在全局样式中，通过`scss`提供了对应的颜色变量名，方便您在任何可写css的地方，调用这些变量，如下：

```css
/* 变量的定义，该部分uView已全局引入，无需您编写 */
$u-type-primary: #2979ff;
$u-type-primary-light: #ecf5ff;
$u-type-primary-disabled: #a0cfff;
$u-type-primary-dark: #2b85e4;


/* 在您编写css的地方使用这些变量 */
.title {
	color: $u-type-primary;
	......
}
```


### 辅助色

除了主色外的场景色，需要在不同的场景中使用，如绿色代表成功，红色代表错误，黄色代表警示。

<div class="color-box">
	<div class="color-item" style="background: #fa3534; color:#fff;">
		Error<br>
		#fa3534
		<div class="color-sub">
			<div class="sub-item" style="background: #dd6161; color:#fff;">
				Dark<br>
				#dd6161
			</div>
			<div class="sub-item" style="background: #fab6b6; color:#606266;">
				Disabled<br>
				#fab6b6
			</div>
			<div class="sub-item" style="background: #fef0f0; color:#606266;">
				Light<br>
				#fef0f0
			</div>
		</div>
	</div>
	<div class="color-item" style="background: #ff9900; color:#fff;">
		Warning<br>
		#ff9900
		<div class="color-sub">
			<div class="sub-item" style="background: #f29100; color:#fff;">
				Dark<br>
				#f29100
			</div>
			<div class="sub-item" style="background: #fcbd71; color:#606266;">
				Disabled<br>
				#fcbd71
			</div>
			<div class="sub-item" style="background: #fdf6ec; color:#606266;">
				Light<br>
				#fdf6ec
			</div>
		</div>
	</div>
	<div class="color-item" style="background: #19be6b; color:#fff;">
		Success<br>
		#19be6b
		<div class="color-sub">
			<div class="sub-item" style="background: #18b566; color:#fff;">
				Dark<br>
				#18b566
			</div>
			<div class="sub-item" style="background: #71d5a1; color:#606266;">
				Disabled<br>
				#71d5a1
			</div>
			<div class="sub-item" style="background: #dbf1e1; color:#606266;">
				Light<br>
				#dbf1e1
			</div>
		</div>
	</div>
	<div class="color-item" style="background: #909399; color:#fff;">
		Info<br>
		#909399
		<div class="color-sub">
			<div class="sub-item" style="background: #82848a; color:#fff;">
				Dark<br>
				#82848a
			</div>
			<div class="sub-item" style="background: #c8c9cc; color:#606266;">
				Disabled<br>
				#c8c9cc
			</div>
			<div class="sub-item" style="background: #f4f4f5; color:#606266;">
				Light<br>
				#f4f4f5
			</div>
		</div>
	</div>
</div>

我们在全局样式中，通过`scss`提供了对应的颜色变量名，方便您在任何可写css的地方，调用这些变量，如下：

```css
/* 变量的定义，该部分uView已全局引入，无需您编写 */

$u-type-warning: #ff9900;
$u-type-warning-disabled: #fcbd71;
$u-type-warning-dark: #f29100;
$u-type-warning-light: #fdf6ec;

$u-type-success: #19be6b;
$u-type-success-disabled: #71d5a1;
$u-type-success-dark: #18b566;
$u-type-success-light: #dbf1e1;

$u-type-error: #fa3534;
$u-type-error-disabled: #fab6b6;
$u-type-error-dark: #dd6161;
$u-type-error-light: #fef0f0;

$u-type-info: #909399;
$u-type-info-disabled: #c8c9cc;
$u-type-info-dark: #82848a;
$u-type-info-light: #f4f4f5;

/* 在您编写css的地方使用这些变量 */
.title {
	color: $u-type-info;
	......
}
```

### 文字颜色

uView中，分别提炼了4种用于文字颜色，分别是：主要文字、常规文字、次要文字、占位文字颜色。

- 主要文字颜色一般用于内容的标题等，如新闻列表的标题
- 常规文字颜色一般用于内容的主体，如新闻列表的概要
- 次要文字颜色一般用于内容的提示部分，如新闻列表底部的时间，评论数量的提示文字
- 占位文字颜色属于更浅的灰色，看场景选择使用

<div class="color-box">
	<div class="color-item" style="background: #303133; color:#fff;">
		主要文字<br>
		#303133
		<div class="color-sub">
			<div class="sub-item" style="background: #606266; color:#fff;">
				常规文字<br>
				#606266
			</div>
			<div class="sub-item" style="background: #909399; color:#fff;">
				次要文字<br>
				#909399
			</div>
			<div class="sub-item" style="background: #c0c4cc; color:#303133;">
				占位文字<br>
				#c0c4cc
			</div>
		</div>
	</div>
</div>

```css
/* 变量的定义，该部分uView已全局引入，无需您编写 */
$u-main-color: #303133;
$u-content-color: #606266;
$u-tips-color: #909399;
$u-light-color: #c0c4cc;

/* 在您编写css的地方使用这些变量 */
.title {
	color: $u-main-color;
}
```


### 背景颜色

uView中，定义了一个背景颜色，如下：

<div class="color-box">
	<div class="color-item" style="background: #f3f4f6; color:#909399;">
		背景颜色<br>
		#f3f4f6
	</div>
</div>

我们在全局样式中，通过`scss`提供了对应的颜色变量名，方便您在任何可写css的地方，调用这个变量，如下：

```css
/* 变量的定义，该部分uView已全局引入，无需您编写 */
$u-bg-color: #f3f4f6;

/* 在您编写css的地方使用这些变量 */
.title {
	color: $u-bg-color;
}
```


### 边框颜色

uView自定义了一个边框的颜色，值为`#e4e7ed`，如果想使用，如下：

```css
/* 变量的定义，该部分uView已全局引入，无需您编写 */
$u-border-color: #e4e7ed;

/* 在您编写css的地方使用这个变量 */
.item {
	border: 1px solid $u-border-color;
}
```

<style scoped>
.color-box {
	display: flex;
	flex-wrap: wrap;
}

.color-item {
	box-sizing: border-box;
	text-align: left;
	padding: 20px 25px;
	border-radius: 5px;
	flex: 0 0 31.5%;
	position: relative;
	height: 130px;
	overflow: hidden;
	margin-right: 4%;
	margin-bottom: 35px;
	min-width: 300px;
}

.color-item:nth-child(3n) {
	
}

.color-sub {
	position: absolute;
	bottom: 0;
	width: 100%;
	left: 0;
	display: flex;
	height: 50px;
}

.sub-item {
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: flex-start;
	padding: 0 10px;
	font-size: 13px;
}

.sub-item:first-child {
	border-radius: 0 0 0 5px;
}

.sub-item:last-child {
	border-radius: 0 0 5px 0;
}

</style>

