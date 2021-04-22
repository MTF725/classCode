/*
url模块  node里专门用来处理url网址的模块

 */
//1.引入url模块
let url = require("url");
let urlStr="http://10.11.111.222:7654/a/b/c/index.html?name=zhangsan&age=20#sPage";

//2.将url地址转化成地址对象
let urlObj = url.parse(urlStr,true);
console.log(urlObj);

/*
 protocol: 协议名,
  slashes: 协议名后是否有双斜杠,
  auth: 认证授权,
  host: ip地址：端口号,
  port: 端口号,
  hostname: IP地址,
  hash: 哈希值,
  search: ?参数列表,
  query: 参数列表,
  pathname: 路径,
  path: 路径？参数列表,
  href: 完整url地址
 */
