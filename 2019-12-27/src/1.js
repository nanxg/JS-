import fn,{a} from './2.js';

import * as d from './2'; // js文件可以不加后缀

console.log(a(),fn());
console.log(d);

export default {   //默认导出
    data:{
        a,
        fn
    }
}
