let http = require("http");
let qs = require("querystring");//把参数字符串转换成对象
let url =require("url");
let fs= require("fs");
let  server = http.createServer(function (req,res) {
   res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
 //通过请求类型区分开get和post请求
    if(req.method =="GET"){
      //get请求
        let urlObj = url.parse(req.url,true);//此处的true将字符串转化成对象
        //通过路由判断不同的get请求
        switch(urlObj.pathname){
            case"/login":{
              if (urlObj.query.username=="杜甫"&&urlObj.query.password=="111") {
                  res.end("诗人注册成功！");
              }else{
                  res.end("诗人注册失败！");
              }
                break;
            }
            case"/css":{
             res.write("<link rel='stylesheet' type ='text/css' href='http://127.0.0.1:7789/myStyle'>");
             res.end();
                break;
            }
            case"/favicon.ico":{
                let readS =fs.createReadStream("favicon.ico");
                readS.pipe(res);
                break;
            }
            case"/img":{
                res.write("<img src='http://127.0.0.1:7789/myImage' style='width: 300px;height: 200px'>");
                res.end();
                break;
            }
            case"/myStyle":{
                //返回css文件
                let readS=fs.createReadStream("style.css");
                readS.pipe(res);
                break;
            }
            case"/myImage":{
                //返回img文件
                let readS=fs.createReadStream("325695.jpg");
                readS.pipe(res);
                break;
            }
        }
    }else{
        //post请求
        let allData = "";
        req.on("data",function (chunck) {//此方法触发多次
            allData +=chunck
        });
        req.on("end",function () {
            let qsObj = qs.parse(allData);
            if (qsObj.username=="李白"&&qsObj.password=="666"){
                res.end("登录成功！");
            }else {
                res.end("登录失败！");
            }
        });
    }
})
server.listen(7789);