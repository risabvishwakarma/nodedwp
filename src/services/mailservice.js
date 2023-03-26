const mailer=require("nodemailer");

function sendMail(userMailId,TempOtp){
let transport=mailer.createTransport({
    service:"gmail",
    auth:{
        user:"aryasharma9634@gmail.com",
        pass:"wjmrpupunixzjntc"
    }
});

let messageObj={
    from:"aryasharma9634@gmail.com",
    to:userMailId,
    subject:"Email using node js",
    text:"OTP is : "+TempOtp

}

transport.sendMail(messageObj,(err,info)=>{
if(err){
    console.log(err);
}else{
    console.log("Sucessfull sent ");
  
}
});

}
module.exports=sendMail;


