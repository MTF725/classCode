//引入http模块
let http =require("http");
let fs =require("fs");
//querystring模块，node里用来处理参数字符串的模块
let qs=require("querystring");
//创建服务器
let server = http.createServer(function (req,res) {
    // res.end("123");
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    if(req.method=="GET"){
        //图标
        let readS =fs.createReadStream("favicon.ico");
        readS.pipe(res);
    }else if(req.method=="POST"){
        //表单
        /*
        post请求你过来的数据，不直接拼接在url网站上，所以不能通过解析url地址获得.
        我们需要监听系统的两个事件：data事件和end事件

         */
        let allData = "";
        req.on("data",function (chunck) {
            //拼接数据
            allData+=chunck;
        });
        req.on("end",function () {
            ///处理最终数据
            console.log("传递数据完毕",allData);
            let qsObj =qs.parse(allData);
            console.log(qsObj);
            if (qsObj.username=="abc"&&qsObj.password=="123") {
                res.write("登录成功！");
            }else{
                res.write("登录失败！");
            }
            res.end();//res.end()放在此处，接收所有数据并登陆成功或者失败后再结束
        });
    }else{
        res.end();
    }
})
//监听端口号
server.listen(7776);