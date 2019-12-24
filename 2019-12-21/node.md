### node

- Node基于chrome V8引擎，能让JS在服务端运行，通过npm下载功能模块包

- JS能写前端，能写后端，是真正实现前后统一的全栈工程师语言(有缺陷)

目标：
    明白后端做什么
    会写接口
    更好理解前端

语法都是 js

- Node特性
    - 单线程
    - 非阻塞I/O
    - 事件驱动

- 擅长处理高密集I/O，高并发的业务，写一些小工具，前端小玩具
- 不擅长计算，不稳定(单线程易瘫痪)

- node 没有BOM DOM 

- NodeJS使用的是commomjs规范(AMD规范 requirejs  CMD )
    - 引入
        通过require引入：require('./文件名')
        不加路径的情况：① node自带模块； ② node_modules中的模块；
    - 导出
        module.exports = {
            a:'xxx',
            b:xxx,
            ...
        }

- http模块 创建服务

- http.createServer(function(request,response){}).listen(80);
    - 函数内：
    - request获取客户端发送给服务器的信息
        - url 请求地址，地址上面有参数，还要个需要注意的是/favicon.ico 需过滤掉
    - response服务器发送给客户端的信息
        - write(写字符串)  写到页面
        - end(写字符串)  结束本次会话

- fs文件系统

    - readFile(读取文件地址,callback(失败，文件数据) )//异步用的回调
 
    - readFileSync(读的文件地址) //同步，如果读取失败会报错，所有使用try包一下

    - fs.open(path, flags[, mode], callback)
        - path - 文件的路径。

        - flags - 文件打开的行为。具体值详见下文。

        - mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。

        - callback - 回调函数，带有两个参数如：callback(err, fd)。

    - fs.writeFile(file, data[, options], callback) 异步
        - file - 文件名或文件描述符。

        - data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。

        - options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'

        - callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。

    - writeFileSync 同步

    - unlink  删除文件
    - mkdir 添加文件夹

    writeHead:设置响应头
        第一个参数:状态码
        第二个参数:
            {
                配置响应信息
            }

    readdir  读取文件夹的

    fs.readdir(path,(error,filesAry)=>{

    })

    rename  重命名

不管请求是找页面还是找接口，都是通过一个url的方式与后端进行交互，在访问服务器的时候最好就把要访问服务器要做什么事说清楚