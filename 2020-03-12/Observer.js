class Watcher{//观察者类
    constructor(vm,expr,callback){
        this.vm = vm;
        this.expr = expr;
        this.callback = callback;
        this.oldVal = this.getOldVal();
    }
    getOldVal(){//每次在编译指令渲染视图的时候会调用Watcher类  所以这里会获取new Watcher时候的值
        Dep.target = this;//挂载watcher实例到Dep身上
        const oldVal = compileUtil.getVal(this.expr,this.vm);//compileUtil是MVue.js的编译工具类名 getVal是它的一个方法用来获取数据的，获取的时候就相当于被数据劫持的get方法拦截到了，所以Dep.subs直接添加上面挂载的watcher
        Dep.target = null;//因为已经添加过了 所以每次都要空置对象
        return oldVal;
    }
    updata(){
        const newVal = compileUtil.getVal(this.expr,this.vm);
        if(newVal !== this.oldVal){//值不一样执行回调
            this.callback(newVal);
        }
    }
}

class Dep {//管理观察者的类
    constructor(){
        this.subs = [];//观察者池子
    }
    //收集观察者
    addSub(watcher){
        this.subs.push(watcher);
    }
    //通知观察者
    notify(){
        console.log(this.subs,'观察者');
        this.subs.forEach(watcher => watcher.updata());
    }
}

class Observer {
    constructor(data) {
        this.observer(data);//初始化先监听一波
    }
    observer(data) {
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key=>{
                this.defineReactive(data,key,data[key]);
            })
        }
    }
    defineReactive(obj,key,value){//封装的数据劫持方法
        //递归遍历
        this.observer(value);
        const dep = new Dep();//新建
        Object.defineProperty(obj,key,{
            enumerable:true,//是否可遍历
            configurable:false,
            get(){//订阅数据变化时候，往Dep中添加观察者
                Dep.target && dep.addSub(Dep.target);
                return value;//正常返回值
            },
            set:(newVal)=>{
                this.observer(newVal);//每次更新数据的时候先监听一波
                if(newVal !== value){
                    value = newVal;
                }
                //通知Dep变化
                dep.notify();
            }
        })
    }
}