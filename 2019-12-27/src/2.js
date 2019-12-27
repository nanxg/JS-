export default function (){
    return '666';
}

export function a(){ //导出单个
    return 123
}
let b = 13,c = 14;
export {b,c} //导出多个量
