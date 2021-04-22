/*
模块（module）和包（package）是node的两个核心思想

模块的本质  就是一个文件，类型可以是js，json等

node.js的模块化遵循的是commonJS规范

commonJS规定了JS模块化所需的一些语法规范
语法：
require()  是一个函数，作用：引入其他模块
exports   是一个对象，作用：作为该模块的唯一入口对象
 */
var per = require("./person");//自定义的模块加./
console.log(per.name);
console.log(per.age);
per.sayHi();