## AJAX
- Asynchronous（异步） Javascript（js） And（和） XML（标记语言,数据）And HTML
- 前后台数据交互的一种技术(找后台拿数据的一种方式)
- 难点：如何操作数据(各种数据类型应用,业务逻辑)，异步，参数如何拼接(什么是字段->name=zf&age=10)，如何开启服务
- 优点：可以局部刷新，减轻服务器压力，提升用户体验

- 获取数据
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