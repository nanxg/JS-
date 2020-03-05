class Promise {
    constructor(excutor){
        this.status = 'pedding'; // Promise初始状态
        this.value = undefined; // 传给then的返回值
        this.resolveAry = []; // 成功方法池
        this.rejectAry = []; //失败方法池

        let resolveFn = (res) => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pedding') return;
                this.status = 'fulfilled'; // 改变状态
                this.value = res; // 改变返回值
                this.resolveAry.forEach(item => item(this.value))
            });
        };
        let rejectFn = (rej) => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pedding') return;
                this.status = 'rejected';
                this.value = rej;
                this.rejectAry.forEach(item => item(this.value))
            });  
        };
        excutor(resolveFn,rejectFn);
    };
    then(resolveCB,rejectCB){
        this.resolveAry.push(resolveCB);
        this.rejectAry.push(rejectCB);
    };
    catch(){

    };
    finally(){

    }
}

// 两种导出规范
module.exports = Promise;  // commonjs
// export default Promise // ES6