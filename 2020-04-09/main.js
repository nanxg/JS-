// var electron = require('electron');
// var app = electron.app; //引用app(主进程)
// var BrowserWindow = electron.BrowserWindow; // 引用窗口
var { app, BrowserWindow, BrowserView, globalShortcut } = require('electron'); //app 新窗口 内嵌网页 全局快捷键
// var {m}= require('./render/menu'); //引入自定义菜单
var mainWindow = null; // 声明要打开的主窗口

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: { nodeIntegration: true }, // 读取文件(不写无法引入fs)
    });

    // require('./render/menu'); //引入自定义菜单
    // m.popup();// 弹出菜单

    // 注册全局快捷键
    const ret = globalShortcut.register('CommandOrControl+E', () => {
        console.log('CommandOrControl+X is pressed')
        mainWindow.loadURL('https://www.baidu.com')
    })
    
    if (!ret) {
        console.log('registration failed')
    } else {
        console.log('registration succeed')
    }
    // Check whether a shortcut is registered.
    console.log(globalShortcut.isRegistered('CommandOrControl+e'), ret) // 判断是否注册成功

    // mainWindow.loadFile('index.html'); // 加载的页面文件
    mainWindow.loadFile('demo.html'); // 加载的页面文件
    // mainWindow.loadFile('link.html'); // 加载的页面文件
    // mainWindow.loadFile('openfile.html'); // 加载的页面文件

    /* // BrowserView 页面内嵌网页
    var view = new BrowserView();
    view.setBounds({x:0,y:100,width:800,height:600});// 设置内嵌窗口样式
    view.webContents.loadURL('https://www.baidu.com'); // 设置网页连接  
    mainWindow.setBrowserView(view);
    setTimeout(() => {
        view.destroy() // 关闭BrowserView
    }, 2000);*/

    // 打开开发者工具
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null; // 关闭把主窗口赋值为null，不然越打开越多，占内存
    })
})

// 退出之前
app.on('will-quit', () => {
    // Unregister a shortcut.
    globalShortcut.unregister('CommandOrControl+X'); // 注销快捷键
    // Unregister all shortcuts.
    globalShortcut.unregisterAll(); // 注销全部快捷键
})

