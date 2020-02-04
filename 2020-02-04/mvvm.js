
class Vue{
    constructor(opt){
        this.$el = opt.el;
        this.$data = opt.data;
        // console.log(this.$el);
        
        //实例绑了el就调用Complier
        if(this.$el){
            // 专门用来编译模板
            new Complier(this.$el,this); // 也可只传this，然后在Complier中解构
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
        let frag = document.createDocumentFragment();

        let firstc;
        while(firstc = this.el.firstChild){
            // console.log(firstc);
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
        const nodes = [...frag.childNodes];
        // 循环子节点
        nodes.forEach(n=>{
            if(this.isElementNode(n)){
                // console.log('el');
                // 找到元素节点属性并循环，找到v-开头的属性，把值取出来赋值对应data中的数据
                let attrs = [...n.attributes];
                attrs.forEach(a=>{
                    if(a.nodeName.startsWith('v-')){ // 判断以"v-"开头,或:/^v-/.test(a.nodeName)
                        // console.log(a);
                        let {nodeValue} = a;
                        // console.log(nodeValue,this.vm.$data);
                        let val = this.vm.$data[nodeValue];
                        
                        // n.oninput = (ev)=>{
                        //     this.vm.$data[nodeValue] = ev.target.value;
                        //     // console.log(this.vm.$data[nodeValue]);
                            
                        // };
                        
                        n.value = val;
                        
                    }
                })
            }else{
                // console.log('te');
                // console.dir(n);
                if(/\{\{(\w+)\}\}/.test(n.nodeValue)){
                    // console.log(n);
                    let str = n.nodeValue;
                    // console.log(str);
                    let attr = str.replace(/\{\{(\w+)\}\}/,(...arg)=>{
                        // console.log(arg);
                        return this.vm.$data[arg[1]]
                    });
                    n.nodeValue = attr;
                }
                
            }
        })
        
    }


}
// 文档碎片：document.createDocumentFragment



