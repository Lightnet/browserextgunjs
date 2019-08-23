

var bkg = chrome.extension.getBackgroundPage();

chrome.runtime.onInstalled.addListener(function() {
  //chrome.storage.sync.set({color: '#3aa757'}, function() {
    //console.log('The color is green.');
  //});

  chrome.storage.sync.set({username:"guest"}, function() {
    console.log('set username guest');
  });

  chrome.storage.sync.set({passphrase:"guest"}, function() {
    console.log('set passphrase guest');
  });

  chrome.storage.sync.set({autologin:false}, function() {
    console.log('auto login off');
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

//chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  //var url = domains.contains(tabs.url) ? "tracking.html" : "nottracking.html";
  //var url = tabs.url;
  //bkg.console.log('login...');
  //bkg.console.log(url);
  //bkg.console.log(tabs);
  //chrome.browserAction.setPopup({
     //popup: url,
     //tabId: tabs[0].id
  //});
//});

var opt, user, gun;
;(async function(){ // login!
  opt = opt || {};
  opt.gun = opt.gun || {};
  opt.gun.localStorage = false;
  gun = Gun(opt.gun);
  console.log(gun);
  gun.get('foo').put({bar:"test"});
}());

//auto login checks
chrome.storage.sync.get(['autologin','username','passphrase'], function(result) {
  console.log('Value currently is ', result.autologin);
  if(result.autologin == true){
    console.log(result);
    authlogin(result.username,result.passphrase,function(ack){
      console.log("alias login ",ack)
    })
    chrome.browserAction.setPopup({popup: 'popup.html'});
  }else{
    chrome.browserAction.setPopup({popup: 'login.html'});
  }
});

function authlogin(alias,pass,cb){
  let user = gun.user();
  user.auth(alias,pass, function(ack){
    //console.log(ack);
    //sendResponse(ack);
    if(ack.err){
      cb("fail");
      return;
    }else{
      cb("pass");
      return;
    }
  });
}

chrome.runtime.onMessage.addListener(
  async function(request, callback, sendResponse) {
    console.log("message");
    //console.log(request);
    if(request.action!=null){
      if(request.action == "login"){
        //console.log(request);
        //console.log(gun);
        //console.log(request.autologin);
        chrome.storage.sync.set({username:request.alias}, function() {
          console.log('username',request.alias );
        });
        chrome.storage.sync.set({passphrase:request.passphrase}, function() {
          console.log('username',request.passphrase );
        });
        //;(async function(){ // login!
        authlogin(request.alias,request.passphrase,function(ack){
          if(ack == "pass"){
            console.log("pass");
            sendResponse("pass");
            chrome.storage.sync.set({autologin:request.autologin}, function() {
              console.log('auto login',request.autologin );
            });
            chrome.runtime.sendMessage({msg:"loginaction",login:ack});

            //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              //bkg.console.log("tab");
              //var activeTab = tabs[0];
              //bkg.console.log(activeTab);
              //chrome.tabs.sendMessage(tabs[0].id, {login:ack});
            //});

            return;
          }else{
            console.log("fail");
            sendResponse("fail");
            return;
          }
        });
        //}());
        //sendResponse("pass");
        //return;
      }
      if(request.action == "register"){
        let user = gun.user();
        console.log(request.alias);
        console.log(request.passphrase);
        user.create(request.alias, request.passphrase, function(ack){
          sendResponse(ack);
          if(ack.err){
          }
          if(ack.pub){
            //sendResponse(ack);
          }
        });
        return;
      }
    }
    //if (message == "runContentScript"){
      //chrome.tabs.executeScript({
        //file: 'contentScript.js'
      //});
    //}
});

