const { Menu, BrowserWindow } = require('electron'); // 引入菜单
var template = [ // 菜单模板
    {
        label: '水果',
        submenu: [ // 子菜单
            {
                label: '香蕉',
                accelerator: 'ctrl+n', // 加速器(快捷键)
                click: () => {
                    var win = new BrowserWindow({
                        width: 500,
                        height: 500,
                        webPreferences: { nodeIntegration: true },
                    })
                    win.loadFile('demoChild.html');
                    win.on('closed', () => {
                        win = null
                    })
                }
            },
            {
                label: '苹果',
                submenu: [
                    { label: '红富士' }
                ]
            },
        ]
    }, {
        label: '蔬菜',
        submenu: [
            { label: '土豆' },
            { label: '白菜' }
        ]
    }, {
        label: '测试',
        submenu: [
            {
                label: 'demo',
                click: () => {
                    var win = new BrowserWindow({
                        width: 1000,
                        height: 800,
                        webPreferences: { nodeIntegration: true },
                    })
                    win.loadFile('demo.html');
                    win.on('closed', () => {
                        win = null
                    })
                }
            },
            {
                label: 'link',
                click: () => {
                    var win = new BrowserWindow({
                        width: 1000,
                        height: 800,
                        webPreferences: { nodeIntegration: true },
                    })
                    win.loadFile('link.html');
                    win.on('closed', () => {
                        win = null
                    })
                }
            },
            {
                label: 'file',
                click: () => {
                    var win = new BrowserWindow({
                        width: 1000,
                        height: 800,
                        webPreferences: { nodeIntegration: true },
                    })
                    win.loadFile('openfile.html');
                    win.on('closed', () => {
                        win = null
                    })
                }
            },
            {
                label: '网络',
                click: () => {
                    var win = new BrowserWindow({
                        width: 1000,
                        height: 800,
                        webPreferences: { nodeIntegration: true },
                    })
                    win.loadFile('interonoff.html');
                    win.on('closed', () => {
                        win = null
                    })
                }
            },
            {
                label: '弹框',
                click: () => {
                    var win = new BrowserWindow({
                        width: 1000,
                        height: 800,
                        webPreferences: { nodeIntegration: true },
                    })
                    win.loadFile('底部弹框.html');
                    win.on('closed', () => {
                        win = null
                    })
                }
            },
        ]
    },
];
var m = Menu.buildFromTemplate(template); // 构建模板
// Menu.setApplicationMenu(m); // 设置模板(设置之后会改变菜单栏)

module.exports = {
    m
}