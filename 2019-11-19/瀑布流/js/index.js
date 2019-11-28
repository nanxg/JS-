class Tools{
    minIndex(obj){
        if(!Array.isArray(obj)){
            obj = [...obj].map(item => item.scrollHeight)
        }else{
            obj = obj.map(item => item.scrollHeight)
        }
        let min = Math.min(...obj)
        let index = obj.findIndex( item => item === min)      
        return {index,min}
    }
    debounce(cb,time){
        let timer;           
        return function(...arg){
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                cb.call(this,...arg)
            },time)         
        }
    }
    throtting(cb,time){
        let prev = 0;
        return function(...arg){
            let now = +new Date;
            if(now - prev > time){
                cb.call(this,...arg)
            }
            prev = now;
        }
    }
}
class waterFoll extends Tools{
    constructor(name){
        super();
        this.box = document.querySelector(name);   
        this.lis = this.box.children;
        this.wh = window.innerHeight;
        this.boxt = this.box.offsetTop;
    }
    api(url,cb){
        let _this = this;
        fetch(url).then(d=>d.json()).then(d=>cb.call(_this,d))
    }
    render(){
        this.api('data.json',function(data){
            data.forEach((ele,i)=>{
                let div = document.createElement('div');          
                div.className = 'img_box';
                div.innerHTML = `<img src="${ele.pic}" height="${ele.height}" alt="">
                                <p class="desc">${ele.desc}</p>
                                <p class="author">${ele.author}</p>`;

                let {index} = this.minIndex(this.lis);
                this.lis[index].append(div);  
                setTimeout(()=>{
                    div.children[0].style.opacity=1
                },200) 
                
            })
        })
    }
    scroll(){
        let fn = ()=>{
            let {min} = this.minIndex(this.lis)
            if(this.wh + window.pageYOffset > this.boxt + min){
                this.render()
            }
        }
        window.onscroll = this.debounce(fn,200)
        window.onresize = ()=>{this.wh = window.innerHeight}
    }
}

let a = new waterFoll('.body');
a.render()
a.scroll()