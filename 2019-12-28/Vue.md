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
    - 解绑事件可以使用
        ```
            @mousedown="onoff && down($event)"
            当onoff是真的就添加事件，假的就解除事件
        ```

    - 解绑事件：
        - @mousedown="onoff"&&down($event) -> onoff为真，就添加事件，为假就解绑事件

- v-for="(val,key) in ary" -> 循环数组或对象，ary为data中的数据

- v-bind:属性=""  -> 缩写为 :属性=""

- v-model="" -> 监听、改变输入框的value


