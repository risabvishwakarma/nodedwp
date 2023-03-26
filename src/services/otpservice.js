const otpGenerator = require('otp-generator')

const OTP_SEND_FLAG=-1;
let OTP_DATA=new Map()
const TIME_DURATION=60*1000


function gen_save_otp(gmailId){

   if(OTP_DATA.has(gmailId) && (OTP_DATA.get(gmailId)[0]+TIME_DURATION>new Date().getTime()))return OTP_SEND_FLAG;
   OTP_DATA.set(gmailId,[new Date().getTime(), otpGenerator.generate(4, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false })])
   return OTP_DATA.get(gmailId)[1]
}

function check_otp(gmailId,otp){
    if(OTP_DATA.has(gmailId)?(OTP_DATA.get(gmailId)[1]==otp) && (OTP_DATA.get(gmailId)[0]+TIME_DURATION>new Date().getTime()):false)
    return OTP_DATA.delete(gmailId)
    return false
 }

 module.exports={gen_save_otp,check_otp}