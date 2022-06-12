console.log(" =================================== cs.js")

host = document.domain
console.log(host)

// 发送 host 到 bg
chrome.runtime.sendMessage({host: host}, function(response) {
  console.log(response)
})


// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   console.log(message)


// // 原生js发送请求：
// function from_host_get_ip(host,callback) {
//   url = 'https://doh.pub/dns-query?name=' + host
//   console.log(url)
//   let xhr= new XMLHttpRequest();
//   // methods：GET/POST请求方式等，url：请求地址，true异步（可为false同步）
//   xhr.open("get",url ,true);
//   xhr.send();                                // 发送
//   xhr.onreadystatechange = function() {                  // 判断
//       if (xhr.readyState == 4 && ajax.status == 200) {   // 成功，接收到数据
//               console.log(xhr.response);                 // 查看返回的数据(可输出 xhr 哈)
//               //JSON.parse(xhr.response);                // 如果数据为字符串的对象，可转换一下
//           }else if(xhr.status == 404) {                  // 失败，页面未找到
//           }
//       }
//
// }
