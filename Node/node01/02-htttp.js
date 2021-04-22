/*
http模块可搭建服务器，响应前端的请求
 */
//1.引入http模块
let http = require("http");
//2.创建服务器
let server = http.createServer(function (req,res) {
    res.end("abc!");
})
//3.监听端口
server.listen(6789)