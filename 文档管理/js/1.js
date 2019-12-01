// 渲染文件夹
let ary = [];
function render(arr){                 
    $('#box').html(''); // 清空页面中的内容
    $.each(arr,(i,item)=>{  // 根据数组中的数据生成文件
        let $floder = $(`<div class="folder">
                        <img src="./img/file.jpg" alt="">
                        <p>${item.title}</p>
                    </div>`);
        $('#box').append($floder); // 把文件样式放进页面
    }); 
    $('.folder').each(function(i,item){
        $(item).mousedown(function(ev){
            $('.folder').css('backgroundColor','')
            item.style.backgroundColor = 'skyblue';
            item.id = i;
            // $('.fils').mousemove(function(){
            //     console.log(1);
                
            // })
            // $(document).mouseup(function(ev){
            //     // $(item).css({display:'none',width:0,height:0});
            //     $('.fils').off('mousemove');
            //     $(document).off('mouseup');
            //     ev.preventDefault();
            // })
            ev.cancelBubble = true;
        })
    }) 
}
render(ary);
// 点击新建文件夹
$('.top_l0').click(function(){  
    // 新建时默认名去重
    let vv = '新建文件夹'
    let bo = ary.some(item=>item.title === vv); // 有一个重复名就是false
    let num = 1;
    while(bo){  //循环判断，名字重复，末尾数字就+1
        let v1 = vv.replace(/\(\d+\)$/,'') + '('+ num++ +')';
        bo = ary.some(item=>item.title === v1); 
        vv = v1;
    }
    // 创建元素，使用新文件名
    let $floder = $(`<div class="folder">
                        <img src="./img/file.jpg" alt="">
                        <input type="text" placeholder="请输入文件名" value="${vv}">
                    </div>`);
    $('#box').append($floder);
    $('input').select(); //全选聚焦事件
    $('input').blur(function(){ //失焦事件
        let val = ($('input').val())?$('input').val():'新建文件夹';      
        let bol = ary.some(item=>item.title === val);
        let num = 1;
        while(bol){
            let v = val.replace(/\(\d\)$/,'') + '('+ num++ +')';
            bol = ary.some(item=>item.title === v);
            val = v;
        }
        ary.push({
            id:+new Date,
            title:val
        })
        render(ary)     
    }) 
})
// 画框
$('.fils').mousedown(function(ev){ // 指定区域按下触发；(清除默认行为，失焦事件不触发)
    // let {left,top} = cover.getBoundingClientRect();
    dX = ev.pageX;
    dY = ev.pageY;
    $('#cover').css({display:'block',top:dY,left:dX});  
    $('.fils').mousemove(function(ev){  // 区域内移动触发
        $('#cover').css({display:'block',top:Math.min(ev.pageY,dY),left:Math.min(ev.pageX,dX),width:Math.abs(ev.pageX - dX),height:Math.abs(ev.pageY - dY)});
        // 框选
        $('.folder').each(function(i,item){          
            if(peng(cover,item)){  
                item.style.backgroundColor = 'skyblue';
                item.id = i;
            }else{
                item.style.backgroundColor = '';
                // item.id = false;
                item.id = '';
            }
        })
        // ev.preventDefault();
    })
    $(document).mouseup(function(ev){
        $('#cover').css({display:'none',width:0,height:0});
        $('.fils').off('mousemove');
        $(document).off('mouseup');
        // ev.preventDefault();
    })
})
// 阻止鼠标移动的默认行为,不会在选中其他文字
$(document).mousedown(function(ev){
    $(document).mousemove(function(ev){
        ev.preventDefault();
    })
})
// 碰撞函数
function peng(d1,d2){
    let {left:l,top:t,right:r,bottom:b} = d1.getBoundingClientRect();
    let {left:l2,top:t2,right:r2,bottom:b2} = d2.getBoundingClientRect();
    if(r<l2||b<t2||l>r2||t>b2){
        return false;
    }else{
        return true;
    }
}
// 删除函数
function del(elemt){
    let ary2=[];
    $(elemt).each(function(i,ele){
        let cc = ele.id;  
        if (cc){
            ary2.push(i) 
        }
    })
        ary2.forEach((item,i)=>{
            ary.splice(item-i,1)
        })
    render(ary); 
}
// 点击删除文件夹
$('.top_l5').click(function(){
    // quanxuan.innerText ='';
    let ary2=[];
    $('.folder').each(function(i,item){
        let cc = item.id;  
        if (cc){
            ary2.push(i) 
        }
    })
        ary2.forEach((ele,i)=>{
            ary.splice(ele-i,1)
        })
    render(ary); 
})  





