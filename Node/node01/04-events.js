/*
events模块   事件监听模块
 */
//1.引入events模块
let eventEmitter=require("events");
//2.创建时间监听对象
let event = new eventEmitter();
//3.监听事件
event.on("littlePotato",function () {
    console.log("little事件触发！")
})
//触发事件
event.emit("littlePotato");