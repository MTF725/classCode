let express = require("express");
let bp = require("body-parser");
let app = express();
app.use(bp.urlencoded({extended: false}))//后台以参数字符串（键值对）方式解析传过来的数据
// app.use(bp.json())//后台以json串形式解析传过来的数据
app.get('/api/get', function (req, res) {
    if (req.query.username == "abc" && req.query.password == "123") {
        res.json({msg: "登录成功"});
    } else {
        res.json({msg: "登录失败"});
    }
}),
    app.post('/api/post', function (req, res) {
        if (req.body.id == "123" && req.body.name == "张三") {
            res.json({msg: "注册成功"})
        } else {
            res.json({msg: "注册失败"})
        }
    })
app.listen(9696)