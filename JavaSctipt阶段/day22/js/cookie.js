//判断cookie里是否有要操作的键值对
function haskey(key) {
	//"name=zhangsan; age=20"
	//声明一个变量存储是否有对应的key
	var isHasK = false;
	//获取cookid，先按照"; "分割
	var cArr1 = document.cookie.split("; ");
	console.log(cArr1);
	//循环每个字符串，继续分割
	for(var i = 0; i < cArr1.length; i++) {
		var cArr2 = cArr1[i].split("=");
		if(cArr2[0] == key) {
			//如果有，修改标识，存在对应的key
			isHasK = true;
		}
	}
	return isHasK;
}

//添加一条cookie
function addCookie(key, value, time) {
	//判断time的数据类型
	if(typeof time == "number") {
		//数字类型，max-age
		document.cookie = key + "=" + value + ";max-age=" + time;
	} else if(typeof time == "object") {
		//对象类型，expires
		document.cookie = key + "=" + value + ";expires=" + time.toString();
	} else {
		//字符串类型，expires
		document.cookie = key + "=" + value + ";expires=" + time;
	}
}
//获取cookie里的key对应的value
function getValueByKey(key) {
	//获取cookid，先按照"; "分割
	var cArr1 = document.cookie.split("; ");
	console.log(cArr1);
	//循环每个字符串，继续分割
	for(var i = 0; i < cArr1.length; i++) {
		var cArr2 = cArr1[i].split("=");
		if(cArr2[0] == key) {
			//如果有，修改标识，存在对应的key
			return cArr2[1];
		}
	}
}
//修改cookie里的key对应的value
function updateValueByKey(key, value, time) {
	//	//判断time的数据类型
	//	if(typeof time == "number") {
	//		//数字类型，max-age
	//		document.cookie = key + "=" + value + ";max-age=" + time;
	//	} else if(typeof time == "object") {
	//		//对象类型，expires
	//		document.cookie = key + "=" + value + ";expires=" + time.toString();
	//	} else {
	//		//字符串类型，expires
	//		document.cookie = key + "=" + value + ";expires=" + time;
	//	}
	addCookie(key, value, time);
}
//删除cookie里某一条键值对
function deleteCookie(key) {
	document.cookie = key + "=;max-age=-1";
}