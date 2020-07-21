import Cookie from 'js-cookie'

// ts给变量添加类型
let a: number = 100;

let b: string = 'hello world';

// b = a;

let c;

c = a;
c = b;

// 数组
// let d: Array<number | string> = [1, '', 2, ''];
let d: (number|string) []  = [1, '', 2, ''];
let d2: [string, number] = ['aaa', 100];


// 用接口来描述对象
interface Props{
    readonly list: Array<{
        readonly id: number,
        money: number,
        count: number
    }>,
    onChange: ()=>void,
    onReudce?: ()=>void
}

let e: Props = {
    list: [{
        id: 100,
        money: 100,
        count: 100
    }],
    onChange: ()=>{}
}

// 函数
function fun(a1:number, a2?:string, a3?: number[], a4?:()=>void): void{
    // return [1,2,3,4]
}

fun(199);

// 泛型
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap(['hello', null])


// 类型断言
let f = {};
interface IItem{
    id: number,
    detail: string
}

console.log((f as IItem).detail);

// 交叉类型 &, 我全都要
let g: Props & IItem = {
    list: [],
    onChange: ()=>{},
    id: 1,
    detail: ''
}

// mapStateToProps的返回结果
interface IStateProps {

}

// mapDispatchToProps的返回结果
interface IDispatchProps {

}

// 组件调用时props的返回结果
interface IOwnProps {

}


// 联合类型 |, 或的关系
let h: Props | IItem = {
    id: 100,
    detail: ''
}


// 类型别名 type
type yinleijie = number | string;
type dongjiangcheng = Props;
type lijie = 'lijie';

let i: yinleijie = 0;
let j: lijie = 'lijie';

Cookie.get('name')
Cookie.set('name', 'lijie')