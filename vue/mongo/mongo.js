//引入mongodb模块
const mongoose = require('mongoose');
let express = require("express");
let bp = require("body-parser");
//链接数据库
mongoose.connect('mongodb://localhost:27017/student', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//监听数据库的连接状态，在连接成功之后再做后续的逻辑事件
mongoose.connection.on("open", function () {
    console.log("数据库连接成功！");
//创建服务器
    let app = express();
//axios传值默认是对象形式传值
//这种bp.urlencoded({extended:false}的方法，用来解析参数字符串，即解析地址栏里的键值对格式数据
// app.use(bp.urlencoded({extended:false}));

//这种bp.json()的方法，用来解析json串格式
    app.use(bp.json());
//设置跨域资源共享
// app.all("*",function (req,res,next) {
//     res.setHeader("Access-Control-Allow-Origin",["http://localhost:8080"]);
//     res.setHeader("Access-Control-Allow-Methods","GET,POST");
//     next();
// });

    /*
       当使用CORS允许跨域时，CORS允许的请求的数据格式里没有json数据格式，但是axios里post默认的数据格式是json数据格式，导致后台无法获取post传递过来的数据
       解决办法：
       1.更改axios发起的post请求时传递的数据格式（比如，改成参数字符串格式，即key：value）
       2.不用CORS解决跨域，或者想办法让前后端同源，（比如，vue里设置请求的转发）

       body-parser在设置解析方式时，需要跟前端传过来的数据格式保持一致
       如果前端的数据格式是参数字符串，bp.urlencoded({extended:false})
       如果前端的数据格式是json串，就用bp.json()
     */


    app.get("/api/get", function (req, res) {
        //get请求的数据以参数字符串形式写在地址栏后，用req.query解析
        if (req.query.name == "abc" && req.query.sex == "男") {
            res.json({msg: "登录成功"});
        } else {
            res.json({msg: "登录失败"})
        }
    });
    app.post("/api/post", function (req, res) {
//post请求的数据存储在req的body里，所以要配置body-parser
        if (req.body.name = "班长" && req.body.sex == "女") {
            res.json({msg: "手术成功"})
        } else {
            res.json({msg: "手术失败"})
        }
        console.log(req.body);
    });
    app.listen(9696);
})