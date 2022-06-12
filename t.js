
var url = 'https://doh.pub/dns-query?name=csdn.net'

var promise = fetch(url).then(function(response) {

   //response.status表示响应的http状态码
   if(response.status === 200){
     //json是返回的response提供的一个方法,会把返回的json字符串反序列化成对象,也被包装成一个Promise了
     return response.json();
   }else{
     return {}
   }

});

promise = promise.then(function(data){
  //响应的内容
	console.log(data);
}).catch(function(err){
	console.log(err);
})



d = getJSON('qq.com')
// console.log('d:')
// console.log(d)

dd = d.then(function(data){
  console.log('data')
  console.log(data['Answer'][0]);
  console.log(data['Answer'][1]);
  ip = data['Answer'][0]['data']
  return  ip
}).catch(function(err){
  console.log(err);
})
