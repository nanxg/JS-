// 排序

let $sort = $('.sort_ul').find('li')
$sort.each((i,ele)=>{
    ele.onoff = true;
    $(ele).click(function(){       
        $('#box').html('');
        if(this.onoff){
            if (this.dataset.name === 'title'){
                list.sort((a,b)=>{
                    return a.title.localeCompare(b.title,'zh')
                })
            }else{
                list.sort((a,b)=>{
                    return (a[this.dataset.name]) - (b[this.dataset.name])
                })
            }    
        }else{
            if (this.dataset.name === 'title'){
                list.sort((a,b)=>{
                    return b.title.localeCompare(a.title,'zh')
                })
            }else{
                list.sort((a,b)=>{
                    return (b[this.dataset.name]) - (a[this.dataset.name])
                })
            } 
        }
        this.onoff = !this.onoff
        rendered(list);
    })
})
