const express = require('express');
const bodyParser = require('body-parser');  // 发送请求时，请求的body部分可识别
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  // post请求的body可写对象

const jwt = require('jsonwebtoken');  //可以用token储存cookie(跨域也可获取)

let ary = ['刘成','赵忠鹍'];

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    // 第二个参数表示允许跨域的域名，* 代表所有域名  
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods','GET, POST') // 允许的 http 请求的方法
    // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    // if (req.method == 'OPTIONS') {
    //     res.sendStatus(200)
    // } else {
    //     next();
    // }
    next()
})

//测试请求用，没有实际的意义
app.get('/test',(req,res)=>{
    console.log(111);
    res.json({
        code:0,
        msg:'test'
    })
})

const secret = 'ZF'; // token的自定义加密，作为token的第二个参数；可随意定
// const token = jwt.sign({user:'刘成'},secret,{
//     expiresIn:20
// });

/*
    /login
        body:uname=xxx
*/
app.post('/login',(req,res)=>{
    const {uname} = req.body;    
    if(ary.includes(uname)){
        res.json({
            code:0,
            msg:'登录成功',
            //登录成功创建token
            token:jwt.sign({user:uname},secret,{
                expiresIn:20  //设定时间20秒
            }),
        })
    }else{
        res.json({
            code:1,
            msg:'失败'
        })
    }
});

//前端发送token一般不是通过body发送，而是通过headers发送的
app.post('/islogin',(req,res)=>{
    //Authorization值是可变的，一般Authorization||token,到底是哪个根据Access-Control-Allow-Headers配置来
    const token = req.headers.authorization;
    // console.log(token)
    if(token){
        // 解密token，data中为token的解密内容
        jwt.verify(token,secret,(error,data)=>{
            if(error){
                res.json({
                    code:2,
                    msg:'失效'
                })
                return;
            }
            res.json({
                code:0,
                msg:'有权限',
                //每次请求验证的时候，都发一个新的令牌给前端，保证令牌持久化操作
                token:jwt.sign({user:data.user},secret,{
                    expiresIn:20
                })
            })
            
        });

    }else{
        res.json({
            code:1,
            msg:'未登录'
        })
    }
})


app.listen(80);
