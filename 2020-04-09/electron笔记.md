## electron

elecrton = chromium + nodejs + nativeAPI
  chromium：谷歌内核用来开发界面UI，
  nodejs：操作底层(文件读写，集成c++，可以用npm)，
  nativeAPI：跨平台(window/mac)统一原型界面

Electron 可以让你使用纯 JavaScript 调用丰富的原生(操作系统) APIs 来创造桌面应用。 你可以把它看作一个 Node. js 的变体，它专注于桌面应用而不是 Web 服务器端。

这不意味着 Electron 是某个图形用户界面（GUI）库的 JavaScript 版本。 相反，Electron 使用 web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。

从开发的角度来看, Electron application 本质上是一个 Node. js 应用程序。 与 Node.js 模块相同，应用的入口是 package.json 文件。 一个最基本的 Electron 应用一般来说会有如下的目录结构：
```
your-app/
├── package.json
├── main.js
└── index.html
```
新文件夹内 npm init 创建 package.json文件

```
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}

```

### 安装

安装：npm install --save-dev electron  
检测是否安装成功：npx electron -v   

或者：git clone https://github.com/atom/electron-quick-start
然后：npm install

下载不动，可以转换淘宝镜像：npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/

### 调试

- 浏览器调试：
  - 启动命令添加：--inspect=[port]；
  例：package.json中start设置为：electron --inspect=5858 .
  - 浏览器地址栏输入Chrome://inspect
  - 点击Configure
  - 配置连接端口；例：localhost:5858

### 主进程(main.js)

var { app, BrowserWindow, BrowserView, globalShortcut } = require('electron'); //app 新窗口 内嵌网页 全局快捷键

- electron 模块所提供的功能都是通过命名空间暴露出来的。 比如说： 
    - electron.app负责管理Electron 应用程序的生命周期， 
    - electron.BrowserWindow类负责创建窗口。 

只有一个主进程(main.js)，可以控制多个渲染进程

new BrowserWindow()  创建主窗口(mainWindow)，
  - 传入对象，可配置窗口宽高
  - webPreferences: { 
      nodeIntegration: true //是否可以引入node
    }  
  - webviewTag:true  设置可以使用webview

mainWindow.loadFile('index.html')  加载的页面文件

mainWindow.webContents.openDevTools()  打开开发者工具

```
mainWindow.on('closed', () => {
    mainWindow = null; // 关闭时把主窗口赋值为null，不然越打开越多，占内存
})
```

#### globalShortcut 注册快捷键
globalShortcut.register('CommandOrControl+E', () => { do somethings })  注册全局快捷键， 返回boolean，是否注册成功
  - 参数1设置的快捷键
  - 参数2是快捷键执行的回调函数
globalShortcut.isRegistered('CommandOrControl+e')  检测是否注册成功，返回boolean

- 在退出之前注销快捷键
```
app.on('will-quit', () => {
    globalShortcut.unregister('CommandOrControl+X'); // 注销单个快捷键
    globalShortcut.unregisterAll(); // 注销全部快捷键
})
```
> 渲染进程中注册需要在electron的remote中导出globalShortcut进行

#### BrowserView 页面内嵌网页
- var view = new BrowserView(); 新建  
- mainWindow.setBrowserView(view); 设置  
- view.setBounds({x:0,y:100,width:800,height:600}); 设置内嵌窗口样式
- view.webContents.loadURL('https://www.baidu.com');  设置网页连接

### API

#### 生命周期
- ready: 完成初始化时触发
- window-all-closed: 关闭所有窗口时触发
- activate: 窗口被激活时响应
- before-quit: 关闭窗口之前触发
- will-quit: 所有窗口已关闭并且应用程序即将退出时触发
- quit: 应用程序退出时触发

#### webContents常用事件

- dom-ready: dom加载完成触发
- did-finish-load: 导航完成时触发，即选项卡的旋转器将停止旋转，并指派onload事件后

#### process对象

> 可以获取到用户进程信息（CPU使用,环境变量,系统位数等），来判断用户电脑能否运行程序等

- 系统内存信息：process.getSystemMemoryInfo() 
- CPU使用信息：process.getCPUUsage() 
- 电脑环境变量：process.env  
- 系统位数(32/64)：process.arch  
- 操作系统：process.platform  

#### webview

- webview行内属性
  - preload="js路径" 可以扩展内嵌网页的功能
    - preload中的js打印输出都是在网页控制台，而非窗口控制台，需要 wb.openDevTools() // 打开网页控制台

```
// ->html
<webview id="wb" src="https://www.baidu.com" preload="./preload/preload.js"></webview>

// -> js
  // 监听webview的loading开始
  wb.addEventListener('did-start-loading',()=>{
      console.log('did-start-loading');
  })
  // 监听webview的loading结束
  wb.addEventListener('did-stop-loading',()=>{
      console.log('did-stop-loading');

      // 传入css
      wb.insertCSS(` 
          #s_lg_img{
              display:none;
          }
      `)
      // 注入执行js脚本
      wb.executeJavaScript(`
          alert(document.querySelector('#s_lg_img').src)
      `)
      wb.openDevTools() // 打开网页控制台
  })
```

#### dialog对话框

- 操作文件(打开或保存)：const { dialog } = require("electron").remote; 
  - 显示打开文件窗口：dialog.showOpenDialog(option,cb).then()
    - option对象中：
        title：窗口标题；
        defaultPath：默认选择路径；
        filters：过滤器，过滤文件类型(后缀名),值为数组，可以筛选多个后缀名；
        buttonLabel：按钮文字
    - cb函数中参数为选中文件路径组成的数组

    - .then() 用法同promise

  - 显示保存文件窗口：dialog.showSaveDialog(option,cb).then()
    - 基本同上
    - cb函数中参数为保存文件的路径

  - 显示消息窗口：dialog.showMessageBox(option).then()
    - type:'question', //question warning error
    - title:'message', 
    - message:'这是个消息', 
    - buttons:['确定','取消'] // 按钮,点击的按钮索引会传入.then()中res的response里


```
  dialog.showOpenDialog({ //显示打开选择窗口
      title: '请选择',
      defaultPath: '1.txt', // 默认路径
      filters: [ // 过滤器
          {
              name: '1',
              extensions: ['txt'], // 需筛选出的文件后缀
          }
      ], // 过滤文件格式
      buttonLabel: '开' // 按钮文字
  }).then(res => { // 打开成功后执行的函数
      let p = document.getElementById('p');
      // res是个对象，res.filePaths是文件路径的数组
      fs.readFile(res.filePaths[0], (err, data) => {
          p.innerHTML = data
      })
  }).catch(rej => {
      console.log(rej);
  })
```

#### files

##### 拖拽上传

- 监听drop事件，阻止默认行为避免页面迁移
- 监听dragover事件，阻止默认行为,否则drop不执行
- drop事件函数中 
  - event.dataTransfer.files -> 拖过来的所有文件数组
  - 数组每一项都有文件的path
  - 利用nodejs的文件读取方法，读取文件内容

dragover

```
    在拖动目标上触发事件 (源元素):
        ondragstart - 用户开始拖动元素时触发
        ondrag - 元素正在拖动时触发
        ondragend - 用户完成元素拖动后触发
    释放目标时触发的事件:
        ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
        ondragover - 当某被拖动的对象在另一对象容器范围内(拖动时)触发此事件
        ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
        ondrop - 在一个拖动过程中，释放鼠标键时触发此事件

    dragenter -> dragover -> drop/dragleave
```

```
file.addEventListener('drop', (e) => {
    e.preventDefault(); // 最好也阻止了，避免页面迁移
    const files = e.dataTransfer.files; //拖过来的文件e.dataTransfer；所有文件e.dataTransfer.files
    if (files && files.length > 0) {
        const path = files[0].path;
        const content = fs.readFileSync(path);
        console.log(content.toString());
    }
});
// 阻止这个默认行为，不然drop不执行
file.addEventListener('dragover', (e) => {
    e.preventDefault();
    console.log('dragover');
})
```

### 菜单

> 引入：{ Menu } = require('electron') // 主进程
       { Menu } = require('electron').remote // 渲染进程

- Menu.buildFromTemplate(template) 创建菜单,传入模板
- Menu.setApplicationMenu(menu) 设置程序菜单，会设置在各个程序窗体的顶层。
  - 可在菜单顶层标签的某个字母前添加&以绑定快捷键。如，使用&File后可以使用Alt-F呼出File的子选项，F会以下划线标出。&不会在运行时显示
- Menu.getApplicationMenu() 获取menu，返回 Menu 或 null ；不支持动态添加或删除菜单项。但可以动态修改实例属性
- menu.popup([options]) 弹出菜单
  - window BrowserWindow (可选) - 默认为选中窗口.
  - x 数字 (可选)-默认值是当前鼠标光标的位置。如果声明了 y, 则必须声明。
  - y 数字 (可选)-同上。
  - positioningItem数字 (可选) macOS -要在指定坐标下的鼠标光标下定位的菜单项的索引。默认值为-1。
  - callback Function (optional) - 会在菜单关闭后被调用.

#### 菜单项

template = [
  {
    label:'菜单名',
    accelerator: 'ctrl+n', // 加速器(快捷键)
    click: () => {},
    submenu: [ // 子菜单
      {
        label: '香蕉',
        type:checkbox , // 菜单项类型  normal、separator、submenu、checkbox 或 radio
        checked:true  
      }
      {
        role:  指定菜单项的行为，定义click属性后此属性将被忽略。undo, redo, cut, copy, paste, pasteAndMatchStyle, delete, selectAll
      }
    ]
  }
]

### 结合VUE

- 安装vue-cli：npm install -g vue-cli
- 创建工程：vue init simulatedgreg/electron-vue 项目名字
  - 配置项name ID Version(版本) 等可自定义
- 进入项目：cd 项目名字
- 安装依赖：yarn/npm i
- 启动


