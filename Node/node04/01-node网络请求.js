//实现前端发来请求，后台接收请求并向网易发起请求，最后返回
let reqUrl="http://c.m.163.com/nc/article/headline/T1348647853363/0-140.html"
let http = require("http");
let url = require("url");
http.createServer(function (req,res) {
        res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
      let urlObj = url.parse(req.url,true);
      if(req.method=="GET"&&urlObj.pathname=="/neteasy"){
          //html中ajax不写json时，后台默认callback，所以这里是urlObj.query.callback
          let funcName = urlObj.query.callback;
          //向网易发起网络请求，node网络请求底层是c++实现的，没有同源策略
          http.get(reqUrl,function (resObj) {//http.get(网络地址，回调函数function(形参))
              //resObj是一个对象，不是返回的数据，真正返回的数据在resObj里面存储
              //需要、、该对象的data和end方法，分段获取并拼接数据
              let allData="";
              resObj.on("data",function (chunck) {
                  allData+=chunck;
              });
              resObj.on("end",function () {
                  //jsonpCallback字段也可以不写, 用success字段代替.
                  //将传输过来的数据，拼接成函数调用的形式
                  let callbackStr = funcName+"("+allData+")";

                  res.end(callbackStr);
              });
          });
      }
}).listen(7898);