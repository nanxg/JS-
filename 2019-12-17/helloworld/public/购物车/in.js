// 自定义css样式名为style，获取此样式，如果有就放进页面，没有就获取数据、添加样式、存储style
let style = localStorage.getItem('style');
console.log(style);
if(!style){
    fetch('./index.css').then(d=>d.text())  // 获取的css文件，不是json格式，用 text() 
    .then(d=>{
        console.log(d);
        let sty = document.createElement('style');
        sty.innerHtml = d;
        document.querySelector('head').append(sty);
        localStorage.setItem('style',d);
    })
}else{
    let sty = document.createElement('style');
    sty.innerHTML = style;
    document.querySelector('head').append(sty);
}
console.log(style);
function render(ary){
    let html = ary.map(item=>`<li>${item}</li>`).join('');
    ul2.innerHTML = html;  
}

const lis = document.querySelectorAll('#ul1 li');
// 先获取本地内容渲染一下，避免刷新购物车内容就消失
let ary = JSON.parse(localStorage.getItem('gwc')) || [];
render(ary); 

// 添加购物车
lis.forEach((ele,i)=>{
    ele.onclick = function(){
        // 判断是否包含此项，避免重复添加li
        if(!ary.includes(this.innerHTML)){
            ary.push(this.innerHTML);
            // localStorage.setItem('gwc',ary);
            // console.log(localStorage.getItem('gwc')); 
            localStorage.setItem('gwc',JSON.stringify(ary)); //设置本地储存时，值会自动toStriing，所以用把数组转json格式
            render(ary);
        }
    }
})

// 兄弟页面同步渲染
// 只要修改localStorage值，兄弟页面就会触发这个事件
window.onstorage = function(){
    ary = JSON.parse(localStorage.getItem('gwc')) || [];
    this.render(ary)
}

// 删除购物车
ul2.onclick = function(ev){
    if(ev.target.tagName === 'LI'){
        ary = ary.filter(i=>i!==ev.target.innerText);
        localStorage.setItem('gwc',JSON.stringify(ary));
        render(ary);
    }
}

