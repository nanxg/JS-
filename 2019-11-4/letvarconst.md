[toc]

# let/var/const

- 原始值：
            存储在栈（stack）中的简单数据段，也就是说，它们的值直接存储在变量访问的位置。
- 引用值：
            存储在堆（heap）中的对象，也就是说，存储在变量处的值是一个指针（point），指向存储对象的内存处。

## var

- 通过var声明变量，会进行预解析（变量提升）
- 因为会预解析，所以变量会当做属性存到全局的活动变量对象下（window下）
- 不会主动存储每次循环的值
- 不支持块级作用域

## let

- 通过let声明变量，不会进行预解析（不会变量提升）
- 不能重复声明同名变量、函数、参数
- 在定义变量之前访问这个变量，会报错；let之前的访问空间叫暂存死区
- 会存储每次循环的值
- 支持块级作用域

### 块：{}

- 类似封闭空间
- 在块套块中，子块有函数，子块之外(父块内或者父块外)的上方访问这个函数都是undefined；在子块下方访问这个函数就是这个函数

```
{
	let a=10
	console.log(a);//10
}
console.log(a);//报错
```

```
console.log(a);//undifined
{
	var a=10	
}
console.log(a);//10
```

```
{
    console.log(fa); //undefined
    {
        console.log(fa); //fa()
        function fa(){ console.log(a); }
    }
    console.log(fa);  //fa()
}
```

```
console.log(fb);//undefined
    {
        console.log(fb); //fb(){}
        function fb() { };
        {
            console.log(fb); //fb(){console.log(a);}
            function fb(){ console.log(a); }
        }
        console.log(fb);  //fb(){}
    }
    console.log(fb); //fb(){}
```

## const

- 常量，不可变的量，声明一个不允许改变的量的时候使用
- 不能声明同名变量、函数、参数

```
let fn=0 //报错
function fn(a){
	let a=0 //报错
}
```

- 注意：
		使用const声明的数据，它只会监控这个数据的`地址`。

```
const obj = {b:0}
    // obj = 10;//地址改变，报错
    obj.b = 100;//改变b的值，地址不变
    console.log(obj);//{b: 100}
```

```
let aa = {aa:10}
let bb = {bb:10}
let obj = {aa:20}
    obj[bb] = 30; 
/*
obj = {
    //{bb:10}:30 //obj中增加变量bb的属性，会把bb的值转成字符串
    [object Object]：30
}
*/
console.log(obj[aa]);//30；获取obj中变量aa的属性，会把aa的值转字符串，与bb的值转字符串相同
```