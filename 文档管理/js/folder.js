
function render(num = 0) {
    $('#box').html('');
    let dat = tools.getChildren(num);
    list = dat; 
    nnid = num;
    if (!dat.length) { //如果没有子数据就不执行了
        $('.none').show();
        return
    }
    $('.none').hide();
    eve = true; //全选开关
    rendered(dat);
   
    // 全选开关eve为true就勾选
    if(eve)$('.top_l7').find('i').addClass('checked');

}
function rendered(dat){
    $.each(dat, function (i, item) {
        //有一个不是true就关全选
        if(!item.checked){ 
            eve = false;
            $('.top_l7').find('i').removeClass('checked');
        }

        let { id, checked, title ,pid} = item;
        let $folder = $(`<div class="folder ${checked?'active':''}" id="${id}">
                            <i class=${checked?"checked":''}></i>
                            <img src="./img/file.jpg">
                            <input type="text" value="${title}"/>
                            <p>${title}</p>
                        </div>`)
        $folder.find('input').hide();
        $folder.find('p').show();
        $folder.find('i').click(function(ev){ //点选框的时候选中或不选；可多选
            item.checked = !item.checked; 
            render(pid);
            ev.stopPropagation(); //阻止冒泡
        })
        // 同一元素的单击或双击函数
        var clickTimer = null;
        function _click(ev) {
            if (clickTimer) { //如果有定时器就清除
                window.clearTimeout(clickTimer);
                clickTimer = null;
            }
            // 添加定时器，如果没有双击并且到时间就执行
            clickTimer = window.setTimeout(function () {
                dat.forEach(item=>item.checked=false) //单击只能选中一个
                item.checked = !item.checked;
                render(pid);
            }, 200);
            // ev.stopPropagation() //阻止冒泡
        }
        function _dblclick(ev) {
            if (clickTimer) { //双击了就清除单击时添加的定时器
                window.clearTimeout(clickTimer);
                clickTimer = null;
            }
            dat.forEach(item => item.checked = false);//双击时清除当前页面的选中状态
            
            render(id); 
            rendertree(id);
            bread(id);
            // ev.stopPropagation(); //阻止冒泡
            // ev.preventDefault();
        } 
        $folder.click(_click)
        $folder.dblclick(_dblclick)

        // 阻止冒泡，避免父级清除默认行为造成影响
        $folder.find('input').click(stop)
        $folder.find('input').dblclick(stop)
        $folder.find('input').mousedown(stop)
        function stop(ev){ ev.stopPropagation();} //阻止冒泡

        // $folder.mousemove(function(ev){ev.preventDefault();}) //这阻止了选框就滑不上去
        $('#box').append($folder)
    })
}
render(0)

// 阻止默认行为
$(document).mousedown(function(ev){ev.originalEvent.returnValue = retnVal;})

$('.fils').mousemove(function(ev){ 
    ev.stopPropagation();
})

$('#aside').find('.0').append(rendLi(0))
// 树级菜单
function rendLi(num,onoff){
    let datt = tools.getChildren(num); 
    let par = tools.getParents(num); //字符串中css样式用
    lists1 = datt; 
    nnidd1 = num; 
    if (!datt.length)return; 
    // let $ul = ul
    let $ul = $(`<ul class="${datt[0].pid===0?'nav_left':'nav_tag'}" </ul>`)
    $.each(datt, function (i, item) {
        let { id, checked, title, pid } = item;
        // 根据父级数量给图片增加缩进值；li添加class名=自己数据的id，便于左右联动
        let $left = $(`<li class="${id}" pid="${pid}"><p><i style="margin-left:${par.length*8+20}px"></i><span>${title}</span><img src="./img/br_jt.png" alt=""></p></li>`);

        $ul.append($left)
 
        $left.off().click(function(ev){ 
            list.forEach((it)=>{ //点击是清除当前的勾选
                it.checked = false
            }) 
            // 如果点击项没打开就添加打开样式，append子数据，把兄弟元素关闭；如果打开了就给让他关闭
            if($(this).find('p').attr('class')!=='open'){ 
                $(this).find('p').addClass('open')
                $(this).siblings('li').find('p').removeClass('open')
                $(this).append(rendLi(id))
                $(this).siblings('li').find('ul').remove()
                render(id)
                bread(id)
            }else{
                $(this).find('p').removeClass('open')
                $(this).find('ul').remove()
                render(pid)
                bread(pid)
            }
                ev.stopPropagation()
        })
    })
    return $ul
}
// 关联树级菜单
function rendertree(num){
    let $li = $('.'+num); //找到对应id的li
    $li.find('p').addClass('open'); //右边点击的谁就把他打开
    if ($li.find('ul').length){ //如果有里边ul就把他移除然后添加(刷新数据)
        $li.find('ul').remove();
    }
    $li.append(rendLi(num, false)); //把对应子数据放进去
}

