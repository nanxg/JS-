const http = require('http'),//模块化开发
jquery = require('jquery'),//node_modules里面
fs = require('fs'),
urlModel = require('url'),//能够把url分割为路径，查询信息，hash....
qs = require('querystring'); //能够url序列化操作

/* 
    通过全局对象下的 __filename 能够获取当前文件的绝对路径(包含文件本身)

    通过全局对象下的 __dirname 能够获取当前执行脚本所在的目录（运行文件的根目录）,不包含文件本身
*/
// console.log(__filename); //F:\前端\JS正式课\2019-12-23\1.js
// console.log(__dirname); //F:\前端\JS正式课\2019-12-23

let path = require('path'); // 找路径的
// console.log(path);
console.log(path.join('/wwwrot','api/aaa')); // 写啥拼啥，只把逗号两边以"\"拼接
console.log(path.resolve('/','api.js')); //F:\api.js
console.log(path.resolve('www','api.js'));//F:\前端\JS正式课\2019-12-23\www\api.js
console.log(path.resolve('www','./api.js'));//F:\前端\JS正式课\2019-12-23\www\api.js
console.log(path.resolve('www','/api.js'));//F:\api.js
console.log(path.resolve('www','../api.js'));//F:\前端\JS正式课\2019-12-23\api.js
console.log(path.resolve('www/wer','/api.js'));//F:\api.js

//自动帮我们找当前文件的路径和配置路径进行链接
console.log(path.resolve(__dirname,'./1.js'));
//F:\前端\JS正式课\2019-12-23\1.js
