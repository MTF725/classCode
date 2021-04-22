//引入mongodb模块
const mongoose = require('mongoose');
//链接数据库
mongoose.connect('mongodb://localhost:27017/news', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//监听数据库的连接状态，在连接成功之后再做后续的逻辑事件
mongoose.connection.on("open", function () {
    console.log("数据库连接成功！");
    //定义model，需要通过Schema
    let mySchema = new mongoose.Schema({
        //添加字段
        img: {type: String},
        title: {type: String},
        des: {type: String},
    });


    //创建model
    const MyModel = mongoose.model('news', mySchema);
    //模型一旦创建完毕，以后的所有对数据库的操作，都依赖该模型

    //实现前端发来请求，后台接收请求并向网易发起请求，最后返回
    let reqUrl = "http://c.m.163.com/nc/article/headline/T1348647853363/0-140.html"
    let http = require("http");
    let url = require("url");
    http.createServer(function (req, res) {
        res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
        let urlObj = url.parse(req.url, true);
        if (req.method == "GET" && urlObj.pathname == "/neteasy") {
            //html中ajax不写json时，后台默认callback，所以这里是urlObj.query.callback
            let funcName = urlObj.query.callback;
            //向网易发起网络请求，node网络请求底层是c++实现的，没有同源策略
            http.get(reqUrl, function (resObj) {//http.get(网络地址，回调函数function(形参))
                //resObj是一个对象，不是返回的数据，真正返回的数据在resObj里面存储
                //需要监听该对象的data和end方法，分段获取并拼接数据
                let allData = "";
                resObj.on("data", function (chunck) {
                    allData += chunck;
                });
                resObj.on("end", function () {
                    //jsonpCallback字段也可以不写, 用success字段代替.
                    //将传输过来的数据，拼接成函数调用的形式
                    let callbackStr = funcName + "(" + allData + ")";

                    res.end(callbackStr);
                });
            });
        } else if (req.method == "GET" && urlObj.pathname == "/news") {
            /*
     新增一条数据
     MyModel.create({字段名1:字段名1,字段名2:字段值2...},function(err,res){});
     */
            MyModel.create({
                img: urlObj.query.src,
                title: urlObj.query.title,
                des: urlObj.query.des
            }, function (err, res) {
                if (!err) {
                    console.log("添加成功", res);
                } else {
                    console.log("添加失败", err);
                }
            });
            //按照查询条件查找
            MyModel.find({sex: "女", school: "河南妓师学院"}, function (err, res) {
                if (!err) {
                    console.log("查询数据成功！", res);
                } else {
                    console.log("查询数据失败", err);
                }
            });
        }
    }).listen(7898);


    /*
        修改数据
        MyModel.update({查询条件},{$set:{修改的值}},{是否修改多条},function(err,res){});
     */

    //修改一条数据
    // MyModel.updateOne({_id: "5d82f768bc6dbb27185b7dc6"}, {$set: {name: "大土豆", sex: "不详"}}, function (err, res) {
    //     if (!err) {
    //         console.log("修改成功", res);
    //     } else {
    //         console.log("修改失败", err);
    //     }
    // });

    //修改多条数据
    //   MyModel.updateMany({sex: "男"}, {$set: {sex: "女"}}, function (err, res) {
    //       if (!err) {
    //           console.log("修改成功", res);
    //       } else {
    //           console.log("修改失败", err);
    //       }
    //   });

    /*
       查找数据
       MyModel.find({查询条件},{想要显示的字段},{筛选条件},function(err.res){});
     */
    //查询所有数据
    // MyModel.find(function (err,res) {
    //     if(!err){
    //         console.log(res);
    //     }else{
    //         console.log(err);
    //     }
    // })

    //按照查询条件查找
    // MyModel.find({sex:"女",school:"河南妓师学院"},function (err,res) {
    //     if (!err){
    //         console.log("查询数据成功！",res);
    //     } else{
    //         console.log("查询数据失败",err);
    //     }
    // });

    //规定想要显示的字段,想要显示值给1，不想显示，不写即可,如果不想显示_id,需要设置_id为0
    // MyModel.find({},{name:1,school: 1,_id:0},function (err,res) {
    //     if(!err){
    //         console.log(res);
    //     }else{
    //         console.log(err);
    //     }
    // });

    //查询条件的特殊写法 语法：$gt-大于  $lt-小于  $gte-大于等于  $lte-小于等于  $ne-不等于
    // MyModel.find({age:{$gt:25,$lt:50}},{name:1,age:1,sex:1,school:1,_id:0},function (err,res) {
    //     if(!err){
    //         console.log(res);
    //     }else{
    //         console.log(err);
    //     }
    // })

    //筛选条件  sort排序  skip跳过  limit限制
    //注意：如果既有排序又有跳过，先排序，再做其余的筛选
    // MyModel.find({}, {name: 1, age: 1, sex: 1, school: 1, _id: 0},{sort:{age:1},skip:2,limit:5}, function (err, res) {
    //     if (!err) {
    //         console.log(res);
    //     } else {
    //         console.log(err);
    //     }
    // });

    /*
         删除数据
         MyModel.remove({查询条件},function(err,res){})
     */
    // MyModel.deleteOne({_id: "5d82f730d71ab41d4029d462"}, function (err, res) {
    //     if (!err) {
    //         console.log("删除数据成功", res);
    //     } else {
    //         console.log("删除数据失败", err)
    //     }
    // })
});