let tools = (function(){
    // 获取子文件数据 
    function getChildren(id = 0){
        if(!data[id])return null;
        let arr = Object.keys(data); //获取对象的key值，组成数组
        // 筛选出ary中符合要求的key值，把data中对应的数据放到新数组中
        let ary = arr.filter( item => data[item].pid === id).map(item=>data[item]);
        return ary //返回子文件数据组
    }
    // 获取父级的文件数据
    function getParent(id){
        if(data[id].pid === -1)return null;
        return data[data[id].pid] //返回父级数据
    }
    // 获取祖辈的文件数据
    function getParents(id){
        let ary = [data[id]];
        let par = getParent(id); //获取父级
        while(par){ //如果有父级就循环
            ary.unshift(par); //首项添加
            par = getParent(par.id) //获取父级的父级
        }
        return ary
    }
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

    return {getChildren,getParents,peng}
})()