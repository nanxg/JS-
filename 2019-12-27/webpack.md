ES6 -> ECMAScript6 -> ECMAScript2015 +

- ES6 是 JavaScript 语言的下一代标准
- ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等

### webpack

- 模块化打包工具，对一些浏览器不能识别的语法进行编译，使其能够识别
- 遵循commonjs规范（node）
- 通过入口文件，分析所有文件的依赖关系

- 重点：如何配置(可研究优化)
- 难点：多敲，解决报错

- 核心：入口(entry),输出(output),loader,插件(plugins),服务器配置(dev-server)

> https://juejin.im/post/5e01de37f265da33ab637daf

#### 安装

> 安装yarn：npm install yarn -g

- 全局安装(只需一次)
    npm install webpack -g 

- 局部安装
    1. 新建文件夹（文件夹不能中文且不能与webpack重名(会报错)）
    2. 初始化 -> npm init -y
    3. npm install --save-dev webpack
       或 yarn add webpack -dev 

    4. 设置package.json
        "scripts":{
            "dev":"webpack -w" //-w 可以避免总启动dev(打包使用)
            // "start":"webpack-dev-server" (开发使用)
        }
    5. 启动：npm run dev  或  yarn run dev

    6. 手动创建并配置文件：webpack.config.js
    ```
    const path = require('path');
    const obj = {
        mode:'development',
        entry:'./1.js',
        output:{
            path:path.resolve(__dirname,'./build'),
            filename:'build.js'
        }
    };

    module.exports = obj;
    ```
       - mode：production生产模式(打包上线，压缩,过滤不需要的文件)，development开发模式(开发用)
       - entry：入口
       - output：输出

### loader

- loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块

### dev-server

- webpack-dev-server

```
    包含
    include: [
        path.resolve(__dirname, "app")
    ],
    排除
    exclude: [
        path.resolve(__dirname, "app/demo-files")
    ],
    // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
    // test 和 include 具有相同的作用，都是必须匹配选项
    // exclude 是必不匹配选项（优先于 test 和 include）
    // 最佳实践：
    // - 只在 test 和 文件名匹配 中使用正则表达式
    // - 在 include 和 exclude 中使用绝对路径数组
    // - 尽量避免 exclude，更倾向于使用 include

```

### ES6模块

- 引入 
    import xx  from  '路径' -> 从某个路径中引入xx 
- 导出
    export 要导出的内容

> 第一种写法:

    ```
        import name from  '路径'  // name：随意取得名字
        export default xxx  // default 默认导出的内容，可以不给变量取名

        注意一个文件中只能有一个default，不然就报错
    ```
> 第二种写法:
     ```
        import {name1,name2} from  '路径' // {}内是固定的名字，跟导出的名字一致

        export {xxx} 

        如果需要改名字，那么使用as
            比如:
                import {ary as arr} from  '路径'
                arr就是ary

            导入的时候可以使用*来导入，但是必须要用as换个名字；*表示全部导入
            比如:
                import * as aaa from  '路径'
                就等同于把路径中的所有内容都获取出来了，并且是一个对象
    ```
