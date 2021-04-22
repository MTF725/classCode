//1.引入http模块
let http =require("http");
//引入url模块
let url =require("url");
//引入fs模块
let fs = require("fs");
//2.创建服务器
let server =http.createServer(function (req,res) {
    //使回应的数据格式可以识别HTML结构，编码格式是UTF-8
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});//设置字符集，以能够显示中文
    //将请求的url地址解析
    let urlObj = url.parse(req.url,true);//此处的true将字符串转化成对象
    //console.log(urlObj.pathname);
    if(urlObj.pathname=="/"){
        //res.write("表单请求");
         //获取参数
        if(urlObj.query.username=="张三"&&urlObj.query.password=="123"){
            res.write("登录成功");
        }else{
            res.write("登录失败");
        }
        res.end();
    }else{
        //res.write("图标请求");
        //返回图标
        //1.读取静态资源
        let readS=fs.createReadStream("favicon.ico");//括号内是路径
        //2.将静态资源放回给res对象
        readS.pipe(res);//此方法自带res.end(),所以后边不再写res.end();
    }
});
//3.监听端口号
server.listen(7799);