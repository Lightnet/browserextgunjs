/*

*/
//https://developer.chrome.com/extensions/user_interface
var bkg = chrome.extension.getBackgroundPage();
//bkg.console.log('foo');
chrome.runtime.sendMessage({action:"getpublickey"});
chrome.runtime.sendMessage({action:"getalias"});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log("incoming message");
    bkg.console.log("incoming message");
    //console.log(request)
    if(request.action == "setpublickey"){
      if(request.publickey !=null){
        //console.log("public key");
        $("#publickey").val(request.publickey);
      }
    }
    if(request.action == "setalias"){
      if(request.alias !=null){
        //console.log("public key");
        $("#alias").text(request.alias);
      }
    }
  }
);
$("#btneditor").click(function(element) {
  chrome.tabs.create({url: chrome.extension.getURL('editor.html')});
});
$("#btndebug").click(function(element) {
  chrome.tabs.create({url: chrome.extension.getURL('debug.html')});
});
$("#btnplay").click(function(element) {
  chrome.tabs.create({url: chrome.extension.getURL('lanuch.html')});
});
$("#btncopykey").click(function(element) {
  $("#publickey").select();
  document.execCommand("copy");
});

//btntest.onclick = function(element) {
  //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //bkg.console.log("current tab");
    //var activeTab = tabs[0];
    //chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  //});
  //chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    //console.log(response);
  //});
//};