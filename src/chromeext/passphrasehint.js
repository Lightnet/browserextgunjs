var opt, user, gun;
gun = Gun({localStorage:false});
user = gun.user();



$("#btnback").click(function(){
    console.log("passphrasehint");
    window.location.href="index.html";//change popup url
});

$("#btnapply").click(async function(){
    console.log(user);
    let ialias = 'test';
    console.log(ialias);
    let alias = await gun.get('~@'+ialias).then(); 
    console.log(alias);
});