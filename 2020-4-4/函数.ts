// function fn(...arg:number[]) :number {
//     return arg.length;
// }

// console.log(fn(1,2,3,4));


    // function fn(name:string):string;
    // function fn(name:string,age:number):string;
    // function fn(name:string,age?:any):string{
    //     if(age){
    //         return '年龄是'+ age;
    //     }else{
    //         return '名字是' + name;
    //     }
    // };

    // console.log(fn('局座',123))


    // class Person {
    //     name:string;
    //     age:number;
    //     constructor(n:string,age?){
    //         this.name = n;
    //         this.age = age;
    //     }
    //     run() :void {
    //         console.log(this.name,this.age);
    //     }
    // }


    // class Web extends Person {
    //     constructor(name:string){
    //         super(name);
    //     }
    // }

    // new Person('张三').run();


    //  class Person {
    //     private name:string;
    //     constructor(name:string){
    //         this.name = name;
    //     }
    //     run() :void {
    //         console.log(this.name);
    //     }
    // }

    // class Web extends Person {
    //     constructor(name){
    //         super(name);
    //     }

    //     run2(){
    //         console.log(this.name);
    //     }
    // }

    // let p = new Web('张三');

    // // console.log()
    // p.run2();
   

    // abstract class Animal {
    //     name:string;
    //     constructor(name:string){
    //         this.name = name;
    //     }
    //     abstract eat():void;
    //     run(){
    //         console.log('跑')
    //     }
    // }

    // class Dog extends Animal {
    //     constructor(name:string){
    //         super(name);
    //     }
    //     eat (){
    //         console.log(this.name+'啃骨头');
    //     }
       
    // }

    // let d = new Dog('旺财');
    // d.eat();
    // d.run();

    // new Animal;


    // interface Fname {
    //     name:string;
    //     age:number;
    // }

    // function fn(arg:Fname){
    //     console.log(arg.name+arg.age);
    // }

    // let obj = {name:'小明',age:8,kk:123}
    // fn(obj);


    //定义函数接口
    // interface ajax{
    //     (name:string,age:number):void;
    // }

    // let Ajax:ajax = function(name:string,age:number){
    //     console.log(name,age);
    // }   

    // Ajax('小明',5);




    //定义类类型

    // interface Animal {
    //     name:string;
    //     eat(str:string):void;
    // }

    // class Dog implements Animal {
    //     name:string;
    //     constructor(n:string){
    //         this.name = n;
    //     }
    //     eat(){
    //         console.log(this.name);
    //     }
    // }

    // let d = new Dog('旺财');
    // d.eat();


    //接口扩展

    // interface Animal {
    //     eat():void;
    // }

    // interface Person extends Animal {
    //     say():void;
    // }

    // class Coder implements Person {
    //     eat(){

    //     }
    //     say(){

    //     }
    // }


    //泛型

    // class Min {
    //     public list:number[]=[];
    //     add(val:number){
    //         this.list.push(val)
    //     }
    //     fn():number{
    //         return Math.min(...this.list);
    //     }
    // }

    // let m = new Min();
    // m.add(1);
    // m.add(2);

    // console.log(m.fn());



    // class Min<T>{
    //     public list:T[]=[];
    //     add(val:T){
    //         this.list.push(val)
    //     }
    //     fn():T {
    //         let num = this.list[0];
    //         this.list.forEach(item=>{
    //             if(num > item){
    //                 num = item; 
    //             }
    //         });
    //         return num;
    //     }
    // }

    // let m = new Min<number>();
    // m.add(2);
    // m.add(3);

    // console.log(m.fn());


    // class MySql<T> {
    //     add(info:T):boolean{
    //         console.log(info);
    //         return true;
    //     }
    // }

    // 把类做为参数来约束ts的另一个类

    // class User {
    //     name:string;
    //     pass:number;
    // }

    // let u = new User;
    // u.name = '张三';
    // u.pass = 123;

    // let m = new MySql<User>();
    // m.add(u);

    // class Books {
    //     name:string | undefined;
    //     page:number | undefined
    //     constructor({name,page}){
    //         this.name = name;
    //         this.page = page;
    //     }
    // }

    // let b = new Books({name:'js课程',page:5});

    // let m = new MySql<Books>();
    // m.add(b);


    //总的定义规则
    interface DB<T>{
        update(data:T);
        add(data:object):void;
        get(id:number);
    }

    //设置复用通用方法
    class MySQL<T> implements DB<T>{
        update(data: T) {
           console.log(data);
        }
        add(data: object): void {
            
        }       
        get(id: number) {
            
        }
    }

    //定义通用方法的规则
    class User {
        name:string;
        pass:string;
    }

    //调用通用方法且类做为参数约束MySQL
    let my = new MySQL<User>();

    //填充user
    let u = new User;
    u.pass = "123";
    u.name = '小明';

    //使用方法
    // my.add(u);
    // my.update(u);





    



    













