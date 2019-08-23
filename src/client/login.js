/*

 */

var bkg = chrome.extension.getBackgroundPage();

chrome.storage.sync.get(['autologin'], function(result) {
    //console.log('Value currently is ', result.autologin);
    $('#bautologin').prop('checked',result.autologin)
});

let btnlogin = document.getElementById('btnlogin');
let btnforgot = document.getElementById('btnforgot');
let btnregister = document.getElementById('btnregister');
let btntest = document.getElementById('btntest');

btnlogin.onclick = function(element) {
    bkg.console.log('btnlogin');
    
    let ialias = $('#ialias').val();
    let ipassphrase = $('#ipassphrase').val();
    let bautologin = $('#bautologin').is(':checked');
    bkg.console.log(bautologin);
    if(!ialias || !ipassphrase) return;
    chrome.runtime.sendMessage({action:"login",alias: ialias,passphrase:ipassphrase,autologin:bautologin});
    //chrome.runtime.sendMessage({action:"login",alias: ialias,passphrase:ipassphrase,autologin:bautologin}, function(response) {
        //bkg.console.log(response);
        //chrome.browserAction.setPopup({popup: 'popup.html'});//set popup
        //window.location.href="popup.html";//change popup url
    //});
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("incoming message");
        bkg.console.log("incoming message");
        if(request.msg == "loginaction"){
            if(request.login == "pass"){
                chrome.browserAction.setPopup({popup: 'popup.html'});//set popup
                window.location.href="popup.html";//change popup url
            }else{

            }
        }
        //if (request.msg === "something_completed") {
            //  To do something
            //console.log(request.data.subject)
            //console.log(request.data.content)
        //}
    }
);

btnforgot.onclick = function(element) {
    bkg.console.log('btnforgot...');
    //chrome.browserAction.setPopup({popup: 'popup.html'});//set popup
    //window.location.href="popup.html";//change popup url
};

btnregister.onclick = function(element) {
    bkg.console.log('btnregister...');
    let ialias = $('#ialias').val();
    let ipassphrase = $('#ipassphrase').val();
    console.log(ialias);
    chrome.runtime.sendMessage({action:"register",alias: ialias,passphrase:ipassphrase}, function(response) {
        console.log(response);
    });
};

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    //console.log("tab");
    //bkg.console.log("tab");
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        bkg.console.log("tab");
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
});

//btntest.onclick = function(element) {
    //bkg.console.log('login...');
    //chrome.browserAction.setPopup({popup: 'popup.html'});//set popup
    //window.location.href="popup.html";//change popup url
    //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //bkg.console.log("tab");
        //var activeTab = tabs[0];
        //chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    //});
//};

//bkg.console.log("login...");
//var opt, user, gun;
//gun = Gun({localStorage:false});
//console.log(gun);

//gun.get('foo').once(ack=>{
    //bkg.console.log(ack);
//});
