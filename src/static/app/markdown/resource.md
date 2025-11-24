## 资源下载

我们会在这里为您提供一些跟 uView Pro 设计相关的资源和设计工具的下载，更多设计资源正在整理和完善中。

### 设计资源

这里我们提供组件的 Sketch 和 Axure 设计资源，您可以根据需要进行下载。

<div class="cards">
    <ul class="container">   
        <li >
            <div class="card">
                <img src="https://ik.imagekit.io/anyup/uview-pro/docs/resource/sketch-template.png" alt="">
                <h3>Sketch Template</h3>
                <p>通过在Sketch中导入uView组件库，可以在交互设计阶段方便地调用常用的组件</p>
                <a href="https://cdn.uviewui.com/uview/resources/sketch.sketch">下载</a>
            </div>
        </li>
        <li >
            <div class="card">
                <img src="https://ik.imagekit.io/anyup/uview-pro/docs/resource/axure-template.png" alt="">
                <h3>Axure Template</h3>
                <p>通过在Axure中导入uView组件库，可以在交互设计阶段方便地调用常用的组件</p>
                <a href="https://cdn.uviewui.com/uview/resources/axure.rp">下载</a>
            </div>
        </li>
    </ul>
</div>

### 框架资源

这里我们提供了一些跟组件，或者框架相关的下载资源，您可以根据需求进行下载。

<div class="cards">
    <ul class="container">   
        <!-- <li >
            <div class="card">
                <img src="https://ik.imagekit.io/anyup/uview-pro/docs/resource/i18n-demo.png" alt="">
                <h3>I18n多语言示例</h3>
                <p>我们为您制作了一个I18n多语言的示例工程，下载运行即可，注意此版本不适用于nvue</p>
                <a href="https://cdn.uviewui.com/uview/resources/i18n.zip">下载</a>
            </div>
        </li>
        <li >
            <div class="card">
                <img src="https://ik.imagekit.io/anyup/uview-pro/docs/resource/scaffold-demo.png" alt="">
                <h3>脚手架空白工程</h3>
                <p>已配置uView的空白项目，适用于新项目或者学习使用，下载后在HX中运行即可</p>
                <a href="https://cdn.uviewui.com/uview/resources/uView-cli.zip">下载</a>
            </div>
        </li>
        <li >
            <div class="card">
                <img src="https://ik.imagekit.io/anyup/uview-pro/docs/resource/tabbar-demo.png" alt="">
                <h3>Tabbar组件使用示例</h3>
                <p>请注意配合文档说明使用此组件，这里为组件的使用示例工程，下载即可使用</p>
                <a href="https://cdn.uviewui.com/uview/resources/Tabbar.zip">下载</a>
            </div>
        </li> -->
        <li >
            <div class="card">
                <img src="https://ik.imagekit.io/anyup/uview-pro/docs/resource/empty-placeholder.png" alt="">
                <h3>Empty组件配套占位图</h3>
                <p>我们的专业设计师精心为您做了一套精美的缺省图，涵盖各个场景，文件内含图片和Sketch源文件</p>
                <!-- <a href="http://cdn.uviewui.com/uview/resources/Empty.zip">下载</a> -->
                <a href="https://yanxincloudplatform.oss-cn-beijing.aliyuncs.com/cloudplatform/Empty.zip">下载</a>
            </div>
        </li>
    </ul>
</div>

<style lang="scss">
	.card {
		background: #fbfcfd;
		height: 204px;
		text-align: center
	}

	.card h4 {
		font-size: 18px;
		color: #1f2d3d;
		font-weight: 400;
		margin: 0
	}

	.card span {
		font-size: 14px;
		color: #99a9bf
    }
    
    .card {
		height: 394px;
		width: 100%;
		background: #fff;
		border: 1px solid #eaeefb;
		border-radius: 5px;
		box-sizing: border-box;
		text-align: center;
		position: relative;
		transition: bottom .3s;
        bottom: 0;
        transition: box-shadow .3s;
    }
    
    .card:hover {
        box-shadow: 0 3px 5px -4px rgba(0,0,0,.12), 0 4px 12px 0 rgba(0,0,0,.08), 0 9px 24px 6px rgba(0,0,0,.05);
    }

	.card img {
		margin: 40px auto 35px;
        height: 100px;
        width: 100px
	}

	.card h3 {
		margin: 0 0 10px;
		font-size: 18px;
		color: #1f2f3d;
		font-weight: 400;
		height: 22px
	}

	.card p {
		font-size: 14px;
		color: #99a9bf;
		padding: 0 30px;
		margin: 0;
		word-break: break-all;
		line-height: 1.8
	}

	.card a {
		height: 42px;
		width: 190px;
		display: inline-block;
		line-height: 42px;
		font-size: 14px;
		background-color: #409eff;
		color: #fff;
		text-align: center;
		border: 0;
		padding: 0;
		cursor: pointer;
		border-radius: 2px;
		transition: all .3s;
		text-decoration: none;
        margin-top: 20px;
        transition: opacity 0.3s;
    }

    .card a:hover {
        opacity: 0.75;
    }
    
    .cards {
		margin: 0px 0 70px
        
	}

	.cards .container {
		padding: 0;
		margin: 0 -11px;
		width: auto
	}

	.cards .container:after,
	.cards .container:before {
		display: table;
		content: ""
	}

	.cards .container:after {
		clear: both
	}

	.cards li {
		width: 28%;
		padding: 0 19px;
		box-sizing: border-box;
		float: left;
		list-style: none;
        margin-top: 30px;
	}

	@media (max-width:850px) {
		.cards li {
			max-width: 500px;
			float: none;
			margin: 10px auto 30px;
			width: 80%
		}

		.cards li .card {
			height: auto;
			padding-bottom: 20px
		}

		.cards h3 {
			height: auto
		}
	}
</style>
