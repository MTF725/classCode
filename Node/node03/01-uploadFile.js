let http = require("http");
let url = require("url");
let fs = require("fs");
//处理文件上传，需要使用formidable模块
let fb = require("formidable");
http.createServer(function (req,res) {
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    let urlObj=url.parse(req.url);
    if (req.method=="POST"&&urlObj.pathname=="/uploadF"){
        //1.创建文件上传对象
        let uploadObj =new fb.IncomingForm();//fb.IncomingForm是一个构造函数
        //2.接收传递过来的数据
        uploadObj.parse(req,function (err,fields,files) {
         /*
             err:错误信息
             fields：文件信息之外的配置信息
             files：本次提交的文件的所有信息
          */
             //获取文件信息对象
            let fileObj = files.f;
            //获取文件名
            let fileName = fileObj.name;
            //获取文件临时路径
            let fileTemPath = fileObj.path;

            //把文件从临时路径移动到指定路径
            //从临时路径读取文件
            let readS = fs.createReadStream(fileTemPath);
            let writeS=fs.createWriteStream(fileName);//此处直接写文件名，表示一个同级路径，即此文件在node03文件夹下
            readS.pipe(writeS);//把一个文件读出来再写入另一个文件里,此处不涉及前端，所以不写res
        })
      res.end();
    } else if(req.method=="GET"&&urlObj.pathname=="/favicon.ico"){
        let readS = fs.createReadStream("favicon.ico");
        readS.pipe(res);
    }else{
        res.end();
    }
}).listen(7989);