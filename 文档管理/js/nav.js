// 全选
$('.top_l7').off().click(function(){    
    if(!list.length){ //如果子数据为空，则阻止执行，否则渲染出上级页面
        alert('这里是空的');
        return;
    }
    list.forEach(item => item.checked = !eve); //list数据的每一项的checked值取反(eve为全选开关)
    // 重新渲染文件，关联树级菜单与面包屑
    render(list[0].pid);
    rendertree(list[0].pid)
    bread(list[0].pid)
})

// 删除
$('.top_l5').click(function(){
    let ary = list.filter(item=>item.checked); //过滤出选中的数据
    if(!list[0]||!ary.length){ //如果list或者ary为空就弹框
        alert('没有选，没得删');
    }else{ 
        $('#zhezhao').show(); //遮罩显示
        $('#delete').show(); //删除框显示
    }
    $('#delete').find('.d_yes').click(function(){
        let {pid} = list[0]; //解构出父级的id；render父级id，渲染的出来的是子数据
        ary.forEach(i=>{
            delete data[i.id] //删除选中项的数据      
        })
        $('#delete').hide(); 
        $('#zhezhao').hide(); 
        render(pid); 
        rendertree(pid)   
    })
    $('#delete').find('.d_no').click(function(){
        $('#delete').hide(); 
        $('#zhezhao').hide(); 
    })
    $('#delete').find('i').click(function(){
        $('#delete').hide(); 
        $('#zhezhao').hide(); 
    })
})

// 重命名
$('.top_l2').click(function(){
    retnVal = true;
    let ary = list.filter(i=>i.checked); //过滤出选中的数据
    if(ary.length<1){
        alert('没选中')
    }else if(ary.length>1){
        alert('选太多了')
    // 只有选中一个才执行
    }else{
        newName(ary);
    }
})
function newName(ary){
    // 获取元素
    let $folder = $('#box').find('.active')      
    let $p = $folder.find('p');
    let $txt = $folder.find('input');
    let $i = $folder.find('i');
    // p隐藏，input显示
    $p.hide();
    $txt.show();
    $txt.select(); //input中的文字选中并聚焦
    $txt.blur(function(){ // 失焦事件
        let val = $txt.val();  
        let {id,pid} = ary[0]; //为了改数据和重新渲染
        let sbl = list.filter(i=>i.id!=id); //过滤出兄弟数据
        if($p.text()===val||!val){ //如果名字为空或者没变，就不改动也不渲染
            $p.show();
            $txt.hide();
            data[id].checked = false;
            $i.removeClass('checked')
        }else if(sbl.some(i=>i.title===val)){ //判断是否与兄弟数据重名
            // alert('重名了')
            data[id].checked = true;
            $txt.val($p.text())
            newName(ary)
        }else{     //改数据，重新渲染
            data[id].title = val;
            data[id].checked = retnVal = false;
            render(pid)
            rendertree(pid)
        }
    });
}
// 新建文件
$('.top_l0').click(function(){
    !list.length?$('.none').hide():null; 
    retnVal = true; //默认事件开关
    // 新建时默认名字不重复
    let vv = '新建文件夹';
    let bo = list.some(item=>item.title === vv); //判断是否与兄弟数据重名
    let num = 1;
    while(bo){ //循环判断，重名就把数字+1直到不重复
        let v1 = vv.replace(/\(\d+\)$/,'') + '('+ num++ +')';
        bo = list.some(item=>item.title === v1); 
        vv = v1;
    }
    let nid = +new Date
    data[nid] = { //添加新数据
        id:nid,
        pid:nnid,
        title:vv,
        checked:true
    };
    let {id,pid,title,checked} = data[nid];
    let $folder = $(`<div class="folder ${checked?'active':''}" id="${id}">
                        <i class=${checked?"checked":''}></i>
                        <img src="./img/file.jpg">
                        <input type="text" value="${title}"/>
                    </div>`)
    $('#box').append($folder); 
    // 避免阻止默认事件导致不能选中
    $folder.find('input').mousemove(function(ev){
        //  ev.returnValue = false
        ev.stopPropagation(); //阻止冒泡
    })
    $folder.find('input').select(); //默认选中文字并聚焦
    $folder.find('input').blur(function(){ //失焦时判断是否重名，重复就在末尾添加数字并+1
        let val = ($folder.find('input').val())?$folder.find('input').val():'新建文件夹';      
        let bol = list.some(item=>item.title === val);
        let num = 1;
        while(bol){
            let v = val.replace(/\(\d\)$/,'') + '('+ num++ +')';
            bol = list.some(item=>item.title === v);
            val = v;
        }
        // 更改数据，渲染页面
        data[nid].title = val;
        data[nid].checked = retnVal = false;
        render(pid)
        rendertree(pid)
    })
})

// 刷新
$('.top_l6').click(function(){
    $('#box').html('');
    setTimeout(()=>{
        render(nnid);
    })
    rendertree(nnid);
})

// 移动
$('.top_l1').click(function(){
    let moveData = list.filter(item=>item.checked === true);
    okcode = list[0].pid; //避免移动时未选择文件直接点确定使选中文件的pid改成-1
    if(!moveData.length){
        alert('请选择移动对象')
        return
    }else{    
        $('#move').show();
        $('#zhezhao').show();
        $('.move_ul').find('.0').find('ul').remove(); // 先移除列表后重新append进去
        $('.move_ul').find('li').append(rendMove(0)); 
    }   
    $('#move').find('.yes').off().click(function(){
        if(okcode === 'error'){ //点自己直接返回
            return;
        }
        let id = moveData[0].pid //获取当前页面的pid
        
        moveData.forEach(i=>{
            i.pid = okcode; //改变选中项的父级指向数据，
            i.checked = false;
        })
        $('#move').hide();
        $('#zhezhao').hide();
        render(id);
        rendertree(id);
    })
    $('#move').find('.no').off().click(close)
    $('#move').find('.close').off().click(close)
    function close(){
        $('#move').hide();     
        $('#zhezhao').hide();     
    }
})
// 移动框文件列表函数
let okcode = -1;
function rendMove(num,onoff){
    let datt = tools.getChildren(num); 
    let par = tools.getParents(num); //字符串中css样式用
    if (!datt.length)return; 
    let $ul = $(`<ul class="${datt[0].pid===0?'nav_left':'nav_tag'}" </ul>`)
    $.each(datt, function (i, item) {
        let { id, checked, title, pid } = item;
        let $left = $(`<li class="${id}" pid="${pid}"><p><i style="margin-left:${par.length*8+20}px"></i><span>${title}</span></p></li>`)

        $ul.append($left)
        
        $left.off().click(function(ev){ 
            let aa = list.filter(i=>i.checked)  //过滤出勾选的项
            if(aa.some(i=>i.id===id)){ //选中项与点击项相同就返回
                okcode = 'error';
                return false;
            }else{  
                okcode = id; //需要移动的数据的父级id（列表中选谁谁就是父级）
            }
            //点击的列表添加颜色，没点的移除颜色
            $('.move_ul').find('li').removeClass('color');
            $(this).addClass('color'); 
            // 当前li没有ul就append，并移除兄弟元素的ul；否则移除当前的ul。(开关)
            if(!$(this).find('ul').length){    
                $(this).append(rendMove(item.id))
                $(this).siblings('li').find('ul').remove()
            }else{ 
                $(this).find('ul').remove()
            }      
            ev.stopPropagation() //阻止冒泡
        })
    })
    return $ul
}
