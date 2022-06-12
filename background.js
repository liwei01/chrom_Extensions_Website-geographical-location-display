// -----[service worker].js-----

let dns_url = 'https://doh.pub/dns-query?name=';

// 监听消息接收
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log('=========开始=========')
	// 不能使用这种方式 使用下面tabs的方式，详见最下面常见问题
        // chrome.runtime.sendMessage({host: request.host + 1}, (response) => {
	// 	console.log(
	// 		`background -> content script infos have been received. host: ${response.host}`
	// 	);
	// });
	if (request.dns_url){
		dns_url = request.dns_url
	}

	if( request.host ){

			var host = request.host
			var ip = from_host_get_ip(host)
			console.log(ip)
			ip.then(data => {
		  	console.log("ip:"+data)
				//====================
				from_ip_to_Location(data)
				//console.log(localStorage["dns_url"])
				//====================
				// 发送 ip 到 cs.js
				//
				// 下面这个不能用，会出现死循环
				// chrome.runtime.sendMessage({ip: data}, function(response) {
				//   console.log(' bg  > cs')
				// })


				// chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			 	// 		chrome.tabs.sendMessage(tabs[0].id, {ip: data}, response => {
			 	// 			console.log(`${response}`);
			  // 		})
				// });
				// 发送 ip 到 cs.js  结束

			})
		}

  // 消息回传
	sendResponse(`bg回传：${request.host}`);
});


function jsShow(location){
    //document.getElementById("idJsShow").innerHTML = location;
    console.log(location)
}

async function from_ip_to_Location(ip) {
				let url = 'http://whois.pconline.com.cn/jsFunction.jsp?callback=jsShow&ip=' +ip;
				console.log(url)
				try{
					fetch(url).then(
								     res => res.blob()
								 ).then(
								     (data) => {
								         let reader = new FileReader();
												 reader.readAsText(data, 'GBK');
								         reader.onload = () => {
								             var text = reader.result;
								             console.log(text);
														 var Location = text.split('\'')[1];
														 console.log(Location)
														 // 发送  到 cs.js
														 chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
										 			 			chrome.tabs.sendMessage(tabs[0].id, {Location: Location}, response => {
										 			 				console.log(`${response}`);
										 			  		})
										 				});

								         }
								     }
								 )

				}catch(error){
					console.log('IP Request Failed', error);
				}
}

async function from_host_get_ip(host) {
        //let url = 'https://doh.pub/dns-query?name=' + host;
        //台湾网络信息中心 dns
				//let url = 'https://dns.twnic.tw/dns-query?name=' + host;
				let url = dns_url+host;
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
