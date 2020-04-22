/*
    string,number,undefined,null,boolean,object

    ts:
        数组 
            let ary:Array<number> = [1,2,3];
            let ary:number[] = [1,2,3];

        元组
            let ary:[string,number] = ['1',3];


        枚举:
            enum
                定义一个枚举
                enum Flag {succ:1,error:0}

                let f:Flag = Flag.succ;
*/

// {
//     let num = 10;
//     console.log(num);
// }
// let num:number = 10;
// num = 11;
// console.log(num);

// let str:string = '珠峰';
// console.log(str);

// let b:boolean =  true;

// let nn:number | undefined;

// // console.log(nn!==undefined?nn*5:nn);

// let obj:null | object = null;

// obj = {};


// let ary:number[] = [1,2];
// let ary2:Array<number> = [1,2];


//元组
// let arr:[number,string] = [123,'123'];

// console.log(arr[0]);


//any类型（所有类型）

// let num:any = 10;
// num = '10';
// num = [];

// let ary:any[] = [1,2,'3',true];


// :void  函数没有返回值


// ary.push('5');
    // 1成功，0失败
    //obj = {succ:1,error:0}  obj.succ
    // enum flag {
    //     succ = 1,
    //     error = 0
    // }

    // let f:flag = flag.succ;
    // console.log(f);

    /*
        let status = {
            succ:1,error:0
        }

        let f = status.succ;

        code : 0

    */
    
    //枚举具有初始化器的特性，在枚举的第一项定义了一个初始值，那么后面的值会+1，以此类推
    // enum Direction {
    //     down = 1,
    //     up,
    //     right,
    //     left
    // }
    // console.log(Direction.left)


    //函数

    // function fn(a,b){
    //     console.log(a+b);
    //     return a+b;
    // }

    // console.log( fn(1,2) );


    // function fn(a,b):number{
    //     return a+b;
    // }


    // function fn(a,b):void{
    //     console.log(a+b);
    // }
    // console.log( fn(1,2) );

    //在函数圆括号结束和花括号开始的地方可以定义函数的返回值的数据类型
    // function fn(a:number,b:number):number{
    //     console.log(a+b);
    //     return a+b;
    // }
    // console.log( fn(1,2) );


    // let myAdd: (x: number, y: number) => number = function(x: number, y: number): number { return x + y; };

    // // console.log(myAdd(5,6));

    // // function fn(x:number,y:number) :number; //定义fn的格式

    // //fn的具体实现
    // function fn(x:number,y:number) :number {
    //     return x+y;
    // }
    // console.log(fn(5,6));

    
    /*
        ?代表的是可传或者可不传(可选参数)

        注意:
            ?不能写在前置位参数上，应该放在最后
    */
    // function fn(name:string,age?:number):string{
    //     if(age){
    //         return '我的名字叫' + name + '我的年龄是多少'+age;
    //     }else{
    //         return '我的名字叫' + name + '我的年龄保密';
    //     }
    // }
    // console.log(fn('李磊',20));


    /*
        如果参数有默认参数，如果不传，要使用undefined占位
    */
    // function fn(name='尹德智',age?:number):string{
    //     if(age){
    //         return '我的名字叫' + name + '我的年龄是'+age;
    //     }else{
    //         return '我的名字叫' + name + '我的年龄保密';
    //     }
    // }
    // console.log(fn(undefined,20)); 


    /*
        剩余参数
            需要给剩余参数规定数据类型
    */
    // function buildName(firstName: string, ...restOfName: string[]) {
    //     return firstName + " " + restOfName.join(" ");
    // }
  
    // let employeeName = buildName("Joseph", 'lilei', "Lucas", "MacKinzie");


    // function buildName(firstName: string, ...restOfName:any[]) {
    //     return firstName + " " + restOfName.join(" ");
    // }
  
    // let employeeName = buildName("Joseph", 1, "Lucas", "MacKinzie");

    
    // function buildName(firstName: string, ...restOfName:[number,string,string]) {
    //     return firstName + " " + restOfName.join(" ");
    // }
    // let employeeName = buildName("Joseph", 1, "Lucas", "MacKinzie");



    // function fn(x:number){
    //     console.log(this);
    // }
    // fn(5);


    //重载：通过参数类型的不一样，返回的结果也不一样

    // function fn(arg){
    //     if(typeof arg === 'number'){
    //         return 1;
    //     }else{
    //         return '参数不是数字';
    //     }
    // }
    // console.log(fn(10));
    // console.log(fn('dadsa'));

    
    //定义的规则（说明当前函数需要重载，并且说明函数规则）
    // function fn(name:string):string;
    // function fn(name:string,age?:number):number;

    //  //具体实现 
    // function fn(name:string,age?:any):string|number{ //如果有多种返回值可以使用 | 
    //     if(age){
    //         return age;
    //     }else{
    //         return '名字是'+name
    //     }
    // };
   

    // console.log(fn('李磊'))
    // console.log(fn('李磊',20))



    /*
        类：
            在定义类的时候需要*把属性的类型*定义好
            类里面的修饰符 ts提供了四种修饰符
            - public 公有  在类里面、子类、类外面都可以访问
            - protected 保护类型 在类里面、子类里面可以访问，但是在类的外面是不能访问的
            - private 私有  只能在类里面访问，子类、类外都不能访问
            - readonly 只读
    ```

    */
        

    // class Person {
    //     public name:string;
    //     public age:number;
    //     constructor(n:string,age:number){
    //         this.name = n;
    //         this.age = age;
    //     }
    // }

    // class Coder extends Person{
    //     constructor(n:string,age:number){
    //         super(n,age);
    //     }
    // }

    // // let p = new Person('李瑞州',20);

    // let c = new Coder('李瑞州',20)

    // // p.age = 30;

    // console.log(c.age);




    // class Person {
    //     protected name:string;
    //     public age:number;
    //     constructor(n:string,age:number){
    //         this.name = n;
    //         this.age = age;
    //     }
    // }

    // class Coder extends Person{
    //     constructor(n:string,age:number){
    //         super(n,age);
    //     }
    //     say(){
    //         console.log(this.name);
    //     }
    // }

    // let p = new Person('李瑞州',20);
    // let c = new Coder('李瑞州',20);
    // c.say();
    // p.age = 30;
    // console.log(p.age);


    // class Person {
    //     //类本身的属性的类型
    //     protected name:string;
    //     public age:number;
    //     private sex:string;
    //     constructor(n:string,age:number,s:string){ //传入的属性类型
    //         this.name = n;
    //         this.age = age;
    //         this.sex = s;
    //     }

    //     say(){
    //         console.log(this.sex);
    //     }
    // }

    // class Coder extends Person{
    //     constructor(n:string,age:number,s:string){
    //         super(n,age,s);
    //     }
    //     say(){
    //         console.log(this.name);
    //     }
    // }

    // let p = new Person('李瑞州',20,'男');
    // // p.say();
    // let c = new Coder('李瑞州',20,'男');
    // c.say();
    // console.log(p.sex);


    // class Person {
    //     protected name:string;
    //     public age:number;
    //     private sex:string;
    //     readonly title:string; 
    //     constructor(n:string,age:number,s:string,t:string){ //传入的属性类型
    //         this.name = n;
    //         this.age = age;
    //         this.sex = s;
    //         this.title = t;
    //     }

    //     say(){
    //         console.log(this.sex);
    //     }
    // }

    // let p = new Person('李瑞州',20,'男','小组长');

    // p.title = '123';
    // console.log(p.title);

   


    /*
        抽象类
            抽象类做为其它派生类的基类使用。 
            它们一般不会直接被实例化。 
            不同于接口，抽象类可以包含成员的实现细节。
             abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
    */

    //定义的规则(抽象类)
    // abstract class Person {
    //     name:string;
    //     constructor(n:string){
    //         this.name = n;
    //     }
    //     abstract say():void;
    //     abstract run():number;
    // }

    // //派生类
    // class Coder extends Person {
    //     run(): number {
    //         console.log('我会跑');
    //         return 1;
    //     }
    //     constructor(n:string){
    //         super(n); 
    //     }
    //     say(){
    //         console.log(this.name);
    //     }
    // }

    // let c = new Coder('王萌军');
    // c.say();
    // c.run();



    //接口
        
    // interface getName {
    //     name:string;
    //     age?:number; //接口里面可以放可选参数
    //     readonly sex:string; //可以设置可续属性
    // }

    // function fn(obj:getName){
    //     console.log(obj.sex);
    // }

    // function fn2(obj:getName){
    //     console.log(obj.name);
    // }

    // let o = {name:'白伟',age:10,sex:'男'}
    // fn(o);


    //函数接口
    // interface SearchFunc {
    //     (source: string, subString: string): boolean;
    // }

    // let fn : SearchFunc;  //fn具备SearchFunc的规则；

    // fn = function(source: string, subString: string):boolean{
    //     return source > subString;
    // }

    // fn('a','b');


    // 可索引的类型
    // interface StringArray {
    //     [index: number]: string;
    // }
      
    // let myArray: StringArray;
    // myArray = ["Bob", "Fred"]; //[0:'bob',1:'fred']

    // let m:string = myArray[0];

    // console.log(m);


    /*
        类类型
            通过implements去使用类接口
    */
        
    // interface Animal {
    //     name:string;
    //     eat():void;
    // }

    // class Dog implements Animal {
    //     name: string;  
    //     constructor(n:string){
    //         this.name = n;
    //     }      
    //     eat(): void {
    //         console.log('啃骨头');
    //     }
    // }

    // new Dog('旺财').eat();
    

    //接口扩展
    interface Animal {
        name:string;
        eat():void;
    }

    interface Botany extends Animal{
        dong():boolean;
    }

    class Person implements Botany {
        constructor(name:string){
            this.name = name;
        }
        dong(): boolean {
            return false;
        }        
        name: string;
        eat(): void {
            console.log(this.name + '吃东西')
        }
    }

    let p = new Person('冉德鹏');
    p.eat();










    



    
   




















