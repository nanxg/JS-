const path = require('path');
const HtmlWebpackPulgin = require('html-webpack-plugin');
const miniCssPlugin=require('mini-css-extract-plugin');//css分离
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css压缩
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');//js压缩

const obj = {
    mode:'production', //开发模式
    // entry:'./index.js', //入口路径,可以是对象
    entry:{
        index:'./index.js' //对象可以写多个入口
    },
    // 输出，开发者模式可以不用写；安装 webpack-dev-server，运行服务热更新；生产模式需要输出
    output:{
        path:path.resolve(__dirname,'./build'), //输出路径
        filename:'build.js' //输出文件名；或者-> '[name].[hash].js' -> name为entry为对象时的key
    },
    module:{ //模块，即loader
        rules:[{
            //要处理的文件类型
                test:/\.css$/, // 正则匹配css文件
                use:[{
                    loader: miniCssPlugin.loader
                },'css-loader'],
                exclude:[ // 排除的文件
                    path.resolve(__dirname, "node_modules")
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
    
    // 插件 安装：npm html-webpack-plugin --save-dev 
    plugins:[
        new HtmlWebpackPulgin({
            template:'./index.html',  // 模板文件路径
            filename:'index.html', //演示打开的文件(名字任意设置；默认打开index，改其他名字需要改浏览器url)
            title:'演示webpack', // head里边的title
            minify:{
                removeComments: true,//去除html中的注释
                collapseWhitespace: true,// 删除空白符与换行符
                collapseBooleanAttributes: true,//是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
                removeAttributeQuotes: true,//是否移除属性的引号 默认false
            }
        }),
        new miniCssPlugin({
            filename:'./css/[name].css'
        }),
    ],
    optimization: { // 优化
        minimizer: [ // 允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)。
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                  // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
              }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }

};


module.exports = obj; 
