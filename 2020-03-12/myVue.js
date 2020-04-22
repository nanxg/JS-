const compileUtil = {
    getVal(expr, vm) { // 处理 对象加.的形式获取数据的方法
        return expr.split('.').reduce((data, curVal) => {
            return data[curVal]
        }, vm.$data)
    },
    setVal(expr, vm, inputVal) {
        return expr.split('.').reduce((data, curVal) => {
            data[curVal] = inputVal;
        }, vm.$data)
    },
    getContentVal(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, ($0, $1) => {
            return this.getVal($1, vm)
        })
    },
    text(node, expr, vm) {
        let val;
        if (expr.indexOf('{{') !== -1) {
            val = expr.replace(/\{\{(.+?)\}\}/g, ($0, $1) => {
                // 绑定观察者，更新数据时，触发这里的回调函数，进行更新
                new Watcher(vm, $1, () => { // 不直接传入newVal，避免{{msg}}-{{val}}这种形式的两个值改成一个{{}}
                    this.updater.textUpdater(node, this.getContentVal(expr, vm));
                })
                return this.getVal($1, vm)
            })
        } else {
            val = this.getVal(expr, vm);
            new Watcher(vm, expr, (newVal) => {
                this.updater.textUpdater(node, newVal);
            })
        };
        this.updater.textUpdater(node, val);
    },
    html(node, expr, vm) {
        const val = this.getVal(expr, vm);
        new Watcher(vm, expr, (newVal) => {
            this.updater.htmlUpdater(node, newVal);
        })
        this.updater.htmlUpdater(node, val);
    },
    model(node, expr, vm) {
        const val = this.getVal(expr, vm);
        // 数据->视图
        new Watcher(vm, expr, (newVal) => {
            this.updater.modelUpdater(node, newVal);
        })
        // 视图->数据->视图
        node.addEventListener('input', (event) => {
            this.setVal(expr, vm, event.target.value);// 设置新值
        })
        // 视图->数据
        this.updater.modelUpdater(node, val);
    },
    on(node, expr, vm, eventName) {
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName, fn.bind(vm), false)
    },
    // 更新的函数
    updater: {
        textUpdater(node, val) {
            node.textContent = val; //textContent属性表示Node节点及其子元素的文本内容。
        },
        htmlUpdater(node, val) {
            node.innerHTML = val;
        },
        modelUpdater(node, val) {
            node.value = val;
        }
    }
}
// 解析器
class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 获取文档碎片对象，放入内存中，减少页面回流与重绘
        const fragment = this.node2Fragment(this.el);
        // 编译模板
        this.compile(fragment);
        // 追加子元素到根元素
        this.el.appendChild(fragment)
    };
    // 判断是不是元素节点
    isElementNode(node) {
        return node.nodeType === 1
    };
    // 获取原模板
    node2Fragment(el) {
        const f = document.createDocumentFragment(); // 创建文档碎片
        let firstChild;
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild);
        }
        return f
    };
    // 模板各个节点编译解析
    compile(fragment) {
        const childNodes = fragment.childNodes; // 获取每个子节点
        [...childNodes].forEach(item => {
            // console.log(item,item.nodeType);
            if (this.isElementNode(item)) { // 元素节点
                this.compileElement(item)
            } else if (item.nodeType === 3) { //文本节点
                this.compileText(item)
            }
            if (item.childNodes && item.childNodes.length) { // 如果元素节点内有子节点就递归
                this.compile(item);
            }
        })
    };
    // 编译元素节点
    compileElement(node) {
        const attrs = node.attributes;
        [...attrs].forEach(item => {
            const { name, value } = item; // 每个属性是个对象，对象内的属性name、value对应节点属性的key、val
            if (this.isDirective(name)) {
                const [, directive] = name.split('-'); // 获取v- 后边的字符
                const [dirName, eventName] = directive.split(':'); // on后边的事件名
                compileUtil[dirName](node, value, this.vm, eventName); // 更新数据，驱动视图
                node.removeAttribute('v-' + directive); // 删除有指令的标签上的指令属性(使浏览器看不出来vue属性)
            } else if (this.isEventName(name)) { // 处理@click等操作
                let [, eventName] = name.split('@');
                compileUtil["on"](node, value, this.vm, eventName); // 更新数据，驱动视图
                node.removeAttribute('@' + eventName);
            }
        })
    };
    // 编译文本节点
    compileText(node) {
        const content = node.textContent;
        const reg = /\{\{(.+?)\}\}/;
        if (reg.test(content)) {
            compileUtil['text'](node, content, this.vm)
        }
    };
    // 判断是不是v-开头的属性
    isDirective(attrName) {
        return attrName.startsWith('v-'); // String.startsWith()方法检测字符串是否以指定字符开头
    };
    isEventName(attrName) {
        return attrName.startsWith('@');
    }
}
class MVue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if (this.$el) { // 有值才往下执行
            // 1.实现一个数据观察者
            // 2.实现一个指令解析器
            new Observer(this.$data);
            new Compile(this.$el, this);
            this.proxyData(this.$data);
        }
    };
    // 代理$data
    proxyData(data) {
        for (const key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(val) {
                    data[key] = val;
                }
            })
        }
    };
}
// 数据劫持
class Observer {
    constructor(data) {
        this.observe(data);
    };
    observe(data) {
        /* data是一个对象，数据可能对象套对象 */
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(item => {
                this.defineReactive(data, item, data[item])
            })
        }
    };
    // 劫持数据的函数
    defineReactive(data, key, val) {
        // 递归(数据可能对象套对象)
        this.observe(val);
        const dep = new Dep();
        // 劫持并监听所有属性
        Object.defineProperty(data, key, {
            enumerable: true, //是否可遍历
            configurable: false, // 是否可更改
            get() { // 订阅数据变化时，往DEP中添加观察者
                Dep.target && dep.addSub(Dep.target);
                return val
            },
            set: (newVal) => {
                this.observe(newVal); // 使更改后的数据也被劫持
                if (newVal !== val) {
                    val = newVal;
                };
                // 通知变化
                dep.notify();
            }
        })
    };
}
class Dep {
    constructor() {
        this.subs = [];
    };
    // 收集观察者
    addSub(watcher) {
        this.subs.push(watcher);
    };
    // 通知观察者更新
    notify() {
        // console.log('watcher', this.subs);
        this.subs.forEach(watcher => watcher.update())
    }
}
// 观察者
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldVal = this.getOldVal(); //保存旧值
    };
    getOldVal() {
        Dep.target = this;
        const oldVal = compileUtil.getVal(this.expr, this.vm);
        Dep.target = null;
        return oldVal
    };
    update() {
        const newVal = compileUtil.getVal(this.expr, this.vm);
        if (newVal !== this.oldVal) {
            this.cb(newVal)
        }
    }
}