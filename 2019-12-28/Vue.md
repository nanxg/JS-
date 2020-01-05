### 框架

    - jquery   用量52.8k
    - angular  用量55.8k (谷歌产)
    - React    用量141k
    - Vue      用量155k

### Vue

> 基于-> MVVM框架 (Model View View Model) (双向驱动)

- 渐进式(弱主张，弱粘性，逐渐的、有过程的学)
- vue全家桶：vue,vue-router,vuex,vue-cli）：JavaScript 框架

### 使用vue
    - 引vue
    - 在html里挂载一个根元素
        ```
            <div id="app"></div>
        ```
    - 实例化vue  -> new Vue({})

    - 配置参数
        - el:'挂载元素', 元素只能是body下的元素
        - data（存数据）:在**new Vue**下值为***对象***
        - methods:{} 专门放函数；一般是事件函数
        - computed:{} 专门放计算属性
        
    - 输出数据用 双花括号 {{放数据名称即可}} 小胡子

### 指令

> 为了方便开发者开发，vue中使用了指令，这些指令包含了元素身上的属性和js内置方法

- v-text="" -> innerText
- v-html="" -> innerHTML
- v-show="" -> display:block|none
- v-if|v-else -> 条件成立就渲染if，不成立就渲染else (必须是相邻兄弟元素)  

- v-on:事件名="事件函数|简单语法" -> 绑定事件 简写为 @事件名="事件函数|简单语法"
    - 修饰符(事件名之后加的属性):
        - .stop -> 阻止冒泡
        - .prevent -> 阻止默认行为
        - .enter或.13 -> 回车

    - $event： 
        如果不传参，第一个参数就是事件对象
        *** 如果传了参还想拿到事件对象，需要在模板中的事件函数内传一个

    - 修饰符  .13  .enter .stop  .prevent .once ...

    - 解绑事件：
        - @mousedown="onoff"&&down($event) -> onoff为真，就添加事件，为假就解绑事件

- v-for="(val,key) in ary" -> 循环数组或对象，ary为data中的数据

    如果是数组val就是数组的成员，key就是索引
    如果是对象val键值，key键名

- v-bind:属性=""  -> 缩写为 :属性=""

- v-model="" -> 监听、改变输入框的value

### filter过滤器 12.31
    Vue.filter('名字',(val)=>{
        return val.xxx
    })

    {{ val | '名字' }}


> 局部:
    - new Vue({filters:{
        名字:(val){

        }
    }})

### computed  计算属性（通过data中的数据变化进行二次操作且一上来就执行一次）12.30
    ```
        computed:{
            //getter
            revers(){
                return xxx
            }

            revers:{
                get(){
                    return  xxx
                },
                set(){

                }
            }
        }
    ```
    - getter
    - setter

### watch 通过data中的**指定**数据变化进行二次操作 12.31
    ```
        watch:{
            //默认不会深度监听
            ary(){
                xxx
            },
            ary:{
                handler(){

                },
                deep:true   //深度监听
                immediate: true  //一上来就触发
            }
        }
    ```

### ref 为了快速定位元素或者组件  
    ```
        <ppa ref="xx">

        this.$refs.xx
    ```

### 组件 12.31
    ```
        //放在new Vue上方
        Vue.component('组件名',{
            template:``,  注意的是顶层只能有一个元素
            data(){
                return {
                    ary:[]
                }
            }
        })



        {
            components:{
                组件名:对象
            }
        }

    ```
### 组件的传递 1.03
    ```
        传递:
            通过子组件的属性来传
            <div num="3"></div>（静态的） 或者
            <div :num="pnum"></div>（动态的）

        接收:
            {
                props:['num']
            }
    ```

    在父级传递数据给自己的时候，可以让自己拥有父级的数据并且不与父级数据相关联
        1.通过子组件的属性来传
            <div :num="pnum"></div>（动态的）

        2.使用props接收
            {
                props:['num']
            }

        3.把接收过来的数据变成自己的
            {
                props:['num'],
                data(){
                    return {
                        cnum:this.num
                    }
                }
            }


    ```
        子传父:
            1.父级需要定义一个改变自己数据的方法
            2.子级需要定义一个事件，去调用父级的方法
                this.$emit('自定义事件名',可以传参)
            3.在子组件的行间绑定子级的事件，值为父级的修改数据的方法
    ```

### Vue.nextTick  数据改变，DOM更新完成之后触发 （todos）


