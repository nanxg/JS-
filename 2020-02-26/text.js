const Promise = require("./PromiseA+"); // common js 引入
// import Promise from './PromiseA+' // ES6

new Promise((resolve,reject)=>{ // 传入excutor函数
    setTimeout(() => {
        resolve(res);
        reject(rej)
    });
})
.then((res)=>{

},(rej)=>{

})