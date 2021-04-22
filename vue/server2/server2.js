let express = require("express");
let bp = require("body-parser");
let app = express();
//因为axios传来的是json格式，所以这里用bp.json()
app.use(bp.json());
app.get("/api/get1", function (req, res) {
    if (Math.random() > 0.5) {
        res.json({data: ["get1请求成功的数据！"], success: true})
    }else{
        res.json({errorCode: 404, success: false, errMsg: "数据库连接失败！"})
    }
});
app.post("/api/post1", function (req, res) {
    if (req.body.username == "abc" && req.body.password == "123") {
        res.json({data: ["get1请求成功的数据！"], success: true})
    }else{
        res.json({errorCode: 404, success: false, errMsg: "数据库连接失败！"})
    }
});
app.listen(9696)