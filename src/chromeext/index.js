
/*

*/
//https://developer.chrome.com/extensions/user_interface
var bkg = chrome.extension.getBackgroundPage();
//bkg.console.log('foo');
let btneditor = document.getElementById('btneditor');
//console.log(btneditor);
//var opt, user, gun;
//gun = Gun({localStorage:false});
let btndebug = document.getElementById('btndebug');
let btnplay = document.getElementById('btnplay');
//let btntest = document.getElementById('btntest');

btneditor.onclick = function(element) {
  //console.log("editor!");
  bkg.console.log('btneditor');
  chrome.tabs.create({url: chrome.extension.getURL('editor.html')});
};

btndebug.onclick = function(element) {
  //console.log("editor!");
  bkg.console.log('btneditor');
  chrome.tabs.create({url: chrome.extension.getURL('debug.html')});
};

btnplay.onclick = function(element) {
  //console.log("editor!");
  bkg.console.log('btneditor');
  chrome.tabs.create({url: chrome.extension.getURL('lanuch.html')});
};

/*
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};
*/

//btntest.onclick = function(element) {
//  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //bkg.console.log("current tab");
    //var activeTab = tabs[0];
    //chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  //});
  //chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//    console.log(response);
//  });
//};