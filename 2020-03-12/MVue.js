const compileUtil = {//编译类用的工具
    getVal(expr,vm){//获取值
        return expr.split('.').reduce((data,currentVal)=>{//reduce是为了拿到数据里面的对象的属性值  比如 {{obj.name}}
            return data[currentVal];
        },vm.$data);
    },
    setVal(expr,vm,inputVal){//设置值 
        return expr.split('.').reduce((data,currentVal)=>{//reduce同理
            data[currentVal] = inputVal;
        },vm.$data);
    },
    getContentVal(expr,vm){//通过获取小胡子里面的字符串 拿到数据返回出去
        return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            return this.getVal(args[1],vm);
        })
    },
    text(node,expr,vm){//文本节点和v-text编译方法
        let value;
        if(expr.indexOf('{{') !== -1){
            value = expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
                //绑定观察者，数据发生变化触发回调，更新页面
                new Watcher(vm,args[1],()=>{
                    this.updater.textUpdater(node,this.getContentVal(expr,vm));
                })
                return this.getVal(args[1],vm);
            })
        }else{
            new Watcher(vm,expr,(newVal)=>{
                this.updater.textUpdater(node,newVal);
            });
            value = this.getVal(expr,vm);
        }
        this.updater.textUpdater(node,value);
    },
    html(node,expr,vm){//v-html
        const value = this.getVal(expr,vm);
        new Watcher(vm,expr,(newVal)=>{
            this.updater.htmlUpdater(node,newVal);
        })
        this.updater.htmlUpdater(node,value);
    },
    model(node,expr,vm){//v-model
        const value = this.getVal(expr,vm);
        new Watcher(vm,expr,(newVal)=>{
            this.updater.modelUpdater(node,newVal);
        });
        node.addEventListener('input',(e)=>{//视图改变数据
            this.setVal(expr,vm,e.target.value);
        })
        this.updater.modelUpdater(node,value);
    },
    on(node,expr,vm,eventName){//编译事件指令
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName,fn.bind(vm),false);
    },
    updater:{//执行视图更新的方法对象
        textUpdater(node,value){
            node.textContent = value;
        },
        htmlUpdater(node,value){
            node.innerHTML = value;
        },
        modelUpdater(node,value){
            node.value = value;
        }
    }
}
class MVue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if (this.$el) {
            //实现数据观察者
            new Observer(this.$data)
            //实现指令解析器
            new Compile(this.$el, this);
            this.proxyData(this.$data);//数据代理
        }
    }
    proxyData(data){//数据代理方法
        for(const key in data){
            Object.defineProperty(this,key,{
                get(){
                    return data[key];
                },
                set(newVal){
                    data[key] = newVal;
                }
            })
        }
    }
}

class Compile {//编译指令类
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);//获取挂载节点

        this.vm = vm;
        //1 获取文档碎片对象，放入内存中
        const fragment = this.nodeFragment(this.el);
        //2编译模板
        this.compile(fragment);
        //3追加子元素到根节点
        this.el.appendChild(fragment);
    }
    compile(fragment) {
        //获取子节点
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                //是元素节点
                this.compileElement(child);
            } else {
                //是其他节点
                this.compileText(child);
            };
            if (child.childNodes && child.childNodes.length) {
                this.compile(child);//递归
            }
        })
    }
    nodeFragment(el) {
        //首先创建文档碎片对象
        const f = document.createDocumentFragment();
        let firstChild;
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild);
        };
        return f;
    }
    isElementNode(node) {//判断是否为元素节点
        return node.nodeType === 1;
    }
    isDirective(name) {//判断是否为v-开头的指令
        return name.startsWith('v-')
    }
    isEventName(name) {//判断是否为@开头的指令
        return name.startsWith('@');
    }
    compileElement(node) {//编译元素节点
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
            const {
                name,
                value
            } = attr;
            if(this.isDirective(name)){//是一个指令
                const [,dirctive] = name.split('-');
                const [dirName,eventName] = dirctive.split(':');
                //根据数据更新视图
                compileUtil[dirName](node,value,this.vm,eventName);
                //删除指令
                node.removeAttribute('v-' + dirctive);
            }else if(this.isEventName(name)){
                let [,eventName] = name.split('@');
                compileUtil['on'](node,value,this.vm,eventName);
            }   
        })
    }
    compileText(node) {//编译文本节点
        const context = node.textContent;
        if(/\{\{(.+?)\}\}/.test(context)) {
            compileUtil['text'](node,context,this.vm);
        }
    }
}