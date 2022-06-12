// -----[service worker].js-----
// 监听消息接收
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id,{host: request.host},(response) => {
				console.log(
					`background -> content script infos have been received. host: ${request.host}`
				);
		});
	});

	host = request.host
  ip = from_host_get_ip(host)


	console.log(ip)
  // 消息回传
	// sendResponse({host: host});
	sendResponse('bg 收到 host');
});
//
//
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 	console.log(request)
// 	// console.log(sender)
// 	host = request.host
// 	ip = from_host_get_ip(host)
//
// 	console.log(ip)
//
// 	ip.then(data => {    // data就是resolve的response.data
//   	console.log("ip:"+data)
// 		// 发送 ip 到 cs.js
//
//
//
// 	  // 消息回传
//   //sendResponse({host: request.host});
// 	console.log(host)
// 	sendResponse({host:host});
// })



async function from_host_get_ip(host) {
        let url = 'https://doh.pub/dns-query?name=' + host;
        console.log(url)
        try {
            let response = await fetch(url);
            json_data = response.json()
            // console.log(json_data)
            // return await json_data;

            // .then(function(data){
            //     console.log('data')
            //     console.log(data['Answer'].length);
            //     n = data['Answer'].length -1
            //     ip = data['Answer'][n]['data']
            //     console.log(ip)})
						let text = '';
            var ip=json_data.then(function(data){
              console.log(data);
              n = data['Answer'].length -1;
							text = data['Answer'][n]['data']

              return data['Answer'][n]['data']})

            return ip

        } catch (error) {
            console.log('Request Failed', error);
        }
    }
