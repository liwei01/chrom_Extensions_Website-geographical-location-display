// 将选项保存在 localStorage 中。
function save_options() {
  var select = document.getElementById("btn_select");
  var dns_url = select.children[select.selectedIndex].value;
  localStorage["dns_url"] = dns_url;

  // 发送 host 到 bg
  chrome.runtime.sendMessage({dns_url: dns_url}, function(response) {
    console.log(response)
  })

  // 更新状态，告诉用户选项已保存。 
  var status = document.getElementById("status");
  status.innerHTML = "选项保存完成";
  setTimeout(function() {
    status.innerHTML = "";
  }, 1500);
}

// 从保存在 localStorage 中的值恢复选定的内容。
function restore_options() {
  var favorite = localStorage["dns_url"];
  if (!favorite) {
    return;
  }
  var select = document.getElementById("btn_select");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
