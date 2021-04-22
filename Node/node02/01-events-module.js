/*
01-events-module
 */
//1.引入events模块
let EventEmitter=require("events");
//2.创建事件监听对象
let event=new EventEmitter();

/*
Events模块，是node里众多模块的基类，如fs，http模块都是events的子类，那就意味着这些模块可以直接使用events模块的方法
 */
event.on("abc",function () {
    console.log("第一个abc事件监听者");
});
event.on("abc",secondABCListener);
function secondABCListener() {
    console.log("第二个abc事件监听者");
};
event.on("abc",thirdABCListener)
function thirdABCListener() {
    console.log("第三个abc时间监听者");
}
//触发abc事件
//event.emit("abc");
//event.emit("abc");

//一次性监听事件
// event.once("onceEvent",function () {
//     console.log("一次性事件被触发了");
// })
// event.emit("onceEvent");
// event.emit("onceEvent");

//移除事件监听
// event.removeListener("abc",secondABCListener);
// // event.emit("abc");

//移除所有事件监听
// event.removeAllListener("abc");
// event.emit("abc");

event.on("yueliang",function () {
    console.log("111");
});
event.on("yueliang",function () {
    console.log("111");
});
event.on("yueliang",function () {
    console.log("111");
});
event.on("yueliang",function () {
    console.log("111");
});
event.on("yueliang",function () {
    console.log("111");
});
event.emit("yueliang");