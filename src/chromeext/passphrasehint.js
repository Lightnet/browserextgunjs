//var opt, user, gun;
//gun = Gun({localStorage:false});
//user = gun.user();

$("#btnback").click(function(){
    console.log("passphrasehint");
    window.location.href="index.html";//change popup url
});

$("#btnapply").click(async function(){
    //console.log(user);
    //let ialias = 'test';
    //console.log(ialias);
    //let alias = await gun.get('~@'+ialias).then(); 
    //console.log(alias);
    let question1 = $("#iquestion1").val()
    let question2 = $("#iquestion2").val()
    let hint = $("#ihint").val();
    if(!question1 || !question2){
        console.log("Qestion 1 or 2 empty!");
        return;
    }

    if(!hint){
        console.log("hint empty!");
        return;
    }

    chrome.runtime.sendMessage({
        action:"applypassphrasehint",
        question1: question1,
        question2:question2,
        hint:hint
    });
});