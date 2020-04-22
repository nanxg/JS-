const btn = this.document.querySelector('#btn');
const { remote } = require('electron');
const { BrowserWindow,Menu } = remote; // remote 可以打开子页面
// const {m}= require('./render/menu'); //引入自定义菜单
console.log(require('electron'));

window.onload = function () {
    btn.onclick = () => {
        newWin = new BrowserWindow({
            width: 600,
            height: 500,
        });
        newWin.loadFile('demoChild.html');
        newWin.webContents.openDevTools();
        newWin.on('closed', () => {
            newWin = null;
        })
    }
}

// window.addEventListener('content',()=>{
//     alert('123')
// })

// 右键菜单模板
var rightTemplate = [
    {
        label: '新建', accelerator: 'ctrl+w',
        click:(a)=>{
            console.log(a);
        }
    },
    { label: '复制', accelerator: 'ctrl+c' },
    { label: '粘贴', accelerator: 'ctrl+v' }
];

var right = [
    {
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
]
var m = Menu.buildFromTemplate(right); // 构建remote菜单模板
var m2 = Menu.buildFromTemplate(rightTemplate); // 构建remote菜单模板

// 绑定右键事件
window.addEventListener('contextmenu', (e) => {
    m.popup({ window: remote.getCurrentWindow() }); // 弹出右键菜单
    e.preventDefault(); //清除默认事件
})
