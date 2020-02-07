
class Vue{
    constructor(opt){
        this.$el = opt.el;
        this.$data = opt.data;
        // console.log(this.$el);
        this.computed = opt.computed;
        //实例绑了el就调用Complier
        if(this.$el){
            for( let key in this.computed){
                Object.defineProperty(this.$data,key,{
                    get:()=>{
                        return this.computed[key].call(this)
                    }
                })
            }
            new Obsever(this.$data); // 先执行Obsever，后执行Complier
            this.proxyVM(this.$data); // 传入this.$data
            // 专门用来编译模板
            new Complier(this.$el,this); // 也可只传this，然后在Complier中解构
        }
    };
    // 把data的数据挂到实例下
    proxyVM(data){
        for(let key in data){
            // 读取实例的key，返回data的key
            Object.defineProperty(this,key,{
                get(){
                    return data[key]
                }
            })
        }
    }
}
// 编译器，把数据挂在DOM中
class Complier{
    constructor(el,vm){
        this.el = this.isElementNode(el)?el:document.querySelector(el); // 挂在this上，使Complier实例都可以用到
        this.vm = vm;

        // 创建文档碎片(把dom中的节点都放到内存中操作，提高性能)
        let frag = this.fragmentNode(this.el);

        // 下边代码封装为方法(未实现)
        // let frag = document.createDocumentFragment();
        // let firstc;
        // while(firstc = this.el.firstChild){
        //     console.log(firstc);
        //     frag.appendChild(firstc)
        // }

        // 处理文档碎片中的属性
        this.complie(frag)

        // 把编译好的内容插入页面
        this.el.appendChild(frag)

    };
    // 插入方法
    fragmentNode(node){
        // 创建文档碎片(把dom中的节点都放到内存中操作，提高性能)
        let frag = document.createDocumentFragment();

        let firstc;
        // 循环获取el中第一个节点
        while(firstc = node.firstChild){
            // console.log(firstc);
            // 剪切并放到文档碎片中
            frag.appendChild(firstc)
        };
        return frag
    }

    // 判断是否为元素节点
    isElementNode(node){
        return node.nodeType === 1
    };
    // 编译方法
    complie(frag){
        // console.dir(frag.childNodes);
        // 获取文档碎片子节点
        const nodes = [...frag.childNodes];
        // 循环子节点
        nodes.forEach(n=>{
            if(this.isElementNode(n)){
                // console.log('el');
                // 找到元素节点属性并循环，找到v-开头的属性，把值取出来赋值对应data中的数据
                let attrs = [...n.attributes];
                attrs.forEach(attr=>{
                    if(attr.nodeName.startsWith('v-')){ // 判断以"v-"开头,或:/^v-/.test(a.nodeName)
                        // console.log(attr);
                        let {nodeValue} = attr; 
                        // console.log(nodeValue,this.vm.$data);
                        
                        new Watcher(this.vm,nodeValue,(newVal)=>{
                            n.value = newVal;//把最新的数据赋值给input的value
                        })

                        let val = this.vm.$data[nodeValue];
                        
                        n.oninput = (ev)=>{
                            this.vm.$data[nodeValue] = ev.target.value;
                            // console.log(this.vm.$data[nodeValue]);
                        };
                        n.value = val;
                    }
                })
            }else{
                // console.dir(n);
                if(/\{\{(\w+)\}\}/.test(n.nodeValue)){
                    // console.log(n);
                    let str = n.nodeValue,key;
                    // console.log(str);
                    let attr = str.replace(/\{\{(\w+)\}\}/,(...arg)=>{
                        // console.log(arg);
                        key = arg[1];
                        return this.vm.$data[arg[1]]
                    });
                    new Watcher(this.vm,key,(newVal)=>{
                        n.nodeValue = newVal; //把最新的数据赋值给有小胡子的{{}}文本
                    });
                    n.nodeValue = attr;
                }
            }
        })
    }
}
// 文档碎片：document.createDocumentFragment

// 发布订阅
class Dep{
    constructor(){
        this.sub = []; // 订阅池，存放Wather
    };
    // 订阅(数据劫持获取数据时订阅)
    addSub(watcher){
        console.log(watcher);
        this.sub.push(watcher);
    };
    // 发布(改变数据时发布)
    notify(){
        // console.log(this.sub);
        // 满足条件时循环执行
        this.sub.forEach(watcher=>{
            // console.log(watcher);
            watcher.update()
        })
    };
}

// 观察者模式，通过监控当前数据变化来关联视图
class Watcher{
    // vm -> vm.$data；key -> 监控数据；cb -> 数据变化后进行的回调
    constructor(vm,key,cb){
        Dep.target = this; // 实例化Watcher时，把实例挂到Dep的属性下，使Dep能拿到实例的所有属性
        this.vm = vm;
        this.key = key; 
        this.cb = cb;
        this.oldVal = this.get();
        Dep.target = null; // 实例用完就把它置空，防止只要get数据就push(watcher)
    };
    get(){
        let val = this.vm.$data[this.key];
        return val
    };
    update(){
        let newVal = this.get(); // 设置之后才有新值
        if(newVal !== this.oldVal){
            this.cb(newVal);
        }
    };
}

// 用来数据劫持的
class Obsever{
    constructor(data){
        this.obsever(data)
    };
    // 循环对象，进行数据劫持操作
    obsever(data){
        if(data && Object.prototype.toString.call(data) === '[object Object]'){
            for(let key in data){
                this.defineReactive(data,key,data[key])
            }
        }
        // console.log(data);
    };
    // 数据劫持
    defineReactive(obj,key,val){
        // 如果val是对象，进行深度递归，使引用类型中的值也可进行数据劫持
        if(typeof val === 'object'){
            this.obsever(val)
        };
        let dep = new Dep();
        
        Object.defineProperty (obj,key,{
            get(){
                // 此处订阅
                Dep.target && dep.addSub(Dep.target) // Dep.target为空就不addSub，不会push(watcher)
                // console.log(dep,Dep.target);
                return val
            },
            set:(newVal)=>{ // 箭头函数，避免this出错
                // 如果相等就没必要进行赋值
                if(val !== newVal){
                    val = newVal;
                    // 如果是引用数据类型，在进行劫持
                    this.obsever(val);
                    // 修改数据时发布
                    dep.notify();
                }
            }
        })
    }
}

