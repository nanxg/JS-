var fs = require('fs');
window.onload = function(){
    var btn = document.querySelector('#btn');
    var box = document.querySelector('#box');
    
    btn.onclick = function(){
        fs.readFile('1.txt',(err,data)=>{
            box.innerHTML = data;
        })
    }
}