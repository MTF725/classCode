/*
    mongoDB,非关系型数据库的一种
    mysql，关系型数据库
    关系型数据库，数据以表的结构存储，操作数据使用sql语句
    非关系型数据库，数据可以多种形态存储（文档，文件，图片），操作数据不使用sql语句

    操作步骤
    1.指定数据库的路径并创建数据库
      1.1 使用cd命令来到mongodb的安装包的bin文件夹下
      1.2 mongod --dbpath==指定文件夹路径
    2.启动数据库
       2.1 使用cd命令来到mongodb的安装包的bin文件夹下
       2.2 mongo
 */
/*
   mysql---表，行，字段
   mongodb---集合，文档，域  需要安装包名mongoose
 */
//引入mongodb模块
const mongoose = require('mongoose');
//链接数据库
mongoose.connect('mongodb://localhost:27017/student', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//监听数据库的连接状态，在连接成功之后再做后续的逻辑事件
mongoose.connection.on("open", function () {
    console.log("数据库连接成功！");
    //定义model，需要通过Schema
    let mySchema = new mongoose.Schema({
        //添加字段
        name: {type: String, default: "无名"},
        age: {type: Number, min: 18, default: 20},
        sex: {type: String, default: "男"},
        school: {type: String}
    });
    //创建model
    const MyModel = mongoose.model('students', mySchema);
    //模型一旦创建完毕，以后的所有对数据库的操作，都依赖该模型
    /*
      新增一条数据
      MyModel.create({字段名1:字段名1,字段名2:字段值2...},function(err,res){});
      */
    // MyModel.create({
    //     name: "王政",
    //     age: 26,
    //     sex: "男",
    //     school: "新疆大学"
    // }, function (err, res) {
    //     if (!err) {
    //         console.log("添加成功",res);
    //     } else {
    //         console.log("添加失败",err);
    //     }
    // })

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
MyModel.deleteOne({_id:"5d82f730d71ab41d4029d462"},function (err,res) {
    if(!err){
        console.log("删除数据成功",res);
    }else{
        console.log("删除数据失败",err)
    }
})
});