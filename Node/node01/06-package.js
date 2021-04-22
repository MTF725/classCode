/*
包 package
本质上是一个文件夹（目录） npm(node package manager)包管理器
问题：当用户引入的路径是一个包的路径时，node会如何选择包里文件进行返回？

commonJS规定：在创建或者下载包时，必须保证每个包里有一个package.json文件，在该文件里需要用户对包的基本信息做出说明，方便系统以后取用。

node允许我们使用交互式的方法创建package.json文件

步骤：
1.先来到包对应的路径下，cd路径
2.交互式创建package.json    npm init/快速创建package.json   npm init -y
 */
let c  =require("./Computer");
console.log(c.name);

/*
使用npm管理第三方包
1.安装  npm install包名/  npm install包名@版本号
2.移除  npm uninstall包名
3.重装所有第三方库，  npm install
install单词都能缩写成i

 */