[toc]

## jquery

- http://jquery.cuishifeng.cn/
- https://www.jquery123.com
- 一个js的类库，它简化了DOM操作，动画操作，兼容性，数据请求操作。

####  jquery下载：(1.72左右的版本)

	- 通过node.js导入
	- ① 任意文件夹中shift+右键打开powershell窗口
	- ② 输入npm init -y   ->回车
	- ③ npm install jquery  ->回车

#### jquery文件版本

- 源码版（学习版）：jquery.js  
- 压缩版:jquery.min.js

#### jquery引入

```
<script src="./node_modules/jquery/dist/jquery.min.js"></script>
```

### 选择器

 $ -> jquery对象

 $() -> fn()  函数调用

 css如何去选择，jq就如何去选择

```
    $('#box')  获取id
    $('li')  获取所有li元素
    $('.active') 获取所有的.active元素
    $('#ul1 li')
    $('input[type="button"]')  属性选择器
    $('input[type!="button"]')
    $('li:even')   偶数，js从0开始计数
    $('li:odd')   奇数，js从0开始计数
    $(':button')  伪类选择器（获取type为button的元素）
    $('div:eq(0)')  代表找第1个div

```

### 属性操作

- attr('属性','值')，即getAttribute,setAttribute：
	- 写两个参数为设置属性，只写属性为获取
- removeAttr('属性','值') ，removeAttribute：
	- 写两个参数为删除属性的对应值，只写属性为全部删除
- addClass()：添加clas名 
- removeClass()：移除class名 
- prop() ，表单的状态布尔值（表单元素用）赋值用attr
	- $(':checkbox').prop('checked')  => true/false
	- 用attr获取结果为checked/undefined
- val   -> value
	- $(this).val('按钮');  =>改value值
	- $(this).val();  =>获取value值
- html()     -> innerHTML
- text()    -> innerText

```
$('.ul1 li').css({ 
	     width:100,
	     height:100,
	     background:'red'
	}).click(function(){
	    console.log(this);
	    $(this).animate({width:300}) //css动画效果 $(selector).animate(styles,speed,easing,callback)
})
$(':text').val(); //获取value值
$('.ul').html('<li>'+val+'</li>' + $('.ul').html())
$(':text').val(''); //改value值
```

### 样式操作

- css()   设置行间的样式 -> style
- 显示:  show() 参数为显示所需时间
- 隐藏:  hide() 参数为隐藏所需时间
- 显示隐藏开关：toggle() 参数为隐藏|显示所需时间
	- slidetoggle()
	- fadetoggle()

```
$('#box').css('width')   //获取style的宽度
$('#box').css('width',200)  //设置宽度
$('#box').css({
     'width':200,
     'background':'red'
  })  //批量添加
$('#box').hide();  //display = none
$('#box').show();  //显示
```

### 对象互转

- jquery对象转原生对象，原生对象转jquery对象

```
// 原生对象转jquery对象： box -> $(box) 
const box = document.getElementById('box');
console.log( $(box) );
 
// jquery对象转原生对象：$box  -> $box.get(0)  ||  $box[0] 
const $box2 = $('#box2');
console.log( $box2.get(0) , $box2[0] );

```

### DOM操作

- 增删改：
	- 添加元素：
```
	- 有内容：$('<li>内容</li>') 
    - 无内容：$('<li>')
```
- 事件中的this，默认是原生对象
- jqeury元素都可以链式调用
- $(parent).prepend(child)  等同于 insertBefore，插入到某元素的子元素的前面
- $(parent).append(child)  等同于 insertAfter，插入到某元素的子元素的后面
- $(child).appendTo(parent)  把某元素插入到父元素的后面
- $(ele).before(ele2) 插入到某元素之前
- $(ele).after(ele2) 插入到某元素之后
- parent()：parentNode  父级节点
- parents()：所有祖先级节点
- prev()：previousElementSibling 上一个兄弟节点
- next()：nextElementSibling 下一个兄弟节点
- siblings()：所有兄弟节点
- index()：索引值默认基于父级的兄弟节点索引；()内写谁就基于谁的兄弟节点

```
$('li').remove(); //删除元素
$('#ul').prepend($li) //开头添加元素

//边框一个是给ul添加，一个是给li添加
$('#ul').append($lis).css('border','1px solid #000'); //改的是ul
$li.appendTo($('#ul')).css('border','1px solid #000'); //改的是li
```

### 事件

