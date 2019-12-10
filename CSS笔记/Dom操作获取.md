[toc]

## Dom操作获取

### 数组的方法

1. push  向数组的末尾新增一项；
2. pop    删除数组的最后一项
3. unshift   向数组的开头新增一项
4. shift     删除数组的第一项
5. slice(m,n)从索引m开始，截取到索引n,但不包含索引n那一项
6. splice 删除 修改 新增   splice(m,n) 从索引m开始，截取n项，并以数组的形式返回；对于原数组是删除n项；
7. sort    对数组进行排序
8. reverse   数组倒过来排
9. join  把数组每一项按照特定的字符连接，并以字符串的形式返回；
10. concat   数组的克隆(拼接)
11. indexOf  返回当前项在数第一次出现的索引
12. lastIndexOf返回当前项在数组中最后一次出现的索引位置
13. forEach/map  遍历数组

### node  : 节点

- nodeType    nodeName     nodeValue
 元素节点：    1           大写的标签名      null
 文本节点：    3           #text             文本内容
 注释节点：    8           #comment     注释内容
 document：   9           #document      null
（空格换行都是文本节点）

### DOM 节点的关系属性

1. childNodes :获取元素的所有子节点；
2. children :获取元素所有子元素节点
3. parentNode : 获取当前元素的父亲节点
4. previousSibling : 上一个哥哥节点；
    previousElementSibling : 获取上一个哥哥元素节点 (在IE8 及以下是不兼容的)
5. nextSibling  : 获取下一个弟弟节点；
    nextElementSibling : 获取下一个弟弟元素节点  (在IE8 及以下是不兼容的)
6. firstChild : 第一个子节点
    firstElementChild : 获取第一个子元素节点
(在IE8 及以下是不兼容的)
7. lastChild  : 获取最后一个子节点
    lastElementChild : 获取最后一个子元素节点  (在IE8 及以下是不兼容的)

### 动态操作DOM

1. document.createElement;创建元素对象
2. appendChild : 向容器的末尾添加一个元素；
3. insertBefore : 向容器中某一个元素的前面添加元素
    outer.insertBefore(a,center)
4. removeChild : 删除子节点
    outer.removeChild(center)
5. replaceChild : 替换子节点
    outer.replaceChild(a,center)
6. cloneNode  克隆
    true : 深克隆
    false : 浅克隆，默认是浅克隆；
7. get/set/ remove Attribute : 获取、设置、删除自定义属性

### DOM获取元素

1. id获取  id是唯一的； 如果id重复，那么获取第一个元素；
    document.getElementById("a")
2. 通过class来获取(在IE8 及以下不兼容，没有这个方法)
    document.getElementsByClassName("")
var  a = document.getElementsByClassName("box")[0];
3. 通过标签名来获取元素
    document.getElementsByTagName() : 
4. getElementsByName(): 一般用于表单元素；
5. document.documentElement : 获取html;
    console.log(document.documentElement.clientWidth);
    console.log(document.documentElement.clientHeight);
6. document.body : 获取页面的body；
7. querySelector：获取第一个  (id用#修饰  class用.)