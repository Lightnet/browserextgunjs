var bkg = chrome.extension.getBackgroundPage();
var opt, user, gun;
gun = Gun({localStorage:false});
bkg.console.log("forgot init?");

//gun.get('foo').once(ack=>{
    //bkg.console.log(ack);
//});


$("#btngethint").click( function(){
    console.log("get hint");
    let ialias = ($('#ialias').val() || '').trim();
    let iquestion1 = ($('#iquestion1').val() || '').trim();
    let iquestion2 = ($('#iquestion2').val() || '').trim();
    console.log(ialias);
    if(!ialias){ 
        console.log("Empty!")
        return;
    }
    if(!iquestion1 || !iquestion2) {
        return;
    }
    chrome.runtime.sendMessage({
        action:"forgot",
        alias: ialias,
        question1:iquestion1,
        question2:iquestion2
    });

    let notifoptions={
        type:'basic',
        iconUrl:'images/get_started48.png',
        title:'Forgot Message',
        message:'Checking...'
    };
    //chrome.notifications.create('notifforgot',notifoptions);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("incoming message");
        bkg.console.log("incoming message");
        if(request.msg == "forgotaction"){
            if(request.hint != null){
                console.log(request.hint)
                $('#ihint').val(request.hint);
            }
        }
    }
);

$("#btnback").click(function(){
    console.log("get hint");
    window.location.href="login.html";//change popup url
});