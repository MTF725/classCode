//引入html模块
let http = require("http");
//引入express模块
let express = require("express");
//引入mongodb模块
let mongoose = require("mongoose");
//搭建服务器
let app = express();
//网易链接
let reqUrl = "http://c.m.163.com/nc/article/headline/T1348647853363/0-140.html";
//内置中间件static() 专门处理静态资源
app.use(express.static("./"));
//链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/news', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//监听数据库的连接状态，在连接成功之后再做后续的逻辑事件
mongoose.connection.on("open", function () {
    console.log("数据库连接成功！");
    //定义model，需要通过Schema
    const mySchema = new mongoose.Schema({
        id: {type: String},
        title: {type: String},
        content: {type: String},
        imgUrl: {type: String}
    });
    //创建model
    const model = mongoose.model('myNews', mySchema);//这里的myNews是表名
    //模型一旦创建完毕，以后的所有对数据库的操作，都依赖该模型
    app.get("/info", function (req, res) {
        //向网易发起网络请求
        http.get(reqUrl, function (resObj) {//http.get(网络地址，回调函数function(形参)
            //resObj是一个对象，不是返回的数据，真正返回的数据在resObj里面存储
            //需要监听该对象的data和end方法，分段获取并拼接数据
            let allData = "";
            resObj.on("data", function (chunck) {
                allData += chunck;
            });
            resObj.on("end", function () {
                res.json(allData);
            });

        });
    });
    app.get("/collect",function (req,res) {
        let id =req.query.id;
        let title = req.query.title;
        let content = req.query.content;
        let imgUrl = req.query.imgUrl;
        //将数据插入数据库
        model.create({
            id:id,
            title:title,
            content:content,
            imgUrl: imgUrl
        },function (err,result) {
            //注意：这里的result并没有向前台返回数据的功能，若写成res，因为就近原则，会从这个函数里的res向前台发送数据
            if (!err) {
                res.json({msg:1});
            } else {
                res.json({msg:0});
            }
        })
    });
});
//监听端口号
app.listen(9898);