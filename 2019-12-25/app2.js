const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('session');
const multer  = require('multer');

let sql = [
    {
        id:-1,
        name:'zy'
    },
    {
        id:0,
        name:'lilei',
        type:0
    },
    {
        id:1,
        name:'zzk',
        type:1
    },
    {
        id:2,
        name:'ydz',
        type:9
    }
];

app.use(session({
    secret:'12',
    name:'session_id',
    cookie:{maxAge:5000},
    resave:false,
    saveUninitialized:true
}));

app.use(express.static('www'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

app.use(multer({dest:'uploads/'}).single('filename')); // single为单个上传，array为多个上传

app.use('/',(req,res,next)=>{
    req.sql = sql;
    console.log('全都来');
    if(req.session.userInfo || req.url === '/login2'){
        next(); // 上面完成，可以继续执行下边的
    }else{
        res.json({code:100,msg:'没有权限'});
    }
})

app.use('/login',require('./routers/login'));
app.use('/login2',require('./routers/login2'));
app.use('/getary',require('./routers/getary'));
app.use('/noloading',require('./routers/noloading'));
app.use('/upload',require('./routers/upload'));

app.listen(80);
