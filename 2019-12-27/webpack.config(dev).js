const path = require('path');
const HtmlWebpackPulgin = require('html-webpack-plugin');

const obj = {
    mode:'development', //开发模式
    // entry:'./index.js', //入口路径,可以是对象
    entry:{
        index:'./index.js'
    },
    // 输出，开发者模式可以不用写；安装 webpack-dev-server，运行服务热更新；生产模式需要输出
    output:{
        path:path.resolve(__dirname,'./build'), //输出路径
        filename:'build.js' //输出文件名；或者-> '[name].[hash].js' -> name为entry为对象时的key
    },
    module:{
        rules:[{
            //要处理的文件类型
                test:/\.css$/, // 正则匹配css文件
                use:[  //从后往前读取，css放在style之前 
                    'style-loader' // 安装 style-loader
                    ,
                    'css-loader' // 安装 css-loader (可批量装 npm i style-loader css-loader --dev)
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/' //输出时的路径
                    }
                }
                ]
        }]
    },
    // 安装 webpack-dev-server 之后配置
    devServer:{ //配置服务
        contentBase: "./",// 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true,// 实时刷新
        port:8080, // 端口
        hot:true,  // 热更新
        open:true  //是否打开浏览器
    },
    // 插件 安装：npm html-webpack-plugin --save-dev 
    plugins:[
        new HtmlWebpackPulgin({
            template:'./index.html',  // 模板文件路径
            filename:'index.html', //演示打开的文件(名字任意设置；默认打开index，改其他名字需要改浏览器url)
            title:'演示webpack' // head里边的title
        })
    ]

};


module.exports = obj; 
