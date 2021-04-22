//引入express模块
let express = require("express");
//引入mysql模块
let mysql = require("mysql");
//搭建服务器
let app = express();

app.use(express.static("./"));

app.get("/jsonp",function (req,res) {
    var connection = mysql.createConnection({
        host     : 'localhost',//主机地址
        user     : 'root',//用户名
        password : '',//密码
        database: 'phpDB'//表单名
    });
    connection.connect();

    var  sql = 'SELECT * FROM person';
    connection.query(sql,function (err, result) {
        // console.log(result);
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
       res.jsonp(result);

    });
});

app.listen(9112);
