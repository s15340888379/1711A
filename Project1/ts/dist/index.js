"use strict";
// ts给变量添加类型
var a = 100;
var b = 'hello world';
// b = a;
var c;
c = a;
c = b;
// 数组
// let d: Array<number | string> = [1, '', 2, ''];
var d = [1, '', 2, ''];
var d2 = ['aaa', 100];
var e = {
    list: [{
            id: 100,
            money: 100,
            count: 100
        }],
    onChange: function () { }
};
// 函数
function fun(a1, a2, a3, a4) {
    // return [1,2,3,4]
}
fun(199);
// 泛型
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
swap(['hello', null]);
// 类型断言
var f = {};
console.log(f.detail);
// 交叉类型 &, 我全都要
var g = {
    list: [],
    onChange: function () { },
    id: 1,
    detail: ''
};
// 联合类型 |, 或的关系
var h = {
    id: 100,
    detail: ''
};
var i = 0;
var j = 'lijie';
