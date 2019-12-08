retnVal = false;
$('.fils').mousedown(function(ev){
    let dX = ev.pageX, dY = ev.pageY,$folder = $('.fils').find('.folder');

    // console.log($(ev.target).closest('.folder')); //找到事件源的本身或者父级的class名为folder的那个
    if($(ev.target).closest('.folder').length) return; //如果点到文件上就返回，避免click事件失效
    $('#cover').css({display:'block',top:dY,left:dX}); 
    $('.fils').mousemove(function(ev){
        // 滑动时选框的位置与大小
        $('#cover').css({
            top:Math.min(dY,ev.pageY),
            left:Math.min(dX,ev.pageX),
            width:Math.abs(ev.pageX-dX),
            height:Math.abs(ev.pageY-dY),
        }); 
        // 循环每个文件，看是否框到
        $folder.each((i,item)=>{
            if(tools.peng($('#cover')[0],item)){     
                $(item).find('i').addClass('checked');
                $(item).addClass('active');
                // 碰到就改对应数据的checked值
                list.forEach(i=>i.id===$(item).attr('id')*1?i.checked = true:null)
            }else{
                $(item).find('i').removeClass('checked');
                $(item).removeClass('active');
                list.forEach(i=>i.id===$(item).attr('id')*1?i.checked = false:null)
            }
        })
        if(list.every(i=>i.checked)){ //如果每一项都为true就全选
            $('.top_l7').find('i').addClass('checked');
            eve = true;
        }else{
            eve = false;
            $('.top_l7').find('i').removeClass('checked');
        }
        // ev.originalEvent.returnValue = false;
    })
    $(document).mouseup(function(ev){
        // 按下与抬起在同一位置就清除选中
        if(!retnVal&&dX === ev.pageX&&dY === ev.pageY){
            list.forEach(item=>item.checked=false)
            $folder.each((i,item)=>{
                $(item).find('i').removeClass('checked');
                $(item).removeClass('active');
            })
            eve = false;
            $('.top_l7').find('i').removeClass('checked');
        }
        // 清除选框与事件
        $('#cover').css({width:0,height:0,display:'none'}); 
        $('.fils').off('mousemove')
        $(document).off('mouseup')
    })

    // return false;
    ev.originalEvent.returnValue = retnVal;
})

