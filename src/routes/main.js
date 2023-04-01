const express =require('express')
const Details=require("../model/Details");
const Remedies=require("../model/Remedies");
const slider = require('../model/slider');
const User = require('../model/User');
const sendMail=require('../services/mailservice')
const otpservice=require("../services/otpservice")
const api_router=require("../routes/api_router")
const ax=require('axios')
const OTP_SEND_FLAG=-1;


const router=express.Router()

router.get("/",async(req,res)=>{

    try{
        const details=await Details.findOne({"_id":"641e9ee2be525020f6765346"});
        const sliders=await slider.find()
        let response
       await api_router.allProducts.then(value=>(response=value))
      //  console.log(response.data)
        res.render('home',{
            details:details,
            sliders:sliders,
            cards:response.data
        })
    }catch(err){
     res.send(err);
    }
});

router.get("/gallery",async(req,res)=>{

    try{
        const details=await Details.findOne({"_id":"641e9ee2be525020f6765346"});
        res.render('gallery',{
            details:details
        })
    }catch(err){
     res.send(err);
    }
});

router.get("/loginpg",(req,res)=>{

        res.render('login')
    
});
///

router.get("/remedies",async(req,res)=>{

    const remedie=await Remedies.find()
    //console.log(remedie)
    res.send(remedie)
    res.end()

});



router.post("/login",async(req,res)=>{
    try{
        const isLoggedIn=req.get("Cookie").split(";")[3].split("=")[1];
        console.log(isLoggedIn)
        const u1= await User.findOne({"gmail":req.body.gmail})
        if(u1==null){
        //console.log(req.query.gmail)
        const TempOtp= await otpservice.gen_save_otp(req.body.gmail)
        if(TempOtp!=OTP_SEND_FLAG){
        sendMail(req.body.gmail,TempOtp)}


        res.render('otp',{id:req.body.gmail})
    }
    else {
            
             res.redirect(302,"/")
        }    
    
       
    }catch(err){
     res.send(err);
    }
});


router.post("/otp",async (req,res)=>{

  
   const u1= new User({gmail:req.body.gmail})
    try{
       // console.log(req.query.otp)
        if(otpservice.check_otp(u1.gmail,req.body.otp)){
          await u1.save()
          res.setHeader("set-Cookie","login="+u1.gmail)
          res.redirect(302,"/")
        }else res.send("TRY AGAIN")
       
    }catch(err){
     res.send(err);
    }
});

module.exports =router