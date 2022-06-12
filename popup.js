
document.getElementById("send").onclick = function() {
  //console.log("cilck send");
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response)
  });
}

// let send = document.getElementById("send");
// send.addEventListener("click" ,async() => {
//   console.log("cilck send");
// })
