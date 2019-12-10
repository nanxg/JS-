[toc]

## 第十五天A模块笔记

### 单行显示

```
<style>
    p{
        width:100px;
        border:1px solid green;
        /* 超出隐藏 */
        overflow: hidden;
        /* 文字隐藏的方式是... */
        text-overflow: ellipsis; 
        /* 不换行 */
        white-space: nowrap;
    }
</style>
```

### 多行显示

```
p{
	width:100px;
	border:1px solid green;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	/* 控制让哪一行显示...，即行数 */
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
```

### 禁止用户选中文字

```
p{
	user-select: none;
}
```

### 字母和单词之间的间隙

- letter-spacing-----字母之间的间隙
- word-spacing------单词之间的间隙

> 字和字之间要有一定的间隙，代表他们是独立的单词，不然word-spacing 不起作用。

```
.p2{
     /* 每个汉字相当于一个字母 */
     letter-spacing:10px;
     /* 单词需用空格分隔，不然会当成一个词 */
     word-spacing: 20px;
}
```

### 透明度的兼容性处理

```
.opacity{
	filter:alpha(opacity=50); /* IE */
	-moz-opacity:0.5; /* 老版Mozilla */
	-khtml-opacity:0.5; /* 老版Safari */
	opacity: 0.5; /* 支持opacity的浏览器*/
}
```

### 高斯模糊

```
<style>
      img{
          filter: blur(5px);
      }
</style>
```
### 内嵌网页

frameborder属性值0为无边框，1为有边框

```
<body>
<!-- 网页内嵌网页 -->
<iframe src="https://www.baidu.com" frameborder="0" width="800px" height="600px"></iframe>
</body>
```

### 阿里巴巴字体图标库

优点：
      
- 轻量级：一个图标字体要比一系列的图像要小。一旦字体加载了，图标就会马上渲染出来，不需要下载一个个图像。这样可以减少HTTP的请求数量，而且和HTML5的离线存储配合，可以对性能做出优化。
- 灵活性：不调字体可以像页面中的文字一样，通过font-size属性来对其进行大小的设置，而且还可以添加各种文字效果，如color、hover、filter、text-shadow、transform等效果。灵活的简直不像话！
- 兼容性：图标字体支持现代浏览器，甚至是低版本的IE浏览器，所以可以放心的使用它。
- 相比于位图放大图片会出现失真、缩小又会浪费掉像素点，图标字体不会出现这种情况。