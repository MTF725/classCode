// 声明变量存储创建管道的计时器
var pipeTimer;
// 声明变量存储小鸟下落的计时器
var birdDownTimer;
// 声明变量存储小鸟上升的计时器
var birdUpTimer;
//声明一个变量存储计数
var count = 0;
//声明一个变量存储创建img的时机
//var creatImg=10;
//声明一个数组存储img标签
//var imgArr=[];
//声明一个变量存储每一位的值
//var everyArr=[];

// 开始按钮添加点击事件
startBtn.onclick = function(e) {
	var even = e || event;
	even.stopPropagation();

	// 隐藏开始游戏头部
	head.style.display = "none";
	// 隐藏开始菜单menu
	menu.style.display = "none";

	//显示顶部分数
	score.style.display = "block";
	//显示游戏小鸟
	bird.style.display = "inline-block";
	//显示ul
	pipes.style.display = "block";

	// 播放游戏背景音乐
	m2.play();
	// 设置循环播放
	m2.loop = true;

	// 创建管道
	createPipe();
	pipeTimer = setInterval(createPipe, 5000);

	// 小鸟开始下落
	birdDownTimer = setInterval(birdDown, 20);

	// 游戏区域绑定点击事件
	wrap.onclick = clickWrap;
}
// 创建管道的函数
function createPipe() {
	// 创建li
	var li = document.createElement("li");

	// 规定管道的初始位置
	li.style.left = pipes.offsetWidth + "px";

	// 添加到ul里
	pipes.appendChild(li);

	// 创建上下两个管道
	// 规定两个管道的高度
	// 通过高度
	var passH = 150;
	// 随机上管道的高度 [60, li的高-passH-60];
	var minH = 60;
	var maxH = li.offsetHeight - passH - minH;
	// 随机上管道的高度
	var upPipeH = Math.floor(Math.random() * (maxH - minH + 1) + minH);
	// 计算下管道的高度
	var downPipeH = li.offsetHeight - upPipeH - passH;

	// 创建上管道div
	var upPipeDiv = document.createElement("div");
	// 设置高度
	upPipeDiv.style.height = upPipeH + "px";
	// 添加class
	upPipeDiv.className = "upPipe";
	// 添加到li里
	li.appendChild(upPipeDiv);

	// 创建下管道div
	var downPipeDiv = document.createElement("div");
	// 设置高度
	downPipeDiv.style.height = downPipeH + "px";
	// 添加class
	downPipeDiv.className = "downPipe";
	// 添加到li里
	li.appendChild(downPipeDiv);

	// 移动管道
	// 声明一个变量存储当前管道的left值
	var left = li.offsetLeft;
	var moveTimer = setInterval(function() {
		left--;
		// 设置li的left
		li.style.left = left + 　"px";
		// 当完全移动出左边界时, 清除管道
		if(left <= -li.offsetWidth) {
			clearInterval(moveTimer);
			pipes.removeChild(li);
		}

		//判断并加分
		if(left == 0) {
			count++;
			// 得分
			updateScore();
		}

		for(var i = 0; i < pipes.children.length; i++) {
			crash(pipes.children[i].children[0]);
			crash(pipes.children[i].children[1]);
		}
	}, 20);
}

// 声明一个变量存储速度
var speed = 0;
// 小鸟下落的函数
function birdDown() {
	//修改图片成下落的小鸟图片
	bird.src = "img/down_bird.png";
	// 速度增大
	speed += 0.5;
	// 最终达到匀速
	if(speed == 4) {
		speed = 4;
	}

	bird.style.top = bird.offsetTop + speed + "px";

	//判断小鸟是否落地, 落地, 游戏结束
	if(bird.offsetTop + bird.offsetHeight >= pipes.offsetHeight) {
		// 游戏结束
		gameOver();
	}
}

// 给游戏区域点击事件
function clickWrap() {
	// 播放音乐
	m1.play();
	// 清除下落的计时器
	clearInterval(birdDownTimer);
	// 清除上升的计时器
	clearInterval(birdUpTimer);
	// 小鸟上升
	speed = 6;
	birdUpTimer = setInterval(birdUp, 20);
}

// 小鸟上升的函数
function birdUp() {
	// 换小鸟向上的图片
	bird.src = "img/up_bird.png";
	speed -= 0.5;
	if(speed <= 0) {
		// 说明小鸟到达最顶端, 运动停止, 下一刻开始下落
		// 清除上升的计时器
		clearInterval(birdUpTimer);
		// 新建小鸟下落的计时器
		birdDownTimer = setInterval(birdDown, 30);
	}
	// 修改小鸟的top值
	bird.style.top = bird.offsetTop - speed + "px";

	// 判断小鸟是否触顶
	if(bird.offsetTop <= 0) {
		// 游戏结束
		gameOver();
	}
}

// 游戏结束函数
function gameOver() {
	// 停止背景音乐
	m2.pause();
	// 播放游戏结束音乐
	m3.play();
	// 显示分数板
	end.style.display = "block";
	//修改计分板
	scoreRrcord();
	// 置空wrap的点击事件
	wrap.onclick = null;
	// 清除所有计时器
	var index = setInterval(function() {}, 1000);
	for(var i = 1; i <= index; i++) {
		clearInterval(i);
	}
	//

	//修改小鸟落地状态 
	bird.style.transition = "all 1s linear";
	bird.style.top = pipes.offsetHeight - bird.offsetHeight + "px";
	bird.src = "img/down_bird.png";
}

// 碰撞监测的函数
function crash(p) {
	// 不断判断小鸟与某个管道div之间的位置关系
	// 获取小鸟的位置
	var bLeft = bird.offsetLeft;
	var bRight = bLeft + bird.offsetWidth;
	var bTop = bird.offsetTop;
	var bBottm = bTop + bird.offsetHeight;

	// 获取管道div的位置
	var pLeft = p.parentNode.offsetLeft;
	var pRight = pLeft + p.offsetWidth;
	var pTop = p.offsetTop;
	var pBottom = pTop + p.offsetHeight;

	if(bLeft <= pRight && bRight >= pLeft && bTop <= pBottom && bBottm >= pTop) {
		gameOver();
	}
}

// 声明一个变量存储位数是否发生变化
var countIsChange = false;
// 声明一个变量存储当前分数的位数
var scoreNum = 1;
// 修改上方分数函数
function updateScore() {
	//分割分数, 得到每一位上的数
	var scoreArr = (count + "").split("");
	// 判断位数是否发生变化
	if(scoreNum != scoreArr.length) {
		countIsChange = true;
	} else {
		countIsChange = false;
	}

	// 根据位数是否发生变化决定是否新建img标签
	if(countIsChange) {
		// 需要新建img标签
		score.innerHTML = "";
		for(var i = 0; i < scoreArr.length; i++) {
			var sImg = document.createElement("img");
			sImg.src = "img/" + scoreArr[i] + ".jpg";
			score.appendChild(sImg);
		}
		// 重置当前的位数
		scoreNum = scoreArr.length;
	} else {
		// 直接修改已有img的src即可
		var allImgs = document.querySelectorAll("#score img");
		for(var i = 0; i < scoreArr.length; i++) {
			allImgs[i].src = "img/" + scoreArr[i] + ".jpg";
		}
	}
}


//封装计分板函数
function scoreRrcord() {
	//显示当前分数
	currentS.innerHTML = count;

	//判断当前分数是不是最高分
	//声明一个变量存储最高分
	var bestScore = 0;
		bestScore = +localStorage.getItem("bs");
	if(count > bestScore) {
		bestScore = count;
		localStorage.setItem("bs", bestScore);
		//当前分数比最高分数大时
		bestS.innerHTML = bestScore;
	}
	//当前分数比最高分数小时
	
	bestS.innerHTML = bestScore;
}

//console.log(localStorage.getItem("bs"));
//console.log(bestScore);
//localStorage.clear();