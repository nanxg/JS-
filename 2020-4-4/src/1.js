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
function fn(x) {
    console.log(this);
}
fn(5);
