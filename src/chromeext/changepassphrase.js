$("#btnback").click(function(){
    console.log("changepassphrase");
    window.location.href="index.html";//change popup url
});

$("#btnchange").click(async function(){
    let ioldpassphras = $("#ioldpassphras").val()
    let inewpassphrase = $("#inewpassphrase").val()
    if(!ioldpassphras || !inewpassphrase){
        console.log("Empty!");
        return;
    }
    chrome.runtime.sendMessage({
        action:"changepassphrase",
        oldpassphras: ioldpassphras,
        newpassphrase:inewpassphrase
    });
});