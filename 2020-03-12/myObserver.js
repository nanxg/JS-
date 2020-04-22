export default class Observer{
    constructor(data){
        this.observe(data);
    };
    observe(data){
        /* 
            data 可能对象套对象
        */
        if(data && typeof data === 'object'){
            console.log(Object.keys(data));
            
        }
    }
}
