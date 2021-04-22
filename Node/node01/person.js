let name = "乔碧萝殿下";
let age =58;
function sayHi() {
    console.log("我是一个颜值主播");
}
// exports.name =name;
// exports.age=age;
// exports.sayHi=sayHi;

module.exports = {
   name,
   age,
   sayHi
}
//以上两种写法都可以用
/*
exports和module.exports的区别：
1.exports是对module.exports的引用。 exports = module.exports ={}
2.外界在require时，真正引入的是module.exports 而不是exports
 */

