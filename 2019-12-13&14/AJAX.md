## AJAX
- Asynchronous（异步） Javascript（js） And（和） XML（标记语言,数据）And HTML
- 前后台数据交互的一种技术(找后台拿数据的一种方式)
- 难点：如何操作数据(各种数据类型应用,业务逻辑)，异步，参数如何拼接(什么是字段->name=zf&age=10)，如何开启服务
- 优点：可以局部刷新，减轻服务器压力，提升用户体验

- 获取数据方法：
    ```
        $.ajax({})
        fetch('')
        axios.get('')
        wx.request('')
        jsonp_fetch('')
    ```

### 启动服务器
- 点击服务器文件(文件名不能是中文)

- 找到node_modules文件(若没有，需要安装依赖文件)
    - 方法1：服务器文件夹下shift+右键点击打开终端，输入npm install 后回车 安装依赖环境
    - 方法2：把文件放入VS code，点击左下角叹号，打开终端，输入npm install 后回车 安装依赖环境

- 运行服务器
    - 输入npm run start或者输入node app按Tab，回车

- 打开方式：浏览器输入localhost/xx.html;localhost:端口号/xx.html;千万不要双击打开
    - 端口号在app.js文件内找：app.listen(80);（默认80）

- 代码放到public目录下
    - 更改代码目录通过更改app.js文件内的：app.use(express.static(path.join(__dirname, 'public')));

### AJAX交互模型
- 创建XMLHttpRequest对象
  填写请求方式 请求地址  是否异步
  发送请求
  监听数据响应
  接收到数据

XMLHttpRequest除了IE6(IE6使用ActiveXObject)之外都有,但是每个版本属性不同

IE9以下浏览器是没有onload的，但是所有浏览器都支持onreadystatechange事件

timeout  设置超时时间
ontimeout 监听超时回调

### get 和post

- get是通过url进行请求的(4步)
    协议 域名 端口 接口 查询信息 hash
        https:
        www.baidu.com
        :80
        /s? | /get?
        user=''
        #hash=''
    优势：快，用于展示类网站
    劣势：相对不安全，请求时信息显示在地址栏或历史记录
        请求体积有限（不同浏览器标准不同）不能传大文件

    低版本IE下有缓存问题(两次请求的url一致，则第二次会走第一次的缓存)
        解决：①使用post；②改变url('/get?user='+this.value+'&sdf='+Data.now())

    输入中文时IE解析会乱码
        解决：转成URI码： encodeURI('中文');decodeURI('URI码');

- post是通过服务器来发送请求的(包含用户信息，或文件较大的东西)(至少6步)
    优势：相对安全，通过服务器发送请求
        体积可以无限大(但后端会限制)
    劣势：比get慢
    
    需添加请求头：.setRequestHeader('content-type','application/x-www-form-urlencoded');

```
    // get
    user.onblur=function(){          
        let xhr=new XMLHttpRequest; //创建一个电话
        xhr.open('get','/get?user='+this.value,true); //输入号码(请求方式，请求地址，是否异步)
        xhr.send(); //发送请求拨号
        xhr.onload=function(){ //等待回应
             console.log(xhr.responseText) //通话
        }
    }

    // post
    user.onblur=function(){          
        let xhr=new XMLHttpRequest; //创建一个电话
        xhr.open('post','/post',true); //输入号码(请求方式，请求地址，是否异步)
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send('user='+this.value); //发送请求拨号
        xhr.onload=function(){ //等待回应
            console.log(xhr.responseText) //通话
        }
    }

```

### fetch的get

```
// url中包括查询信息字段（可暴露的）
fetch('url').then(d=>d.json()或者d.text()).then(d=>{
        consule.log(d)
    })
```

### fetch的post
    
```
// url中没有查询信息的字段（不可暴露）
fetch('url',{
        method:'post',
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
        body:'key1=value1&key2=value2'
        //也可以写成
        body:''+new URLSearchParmas({
            key1:value1,
            key2:value2  //如果value是中文,会自动转成URI编码
        })
    }).then(d=>d.json()或者d.text()).then(d=>{
        consule.log(d)
    })
```

### 请求头和响应头

General
- Request URL：请求的地址
- Request Method：请求的方式 -> GET POST HEAD DELETE PUT...
- Status Code：状态码
- Remote Address：当前页面的端口号

Response Headers：响应头 -> 服务器反馈回来的信息(接收到的)

Request Headers：请求头 -> 发送给服务器的信息(向服务器发送请求)

Query String Parmeters：请求体

### http状态码 

- 100 服务器已接收请求，客户端可继续发送
- 200-207 成功
- 301 永久重定向
- 302 临时重定向
- 304 一种缓存
- 400 有误
- 401 当前请求需要用户验证
- 403 服务器已理解请求，但拒绝执行
- 404 请求失败，未在服务器上找到请求的内容
- 5开头的是服务器错误
- 500 服务器端出错
- 501 服务器不支持当前请求所需的某个功能
- 502 作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应
- 503 由于临时的服务器维护或过载，服务器当前无法处理请求

### onreadystatechange

    onreadystatechange是可以监听发送请求的状态
    5次状态 0-4，但是0你永远都监听不到，只能监听到1-4

    如果把onreadystatechange放到send之前能够多监听一次，放到send之后就少监听一次
    0: 请求未初始化
    1: 服务器连接已建立
    2: 请求已接收
    3: 请求处理中
    4: 请求已完成，且响应已就绪

### onabort

- onabort  当网络中断的时候触发
- xhr.abort()  强行中断


### ajax中XHR、fetch、axios区别

    fetch ->ES6新的api，基于promise
        get
        post

    axios -> 基于promise封装XMLHttpRequest

    axios里面拦截器，方便做些钩子处理

    XMLHttpRequest可以监听细节，监听请求过程1-4
    超时处理、abort强制中断，onabort中断监听

    XHR（浏览器自带的api） 
    axios（基于这个XHR来封装的一个js库）

### 网络7层协议

    http://www.ruanyifeng.com/blog/2012/05/internet_protocol_suite_part_i.html