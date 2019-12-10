[toc]

## 第八天A模块笔记

### css3选择器

- .main>h1:nth-child(n){}：代表选中`.main里所有儿子元素`中的第n个,并且是h1标签的元素
- .main>h1:nth-last-child(n){}：代表选中`.main里所有儿子元素`中的倒数第n个,并且是h1标签的元素
- nth-of-type(n){}：代表选中`特定类型`中的第n个
- nth-last-of-type(n){}：代表选中`特定类型`中的倒数第n个
- nth-child(2n+1){}或者nth-child(odd){}：选中奇数
- nth-child(2n){}或者nth-child(even){}：选中偶数
- first-child{}：选中第一个
- last-child{}：选中最后一个
- only-child：选择父元素只包含一个子元素
- only-of-type：选择父元素只包含一个同类型的子元素
- empty：选择没有子元素的元素，并且该元素没有任何文本节点

```
    <style>
    /* 第二个儿子元素 */
    /* ul>li:nth-child(2){
        background:lawngreen;
    }
    /* 第五个儿子元素 */
    /* ul>li:nth-child(5){
        background:lightslategrey;
    }  */
    /* 选中偶数 */
    /* ul>li:nth-child(2n){
        background:mediumaquamarine;
    } */
    ul>li:nth-child(even){
        background:mediumpurple;
    }
    /* 选中奇数 */
    /* ul>li:nth-child(2n+1){
        background:mediumspringgreen;
    } */
    ul>li:nth-child(odd){
        background:darkslateblue;
    }
    /* 第一个儿子元素 */
    ul>li:first-child{
        background:darkorange;
    }
    /* 最后一个儿子元素 */
    ul>li:last-child{
        background:darkorange;
    }
    /* 倒数第三个儿子元素 */
    ul>li:nth-last-child(3){
        background:darksalmon;
    }
    /* 第三个儿子元素切切符合h1标签的 */
    .main>h1:nth-child(3){
        background:darkslateblue;
    }
    /* h1类型中第二个 */
    .main>h1:nth-of-type(2){
        background:darksalmon;
    }
    /* p类型倒数第二个 */
    .main>p:nth-last-of-type(2){
        background:mediumaquamarine;
    }
    /* p类型最后一个 */
    .main>p:last-of-type{
        background:lawngreen;
    }
    /* p类型第一个 */
    .main>p:first-of-type{
        background:lightslategrey;
    }
</style>

<body>
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <div class="main">
        <p>p1</p>
        <p>p2</p>
        <h1>h1</h1>
        <h2>h2</h2>
        <p>p3</p>
        <h1>h1</h1>
        <h2>h2</h2>
        <p>p4</p>
    </div>
</body>
```

### 定位：position

- 静态定位：static（默认）
- 相对定位：relative
- 绝对定位：absolute
- 固定定位：fixed

定位方向：left、right、top、bottom。
> 相对定位参照物为`自身`，绝对定位参照物为`其他元素`（存在定位规则），固定定位参照物为`浏览器窗口`。

#### 相对定位

position:relative;

- 没有脱离文档流，位置还在。
- 相对定位的元素层级高于普通文档流元素。
- 给绝对定位做参照物。
- 相对定位参照物是自身。

#### 绝对定位

position:absolute;

- 脱离文档流，不占位。
- 层级高于普通文档流。
- 参照物不能是同级元素，只能是包含关系的上级（先辈）元素。
- 浏览器在寻找参照物的时候如果有多个设置，按照`就近原则`；如果没设置，则参照物为`body`。
- 宽度不可继承，由自身内容决定；行内元素定位后宽高起作用。
- 给绝对定位元素的宽度设置百分比的时候，那它是相对参照物来说的，并不是父级。

> 参照物：position:relative;或者position:absolute;、position:fixed; ,只要是三者之一即可。

#### 固定定位

position:fixed;

- 参照物为浏览器窗口，通常用来做快速导航。

#### 定位元素的层级

- z-index:数值;
	- 数值越大层级越高。

#### 面试题：如何让一个元素在屏幕或者盒子中垂直居中？

用绝对定位或者相对定位，条件：
- left:50%;
- top:50%;
	- margin-left:负的元素宽度的一半;
	  margin-top:负的元素高度的一半;
	- 或者transform:translate(-50%,-50%);
      存在兼容性问题

（`css3对不同浏览器兼容性问题需加前缀`）
```
transform:translate(-50%,-50%);
    /* CSS3需要加前缀 */
        /* 欧朋 */
-o-transform:translate(-50%,-50%);
        /* 火狐 */
-moz-transform: translate(-50%,-50%);
        /* ie */
-ms-transform: translate(-50%,-50%);
        /* 谷歌 */
-webkit-transform: translate(-50%,-50%);
```
> flex布局也可居中详见第14天。

#### 插入图片兼容性问题
- 用img插入图片时，会给他父盒子底部存在几像素间距

`解决办法`：`把img转换成块`。
- `背景图片不存在此问题`。

### 精灵图（css Sprites）

把多张图片合并到一张上，这样的图片叫精灵图或者雪碧图。
- 作用：正常有几张图片网页加载时就需要发送多少次http请求，如果做成精灵图可以减少请求次数，加快加载速度。

注：一般只用小图。
- 原理：通过改变background-position。在写精灵图的时候，background-position的x轴，y轴的值一定的负的。

### 画圆

[border-radius圆角边框属性讲解](https://jingyan.baidu.com/article/1876c852549b2a890b1376bf.html)
- border-radius：
- 四个属性值，分别表示左上角、右上角、右下角、左下角的圆角大小（顺时针方向）
- 两个属性值，找对角
- 一个属性值表示元素四个方向的圆角大小，即每个圆角的“水平半径”和“垂直半半径”都相同
- 斜杠二组值：第一组值表示水平半径，第二组值表示垂直半径，每组值也可以同时设置1到4个值，规则与上面相同。
```
border-radius:50%;
border-radius:50% 50% 50% 50%;
border-radius:60px 60px 60px 60px/100px 100px 60px 60px;

height:10px;
width:10px;
border-radius:5px; 
//半圆
{
   width: 60px;
   height: 120px;
   background: #EC0465;
   border-radius: 60px 0 0 60px;
}
//扇形
 {
   width: 60px;
   height: 60px;
   background: #EC0465;
   border-radius: 0 0 0 60px;
}
//椭圆
{
   width: 160px;
   height: 100px;
   background: #EC0465;
   border-radius: 80px/50px;
}
```

### 阴影

- 边框阴影：box-shadow
- 文字阴影：text-shadow
```
 /* 
      第一个值代表 阴影x轴偏移量
      第二个值代表 阴影y轴偏移量
      第三个值代表 阴影的模糊度
      第四个值代表 阴影的大小
      第五个值代表 阴影颜色
    */
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
```


