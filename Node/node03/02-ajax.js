let http=require("http");
let url = require("url");
//querystring模块，node里用来处理参数字符串的模块
let qs=require("querystring");
let fs = require("fs");
http.createServer(function (req,res) {
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    //为了将前端网页和后台服务器配置成同源，现在需要捕捉浏览器地址栏的html文件请求，并返回一个对应的同源html文件，保证ajax的get和post正常执行
   let urlObj =url.parse(req.url,true);
   if(req.method=="GET"){
       //get请求
       //if(urlObj.pathname=="/02-ajax.html")
       //查询urlObj.pathname里有.html字段的话，执行以下程序
       if(/^\/.+\.html$/.test(urlObj.pathname)){
           //返回html文件
           // let readS = fs.createReadStream("2-ajax.html");
           let readS = fs.createReadStream("."+urlObj.pathname);
           //fs.createReadStream后+路径，但是 urlObj.pathname是 /02-ajax.html，多了个 / ，所以加个 . ，组成./02-ajax.html,成为一个路径
           readS.pipe(res);
       }else if(urlObj.pathname=="/favicon.ico"){
           //返回图标
       }else if(urlObj.pathname=="node_modules/jquery/dist/jquery.min.js"){
           //返回jQuery文件
          let readS = fs.createReadStream("node_modules/jquery/dist/jquery.min.js");
          readS.pipe(res);
       } else if(urlObj.pathname=="/get"){
           //ajax_get请求
           //console.log(urlObj.query.name)
           if(urlObj.query.name=="张三"&&urlObj.query.age=="20"){
               res.end("成功");
           }else{
               res.end("失败");
           }
       }else if(urlObj.pathname=="/jsonp"){
           //console.log(urlObj.query.cb);
           if(urlObj.query.name=="张三"&&urlObj.query.age=="20"){
             res.end(urlObj.query.cb+"('正确')");
           }else{
               res.end(urlObj.query.cb+"('失败')");
           }
       }else{
           res.end();
       }
   }else if(req.method=="POST") {
    //post请求
    let allData = "";
    req.on("data", function (chunck) {
        //拼接数据
        allData += chunck;
    });
    req.on("end", function () {
        //处理最终数据
        let qsObj = qs.parse(allData);
        if (qsObj.name == "张三" && qsObj.age == "20") {
            res.end("成功！");
        } else {
            res.end("失败！");
        }
        res.end();//res.end()放在此处，接收所有数据并登陆成功或者失败后再结束
    });
   }
}).listen(6901);