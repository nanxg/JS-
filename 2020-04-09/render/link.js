var {shell} = require('electron'); // 能其他桌面客户端的关联得模块
var ahref = document.querySelector('#href');
ahref.onclick = function(e){
    e.preventDefault();
    var href = this.getAttribute('href');
    console.log(shell);
    // shell.openItem(href); // 以默认方式打开文件
    shell.openExternal(href); // 以默认方式打开外部协议
}

var btn = document.getElementById('btn');
var close = document.getElementById('close');
var sub = null
btn.onclick = function(){
    sub = window.open('https://www.baidu.com'); //子窗口打开链接，返回窗口代理
}
close.onclick = function(){
    sub.close() // 关闭子窗口
}
// 窗口间传信息(只有open可以传递，new的传不了)
var btn2 = document.getElementById('btn2');
let par = 10;
let child = null;
btn2.onclick = function(){
    child = window.open('./child.html'); //打开子窗口
}
btn3.onclick = function(){
    child.postMessage(par); // 向子窗口传递信息
    par--;
}
// 监听传递信息
window.addEventListener('message',(msg)=>{
    let text = document.querySelector('#text');
    text.textContent = JSON.stringify(msg.data) 
})
