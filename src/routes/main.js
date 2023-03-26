const express =require('express')
const Details=require("../model/Details");
const slider = require('../model/slider');
const User = require('../model/User');
const sendMail=require('../services/mailservice')
const otpservice=require("../services/otpservice")
const OTP_SEND_FLAG=-1;


const router=express.Router()

router.get("/",async(req,res)=>{

    try{
        const details=await Details.findOne({"_id":"641e9ee2be525020f6765346"});
        const sliders=await slider.find()
        res.render('home',{
            details:details,
            sliders:sliders
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


router.get("/login",async(req,res)=>{
    try{
       const u1= await User.findOne({"gmail":req.query.gmail})
        if(u1==null){
        //console.log(req.query.gmail)
        const TempOtp= await otpservice.gen_save_otp(req.query.gmail)
        if(TempOtp!=OTP_SEND_FLAG){
        sendMail(req.query.gmail,TempOtp)}


        res.render('otp',{id:req.query.gmail})
    }
    else {
           res.redirect(302,"/")
        }
    
       
    }catch(err){
     res.send(err);
    }
});


router.get("/otp",async(req,res)=>{
  
   const u1= new User({ gmail:req.query.gmail})
    try{
        console.log(req.query.otp)
        if(otpservice.check_otp(req.query.gmail,req.query.otp)){
          await u1.save()
          res.redirect(302,"/")
        }else res.send("TRY AGAIN")
       
    }catch(err){
     res.send(err);
    }
});

module.exports =router