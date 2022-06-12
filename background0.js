
console.log('bg.js');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message)
  host = message["host"]
  //console.log(sender)
  //from_host_get_ip3(message["host"])
  response1 = from_host_get_ip(host)
  //response1 = from_host_get_ip4(host)
  console.log(message["host"]+' response1 : ')
  console.log(response1)

  ip = response1.then(function(data){
      console.log('data')
      console.log(data['Answer'].length);
      n = data['Answer'].length -1
      ip = data['Answer'][n]['data']
      console.log(ip)
      return  ip
      console.log(data)

      // 发送IP 到content.js
      //sendResponse(ip)
      chrome.runtime.sendMessage({ip: ip}, function(response) {
        console.log(response)
      })

  }).catch(function(err){
      console.log(err);
  });

  //sendResponse(response1)
  //sendResponse('bg 反回')
});

//https://doh.pub/dns-query?name=baidu.com
//https://whois.pconline.com.cn/ipJson.jsp?ip=114.114.114.114&json=true

chrome.runtime.onMessage.addListener((message, callback) => {
  //const tabId = getForegroundTabId();
  if (message.data === "setAlarm") {
    chrome.alarms.create({delayInMinutes: 5})
  } else if (message.data === "runLogic") {
    chrome.scripting.executeScript({file: 'logic.js', tabId});
  } else if (message.data === "changeColor") {
    chrome.scripting.executeScript(
        {func: () => document.body.style.backgroundColor="orange", tabId});
  };
});


// 中文乱码解决方法
// fetch("/api/list=sz002307", {
// 	}).then(
// 	     res => res.blob()
// 	 ).then(
// 	     (data) => {
// 	         let reader = new FileReader();
//
// 	         reader.onload = () => {
// 	             var text = reader.result;
// 	             console.log(text);
// 	         }
//
// 	         reader.readAsText(data, 'GBK');
// 	     }
// 	 )

async function from_ip_get_city(ip){
  let url = 'https://whois.pconline.com.cn/ipJson.jsp?&json=true&ip=' + ip;
  console.log(url)
  try {
      let response = await fetch(url);
      json_data = response.blob()
      // 中文乱码解决方法
      .then((json_data) => {
                let reader = new FileReader();
                reader.readAsText(json_data, 'GBK')
                reader.onload = () => {
                     var text = reader.result;
                     console.log('text:')
                     console.log(text);
                     //return text
                 }
                 console.log(json_data)
              });

      //     function json_data_ch(json_data){
      //       let reader = new FileReader();
      //       reader.readAsText(json_data, 'GBK')
      //       reader.result
      //       console.log(text)
      //       return text
      //     }
      //
      //
      // json_data_ch(json_data)
      return await json_data;
  } catch (error) {
      console.log('Request Failed', error);
  }
}


async function from_host_get_ip(host) {
        let url = 'https://doh.pub/dns-query?name=' + host;
        console.log(url)
        try {
            let response = await fetch(url);
            json_data = response.json()
            // console.log(json_data)
            return await json_data;
        } catch (error) {
            console.log('Request Failed', error);
        }
    }

    // .then(data => console.log("data1：",data['Answer'][0].data))


// //ajax发送请求：
// function from_host_get_ip2(host) {
//   url = 'https://doh.pub/dns-query?name=' + host
//   console.log(url)
//   $.ajax({
//       type:"GET",                //请求方式
//       url:url,                 //路径
//       async:true,             //是否异步
//       dataType:"json",        //返回数据的格式
//       success:function(res){  //成功的回调函数
//          console.log(res);    //res代表返回的数据，可以随心所欲处理数据啦
//     }
// })
//
// }


// // 原生js发送请求：
// function from_host_get_ip(host) {
//   url = 'https://doh.pub/dns-query?name=' + host
//   console.log(url)
//   let xhr = new XMLHttpRequest();
//   // methods：GET/POST请求方式等，url：请求地址，true异步（可为false同步）
//   xhr.open("get",url ,true);
//   xhr.send();                                            // 发送
//   xhr.onreadystatechange = function() {                  // 判断
//       if (xhr.readyState == 4 && ajax.status == 200) {   // 成功，接收到数据
//               console.log(xhr.response);                 // 查看返回的数据(可输出 xhr 哈)
//               //JSON.parse(xhr.response);                // 如果数据为字符串的对象，可转换一下
//           }else if(xhr.status == 404) {                  // 失败，页面未找到
//           }
//       }
// }
