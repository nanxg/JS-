
const http = require('http'); //服务器http请求模块
const fs = require('fs'); // 操作文件的模块

// // 将url字段转对象键值对
function queryString(str){
    let obj = {};
    str.replace( /([^=^&]+)=([^&]+)/g,($0,$1,$2)=>{
        // console.log($1,$2);
        obj[$1] = $2;
        // console.log(obj);
        
    });
    return obj;
}

// /*
//     注册:
//     localhost/register?user=123 
//     localhost/index2.html

//     reaponse:
//         失败 { code:0, msg:'有介个银了' }
//         成功 { code:1, msg:'可以注册' }
           
// */
// // 自定默认数据
let sql = [ { id:0, username:'彭锦程', password:123},
            { id:1, username:'尹德智', password:321},
            { id:2, username:'李淑磊', password:123},
            { id:3, username:'tony',  password:123}
          ];

// // 创建并且返回一个web服务器对象
let ser = http.createServer((req,res)=>{
    let url = req.url; 
    // console.log(req.url); // 某些浏览器输出除了字段还会有一个'/favicon.ico'  
    if(url !== '/favicon.ico'){  
        
        // 有问号就判断为接口，没有就是文件
        if(url.includes('?')){ // 接口
            
            let ary = url.split('?');
            let interface = ary[0]; // ?左边字符(接口)
            let opt = queryString(ary[1]); 
            // console.log(opt);
            
            switch(interface){
                // 获取名字
                case '/getname':
                    // 返回给前端的json
                    console.log('来了');
                    let msg = {
                        code:0,
                        msg:'可以注册'
                    };
                    let bo1 = sql.find(i=>i.username === decodeURI(opt.user)); // 字段值如果是中文会默认转URI码，需要解码URI，否则永不相等
                    if(bo1){
                        msg.code = 1;
                        msg.msg = '该用户已注册';
                    };
                    res.setHeader('content-type','text/html;charset=utf-8'); // charset=utf-8 使返回的中文信息不会乱码
                    res.write(JSON.stringify(msg));
                    res.end();
                break;
                
                // 注册 (判断是否重名，是否写好用户名和密码)
                case 'register':
                    let msg1 = {
                        code:0,
                        msg:'注册成功'
                    };
                    let bo2 = sql.find(i=>i.username === decodeURI(opt.user));
                    console.log(bo2);
                    
                    if(bo2){
                        msg1.code = 1;
                        msg1.msg = '该用户已注册';
                    }else{
                        if(opt.password){
                            sql.push({
                                id:Date.now(),
                                username:decodeURI(opt.user),
                                password:opt.password
                            });

                        }else{
                            msg1.code = 2;
                            msg1.msg = '参数不正确';
                            res.writeHead(400,{'content-type':'text/html;charset=utf-8'});
                            res.write(JSON.stringify(msg1));
                            res.end();
                            return
                        }
                    }
                    // 不重名且信息正确 走这
                    res.setHeader('content-type','text/html;charset=utf-8');
                    res.write(JSON.srtingify(msg1));
                    res.end();
                break;

            }
            
        }else{ // 如果是文件
          // 读取不到这个文件就会报错，避免报错不执行，使用try catch
            try{
                // console.log(1);
                
                if(url === '/'){ //如果url只有个'/'，默认找index文件
                    url = '/index.html';
                };
                let data = fs.readFileSync('www'+url); //按照路径读取文件
                res.write(data.toString()); //文件内容转为字符串，写入页面
                res.end();

            }catch(error){ // 如果读取失败就显示404的文件
                let data = fs.readFileSync('www/404.html'); //读取文件
                res.write(data.toString());
                res.end();
            }
        }
    }
})

ser.listen(80);


