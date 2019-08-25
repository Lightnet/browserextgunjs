var bkg = chrome.extension.getBackgroundPage();
var opt, user, gun;
gun = Gun({localStorage:false});
bkg.console.log("editor init?");

//gun.get('foo').once(ack=>{
    //bkg.console.log(ack);
//});