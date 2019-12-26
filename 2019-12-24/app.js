const express = require('express'); //引入node框架
const app = express(); //启用express
const fs = require('fs'); 
const path=  require('path'); //处理文件路径的小工具
const bodyParser = require('body-parser'); //对post请求的请求体进行解析
const session = require('express-session');

app.use(bodyParser.json()); // 解决axios的post请求配置对象问题(使用之后可以传对象)

//将静态文件目录设置为：项目根目录+/public
// app.use(express.static(__dirname + '/public')); //不写dirname会自动寻找
//或者
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('www')); //设置静态资源目录

// bodyParser.urlencoded 用来解析 request 中 body的 urlencoded字符， 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib。
app.use(bodyParser.urlencoded({ extended: false }))
// 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。

// https://blog.csdn.net/cckevincyh/article/details/79816491   session使用介绍

// 配置session
app.use(session({
    secret:'随便起的名', //服务器端生成 session 的签名
    name:'session_id',   // 保存在本地cookie的一个名字
    cookie:{maxAge:10000}, // cookie生命周期;/*过期时间*/
    resave:false,
    saveUninitialized:true,
    rolling:true // 刷新cookie重置时间 false为不刷新
}))

let sql = [{ id:0,user:'penglan',pw:'123' }];

//判断用户名是否存在的函数
const userFn= (req,res)=>{
    const {body} = req;
    // console.log('userFn');
    // console.log(req);
    // console.log(body);
    
    let re = /^[a-zA-Z]\w{5,11}$/; //规定用户名格式
    let msg ={};
    // 判断是否正确填写用户名，并且不能重名
    if(body.user && re.test(body.user)){
        // 查找是否有重名
        let o = sql.find(i=>i.user === body.user);
        if(o){
            msg.code = 1;
            msg.msg = '该用户已注册';
        }else{
            msg.code = 0;
            msg.msg = '可以注册';
        }
    }else{
        msg.code = 2;
        msg.msg = '格式不正确';
    }
    res.json(msg);
}
// 绑定请求方式 接口 函数
app.post('/getName',userFn); //用express写node的post请求(类似事件绑定)

// 注册
app.post('/register',(req,res)=>{
    const {body:{user,pw}} = req; //  解构出body中的user pw
    console.log(req.body);
    
    let re = /^[a-zA-Z]\w{5,11}$/;
    let msg = {};
    if(user && pw && re.test(user)){ //有用户名密码并且符合规则
        let o = sql.find(i=>i.user === user); //是否重名
        if(o){ //判断是否重名
            msg.code = 1;
            msg.msg = '该用户已注册';
        }else{
            msg.code = 0;
            msg.msg = '恭喜你成功抢注';
            sql.push( { id:Date.now(), user, pw } )
        }
    }else{
        msg.code = 2;
        msg.msg = '格式不正确';
    }
    res.json(msg); //传回响应信息
})

// 登录
app.post('/login',(req,res)=>{
    const {body:{user,pw}} = req;
    let msg = {};
    if(user&&pw){ //输入用户名密码可以登录否则提示请填写
        let o = sql.find(i=>i.user === user);
        if(o){ //如果有这个用户并且密码正确就成功
            if(o.pw === pw){
                msg.code = 0;
                msg.msg = '登陆成功';
                req.session.userinfo = user; //设置session
            }else{
                msg.code = 1;
                msg.msg = '密码错误';
            }
        }else{
            msg.code = 2;
            msg.msg = '此用户没有注册';
        }
    }else{
        msg.code = 3;
        msg.msg = '请填写用户名与密码';
    }
    res.json(msg);
})

// 判断是否登录(如果存在cookie表示已经登录)
app.get('/islogin',(req,res)=>{
    // console.log(req.session.userinfo);

    if(req.session.userinfo){ //获取session，如果存在就登陆过
        res.json({
            code:0,
            msg:'欢迎回来',
            user:req.session.userinfo
        })
    }else{
        res.json({
            code:1,
            msg:'未登录',
        })
    }
})

app.get('/logout',(req,res)=>{
    // 销毁 session
    req.session.destroy(function(err){
        console.log(err);
    });
    res.send({
        code:0
    });
})

//多并发
app.get('/a',(req,res)=>{
    setTimeout(() => {
        res.json({user:'pjc'})
    }, 2000);
})

app.get('/b',(req,res)=>{
    setTimeout(() => {
        res.json({iphone:'123456'})
    }, 5000);
});

app.get('/c',(req,res)=>{
    let {user,iphone} = req.query
    if(user=='pjc'&& iphone=='123456'){
        res.json({
            code:0
        })
    }else{
        res.json({
            code:1
        })
    }
    
});


let prot = 80;

app.listen(prot);

app.use('*',(req,res)=>{ // 如果上边的都失败走这
    let data = fs.readFileSync(path.resolve('./www/404.html'));
    res.send(data.toString());
});

