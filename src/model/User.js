const mongoose=require("mongoose")


const User=new mongoose.Schema({

    name:String,
    gmail:String

});

module.exports=mongoose.model("User",User);