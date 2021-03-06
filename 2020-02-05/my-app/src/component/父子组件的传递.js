import React from 'react'
class App5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num:1,
            ary:[1,2,3,4],
            num2:2
        };
    }
    render() {
        const {num,ary,num2} = this.state;
        let list = ary.map((item,i)=><List key={i} txt={item}/>)
        return (
            <>
                <div>父组件{num}</div>
                <hr />
                {/* 两种写法：一种写在对象中，解构；一种等号连接 */}
                <P5Child {...{
                    pnum:num,
                    pnum2:num2,
                    pary:ary
                }}/>

                {/* 
                    <P5Child 
                        pnum={num} 
                        pnum2={num2} 
                        pary={ary}
                    />
                */}
                <ul>{list}</ul>
            </>
        );
    }
}

// 只传数据无需操作 可以直接写函数
function List(props){
    return (<li>{props.txt}</li>)
}

function P5Child({pnum,pnum2,pary}){
    return (<>子组件{pnum}{pnum2}{pary}</>)
}
// 需要操作时，class更方便
// class P5Child extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     render() {
//         const {pnum} = this.props;
//         return (
//             <>
//                 子组件{pnum}
//             </>
//         );
//     }
// }


export default App5;