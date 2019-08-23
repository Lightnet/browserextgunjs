

var bkg = chrome.extension.getBackgroundPage();

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  
});

chrome.runtime.onMessage.addListener(
  function(message, callback, sendResponse) {
    console.log("message");
    console.log(message);
    sendResponse("bar");
    //bkg.console.log("test");
    /*
    if (message == "runContentScript"){
      chrome.tabs.executeScript({
        file: 'contentScript.js'
      });
    }
    */
 });
//https://medium.com/ringcentral-developers/build-a-chrome-extension-with-ringcentral-embeddable-bb6faee808a3
/*
chrome.browserAction.onClicked.addListener(function (tab) {
  console.log("tab");
  alert('HELLOOOOO WORLD!!');
});
*/

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("tab");
  //bkg.console.log("tab");
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    bkg.console.log("tab");
    var activeTab = tabs[0];
    console.log(activeTab);
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  //var url = domains.contains(tabs.url) ? "tracking.html" : "nottracking.html";
  //var url = tabs.url;
  //bkg.console.log('login...');
  //bkg.console.log(url);
  bkg.console.log(tabs);
  //chrome.browserAction.setPopup({
     //popup: url,
     //tabId: tabs[0].id
  //});
});

var opt, user, gun;
;(async function(){ // login!
  opt = opt || {};
  opt.gun = opt.gun || {};
  opt.gun.localStorage = false;
  gun = Gun(opt.gun);
  console.log(gun);
  gun.get('foo').put({bar:"test"});
}());

//chrome.browserAction.setPopup({popup: 'login.html'});