/* 
    request 请求(ajax)
    response 响应(服务器)
*/

// const http = require('http'); //node自带模块和node_modules中的文件不需要路径(./) //commonjs规范

// 创建并且返回一个web服务器对象
// let app = http.createServer(function(request,response){
//     console.log('成功');
//     response.write('{"name"="莎兰"}'); // 服务器响应，在页面写入内容
//     response.end(); // 响应结束
// });

// app.listen('80') //


/*  http://localhost/post?name=1  */

const http = require('http');

// 创建并且返回一个web服务器对象
http.createServer(function(req,res){
    // console.log(req); //cmd上输出
    // console.log(res);
    // console.log(req.url); // '/post?name=1'  谷歌多一个'/favicon.ico'，火狐没有这个

    // 'content-type':'text/html', //告诉客户端我现在发送你的是什么类型的数据num=3 -> Hello 
    // 'content-type':'text/plain',//num=3 -> <h1>Hello</h1>
    res.setHeader('Content-Type','text/html; charset=UTF-8'); // 'charset=UTF-8'编译中文
    if(req.url !== '/favicon.ico'){
        let num = (/name=(\d)/.exec(req.url.split('?')[1]))[1];
        // console.log(num); 
        if(num === '1'){
            res.write('{"name"="莎兰"}');
        }else if(num === '2'){
            res.write('{"name"="shalan"}');
        }else if(num === '3'){
            res.write('<h1>Hello</h1>');
        }
    } 
    res.end('<h1>end</h1>');
}).listen('80'); // 监听的端口号