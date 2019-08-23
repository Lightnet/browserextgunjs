/*

 */

var bkg = chrome.extension.getBackgroundPage();
let btnlogin = document.getElementById('btnlogin');
let btnforgot = document.getElementById('btnforgot');
let btnregister = document.getElementById('btnregister');
let btntest = document.getElementById('btntest');

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    console.log("tab");
    //bkg.console.log("tab");
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        bkg.console.log("tab");
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
});
//bkg.console.log("login...");
//var opt, user, gun;
//gun = Gun({localStorage:false});
//console.log(gun);

//gun.get('foo').once(ack=>{
    //bkg.console.log(ack);
//});

btnlogin.onclick = function(element) {
    bkg.console.log('login...');
    chrome.browserAction.setPopup({popup: 'popup.html'});//set popup
    window.location.href="popup.html";//change popup url
};

btnforgot.onclick = function(element) {
    bkg.console.log('login...');
    //chrome.browserAction.setPopup({popup: 'popup.html'});//set popup
    //window.location.href="popup.html";//change popup url
};

btnregister.onclick = function(element) {
    bkg.console.log('login...');
    //chrome.browserAction.setPopup({popup: 'popup.html'});//set popup
    //window.location.href="popup.html";//change popup url
};

btntest.onclick = function(element) {
    bkg.console.log('login...');
    //chrome.browserAction.setPopup({popup: 'popup.html'});//set popup
    //window.location.href="popup.html";//change popup url
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        bkg.console.log("tab");
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
};
