// -----[content script].js-----
// 监听接收信息
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 	// 可写成switch形式 监听所有
// 	if (sender === "") {
// 		// do something
// 	}
// 	if (request.from === "cc") {
// 		// from 不是固定词，可使用其他自定义词汇
// 		// do something
// 	}
//   // 发送回传
// 	sendResponse({host: request.host});
//
// 	// 修改dom
// 	// document.querySelector("#s-usersetting-top").innerText = request.host;
//
// 	// 重发信息
// 	chrome.runtime.sendMessage({host: request.host}, (response) => {
// 		console.log(
// 			`content script -> background infos have been received. host: ${response}`
// 		);
// 	});
// });



host = document.domain
console.log(host)
// 发送 host 到 bg
// chrome.runtime.sendMessage({host: host}, function(response) {
//   console.log(response)
// })
// 重发信息
chrome.runtime.sendMessage({host: host}, (response) => {
  console.log(
    `from bg: ${response}`
  );
});


// 用来接收
// chrome.runtime.onMessege.addListener(function(request, sender, sendResponse) {
//   console.log(request)
//   if(request.ip === 'ip'){ // from 不是固定词，可使用其他自定义词汇
//   	// do something
//   	console.log('IP:'+request.ip)
//   }
// })
