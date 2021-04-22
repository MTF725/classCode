/*
02-http-module
 */
/*
http协议：
基于请求和响应的模式，客户端与服务通过三次通信建立连接，连接建立之后客户端才可以发起请求，服务端接受请求并对请求作出回应，服务端响应结束之后，客户端与服务器的连接断开，本次请求结束.

req(request)请求对象：存储前端发起其请求的所有信息
常用属性：
1.req.method 本次请求的方式
2.req.url 本次请求的地址

res(response)响应对象：用于对前段请求作出响应
常用方法：
1.end(内容)，结束本次响应并传递内容，end不能不写，如果不写，前段一直等待后台结束，end后面不要再写东西
2.write（内容），向前端传递内容，可以写多次
3.writeHead（状态码，（配置信息）），设置响应头
 */
//1.引入http模块
let http =require("http");
//2.创建服务器
let server =http.createServer(function (req,res) {
    // console.log(req.method);
    // console.log(req.url);
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    res.write("hello！你好！");

    res.end("abc");
})
//3.监听端口号
server.listen(7788);