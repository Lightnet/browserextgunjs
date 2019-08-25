console.log("content test...");
//var bkg = chrome.extension.getBackgroundPage();
//bkg.console.log("content test...");

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response);
});

// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("request?");
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(firstHref);
      //bkg.console.log(firstHref);
    }
  }
);