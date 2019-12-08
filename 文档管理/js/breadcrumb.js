function bread(id){ 
    $('#bread').html(''); 
    let pray = tools.getParents(id); //获取所有父级，(函数获取到的数据最高的父级在最前边)
    $.each(pray,function(i,item){ //循环 添加面包屑样式
        let $navChild = null; 
        // 最后一个标签为span，父级的都为a标签
        if(i === pray.length-1){ 
            $navChild = $(`<span>${item.title}</span>`);
        }else{
            $navChild = $(`<a href="javascript:void(0);">${item.title}</a>`)
        }
        $('#bread').append($navChild)
        $navChild.click(function(){
            tools.getChildren(id).forEach(i=>i.checked = false); //点击时清除选中状态
            render(item.id);
            bread(item.id);
            rendertree(item.id);
        })
    })
}
bread(0)