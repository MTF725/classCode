/*
    express框架，是对node里http模块的再次封装
    Express是一个自身功能极简，完全是路由和中间件构成一个web开发框架：从本质上来说，一个Express应用就是在调用各种中间件
 */
//引入express模块
let express = require("express");
//引入body-parser模块
let bp = require("body-parser");
//搭建服务器
let app = express();
//使用中间件让express的每个请求都支持body-parser模块
app.use(bp.urlencoded({extended: false}));//请求内容是键值对
app.use(bp.json());//请求内容是json
/*
1.应用级别
app.use(路由(可选)，function(req,res,next){});
 */

/*
  解决跨域问题的办法
     1.jsonp  是前端主导的解决跨域的办法，jsonp不是一个标准，是约定俗成的一种解决问题的方式
     2.CORS(corss-origin-resource-sharing)跨域资源共享,是后端主导的解决跨域的办法，是标准。
 */
app.all("*", function (req, res, next) {//使用CORS解决跨域问题，需要写在最前边
    //设置允许响应的域，值可以写多个，如果有多个，放到数组里
    res.setHeader("Access-Control-Allow-Origin", ["http://localhost:63342"]);
    //设置允许响应的响应头
    res.setHeader("Access-Control-Allow-Headers", "X-Request-With");
    //设置允许响应的请求方式
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
})

//1.既不关心请求路由，又不关心响应行为
// app.use(function (req,res,next) {
//     console.log(new Date());
//     //继续匹配以下的请求
//     next();
// });
//2.只关心请求路径，不关心响应行为
// app.use(/(^\/.+\.html)/,function (req,res,next) {
//     console.log(new Date());
//     //继续匹配以下的请求
//     next();
// })
//3.既关心请求路径，有关心响应行为，app.get(),app.post(),app.all()都属于此类
/*
   2. 错误处理中间件
    app.use()
    (node特点，错误前置 (err,req,res,next))
 */
// app.use(function (err,req,res,next) {
//     console.error(err.stack);
//     res.status(500).send('Something broke')
// })
/*
 3.内置中间件static() 专门处理静态资源
 */
app.use(express.static("./"));
//app.use(express.static("static"));


/*
    express方法调用之后的返回值app，是一个服务器对象。该对象有三种方法，实现了类似监听请求类型和路由的功能,监听的顺序是从上至下的
    get()用来监听get类型请求
    post（）用来监听post类型请求
    all（）用来监听所有类型的请求，

    每个方法都有两个必填参数
    参数1：路由
    参数2：回调函数，两个参数，req请求对象和res响应对象
          req对象的常用属性：
              1.query，请求的参数对象
              2.path, 路径
          res对象的常用方法：
               res.json(原始数据类型:数组/对象);返回的数据系统都会将其先转成json串，再进行传递
               res.jsonp(原始数据:数组/对象);跨域时返回数据
               res.sendFile(文件路径)；返回静态资源
               res.send(数据)；建议只返回普通数据，最好是字符串，不能传数字，空值等类型
               res.setHead()/res.set();设置响应头//作业：查询不同
 */
app.get(/(^\/.+\.html$)|(^\/.+\.(png|jpg|ico|jepg)$)|(^\/.+\.js$)/, function (req, res) {
    // console.log(__dirname);
    console.log("前端请求的了静态资源", req.path);
    //res.sendFile(__dirname+"/2-express.html");//此处括号里填写绝对路径，_dirname是一个全局变量，代表当前文件夹的位置
    res.sendFile(__dirname + req.path);
});

app.get("/get", function (req, res) {
    if (req.query.name == "张三" && req.query.age == "20") {
        res.send({msg: "登录成功！"});
        // res.send("登录成功！");
        //res.send(1);
        //res.send(true);
    } else {
        res.json({msg: "登录失败！"});
        // res.json("登录失败！");
        //res.json(0);
        //res.send(false);
    }
    console.log(req.query);
});

app.post("/post", function (req, res) {
    //express的post请求，传递的数据存储在req对象的body属性里,默认情况下，req的body属性里是没有值的，如果想得到值，需要借助body-parser模块
    let data = "你好，我叫" + req.body.name + ",今年" + req.body.age + "岁";
    res.json(data);
    // console.log(req.body);//默认是undefined
})

app.get("/jsonp", function (req, res) {
    if (req.query.name == "张三" && req.query.age == "123") {
        res.jsonp("登录成功！");
    } else {
        res.jsonp("登录失败！");
    }
})

app.listen(9222);

/*
   中间件：
   前后端请求的过程
   1.前端发起请求
   2.后端获得请求
   3.后端对本次请求做处理
   4.后端响应本次请求

   在后端捕捉到请求与最后响应请求之间，将来可能会有大量复杂的逻辑，express允许我们将复杂的逻辑拆分成一个一个的小逻辑，使用中间件概念，逐个调用

   express里中间件的分类：
   1.应用级别中间件  app.use()
   2.错误处理中间件  app.use()
   3.内置中间件  express.static()
   4.第三方中间件  body-parser app.use()
 */

