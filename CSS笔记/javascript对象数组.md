[toc]

## javascript对象数组

### 对象object

- 创建对象：创建一个对象，就在堆内存中开辟一个16进制的空间，在空间中存储一些数据,然后再把地址指针赋值给变量

#### 普通对象

> {xxx:'xxx',xxx:xxx}，如{name:'jeck',age:18}

- 任何一个对象外层由'{}'包裹，由0-N个键值对组成，键值对之间用“,”隔开,每个键值对由“属性名：属性值”组成，属性值由字符串或数字组成。
- 属性名与属性值都是字符串。
- 属性名不能重复，重复会覆盖。
- 获取(查找)属性：“ 对象.属性名 ”，或者 “ 对象['属性名'] ”。
	- 如果属性名为数字，则不能用“ 对象.属性名 ”的方式查找，可以用 “ 对象['属性名'] ”查找。
	- 查找属性名不存在，则为undefined。
- 新增/修改键值对：对象.属性名="xxx "（原本有此属性，则修改；没有则新增）。
- 删除：
	- 假删除=>手动赋值为null或undefined；
	 -真删除=>delete 对象.属性名。
```
<script>
    let monkey = {
        name:"sunwukong",
        age:666,
        energe:888,
        4:16
    }
    //打印查找内容
    console.log(monkey.name)
    console.log(monkey['age'])
    // console.log(monkey.4) 错误
    console.log(monkey['4'])
    console.log(monkey[4])
    //没有此属性名，为undefined
    console.log(monkey.logo)
    //增/改
    monkey.age = 555;
    monkey['name'] = 'houzi'
    monkey.y=222
    console.log(monkey['age'])
    console.log(monkey['y'])
    //删除
    monkey.age=null //假删
    delete monkey.energe //真删
    console.log(monkey)
</script>
```

#### 获取对象属性的方法

```
    <script>
        let name = 'zhuwuneng'
        let pig = {
            //name:name, 
            name,  //如果属性名和属性值一样（就看写的是否一样，不管性质是否一样），可以只写一个
            age: 'null',
            fire: 3000,
            speed: 0,
        }
        //属性值可以是一个表达式，获取输出结果会把他算出来；还可以是一个变量
        console.log(pig['name']);

        //利用变量名获取对应的属性值
        let a = 'name'
        let dog = {
            name: '1234',
            age: 'null',
            fire: 3000,
            speed: 0,
            3: '66',
            1: 44,
        }
        //获取对象中的属性名，两种方式：“对象.属性名”、“对象['属性名']”，若第二种中括号内没加'',则把属性名当做变量处理=>对象[变量名]
        //想用变量的形式去获取属性值，只能用对象名[变量名]
        console.log(dog[a]);//=>dog['name']=>'1234'
        console.log(dog.a);//=>undefined
        //console.log(dog[sss]);//报错
        console.log(dog[3]);

        //如果属性名是数字，会在前边输出，且从小到大依次排列
        //key是个变量，指键值对的属性名
        for (var key in pig) {
            console.log(key);//输出每一个键值对的属性名（因为有几个键值对就循环几次）
            console.log(pig[key]);//输出每一个键值对的属性值 
        }
    </script>
```

#### 数组

> ['x','x',123,324]

- 外层由“[]”包裹，括号内存放的是属性值，属性值之间用“,”分隔。
- 属性名为数字，第一项属性名为0，依次递增并且代表每一项的位置，也叫 “索引”
- length：自带属性，代表数组长度（项数）
- 数组的第一项索引是0
- 数组的最后一项索引是length-1

```
    let ary=[12,true,'erya',[1]];
    console.log(ary);
    console.log(ary[0]); // 获取数组的第一项
    ary[1] = 5; // 修改第二项
    ary[ary.length-1] = 4; // 修改最后一项
    console.log(ary[ary.length-1]); // 获取数组的最后一项
    ary[ary.length] = 'hongchen'; // 向数组末尾追加一项
    console.log(ary);
    console.log(ary.length); // 获取数组长度
```

##### 数组的增删改

###### push

- 含义：向数组末尾增加一个或多个数据
- 实参：可以传多个js数据值
- 返回值：返回的是新数组的length
- 原数组发生变化

```
        let a=[12,34,56,78];
        console.log(a.push(({1:66}),true,'Y')); // 7(返回值)
        console.log(a); //[12, 34, 56, 78, {1:66}, true, "Y"]
     // 其他给末尾增加项的办法
        a[a.length]='1'; //给a末尾增加一项
        a=[...a,2,3,4]; // 此法给a末尾增加项，a换了新地址
```

```
// push运行原理
		let ary = [1];
		function push(ary,...arg){ //[2,3,4]
            let ary2 = [...ary,...arg]; //[1,2,3,4]
            let len = ary2.length;
            for(let i=0;i<ary2.length;i++){
                ary[i] = ary2[i];
            }
            return len;
        }
        console.log(push(ary,2,3,4))
```

###### unshift

- 含义：数组首位增加一个或多个数据
- 实参：可以传多个js数据值
- 返回值：返回的是新数组的length
- 原数组发生变化
           
```
        let b=[12,34,56,78];
        console.log(b.unshift(({1:66}),true,'Y')); //7
        console.log(b); //[{1:66}, true, "Y", 12, 34, 56, 78]
     // 其他给开头增加项的办法
     // b[-1]=2  不可取，末尾增加了一项，length不变
        b=[2,3,4,...b]; // 此法给b开头增加项，b换了新地址
        console.log(b); //[2, 3, 4, {1:66}, true, "Y", 12, 34, 56, 78]
```

###### shift

- 含义：删除数组首位的一项
- 实参：不传
- 返回值：删除的那一项
- 原数组改变
           
```
        let c=[12,34,56,78];
        console.log(c.shift()); //12
        console.log(c); //[34,56,78]
     // 其他删除开头项的办法
        //delete ary[0]; // 删除第一项，length不变
        //console.log(c); // [empty, 56, 78]
```

###### pop

- 含义：删除数组末尾一项
- 实参：不传
- 返回值：删除的那一项
- 原数组改变
           
```
        let d=[12,34,56,78];
        console.log(d.pop()); //78
        console.log(d); //[12,34,56]
     /* 其他办法
        d.length = d.length-1  //修改数组的长度，删除数组最后一项属性名和属性值
        d.length --   //数组长度减一，删除数组最后一项属性名和属性值
        console.log(d); //[12]
      */
```

###### splice

- 含义：实现数组增删改
- 实参：(n,m,x)从索引n开始，删除m个(无需删除可写0)，添加值x(可写多个，用逗号分隔，无需添加值可不写)
	- 括号内第一项为索引，第二项为删除的项数，第三项之后为替换的项
- 返回值：由删除项组成的新数组（没有删除，返回空数组）
- 原数组改变

```
   /*删*/
     // (n,m):从索引n开始，删除m个（如果m不写，那就是从索引n删到末尾）
        let e=[12,34,56,78];
        //console.log(e.splice(1,2)); // [34,56]
        //console.log(e); // [12,78]
        console.log(e.splice(2)); // [56,78]
        console.log(e); // [12,34]
        //console.log(e.splice(0)) //清空数组
        //console.log(e.splice(0,1)) //删除第一项
        //console.log(e.splice(e.length-1)) //删除最后一项
   /*增改*/
     // (n,m,x)从索引n开始，删除m个，用x替换（括号内第一项为索引，第二项为删除的项数，第三项之后为替换的项）
     // (n，0，x)从索引n前边增加一项（或多项）x
     // 没有删除，返回值就是空数组
        let f=[12,34,56,78];
        console.log(f.splice(2,1,'x','r'));//56
        console.log(f.splice(1,0,'w'));//没有删除，返回空数组
        console.log(f.splice(f.length,0,'Y'));//末尾增加一项
        console.log(f);//[12,'w',34,'x','r',78,'Y']
```

###### 首/尾,增/删一项总结

- 数组末尾增加一项
        1. ary.push('xxx')
        2. ary[ary.length]='xxx'
        3. ary.splice(ary.length,0,'xxx')
        4. ary=[...ary,'xxx']
        5. ary.concat('xxx')
- 数组开头增加一项
        1. ary.unshift('xxx')
        2. ary.splice(0,0,'xxx')
        3. ary=['xxx',...ary]
        4. ['xxx'].concat(ary)
-  数组末尾删除一项
        1. ary.pop()
        2. ary.splice(ary.length-1)
        3. ary.length- -
        4. ary.length = ary.length-1
- 数组开头删除一项
        1. ary.shift()
        2. ary.splice(0,1)

##### 数组的查询和拼接（不会改变原数组）

###### slice

- 含义：查询数组中的某项
- 实参：slice(n,m)：从从索引n开始，查询到索引m（不包含索引m对应的那一项；不写m则查询到末尾）
- 返回值：查询的那几项组成的新数组
- 原数组不变

```
     //(n,m)：从从索引n开始，查询到索引m（不包含索引m对应的那一项；不写m则查询到末尾）
        let g=[12,34,56,78];
        console.log(g.slice(2,3)); // 56
        console.log(g.slice(0)); // 数组浅克隆 [12,34,56,78]
        console.log(g.slice()); // 数组浅克隆 [12,34,56,78]
        console.log(g); // [12,34,56,78]
```

###### concat

- 含义：拼接数组
- 实参：js数据值（可以是数组，可以是值，用逗号分隔）
- 返回值：拼接后的新数组
- 原数组不变

```
        let h1=[12,34];
        let h2=[56,78];
        console.log(h1.concat(h2,'xx',11)); //[12,34,56,78,"xx",11]
       
        let hh=[...h1,...h2,'aa',22]//数组拼接
        let hhh=[h1,h2,'aa',22]
        console.log(hh); //[12,34,56,78,"aa",22]
        console.log(hhh); //[[12,34],[56,78],"aa",22]
```

##### 数组转字符串

###### toString()

- 含义：把数组转字符串
- 实参：无
- 返回值：转换后的字符串
- 原数组不变

```
        let i=[12,34,56,78];
        console.log(i.toString());//'12,34,56,78'
        console.log(i);
```

###### join

- 含义：把数组以指定的分隔符转为字符串
- 实参：字符串类型的分隔符
- 返回值：转换后的字符串
- 原数组不变

```
        let j=[12,34,56,78];
        console.log(i.join('!')) //'12!34!56!78'
        console.log(i.join()) //'12,34,56,78'
        console.log(i.join('')) //'12345678'  
      // console.log(eval(i.join('+'))); // 180
         let ss=i.join('+'); 
         console.log(ss); // '12+34+56+78'
         console.log(eval(ss)); // 180 (eval：把字符串转换为表达式)  
```

##### 检测数组中是否包含某一项

###### indexOf()和lastIndexOf()

- indexOf(x,y)
	- 含义：检测数组中某个值开始的位置(从前往后查找第一个)
	- 参数：x:要检测的属性值，y:检测开始位置的索引
	- 返回值：如果有就返回那一项索引，否则返回-1
	- 原数组不变
- lastIndexOf(x,y)
	- 含义：检测数组中某个值末尾的位置(从后往前查找第一个)
	- 参数：x:要检测的属性值，y:检测开始位置的索引
	- 返回值：如果有就返回那一项索引，否则返回-1
	- 原数组不变

```
         let k=[1,2,34,1,7,8];
         console.log(k.indexOf(1)); // 0
         console.log(k.indexOf(1,1)); // 3
         console.log(k.lastIndexOf(1)); // 3
         console.log(k.lastIndexOf(1,2)); // 0
         console.log(k.lastIndexOf(5)); // -1
         console.log(k.indexOf(5)); // -1
```

###### includes

- 含义：检测数组中是否包含某一项
- 参数：要检测的属性值
- 返回值：如果有就是true，没有就false
- 原数组不变

```
         let l=[1,2,34,1,7,8];
         console.log(l.includes(1)); //true
         console.log(l.includes(5)); //false
```

##### 数组排序

###### reverse

- 含义：给数组倒着排序
- 参数：无
- 返回值：反序的数组
- 原数组变化

```
		 let m=[12,56,34,78];
         console.log(m.reverse());//[78,34,56,12]
```

###### sort

- 含义：给数组排序
- 参数：函数/无
	- 如果不传参，只能按照每项最左边的一位数排序
- 返回值：排序后的数组
- 原数组变化

```
	  // 如果排序的数组里有不同位数的项，就得用传参的方式处理
         let n=[12,59,'d',34,'ag',78,7];
         console.log(n.sort());//[0,12,34,59,7,78,'ag','d']（如果不传参，只能按照每项最左边的一位数排序）
         console.log(n.sort((a,b)=>{
             return a-b //从小到大排序a-b，反之b-a//相减为正就交换位置，weifu
         })); // [7,12,34,59,78,'ag','d']
         
         let z=[12,10,13,14,11];
         console.log(z.sort()); // [10,11,12,13,14]    
```

##### Array.isArray()

-  判断一个对象是不是数组，返回的是布尔值


##### forEach

> forEach(回调函数,改变this指向)

- 将数组中的每个元素执行传进提供的函数，没有返回值，不改变原数组
- 含义：遍历数组
- 参数：forEach((x,y,z)=>{console.log(x,y,z)})： x:每一项的值；y:每一项的索引；z:原函数
- 返回值：没有return
- 原数组不变

```
	// 运行原理
    // function forEach(ary,callback){
    //     for(let i=0;i<ary.length;i++){
    //         callback(ary[i],i,ary);
    //     }
    // }
    // forEach(ary,function(a,b,c){
    //     console.log(a,b,c);
    //     // console.log(this);
    // });
    
         let o=['w','s','q','f'];
         o.forEach((item,index)=>{
             // item是每一项的值
             // index是每一项的索引
             // 数组有几项就循环几次
            console.log(item,index); /* 'w' 0
                                        's' 1
                                        'q' 2
                                        'f' 3 */
         });
         
         console.log(o.forEach((a,b)=>{
             // 左边是每一项的值
             // 右边是每一项的索引
             // 数组有几项就循环几次
            console.log(b,a); /*  0 'w'
                                  1 's'
                                  2 'q'
                                  3 'f' */
```

##### map

> map(回调函数,改变this指向)

- 将数组中的每个元素调用一个提供的函数，结果作为一个新的数组返回，长度与原数组一致，并没有改变原来的数组
- 参数：
	- 回调函数(每个数据,数据索引,整个数组)
- return 后面是什么，新数组就是什么

```
// 运行原理
  // function map(ary,fn){
  //   let ary2 = [];
  //   for(let i=0;i<ary.length;i++){ //循环旧数组
  //       ary2.push( fn(ary[i],i,ary) )
  //   }
  //   return ary2;
  // }

  // 给ul标签里边添加li
      let ar = ['好好学习','天天向上','排除万难','赢得高薪']
        ul.innerHTML = ar.map((item,index,all)=>'<li>'+item+'</li>').join('')
```


##### some

> some(回调函数,that)

- 查看数组中每一项是否有一项符合条件，有一个符合就true，没有就false

```
   let ary = ['珠', 'feng', '培训', 17, 16, 18, '哈'];
   let b = ary.some(function(item){
       return item >= 19;
   });
   console.log(b);//false
   let c = ary.some(function(item){
       return item <= 16;
   });
   console.log(b);//true
```

##### every

> every(回调函数,改变this指向) 

- 查看数组中每个成员是否都符合条件，都符合就true，有一项不符合就false

```
	let ary = ['珠', 'feng', '培训', 17, 16, 18, '哈'];
    let bb = ary.every(function(item){
        return !!item === true;  //!'珠'->false->!false => true
    });

    console.log(bb); //true
```

##### filter

> filter(回调函数,修改this)

- 过滤:把数组中符合条件的那一项放到一个新数组中，并且返回这个`新数组`
- 回调函数return后边是判断条件
```
let arr = [true, false, false, false, false];
        let arr2 = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === false) {
                arr2.push(arr[i]);
            }
        }
        // console.log(arr2);
        console.log(arr.filter(item => item === false));
```

##### find 查找类

- find(回调函数,改变this指向)
            查找回调函数中，符合规定的数据，把他(第一个)返回，找不到就返回undefined
- findIndex(回调函数,改变this指向)
            查找回调函数中，符合规定的数据，返回索引，找不到返回-1

```
        // 需求：找到数组中的某个对象中name为'def'的项，并把这个数据找出来
        let ary = [
            { id: 0, name: 'abc' },
            { id: 1, name: 'def' },
            { id: 2, name: 'ghi' }
        ];
        // ①
        function find(ary, callback) {
            for (let i = 0; i < ary.length; i++) {
                let b = callback(ary[i], i, ary)
                if (b) {
                    return ary[i]
                }
            }
            return null
        }
        let f = find(ary, function (item) {
            return item.name === 'def'
        })
        console.log(f); //{id: 1, name: "def"}
        // ②
        console.log(ary.find(item => item.name === 'abc')); //{id: 1, name: "def"}

        console.log(ary.findIndex(item => item.name === 'abc')); //0
```

##### flat 数组扁平化操作

- 把数组中嵌套的多层数组展开

```
	let ary2 = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 'j', 'q', 'k']]]]
        // console.log(ary[3][3][3][2]); //'q'
        let ary3 = []
        function flat(ary2) {
            for (let i = 0; i < ary2.length; i++) {
                if (ary2[i].push) { //检测是不是数组
                    // ary3 = [...ary2,...ary2[i]];
                    flat(ary2[i])
                }
                else {
                    ary3.push(ary2[i])
                }
            }
        }
        flat(ary2)
        console.log(ary3);


        console.log(ary2.flat(4));
        console.log(ary2.flat(Infinity)); //Infinity 正无穷大（不知道套几层时用）
```

#### 全选

```
    <div>
        全选:<input type="checkbox" id="all" />
    </div>
    <div id="b">
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
    </div>
    <script>
    /* 全选 */
        //获取b下面的所有input
        const checkeds = document.querySelectorAll('#b input');
        //声明一个数组，为了存每个checkbox的值
        let aryChecked = [];
        //循环所有checkeds
        for (let i = 0; i < checkeds.length; i++) {
            //给数组的每项都添加一个false  [false,false,false,false,false]
            aryChecked[i] = false;
            checkeds[i].onclick = function () {
                //当点击的时候，把checkbox对应的布尔值存到数组中
                aryChecked[i] = this.checked; //[true,false,false,false,false]
                //查看数组中的布尔值是否都为true
                //最后把结果赋值给全选的checked
                all.checked = aryChecked.every(item => item);
            }
        }
    </script>   
```

#### 数组去重

##### 方法一

```
  // 1.创建新数组，原数组不变
        let ary=[1,2,1,2,1,2]
    //思路：循环数组每一项，把每一项放进新数组中，如果新数组中有当前项，就不放进去。
     //创建新数组
        let newAry=[];
     //循环原数组每一项
        for(i=0;i<ary.length;i++){
            let cur=ary[i];//当前循环项赋给cur
         //判断新数组中是否含有当前循环项，含有的话结束当前轮循环，否则继续向下执行
            if(newAry.includes(cur)){
                continue;
            }
          //新数组末尾增加当前循环项
            newAry.push(cur);
        }
        console.log(newAry);
```

##### 方法二（塌陷问题及解决）

```
 // 2.删除原数组重复项
        let ary1=[1,1,1,1,3,3,3,1,2]
     // 循环数组每一项
        for(i=0;i<ary1.length;i++){
            let cur=ary1[i]
          // 当前项与后边每一项作比较
            for(var j=i+1;j<ary1.length;j++){
                let item=ary1[j]
             // 判断当前项与后边项相同，则删除后边项
                if(cur===item){
                    ary1.splice(j,1);
                    j--;   //删除一项，该项之后项的索引会减一，length减一，j不减一会跳过后边相邻项，造成塌陷。所以此处j--，避免塌陷
                }
            }
        }
        console.log(ary1);

        let ary2=[1,1,1,1,'3','3','3',1,2,2,2]
        // 循环数组每一项
        for(i=0;i<ary2.length;i++){
            let cur1=ary2[i]
            // 当前项与后边每一项作比较(倒序),避免塌陷
            for(var j=(ary2.length-1);j>i;j--){
                let item1=ary2[j]
                if(cur1===item1){
                    ary2.splice(j,1);
                }
            }
        }
        console.log(ary2);      
```

- 数组塌陷问题

```
<script>
    let ss = [10, 20 ,30];
    for (let i = 0; i <ss.length; i++) {
        ss.splice(i,1);
        i--;   // 解决塌陷问题
    }
    console.log(ss); // []
</script>
```

##### 方法三

```
 // 3.新建对象，将数组不重复项放入对象，删除（覆盖）数组重复项
        let ary3=[1,1,1,1,'3','3','3',1,2,2,2];
        let obj={};
        for(i=0;i<ary3.length;i++){
        // 判断对象中是否存在数组中的i项
            if(obj[ary3[i]] !== undefined){

            /* ① 删除重复项（造成数组塌陷，消耗浏览器性能）
                ary3.splice(i,1);
                i--;  */

            // ② 把最后一项覆盖重复项，重新判断此项
                ary3[i]=ary3[ary3.length-1]
                ary3.length--
                i--; //重新判断覆盖项
                continue;
            }
        // 不重复项放入对象中
            obj[ary3[i]]=ary3[i];

         /* if(obj[ary3[i]]===undefined){
               obj[ary3[i]]=ary3[i];
               continue;
            }
            ary3.splice(i,1);
            i--; */
        }
        console.log(ary3);
```

#### 数组三大排序

```
        let ary=[3,66,18,12,15,24,6]
        // 冒泡排序
        /* 数组之间的每一项两两比较，如果前一项大于后一项，就换位置 */
        // 循环执行轮数
        for(var i=0;i<ary.length-1;i++){
            // 循环比较大小（一轮结束会产生一个最大值，所以不需再比较最后两个值的大小）
            for(var j=0;j<ary.length-1-i;j++){
                // 判断，前大于后，则交换位置；否则继续循环
                if(ary[j]>ary[j+1]){
                    let itm=ary[j];
                    ary[j]=ary[j+1];
                    ary[j+1]=itm;
                }
            }
        }
        console.log(ary);
```


#### 链接参数处理

```
 /* 把链接中向后台获取的内容转普通对象 */
    //获取链接字符串
    let str = 'https://www.baidu.com/s?word=自行车&tn=site888_3_pg&lm=-1&ssl_s=1&ssl_c=ssl1_16df6f6e8d4';
    //获取链接中问号后边的内容组成的字符串(两种方法)
        // ①获取问号在字符串中的索引，再查询问号后的字符串
         let num = str.indexOf('?');
         let newStr = str.slice(num + 1);
          console.log(newStr); //'word=自行车&tn=site888_3_pg&lm=-1&ssl_s=1&ssl_c=ssl1_16df6f6e8d4'

        // ②把字符串以问号分割成数组后获取后一项
         let paramsStr=str.split('?')[1];
          console.log(paramsStr); //'word=自行车&tn=site888_3_pg&lm=-1&ssl_s=1&ssl_c=ssl1_16df6f6e8d4'
        
    // 把字符串以&符分割成数组
    let ary = newStr.split('&');
    console.log(ary); //["word=自行车", "tn=site888_3_pg", "lm=-1", "ssl_s=1", "ssl_c=ssl1_16df6f6e8d4"]
    let obj = {};
    // 循环ary中每一项，把每个参数以等号分割成新数组
    for (i = 0; i < ary.length; i++) {
        let a = ary[i].split('=');
    // 向对象中增加键值对：把新数组中的索引0作为对象属性名，给该属性赋值新数组的索引1
        obj[a[0]] = a[1];
    }
    console.log(obj); //{word: "自行车", tn: "site888_3_pg", lm: "-1", ssl_s: "1", ssl_c: "ssl1_16df6f6e8d4"}
```

#### 递归

- 详见day08课件