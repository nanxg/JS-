const http = require('http');
const fs = require('fs');

function queryString(str){    
    let obj = {};
    str.replace(/([^=]+)=([^&]+)&?/g,($0,$1,$2)=>{
        obj[$1] = $2;
    });
    return obj;
}

let sql = [ { id:0, username:'彭锦程', password:123},
            { id:1, username:'尹德智', password:321},
            { id:2, username:'李淑磊', password:123},
            { id:3, username:'tony',  password:123}
          ];

let ser = http.createServer((req,res)=>{
    let url = req.url; 
    // console.log(req.url); // 某些浏览器输出除了字段还会有一个'/favicon.ico'  
    if(url !== '/favicon.ico'){  
        
        // 有问号就判断为接口，没有就是文件
        if(url.includes('/post')){ // 接口
            let html = '';
            req.on('data',(data)=>{ // 事件绑定
                                html += data;
                                console.log(data);
                            });
                            req.on('end',()=>{
                                let opt = queryString(html);
                                let msg = {
                                    code:0,
                                    msg:'可以注册'
                                };
                                let bo1 = sql.find(i=>i.username === decodeURI(opt.user));
                                if(bo1){
                                    msg.code = 1;
                                    msg.msg = '有这个人了';
                                }
                                res.setHeader('content-type','text/html;charset=utf-8');
                                res.write(JSON.stringify(msg));
                                res.end();
                            })
  
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

