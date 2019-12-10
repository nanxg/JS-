[toc]

## 第三天A模块笔记

### 标签汇总
- 标题： h1~h6
- 段落： p
- 超链接： a
- 图片： img
- 划分大区域： div
- 划分小区域： span
- 视频： video
- 音频： audio
- 格式化标签
	- 加粗： b/strong
	- 斜体： i/em
	- 增大字号： big
	- 减小字号： small
	- 删除线： del
- 预格式化标签： pre
- 三大列表： ul、ol、li，dl、dt、dd

### 标签分类

#### 块级元素
- 独占一行
- 上下排列
- 写宽高起作用
- div、h1~h6、p、pre、ul、ol、dl、option

#### 行内元素
- 共占一行
- 左右排列
- 写宽高不起作用，大小由自身内容决定
- a、b、strong、i、em、big、small、del、span 

#### 行内块
- 共占一行
- 左右排列
- 写宽高起作用
- img、audio、video、input、textarea、select（下拉框，内option为块）

### display常用值（元素转换）
- display:inline; 转换行内元素（一般不用，如需行内特点元素，直接用行内元素即可）
- display:block; 转换块元素
- display:inline-block; 转换行内块元素
- display:none; 让元素消失

### 让元素消失办法及区别
- display:none; （彻底消失）
- visibility:hidden; （隐藏）
- opacity:0;  （透明度：0）
- width、height:0px; 
- 对于定位的元素，可通过层级关系实现。
- margin负值，把元素移动到屏幕一侧实现隐藏。

### 清除页面中所有自带的margin及padding值。

```
<style>
    *{
        margin:0; 
        padding:0;
    }
</style>
```
> 代码中，`*`叫做`通配符选择器`，指选中编辑页面中所有元素。

### 清除列表前面默认样式

```
<style>
    ul,ol{
        list-style:none;
    }
</style>
```

### 调整a标签

```
<style>    
    a{
        /* 清除下划线 */
        text-decoration:none;
        /* 设置文字大小 */
        font-size:50px;
        /* 设置文字颜色 */
        color:mediumspringgreen
    }
</style>
```
### 调整文字
- 文字字体：font-family: "楷体","Times New Roman",Georgia,Serif;
	- 中文字体需加单引号或双引号，英文字体不需要加。
- 文字大小：font-size:50px;
- 文字颜色：color:颜色;
- 文本对齐：text-align:center;
	- 居中：center
	- 左：left
	- 右：right
- 文本缩进：text-indent:2em;
	- 后面可跟具体像素值px，或者em。2em指缩进两个字的距离。
- 文字粗细：font-weight:值;
	- font-weight很多值，数值100~900
	- 400或者normal代表正常粗细
	- 700或者bold代表加粗
	- 900或者bolder代表更粗
- 文字倾斜与否：font-style
	- font-style:italic; 倾斜
	- font-style:normal; 正常

### 块级元素居中
> margin:0 auto;  必须是块级元素
```
<style>
    .box1{
        width: 300px;
        height: 250px;
        background-color:lightblue;
        margin:0 auto;
    }
</style>
```

### 行高

```
line-height:30px;
```
### 文字垂直居中
- 让元素高度等于行高

```
p,li{
    /* 元素高度 */
    height:50px;
    /* 行高 */
    line-height:50px;
    /* 元素下间距 */
    margin-bottom:20px;
}
```

### 设置边框
- border
	- 第一个值：边框粗细
	- 第二个值：边框线型
		- 实线：solid
		- 虚线：dashed
	- 第三个值：颜色

```
 border:2px solid lawngreen;
```
- 图片边框
	- border:10px solid transparent;
	  border-image: url('./bussiness-man.svg') 30  round;
 [boder-image 图片边框属性详解](https://www.jianshu.com/p/6ca92208ae4f)

### 鼠标指向效果
```
li:hover{
     background-color:dodgerblue;
     /* 元素下间距 */
     margin-bottom:20px;
   }
```
> 鼠标指向li时的背景颜色。

```
li:hover a{
     background-color:dodgerblue;
     /* 元素下间距 */
     margin-bottom:20px;
   }
```

### margin几个作用
- 距左边界距离：margin-left:值px;
- 元素下间距：margin-bottom:20px;