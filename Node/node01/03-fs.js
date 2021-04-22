/*
fs模块，node里对文件进行操作的模块
 */
//1.引入fs模块
let fs = require("fs");
fs.readFile("book.txt","utf-8",function (error,data) {
    console.log(data);
});
console.log("1111");