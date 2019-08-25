

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
    chrome.browserAction.setPopup({popup: 'index.html'});
  }else{
    chrome.browserAction.setPopup({popup: 'login.html'});
  }
});

function authlogin(alias,pass,cb){
  let user = gun.user();
  user.auth(alias,pass, function(ack){
    //console.log(ack);
    //sendResponse(ack);
    let status = "";
    if(ack.err){
      cb("fail");
      status = ack.err;
    }else{
      cb("pass");
      status = "login...";
    }
    let notifoptions={
      type:'basic',
      iconUrl:'images/get_started48.png',
      title:'Login Message',
      message:status
    };
    chrome.notifications.create('notiflogin',notifoptions);
    return;
  });
}

async function userforgotpassphrase(ialias,question1,question2,cb){
  let alias = await gun.get('~@'+ialias).then(); 
    let publickey;
    if(!alias){
        console.log("NOT FOUND ALIAS!");
        return;
    }
    for(var obj in alias){
        console.log(obj);
        publickey = obj;
    }
    publickey = publickey.substring(1,publickey.length);
    let to = gun.user(publickey);
    let who = await to.get('alias').then();
    if(!who){
      console.log("NOT ALIAS!");
      return;
    }
    let hint = await to.get('hint').then();
    let dec = await Gun.SEA.work(question1,question2);//get q1 and q2 string to key hash
    hint = await Gun.SEA.decrypt(hint,dec);//get hint and key decrypt
    if(hint !=null){//check if hint is string or null
      cb(hint);
      return;
    }else{
      cb({err:"Fail Decrypt!"});
      return;
    }
}

chrome.runtime.onMessage.addListener(
  async function(request, callback, sendResponse) {
    console.log("message");
    //console.log(request);
    if(request.action!=null){
      if(request.action == "login"){
        user = gun.user();
        //console.log(request);
        //console.log(gun);
        //console.log(request.autologin);
        chrome.storage.sync.set({username:request.alias}, function() {
          console.log('username',request.alias );
        });
        chrome.storage.sync.set({passphrase:request.passphrase}, function() {
          console.log('username',request.passphrase );
        });
        authlogin(request.alias,request.passphrase,function(ack){
          if(ack == "pass"){
            console.log("pass");
            //sendResponse("pass");
            chrome.storage.sync.set({autologin:request.autologin}, function() {
              console.log('auto login',request.autologin );
            });
            chrome.runtime.sendMessage({msg:"loginaction",login:ack});
            return;
          }else{
            console.log("fail");
            //sendResponse("fail");
            chrome.runtime.sendMessage({msg:"loginaction",login:ack});
            return;
          }
        });
        return;
      }
      if(request.action == "register"){
        let user = gun.user();
        console.log(request.alias);
        console.log(request.passphrase);
        user.create(request.alias, request.passphrase, function(ack){
          //sendResponse(ack);
          console.log(ack);
          let status="";
          if(ack.err){
            status=ack.err;
          }
          if(ack.pub){
            status="Created!";
          }
          let notifoptions={
            type:'basic',
            iconUrl:'images/get_started48.png',
            title:'Login Message',
            message:status
          };
          chrome.notifications.create('notifregister',notifoptions);
        });
        return;
      }

      if(request.action == "forgot"){
        userforgotpassphrase(request.alias,request.question1,request.question2,function(ack){
          console.log(ack);
          chrome.runtime.sendMessage({msg:"forgotaction", hint:ack});
          let status = "";
          if(ack.err){
            status=ack.err
          }else{
            status=ack;
          } 
          chrome.runtime.sendMessage({msg:"forgotaction",hint:status});
        });
        let notifoptions={
          type:'basic',
          iconUrl:'images/get_started48.png',
          title:'Forgot Message',
          message:"status"
        };
        chrome.notifications.create('notifforgot',notifoptions);
      }
    }
    if(request.action == "applypassphrasehint"){
      user = gun.user();
      if(!user.is){
        return;
      }

      let q1 = request.question1; //get input id question 1
      let q2 = request.question2; //get input id question 2
      let hint = request.hint; //get input id hint
      let sec = await Gun.SEA.secret(user.is.epub, user._.sea);//mix key to decrypt
      let enc_q1 = await Gun.SEA.encrypt(q1, sec);//encrypt q1
      user.get('forgot').get('q1').put(enc_q1);//set hash q1 to user data store
      let enc_q2 = await Gun.SEA.encrypt(q2, sec);//encrypt q1
      user.get('forgot').get('q2').put(enc_q2); //set hash q2 to user data store
      sec = await Gun.SEA.work(q1,q2);//encrypt key
      let enc = await Gun.SEA.encrypt(hint, sec);//encrypt hint

      user.get('hint').put(enc,ack=>{//set hash hint
        //console.log(ack);
        let status ="";
        if(ack.err){
          //console.log("Error!");
          //modalmessage(ack.err);
          status="Error";
        }
        if(ack.ok){
          //console.log('Hint Apply!');
          //modalmessage('Hint Apply!');
          status="Hint Apply!";
        }
        let notifoptions={
          type:'basic',
          iconUrl:'images/get_started48.png',
          title:'Passphase hint message',
          message:status
        };
        chrome.notifications.create('notifpassphrasehint',notifoptions);
      });
      //console.log("apply passphrase hint");
    }

    if(request.action == "changepassphrase"){
      user = gun.user();
      if(!user.is){
        return;
      }
      user.auth(user.is.alias, request.oldpassphras, (ack) => {//user auth call
        //console.log(ack);
        let status = ack.err || "Saved!";//check if there error else saved message.
        console.log(status);
        let notifoptions={
          type:'basic',
          iconUrl:'images/get_started48.png',
          title:'Change passphase message',
          message:status
        };
        chrome.notifications.create('notifchangepassphrase',notifoptions);
      }, {change:request.newpassphrase});//set config to change password
      //console.log("change passphrase");
    }

    if(request.action == "getpublickey"){
      if(!user.is){
        return;
      }
      console.log(user);
      chrome.runtime.sendMessage({action:"setpublickey",publickey:user.is.pub});
    }
    if(request.action == "getalias"){
      if(!user.is){
        return;
      }
      console.log(user);
      chrome.runtime.sendMessage({action:"setalias",alias:user.is.alias});
    }
    //if (message == "runContentScript"){
      //chrome.tabs.executeScript({
        //file: 'contentScript.js'
      //});
    //}
});
