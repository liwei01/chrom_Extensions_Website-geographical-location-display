// -----[content script].js-----


const para = document.createElement("div");
const node = document.createTextNode('显示IP地址为 117.183.225.30 的位置信息,<span id="idJsShow"></span>');
//const node1 = document.createElement('显示IP地址为 117.183.225.30 的位置信息,<span id="idJsShow"></span>');
//para.appendChild(node);
para.innerHTML = ('网站位置：<span id="idJsShow"></span>')
para.style.position = "fixed";
para.style.background = "#f6ff00";
//para.style.width = "200px";
para.style.bottom = "5%";
para.style.right = "20px";
para.style.left = "auto";
//para.style.z-index = "9999";
document.body.appendChild(para)

function jsShow(location){
    document.getElementById("idJsShow").innerHTML = location;
    //console.log(location)
}




// 监听接收信息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	// 可写成switch形式 监听所有
	console.log(request)
	console.log(request.Location)
	jsShow(request.Location)

	// var div=document.createElement(“div”);
	// div.innerText = "向body添加一个元素";
	// document.body.appendChild(div);


  // 发送回传
	sendResponse('cs回传： 收到  bg ip');

	// 修改dom
	// document.querySelector("#s-usersetting-top").innerText = request.host;

	// 重发信息
	// chrome.runtime.sendMessage({host: request.host + 1}, (response) => {
	// 	console.log(
	// 		`content script -> background infos have been received. host: ${response.ip}`
	// 	);
	// });
});


host = document.domain
console.log(host)

// 发送 host 到 bg
chrome.runtime.sendMessage({host: host}, function(response) {
  console.log(response)
})



//
// <script src="https://whois.pconline.com.cn/jsFunction.jsp?callback=jsShow&ip=8.8.8.8"></script>
