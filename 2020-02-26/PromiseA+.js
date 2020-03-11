class Promise {
    constructor(excutor) {
        this.status = 'pedding'; // Promise初始状态
        this.value = undefined; // resolve/reject传给then的值
        this.resolveAry = []; // 成功方法池
        this.rejectAry = []; //失败方法池

        let resolveFn = (res) => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pedding') return;
                this.status = 'fulfilled'; // 改变状态
                this.value = res; // 改变传入的值
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

        try {
            excutor(resolveFn, rejectFn);
        } catch (err) {
            rejectFn(err)
        }

    };
    then(resolveCB, rejectCB) {
        // 简单版
        // this.resolveAry.push(resolveCB);
        // this.rejectAry.push(rejectCB);

        // 链式调用版
        // typeof resolveCB !== 'function' ? resolveCB = res => res : null;
        // typeof rejectCB !== 'function' ? rejectCB = rej => {throw Error(rej)} : null; // 错误方式不一致
        return new Promise((resolve, reject) => {
            this.resolveAry.push(() => {
                try {
                    typeof resolveCB !== 'function' ? resolveCB = res => res : null;
                    let x = resolveCB(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            });
            this.rejectAry.push(() => {
                try {
                    if (typeof rejectCB === 'function') {
                        let x = rejectCB(this.value);
                        x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                    } else {
                        reject(this.value)
                    }
                } catch (err) {
                    reject(err);
                }
            });
        })
    };
    catch(rejectCB) {
        return this.then(null, rejectCB);
    };
    finally() {

    };
    static all(promiseAry = []) {
        return new Promise((resolve, reject) => {
            let index = 0, resolt = [];
            for (let i = 0; i < promiseAry.length; i++) {
                promiseAry[i].then(val => {
                    index++;
                    resolt[i] = val; // 索引和promiseAry的对应，保证结果顺序与数组相同(不能用push)
                    index === promiseAry.length ? resolve(resolt) : null
                }, val => {
                    reject(val)
                })
            }
        })
    }
}

// 两种导出规范
// module.exports = Promise;  // commonjs
// export default Promise // ES6