[toc]

## 用js写事件

- 基于js实现业务逻辑3步
1. 获取元素（想要操作谁就获取谁）
2. 给操作元素绑定相应事件
3. 在事件里写相应逻辑


### 扩展

#### 浏览器常用的输出方式，除了console.log还有哪些
+ console.log/dir/table...   在控制台输出
	+ log: 正常输出
	+ dir: 输出一个对象的详细键值对信息
	+ table: 把一个多维JSON数组在控制台按照表格的方向呈现出来
+ 浏览器窗口弹窗 alert/confirm/prompt
	+ 三种方式输出的结果都必先经过toString转换为字符串
	+ 三种方式会阻断JS代码的执行，只有当窗口关掉，JS才会继续运行
	+ alert输出的是字符串
	+ confirm：确定和取消：选择性弹框    
	+ prompt：在confirm基础上多了一个输入框
+ document.write 在页面中写入信息（往页面中写入，会替换原内容） `现在几乎已经不用`
	+ 和alert一样输出的结果都是字符串


### 获取元素的方法

- 元素id名是唯一的，不用获取也可直接用

```
<script>
    // 综合获取元素，括号内获取方式类似css选择器，获取不到就是null
    let hollo = document.querySelectorAll("ul div");
    console.log(hollo)
    // 通过class名获取元素
    let ss = document.getElementsByClassName('name')
    console.log(ss)
    // 通过标签名获取元素
	let aa = document.getElementsByTagName('li')
	console.log(aa)
	// 通过id名获取，在获取此id名下的class名元素/标签名元素
	let dd = document.getElementById("box")
	let ee = dd.getElementsByClassName('name') // 通过class名获取
	console.log(ee)
	let ff = dd.getElementsByTagName('li')
	console.log(ff) // 通过标签名获取


	// 对象.className="xxx" 给元素添加类名
	// 获取元素
	let navBox = document.getElementById('navBox') //通过元素id获取 元素（获取不到则是null）
	let navList = navBox.getElementsByTagName('li');//类数组，通过元素标签获取元素（获取不到则是空数组）

	let pp = document.getElementsByClassName('active');//类数组，通过元素的类名获取元素（获取不到就是空数组）

	let qq=document.querySelectorAll('#navBox li');//类数组，综合获取页面中元素
</script>
```

