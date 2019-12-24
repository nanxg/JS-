const http = require('http'), // 模块化开发
    jquery = require('jquery'), // node_modules里的模块
    fs = require('fs'), // 文件操作模块
    urlModel = require('url'), // 把url分割为路径、查询信息、hash...
    qs = require('querystring'); // url序列化操作，qs.parse() 方法将 URL 查询字符串 str 解析为键值对的对象
    // console.log(urlModel);
    // console.log(qs);

const app = http.createServer((req,res)=>{
    // console.log(8);

    let originAry = [
        'http://localhost:81'
    ];

    // console.log(req);
    console.log(req.headers.origin);

    if(originAry.includes(req.headers.origin)){
        //跨域
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin':req.headers.origin  //请求头包含这个源的可以跨域，其他不可以(*表示都可以跨域)
        }); 
    }

    const {pathname,query} = urlModel.parse(req.url);
    // console.log(req.url);
    // console.log(urlModel);
    
    let lastName = ['\.js$','\.html$','\.css$','\.less$','\.jpg$'];
    // /\.js$|\.html/
    let re = new RegExp(lastName.join('|')); // lastName每一项以|拼接，即正则选择以这些字符结尾的
    // console.log(re);
    if(pathname === '/'){
        let data = fs.readFileSync('www/index.html');
        res.end(data.toString());
    }else if(re.test(pathname)){
        // console.log(urlModel.parse(req.url));
        // console.log('静态文件');
        try {
            let data = fs.readFileSync('www'+pathname);
            res.end(data.toString());
        } catch (error) {
            let data = fs.readFileSync('www/404.html');
            res.end(data.toString());
        }
        
    }else{
        // /add?mirname=xxx
        switch (pathname) {
            case '/add':
            const {mkdirname} = qs.parse(query);
                fs.mkdir('www/'+mkdirname+'/',(err)=>{ // www/xiao
                    if(err){
                        if(err.code === 'EEXIST'){ //说明重名了
                            fs.readdir('www',(error,filesAry)=>{
                                // console.log(filesAry);//返回的是一个数组，数组中放的是当前文件下的所有文件名字
                                //['js','js(1)']
                                
                                let num = 0;
                                let b = filesAry.includes(mkdirname);
                                let name = '';
                                while(b){
                                    //js(1) -> js -> js(num)
                                    name = mkdirname.replace(/\(\d+\)/,'');
                                    //找重复文件夹
                                    b = filesAry.includes(name + '('+ (++num) +')');
                                    name = name + '('+ (num) +')';
                                }
                                fs.mkdir('www/'+name+'/',(err)=>{
                                    console.log('第二次创建成功');
                                   
                                    res.end(JSON.stringify({code:1,msg:'创建文件夹成功'}));
                                });
                            });
                        }
                        console.log('创建失败');
                        console.log(err);
                        return;
                    }
                    // console.log('创建成功');
                    // res.writeHead(200, {'Content-Type': 'text/html'}); 
                    res.end(JSON.stringify({code:1,msg:'创建文件夹成功'}));
                });          
                break;
            case '/rename':
            //    console.log( req );
                if(/^post$/i.test(req.method)){ //如果是post请求
                    let temp = '';
                    req.on('data',(d)=>{
                        temp += d;
                    });
                    req.on('end',()=>{
                        let o = qs.parse(temp.toString());
                        // console.log(o);
                        fs.rename('www/'+o.oldname,'www/'+o.newname,()=>{
                           res.end(JSON.stringify({code:1,msg:'rename success!'}));
                        });

                    });
                }
                break;
            case '/jsonp':
                //wd=1&callback=fn    
                let o = qs.parse(query.toString());

                if(o.wd == 1){
                    let json = JSON.stringify({
                        code:1,
                        ary:[1,2,3,4,5]
                    });

                    res.end(o.callback+'('+ json +')')
                }else{
                    let json2 = JSON.stringify({
                        code:1,
                        ary:[5,4,3,2,1]
                    })
                    res.end(o.callback+'('+ json2 +')');
                }

                break
            default:
                break;
        }
    }

    // console.log( qs.parse( (urlModel.parse(req.url).query)) );
    // res.writeHead(200, {'Content-Type': 'text/html'});    
    // res.end(JSON.stringify({name:'哈哈'}));
});

let port = 80;

app.listen(port);

/* 当服务器报错的时候触发error事件，端口重复就让它 +1 */
app.on('error',(e)=>{
    // console.log(e);
    //端口被占用的错误信息：EADDRINUSE
    if(e.code === 'EADDRINUSE'){ 
        port ++;
        // console.log(port)
        app.listen(port)
    }
})






// console.log(jquery);
